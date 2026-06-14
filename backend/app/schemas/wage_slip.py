"""Wage slip schemas."""

from datetime import date, datetime

from pydantic import BaseModel


class WageSlipGenerateRequest(BaseModel):
    """Request to generate wage slips for a contractor's cycle."""

    site_id: int
    cycle_start: date
    cycle_end: date


class WageSlipResponse(BaseModel):
    """Wage slip response."""

    id: int
    kaam_id: str
    worker_id: int
    site_id: int
    cycle_start: date
    cycle_end: date
    days_present: int
    half_days: int
    overtime_days: int
    absent_days: int
    daily_rate: float
    gross: float
    deductions_json: dict
    total_deductions: float
    net: float
    min_wage_violation: bool
    status: str
    approved_at: datetime | None
    created_at: datetime

    model_config = {"from_attributes": True}
