"""Contractor model."""

from datetime import datetime

from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Contractor(Base):
    """Contractor registered on the KAAM platform."""

    __tablename__ = "contractors"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kaam_id: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    aadhaar_hash: Mapped[str] = mapped_column(String(64), unique=True)
    phone: Mapped[str] = mapped_column(String(15), unique=True)
    password_hash: Mapped[str] = mapped_column(String(200))
    license_number: Mapped[str | None] = mapped_column(String(50), nullable=True)
    state: Mapped[str] = mapped_column(String(50), default="karnataka")
    district: Mapped[str] = mapped_column(String(100))
    work_type: Mapped[str] = mapped_column(String(50))  # construction, renovation, etc.
    subscription_tier: Mapped[str] = mapped_column(String(20), default="free")  # free/standard/pro
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    sites: Mapped[list["Site"]] = relationship(  # noqa: F821
        "Site", back_populates="contractor", cascade="all, delete-orphan"
    )
    anomaly_alerts: Mapped[list["AnomalyAlert"]] = relationship(  # noqa: F821
        "AnomalyAlert", back_populates="contractor", cascade="all, delete-orphan"
    )
