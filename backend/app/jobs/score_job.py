"""Monthly KAAM score recalculation for all workers."""

import logging

from app.database import SessionLocal
from app.models.worker import Worker
from app.services.kaam_score import calculate_kaam_score

logger = logging.getLogger(__name__)


def run_monthly_score_recalculation() -> None:
    """Recalculate KAAM scores for all workers."""
    db = SessionLocal()
    try:
        workers = db.query(Worker).all()
        updated = 0

        for worker in workers:
            calculate_kaam_score(db, worker.id)
            updated += 1

        logger.info("Monthly score recalculation complete: %d workers updated", updated)
    except Exception:
        logger.exception("Monthly score recalculation failed")
        db.rollback()
    finally:
        db.close()
