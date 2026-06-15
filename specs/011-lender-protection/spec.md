# Feature Specification: Lender Dashboard & Protection Triggers

**Feature Branch**: `011-lender-protection`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — Modules 16, 17 (Lender/NGO Dashboard, Income Interruption Protection)  
**Depends On**: 006-v2-database-auth, 010-kaam-score-pass  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol  
**References**: See [REFERENCES.md](../REFERENCES.md) — adopt credit risk modeling patterns, risk band display, loan eligibility presentation

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Lender Reviews Consented Worker Profiles (Priority: P1)

A lender or NGO logs into their dashboard and sees a list of workers who have granted data-sharing consent. For each worker, they see: verified monthly income, attendance consistency, wage slip count, KAAM Score with explanation, safe loan recommendation, contractor trust score, dispute history, and income gap risk.

**Why this priority**: The lender dashboard closes the ecosystem loop — it's where verified income data becomes actionable for financial inclusion.

**Independent Test**: Worker grants consent → lender logs in → sees worker profile with all verified data fields.

**Acceptance Scenarios**:

1. **Given** a lender logged in, **When** they view the dashboard, **Then** they see only workers who have granted consent (not all workers)
2. **Given** a consented worker (Ramesh, monthly income ₹16,800, KAAM Score 83, Safe Loan ₹4,000), **When** the lender clicks their profile, **Then** they see the full verified profile with score explanation and contractor trust
3. **Given** a worker who revokes consent, **When** the lender refreshes, **Then** that worker no longer appears
4. **Given** the lender dashboard, **When** they filter workers, **Then** they can filter by: KAAM Score band, income range, skill type, contractor trust level

---

### User Story 2 - Lender Requests Additional Consent (Priority: P2)

A lender can request consent from a specific worker (identified by a referral or KAAM ID). The worker receives the request in their KAAM Pass and can approve or reject it.

**Why this priority**: Enables targeted outreach by lenders while keeping the worker in control.

**Independent Test**: Lender sends consent request → worker sees it → worker approves → lender sees profile.

**Acceptance Scenarios**:

1. **Given** a lender, **When** they enter a worker's KAAM ID and request consent, **Then** the worker sees a consent request in their KAAM Pass
2. **Given** a consent request, **When** the worker approves, **Then** the specific lender can see the worker's profile
3. **Given** a consent request, **When** the worker rejects, **Then** the lender sees "Consent Denied" and cannot access the profile

---

### User Story 3 - Income Interruption Detection (Priority: P2)

The system monitors worker attendance patterns and triggers a "protection case" when it detects income interruption. Trigger conditions: Work Stoppage (7 days no attendance after stable work), Site Accident (marked by contractor and worker), Heavy Rain/weather (site activity stopped), Site Shutdown (contractor marks site closed).

**Why this priority**: This replaces traditional insurance with a smarter, data-driven emergency support mechanism. Not required for core demo but adds significant impact.

**Independent Test**: Worker has 24 stable days → 7 days zero attendance → protection case triggers with suggested support amount.

**Acceptance Scenarios**:

1. **Given** a worker with 24 days of work in the last 30 days, **When** they have 0 attendance for 7 consecutive days, **Then** a protection case is created with trigger "Work Stoppage" and suggested support ₹1,000
2. **Given** a contractor marks site as closed, **When** workers assigned to that site have their work interrupted, **Then** protection cases are created for affected workers with trigger "Site Shutdown"
3. **Given** a protection case, **When** a lender or NGO views it, **Then** they see: worker name, trigger type, suggested support amount, work history before interruption, and verification that the interruption is data-backed
4. **Given** a protection case, **When** displayed, **Then** the wording is "Income interruption detected — partner can trigger emergency support" NOT "Insurance payout"

---

### User Story 4 - Lender Dashboard Analytics (Priority: P3)

Lenders see aggregate analytics: total consented workers, average KAAM Score, score distribution chart, top skills available, regional breakdown.

**Why this priority**: Analytics help lenders plan their outreach and assess portfolio quality, but are not required for core demo.

**Independent Test**: Dashboard shows charts with aggregated data from consented profiles.

**Acceptance Scenarios**:

1. **Given** 20 consented workers, **When** the lender views analytics, **Then** they see distribution of KAAM Scores, average income, and skill breakdown

