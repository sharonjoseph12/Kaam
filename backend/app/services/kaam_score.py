"""KAAM Score calculation engine.

Score (0-100) with 4 components:
- Payment Consistency (40 pts): On-time wage payment per cycle
- Employment Continuity (30 pts): Days worked, gaps between contracts
- Dispute History (20 pts): Clean record = full points
- Income Growth (10 pts): Wage growth over time

Tiers:
- Bronze  0-30:  Loan not eligible, Insurance ₹5,000
- Silver  31-55: Loan ₹1,000-3,000, Insurance ₹10,000
- Gold    56-75: Loan ₹3,000-7,000, Insurance ₹25,000
- Platinum 76-100: Loan ₹7,000-15,000, Insurance ₹50,000
"""

from sqlalchemy.orm import Session

from app.models.dispute import Dispute
from app.models.kaam_score import KaamScore
from app.models.wage_slip import WageSlip
from app.models.worker import Worker


def _payment_consistency_score(db: Session, worker_id: int) -> float:
    """Calculate payment consistency component (max 40 points)."""
    slips = (
        db.query(WageSlip)
        .filter(WageSlip.worker_id == worker_id)
        .order_by(WageSlip.cycle_end.desc())
        .limit(12)
        .all()
    )
    if not slips:
        return 0.0

    score = 0.0
    for slip in slips:
        if slip.status in ("PAID-VERIFIED",):
            score += 3.0  # on-time verified
        elif slip.status in ("PAID-UNVERIFIED",):
            score += 1.0  # late or unverified
        elif slip.status == "APPROVED":
            score -= 2.0  # approved but not paid

    return max(0.0, min(40.0, score))


def _employment_continuity_score(db: Session, worker_id: int) -> float:
    """Calculate employment continuity component (max 30 points)."""
    slips = (
        db.query(WageSlip)
        .filter(WageSlip.worker_id == worker_id)
        .order_by(WageSlip.cycle_end.desc())
        .limit(12)
        .all()
    )
    if not slips:
        return 0.0

    score = 0.0
    for slip in slips:
        total_days = slip.days_present + slip.half_days + slip.overtime_days
        if total_days >= 15:
            score += 3.0
        elif total_days >= 8:
            score += 1.0

    return max(0.0, min(30.0, score))


def _dispute_history_score(db: Session, worker_id: int) -> float:
    """Calculate dispute history component (max 20 points). Clean = full."""
    disputes = (
        db.query(Dispute)
        .filter(Dispute.worker_id == worker_id)
        .all()
    )
    if not disputes:
        return 20.0

    score = 20.0
    for dispute in disputes:
        if dispute.status == "RESOLVED":
            score -= 2.0
        elif dispute.status == "ESCALATED":
            score -= 5.0

    return max(0.0, score)


def _income_growth_score(db: Session, worker_id: int) -> float:
    """Calculate income growth component (max 10 points)."""
    slips = (
        db.query(WageSlip)
        .filter(WageSlip.worker_id == worker_id)
        .order_by(WageSlip.cycle_end.asc())
        .all()
    )
    if len(slips) < 2:
        return 3.0  # consistent same rate default

    first_rate = slips[0].daily_rate
    last_rate = slips[-1].daily_rate

    if last_rate > first_rate:
        return 5.0  # wage increased
    elif last_rate == first_rate:
        return 3.0  # consistent
    else:
        return 0.0  # decreased


def get_tier(score: int) -> str:
    """Map score to tier."""
    if score >= 76:
        return "Platinum"
    elif score >= 56:
        return "Gold"
    elif score >= 31:
        return "Silver"
    return "Bronze"


def calculate_kaam_score(db: Session, worker_id: int) -> KaamScore:
    """Calculate and save the KAAM score for a worker."""
    payment = _payment_consistency_score(db, worker_id)
    continuity = _employment_continuity_score(db, worker_id)
    disputes = _dispute_history_score(db, worker_id)
    growth = _income_growth_score(db, worker_id)

    total = int(payment + continuity + disputes + growth)
    total = max(0, min(100, total))

    tier = get_tier(total)

    breakdown = {
        "payment_consistency": payment,
        "employment_continuity": continuity,
        "dispute_history": disputes,
        "income_growth": growth,
    }

    score_record = KaamScore(
        worker_id=worker_id,
        score=total,
        tier=tier,
        breakdown_json=breakdown,
    )
    db.add(score_record)

    # Update worker's cached score
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    if worker:
        worker.kaam_score = total

    db.commit()
    db.refresh(score_record)

    return score_record
