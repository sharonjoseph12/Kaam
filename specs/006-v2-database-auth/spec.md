# Feature Specification: V2 Database Schema & Auth System

**Feature Branch**: `006-v2-database-auth`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — Modules 1, 13 (Auth, Database)  
**Depends On**: None (foundation)  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contractor Signs Up and Logs In (Priority: P1)

A small construction contractor visits KAAM Setu, creates an account with their company name, city, and phone number. They are assigned the "Contractor" role and land on their contractor dashboard after login.

**Why this priority**: Without contractor auth, no other flow works. Contractors are the data entry point for the entire ecosystem.

**Independent Test**: Create account → login → see contractor dashboard → logout → login again → same dashboard appears.

**Acceptance Scenarios**:

1. **Given** an unregistered contractor, **When** they sign up with company name, city, phone, email, and password, **Then** a profile with role "contractor" is created and they are redirected to `/contractor/dashboard`
2. **Given** a registered contractor, **When** they log in with email/password, **Then** they are redirected to their contractor dashboard with their data intact
3. **Given** a logged-in contractor, **When** they try to access `/worker/pass` or `/lender/dashboard`, **Then** they are redirected to their own dashboard

---

### User Story 2 - Worker Signs Up via Invitation (Priority: P1)

A worker is added by a contractor. The worker receives a link/code, creates a basic account (name, phone, skill, language preference), confirms consent, and gains access to their KAAM Pass.

**Why this priority**: Workers are the core beneficiary. Their onboarding flow determines adoption.

**Independent Test**: Contractor adds worker → worker signs up → consents → sees KAAM Pass dashboard.

**Acceptance Scenarios**:

1. **Given** a contractor has added a worker's phone and name, **When** the worker creates an account with that phone, **Then** the worker profile is linked to the contractor's site with status "Active"
2. **Given** a worker is creating an account, **When** they must accept the consent text, **Then** consent_status is set to "granted" and timestamp is recorded
3. **Given** a worker, **When** they log in, **Then** they see their KAAM Pass at `/worker/pass`

---

### User Story 3 - Lender/NGO Signs Up (Priority: P2)

A lending partner or NGO creates an account to access verified worker profiles. They are assigned the "Lender" role.

**Why this priority**: Lender dashboard is needed to close the ecosystem loop but can be added after core worker/contractor flows.

**Independent Test**: Lender signs up → logs in → sees lender dashboard (empty until workers consent to share).

**Acceptance Scenarios**:

1. **Given** an unregistered lender, **When** they sign up with organization name, type (NBFC/NGO/MFI), and credentials, **Then** a profile with role "lender" is created
2. **Given** a lender, **When** they log in, **Then** they see `/lender/dashboard` with only consented worker profiles

---

### Edge Cases

- What happens when a worker tries to sign up with a phone not added by any contractor? → Allowed, but no site assignment until a contractor adds them.
- What happens when a user tries to access a route for a different role? → Redirect to their own dashboard.
- What happens if two contractors add the same worker phone? → Worker can have multiple site assignments.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support four roles: Contractor, Worker, Lender, Admin
- **FR-002**: System MUST use Supabase Auth for signup/login/logout
- **FR-003**: System MUST enforce role-based route protection — each role has its own dashboard area
- **FR-004**: System MUST create a `profiles` record linked to `auth.users` on signup
- **FR-005**: System MUST support worker consent flow with explicit consent text and timestamp
- **FR-006**: System MUST implement Row Level Security (RLS) so contractors see only their sites/workers, workers see only their own data, lenders see only consented profiles
- **FR-007**: System MUST create the following database tables: `profiles`, `contractors`, `sites`, `workers`, `worker_site_assignments`, `attendance`, `disputes`, `wage_slips`, `kaam_scores`, `loan_recommendations`, `lender_consents`, `protection_cases`, `audit_logs`
- **FR-008**: System MUST NOT store Aadhaar numbers or any biometric data
- **FR-009**: System MUST log all significant actions to `audit_logs` table
- **FR-010**: System MUST support profile creation with fields per v2 spec: full_name, phone, email, role, created_at, updated_at

### Key Entities

- **Profile**: Links auth user to app role and personal info
- **Contractor**: Company name, city, trust_score, linked to profile
- **Worker**: Full name, phone, skill, language_preference, emergency_contact, consent_status, linked to profile
- **Site**: Site name, address, lat/lng, geofence_radius, wage_cycle, contractor_id
- **Worker Site Assignment**: Links workers to sites with daily_wage, start_date, status

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can sign up and log in within 30 seconds
- **SC-002**: Role-based routing correctly restricts access 100% of the time
- **SC-003**: All 13 database tables are created with proper foreign keys and RLS policies
- **SC-004**: Worker consent is recorded with timestamp and is revocable
- **SC-005**: No unauthorized cross-role data access is possible

## Assumptions

- Supabase project already exists with auth configured
- Email/password auth is sufficient for v1 (OTP/social login can be added later)
- Existing v1 Supabase migrations will be replaced with new v2 schema
- The old FastAPI backend is being phased out — all logic moves to Supabase + frontend

## Practical UX Requirements

- Worker signup MUST work on ₹5,000 Android phones with 2G connectivity
- Worker signup form MUST have no more than 3 fields (name, phone, password) — rest filled by contractor
- Login MUST work with phone number (not just email) for workers
- Role-based redirect MUST happen instantly — no intermediate "choose your role" screen
- Session MUST persist for 30 days (workers don't want to log in daily)

## Dead Code Cleanup (Execute After This Spec)

Remove the following dead code/files AFTER implementing this spec:

- [ ] Delete `dashboard/src/pages/InspectorDashboard.jsx` — Inspector role doesn't exist in v2
- [ ] Delete `kaam-pass-pwa/src/pages/Verify.jsx` — No face verification in v2
- [ ] Delete `kaam-pass-pwa/src/pages/Wallpaper.jsx` — Not in v2
- [ ] Delete `kaam-pass-pwa/src/pages/Network.jsx` — Trust network not in v2
- [ ] Delete `kaam-pass-pwa/src/components/VoiceButton.jsx` — No Bhashini voice in v2
- [ ] Delete `kaam-pass-pwa/src/services/bhashini/` — Not in v2
- [ ] Delete `kaam-backend/supabase/migrations/` — v1 migrations replaced by v2 schema
- [ ] Remove references to deleted files from `App.jsx`, routes, imports
- [ ] Run `npx knip` to find any remaining unused exports/files
- [ ] Run `npx eslint . --max-warnings 0` to verify clean state
