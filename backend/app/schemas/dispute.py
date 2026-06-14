"""Dispute schemas."""

from datetime import datetime

from pydantic import BaseModel, Field


class DisputeCreate(BaseModel):
    """Create dispute request."""

    worker_id: int
    slip_id: int | None = None
    disputed_dates: str = Field(..., max_length=500)
    worker_statement: str = Field(..., max_length=2000)


class DisputeRespond(BaseModel):
    """Contractor response to dispute."""

    response: str = Field(..., max_length=2000)
    agree_to_correct: bool


class DisputeResponse(BaseModel):
    """Dispute response."""

    id: int
    worker_id: int
    slip_id: int | None
    disputed_dates: str
    worker_statement: str
    contractor_response: str | None
    status: str
    brief_pdf_url: str | None
    created_at: datetime
    resolved_at: datetime | None

    model_config = {"from_attributes": True}
