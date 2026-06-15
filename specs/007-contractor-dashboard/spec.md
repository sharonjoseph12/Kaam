# Feature Specification: Contractor Dashboard & Site Management

**Feature Branch**: `007-contractor-dashboard`  
**Created**: 2026-06-15  
**Status**: Draft  
**Input**: KAAM Setu AI v2 Master Description — Modules 2, 3, 4 (Contractor Dashboard, Site Creation, Worker Onboarding)  
**Depends On**: 006-v2-database-auth  
**Constraints**: See [CONSTRAINTS.md](../CONSTRAINTS.md) for UX rules and dead code protocol

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contractor Creates a Construction Site (Priority: P1)

A contractor logs into their dashboard and creates a new construction site by entering site name, address, GPS coordinates (or picking on a map), geofence radius, and wage cycle (weekly/fortnightly/monthly). The system generates a site ID, a QR code, and sets up the geofence boundary.

**Why this priority**: Sites are the container for all worker data. Without a site, no attendance or wages can be tracked.

**Independent Test**: Contractor creates site → site appears in dashboard list → site has QR code and geofence.

**Acceptance Scenarios**:

1. **Given** a logged-in contractor, **When** they fill the site creation form with name, address, lat/lng, radius (default 200m), and wage cycle, **Then** a site record is created with a unique ID and the site appears in their dashboard
2. **Given** a created site, **When** the contractor views it, **Then** they see a generated QR code for the site and a geofence visualization
3. **Given** a contractor with multiple sites, **When** they view their dashboard, **Then** they see all their sites with worker counts and status

---

### User Story 2 - Contractor Adds Workers to a Site (Priority: P1)

A contractor adds workers by entering worker name, phone, skill type, daily wage rate, and assigning them to a site. The worker status starts as "Pending" until the worker confirms consent.

**Why this priority**: Worker onboarding with consent is the critical trust mechanism.

**Independent Test**: Contractor adds worker → worker appears in site roster with "Pending" status → worker confirms → status changes to "Active".

**Acceptance Scenarios**:

1. **Given** a contractor with a site, **When** they add a worker with name, phone, skill, and daily wage, **Then** the worker appears in the site roster with status "Pending"
2. **Given** a pending worker, **When** the worker logs in and accepts the consent text, **Then** status changes to "Active" and consent timestamp is recorded
3. **Given** an active worker, **When** the contractor views the site roster, **Then** they see the worker with name, skill, daily wage, and active status
4. **Given** a contractor, **When** they try to add a worker with a phone that already exists, **Then** the system links the existing worker to the new site (multi-site support)

---

### User Story 3 - Contractor Views Dashboard Overview (Priority: P1)

A contractor sees a dashboard with key metrics: Active Workers count, Present Today count, Pending Confirmations, Open Disputes, Wage Due amount, Loan-Ready Workers count, and their Contractor Trust Score.

**Why this priority**: The dashboard is the contractor's landing page — it must immediately show value (clean overview of their workforce).

**Independent Test**: Dashboard loads with real-time data from attendance and worker records.

**Acceptance Scenarios**:

1. **Given** a contractor with workers and attendance data, **When** they open the dashboard, **Then** they see 7 stat cards with accurate live data
2. **Given** a contractor with no workers yet, **When** they open the dashboard, **Then** they see zero-state cards with a prompt to create their first site

---

### User Story 4 - Contractor Manages Workers (Priority: P2)

A contractor can view, edit, and deactivate workers. They can change daily wage rates, update skills, and mark workers as inactive.

**Why this priority**: Workforce management is ongoing operational need.

**Independent Test**: Edit worker wage → wage updates → next wage slip uses new rate.

**Acceptance Scenarios**:

1. **Given** an active worker, **When** the contractor updates their daily wage, **Then** the new rate applies to future wage calculations
2. **Given** an active worker, **When** the contractor marks them inactive, **Then** they no longer appear in "Present Today" counts but their history is preserved

---

### Edge Cases

- What happens when a contractor creates a site with invalid coordinates? → Validation error with clear message.
- What happens when a worker is assigned to two sites by the same contractor? → Allowed, each assignment has its own daily wage.
- What happens when a contractor deletes a site with active workers? → Site is deactivated (soft delete), not deleted. Workers remain in system.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Contractor dashboard MUST display 7 stat cards: Active Workers, Present Today, Pending Confirmations, Open Disputes, Wage Due, Loan-Ready Workers, Contractor Trust Score
- **FR-002**: System MUST support site creation with: site name, address, latitude, longitude, geofence radius (meters), wage cycle (weekly/fortnightly/monthly)
- **FR-003**: System MUST generate a unique QR code for each site
- **FR-004**: System MUST support worker onboarding with: name, phone, skill, daily wage, language preference, emergency contact, site assignment
- **FR-005**: Worker consent text MUST be displayed and explicitly accepted: "I agree that my attendance and wage records can be used to create my KAAM Income Passport. My data will not be shared with lenders without my permission."
- **FR-006**: Worker status MUST track: Pending, Active, Disputed, Inactive
- **FR-007**: System MUST support a contractor managing multiple sites
- **FR-008**: System MUST show a site-level view with all assigned workers, attendance status, and wage calculations
- **FR-009**: Dashboard MUST update in real-time or near real-time as attendance is marked
- **FR-010**: System MUST support worker search and filtering by name, skill, status, and site

### Key Entities

- **Site**: Container for workers and attendance with geofence boundary
- **Worker Site Assignment**: Links worker to site with daily wage, start/end dates, active status
- **Dashboard Stats**: Aggregated view of contractor's workforce across all sites

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Contractor can create a site in under 2 minutes
- **SC-002**: Contractor can add a worker in under 1 minute
- **SC-003**: Dashboard loads with all 7 metrics in under 3 seconds
- **SC-004**: 100% of workers must have explicit consent before their data is used
- **SC-005**: Contractor can manage up to 100 workers across 5 sites without performance issues

## Assumptions

- GPS coordinates can be entered manually or picked from a map (Leaflet or similar)
- QR codes are generated client-side (no external service needed)
- The dashboard is a web app (not mobile-native) accessed via browser
- Contractor Trust Score starts at a default value and updates as data accumulates

## Practical UX Requirements

- **Bulk attendance prep**: Worker list on site page MUST be a checklist — contractor taps names to mark present, one "Submit" button for all. NOT individual forms per worker.
- **Site creation MUST be under 2 minutes**: Name, address, pick location on map (or enter lat/lng), set radius, done.
- **Worker add MUST be under 1 minute**: Name, phone, skill (dropdown), daily wage. That's it. No address, no ID, no long forms.
- **Dashboard loads first**: When contractor opens app, dashboard with stats appears instantly. Sites/workers are one tap away.
- **Works on laptop AND phone**: Contractor might use laptop at site office or phone on-site. Responsive design is mandatory.
- **No training required**: A contractor who has never used the app should understand the dashboard within 30 seconds.

## Dead Code Cleanup (Execute After This Spec)

- [ ] Delete `dashboard/src/mockData.js` — replaced by real Supabase queries
- [ ] Delete `dashboard/src/pages/BuilderDashboard.jsx` — replaced by new Contractor Dashboard
- [ ] Remove all mock data imports and fallback logic from dashboard components
- [ ] Remove unused chart.js configurations if charts change
- [ ] Run `npx knip` — find unused exports/files
- [ ] Run `npx eslint . --max-warnings 0` — clean state
