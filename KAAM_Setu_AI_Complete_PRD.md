# KAAM Setu AI — Complete Product Requirements Document (PRD)

## Worker-Owned Verified Income Passport for Informal Workers

---

## 1. Product Overview

### Product Name

**KAAM Setu AI**

### Product Category

AI-powered fintech and financial inclusion platform.

### Final Positioning

KAAM Setu AI is a **worker-owned verified income passport platform** for informal workers. It converts daily work records into trusted income proof by combining attendance, wage slips, worker confirmation, contractor trust, QR/hash verification, and a responsible KAAM Score.

The platform helps underserved workers access safe credit and emergency support through regulated lenders, NGOs, and employer-advance partners.

KAAM Setu is **not** a direct lender.  
KAAM Setu is **not** an insurance company.  
KAAM Setu is the verified income infrastructure layer between informal workers and formal financial access.

---

## 2. One-Line Pitch

> KAAM Setu AI turns informal work into verified income proof, helping workers access safe credit and emergency support through trusted partners.

---

## 3. Short Pitch

Informal workers earn daily but often cannot prove their income. Without salary slips, formal credit history, or verified wage records, they are excluded from safe loans, welfare access, and emergency protection.

KAAM Setu AI solves this by creating a worker-owned income passport. Contractors record attendance and wages, workers confirm or dispute records, and the system generates QR/hash-verified wage slips. These verified records build a transparent KAAM Score and safe credit recommendation that regulated lenders or NGOs can review only with worker consent.

---

## 4. Core Product Formula

```text
Verified Attendance
→ Verified Wage Slip
→ Worker Income Passport
→ KAAM Score
→ Safe Credit Recommendation
→ Emergency Support Eligibility
```

---

## 5. Theme Alignment

### Hackathon Theme

**Fintech & Financial Inclusion**

> Build an AI-powered fintech platform that leverages alternative data to provide dynamic credit scoring, instant micro-loans, and automated insurance payouts for underserved workers and rural entrepreneurs.

### KAAM Setu Alignment

| Theme Requirement | KAAM Setu Solution |
|---|---|
| Alternative data | Attendance, wage slips, worker confirmation, disputes, contractor trust |
| Dynamic credit scoring | KAAM Score updated from verified work records |
| Instant micro-loans | Safe loan recommendation for regulated partners |
| Automated insurance payouts | Emergency support / income interruption eligibility workflow |
| Underserved workers | Construction workers, daily wage workers, migrant workers |
| Financial inclusion | Creates income proof for workers without formal salary slips |
| AI-powered | Explainable score engine + future financial access agent |

---

## 6. Problem Statement

### Main Problem

Millions of informal workers earn regularly but remain financially invisible because their work and income are not formally documented.

### Key Pain Points

#### For Workers

- No salary slip
- No formal income proof
- No credit history
- Difficulty accessing safe loans
- Dependence on informal moneylenders
- Wage disputes with contractors
- No easy way to prove employment
- No structured record of work history
- No easy route to emergency support

#### For Contractors

- Manual attendance tracking
- Wage calculation errors
- Worker disputes
- Advance/deduction confusion
- Lack of clean wage records
- Difficulty managing multiple sites
- No simple system to generate verified wage slips

#### For Lenders / NGOs

- Cannot verify informal worker income
- High borrower verification cost
- Risk of fake income claims
- No reliable alternative data
- Difficulty assessing safe loan amount
- No consent-based worker data pipeline

---

## 7. Existing Market Gap

### Existing Players and Gaps

| Existing System | What It Does | What It Misses |
|---|---|---|
| Payroll apps | Track attendance, salary, staff records | Worker-owned financial identity |
| Account Aggregator | Reads existing financial data | Does not create worksite income proof |
| e-Shram | Worker identity and welfare registration | Does not verify live income or wage stability |
| Worker credit platforms | Provide worker credit | Often need platform-linked earnings or existing data |
| Welfare schemes | Provide benefits | Discovery, documentation, and claim filing remain hard |

### KAAM Setu's Differentiation

> Payroll apps digitize employer records. KAAM Setu converts verified wage records into a worker-owned income passport for financial access.

---

## 8. Target Users

### 8.1 Primary User: Informal Worker

#### Example Personas

- Construction worker
- Mason
- Painter
- Plumber
- Electrician
- Helper
- Daily wage worker
- Migrant worker
- Rural entrepreneur
- Contract worker

#### Example Persona

```text
Name: Ramesh
Age: 32
Work: Mason
Daily Wage: ₹700
Location: Mysuru
Problem: Earns regularly but has no salary slip or formal proof of income.
```

#### Worker Needs

- Prove income
- Access wage slips
- Confirm or dispute attendance
- Build credit-readiness
- Access safe credit
- Avoid exploitative borrowing
- Get emergency support eligibility
- Control who sees personal data

### 8.2 Secondary User: Contractor

#### Example Persona

```text
Name: Manjunath
Business: Small construction contractor
Workers: 25
Sites: 2
Problem: Uses notebook/WhatsApp to track attendance and wages.
```

#### Contractor Needs

