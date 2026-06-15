# Feature Specification: Attendance Verification & Dispute System

**Feature Branch**: `008-attendance-disputes`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — Modules 5, 6, 7 (Attendance Verification, Worker Confirmation, Dispute System)  
**Depends On**: 006-v2-database-auth, 007-contractor-dashboard  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol  
**References**: See [REFERENCES.md](../REFERENCES.md) — adopt QR attendance (anditisyou), trackAS (paulthadev) patterns

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contractor Marks Daily Attendance (Priority: P1)

A contractor opens their site's daily attendance view, sees the worker roster, and marks each worker as Present/Absent/Half-Day. The browser captures GPS location. System calculates Haversine distance to verify the contractor is within the site's geofence. Each attendance record is assigned a trust level based on available signals.

**Why this priority**: Attendance is the atomic unit of verified work. Everything downstream (wages, scores, loans) depends on this.

**Independent Test**: Contractor marks worker present → GPS captured → distance checked → record created with trust level.

**Acceptance Scenarios**:

1. **Given** a contractor at a site (within geofence), **When** they mark a worker present with hours worked, **Then** an attendance record is created with `gps_verified: true` and trust level "Level 2" (Contractor + GPS)
2. **Given** a contractor NOT within the geofence, **When** they mark attendance, **Then** the record is created with `gps_verified: false` and trust level "Level 1" (Contractor only), and a warning is shown
3. **Given** an attendance record, **When** the system assigns trust level, **Then** it uses: Level 1 (contractor only), Level 2 (contractor + GPS), Level 3 (contractor + GPS + worker confirmation), Level 4 (repeated verified pattern)
4. **Given** a contractor, **When** they view attendance history for a site, **Then** they see a calendar/list view of all attendance records with status and trust levels

---

### User Story 2 - Worker Confirms or Disputes Attendance (Priority: P1)

A worker opens their KAAM Pass and sees a notification that they were marked present for a specific date, site, and hours. They can either Confirm (trust level upgrades to Level 3) or Dispute (a dispute ticket is created).

**Why this priority**: Worker confirmation is what makes this system worker-first and creates the trust layer that lenders need.

**Independent Test**: Contractor marks attendance → worker sees pending confirmation → worker confirms → trust level upgrades to Level 3.

**Acceptance Scenarios**:

1. **Given** a contractor has marked a worker present, **When** the worker opens their KAAM Pass, **Then** they see: "You were marked present today for [hours] hours at [site name]. Is this correct? [Confirm] [Dispute]"
2. **Given** a worker confirms, **When** they tap Confirm, **Then** attendance status becomes "Worker Confirmed" and trust level upgrades to Level 3
3. **Given** a worker disputes, **When** they tap Dispute, **Then** a dispute ticket is created, contractor is notified, and attendance is NOT finalized until the dispute is resolved
4. **Given** a worker has not responded to confirmation, **When** 24 hours pass, **Then** the attendance remains at trust Level 2 (not auto-confirmed)

---

### User Story 3 - Worker Raises a Dispute (Priority: P1)

A worker can raise a dispute for: Missing Attendance, Wrong Hours, Overtime Missing, Wrong Wage Rate, Unfair Deduction, or Wage Slip Error. They select the type and add a brief description. The contractor is notified and must respond.

**Why this priority**: The dispute system is the core inclusivity feature — it gives workers voice and prevents contractor manipulation.

**Independent Test**: Worker raises dispute → contractor sees it → contractor accepts/rejects → dispute resolves.

**Acceptance Scenarios**:

1. **Given** a worker, **When** they raise a dispute, **Then** they select a type from 6 options and add a description, and the dispute is created with status "Pending"
2. **Given** a pending dispute, **When** the contractor views it, **Then** they see the worker's claim and can Accept (corrects the record) or Reject (with reason)
3. **Given** a dispute accepted by contractor, **When** it is accepted, **Then** the original record is corrected, dispute status becomes "Accepted", and both parties are notified
4. **Given** a dispute rejected by contractor, **When** the worker disagrees, **Then** the dispute can be marked "Escalated" after 7 days unresolved
5. **Given** dispute history, **When** calculating KAAM Score, **Then** unresolved disputes lower the worker's dispute score component, and repeated rejected disputes from the same contractor lower the contractor's trust score

---

### User Story 4 - Contractor Views and Responds to Disputes (Priority: P2)

A contractor sees all open disputes on their dashboard. They can filter by site, worker, type, and status. They respond to each dispute with an acceptance or rejection with explanation.

**Why this priority**: Contractor-side dispute management is operational — needed but secondary to the worker raising ability.

**Independent Test**: Dispute appears in contractor dashboard → contractor responds → status updates.

**Acceptance Scenarios**:

