# Tasks: Attendance Verification & Dispute System

## Phase 1: Contractor Attendance
- [x] T001 Create `dashboard/src/utils/geo.js` for Haversine distance and trust level.
- [x] T002 Create `dashboard/src/pages/ContractorDashboard/MarkAttendance.jsx` to bulk mark attendance with GPS.

## Phase 2: Worker Confirmation & Dispute
- [x] T003 Create `kaam-pass-pwa/src/supabaseClient.js` to initialize Supabase.
- [x] T004 Create `kaam-pass-pwa/src/components/AttendanceConfirmation.jsx` for worker approval.
- [x] T005 Create `kaam-pass-pwa/src/components/DisputeForm.jsx` for dispute filing.
- [x] T006 Update `kaam-pass-pwa/src/pages/Dashboard.jsx` to include AttendanceConfirmation.

## Phase 3: Contractor Resolving Disputes
- [x] T007 Update `ContractorDashboard/index.jsx` to show disputes and MarkAttendance.

## Phase 4: Dead Code Cleanup
- [x] T008 Delete `backend/app/routers/attendance.py`, `dispute.py`, and `geofence.py`.
- [x] T009 Run `npx knip` and `eslint`.
