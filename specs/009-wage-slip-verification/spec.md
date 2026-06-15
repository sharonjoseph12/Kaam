# Feature Specification: Wage Slip Generation & Hash Verification

**Feature Branch**: `009-wage-slip-verification`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — Modules 8, 9, 10 (Wage Calculation, Wage Slip PDF, SHA-256 Hash Verification)  
**Depends On**: 006-v2-database-auth, 007-contractor-dashboard, 008-attendance-disputes  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol

## User Scenarios & Testing *(mandatory)*

### User Story 1 - System Generates Wage Slip at Cycle End (Priority: P1)

When a wage cycle closes (weekly/fortnightly/monthly based on site config), the system calculates wages from verified attendance and generates a wage slip record. The contractor can also manually trigger wage slip generation.

**Why this priority**: The wage slip IS the income proof — the core output of the entire platform.

**Independent Test**: Mark 12 days attendance → trigger wage slip → correct calculation appears → PDF generated.

**Acceptance Scenarios**:

1. **Given** a worker with 12 days of verified attendance at ₹700/day with 2 hours overtime, **When** wage slip is generated, **Then** the calculation shows: Base ₹8,400 + Overtime ₹600 - Advances ₹1,000 - Deductions ₹0 = Net Pay ₹8,000
2. **Given** a wage cycle end, **When** the contractor triggers generation, **Then** wage slips are created for all active workers on that site with attendance in the period
3. **Given** a generated wage slip, **When** the worker views it, **Then** they see: worker name, worker ID, contractor name, site name, period, days worked, hours, daily wage, overtime, advances, deductions, net pay, date, QR code, hash ID

---

### User Story 2 - Wage Slip PDF with QR Code (Priority: P1)

Each wage slip is downloadable as a PDF document. The PDF contains all wage details plus a QR code that links to a public verification page. This PDF IS the worker's income proof document.

**Why this priority**: A downloadable, verifiable PDF is what makes the income proof tangible and shareable with lenders, banks, or anyone.

**Independent Test**: Generate wage slip → download PDF → scan QR → verification page confirms authenticity.

**Acceptance Scenarios**:

1. **Given** a generated wage slip, **When** the worker or contractor downloads the PDF, **Then** the PDF contains all fields listed in the spec plus a QR code
2. **Given** a wage slip PDF, **When** the QR code is scanned, **Then** it opens a public URL at `/verify/[hash]`
3. **Given** the PDF, **When** it is printed on paper, **Then** the QR code is scannable from the printed page

---

### User Story 3 - SHA-256 Hash Verification (Priority: P1)

Each wage slip's data is normalized into JSON, hashed using SHA-256, and stored. A public verification page at `/verify/[hash]` confirms whether the wage slip is authentic and untampered. Anyone with the QR code or hash can verify.

**Why this priority**: This is the "holy shit" demo moment. A judge scans the QR on their phone and sees live verification. This proves the system is tamper-evident.

**Independent Test**: Generate wage slip → hash stored → open verification URL → page shows "Verified" with limited data.

**Acceptance Scenarios**:

1. **Given** a wage slip, **When** the system generates the hash, **Then** it normalizes the wage data to JSON, computes SHA-256, and stores the hash in the database
2. **Given** a valid hash, **When** anyone visits `/verify/[hash]`, **Then** they see: "Wage Slip Verified ✓", worker first name (or masked), net pay, wage period, site name, hash match status
3. **Given** an invalid/tampered hash, **When** someone visits `/verify/[invalid]`, **Then** they see: "Verification Failed ✗ — This wage slip could not be verified"
4. **Given** the public verification page, **When** viewed, **Then** it does NOT show: phone number, full profile, emergency contact, loan eligibility, disputes, or private history

---

### User Story 4 - Contractor Reviews and Approves Wage Slips (Priority: P2)

Before wage slips become "Verified", the contractor reviews the batch. They can adjust individual slips (add advances, note deductions) before finalizing.

**Why this priority**: Contractor approval adds another trust signal and allows corrections before the record becomes permanent.

**Independent Test**: Wage slips generated → contractor reviews batch → adjusts one slip → approves all → slips become verified.

**Acceptance Scenarios**:

1. **Given** generated wage slips, **When** the contractor opens the review screen, **Then** they see a batch view with all slips for that period
2. **Given** a slip in review, **When** the contractor adds an advance of ₹500, **Then** net pay recalculates automatically
3. **Given** a batch approval, **When** the contractor approves, **Then** all slips become "Verified" and their hashes are finalized

