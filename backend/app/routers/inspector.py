"""Inspector compliance dashboard endpoints."""

from datetime import UTC, datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.anomaly import AnomalyAlert
from app.models.contractor import Contractor
from app.models.dispute import Dispute
from app.models.site import Site
from app.models.wage_slip import WageSlip
from app.models.worker import WorkerSite
from app.schemas.anomaly import AnomalyAlertResponse
from app.schemas.inspector import ContractorComplianceReport, ContractorComplianceSummary

router = APIRouter(prefix="/api/inspector", tags=["Inspector"])


@router.get("/contractors", response_model=list[ContractorComplianceSummary])
def list_contractors_compliance(
    state: str | None = None,
    district: str | None = None,
    db: Session = Depends(get_db),
):
    """List all contractors with compliance scores for inspector dashboard."""
    query = db.query(Contractor)
    if state:
        query = query.filter(Contractor.state == state.lower())
    if district:
        query = query.filter(Contractor.district == district)

    contractors = query.all()
    summaries: list[ContractorComplianceSummary] = []

    for c in contractors:
        site_ids = [s.id for s in db.query(Site).filter(Site.contractor_id == c.id).all()]
        active_sites = db.query(Site).filter(
            Site.contractor_id == c.id, Site.active.is_(True)
        ).count()

        total_workers = (
            db.query(WorkerSite)
            .filter(WorkerSite.site_id.in_(site_ids), WorkerSite.end_date.is_(None))
            .count()
            if site_ids
            else 0
        )

        slips_issued = (
            db.query(WageSlip).filter(WageSlip.site_id.in_(site_ids)).count()
            if site_ids
            else 0
        )

        slips_approved = (
            db.query(WageSlip)
            .filter(
                WageSlip.site_id.in_(site_ids),
                WageSlip.status.in_(["APPROVED", "PAID-VERIFIED", "PAID-UNVERIFIED"]),
            )
            .count()
            if site_ids
            else 0
        )

        on_time_pct = (slips_approved / slips_issued * 100) if slips_issued > 0 else 100.0

        min_violations = (
            db.query(WageSlip)
            .filter(WageSlip.site_id.in_(site_ids), WageSlip.min_wage_violation.is_(True))
            .count()
            if site_ids
            else 0
        )

        worker_ids = [
            ws.worker_id
            for ws in db.query(WorkerSite)
            .filter(WorkerSite.site_id.in_(site_ids))
            .all()
        ] if site_ids else []

        open_disputes = (
            db.query(Dispute)
            .filter(Dispute.worker_id.in_(worker_ids), Dispute.status.in_(["OPEN", "CONTRACTOR_REVIEWING"]))
            .count()
            if worker_ids
            else 0
        )

        unresolved = (
            db.query(AnomalyAlert)
            .filter(AnomalyAlert.contractor_id == c.id, AnomalyAlert.resolved.is_(False))
            .count()
        )

        # Compliance score: 100 - penalties
        score = 100.0
        score -= min_violations * 10
        score -= open_disputes * 5
        score -= unresolved * 3
        score = max(0.0, score)

        summaries.append(
            ContractorComplianceSummary(
                contractor_id=c.id,
                kaam_id=c.kaam_id,
                contractor_name=c.name,
                total_workers=total_workers,
                active_sites=active_sites,
                wage_slips_issued=slips_issued,
                wage_slips_on_time_pct=round(on_time_pct, 1),
                min_wage_violations=min_violations,
                open_disputes=open_disputes,
                unresolved_anomalies=unresolved,
                compliance_score=round(score, 1),
            )
        )

    return summaries


@router.get("/contractor/{contractor_id}/report", response_model=ContractorComplianceReport)
def get_contractor_compliance_report(contractor_id: int, db: Session = Depends(get_db)):
    """Get detailed compliance report for a specific contractor."""
    contractor = db.query(Contractor).filter(Contractor.id == contractor_id).first()
    if not contractor:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Contractor not found")

    site_ids = [s.id for s in db.query(Site).filter(Site.contractor_id == contractor_id).all()]
    active_sites = db.query(Site).filter(
        Site.contractor_id == contractor_id, Site.active.is_(True)
    ).count()

    total_workers = (
        db.query(WorkerSite)
        .filter(WorkerSite.site_id.in_(site_ids), WorkerSite.end_date.is_(None))
        .count()
        if site_ids
        else 0
    )

    slips_issued = (
        db.query(WageSlip).filter(WageSlip.site_id.in_(site_ids)).count() if site_ids else 0
    )

    slips_approved = (
        db.query(WageSlip)
        .filter(
            WageSlip.site_id.in_(site_ids),
            WageSlip.status.in_(["APPROVED", "PAID-VERIFIED", "PAID-UNVERIFIED"]),
        )
        .count()
        if site_ids
        else 0
    )

    on_time_pct = (slips_approved / slips_issued * 100) if slips_issued > 0 else 100.0

    min_violations = (
        db.query(WageSlip)
        .filter(WageSlip.site_id.in_(site_ids), WageSlip.min_wage_violation.is_(True))
        .count()
        if site_ids
        else 0
    )

    worker_ids = [
        ws.worker_id
        for ws in db.query(WorkerSite).filter(WorkerSite.site_id.in_(site_ids)).all()
    ] if site_ids else []

    total_disputes = (
        db.query(Dispute).filter(Dispute.worker_id.in_(worker_ids)).count()
        if worker_ids
        else 0
    )
    resolved_disputes = (
        db.query(Dispute)
        .filter(Dispute.worker_id.in_(worker_ids), Dispute.status == "RESOLVED")
        .count()
        if worker_ids
        else 0
    )

    anomaly_count = (
        db.query(AnomalyAlert)
        .filter(AnomalyAlert.contractor_id == contractor_id)
        .count()
    )

    return ContractorComplianceReport(
        contractor_id=contractor.id,
        kaam_id=contractor.kaam_id,
        contractor_name=contractor.name,
        license_number=contractor.license_number,
        state=contractor.state,
        district=contractor.district,
        total_workers=total_workers,
        active_sites=active_sites,
        appointment_letters_pct=100.0,  # all registered workers get auto letters
        wage_slips_issued=slips_issued,
        wage_slips_on_time_pct=round(on_time_pct, 1),
        min_wage_violations=min_violations,
        total_disputes=total_disputes,
        resolved_disputes=resolved_disputes,
        anomaly_alerts=anomaly_count,
        generated_at=datetime.now(UTC),
    )


@router.get("/anomalies", response_model=list[AnomalyAlertResponse])
def list_anomalies_for_inspector(
    severity: str | None = None,
    resolved: bool | None = None,
    db: Session = Depends(get_db),
):
    """List anomaly alerts, optionally filtered by severity and resolution status."""
    query = db.query(AnomalyAlert)
    if severity:
        query = query.filter(AnomalyAlert.severity == severity.upper())
    if resolved is not None:
        query = query.filter(AnomalyAlert.resolved == resolved)

    alerts = query.order_by(AnomalyAlert.created_at.desc()).limit(200).all()
    return alerts
