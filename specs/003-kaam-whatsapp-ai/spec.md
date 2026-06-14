# Feature Specification: kaam-whatsapp-ai

**Feature Branch**: `[003-kaam-whatsapp-ai]`  
**Created**: 2026-06-14  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - WhatsApp Wage Slip Delivery (Priority: P1)
Worker receives wage slip as a WhatsApp message when approved.
**Why this priority**: Workers do not have the app, WhatsApp is the only delivery channel.
**Independent Test**: Trigger wage slip approval, verify WhatsApp webhook payload is generated.
**Acceptance Scenarios**:
1. **Given** an approved wage slip, **When** processing completes, **Then** a WhatsApp message is dispatched to the worker's number.

### User Story 2 - Shield Alert (Mediation AI) (Priority: P1)
Contractor receives a pre-audit warning if anomalies are detected between attendance and wage slips.
**Why this priority**: Preempts Labour Code violations and acts as "private legal advisor".
**Independent Test**: Seed DB with 20 days attendance and 10 days pay. Run AI logic. Verify alert generation.
**Acceptance Scenarios**:
1. **Given** mismatched attendance and payment records, **When** nightly scan runs, **Then** a HIGH risk alert is generated.

### User Story 3 - KAAM Score Engine (Priority: P2)
Worker gets a monthly KAAM Score based on consistency, payments, and continuity.
**Why this priority**: Unlocks micro-loans and insurance for workers.
**Independent Test**: Input worker history, run scoring algorithm, verify score tier (e.g. Gold).
**Acceptance Scenarios**:
1. **Given** perfect payment and attendance history, **When** score is calculated, **Then** score is >75 (Platinum).

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST send WhatsApp messages using WhatsApp Business API.
- **FR-002**: System MUST run a nightly anomaly detection scan using rule-based logic and Claude API (Wage Suppression, Rate Manipulation, Ghost Workers, GPS Impossibility, Min Wage Violation).
- **FR-003**: System MUST calculate KAAM Score using a weighted algorithm (40% payment, 30% continuity, etc.).
- **FR-004**: System MUST trigger alerts to contractors via in-app notifications if anomalies are found.
- **FR-005**: System MUST integrate Bhashini API for Kannada voice-to-text translation during worker disputes.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: WhatsApp messages delivered with < 5 seconds latency.
- **SC-002**: Nightly AI scan identifies 100% of injected anomalies.
- **SC-003**: KAAM Score calculation executes in < 1 second per worker.

## Assumptions
- WhatsApp Business API is configured and template messages are approved.
- Claude API is available for natural language dispute generation and anomaly summarization.