---

### Edge Cases

- What happens when a worker has zero attendance days in a period? → No wage slip is generated. Worker is notified.
- What happens when overtime exceeds regular hours? → System allows but flags for review.
- What happens when the hash verification page is accessed without authentication? → Allowed — it's a public page by design.
- What happens when a contractor modifies a wage slip after it's been verified? → Not allowed. New corrective slip must be generated.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST calculate wages using: Base = Days Worked × Daily Wage; Gross = Base + Overtime; Net = Gross - Advances - Deductions
- **FR-002**: Overtime MUST be calculated at the daily wage rate (configurable multiplier, default 1x)
- **FR-003**: System MUST generate a PDF wage slip with all required fields using jsPDF or equivalent client-side PDF library
- **FR-004**: Each PDF MUST contain a QR code linking to `/verify/[hash]`
- **FR-005**: System MUST normalize wage slip data to JSON, compute SHA-256 hash, and store the hash
- **FR-006**: System MUST serve a public verification page at `/verify/[hash]` that shows limited data (no private info)
- **FR-007**: Wage slips MUST be immutable after verification — no edits, only corrective new slips
- **FR-008**: System MUST support wage slip statuses: Draft, Reviewed, Verified, Disputed
- **FR-009**: Worker MUST be able to download their wage slip PDF from the KAAM Pass
- **FR-010**: System MUST support batch wage slip generation for all workers on a site
- **FR-011**: Public verification page MUST work without authentication
- **FR-012**: System MUST store PDF files in Supabase Storage with worker-scoped access

### Key Entities

- **Wage Slip**: Links worker + site + period with full wage breakdown, hash, PDF URL, status
- **Verification Record**: Hash → wage slip metadata for public lookup

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Wage calculation matches expected output for all test cases within ₹1 tolerance
- **SC-002**: PDF generates in under 5 seconds per wage slip
- **SC-003**: QR code on PDF is scannable by standard phone cameras
- **SC-004**: Verification page loads in under 2 seconds
- **SC-005**: SHA-256 hash verification correctly identifies tampered vs. authentic slips 100% of the time
- **SC-006**: Workers can download their wage slip PDFs offline (cached via PWA)

## Assumptions

- jsPDF is used for client-side PDF generation (no server-side rendering needed)
- qrcode npm package is used for QR generation
- SHA-256 is computed using Web Crypto API (browser-native)
- Wage cycle closure is triggered manually by contractor (auto-close can be added later)
- Currency is INR (₹) and all amounts are in whole rupees

## Practical UX Requirements

### For Workers (Viewing/Downloading Wage Slips)
- **One tap download**: Worker sees wage slip in list → taps "Download" → PDF saves to phone. No multi-step process.
- **Big number, center screen**: Net pay amount (e.g., "₹8,000") is the biggest text on the wage slip card. Workers care about the amount first.
- **QR visible without scrolling**: On the PDF, the QR code must be prominent — a lender or bank officer should spot it immediately.
- **Offline viewing**: Wage slip data (not PDF) should be cached so workers can show their income even without internet.

### For Contractors (Generating Wage Slips)
- **One-click generation**: Contractor selects site + period → taps "Generate All" → all wage slips for that period are created.
- **Review before finalize**: Show a summary table (worker, days, amount) before final approval. Contractor can adjust advances/deductions inline.
- **No manual entry of hours/days**: These auto-calculate from attendance records. Contractor only adds advances/deductions.

### For Verification Page (Public)
- **Loads without login**: Anyone with the URL can verify. No auth wall.
- **Shows result in 1 second**: Green checkmark + limited data. No loading spinners.
- **Mobile-first layout**: Bank officers will scan QR on their phones. Page must look good on phone screens.

## Dead Code Cleanup (Execute After This Spec)

- [ ] Delete `backend/app/services/wage_calculator.py` — logic ported to JS
- [ ] Delete `backend/app/services/crypto.py` — hashing ported to Web Crypto API
- [ ] Delete `backend/app/routers/wage_slip.py` — logic ported
- [ ] Delete `backend/app/models/wage_slip.py` — replaced by Supabase table
- [ ] Run `npx knip`
- [ ] Run `npx eslint . --max-warnings 0`
