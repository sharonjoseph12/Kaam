"""KAAM ID generator utility."""

import random
import string


def generate_kaam_id(prefix: str) -> str:
    """Generate a KAAM platform ID with the given prefix.

    Format: KAM-{PREFIX}-{6 alphanumeric chars}
    Examples: KAM-CTR-A3B7K9, KAM-WKR-X2M4P1, KAM-SITE-R8N3Q5
    """
    suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"KAM-{prefix}-{suffix}"
