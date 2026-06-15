# Tasks: V2 Database Schema & Auth System

**Input**: Design documents from `/specs/006-v2-database-auth/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)
- [x] T001 Initialize V2 Database Schema Migration file `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`

## Phase 2: Foundational (Blocking Prerequisites)
- [x] T002 [P] Create `profiles` table and `auth.users` trigger in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T003 [P] Create `audit_logs` table and trigger in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T004 [P] Create `contractors` and `workers` tables in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T005 [P] Create `sites` and `worker_site_assignments` tables in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T006 [P] Create `attendance`, `disputes`, `wage_slips`, `kaam_scores`, `loan_recommendations`, `lender_consents`, `protection_cases` tables in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`

## Phase 3: User Story 1 - Contractor Signs Up and Logs In (P1)
- [x] T007 [US1] Apply RLS policies for `contractors` and `sites` in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T008 [US1] Remove InspectorDashboard and update role-based route protection for Contractor in `dashboard/src/App.jsx`

## Phase 4: User Story 2 - Worker Signs Up via Invitation (P1)
- [x] T009 [US2] Apply RLS policies for `workers` and `worker_site_assignments` in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T010 [US2] Clean up dead code `Verify.jsx`, `Wallpaper.jsx`, `Network.jsx`, `VoiceButton.jsx`, `bhashini/` in `kaam-pass-pwa/`
- [x] T011 [US2] Implement role-based route protection for Worker in `kaam-pass-pwa/src/App.jsx`

## Phase 5: User Story 3 - Lender/NGO Signs Up (P2)
- [x] T012 [US3] Apply RLS policies for `lender_consents` and `loan_recommendations` in `kaam-backend/supabase/migrations/20260615000000_v2_schema.sql`
- [x] T013 [US3] Delete old `kaam-backend/supabase/migrations/` V1 files.

## Phase 6: Polish & Validation
- [x] T014 Run `npx knip` in `dashboard` and `kaam-pass-pwa` to find remaining unused exports
- [x] T015 Run `npx eslint . --max-warnings 0` to verify clean state