- Track worker attendance
- Manage wage calculation
- Generate wage slips
- Reduce disputes
- Manage advances and deductions
- View active workers by site
- Maintain clean work records

### 8.3 Tertiary User: Lender / NGO / Employer Advance Partner

#### Example Persona

```text
Name: Local NGO / NBFC partner
Goal: Provide emergency support or safe small credit to verified informal workers.
Problem: Cannot verify income reliably.
```

#### Partner Needs

- Consent-based worker profiles
- Verified income summary
- Wage slip history
- KAAM Score
- Safe loan recommendation
- Contractor trust score
- Dispute history
- Risk explanation

---

## 9. Product Goals

### Business Goals

1. Enable contractors to digitize attendance and wage records.
2. Enable workers to own verified income proof.
3. Enable lenders/NGOs to assess informal workers through consented data.
4. Reduce unsafe lending through responsible credit guardrails.
5. Create a scalable fintech infrastructure layer for informal workers.

### User Goals

1. Workers can prove income.
2. Workers can download wage slips.
3. Workers can dispute wrong records.
4. Workers can view KAAM Score.
5. Workers can consent before lender data sharing.
6. Contractors can easily manage attendance and wages.
7. Lenders can review trusted worker profiles.

### Hackathon Goals

1. Show strong innovation.
2. Build practical MVP.
3. Demonstrate clear social impact.
4. Explain the product simply.
5. Present a realistic business model.

---

## 10. Non-Goals for MVP

KAAM Setu will **not** do the following in Version 1:

- Directly disburse loans
- Sell insurance
- Guarantee insurance payout
- Collect Aadhaar
- Integrate real DigiLocker
- Integrate real Bima Sugam
- Use blockchain
- Use black-box ML scoring
- Replace regulated lenders
- Replace government welfare systems
- Replace payroll apps fully
- Promise instant credit approval

---

## 11. Core Innovation: Trust Triangle

The main innovation of KAAM Setu is the **Trust Triangle**.

| Trust Layer | What It Proves |
|---|---|
| Worker Confirmation | Worker agrees that the attendance/wage record is true |
| Contractor Trust Score | Lender knows whether the data source is reliable |
| Hash-Verified Wage Slip | Income proof cannot be silently altered |

### Why This Matters

Most credit scoring systems only analyze existing financial data. KAAM Setu creates new trusted income data from real work activity.

### Innovation Line

> Existing fintech reads financial history. KAAM Setu creates financial history from verified work.

---

## 12. Product Modules

### Module 1: Authentication and Role Management

#### Description

Users sign up and log in based on their role.

#### Roles

- Contractor
- Worker
- Lender / NGO
- Admin

#### Functional Requirements

- User signup
- User login
- Role selection
- Role-based dashboards
- Protected routes
- Session management
- Logout

#### Acceptance Criteria

- A contractor should land on contractor dashboard.
- A worker should land on worker KAAM Pass.
- A lender should land on lender dashboard.
- A user should not access another role's private dashboard.

---

### Module 2: Contractor Dashboard

#### Description

The contractor dashboard allows contractors to manage sites, workers, attendance, wages, and disputes.

#### Features

- Dashboard summary
- Site management
- Worker onboarding
- Attendance marking
- Wage calculation
- Wage slip generation
- Dispute management
- Contractor trust score
- Reports

#### Dashboard Metrics

| Metric | Example |
|---|---|
| Active Workers | 42 |
| Present Today | 36 |
| Pending Confirmations | 5 |
| Open Disputes | 2 |
| Wage Due | ₹1,92,500 |
| Loan-Ready Workers | 18 |
| Contractor Trust Score | 84/100 |

#### Acceptance Criteria

- Contractor can create a site.
- Contractor can add workers.
- Contractor can mark attendance.
- Contractor can generate wage slips.
- Contractor can resolve disputes.
- Contractor can view site-level reports.

---

### Module 3: Site Management

#### Description

Contractors create and manage worksite records.

#### Fields

| Field | Type |
|---|---|
| Site name | Text |
| Address | Text |
| Latitude | Number |
| Longitude | Number |
| Geofence radius | Number |
| Wage cycle | Weekly/Fortnightly/Monthly |
| Active status | Boolean |

#### Functional Requirements

- Create site
- Edit site
- View site workers
- View site attendance
- Generate site QR
- Set geofence radius

#### Acceptance Criteria

- Contractor can create multiple sites.
- Each site has a location.
- Each site can have assigned workers.
- Site location is used for geofence verification.

---

### Module 4: Worker Onboarding

#### Description

Contractor adds workers and workers confirm consent.

#### Worker Fields

| Field | Example |
|---|---|
| Name | Ramesh |
| Phone | 9876543210 |
| Skill | Mason |
| Language | Kannada |
| Daily wage | ₹700 |
| Emergency contact | 9876500000 |
| Site | Green Valley Apartments |

#### Worker Status

| Status | Meaning |
|---|---|
| Pending | Added but not confirmed |
| Active | Worker confirmed |
| Rejected | Worker rejected |
| Disputed | Worker disputed details |
| Inactive | Worker no longer active |

