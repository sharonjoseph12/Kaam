"""Anomaly alert model."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class AnomalyAlert(Base):
    """Fraud/anomaly detection alert for contractors."""

    __tablename__ = "anomaly_alerts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    contractor_id: Mapped[int] = mapped_column(ForeignKey("contractors.id"), index=True)
    worker_id: Mapped[int | None] = mapped_column(
        ForeignKey("workers.id"), nullable=True, index=True
    )
    alert_type: Mapped[str] = mapped_column(
        String(50)
    )  # WAGE_SUPPRESSION, RATE_MANIPULATION, GHOST_WORKER, GPS_IMPOSSIBLE, MIN_WAGE_VIOLATION
    severity: Mapped[str] = mapped_column(String(20))  # LOW, MEDIUM, HIGH, CRITICAL
    description: Mapped[str] = mapped_column(Text)
    details_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    rectification_deadline: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    escalated_to_inspector: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    contractor: Mapped["Contractor"] = relationship(  # noqa: F821
        "Contractor", back_populates="anomaly_alerts"
    )


