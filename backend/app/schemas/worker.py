"""Worker schemas."""

from datetime import date, datetime

from pydantic import BaseModel, Field


class WorkerCreate(BaseModel):
    """Worker registration request."""

    aadhaar_number: str = Field(..., min_length=12, max_length=12)
    name: str = Field(..., max_length=200)
    whatsapp_number: str | None = Field(default=None, max_length=15)
    site_id: int
    category: str = Field(..., max_length=50)
    daily_wage: float = Field(..., gt=0)
    wage_cycle: str = Field(default="monthly", max_length=20)
    start_date: date


class WorkerResponse(BaseModel):
    """Worker response."""

    id: int
    kaam_id: str
    name: str
    whatsapp_number: str | None
    kaam_score: int
    created_at: datetime

    model_config = {"from_attributes": True}


class WorkerSiteResponse(BaseModel):
    """Worker-site assignment response."""

    id: int
    worker_id: int
    site_id: int
    category: str
    daily_wage: float
    wage_cycle: str
    start_date: date
    end_date: date | None

    model_config = {"from_attributes": True}


class WorkerDetailResponse(BaseModel):
    """Detailed worker response with site assignments."""

    worker: WorkerResponse
    sites: list[WorkerSiteResponse]