#### Consent Message

```text
Your attendance and wage records will be used to create your KAAM Income Passport.
Your data will not be shared with lenders or NGOs without your permission.
```

#### Acceptance Criteria

- Contractor can add a worker.
- Worker can confirm joining.
- Worker can reject joining.
- Worker can dispute wrong onboarding details.
- Worker consent is stored.

---

### Module 5: Attendance Verification

#### Description

Attendance is recorded and verified using contractor marking, GPS/geofence, and worker confirmation.

#### Attendance Methods

Version 1:

- Contractor marks attendance.
- GPS location is captured.
- Worker confirms or disputes.

Version 1.5:

- Worker scans QR to check in.
- GPS is captured.
- Worker self-check-in is verified.

#### Attendance Fields

| Field | Type |
|---|---|
| Worker ID | UUID |
| Site ID | UUID |
| Contractor ID | UUID |
| Attendance date | Date |
| Check-in | Time |
| Check-out | Time |
| Hours worked | Number |
| Latitude | Number |
| Longitude | Number |
| GPS verified | Boolean |
| Worker confirmed | Boolean |
| Status | Text |
| Trust level | Number |

#### Trust Levels

| Trust Level | Meaning |
|---|---|
| Level 1 | Contractor marked only |
| Level 2 | Contractor + GPS verified |
| Level 3 | Contractor + GPS + worker confirmed |
| Level 4 | Repeated verified pattern |

#### Acceptance Criteria

- Contractor can mark attendance.
- GPS distance from site is calculated.
- Worker can confirm attendance.
- Worker can dispute attendance.
- Attendance status updates correctly.

---

### Module 6: Worker Confirmation and Dispute System

#### Description

Workers can confirm or dispute records.

#### Dispute Types

| Type | Example |
|---|---|
| Missing Attendance | I worked but was marked absent |
| Wrong Hours | I worked 10 hours but 8 were recorded |
| Overtime Missing | Extra hours not added |
| Wrong Wage Rate | My wage should be ₹750 |
| Unfair Deduction | Deduction is incorrect |
| Wage Slip Error | Final wage slip amount is wrong |
| Onboarding Error | My skill or wage is wrong |

#### Dispute Statuses

| Status | Meaning |
|---|---|
| Pending | Waiting for contractor |
| Accepted | Contractor accepted |
| Rejected | Contractor rejected |
| Escalated | Unresolved |
| Closed | Final status |

#### Acceptance Criteria

- Worker can raise dispute.
- Contractor can respond.
- System stores dispute history.
- Disputes impact contractor trust score.
- Disputed records are not silently finalized.

---

### Module 7: Wage Calculation

#### Description

Wages are calculated from verified attendance.

#### Inputs

- Days worked
- Hours worked
- Daily wage
- Overtime
- Advances
- Deductions

#### Formula

```text
Base Wage = Days Worked × Daily Wage
Gross Wage = Base Wage + Overtime
Net Pay = Gross Wage - Advances - Deductions
```

#### Example

```text
Daily Wage: ₹700
Days Worked: 12
Base Wage: ₹8,400
Overtime: ₹600
Advance: ₹1,000
Deduction: ₹0
Net Pay: ₹8,000
```

#### Acceptance Criteria

- System calculates wages from attendance.
- Contractor can add advances/deductions.
- Worker can view wage summary.
- Wage slips can be generated from calculated data.

---

### Module 8: Wage Slip PDF Generation

#### Description

The system generates PDF wage slips as proof of income.

#### Wage Slip Fields

- Worker name
- Worker ID
- Contractor name
- Site name
- Wage period
- Days worked
- Total hours
- Daily wage
- Overtime
- Advances
- Deductions
- Net pay
- Generated date
- Document hash
- QR verification code

#### Wage Slip Statuses

| Status | Meaning |
|---|---|
| Draft | Generated but not issued |
| Issued | Final wage slip |
| Disputed | Worker disputed slip |
| Corrected | Corrected version exists |

#### Acceptance Criteria

- Contractor can generate wage slip.
- Worker can view/download wage slip.
- Wage slip includes QR code.
- Wage slip includes hash ID.
- Issued wage slip cannot be silently edited.

---

### Module 9: QR and Hash Verification

#### Description

Wage slips are made tamper-evident using SHA-256 hash and QR verification.

#### Process

```text
Normalize wage slip JSON
→ Generate SHA-256 hash
→ Store hash in database
→ Generate QR code
→ Add QR to PDF
→ Public verification page checks hash
```

#### Public Verification Page

Route:

```text
/verify/[hash]
```

#### Public Verification Output

```text
Wage Slip Verified
Worker: Ramesh
Site: Green Valley Apartments
Period: 01 Jun 2026 - 15 Jun 2026
Net Pay: ₹8,000
Hash Match: Yes
```

#### Privacy Rule

The public verification page must not show:

- Phone number
- Emergency contact
- Full address
- Loan eligibility
- Private disputes
- Lender data

#### Acceptance Criteria

