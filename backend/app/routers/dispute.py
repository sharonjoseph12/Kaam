"""Dispute management endpoints."""

from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dispute import Dispute
from app.schemas.dispute import DisputeCreate, DisputeRespond, DisputeResponse

router = APIRouter(prefix="/api/disputes", tags=["Disputes"])


@router.post("/", response_model=DisputeResponse, status_code=201)
def create_dispute(data: DisputeCreate, db: Session = Depends(get_db)):
    """Initiate a dispute (worker or on behalf of worker)."""
    dispute = Dispute(
        worker_id=data.worker_id,
        slip_id=data.slip_id,
        disputed_dates=data.disputed_dates,
        worker_statement=data.worker_statement,
        status="OPEN",
    )
    db.add(dispute)
    db.commit()
    db.refresh(dispute)
    return dispute


@router.get("/{dispute_id}", response_model=DisputeResponse)
def get_dispute(dispute_id: int, db: Session = Depends(get_db)):
    """Get dispute details."""
    dispute = db.query(Dispute).filter(Dispute.id == dispute_id).first()
    if not dispute:
        raise HTTPException(status_code=404, detail="Dispute not found")
    return dispute


@router.post("/{dispute_id}/respond", response_model=DisputeResponse)
def respond_to_dispute(
    dispute_id: int, data: DisputeRespond, db: Session = Depends(get_db)
):
    """Contractor responds to a dispute within the 48-hour window."""
    dispute = db.query(Dispute).filter(Dispute.id == dispute_id).first()
    if not dispute:
        raise HTTPException(status_code=404, detail="Dispute not found")

    if dispute.status not in ("OPEN", "CONTRACTOR_REVIEWING"):
        raise HTTPException(
            status_code=409,
            detail=f"Dispute in status {dispute.status}, cannot respond",
        )

    dispute.contractor_response = data.response

    if data.agree_to_correct:
        dispute.status = "RESOLVED"
        dispute.resolved_at = datetime.now(UTC)
    else:
        dispute.status = "ESCALATED"

    db.commit()
    db.refresh(dispute)
    return dispute


@router.get("/", response_model=list[DisputeResponse])
def list_disputes(
    worker_id: int | None = None,
    status: str | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List disputes with optional filters."""
    query = db.query(Dispute)
    if worker_id:
        query = query.filter(Dispute.worker_id == worker_id)
    if status:
        query = query.filter(Dispute.status == status.upper())

    disputes = query.order_by(Dispute.created_at.desc()).offset(skip).limit(limit).all()
    return disputes
