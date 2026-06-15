# Feature Specification: AI Anomaly Detection & Premium UI Polish

**Feature Branch**: `012-ai-polish`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — "AI" justification + hackathon demo polish  
**Depends On**: 006-v2-database-auth, 007-contractor-dashboard, 008-attendance-disputes, 009-wage-slip-verification, 010-kaam-score-pass, 011-lender-protection  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI Anomaly Detection Dashboard (Priority: P1)

The system runs anomaly detection across attendance and wage data to identify fraud patterns. Detected anomalies appear in both the contractor dashboard and a dedicated anomaly section. This is the "AI" in KAAM Setu AI.

**Why this priority**: Without a visible AI component, the name "KAAM Setu AI" has no justification. Anomaly detection is already partially built and is the most defensible AI claim.

**Independent Test**: Seed database with anomalous data (ghost worker, GPS spoofing) → anomaly detector flags them → alerts appear in dashboard.

**Acceptance Scenarios**:

1. **Given** a worker with attendance marked at two different sites on the same day, **When** anomaly detection runs, **Then** a "Ghost Worker" alert is created with HIGH severity
2. **Given** a contractor whose GPS was 5km+ from site during attendance marking, **When** anomaly detection runs, **Then** a "GPS Impossibility" alert is created with MEDIUM severity
3. **Given** attendance showing 24 days but wage slip only paying 16 days, **When** anomaly detection runs, **Then** a "Wage Suppression" alert is created with HIGH severity
4. **Given** a wage rate on slip below the registered rate, **When** anomaly detection runs, **Then** a "Rate Manipulation" alert is created
5. **Given** anomaly alerts, **When** the contractor views their dashboard, **Then** they see an "AI Alerts" section with severity badges and descriptions

---

### User Story 2 - Smart Income Prediction (Priority: P2)

Based on a worker's attendance and income trend, the system predicts their next month's estimated income and KAAM Score trajectory. This gives workers a forward-looking view and lenders confidence in sustainability.

**Why this priority**: Prediction is the most tangible "AI" feature for demo purposes — judges can see the system making intelligent projections.

**Independent Test**: Worker with 3 months of stable ₹700/day income → system predicts ₹16,800 next month with confidence level.

**Acceptance Scenarios**:

1. **Given** a worker with 3+ months of data, **When** prediction runs, **Then** it shows: "Based on your pattern, estimated income next month: ₹16,800 (High Confidence)"
2. **Given** a worker with irregular attendance, **When** prediction runs, **Then** it shows: "Estimated income: ₹8,400-₹14,000 (Low Confidence)" with explanation
3. **Given** a prediction, **When** displayed in KAAM Pass, **Then** it shows alongside actual income for comparison

---

### User Story 3 - Premium UI Redesign for Hackathon Demo (Priority: P1)

The entire application is redesigned with premium aesthetics: dark mode with gradients, glassmorphism cards, smooth micro-animations, modern typography (Inter/Outfit), vibrant color palette, and professional visual hierarchy. The design must make judges think "this looks like a funded startup, not a hackathon project."

**Why this priority**: At national hackathons, UI quality directly impacts scoring. A beautiful UI signals competence and seriousness.

**Independent Test**: A non-technical person sees the app and says "this looks professional."

**Acceptance Scenarios**:

1. **Given** the contractor dashboard, **When** viewed, **Then** it uses: dark background, glassmorphism stat cards, gradient accents, smooth hover transitions, Inter/Outfit font family
2. **Given** the worker KAAM Pass, **When** viewed on mobile, **Then** it looks like a premium fintech app — large touch targets, smooth page transitions, a prominent KAAM Score gauge with animation
3. **Given** any page transition, **When** navigating, **Then** content fades/slides in smoothly (no jarring page loads)
4. **Given** the QR verification page, **When** opened by a judge scanning a QR code, **Then** it shows a premium verification result with animated checkmark and professional branding

---

### User Story 4 - Demo Data Seeding (Priority: P1)

A script or admin function seeds the database with 30 days of realistic data for 5-6 workers across 2 sites. This makes the demo show real-looking trends, charts, and score evolution — not empty states.

**Why this priority**: Live data makes the demo convincing. Empty states or obviously fake data kills credibility.

**Independent Test**: Run seed script → all dashboards show populated data with realistic patterns.

**Acceptance Scenarios**:

1. **Given** the seed script runs, **When** complete, **Then** the database contains: 2 sites, 1 contractor, 5 workers, 30 days of attendance per worker, 2-4 wage slips per worker, KAAM Scores, and 1-2 disputes
2. **Given** seeded data, **When** the contractor dashboard loads, **Then** charts show real trends and all stat cards have non-zero values
3. **Given** seeded data, **When** a worker's KAAM Pass loads, **Then** their score, income history, and wage slips are visible and look realistic
4. **Given** seeded data, **When** the demo is presented, **Then** at least one record is created LIVE to prove the system isn't hardcoded

