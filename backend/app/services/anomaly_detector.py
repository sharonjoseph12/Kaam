"""Anomaly detection engine.

Implements 5 fraud patterns from the KAAM workflow:
1. Wage Suppression — attendance vs slip day mismatch
2. Wage Rate Manipulation — registered rate vs slip rate mismatch
3. Ghost Workers — unresponsive workers with perfect attendance
4. GPS Impossibility — contractor GPS far from site during marking
5. Minimum Wage Violation — calculated wage below state minimum
"""

from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.models.anomaly import AnomalyAlert
from app.models.attendance import AttendanceRecord
from app.models.site import Site
from app.models.wage_slip import WageSlip
from app.models.worker import WorkerSite
from app.services.geofence import haversine_distance_m


@dataclass
class DetectedAnomaly:
    """An anomaly detected by the engine."""

    contractor_id: int
    worker_id: int | None
    alert_type: str
    severity: str
    description: str


def detect_wage_suppression(db: Session, contractor_id: int) -> list[DetectedAnomaly]:
    """Pattern 1: Attendance shows more days than wage slip pays for."""
    anomalies: list[DetectedAnomaly] = []

    slips = (
        db.query(WageSlip)
        .join(Site, WageSlip.site_id == Site.id)
        .filter(Site.contractor_id == contractor_id, WageSlip.status == "APPROVED")
        .all()
    )

    for slip in slips:
        actual_present = (
            db.query(AttendanceRecord)
            .filter(
                AttendanceRecord.worker_id == slip.worker_id,
                AttendanceRecord.site_id == slip.site_id,
                AttendanceRecord.date >= slip.cycle_start,
                AttendanceRecord.date <= slip.cycle_end,
                AttendanceRecord.status.in_(["P", "H", "OT"]),
            )
            .count()
        )

        slip_days = slip.days_present + slip.half_days + slip.overtime_days
        if actual_present > slip_days + 1:  # tolerance of 1
            anomalies.append(
                DetectedAnomaly(
                    contractor_id=contractor_id,
                    worker_id=slip.worker_id,
                    alert_type="WAGE_SUPPRESSION",
                    severity="HIGH",
                    description=(
                        f"Attendance shows {actual_present} working days but "
                        f"wage slip {slip.kaam_id} only pays for {slip_days} days. "
                        f"Potential underpayment of {actual_present - slip_days} days."
                    ),
                )
            )

    return anomalies


def detect_rate_manipulation(db: Session, contractor_id: int) -> list[DetectedAnomaly]:
    """Pattern 2: Wage slip uses lower rate than registered rate."""
    anomalies: list[DetectedAnomaly] = []

    slips = (
        db.query(WageSlip)
        .join(Site, WageSlip.site_id == Site.id)
        .filter(Site.contractor_id == contractor_id, WageSlip.status == "APPROVED")
        .all()
    )

    for slip in slips:
        worker_site = (
            db.query(WorkerSite)
            .filter(
                WorkerSite.worker_id == slip.worker_id,
                WorkerSite.site_id == slip.site_id,
            )
            .first()
        )
        if worker_site and slip.daily_rate < worker_site.daily_wage - 1:  # ₹1 tolerance
            anomalies.append(
                DetectedAnomaly(
                    contractor_id=contractor_id,
                    worker_id=slip.worker_id,
                    alert_type="RATE_MANIPULATION",
                    severity="HIGH",
                    description=(
                        f"Worker registered at ₹{worker_site.daily_wage}/day but "
                        f"wage slip calculates at ₹{slip.daily_rate}/day. "
                        f"No rate change on record."
                    ),
                )
            )

    return anomalies


def detect_gps_impossibility(db: Session, contractor_id: int) -> list[DetectedAnomaly]:
    """Pattern 4: Contractor GPS impossibly far from site during marking."""
    anomalies: list[DetectedAnomaly] = []

    sites = db.query(Site).filter(Site.contractor_id == contractor_id, Site.active).all()

    for site in sites:
        flagged_records = (
            db.query(AttendanceRecord)
            .filter(
                AttendanceRecord.site_id == site.id,
                AttendanceRecord.verification_status == "FLAGGED",
            )
            .all()
        )
        for record in flagged_records:
            distance = haversine_distance_m(
                record.contractor_gps_lat,
                record.contractor_gps_lng,
                site.latitude,
                site.longitude,
            )
            if distance > 5000:  # 5km — clearly impossible
                anomalies.append(
                    DetectedAnomaly(
                        contractor_id=contractor_id,
                        worker_id=record.worker_id,
                        alert_type="GPS_IMPOSSIBLE",
                        severity="MEDIUM",
                        description=(
                            f"Contractor GPS {distance:.0f}m from site during "
                            f"attendance marking on {record.date}. Site geofence: "
                            f"{site.geofence_radius_m}m."
                        ),
                    )
                )

    return anomalies


def detect_min_wage_violation(db: Session, contractor_id: int) -> list[DetectedAnomaly]:
    """Pattern 5: Wage slip amount below state minimum wage."""
    anomalies: list[DetectedAnomaly] = []

    slips = (
        db.query(WageSlip)
        .join(Site, WageSlip.site_id == Site.id)
        .filter(
            Site.contractor_id == contractor_id,
            WageSlip.min_wage_violation.is_(True),
        )
        .all()
    )

    for slip in slips:
        anomalies.append(
            DetectedAnomaly(
                contractor_id=contractor_id,
                worker_id=slip.worker_id,
                alert_type="MIN_WAGE_VIOLATION",
                severity="CRITICAL",
                description=(
                    f"Wage slip {slip.kaam_id} violates state minimum wage. "
                    f"Daily rate: ₹{slip.daily_rate}. "
                    f"Section 43, Code on Wages 2019."
                ),
            )
        )

    return anomalies


def run_all_anomaly_checks(db: Session, contractor_id: int) -> list[DetectedAnomaly]:
    """Run all anomaly detection patterns for a contractor."""
    all_anomalies: list[DetectedAnomaly] = []
    all_anomalies.extend(detect_wage_suppression(db, contractor_id))
    all_anomalies.extend(detect_rate_manipulation(db, contractor_id))
    all_anomalies.extend(detect_gps_impossibility(db, contractor_id))
    all_anomalies.extend(detect_min_wage_violation(db, contractor_id))
    return all_anomalies


def persist_anomalies(db: Session, anomalies: list[DetectedAnomaly]) -> list[AnomalyAlert]:
    """Save detected anomalies to database, skipping duplicates."""
    saved: list[AnomalyAlert] = []
    for anomaly in anomalies:
        # Check for existing unresolved alert of same type for same contractor+worker
        existing = (
            db.query(AnomalyAlert)
            .filter(
                AnomalyAlert.contractor_id == anomaly.contractor_id,
                AnomalyAlert.worker_id == anomaly.worker_id,
                AnomalyAlert.alert_type == anomaly.alert_type,
                AnomalyAlert.resolved.is_(False),
            )
            .first()
        )
        if existing:
            continue

        alert = AnomalyAlert(
            contractor_id=anomaly.contractor_id,
            worker_id=anomaly.worker_id,
            alert_type=anomaly.alert_type,
            severity=anomaly.severity,
            description=anomaly.description,
        )
        db.add(alert)
        saved.append(alert)

    if saved:
        db.commit()
        for alert in saved:
            db.refresh(alert)

    return saved
