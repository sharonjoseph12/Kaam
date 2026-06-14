"""Dispute model."""

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Dispute(Base):
    """Worker-initiated dispute against a wage slip."""

    __tablename__ = "disputes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    slip_id: Mapped[int | None] = mapped_column(ForeignKey("wage_slips.id"), nullable=True)
    disputed_dates: Mapped[str] = mapped_column(Text)  # comma-separated dates
    worker_statement: Mapped[str] = mapped_column(Text)
    contractor_response: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(
        String(30), default="OPEN"
    )  # OPEN, CONTRACTOR_REVIEWING, RESOLVED, ESCALATED
    brief_pdf_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    worker: Mapped["Worker"] = relationship(  # noqa: F821
        "Worker", back_populates="disputes"
    )