---

### Edge Cases

- What happens when anomaly detection finds false positives? → Contractor can dismiss alerts. Dismissed alerts are not re-raised.
- What happens when prediction data is insufficient (<1 month)? → Show "Need more data for prediction" instead of inaccurate prediction.
- What happens if UI animations cause performance issues on low-end devices? → Disable animations when `prefers-reduced-motion` is set.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect 5 anomaly patterns: Wage Suppression, Rate Manipulation, Ghost Workers, GPS Impossibility, Minimum Wage Violation
- **FR-002**: Anomaly alerts MUST display with severity levels: CRITICAL, HIGH, MEDIUM, LOW
- **FR-003**: Contractors MUST be able to view, acknowledge, and dismiss anomaly alerts
- **FR-004**: Unresolved HIGH/CRITICAL anomalies MUST reduce Contractor Trust Score
- **FR-005**: Income prediction MUST use trend analysis on attendance and wage history (minimum 30 days data)
- **FR-006**: Prediction MUST show confidence level: High (stable pattern), Medium (some variation), Low (irregular)
- **FR-007**: All UI MUST use modern design system: dark mode, glassmorphism, gradients, Inter/Outfit fonts
- **FR-008**: All page transitions MUST be animated (fade, slide, or scale)
- **FR-009**: KAAM Score MUST display as an animated circular gauge
- **FR-010**: Demo seed script MUST be idempotent (safe to run multiple times)
- **FR-011**: Seed data MUST be realistic (varying attendance, some disputes, different skills/wages)
- **FR-012**: UI MUST respect `prefers-reduced-motion` for accessibility

### Key Entities

- **Anomaly Alert**: Contractor + Worker + Type + Severity + Description + Resolved status
- **Income Prediction**: Worker + Predicted Income + Confidence + Basis data

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Anomaly detection correctly identifies all 5 fraud patterns with zero false negatives in test data
- **SC-002**: Income prediction is within 15% of actual for workers with 60+ days of data
- **SC-003**: All pages score 90+ on Lighthouse performance audit
- **SC-004**: UI achieves "premium/professional" rating from 3+ non-technical reviewers
- **SC-005**: Demo seed completes in under 30 seconds
- **SC-006**: All animations run at 60fps on mid-range devices

## Assumptions

- Anomaly detection runs on-demand or via scheduled trigger (not real-time streaming)
- Income prediction uses simple trend analysis (moving average + variance), not ML model
- Design system is built from scratch (no Tailwind, no component library — custom CSS)
- Seed script uses Supabase client to insert data directly
- The anomaly detector code from the existing FastAPI backend can be ported to JavaScript

## Practical UX Requirements

### Anomaly Detection Must Be Actionable
- **Don't just show alerts**: Each anomaly card MUST have a clear action: "Review Worker", "Check Wage Slip", "Verify GPS".
- **Severity colors**: RED for critical, ORANGE for high, YELLOW for medium. Workers see GREEN when everything's clean.
- **Contractor sees their own anomalies**: Not a separate admin view. Integrated into contractor dashboard.

### UI Polish Must Serve Usability
- **Premium ≠ Cluttered**: Dark mode with gradients is good. But every animation must have purpose. Don't add animations that slow down a contractor marking attendance at 7am.
- **Performance first**: If glassmorphism causes jank on a ₹5,000 phone, use flat cards instead. Beauty serves function, not the other way around.
- **Respect `prefers-reduced-motion`**: Some users have vestibular disorders. Animations must be optional.

### Demo Seed Must Tell a Story
- **Ramesh's journey**: The seeded data should tell the Ramesh story from the pitch. 24 days work, ₹16,800 income, KAAM Score 83, safe loan ₹4,000, one resolved dispute, one pending confirmation.
- **Include one anomaly**: Seed one ghost worker or GPS impossibility so the AI detection is visible in the demo.
- **Don't over-seed**: 5 workers, 2 sites, 30 days. Enough to look real, small enough to understand.

## Dead Code Cleanup (Execute After This Spec — FINAL CLEANUP)

This is the LAST spec. After this, the entire v1 backend should be deletable:

- [ ] Delete entire `backend/` directory — all Python code has been ported
- [ ] Delete entire `kaam_mobile_app/` directory — Flutter app replaced by PWA  
- [ ] Delete `kaam-backend/` if all migrations are replaced
- [ ] Delete old v1 spec files if they cause confusion (or archive them)
- [ ] Run FINAL `npx knip` on dashboard and kaam-pass-pwa
- [ ] Run FINAL `npx eslint . --max-warnings 0`
- [ ] Verify zero dead imports, zero unused files, zero orphan components
- [ ] `git status` should show a clean, minimal codebase
