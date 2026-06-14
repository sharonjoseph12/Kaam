"""Loan model."""

from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Loan(Base):
    """Micro-loan facilitated via Rang De."""

    __tablename__ = "loans"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    kaam_id: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    amount: Mapped[float] = mapped_column(Float)
    interest_rate: Mapped[float] = mapped_column(Float, default=0.02)  # 2% flat
    interest_amount: Mapped[float] = mapped_column(Float)
    total_repayment: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(
        String(20), default="PENDING"
    )  # PENDING, APPROVED, DISBURSED, REPAID, REJECTED, DEFAULTED
    rangde_ref: Mapped[str | None] = mapped_column(String(100), nullable=True)
    repayment_date: Mapped[date] = mapped_column(Date)
    disbursed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    repaid_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    worker: Mapped["Worker"] = relationship(  # noqa: F821
        "Worker", back_populates="loans"
    )
