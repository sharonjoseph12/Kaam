"""Insurance model."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Insurance(Base):
    """Parametric insurance policy via Bima Sugam."""

    __tablename__ = "insurance_policies"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    policy_ref: Mapped[str | None] = mapped_column(String(100), nullable=True)
    daily_premium: Mapped[float] = mapped_column(Float, default=2.0)  # ₹2/day
    coverage_amount: Mapped[float] = mapped_column(Float)  # based on KAAM score tier
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    worker: Mapped["Worker"] = relationship(  # noqa: F821
        "Worker", back_populates="insurance_policies"
    )
