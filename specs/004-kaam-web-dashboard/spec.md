# Feature Specification: kaam-web-dashboard

**Feature Branch**: `[004-kaam-web-dashboard]`  
**Created**: 2026-06-14  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Builder Compliance Dashboard (Priority: P1)
Regional builder logs in to see compliance status of all their mandated sub-contractors.
**Why this priority**: Builder mandate is the primary acquisition strategy (CAC = 0).
**Independent Test**: Login as builder, view mocked sub-contractor data and scorecards.
**Acceptance Scenarios**:
1. **Given** valid builder credentials, **When** logged in, **Then** dashboard shows all sub-contractors and their compliance scores.

### User Story 2 - Labour Inspector Dashboard (Priority: P1)
Labour Inspector logs in via government credentials to view regional compliance and disputes.
**Why this priority**: Required for regulatory integration and anomaly reporting.
**Independent Test**: Login as inspector, view anomaly alerts and dispute PDFs.
**Acceptance Scenarios**:
1. **Given** valid inspector OAuth credentials, **When** logged in, **Then** dashboard shows compliance reports per contractor and pending disputes.

### User Story 3 - Admin Anomaly Resolution (Priority: P2)
KAAM Admin logs in to resolve low-severity anomalies and override flagged GPS records.
**Why this priority**: Operational requirement for edge cases and manual interventions.
**Independent Test**: Login as admin, view flagged records, approve a GPS override.
**Acceptance Scenarios**:
1. **Given** a flagged attendance record, **When** admin approves override, **Then** record status changes to VERIFIED.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Dashboard MUST be built using React and include Leaflet.js for geospatial mapping.
- **FR-002**: System MUST provide Builder view with real-time sub-contractor compliance scorecards.
- **FR-003**: System MUST provide Inspector view with automated compliance reports and dispute logs.
- **FR-004**: System MUST provide Admin view for anomaly resolution and user management.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: Dashboard loads initial payload in < 2 seconds.
- **SC-002**: Leaflet.js map renders geofence data accurately without lag.
- **SC-003**: UI components are responsive across desktop and tablet views.
