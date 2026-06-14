"""Worker and WorkerSite models."""

from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Worker(Base):
    """Worker registered on the KAAM platform."""

    __tablename__ = "workers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kaam_id: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    aadhaar_hash: Mapped[str] = mapped_column(String(64), unique=True)
    name: Mapped[str] = mapped_column(String(200))
    whatsapp_number: Mapped[str | None] = mapped_column(String(15), nullable=True)
    kaam_score: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    worker_sites: Mapped[list["WorkerSite"]] = relationship(
        "WorkerSite", back_populates="worker", cascade="all, delete-orphan"
    )
    attendance_records: Mapped[list["AttendanceRecord"]] = relationship(  # noqa: F821
        "AttendanceRecord", back_populates="worker", cascade="all, delete-orphan"
    )
    wage_slips: Mapped[list["WageSlip"]] = relationship(  # noqa: F821
        "WageSlip", back_populates="worker", cascade="all, delete-orphan"
    )
    disputes: Mapped[list["Dispute"]] = relationship(  # noqa: F821
        "Dispute", back_populates="worker", cascade="all, delete-orphan"
    )
    loans: Mapped[list["Loan"]] = relationship(  # noqa: F821
        "Loan", back_populates="worker", cascade="all, delete-orphan"
    )
    insurance_policies: Mapped[list["Insurance"]] = relationship(  # noqa: F821
        "Insurance", back_populates="worker", cascade="all, delete-orphan"
    )
    scores: Mapped[list["KaamScore"]] = relationship(  # noqa: F821
        "KaamScore", back_populates="worker", cascade="all, delete-orphan"
    )


class WorkerSite(Base):
    """Association between a worker and a site with employment details."""

    __tablename__ = "worker_sites"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    site_id: Mapped[int] = mapped_column(ForeignKey("sites.id"), index=True)
    category: Mapped[str] = mapped_column(String(50))  # mason, helper, carpenter, etc.
    daily_wage: Mapped[float] = mapped_column(Float)
    wage_cycle: Mapped[str] = mapped_column(String(20), default="monthly")
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    worker: Mapped["Worker"] = relationship("Worker", back_populates="worker_sites")
    site: Mapped["Site"] = relationship(  # noqa: F821
        "Site", back_populates="worker_sites"
    )
