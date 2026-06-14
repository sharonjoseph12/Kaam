"""Wage slip generation, approval, and retrieval endpoints."""

from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.attendance import AttendanceRecord
from app.models.contractor import Contractor
from app.models.insurance import Insurance
from app.models.loan import Loan
from app.models.site import Site
from app.models.wage_slip import WageSlip
from app.models.worker import WorkerSite
from app.schemas.wage_slip import WageSlipGenerateRequest, WageSlipResponse
from app.services.id_generator import generate_kaam_id
from app.services.wage_calculator import calculate_wages

router = APIRouter(prefix="/api/wageslips", tags=["Wage Slips"])


@router.post("/generate", response_model=list[WageSlipResponse], status_code=status.HTTP_201_CREATED)
def generate_wage_slips(data: WageSlipGenerateRequest, db: Session = Depends(get_db)):
    """Generate wage slips for all workers at a site for a given cycle.

    Calculates:
    - Gross = (Days Present + 0.5×Half Days + 1.5×Overtime) × Daily Rate
    - Overtime at 2× rate (Labour Code)
    - Deductions: loan repayment + insurance premium
    - Minimum wage check
    """
    site = db.query(Site).filter(Site.id == data.site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")

    contractor = db.query(Contractor).filter(Contractor.id == site.contractor_id).first()
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    # Get all active workers at this site
    worker_sites = (
        db.query(WorkerSite)
        .filter(WorkerSite.site_id == data.site_id, WorkerSite.end_date.is_(None))
        .all()
    )

    if not worker_sites:
        raise HTTPException(status_code=404, detail="No active workers at this site")

    slips: list[WageSlip] = []
    for ws in worker_sites:
        # Check for existing slip
        existing = (
            db.query(WageSlip)
            .filter(
                WageSlip.worker_id == ws.worker_id,
                WageSlip.site_id == data.site_id,
                WageSlip.cycle_start == data.cycle_start,
                WageSlip.cycle_end == data.cycle_end,
            )
            .first()
        )
        if existing:
            continue

        # Count attendance
        attendance = (
            db.query(AttendanceRecord)
            .filter(
                AttendanceRecord.worker_id == ws.worker_id,
                AttendanceRecord.site_id == data.site_id,
                AttendanceRecord.date >= data.cycle_start,
                AttendanceRecord.date <= data.cycle_end,
            )
            .all()
        )

        days_present = sum(1 for r in attendance if r.status == "P")
        half_days = sum(1 for r in attendance if r.status == "H")
        overtime_days = sum(1 for r in attendance if r.status == "OT")
        absent_days = sum(1 for r in attendance if r.status == "A")

        # Check for active loan repayment
        active_loan = (
            db.query(Loan)
            .filter(
                Loan.worker_id == ws.worker_id,
                Loan.status == "DISBURSED",
            )
            .first()
        )
        loan_repayment = active_loan.total_repayment if active_loan else 0.0

        # Check insurance enrollment
        has_insurance = (
            db.query(Insurance)
            .filter(Insurance.worker_id == ws.worker_id, Insurance.active.is_(True))
            .first()
            is not None
        )

        calc = calculate_wages(
            days_present=days_present,
            half_days=half_days,
            overtime_days=overtime_days,
            absent_days=absent_days,
            daily_rate=ws.daily_wage,
            state=contractor.state,
            category=ws.category,
            active_loan_repayment=loan_repayment,
            insurance_enrolled=has_insurance,
        )

        slip = WageSlip(
            kaam_id=generate_kaam_id("SLIP"),
            worker_id=ws.worker_id,
            site_id=data.site_id,
            cycle_start=data.cycle_start,
            cycle_end=data.cycle_end,
            days_present=days_present,
            half_days=half_days,
            overtime_days=overtime_days,
            absent_days=absent_days,
            daily_rate=ws.daily_wage,
            gross=calc.gross,
            deductions_json=calc.deductions,
            total_deductions=calc.total_deductions,
            net=calc.net,
            min_wage_violation=calc.min_wage_violation,
        )
        db.add(slip)
        slips.append(slip)

    if not slips:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Wage slips already generated for all workers in this cycle",
        )

    db.commit()
    for slip in slips:
        db.refresh(slip)

    return slips


@router.post("/{slip_id}/approve", response_model=WageSlipResponse)
def approve_wage_slip(slip_id: int, db: Session = Depends(get_db)):
    """Approve a wage slip. Locks it — cannot be altered after approval."""
    slip = db.query(WageSlip).filter(WageSlip.id == slip_id).first()
    if not slip:
        raise HTTPException(status_code=404, detail="Wage slip not found")

    if slip.status != "DRAFT":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Slip already in status: {slip.status}",
        )

    if slip.min_wage_violation:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Cannot approve: minimum wage violation detected. Increase wage rate first.",
        )

    slip.status = "APPROVED"
    slip.approved_at = datetime.now(UTC)
    db.commit()
    db.refresh(slip)
    return slip


@router.get("/worker/{worker_id}", response_model=list[WageSlipResponse])
def get_worker_wage_slips(
    worker_id: int, skip: int = 0, limit: int = 50, db: Session = Depends(get_db)
):
    """Get wage slip history for a worker."""
    slips = (
        db.query(WageSlip)
        .filter(WageSlip.worker_id == worker_id)
        .order_by(WageSlip.cycle_end.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return slips


@router.get("/site/{site_id}", response_model=list[WageSlipResponse])
def get_site_wage_slips(
    site_id: int, skip: int = 0, limit: int = 50, db: Session = Depends(get_db)
):
    """Get wage slips for a site."""
    slips = (
        db.query(WageSlip)
        .filter(WageSlip.site_id == site_id)
        .order_by(WageSlip.cycle_end.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return slips
