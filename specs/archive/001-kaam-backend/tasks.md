# Implementation Tasks: kaam-backend

## Phase 1: Foundation
- [ ] 1. Initialize FastAPI project with PostgreSQL/PostGIS connection
- [ ] 2. Define SQLAlchemy models (Contractor, Site, Worker, AttendanceRecord, WageSlip)
- [ ] 3. Setup database migrations (Alembic)

## Phase 2: Core Features
- [ ] 4. Implement Contractor and Worker registration endpoints
- [ ] 5. Implement SHA-256 cryptographic hashing logic for attendance records
- [ ] 6. Implement Merkle Tree daily aggregation job
- [ ] 7. Implement wage slip calculation engine (OT, min wage)

## Phase 3: Integration & Advanced
- [ ] 8. Implement DigiLocker PDF generation stub
- [ ] 9. Setup REST API documentation (Swagger)
- [ ] 10. Implement `/api/inspector` compliance dashboard data endpoints
- [ ] 11. Implement `/api/disputes` and `/api/anomalies` endpoints
- [ ] 12. Setup Cron jobs (Daily income gap, Nightly anomaly, Per wage cycle, Monthly score)
