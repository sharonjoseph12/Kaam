"""Anomaly alert schemas."""

from datetime import datetime

from pydantic import BaseModel


class AnomalyAlertResponse(BaseModel):
    """Anomaly alert response."""

    id: int
    contractor_id: int
    worker_id: int | None
    alert_type: str
    severity: str
    description: str
    resolved: bool
    resolved_at: datetime | None
    rectification_deadline: datetime | None
    escalated_to_inspector: bool
    created_at: datetime

    model_config = {"from_attributes": True}
