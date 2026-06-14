"""Attendance schemas."""

from datetime import date, datetime

from pydantic import BaseModel, Field


class AttendanceEntry(BaseModel):
    """Single attendance entry in a batch marking."""

    worker_id: int
    status: str = Field(..., pattern="^(P|A|H|OT)$")


class AttendanceBatchMark(BaseModel):
    """Batch attendance marking request."""

    site_id: int
    contractor_gps_lat: float
    contractor_gps_lng: float
    entries: list[AttendanceEntry] = Field(..., min_length=1)
    record_date: date | None = None  # defaults to today
    offline_synced: bool = False


class AttendanceRecordResponse(BaseModel):
    """Attendance record response."""

    id: int
    worker_id: int
    site_id: int
    date: date
    status: str
    contractor_gps_lat: float
    contractor_gps_lng: float
    hash: str
    prev_hash: str | None
    verification_status: str
    offline_synced: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class MerkleRootResponse(BaseModel):
    """Merkle root response."""

    id: int
    contractor_id: int
    date: date
    root_hash: str
    record_count: int
    created_at: datetime

    model_config = {"from_attributes": True}