- Each issued wage slip gets a unique hash.
- QR code opens verification page.
- Tampered hash shows invalid result.
- Public page reveals only limited safe data.

---

### Module 10: Worker KAAM Pass

#### Description

The KAAM Pass is a worker-owned income passport.

#### Sections

1. Worker profile
2. Active site
3. Verified work days
4. Monthly verified income
5. Attendance history
6. Wage slips
7. KAAM Score
8. Score explanation
9. Safe loan recommendation
10. Disputes
11. Emergency support eligibility
12. Data sharing consent

#### Example

```text
Worker: Ramesh
Skill: Mason
Verified Work Days: 24
Monthly Verified Income: ₹16,800
KAAM Score: 83/100
Safe Loan Recommendation: ₹4,000
Protection Status: Eligible for partner review
```

#### Acceptance Criteria

- Worker can access KAAM Pass.
- KAAM Pass shows verified income.
- Worker can download wage slips.
- Worker can view KAAM Score.
- Worker can control lender consent.

---

### Module 11: KAAM Score

#### Description

KAAM Score is a transparent credit-readiness score based on verified work data.

#### Score Range

```text
0 to 100
```

#### Score Components

| Component | Weight |
|---|---:|
| Attendance Consistency | 25% |
| Wage Stability | 25% |
| Contractor Trust Score | 15% |
| Dispute Score | 10% |
| Income Gap Score | 10% |
| Repayment Score | 10% |
| Profile Completeness | 5% |

#### Formula

```text
KAAM Score =
0.25 × Attendance Consistency
+ 0.25 × Wage Stability
+ 0.15 × Contractor Trust
+ 0.10 × Dispute Score
+ 0.10 × Income Gap Score
+ 0.10 × Repayment Score
+ 0.05 × Profile Completeness
```

#### Score Bands

| Score | Band |
|---|---|
| 0-30 | Very Low Confidence |
| 31-50 | Low Confidence |
| 51-70 | Medium Confidence |
| 71-85 | Good Confidence |
| 86-100 | Strong Confidence |

#### Example

```text
Attendance Consistency: 92
Wage Stability: 80
Contractor Trust: 84
Dispute Score: 90
Income Gap Score: 70
Repayment Score: 60
Profile Completeness: 100

KAAM Score = 83/100
```

#### Fairness Rules

Do not use:

- Caste
- Religion
- Gender
- Native place
- Language as negative factor
- Migrant status as negative factor
- Health condition

Use only:

- Verified attendance
- Wage stability
- Contractor trust
- Dispute status
- Income gaps
- Repayment behavior if available
- Profile completeness

#### Acceptance Criteria

- Score is calculated from stored data.
- Score explanation is visible.
- Score is not random or hardcoded.
- Score uses no sensitive attributes.

---

### Module 12: Score Explanation

#### Description

Every KAAM Score must be explainable to workers and partners.

#### Example

```text
KAAM Score: 83/100

Positive Factors:
+ 24 verified work days in the last 30 days
+ Stable wage income
+ High contractor trust score
+ No unresolved disputes

Risk Factors:
- No formal repayment history yet
- Income depends on one active site
```

#### Acceptance Criteria

- Users can see why score increased or decreased.
- Lenders can see score factors.
- Workers are not shown confusing black-box decisions.

---

### Module 13: Safe Loan Recommendation

#### Description

KAAM recommends safe credit limits based on repayment capacity.

KAAM does not approve or disburse loans.

#### Rule

```text
Weekly repayment should not exceed 20% of verified weekly income.
```

#### Formula

```text
Verified Weekly Income = Verified Monthly Income / 4
Max Weekly Repayment = Verified Weekly Income × 0.20
Safe Amount = Max Weekly Repayment × Tenure Weeks
Recommended Amount = Min(Requested Amount, Safe Amount)
```

#### Example

```text
Verified Monthly Income: ₹16,800
Verified Weekly Income: ₹4,200
Max Safe Weekly Repayment: ₹840
Tenure: 6 weeks
Safe Amount: ₹5,040
Worker Requested: ₹10,000
KAAM Recommendation: ₹4,000 - ₹5,000
```

#### Output Text

```text
You requested ₹10,000.
KAAM recommends ₹4,000 because repayment should stay within safe limits.
```

#### Acceptance Criteria

- Loan recommendation is based on income.
- System never says "loan approved by KAAM."
- Recommendation is visible to worker and lender after consent.
- Recommendation includes explanation.

---

### Module 14: Lender / NGO Dashboard

#### Description

Partners view worker profiles only after consent.

#### Visible Fields

| Field | Example |
|---|---|
| Worker name | Ramesh |
| Skill | Mason |
| Verified monthly income | ₹16,800 |
| Wage slip count | 2 |
| KAAM Score | 83 |
| Risk band | Good |
| Safe loan limit | ₹4,000 |
| Contractor trust score | 84 |
| Unresolved disputes | 0 |
| Recommendation | Eligible for partner review |

#### Partner Actions

- View consented worker
- Review income proof
- Download summary report
- Mark reviewed
- Request more info
- Add partner decision note

#### Acceptance Criteria