1. **Given** a contractor with open disputes, **When** they open the disputes section, **Then** they see a list with worker name, dispute type, description, date, and status
2. **Given** a contractor responding to a dispute, **When** they accept, **Then** the underlying attendance/wage record is corrected automatically

---

### Edge Cases

- What happens when a worker disputes attendance for a date they were marked absent? → The dispute type "Missing Attendance" covers this — contractor can accept and change to Present.
- What happens when GPS is unavailable (indoor, airplane mode)? → Attendance is still recorded at Level 1 trust. A note indicates GPS was unavailable.
- What happens when a worker has 10+ unresolved disputes? → Auto-escalation flag is raised. This impacts contractor trust score heavily.
- What happens when attendance is marked outside work hours? → System records timestamp but does not block. Anomaly detector may flag.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support attendance marking with: worker_id, site_id, date, check_in time, check_out time, hours_worked, GPS coordinates
- **FR-002**: System MUST perform GPS geofence verification using Haversine distance calculation
- **FR-003**: System MUST assign trust levels: Level 1 (contractor only), Level 2 (contractor + GPS), Level 3 (contractor + GPS + worker confirmation), Level 4 (repeated verified pattern)
- **FR-004**: System MUST show workers a pending confirmation notification for each attendance record
- **FR-005**: Worker confirmation MUST be a simple two-button interface: Confirm or Dispute
- **FR-006**: System MUST support 6 dispute types: Missing Attendance, Wrong Hours, Overtime Missing, Wrong Wage Rate, Unfair Deduction, Wage Slip Error
- **FR-007**: System MUST track dispute statuses: Pending, Accepted, Rejected, Escalated, Closed
- **FR-008**: Accepted disputes MUST automatically correct the underlying record
- **FR-009**: Disputes unresolved for 7+ days MUST be auto-flagged for escalation
- **FR-010**: Dispute history MUST feed into both KAAM Score and Contractor Trust Score calculations
- **FR-011**: System MUST prevent duplicate attendance records (one per worker per date)
- **FR-012**: System MUST support bulk attendance marking (contractor marks multiple workers at once)
- **FR-013**: System MUST use lightweight device fingerprint (userAgent + screen + timezone hash) to detect if one phone is marking for multiple workers. Log but don't block in v1.
- **FR-014**: System MUST enforce unique constraint on (worker_id, site_id, date) to prevent duplicate attendance — inspired by QR attendance repo's duplicate prevention

### Key Entities

- **Attendance Record**: Worker + Site + Date + Hours + GPS + Trust Level + Status
- **Dispute**: Worker + Type + Description + Contractor Response + Status + Resolution

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Contractor can mark attendance for 10 workers in under 3 minutes
- **SC-002**: Worker can confirm or dispute attendance in under 10 seconds (2 taps)
- **SC-003**: GPS verification determines geofence status within 1 second
- **SC-004**: 100% of disputes are visible to both worker and contractor
- **SC-005**: Dispute resolution workflow completes in under 5 taps for the contractor

## Assumptions

- Browser Geolocation API is available on most smartphones
- Workers have intermittent internet access (can confirm within 24 hours)
- Geofence radius default is 200 meters (configurable per site)
- Haversine formula uses Earth radius of 6,371,000 meters
- Attendance confirmation is pull-based (worker checks app) not push (no WhatsApp/SMS in v1)

## Practical UX Requirements

### For Contractors (Marking Attendance)
- **One screen, one action**: Open site → see worker list → tap checkboxes → hit "Submit All". Done in under 3 minutes for 10 workers.
- **GPS happens silently**: Don't show the worker a GPS loading spinner. Capture location in background. If GPS fails, still allow marking (just lower trust level).
- **Yesterday's catch-up**: If contractor forgot to mark yesterday, allow backdating ONE day. Not more.

### For Workers (Confirming/Disputing)
- **Notification badge**: Worker opens KAAM Pass, sees a number badge "3 pending" on the attendance tab.
- **Two big buttons**: "Yes, correct ✅" and "Something wrong ❌". No forms, no typing for confirmation.
- **Dispute is simple**: If worker taps "Something wrong", show 6 big icon buttons (one per dispute type). Worker taps type → optional one-line comment → done. Max 3 taps.
- **No English required for disputes**: Use icons/emoji for dispute types. 📅 Missing Day, ⏰ Wrong Hours, 💰 Wrong Pay, etc.

## Dead Code Cleanup (Execute After This Spec)

- [ ] Delete `backend/app/routers/attendance.py` — logic ported to frontend/Supabase
- [ ] Delete `backend/app/routers/dispute.py` — logic ported
- [ ] Delete `backend/app/services/geofence.py` — logic ported to JS utility
- [ ] Remove old attendance-related mock data if any remains
- [ ] Run `npx knip` — find unused exports/files
- [ ] Run `npx eslint . --max-warnings 0`
