"""Attendance record model."""

from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class AttendanceRecord(Base):
    """Immutable attendance record with cryptographic hash."""

    __tablename__ = "attendance_records"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    site_id: Mapped[int] = mapped_column(ForeignKey("sites.id"), index=True)
    date: Mapped[date] = mapped_column(Date, index=True)
    status: Mapped[str] = mapped_column(String(5))  # P, A, H, OT
    contractor_gps_lat: Mapped[float] = mapped_column(Float)
    contractor_gps_lng: Mapped[float] = mapped_column(Float)
    hash: Mapped[str] = mapped_column(String(64), unique=True)
    prev_hash: Mapped[str | None] = mapped_column(String(64), nullable=True)
    verification_status: Mapped[str] = mapped_column(
        String(20), default="GPS-ONLY"
    )  # VERIFIED, GPS-ONLY, FLAGGED
    offline_synced: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    worker: Mapped["Worker"] = relationship(  # noqa: F821
        "Worker", back_populates="attendance_records"
    )
