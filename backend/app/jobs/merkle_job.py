"""Daily Merkle root generation job (6 PM).

Builds a Merkle tree from all attendance record hashes for each
contractor's sites on the current day, stores the root hash.
"""

import logging
from datetime import date

from app.database import SessionLocal
from app.models.attendance import AttendanceRecord
from app.models.contractor import Contractor
from app.models.merkle import MerkleRoot
from app.models.site import Site
from app.services.crypto import build_merkle_tree

logger = logging.getLogger(__name__)


def run_daily_merkle_seal() -> None:
    """Generate Merkle root for each contractor's daily attendance records."""
    db = SessionLocal()
    try:
        today = date.today()
        contractors = db.query(Contractor).all()

        for contractor in contractors:
            site_ids = [
                s.id for s in db.query(Site).filter(Site.contractor_id == contractor.id).all()
            ]
            if not site_ids:
                continue

            # Check if already generated today
            existing = (
                db.query(MerkleRoot)
                .filter(
                    MerkleRoot.contractor_id == contractor.id,
                    MerkleRoot.date == today,
                )
                .first()
            )
            if existing:
                continue

            # Get all attendance hashes for today
            records = (
                db.query(AttendanceRecord)
                .filter(
                    AttendanceRecord.site_id.in_(site_ids),
                    AttendanceRecord.date == today,
                )
                .order_by(AttendanceRecord.id)
                .all()
            )

            if not records:
                continue

            hashes = [r.hash for r in records]
            root_hash = build_merkle_tree(hashes)

            merkle_root = MerkleRoot(
                contractor_id=contractor.id,
                date=today,
                root_hash=root_hash,
                record_count=len(records),
            )
            db.add(merkle_root)

        db.commit()
        logger.info("Daily Merkle seal complete for %d contractors", len(contractors))
    except Exception:
        logger.exception("Merkle seal job failed")
        db.rollback()
    finally:
        db.close()