---

### Edge Cases

- What happens when no workers have granted consent? → Lender sees empty dashboard with explanation of how consent works.
- What happens when a protection case is triggered for a worker who already has an active case? → No duplicate case. Existing case is updated if trigger changes.
- What happens when a lender tries to access a non-consented worker by URL? → 403 Access Denied.
- What happens when the weather trigger fires but workers are still working? → Protection case is created but not auto-disbursed. Partner reviews first.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Lender dashboard MUST show only consent-granted worker profiles
- **FR-002**: Each worker profile MUST display: name, verified monthly income, attendance consistency, wage slip count, KAAM Score, score explanation, safe loan recommendation, contractor trust score, dispute history, income gap risk
- **FR-003**: Lenders MUST be able to filter and search worker profiles
- **FR-004**: System MUST support lender-initiated consent requests
- **FR-005**: Income interruption detection MUST monitor for 4 trigger conditions: Work Stoppage (7 days), Site Accident, Weather, Site Shutdown
- **FR-006**: Protection cases MUST include: worker_id, trigger_type, trigger_date, suggested_support_amount, verification_data, status
- **FR-007**: Protection wording MUST avoid "insurance" — use "income interruption protection" or "emergency support"
- **FR-008**: System MUST NOT auto-disburse funds — protection cases are recommendations for partner action
- **FR-009**: Lender MUST NOT be able to modify worker data — view-only access
- **FR-010**: All lender access MUST be logged in audit trail
- **FR-011**: Lender dashboard MUST show risk bands with color coding: Green (Strong, 86+), Blue (Good, 71-85), Yellow (Medium, 51-70), Red (Low/Very Low, <50) — inspired by credit risk modeling topic
- **FR-012**: Lender MUST be able to export worker profile as PDF (for internal loan committee) using jsPDF — inspired by trackAS export pattern
- **FR-013**: Lender MUST be able to export batch worker data as XLSX (attendance, scores, income) using file-saver + xlsx library
- **FR-014**: Each worker profile MUST show contractor trust score as a data quality signal — “This worker's income is verified by a contractor with Trust Score 92”

### Key Entities

- **Lender Profile**: Organization name, type (NBFC/NGO/MFI), contact info
- **Lender Consent**: Worker ↔ Lender mapping with consent status and timestamp
- **Protection Case**: Worker + trigger type + suggested amount + status + verification data

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lender can view a consented worker's full profile in under 5 seconds
- **SC-002**: Consent changes (grant/revoke) take effect within 2 seconds across all dashboards
- **SC-003**: Income interruption detection identifies work stoppage within 24 hours of the 7th absent day
- **SC-004**: 100% of lender access is logged in audit trail
- **SC-005**: Zero private worker data is exposed to non-consented lenders

## Assumptions

- Protection trigger runs as a scheduled check (daily cron or on-demand)
- Suggested support amounts are configurable per trigger type
- Lenders are manually approved during v1 (no self-service onboarding)
- Weather-based triggers are manually entered by contractors (no weather API in v1)
- Protection cases are informational — actual disbursement happens outside the platform

## Practical UX Requirements

### For Lenders
- **Data density is fine**: Lenders are office workers on laptops. They want tables, filters, and numbers. Don't oversimplify.
- **One-click export**: Lender should be able to export a worker profile as PDF (for their internal loan committee).
- **Trust signals prominent**: Contractor trust score and verification method (GPS + worker confirmed) should be visible at a glance.

### For Protection Cases
- **Not automatic payouts**: The system DETECTS and RECOMMENDS. Partners decide. This is critical to avoid regulatory issues.
- **Clear trigger evidence**: Show the data that triggered the case ("24 days work in June, 0 days in July") so partners can verify.

## Dead Code Cleanup (Execute After This Spec)

- [ ] Delete `backend/app/routers/shield.py` — replaced by protection trigger logic
- [ ] Delete `backend/app/models/insurance.py` — insurance concept replaced by protection
- [ ] Delete `kaam-backend/supabase/migrations/20260614140000_top1_features.sql` — insurance_policies table removed
- [ ] Remove any remaining insurance-related references
- [ ] Run `npx knip`
- [ ] Run `npx eslint . --max-warnings 0`
