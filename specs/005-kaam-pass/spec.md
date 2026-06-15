# Feature Specification: KAAM Pass

**Feature Branch**: `005-kaam-pass`  
**Created**: 2026-06-14  
**Status**: Draft  
**Input**: User description: "To make KAAM Finance a Top 1% project..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Smart-Sync Attendance & Verification (Priority: P1)

As a worker, I want to confirm my daily attendance via WhatsApp and have the option to verify my identity via biometric face-match in the KAAM Pass app, so that I can securely log my attendance and build higher trust for credit access.

**Why this priority**: Core interaction loop that hooks users via WhatsApp and bridges them to the PWA for higher-value activities.

**Independent Test**: Can be fully tested by sending an attendance confirmation prompt via WhatsApp, handling "Yes", and verifying the flow into the app for liveness detection.

**Acceptance Scenarios**:

1. **Given** a worker has logged hours via contractor, **When** they receive a WhatsApp message and tap "Yes", **Then** the attendance is recorded as "Reported".
2. **Given** a worker wants to increase trust, **When** they follow the secure link to the KAAM Pass App and perform biometric face-match, **Then** attendance is updated to "Verified".

---

### User Story 2 - Instant Secure Loan Access (Priority: P1)

As a worker, I want to request a loan via WhatsApp, authenticate through the KAAM Pass app using face-match, and receive funds in my bank account in 60 seconds, so that I can handle financial emergencies immediately.

**Why this priority**: Key monetization and retention hook for the platform.

**Independent Test**: Can be tested by initiating a loan request on WhatsApp and completing the biometric validation on the web app.

**Acceptance Scenarios**:

1. **Given** a worker requests a loan on WhatsApp, **When** they click the secure link and complete face-match in the KAAM Pass app, **Then** the loan is approved and disbursed to their Aadhaar-linked account.

---

### User Story 3 - Offline Digital Vault (Priority: P2)

As a worker, I want to cache my essential documents (Aadhaar, Wage Slips) in the KAAM Pass app, so that I can access and present them even without an internet connection.

**Why this priority**: Solves a critical user pain point regarding document loss and storage constraints.

**Independent Test**: Can be tested by loading documents while online, going offline, and successfully viewing them.

**Acceptance Scenarios**:

1. **Given** the user has previously opened their vault online, **When** they open the KAAM Pass app without internet connectivity, **Then** they can view their encrypted cached documents.

---

### User Story 4 - Voice Assistant Navigation (Priority: P2)

As a worker, I want to use voice commands in Kannada or Hindi within the app to ask about my work days or insurance, and receive a voice answer plus a text summary on WhatsApp, so that I don't have to type.

**Why this priority**: Crucial for accessibility among the target demographic.

**Independent Test**: Can be tested by holding the mic button, speaking a supported query, and verifying both the voice response in the app and the WhatsApp follow-up.

**Acceptance Scenarios**:

1. **Given** the user holds the voice button, **When** they ask "How many days did I work?" in Hindi, **Then** the app replies with voice and sends a text summary to WhatsApp.

---

### User Story 5 - Safety QR Lock-Screen (Priority: P3)

As a worker, I want to generate a lock-screen wallpaper with a Safety QR code containing my emergency info, so that responders can scan it during an accident without unlocking my phone.

**Why this priority**: High-value safety feature that distinguishes the app, though not core to the financial loop.

**Independent Test**: Can be tested by generating the wallpaper image and scanning the QR code with another device to verify the payload.

**Acceptance Scenarios**:

1. **Given** the user selects the Safety QR feature, **When** they generate the wallpaper, **Then** the resulting image contains a scannable QR with blood group, insurance, and emergency contact details.

### Edge Cases

- What happens when face-match fails multiple times?
- How does system handle offline vault access if the cache was cleared by the OS?
- What happens if the voice assistant cannot understand the dialect or language?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a web-based interface (PWA) accessible via secure links from WhatsApp, requiring no app store download.
- **FR-002**: System MUST implement a "KAAM Credit Score" radial gauge (0-100) and display a "Verified Badge" on the dashboard.
- **FR-003**: System MUST display a "Financial Snapshot" with "Total Earned this Month" and "Days Logged".
- **FR-004**: System MUST include buttons for "My Documents", "Emergency Insurance", and "Instant Loan".
- **FR-005**: System MUST support Liveness Detection (Face-match) within the browser.
- **FR-006**: System MUST implement offline caching (e.g., Service Workers) to store encrypted documents locally.
- **FR-007**: System MUST provide a voice recording button that processes queries in Hindi/Kannada and returns voice responses.
- **FR-008**: System MUST generate an image containing a QR code for lock-screen wallpaper use, encoding emergency details.
- **FR-009**: System MUST trigger asynchronous WhatsApp messages summarizing voice query answers.

### Key Entities

- **Worker**: Represents the contractor's employee, associated with a WhatsApp number, Aadhaar, and Bank Account.
- **Attendance Record**: Represents daily logging, status can be "Reported" (via WhatsApp) or "Verified" (via Biometrics).
- **Document**: Encrypted asset (Wage Slip, Aadhaar) synced to the offline vault.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: PWA initial load size is under 50MB.
- **SC-002**: Loan authentication to approval decision completes in under 60 seconds.
- **SC-003**: Offline documents load in under 1 second without internet connectivity.
- **SC-004**: Voice assistant responds to queries in under 3 seconds.

## Assumptions

- Users have basic smartphones capable of running modern web browsers with camera access.
- Existing WhatsApp bot infrastructure is available for integration.
- DigiLocker API or a similar document provider is available for initial sync.
- "Bhashini" or an equivalent NLP service is available for Hindi/Kannada voice processing.
