# Feature Specification: kaam-mobile-app

**Feature Branch**: `[002-kaam-mobile-app]`  
**Created**: 2026-06-14  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Offline-First Attendance (Priority: P1)
Contractor marks attendance at a remote site without internet.
**Why this priority**: Construction sites often lack reliable internet.
**Independent Test**: Turn off device Wi-Fi/data, mark attendance, verify local DB storage. Turn on internet, verify sync.
**Acceptance Scenarios**:
1. **Given** device is offline, **When** attendance is marked, **Then** record is saved to local SQLite.
2. **Given** cached records, **When** device goes online, **Then** records sync to backend.

### User Story 2 - Proximity & GPS Handshake (Priority: P1)
Contractor verifies attendance using GPS geofence and Bluetooth proximity to worker's phone.
**Why this priority**: Essential to prove "Proof of Proximity" and prevent ghost workers.
**Independent Test**: Use two devices. Check if proximity handshake succeeds when < 5m and fails when > 5m.
**Acceptance Scenarios**:
1. **Given** worker phone in range, **When** attendance marked, **Then** status is VERIFIED.
2. **Given** worker phone out of range but inside GPS fence, **When** attendance marked, **Then** status is GPS-ONLY.

### User Story 3 - High-Contrast Minimalist UI (Priority: P2)
Contractor navigates a simple UI with high contrast and vernacular support (Kannada/Hindi).
**Why this priority**: Outdoor use requires visibility; target demographic requires vernacular.
**Independent Test**: View UI under bright light simulation; switch language to Kannada.
**Acceptance Scenarios**:
1. **Given** app is open, **When** language changed to Kannada, **Then** all labels translate.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: App MUST store attendance locally using sqflite when offline.
- **FR-002**: App MUST sync offline records to backend automatically upon connection.
- **FR-003**: App MUST capture device GPS coordinates when marking attendance.
- **FR-004**: App MUST attempt Bluetooth LE / Nearby connection with worker's device for 15s.
- **FR-005**: App MUST support localization (Kannada, Hindi).
- **FR-006**: App MUST provide OTP login, Aadhaar eKYC, and multi-site management screens.
- **FR-007**: App MUST provide screens for Wage slip approval, Anomaly alerts, and Compliance status.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: Offline records sync within 10 seconds of internet restoration.
- **SC-002**: Proximity handshake succeeds >95% of the time when devices are within 5 meters.
- **SC-003**: UI achieves WCAG AA contrast ratios for outdoor visibility.

## Assumptions
- Workers may not have the app installed, falling back to GPS-ONLY attendance.
- Android devices used will support Google Nearby Connections API.
