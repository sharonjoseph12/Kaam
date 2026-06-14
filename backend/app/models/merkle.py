"""Merkle root model."""

from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class MerkleRoot(Base):
    """Daily Merkle root for cryptographic audit trail."""

    __tablename__ = "merkle_roots"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    contractor_id: Mapped[int] = mapped_column(ForeignKey("contractors.id"), index=True)
    date: Mapped[date] = mapped_column(Date, index=True)
    root_hash: Mapped[str] = mapped_column(String(64))
    record_count: Mapped[int] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
