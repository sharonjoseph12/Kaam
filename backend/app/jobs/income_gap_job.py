"""Daily income gap detection for insured workers.

Checks if insured workers haven't received a wage slip in 21 days.
Triggers parametric insurance outreach.
"""

import logging
from datetime import date, timedelta

from sqlalchemy import func

from app.database import SessionLocal
from app.models.insurance import Insurance
from app.models.wage_slip import WageSlip
from app.models.worker import Worker, WorkerSite
from app.stubs.whatsapp import send_income_gap_check

logger = logging.getLogger(__name__)


def run_daily_income_gap_detection() -> None:
    """Detect workers with no wage slip in 21 days (parametric insurance trigger)."""
    db = SessionLocal()
    try:
        today = date.today()
        threshold = today - timedelta(days=21)

        # Get all insured workers
        insured = db.query(Insurance).filter(Insurance.active.is_(True)).all()

        for policy in insured:
            worker = db.query(Worker).filter(Worker.id == policy.worker_id).first()
            if not worker:
                continue

            # Check for recent wage slip
            latest_slip = (
                db.query(func.max(WageSlip.cycle_end))
                .filter(WageSlip.worker_id == worker.id)
                .scalar()
            )

            if latest_slip and latest_slip >= threshold:
                continue  # has recent slip, no gap

            # Check if worker moved to new site (not actually unemployed)
            active_assignment = (
                db.query(WorkerSite)
                .filter(
                    WorkerSite.worker_id == worker.id,
                    WorkerSite.end_date.is_(None),
                    WorkerSite.start_date > threshold,
                )
                .first()
            )
            if active_assignment:
                continue  # moved to new site

            # Income gap detected — send WhatsApp check
            if worker.whatsapp_number:
                send_income_gap_check(worker.name, worker.whatsapp_number)
                logger.info(
                    "Income gap detected for worker %s (%s)",
                    worker.kaam_id,
                    worker.name,
                )

        db.commit()
    except Exception:
        logger.exception("Income gap detection job failed")
        db.rollback()
    finally:
        db.close()
