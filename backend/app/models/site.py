"""Site model."""

from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Site(Base):
    """Construction site registered by a contractor."""

    __tablename__ = "sites"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kaam_id: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    contractor_id: Mapped[int] = mapped_column(ForeignKey("contractors.id"), index=True)
    name: Mapped[str] = mapped_column(String(200))
    latitude: Mapped[float] = mapped_column(Float)
    longitude: Mapped[float] = mapped_column(Float)
    geofence_radius_m: Mapped[int] = mapped_column(Integer, default=100)  # 50/100/200
    site_type: Mapped[str] = mapped_column(String(50))  # new_construction, renovation, etc.
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    contractor: Mapped["Contractor"] = relationship(  # noqa: F821
        "Contractor", back_populates="sites"
    )
    worker_sites: Mapped[list["WorkerSite"]] = relationship(  # noqa: F821
        "WorkerSite", back_populates="site", cascade="all, delete-orphan"
    )