- Lender cannot view worker without consent.
- Lender access is logged.
- Lender sees only allowed data.
- Lender dashboard does not disburse money in MVP.

---

### Module 15: Worker Consent and Privacy

#### Description

Worker controls data sharing.

#### Consent Types

| Consent | Meaning |
|---|---|
| Onboarding consent | Worker agrees to create KAAM Pass |
| Lender sharing consent | Worker allows partner to view income passport |
| One-time consent | Partner can view once |
| Time-bound consent | Partner can view until expiry |
| Revoked consent | Access removed |

#### Consent Screen Example

```text
Do you want to share your KAAM Income Passport with this partner?

Shared:
- Verified monthly income
- Wage slip count
- KAAM Score
- Safe loan recommendation
- Score explanation

Not shared:
- Emergency contact
- Private phone number unless approved
- Private disputes unless relevant
```

#### Privacy Requirements

- No Aadhaar in v1
- No sensitive scoring attributes
- Public QR page shows limited data
- Worker can revoke consent
- Lender views are audit logged
- Row-level security enabled

#### Acceptance Criteria

- Worker must consent before lender access.
- Worker can revoke consent.
- Expired consent blocks access.
- Every lender access creates audit log.

---

### Module 16: Emergency Support Eligibility

#### Description

The system detects income interruption and creates an emergency support case for partner review.

#### Important Wording

Use:

```text
Emergency support eligibility
Income interruption protection eligibility
Partner review support case
```

Do not use:

```text
Guaranteed insurance payout
KAAM pays insurance
```

#### Trigger Conditions

| Trigger | Condition | Suggested Support |
|---|---|---:|
| Work Stoppage | 7 days no attendance after stable work | ₹1,000 |
| Site Accident | Accident reported and confirmed | ₹2,000 |
| Site Shutdown | Contractor marks site paused | ₹500-₹2,000 |
| Hospitalization | Worker submits proof | Manual review |

#### Acceptance Criteria

- System can detect income interruption.
- System creates support case.
- Worker can view status.
- Partner can review case.
- KAAM does not claim guaranteed payout.

---

## 13. Bharosa-Inspired Future Expansion

KAAM Setu can later add a **Financial Access Agent** inspired by the Bharosa concept.

### Future Feature

A voice/WhatsApp-based assistant that helps workers:

- discover welfare schemes,
- understand credit options,
- file claim documents,
- check eligibility,
- connect to regulated partners.

### Why Not MVP

This should not be the main MVP because it depends on:

- telephony integration,
- WhatsApp Business integration,
- Bhashini,
- welfare scheme database,
- claim filing partnerships,
- human fallback operations.

### Future Positioning

```text
KAAM creates verified income proof.
The Financial Access Agent helps workers use that proof to access schemes, credit, and support.
```

---

## 14. End-to-End User Workflow

### 14.1 Contractor Workflow

```text
Contractor signs up
→ Creates construction site
→ Adds worker
→ Assigns wage rate
→ Marks attendance
→ GPS/geofence verifies location
→ Worker confirms attendance
→ Wage cycle closes
→ Wage slip is generated
→ Contractor dashboard updates
```

### 14.2 Worker Workflow

```text
Worker receives onboarding link
→ Confirms consent
→ Views attendance
→ Confirms or disputes record
→ Receives wage slip
→ Downloads QR/hash verified wage slip
→ Views KAAM Score
→ Views safe loan recommendation
→ Gives consent to partner if needed
```

### 14.3 Lender / NGO Workflow

```text
Partner logs in
→ Requests worker profile access
→ Worker gives consent
→ Partner views verified income passport
→ Partner reviews KAAM Score and safe loan limit
→ Partner makes external decision
→ Access is audit logged
```

---

## 15. MVP Build Scope

### Must Build

1. Authentication
2. Role-based dashboards
3. Contractor site creation
4. Worker onboarding
5. Worker consent
6. Attendance marking
7. GPS/geofence verification
8. Worker confirmation/dispute
9. Wage calculation
10. Wage slip PDF
11. QR generation
12. SHA-256 hash verification
13. Worker KAAM Pass
14. KAAM Score
15. Score explanation
16. Safe loan recommendation
17. Lender dashboard
18. Lender consent
19. Emergency support case
20. Audit logs

### Should Build

1. Dashboard charts
2. CSV export
3. Local language labels
4. Worker mobile PWA
5. Admin dashboard
6. Contractor trust analytics

### Could Build

1. WhatsApp notification mock
2. SMS fallback mock
3. Voice note dispute
4. Welfare eligibility roadmap
5. OCR document upload

### Will Not Build in MVP

1. Direct loan disbursement
2. Insurance underwriting
3. Real Aadhaar integration
4. Real Bima Sugam integration
5. Blockchain
6. Complex ML
7. Real WhatsApp Business API unless time allows

---

## 16. Technical Architecture

### Recommended Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API routes / Supabase Edge Functions |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Realtime | Supabase Realtime |
| PDF | jsPDF / React PDF |
| QR | qrcode package |
| Hashing | SHA-256 |
| Maps/GPS | Browser geolocation + Haversine |
| Charts | Recharts |
| Validation | Zod |
| Deployment | Vercel + Supabase |

