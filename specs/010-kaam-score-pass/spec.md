# Feature Specification: KAAM Score, Safe Loan & Worker KAAM Pass

**Feature Branch**: `010-kaam-score-pass`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — Modules 11, 12, 13, 14, 15 (Worker KAAM Pass, KAAM Score, Score Explanation, Contractor Trust Score, Safe Loan Recommendation)  
**Depends On**: 006-v2-database-auth, 007-contractor-dashboard, 008-attendance-disputes, 009-wage-slip-verification  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol  
**References**: See [REFERENCES.md](../REFERENCES.md) — adopt SHAP-style score explanation, credit scoring UX, credit risk modeling patterns

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Worker Views Their KAAM Pass (Priority: P1)

A worker opens the KAAM Pass — their digital income passport. They see 10 sections: Profile, Verified Work Days, Monthly Income, Attendance History, Wage Slips, KAAM Score, Safe Loan Limit, Disputes, Protection Status, and Consent Controls.

**Why this priority**: The KAAM Pass is the product's identity. It's what differentiates this from a payroll app — the worker OWNS this data.

**Independent Test**: Worker with 24 days attendance and 2 wage slips logs in → sees full KAAM Pass with real data across all 10 sections.

**Acceptance Scenarios**:

1. **Given** a worker with attendance and wage history, **When** they open their KAAM Pass, **Then** they see all 10 sections populated with real data
2. **Given** a worker named Ramesh with 24 verified work days, monthly income ₹16,800, KAAM Score 83, **When** they view their pass, **Then** they see exactly these values calculated from their records
3. **Given** the KAAM Pass, **When** viewed on a low-end phone, **Then** it loads in under 3 seconds, uses large buttons, minimal text, and is mobile-first

---

### User Story 2 - KAAM Score Calculation with 7 Components (Priority: P1)

The system calculates a KAAM Score (0-100) from 7 weighted components: Attendance Consistency (25%), Wage Stability (25%), Contractor Trust (15%), Dispute Score (10%), Income Gap Score (10%), Repayment Score (10%), Profile Completeness (5%). Score updates after each wage cycle.

**Why this priority**: The score is the bridge between work records and financial access. It must be accurate, explainable, and fair.

**Independent Test**: Worker with known data → score calculates to expected value → explanation shows correct positive/risk factors.

**Acceptance Scenarios**:

1. **Given** a worker with: Attendance 92, Wage Stability 80, Contractor Trust 84, Disputes 90, Income Gap 70, Repayment 60, Profile 100, **When** score is calculated, **Then** KAAM Score = 0.25×92 + 0.25×80 + 0.15×84 + 0.10×90 + 0.10×70 + 0.10×60 + 0.05×100 = 83
2. **Given** a calculated score, **When** displayed, **Then** it shows the band: Very Low (0-30), Low (31-50), Medium (51-70), Good (71-85), Strong (86-100)
3. **Given** a score, **When** the explanation is shown, **Then** it lists positive factors ("24 verified work days", "Stable wage income") and risk factors ("No repayment history", "Income depends on one site")

---

### User Story 3 - Contractor Trust Score (Priority: P2)

The system calculates a trust score (0-100) for each contractor based on 6 components: Worker Confirmation Rate (25%), GPS Match Rate (20%), Dispute Ratio (20%), Wage Slip Consistency (15%), Site Activity Pattern (10%), Repayment Outcome (10%).

**Why this priority**: Lenders need to trust both the worker AND the contractor who generated the data. This dual trust is a key innovation.

**Independent Test**: Contractor with known metrics → trust score calculates correctly → feeds into worker KAAM Scores.

**Acceptance Scenarios**:

1. **Given** a contractor with 92% confirmation rate, consistent GPS, 2 unresolved disputes, **When** trust score is calculated, **Then** the score reflects these inputs accurately
2. **Given** a contractor trust score, **When** it changes, **Then** all their workers' KAAM Scores are recalculated (since contractor trust is 15% of KAAM Score)

---

### User Story 4 - Safe Loan Recommendation (Priority: P1)

When a worker or lender requests a loan assessment, the system calculates a safe loan amount based on the rule: "Weekly repayment should not exceed 20% of verified weekly income." If the worker requests more than the safe amount, KAAM recommends the safe amount with explanation.

**Why this priority**: This is the responsible finance differentiator — the system protects workers from overborrowing.

**Independent Test**: Worker with ₹16,800 monthly income requests ₹10,000 → system recommends ₹4,000-₹5,000 with clear explanation.

**Acceptance Scenarios**:

1. **Given** a worker with verified monthly income ₹16,800, **When** they request ₹10,000 loan, **Then** system calculates: Weekly Income = ₹4,200, Max Weekly Repayment = ₹840, Safe Amount (6 weeks) = ₹5,040, Recommended = ₹4,000-₹5,000
2. **Given** a safe loan recommendation, **When** displayed to worker, **Then** it shows: "You requested ₹10,000. KAAM recommends ₹4,000 because repayment should stay within safe limits."
3. **Given** a worker with KAAM Score below 30, **When** loan recommendation is requested, **Then** system shows "Not yet eligible — build more verified work history"

---

### User Story 5 - Worker Controls Data Consent (Priority: P2)

A worker can toggle whether their KAAM Pass data is shared with lenders/NGOs. When consent is granted, lenders can see the worker's profile. When revoked, the worker disappears from lender views.

**Why this priority**: Data consent is a privacy requirement and a key ethical differentiator.

**Independent Test**: Worker grants consent → appears in lender dashboard → revokes → disappears.

