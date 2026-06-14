"""WhatsApp Business API stub.

Logs messages instead of sending them. Replace with actual
WhatsApp Business API integration for production.
"""

import logging

logger = logging.getLogger(__name__)


def send_welcome_message(worker_name: str, whatsapp_number: str, site_name: str) -> None:
    """Send welcome message to newly registered worker."""
    message = (
        f"Namaskara {worker_name}! You are registered on KAAM Finance "
        f"for site {site_name}. You will receive your wage slip every cycle. "
        f"Reply HELP for assistance."
    )
    logger.info("[WhatsApp STUB] To: %s | Message: %s", whatsapp_number, message)


def send_wage_slip_notification(
    worker_name: str, whatsapp_number: str, net_wages: float, payment_date: str, pdf_url: str
) -> None:
    """Send wage slip notification to worker."""
    message = (
        f"Namaskara {worker_name}! Your wage slip is ready. "
        f"Net wages: ₹{net_wages:,.0f}. Payment date: {payment_date}. "
        f"View slip: {pdf_url} | Stored in DigiLocker ✓ "
        f"Reply DISPUTE if anything is wrong. Reply LOAN for advance."
    )
    logger.info("[WhatsApp STUB] To: %s | Message: %s", whatsapp_number, message)


def send_income_gap_check(worker_name: str, whatsapp_number: str) -> None:
    """Send income gap detection message for insurance trigger."""
    message = (
        f"Namaskara {worker_name}! We noticed you haven't received wages in 21 days. "
        f"Are you unwell or injured? Reply: "
        f"SICK — illness | HURT — injury | NOWORK — no work | OK — I'm fine"
    )
    logger.info("[WhatsApp STUB] To: %s | Message: %s", whatsapp_number, message)


def send_kaam_score(worker_name: str, whatsapp_number: str, score: int, tier: str) -> None:
    """Send monthly KAAM score notification."""
    message = (
        f"Your KAAM Score this month: {score} ({tier}). "
        f"Reply LOAN to apply. Reply SCORE to see details."
    )
    logger.info("[WhatsApp STUB] To: %s | Message: %s", whatsapp_number, message)
