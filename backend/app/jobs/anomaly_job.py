"""Nightly anomaly scan across all contractor records."""

import logging

from app.database import SessionLocal
from app.models.contractor import Contractor
from app.services.anomaly_detector import persist_anomalies, run_all_anomaly_checks

logger = logging.getLogger(__name__)


def run_nightly_anomaly_scan() -> None:
    """Scan all contractors for fraud patterns and anomalies."""
    db = SessionLocal()
    try:
        contractors = db.query(Contractor).all()
        total_anomalies = 0

        for contractor in contractors:
            anomalies = run_all_anomaly_checks(db, contractor.id)
            if anomalies:
                saved = persist_anomalies(db, anomalies)
                total_anomalies += len(saved)

        logger.info(
            "Nightly anomaly scan complete: %d new anomalies across %d contractors",
            total_anomalies,
            len(contractors),
        )
    except Exception:
        logger.exception("Nightly anomaly scan failed")
        db.rollback()
    finally:
        db.close()