---

## 17. System Architecture

```text
User Interface
├── Contractor Dashboard
├── Worker KAAM Pass
├── Lender Dashboard
└── Public Wage Slip Verification Page

Application Layer
├── Auth & Role Management
├── Site Management
├── Worker Onboarding
├── Attendance Engine
├── Wage Calculation Engine
├── PDF/QR/Hash Engine
├── KAAM Score Engine
├── Safe Loan Recommendation Engine
├── Consent Engine
├── Dispute Engine
└── Emergency Support Engine

Data Layer
├── Supabase PostgreSQL
├── Supabase Auth
├── Supabase Storage
└── Audit Logs
```

---

## 18. Database Design

### Tables

```text
profiles
contractors
sites
workers
worker_site_assignments
attendance
disputes
wage_slips
kaam_scores
loan_recommendations
lender_consents
protection_cases
audit_logs
```

### profiles

| Field | Type |
|---|---|
| id | UUID |
| auth_user_id | UUID |
| role | Text |
| full_name | Text |
| phone | Text |
| email | Text |
| created_at | Timestamp |
| updated_at | Timestamp |

### contractors

| Field | Type |
|---|---|
| id | UUID |
| profile_id | UUID |
| company_name | Text |
| city | Text |
| trust_score | Number |
| created_at | Timestamp |

### sites

| Field | Type |
|---|---|
| id | UUID |
| contractor_id | UUID |
| site_name | Text |
| address | Text |
| latitude | Number |
| longitude | Number |
| geofence_radius_m | Number |
| wage_cycle | Text |
| active | Boolean |
| created_at | Timestamp |

### workers

| Field | Type |
|---|---|
| id | UUID |
| profile_id | UUID nullable |
| full_name | Text |
| phone | Text |
| skill | Text |
| language_preference | Text |
| emergency_contact | Text |
| consent_status | Boolean |
| active | Boolean |
| created_at | Timestamp |

### worker_site_assignments

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| site_id | UUID |
| contractor_id | UUID |
| daily_wage | Number |
| start_date | Date |
| end_date | Date nullable |
| status | Text |

### attendance

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| site_id | UUID |
| contractor_id | UUID |
| attendance_date | Date |
| check_in | Timestamp |
| check_out | Timestamp |
| hours_worked | Number |
| latitude | Number |
| longitude | Number |
| gps_verified | Boolean |
| worker_confirmed | Boolean |
| trust_level | Number |
| status | Text |

### disputes

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| contractor_id | UUID |
| site_id | UUID |
| attendance_id | UUID nullable |
| wage_slip_id | UUID nullable |
| dispute_type | Text |
| description | Text |
| status | Text |
| contractor_response | Text |
| created_at | Timestamp |
| resolved_at | Timestamp nullable |

### wage_slips

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| contractor_id | UUID |
| site_id | UUID |
| period_start | Date |
| period_end | Date |
| days_worked | Number |
| total_hours | Number |
| base_wage | Number |
| overtime_amount | Number |
| advances | Number |
| deductions | Number |
| net_pay | Number |
| document_hash | Text |
| pdf_url | Text |
| verification_url | Text |
| status | Text |
| generated_at | Timestamp |

### kaam_scores

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| score | Number |
| attendance_score | Number |
| wage_stability_score | Number |
| contractor_trust_score | Number |
| dispute_score | Number |
| income_gap_score | Number |
| repayment_score | Number |
| profile_score | Number |
| risk_band | Text |
| explanation_json | JSON |
| generated_at | Timestamp |

### loan_recommendations

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| requested_amount | Number |
| recommended_amount | Number |
| verified_weekly_income | Number |
| max_safe_weekly_repayment | Number |
| tenure_weeks | Number |
| reason_json | JSON |
| status | Text |
| created_at | Timestamp |

### lender_consents

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| lender_profile_id | UUID |
| consent_given | Boolean |
| consent_scope | Text |
| expires_at | Timestamp |
| created_at | Timestamp |

### protection_cases

| Field | Type |
|---|---|
| id | UUID |
| worker_id | UUID |
| trigger_type | Text |
| trigger_reason | Text |
| suggested_support_amount | Number |
| status | Text |
| created_at | Timestamp |
| updated_at | Timestamp |

### audit_logs

| Field | Type |
|---|---|
| id | UUID |
| actor_profile_id | UUID |
| action | Text |
| entity_type | Text |
| entity_id | UUID |
| metadata | JSON |
| created_at | Timestamp |

---

## 19. API Requirements

### Auth

```text
POST /auth/signup
POST /auth/login
POST /auth/logout
```

### Contractor

```text
POST /api/sites
GET /api/sites
POST /api/workers
GET /api/workers
POST /api/attendance
GET /api/attendance
POST /api/wage-slips/generate
GET /api/disputes
POST /api/disputes/{id}/resolve
```

### Worker

```text
GET /api/worker/pass
POST /api/worker/confirm-onboarding
POST /api/attendance/{id}/confirm
POST /api/attendance/{id}/dispute
GET /api/worker/wage-slips
POST /api/worker/lender-consent
GET /api/worker/protection
```

