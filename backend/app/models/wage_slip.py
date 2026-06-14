"""Wage slip model."""

from datetime import date, datetime

from sqlalchemy import JSON, Date, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class WageSlip(Base):
    """Labour Code compliant wage slip."""

    __tablename__ = "wage_slips"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kaam_id: Mapped[str] = mapped_column(String(24), unique=True, index=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    site_id: Mapped[int] = mapped_column(ForeignKey("sites.id"), index=True)
    cycle_start: Mapped[date] = mapped_column(Date)
    cycle_end: Mapped[date] = mapped_column(Date)
    days_present: Mapped[int] = mapped_column(Integer, default=0)
    half_days: Mapped[int] = mapped_column(Integer, default=0)
    overtime_days: Mapped[int] = mapped_column(Integer, default=0)
    absent_days: Mapped[int] = mapped_column(Integer, default=0)
    daily_rate: Mapped[float] = mapped_column(Float)
    gross: Mapped[float] = mapped_column(Float)
    deductions_json: Mapped[dict] = mapped_column(JSON, default=dict)
    total_deductions: Mapped[float] = mapped_column(Float, default=0.0)
    net: Mapped[float] = mapped_column(Float)
    min_wage_violation: Mapped[bool] = mapped_column(default=False)
    status: Mapped[str] = mapped_column(
        String(20), default="DRAFT"
    )  # DRAFT, APPROVED, PAID-VERIFIED, PAID-UNVERIFIED
    approved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    worker: Mapped["Worker"] = relationship(  # noqa: F821
        "Worker", back_populates="wage_slips"
    )
