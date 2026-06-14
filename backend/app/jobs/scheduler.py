"""APScheduler setup for KAAM cron jobs."""

import logging

from apscheduler.schedulers.background import BackgroundScheduler

from app.jobs.anomaly_job import run_nightly_anomaly_scan
from app.jobs.income_gap_job import run_daily_income_gap_detection
from app.jobs.merkle_job import run_daily_merkle_seal
from app.jobs.score_job import run_monthly_score_recalculation

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()


def start_scheduler() -> None:
    """Configure and start all scheduled jobs."""
    # Daily 6PM: Merkle tree seal
    scheduler.add_job(
        run_daily_merkle_seal,
        "cron",
        hour=18,
        minute=0,
        id="merkle_seal",
        name="Daily Merkle Root Generation",
    )

    # Daily 7AM: Income gap detection for insured workers
    scheduler.add_job(
        run_daily_income_gap_detection,
        "cron",
        hour=7,
        minute=0,
        id="income_gap",
        name="Daily Income Gap Detection",
    )

    # Nightly 11PM: Anomaly scan across all contractor records
    scheduler.add_job(
        run_nightly_anomaly_scan,
        "cron",
        hour=23,
        minute=0,
        id="anomaly_scan",
        name="Nightly Anomaly Detection",
    )

    # Monthly 1st at 2AM: KAAM score recalculation
    scheduler.add_job(
        run_monthly_score_recalculation,
        "cron",
        day=1,
        hour=2,
        minute=0,
        id="score_recalc",
        name="Monthly KAAM Score Recalculation",
    )

    scheduler.start()
    logger.info("KAAM scheduler started with 4 jobs")


def stop_scheduler() -> None:
    """Shutdown the scheduler."""
    if scheduler.running:
        scheduler.shutdown(wait=False)
        logger.info("KAAM scheduler stopped")
