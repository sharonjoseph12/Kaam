"""Anomaly alert management endpoints."""

from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.anomaly import AnomalyAlert
from app.schemas.anomaly import AnomalyAlertResponse
from app.services.anomaly_detector import persist_anomalies, run_all_anomaly_checks

router = APIRouter(prefix="/api/anomalies", tags=["Anomalies"])


@router.get("/", response_model=list[AnomalyAlertResponse])
def list_anomalies(
    contractor_id: int | None = None,
    severity: str | None = None,
    resolved: bool | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List anomaly alerts with optional filters."""
    query = db.query(AnomalyAlert)
    if contractor_id:
        query = query.filter(AnomalyAlert.contractor_id == contractor_id)
    if severity:
        query = query.filter(AnomalyAlert.severity == severity.upper())
    if resolved is not None:
        query = query.filter(AnomalyAlert.resolved == resolved)

    alerts = query.order_by(AnomalyAlert.created_at.desc()).offset(skip).limit(limit).all()
    return alerts


@router.post("/{alert_id}/resolve", response_model=AnomalyAlertResponse)
def resolve_anomaly(alert_id: int, db: Session = Depends(get_db)):
    """Mark an anomaly alert as resolved."""
    alert = db.query(AnomalyAlert).filter(AnomalyAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Anomaly alert not found")

    if alert.resolved:
        raise HTTPException(status_code=409, detail="Alert already resolved")

    alert.resolved = True
    alert.resolved_at = datetime.now(UTC)
    db.commit()
    db.refresh(alert)
    return alert


@router.post("/scan/{contractor_id}", response_model=list[AnomalyAlertResponse])
def trigger_anomaly_scan(contractor_id: int, db: Session = Depends(get_db)):
    """Manually trigger anomaly scan for a contractor (also runs nightly via cron)."""
    anomalies = run_all_anomaly_checks(db, contractor_id)
    saved = persist_anomalies(db, anomalies)
    return saved
