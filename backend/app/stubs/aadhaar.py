"""UIDAI Aadhaar eKYC API stub.

Returns mock eKYC data. Replace with actual UIDAI eKYC
integration for production.
"""

import logging

logger = logging.getLogger(__name__)


def verify_aadhaar(aadhaar_number: str) -> dict:
    """Verify Aadhaar number and return eKYC data.

    Returns mock data — real implementation would call UIDAI API
    with OTP verification.
    """
    logger.info("[Aadhaar STUB] eKYC request for Aadhaar: %s****%s", aadhaar_number[:4], aadhaar_number[-4:])

    return {
        "verified": True,
        "name": "Verified via eKYC",
        "photo_url": None,
        "address": {
            "state": "Karnataka",
            "district": "Dakshina Kannada",
        },
    }
