# Feature Specification: kaam-backend

**Feature Branch**: `[001-kaam-backend]`  
**Created**: 2026-06-14  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contractor Onboarding and Worker Registration (Priority: P1)
Contractor registers themselves and their workers on the platform via APIs.
**Why this priority**: Essential to capture data for all downstream processes.
**Independent Test**: Can be tested by hitting registration endpoints and checking DB.
**Acceptance Scenarios**:
1. **Given** valid contractor details, **When** registration API is called, **Then** contractor is saved to DB.
2. **Given** worker details linked to a site, **When** worker registration API is called, **Then** worker is saved to DB.

### User Story 2 - Cryptographic Attendance Storage (Priority: P1)
System stores attendance immutably using SHA-256 and Merkle trees.
**Why this priority**: Core value prop for compliance and audit-readiness.
**Independent Test**: Generate attendance records, check hashes, and verify daily Merkle Root generation.
**Acceptance Scenarios**:
1. **Given** attendance record, **When** saved, **Then** a SHA-256 hash is generated using previous hash/data.
2. **Given** daily cron execution, **When** triggered, **Then** daily Merkle Root is generated.

### User Story 3 - Wage Slip Calculation (Priority: P1)
Calculate wages based on attendance, category, and minimum wage rules.
**Why this priority**: Needed for worker compensation and compliance.
**Independent Test**: Pass attendance data and verify calculated wage output.
**Acceptance Scenarios**:
1. **Given** 10 days present and 2 OT, **When** wage calculated, **Then** gross includes 2x OT rate.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST provide REST APIs for contractor/worker registration.
- **FR-002**: System MUST store geospatial data (PostGIS) for site geofencing.
- **FR-003**: System MUST hash every attendance record with SHA-256.
- **FR-004**: System MUST construct a daily Merkle tree for all records per contractor.
- **FR-005**: System MUST calculate wage slips applying 2x overtime rates and verifying state minimum wages.
- **FR-006**: System MUST provide `/api/inspector` endpoints for Labour Dept compliance dashboards.
- **FR-007**: System MUST provide `/api/disputes` and `/api/anomalies` for AI reporting and routing.
- **FR-008**: System MUST execute scheduled CRON jobs for daily income gaps, nightly anomalies, and monthly scores.

### Key Entities
- **Contractor**: id, name, license, aadhaar_hash
- **Site**: id, contractor_id, location (PostGIS)
- **Worker**: id, aadhaar_hash, category, daily_wage
- **AttendanceRecord**: id, worker_id, site_id, status, hash, prev_hash, gps_location
- **WageSlip**: id, worker_id, cycle_start, cycle_end, gross, net, status

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: Attendance hashing takes < 50ms per record.
- **SC-002**: Merkle root generated successfully daily for 10,000+ records in < 1 minute.
- **SC-003**: Wage slips accurately calculated for an entire cycle in < 5 seconds per contractor.

## Assumptions
- PostgreSQL + PostGIS will be available.
- State minimum wage data is statically provided or available via simple mapping.
