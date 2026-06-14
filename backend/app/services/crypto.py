"""SHA-256 hashing and Merkle tree construction.

Implements the cryptographic audit trail from the KAAM spec:
- Each attendance record is hashed with SHA-256
- Daily Merkle trees aggregate all records per contractor
- Root hash becomes the daily audit certificate
"""

import hashlib


def hash_attendance_record(
    worker_id: int,
    site_id: int,
    record_date: str,
    status: str,
    contractor_gps_lat: float,
    contractor_gps_lng: float,
    timestamp: str,
    prev_hash: str | None = None,
) -> str:
    """Generate SHA-256 hash for an attendance record.

    Hash = SHA-256(worker_id + site_id + date + status +
                   contractor_gps + timestamp + prev_hash)
    """
    data = (
        f"{worker_id}|{site_id}|{record_date}|{status}|"
        f"{contractor_gps_lat}|{contractor_gps_lng}|{timestamp}|"
        f"{prev_hash or 'GENESIS'}"
    )
    return hashlib.sha256(data.encode("utf-8")).hexdigest()


def verify_hash(
    stored_hash: str,
    worker_id: int,
    site_id: int,
    record_date: str,
    status: str,
    contractor_gps_lat: float,
    contractor_gps_lng: float,
    timestamp: str,
    prev_hash: str | None = None,
) -> bool:
    """Verify an attendance record hash matches the stored hash."""
    computed = hash_attendance_record(
        worker_id, site_id, record_date, status,
        contractor_gps_lat, contractor_gps_lng, timestamp, prev_hash,
    )
    return computed == stored_hash


def build_merkle_tree(hashes: list[str]) -> str:
    """Build a Merkle tree from leaf hashes and return the root hash.

    If empty, returns hash of empty string.
    If single hash, returns it directly.
    Otherwise, pairs adjacent hashes and recursively builds tree.

    Uses the same principle as Git and Bitcoin — each parent is
    SHA-256(left_child + right_child).
    """
    if not hashes:
        return hashlib.sha256(b"EMPTY").hexdigest()

    if len(hashes) == 1:
        return hashes[0]

    # If odd number of leaves, duplicate the last one
    if len(hashes) % 2 == 1:
        hashes.append(hashes[-1])

    next_level: list[str] = []
    for i in range(0, len(hashes), 2):
        combined = hashes[i] + hashes[i + 1]
        parent_hash = hashlib.sha256(combined.encode("utf-8")).hexdigest()
        next_level.append(parent_hash)

    return build_merkle_tree(next_level)


def hash_aadhaar(aadhaar_number: str) -> str:
    """Hash an Aadhaar number. Raw Aadhaar is never stored per DPDP Act."""
    return hashlib.sha256(aadhaar_number.encode("utf-8")).hexdigest()