### Lender

```text
GET /api/lender/workers
GET /api/lender/workers/{id}
POST /api/lender/review
```

### Public

```text
GET /api/verify/{hash}
```

---

## 20. UI Pages

### Public Pages

```text
/
/verify/[hash]
```

### Auth Pages

```text
/auth/signup
/auth/login
```

### Contractor Pages

```text
/contractor/dashboard
/contractor/sites
/contractor/workers
/contractor/attendance
/contractor/wages
/contractor/disputes
/contractor/reports
```

### Worker Pages

```text
/worker/pass
/worker/attendance
/worker/wage-slips
/worker/disputes
/worker/consent
/worker/protection
```

### Lender Pages

```text
/lender/dashboard
/lender/workers
/lender/workers/[id]
/lender/consents
```

### Admin Pages

```text
/admin/dashboard
/admin/audit-logs
/admin/support
```

---

## 21. Security Requirements

### Authentication

- Supabase Auth
- Email/phone login
- Session-based access

### Authorization

- Role-based access control
- Row-level security
- Route protection

### Privacy

- Worker data visible only to authorized users
- Lender access requires consent
- Public verification is limited
- Audit logs for sensitive actions

### Data Protection

- Environment variables for secrets
- Secure storage for PDFs
- No public database exposure
- No Aadhaar collection in v1

---

## 22. Row-Level Security Rules

### Contractor

Can access:

- Own sites
- Workers assigned to own sites
- Attendance for own sites
- Wage slips generated for own sites
- Disputes related to own sites

Cannot access:

- Other contractors' sites
- Unrelated workers
- Lender private data

### Worker

Can access:

- Own KAAM Pass
- Own attendance
- Own wage slips
- Own disputes
- Own consent settings
- Own score

Cannot access:

- Other workers
- Contractor private business records
- Lender dashboard

### Lender

Can access:

- Only consented worker profiles
- Only allowed data fields
- Only until consent expiry

Cannot access:

- Workers without consent
- Private disputes unless allowed
- Emergency contacts unless approved

---

## 23. Acceptance Criteria for MVP

The MVP is considered complete when:

1. Contractor can sign up and log in.
2. Contractor can create a site.
3. Contractor can add a worker.
4. Worker can confirm consent.
5. Contractor can mark attendance.
6. GPS/geofence result is calculated.
7. Worker can confirm/dispute attendance.
8. Wage is calculated from records.
9. Wage slip PDF is generated.
10. QR code opens verification page.
11. SHA-256 hash validates wage slip.
12. Worker can view KAAM Pass.
13. KAAM Score is calculated from real records.
14. Score explanation is visible.
15. Safe loan recommendation is calculated.
16. Worker can grant lender consent.
17. Lender can view only consented data.
18. Emergency support case can be triggered.
19. Audit logs are created.
20. App is deployed and usable.

---

## 24. Demo Scenario

### Worker

```text
Name: Ramesh
Skill: Mason
Daily Wage: ₹700
Site: Green Valley Apartments
Contractor: Manjunath Constructions
```

### Work History

```text
Verified Work Days: 24
Monthly Verified Income: ₹16,800
Wage Slips: 2
KAAM Score: 83
Safe Loan Recommendation: ₹4,000
```

### Demo Flow

```text
1. Contractor logs in.
2. Contractor creates Green Valley Apartments site.
3. Contractor adds Ramesh.
4. Ramesh confirms consent.
5. Contractor marks attendance.
6. GPS verifies location.
7. Ramesh confirms attendance.
8. Contractor generates wage slip.
9. Wage slip QR is verified.
10. Ramesh opens KAAM Pass.
11. KAAM Score is shown.
12. Safe loan recommendation is shown.
13. Ramesh gives lender consent.
14. Lender views income passport.
15. Emergency support case is triggered if income stops.
```

---

## 25. Responsible Credit Guardrail

### Purpose

Prevent unsafe borrowing.

### Example

```text
Ramesh requested ₹10,000.
Verified monthly income: ₹16,800.
Safe weekly repayment limit: ₹840.
KAAM recommends ₹4,000–₹5,000.
Reason: Repayment should not exceed 20% of weekly income.
```

### Product Principle

KAAM does not maximize loan amount.  
KAAM protects the worker from debt stress.

---

## 26. Cold-Start Ladder

A new worker cannot get a strong score on day one.

| Stage | Data Available | Output |
|---|---|---|
| Day 1 | Profile + consent | Income passport started |
| 7 days | Attendance pattern | Employer advance eligibility |
| 30 days | Wage slip + attendance | Small emergency partner review |
| 90 days | Stable income history | Better micro-credit profile |
| 180 days | Strong history | Higher-confidence lender profile |

---

## 27. Business Model

### Revenue Streams