**Acceptance Scenarios**:

1. **Given** a worker, **When** they toggle "Share with Lenders" ON, **Then** their profile becomes visible to lenders with timestamp recorded
2. **Given** a worker with consent ON, **When** they toggle OFF, **Then** their profile immediately disappears from all lender views

---

### Edge Cases

- What happens when a worker has no attendance data yet? → KAAM Score shows "Insufficient Data" instead of 0.
- What happens when the contractor trust score drops to 0? → All workers under that contractor get a warning in their score explanation.
- What happens when a worker is assigned to multiple contractors? → Score uses weighted average of contractor trust scores.
- What happens when repayment history doesn't exist? → Repayment Score defaults to 50 (neutral, not penalized).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Worker KAAM Pass MUST display 10 sections: Profile, Verified Work Days, Monthly Income, Attendance History, Wage Slips, KAAM Score, Safe Loan Limit, Disputes, Protection Status, Consent Controls
- **FR-002**: KAAM Score MUST be calculated from 7 weighted components per v2 formula
- **FR-003**: Score MUST include human-readable explanation with positive and risk factors — SHAP waterfall-style: show each component's contribution as a horizontal bar with “+23/25” format
- **FR-004**: Score MUST be classified into 5 bands: Very Low (0-30), Low (31-50), Medium (51-70), Good (71-85), Strong (86-100) — simpler than FICO for accessibility
- **FR-004a**: Score explanation MUST include an actionable tip: "Work consistently for 2 more weeks to unlock higher loan limits" style guidance
- **FR-004b**: Score history MUST be stored and displayed as a trend line chart — workers see their score going UP over time (motivating)
- **FR-004c**: KAAM Score display MUST use an animated circular gauge (like fitness score) — workers understand this intuitively
- **FR-005**: Contractor Trust Score MUST be calculated from 6 components
- **FR-006**: Safe Loan Recommendation MUST use the 20% weekly income rule
- **FR-007**: System MUST show clear explanation when recommending less than requested amount
- **FR-008**: Worker consent MUST be a toggle with timestamp tracking
- **FR-009**: Revoking consent MUST immediately remove worker from lender visibility
- **FR-010**: KAAM Score MUST NOT use: caste, religion, gender, language, native place, migrant status, health condition
- **FR-011**: Score recalculation MUST trigger after each wage cycle closure
- **FR-012**: KAAM Pass MUST be mobile-first, PWA-compatible, usable on low-end devices

### Key Entities

- **KAAM Score**: Worker + 7 component scores + total + band + explanation JSON + timestamp
- **Contractor Trust Score**: Contractor + 6 component scores + total + explanation
- **Loan Recommendation**: Worker + requested amount + safe amount + explanation + calculation breakdown
- **Lender Consent**: Worker + consent status + timestamp + lender_id (null = all lenders)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: KAAM Score calculation matches expected output for all test cases
- **SC-002**: Score explanation lists at least 2 positive and 1 risk factor
- **SC-003**: Safe loan recommendation calculates correctly within ₹100 tolerance
- **SC-004**: KAAM Pass loads all 10 sections in under 3 seconds on 3G network
- **SC-005**: Consent toggle takes effect in under 2 seconds
- **SC-006**: 100% of scores use only verified-work-based factors (no sensitive attributes)

## Assumptions

- Repayment score starts at 50 (neutral) for workers with no loan history
- Profile completeness is calculated from: name, phone, skill, language, emergency contact, consent = 6 fields
- Loan tenure defaults to 6 weeks for safe amount calculation
- KAAM Score history is stored (not overwritten) to show score evolution over time
- Income Gap Score measures days between work periods (consecutive work = high score)

## Practical UX Requirements

### KAAM Pass — The Worker's Most Important Screen
- **Score is FIRST thing they see**: Big animated gauge showing 83/100. Workers understand numbers. They'll show this to friends, family, lenders.
- **"What can I borrow?" answered immediately**: Below the score, show safe loan limit in big text: "₹4,000 available". This is the practical value that keeps workers opening the app.
- **Wage slips are one scroll away**: List of downloadable wage slips, newest first. Big "Download" button.
- **Consent toggle is dead simple**: One switch: "Share my data with lenders: ON/OFF". No legalese, no multi-page flow.
- **Dispute section shows status**: Workers want to know "did my complaint get resolved?" Show status with color: green=resolved, yellow=pending, red=rejected.

### Safe Loan — Must Feel Protective, Not Restrictive
- **Frame it as protection**: "KAAM recommends ₹4,000 to keep you safe from debt stress." NOT "Your request was denied."
- **Show the math simply**: "You earn ₹4,200/week. Safe repayment is ₹840/week. Over 6 weeks = ₹5,040."
- **No judgment**: If score is too low, say "Keep working and your limit will grow" not "You are not eligible."

## Dead Code Cleanup (Execute After This Spec)

- [ ] Delete `backend/app/services/kaam_score.py` — logic ported to JS with new 7-component formula
- [ ] Delete `backend/app/routers/kaam_score.py`
- [ ] Delete `backend/app/routers/financial.py` — replaced by safe loan recommendation
- [ ] Delete `backend/app/models/kaam_score.py`
- [ ] Delete `kaam-pass-pwa/src/pages/Loan.jsx` — replaced by Safe Loan Recommendation
- [ ] Remove credit_scores references from PWA (v1 credit scoring replaced by KAAM Score)
- [ ] Run `npx knip`
- [ ] Run `npx eslint . --max-warnings 0`
