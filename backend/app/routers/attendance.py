"""Attendance marking and retrieval endpoints."""

from datetime import UTC, date, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.attendance import AttendanceRecord
from app.models.site import Site
from app.schemas.attendance import AttendanceBatchMark, AttendanceRecordResponse
from app.services.crypto import hash_attendance_record
from app.services.geofence import check_within_geofence

router = APIRouter(prefix="/api/attendance", tags=["Attendance"])


@router.post(
    "/mark",
    response_model=list[AttendanceRecordResponse],
    status_code=status.HTTP_201_CREATED,
)
def mark_attendance(data: AttendanceBatchMark, db: Session = Depends(get_db)):
    """Mark attendance for multiple workers at a site (batch).

    Each record is:
    - GPS-verified against site geofence
    - SHA-256 hashed with chain link to previous record
    - Stored immutably
    """
    site = db.query(Site).filter(Site.id == data.site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")

    record_date = data.record_date or date.today()

    # GPS verification
    within_geofence = check_within_geofence(
        data.contractor_gps_lat,
        data.contractor_gps_lng,
        site.latitude,
        site.longitude,
        site.geofence_radius_m,
    )
    verification_status = "GPS-ONLY" if within_geofence else "FLAGGED"

    records: list[AttendanceRecord] = []
    for entry in data.entries:
        # Check for duplicate
        existing = (
            db.query(AttendanceRecord)
            .filter(
                AttendanceRecord.worker_id == entry.worker_id,
                AttendanceRecord.site_id == data.site_id,
                AttendanceRecord.date == record_date,
            )
            .first()
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Attendance already marked for worker {entry.worker_id} on {record_date}",
            )

        # Get previous hash for chain
        prev_record = (
            db.query(AttendanceRecord)
            .filter(AttendanceRecord.worker_id == entry.worker_id)
            .order_by(AttendanceRecord.created_at.desc())
            .first()
        )
        prev_hash = prev_record.hash if prev_record else None

        timestamp = datetime.now(UTC).isoformat()
        record_hash = hash_attendance_record(
            worker_id=entry.worker_id,
            site_id=data.site_id,
            record_date=str(record_date),
            status=entry.status,
            contractor_gps_lat=data.contractor_gps_lat,
            contractor_gps_lng=data.contractor_gps_lng,
            timestamp=timestamp,
            prev_hash=prev_hash,
        )

        record = AttendanceRecord(
            worker_id=entry.worker_id,
            site_id=data.site_id,
            date=record_date,
            status=entry.status,
            contractor_gps_lat=data.contractor_gps_lat,
            contractor_gps_lng=data.contractor_gps_lng,
            hash=record_hash,
            prev_hash=prev_hash,
            verification_status=verification_status,
            offline_synced=data.offline_synced,
        )
        db.add(record)
        records.append(record)

    db.commit()
    for record in records:
        db.refresh(record)

    return records


@router.get("/site/{site_id}/date/{record_date}", response_model=list[AttendanceRecordResponse])
def get_attendance_by_site_and_date(
    site_id: int, record_date: date, db: Session = Depends(get_db)
):
    """Get all attendance records for a site on a specific date."""
    records = (
        db.query(AttendanceRecord)
        .filter(
            AttendanceRecord.site_id == site_id,
            AttendanceRecord.date == record_date,
        )
        .order_by(AttendanceRecord.worker_id)
        .all()
    )
    return records


@router.get("/worker/{worker_id}", response_model=list[AttendanceRecordResponse])
def get_worker_attendance(
    worker_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """Get attendance history for a worker."""
    records = (
        db.query(AttendanceRecord)
        .filter(AttendanceRecord.worker_id == worker_id)
        .order_by(AttendanceRecord.date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return records