| Revenue Stream | Who Pays | Why They Pay |
|---|---|---|
| Contractor SaaS | Contractors | Attendance, wages, slips, dispute reduction |
| Verified intelligence fee | Lenders/NGOs | Lower verification cost |
| Enterprise dashboard | Builders | Multi-site workforce visibility |
| CSR support pool | CSR/NGO partners | Emergency support for workers |
| Verification API | Financial partners | Wage slip and income proof verification |

### Pricing Example

| Plan | Price | Features |
|---|---:|---|
| Free | ₹0 | Up to 5 workers |
| Basic | ₹299/month/site | Attendance + worker records |
| Pro | ₹799/month/site | Wage slips + disputes + reports |
| Enterprise | Custom | Multi-site + API + analytics |

---

## 28. Go-To-Market Plan

### Phase 1: Pilot

```text
1 contractor
1 site
10 workers
2 weeks attendance
1 wage cycle
1 NGO/lender reviewer
```

### Phase 2: Local Expansion

- 5 contractors
- 100 workers
- 1 district
- NGO partner
- small builder association

### Phase 3: Partner Expansion

- NBFC / NGO integration
- CSR support pool
- local language support
- WhatsApp/voice workflow

### Phase 4: Infrastructure Layer

- verified income API
- enterprise builder dashboard
- welfare/claim assistance agent
- deeper partner integrations

---

## 29. Metrics

### Product Metrics

- Workers onboarded
- Active contractors
- Active sites
- Attendance records created
- Wage slips generated
- QR verification count
- Disputes raised/resolved
- KAAM Scores generated
- Lender consents given
- Safe loan recommendations generated

### Impact Metrics

- Workers with income proof
- Informal income documented
- Unsafe loan requests reduced
- Emergency cases detected
- Wage disputes resolved
- Workers moved from undocumented to income-verified

### Business Metrics

- Contractor retention
- Paid contractor accounts
- Lender profile reviews
- Partner conversion rate
- Verification API usage

---

## 30. Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Looks like payroll app | High | Emphasize worker-owned income passport |
| Contractor adoption | High | Provide attendance, wage slips, dispute reduction |
| Legal lending risk | High | Partner-only lending recommendation |
| Insurance regulation risk | High | Emergency support eligibility only |
| Privacy concern | High | Consent, RLS, audit logs, no Aadhaar |
| Fake attendance | High | GPS, worker confirmation, trust levels |
| Contractor-worker collusion | Medium | Contractor trust score, anomaly alerts |
| Worker smartphone barrier | Medium | PWA, printed wage slip, SMS future |
| Cold-start score | Medium | Credit-readiness ladder |
| Scope overload | High | Build income proof core first |

---

## 31. Selection Round PPT Strategy

### Slide 1

**KAAM Setu AI — Worker-Owned Verified Income Passport**

### Slide 2

Problem: informal workers work daily but cannot prove income.

### Slide 3

Existing gap: payroll apps track staff, Account Aggregator reads bank data, e-Shram identifies workers, but no one creates worker-owned verified income proof from daily work.

### Slide 4

Solution: KAAM turns work records into verified income passports.

### Slide 5

Workflow:

```text
Attendance → Wage Slip → KAAM Score → Safe Credit → Emergency Support
```

### Slide 6

Trust Triangle:

- Worker confirmation
- Contractor trust score
- Hash-verified wage slip

### Slide 7

Product modules:

- Contractor Dashboard
- Worker KAAM Pass
- Lender/NGO Dashboard

### Slide 8

Demo story:

```text
Ramesh, mason, ₹700/day, 24 verified work days, KAAM Score 83, safe recommendation ₹4,000.
```

### Slide 9

Tech stack:

```text
Next.js + Supabase + GPS + QR + PDF + SHA-256 + Rule-Based Score
```

### Slide 10

Responsible finance:

- No direct lending
- No fake insurance
- Safe loan guardrail
- Partner review

### Slide 11

Privacy and fairness:

- Consent-first
- Revoke sharing
- No Aadhaar in v1
- No sensitive scoring factors
- Audit logs

### Slide 12

Business model and closing:

> KAAM turns invisible labour into trusted financial identity.

---

## 32. Final Product Principles

1. Build income proof before lending.
2. Worker owns the income passport.
3. Consent is mandatory before sharing.
4. No sensitive attributes in scoring.
5. Score must be explainable.
6. Wage slips must be verifiable.
7. Credit recommendation must be responsible.
8. Contractors must receive daily operational value.
9. Lenders must receive trusted data, not blind AI.
10. The app must work as a real product, not a hardcoded demo.

---

## 33. Final Verdict

KAAM Setu AI is strongest when positioned as:

> A worker-owned verified income passport for informal workers.

It should not be positioned as only a loan app, payroll app, or insurance app.

The winning version is:

```text
Verified Attendance
→ Verified Wage Slip
→ Worker Income Passport
→ KAAM Score
→ Responsible Credit Recommendation
→ Emergency Support Eligibility
```

If the MVP demonstrates real authentication, real attendance, real wage slip generation, real QR/hash verification, real KAAM Score, and real consent-based lender dashboard, KAAM Setu becomes a national-level finalist or winner candidate.

---

## 34. Final Closing Line

> KAAM Setu AI turns invisible labour into trusted financial identity.
