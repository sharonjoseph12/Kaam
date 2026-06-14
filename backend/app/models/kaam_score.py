"""KAAM Score model."""

from datetime import datetime

from sqlalchemy import JSON, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class KaamScore(Base):
    """Worker's KAAM credit score with component breakdown."""

    __tablename__ = "kaam_scores"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    worker_id: Mapped[int] = mapped_column(ForeignKey("workers.id"), index=True)
    score: Mapped[int] = mapped_column(Integer)  # 0-100
    tier: Mapped[str] = mapped_column(String(20))  # Bronze, Silver, Gold, Platinum
    breakdown_json: Mapped[dict] = mapped_column(JSON)
    calculated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    # Relationships
    worker: Mapped["Worker"] = relationship(  # noqa: F821
        "Worker", back_populates="scores"
    )
