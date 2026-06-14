"""Inspector compliance dashboard schemas."""

from datetime import datetime

from pydantic import BaseModel


class ContractorComplianceSummary(BaseModel):
    """Contractor compliance overview for inspector dashboard."""

    contractor_id: int
    kaam_id: str
    contractor_name: str
    total_workers: int
    active_sites: int
    wage_slips_issued: int
    wage_slips_on_time_pct: float
    min_wage_violations: int
    open_disputes: int
    unresolved_anomalies: int
    compliance_score: float  # 0-100%


class ContractorComplianceReport(BaseModel):
    """Detailed compliance report for a single contractor."""

    contractor_id: int
    kaam_id: str
    contractor_name: str
    license_number: str | None
    state: str
    district: str
    total_workers: int
    active_sites: int
    appointment_letters_pct: float
    wage_slips_issued: int
    wage_slips_on_time_pct: float
    min_wage_violations: int
    total_disputes: int
    resolved_disputes: int
    anomaly_alerts: int
    generated_at: datetime
