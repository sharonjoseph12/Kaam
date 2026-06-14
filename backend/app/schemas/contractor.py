"""Contractor and Site schemas."""

from datetime import date, datetime

from pydantic import BaseModel, Field


# --- Auth ---
class ContractorLogin(BaseModel):
    """Login request."""

    phone: str
    password: str


class TokenResponse(BaseModel):
    """JWT token response."""

    access_token: str
    token_type: str = "bearer"
    contractor_id: int
    kaam_id: str


# --- Contractor ---
class ContractorCreate(BaseModel):
    """Contractor registration request."""

    name: str = Field(..., max_length=200)
    aadhaar_number: str = Field(..., min_length=12, max_length=12)
    phone: str = Field(..., max_length=15)
    password: str = Field(..., min_length=6)
    license_number: str | None = None
    state: str = Field(default="karnataka", max_length=50)
    district: str = Field(..., max_length=100)
    work_type: str = Field(..., max_length=50)


class ContractorResponse(BaseModel):
    """Contractor response."""

    id: int
    kaam_id: str
    name: str
    phone: str
    license_number: str | None
    state: str
    district: str
    work_type: str
    subscription_tier: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Site ---
class SiteCreate(BaseModel):
    """Site creation request."""

    name: str = Field(..., max_length=200)
    latitude: float
    longitude: float
    geofence_radius_m: int = Field(default=100, ge=50, le=500)
    site_type: str = Field(..., max_length=50)
    start_date: date
    end_date: date | None = None


class SiteResponse(BaseModel):
    """Site response."""

    id: int
    kaam_id: str
    contractor_id: int
    name: str
    latitude: float
    longitude: float
    geofence_radius_m: int
    site_type: str
    start_date: date
    end_date: date | None
    active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
