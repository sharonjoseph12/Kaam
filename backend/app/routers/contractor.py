"""Contractor registration and site management endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import create_access_token, hash_password, require_auth, verify_password
from app.database import get_db
from app.models.contractor import Contractor
from app.models.site import Site
from app.schemas.contractor import (
    ContractorCreate,
    ContractorLogin,
    ContractorResponse,
    SiteCreate,
    SiteResponse,
    TokenResponse,
)
from app.services.crypto import hash_aadhaar
from app.services.id_generator import generate_kaam_id

router = APIRouter(prefix="/api/contractor", tags=["Contractor"])


@router.post("/register", response_model=ContractorResponse, status_code=status.HTTP_201_CREATED)
def register_contractor(data: ContractorCreate, db: Session = Depends(get_db)):
    """Register a new contractor on the KAAM platform."""
    # Check existing phone
    existing = db.query(Contractor).filter(Contractor.phone == data.phone).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Phone number already registered",
        )

    # Check existing Aadhaar hash
    aadhaar_h = hash_aadhaar(data.aadhaar_number)
    existing_aadhaar = db.query(Contractor).filter(Contractor.aadhaar_hash == aadhaar_h).first()
    if existing_aadhaar:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Aadhaar already registered",
        )

    contractor = Contractor(
        kaam_id=generate_kaam_id("CTR"),
        name=data.name,
        aadhaar_hash=aadhaar_h,
        phone=data.phone,
        password_hash=hash_password(data.password),
        license_number=data.license_number,
        state=data.state.lower(),
        district=data.district,
        work_type=data.work_type,
    )
    db.add(contractor)
    db.commit()
    db.refresh(contractor)
    return contractor


@router.post("/login", response_model=TokenResponse)
def login_contractor(data: ContractorLogin, db: Session = Depends(get_db)):
    """Authenticate contractor and return JWT token."""
    contractor = db.query(Contractor).filter(Contractor.phone == data.phone).first()
    if not contractor or not verify_password(data.password, contractor.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone or password",
        )

    token = create_access_token({"sub": str(contractor.id)})
    return TokenResponse(
        access_token=token,
        contractor_id=contractor.id,
        kaam_id=contractor.kaam_id,
    )


@router.get("/me", response_model=ContractorResponse)
def get_current_contractor_profile(contractor: Contractor = Depends(require_auth)):
    """Get the authenticated contractor's profile."""
    return contractor


@router.get("/{contractor_id}", response_model=ContractorResponse)
def get_contractor(contractor_id: int, db: Session = Depends(get_db)):
    """Get contractor by ID."""
    contractor = db.query(Contractor).filter(Contractor.id == contractor_id).first()
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")
    return contractor


# --- Sites ---
@router.post("/{contractor_id}/sites", response_model=SiteResponse, status_code=201)
def create_site(
    contractor_id: int,
    data: SiteCreate,
    db: Session = Depends(get_db),
):
    """Add a construction site for a contractor."""
    contractor = db.query(Contractor).filter(Contractor.id == contractor_id).first()
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")

    site = Site(
        kaam_id=generate_kaam_id("SITE"),
        contractor_id=contractor_id,
        name=data.name,
        latitude=data.latitude,
        longitude=data.longitude,
        geofence_radius_m=data.geofence_radius_m,
        site_type=data.site_type,
        start_date=data.start_date,
        end_date=data.end_date,
    )
    db.add(site)
    db.commit()
    db.refresh(site)
    return site


@router.get("/{contractor_id}/sites", response_model=list[SiteResponse])
def list_sites(contractor_id: int, db: Session = Depends(get_db)):
    """List all sites for a contractor."""
    sites = (
        db.query(Site)
        .filter(Site.contractor_id == contractor_id)
        .order_by(Site.created_at.desc())
        .all()
    )
    return sites
