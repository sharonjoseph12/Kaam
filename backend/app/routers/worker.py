"""Worker registration and management endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.site import Site
from app.models.worker import Worker, WorkerSite
from app.schemas.worker import (
    WorkerCreate,
    WorkerDetailResponse,
    WorkerResponse,
    WorkerSiteResponse,
)
from app.services.crypto import hash_aadhaar
from app.services.id_generator import generate_kaam_id
from app.stubs.whatsapp import send_welcome_message

router = APIRouter(prefix="/api/workers", tags=["Workers"])


@router.post("/register", response_model=WorkerDetailResponse, status_code=status.HTTP_201_CREATED)
def register_worker(data: WorkerCreate, db: Session = Depends(get_db)):
    """Register a worker and assign to a site."""
    # Validate site exists
    site = db.query(Site).filter(Site.id == data.site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")

    # Check if worker already exists by Aadhaar
    aadhaar_h = hash_aadhaar(data.aadhaar_number)
    worker = db.query(Worker).filter(Worker.aadhaar_hash == aadhaar_h).first()

    if not worker:
        worker = Worker(
            kaam_id=generate_kaam_id("WKR"),
            aadhaar_hash=aadhaar_h,
            name=data.name,
            whatsapp_number=data.whatsapp_number,
        )
        db.add(worker)
        db.flush()

    # Check if already assigned to this site
    existing_assignment = (
        db.query(WorkerSite)
        .filter(
            WorkerSite.worker_id == worker.id,
            WorkerSite.site_id == data.site_id,
            WorkerSite.end_date.is_(None),
        )
        .first()
    )
    if existing_assignment:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Worker already assigned to this site",
        )

    worker_site = WorkerSite(
        worker_id=worker.id,
        site_id=data.site_id,
        category=data.category.lower(),
        daily_wage=data.daily_wage,
        wage_cycle=data.wage_cycle,
        start_date=data.start_date,
    )
    db.add(worker_site)
    db.commit()
    db.refresh(worker)
    db.refresh(worker_site)

    # Send WhatsApp welcome message (stub)
    if worker.whatsapp_number:
        send_welcome_message(worker.name, worker.whatsapp_number, site.name)

    sites = db.query(WorkerSite).filter(WorkerSite.worker_id == worker.id).all()
    return WorkerDetailResponse(
        worker=WorkerResponse.model_validate(worker),
        sites=[WorkerSiteResponse.model_validate(ws) for ws in sites],
    )


@router.get("/{worker_id}", response_model=WorkerDetailResponse)
def get_worker(worker_id: int, db: Session = Depends(get_db)):
    """Get worker by ID with site assignments."""
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    sites = db.query(WorkerSite).filter(WorkerSite.worker_id == worker_id).all()
    return WorkerDetailResponse(
        worker=WorkerResponse.model_validate(worker),
        sites=[WorkerSiteResponse.model_validate(ws) for ws in sites],
    )


@router.get("/site/{site_id}", response_model=list[WorkerResponse])
def list_workers_at_site(site_id: int, db: Session = Depends(get_db)):
    """List all workers at a site."""
    worker_ids = (
        db.query(WorkerSite.worker_id)
        .filter(WorkerSite.site_id == site_id, WorkerSite.end_date.is_(None))
        .all()
    )
    workers = (
        db.query(Worker)
        .filter(Worker.id.in_([w[0] for w in worker_ids]))
        .all()
    )
    return workers
