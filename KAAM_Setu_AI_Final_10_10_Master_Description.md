# KAAM Setu AI — Final 10/10 Master Project Description
## Verified Income Passport for Informal Workers
### Production-Ready Fintech + Social Impact Platform

---

## 0. Document Purpose

This document is the final refined and judge-optimized description of **KAAM Setu AI** after fixing the project across all five national hackathon judging criteria:

1. Innovation & Originality
2. Technical Feasibility
3. Impact & Inclusivity
4. Clarity of Submission
5. Business / Monetization Strategy

The goal is to build a real, useful, deployable application within one month — not a hardcoded demo.

---

# 1. Final Project Name

## KAAM Setu AI
### Verified Income Passport for Informal Workers

---

# 2. Final One-Line Pitch

> KAAM Setu AI turns daily informal work records into verified income passports, helping workers access safe credit, emergency protection, and financial identity through regulated partners.

---

# 3. Final Short Pitch

Informal workers are not uncreditworthy; they are undocumented. A construction worker may earn every day, but still have no salary slip, no formal income proof, no CIBIL score, and no access to safe credit.

KAAM Setu AI solves this by converting daily attendance, wage records, worker confirmations, disputes, and contractor verification into a trusted **Worker Income Passport**. This creates a dynamic **KAAM Score** and a safe loan recommendation that regulated lenders, NGOs, or employer advance programs can use.

KAAM Setu is not a lender. It is the missing trust layer between informal work and formal finance.

---

# 4. Final Core Formula

```text
Verify Work
→ Generate Wage Proof
→ Build KAAM Score
→ Recommend Safe Credit
→ Enable Emergency Protection
```

---

# 5. Final Positioning

## Do not pitch as

```text
A loan app for workers.
```

## Pitch as

```text
A verified income infrastructure platform for informal workers.
```

## Do not pitch as

```text
A payroll app.
```

## Pitch as

```text
A worker-owned income passport that turns wage records into financial identity.
```

## Do not pitch as

```text
An insurance platform.
```

## Pitch as

```text
A trigger-based emergency protection eligibility system for partner organizations.
```

## Do not pitch as

```text
A contractor compliance app only.
```

## Pitch as

```text
A three-sided trust ecosystem for workers, contractors, and financial partners.
```

---

# 6. Why This Idea Can Win

Most fintech hackathon ideas follow this pattern:

```text
User enters data
→ ML model predicts credit score
→ Loan approved or rejected
```

KAAM Setu is different. It does not wait for financial history. It creates trusted financial history from real work.

```text
Worker attends site
→ Attendance is verified
→ Wage slip is generated
→ Income proof is created
→ KAAM Score is updated
→ Safe credit is recommended
```

This is stronger, more original, and more socially useful than a normal loan prediction app.

---

# 7. Problem Statement Alignment

## Given fintech problem statement

Build an AI-powered fintech platform that leverages alternative data to provide:

1. Dynamic credit scoring
2. Instant micro-loans
3. Automated insurance payouts
4. Support for underserved workers and rural entrepreneurs

## KAAM Setu alignment

| Requirement | KAAM Setu Solution |
|---|---|
| Alternative data | Attendance, wage slips, GPS, worker confirmation, disputes, contractor trust |
| Dynamic credit scoring | KAAM Score updated from live work records |
| Instant micro-loans | Safe loan recommendation for regulated partners |
| Automated payouts | Income interruption protection trigger |
| Underserved workers | Construction workers, migrant workers, daily wage workers |
| Practical implementation | Next.js + Supabase + QR + GPS + PDF + SHA-256 |
| Responsible finance | Safe credit guardrail prevents over-borrowing |

---

# 8. Target Users

## 8.1 Informal Workers

Examples:
- construction workers
- daily wage labourers
- migrant workers
- masons
- painters
- helpers
- electricians
- plumbers
- site cleaners
- small contract workers

Their problem:
- no salary slips
- no credit history
- no proof of income
- informal wage records
- wage disputes
- forced to borrow from moneylenders
- no emergency financial protection

Their benefit:
- verified income proof
- downloadable wage slips
- worker-owned income passport
- dispute rights
- KAAM Score
- safe credit eligibility
- protection eligibility

## 8.2 Small Contractors

Their problem:
- manual attendance
- wage disputes
- no clean records
- difficulty calculating overtime
- workers asking for advances
- no centralized site dashboard

Their benefit:
- easy attendance
- wage slip generation
- dispute management
- site workforce tracking
- cleaner records
- less confusion

## 8.3 Lenders / NGOs / Employer Advance Partners

Their problem:
- cannot verify informal worker income
- no formal salary proof
- expensive borrower verification
- high risk of fake claims
- fear of over-lending

Their benefit:
- verified work data
- KAAM Score
- safe loan limit
- income history
- contractor trust score
- worker consent
- dispute history
- reduced verification effort

---

# 9. Final Three-Sided Ecosystem

KAAM Setu has three role-based portals:

## 9.1 Contractor Dashboard

Used by contractors to manage:
- sites
- workers
- attendance
- wages
- disputes
- wage slips
- site trust records

## 9.2 Worker KAAM Pass

Used by workers to access:
- income passport
- attendance history
- wage slips
- KAAM Score
- safe loan limit
- disputes
- emergency protection status

## 9.3 Lender / NGO Dashboard

Used by partners to review:
- consented worker profiles
- verified income
- score explanation
- safe loan recommendation
- contractor trust score
- protection eligibility

---

# 10. National Hackathon Judge Criteria Fix

---

## 10.1 Innovation & Originality — 10/10 Fix

### Possible judge doubt

```text
This is just attendance + payroll + credit scoring.
```

### Final innovation response

KAAM Setu is not any one of those. It is a new category:

```text
Verified Income Passport for Informal Workers
```

## Unique Innovations

### 1. Worker-Owned Income Passport

The worker owns a digital proof of:
- verified work days
- wage history
- wage slips
- site history
- skill history
- KAAM Score
- safe credit eligibility
- disputes raised/resolved

### 2. Dual Trust Scoring

KAAM scores both:

| Score | Meaning |
|---|---|
| KAAM Worker Score | How reliable the worker's verified income pattern is |
| Contractor Trust Score | How reliable the contractor's records are |

This matters because lenders do not only need to trust the worker. They also need to trust the source of the wage data.

### 3. Safe Credit Guardrail

KAAM does not push maximum loans. It recommends only what the worker can safely repay.

Example:

```text
Worker requested: ₹10,000
KAAM recommended: ₹4,000
Reason: Repayment should not exceed 20% of verified weekly income.
```

### 4. Worker Dispute Layer

Workers can challenge:
- wrong attendance
- missing attendance
- wrong wage rate
- unpaid overtime
- unfair deduction
- incorrect wage slip

This makes the product worker-first, not contractor-controlled.

### 5. Hash-Verified Wage Slips

Each wage slip is:
- generated as a PDF
- converted into normalized data
- hashed using SHA-256
- linked to a QR verification page

This makes income proof tamper-evident.

### Innovation final line

> Existing fintech reads financial history. KAAM Setu creates financial history from verified work.

---

## 10.2 Technical Feasibility — 10/10 Fix

### Feasibility concern

The earlier version had too many advanced ideas:
- Aadhaar
- DigiLocker
- Bima Sugam
- blockchain
- real loans
- real insurance
- complex ML

These are risky for a one-month build.

### Final feasibility fix

Build the production-ready core first.

## One-Month Production Scope

| Module | Build Status |
|---|---|
| Auth | Real |
| Contractor dashboard | Real |
| Site creation | Real |
| Worker onboarding | Real |
| Consent flow | Real |
| Attendance | Real |
| GPS/geofence validation | Real |
| Worker confirmation | Real |
| Disputes | Real |
| Wage calculation | Real |
| Wage slip PDF | Real |
| QR verification | Real |
| SHA-256 hash | Real |
| KAAM Score | Real rule-based |
| Safe loan recommendation | Real calculation |
| Lender dashboard | Real consent-based |
| Protection trigger | Real logic, partner-ready |

### Do Not Build in V1

| Avoid | Reason |
|---|---|
| Aadhaar integration | Privacy/legal complexity |
| Real loan disbursement | Requires regulated lending partner |
| Real insurance sale | Requires insurer/regulatory setup |
| Blockchain | Unnecessary for v1 |
| Full DigiLocker integration | Future feature |
| WhatsApp API dependency | Can be added later |
| Complex ML model | Not enough real training data at launch |

### Final Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| PDF | jsPDF / React PDF |
| QR | qrcode npm package |
| Hashing | SHA-256 |
| Maps/GPS | Browser geolocation + Haversine |
| Charts | Recharts |
| Validation | Zod |
| Deployment | Vercel + Supabase |

### Feasibility final line

> Our MVP is deployable because it uses practical technologies: QR, GPS, PDF, hash verification, Supabase, and an explainable scoring engine.

---

## 10.3 Impact & Inclusivity — 10/10 Fix

### Impact concern

The product must not look like it benefits only contractors or lenders.

### Final impact fix

Make the worker the central owner of the data.

## Worker Impact

KAAM helps workers get:
- proof of income
- wage slips
- verified work history
- dispute rights
- safer credit access
- emergency protection eligibility
- income passport
- financial dignity

## Contractor Impact

KAAM helps contractors get:
- attendance tracking
- wage calculations
- dispute reduction
- cleaner records
- worker management
- wage slip generation

## Lender / NGO Impact

KAAM helps partners get:
- verified income data
- lower verification cost
- better risk understanding
- safe loan limits
- fraud reduction
- consent-based worker profile

## Inclusivity Features

### 1. No Credit History Needed

Workers can build financial identity from work records, not past bank loans.

### 2. Low-End Phone Ready

Worker interface should be:
- PWA
- mobile-first
- low-data
- large buttons
- minimal text
- language-ready

### 3. Consent-First

Worker chooses whether data can be shared with lenders.

### 4. Fair Scoring

Do not use:
- caste
- religion
- gender
- language
- native place
- migrant status as negative factor
- health condition

Use only:
- verified attendance
- wage stability
- disputes
- income gaps
- repayment behavior
- profile completeness
- contractor trust

### 5. Worker Dispute Rights

Worker can challenge wrong records.

### Impact final line

> KAAM Setu gives workers proof, voice, consent, and safer financial access.

---

## 10.4 Clarity of Submission — 10/10 Fix

### Clarity concern

The product is powerful but can sound too broad.

### Final clarity fix

Explain it through one simple flow:

```text
Attendance → Wage Slip → KAAM Score → Safe Loan → Protection
```

## Final PPT Flow

### Slide 1: Title

```text
KAAM Setu AI
Verified Income Passport for Informal Workers
```

### Slide 2: Problem

```text
Informal workers work daily but cannot prove income.
```

### Slide 3: Existing Gap

```text
Payroll apps help employers.
Credit apps need existing data.
Workers still lack verified income proof.
```

### Slide 4: Solution

```text
KAAM converts daily work into verified income identity.
```

### Slide 5: Product Flow

```text
Attendance → Wage Slip → KAAM Score → Safe Loan → Protection
```

### Slide 6: Three Dashboards

```text
Contractor Dashboard
Worker KAAM Pass
Lender / NGO Dashboard
```

### Slide 7: Innovation

```text
Worker Income Passport
Contractor Trust Score
Safe Credit Guardrail
Worker Dispute System
```

### Slide 8: Tech Architecture

```text
Next.js + Supabase + QR + GPS + PDF + SHA-256 + Rule-Based Score
```

### Slide 9: Demo

```text
Ramesh's journey from invisible worker to credit-ready worker.
```

### Slide 10: Impact

```text
Workers, contractors, lenders, and society.
```

### Slide 11: Business Model

```text
Contractor SaaS + verified lead fee + enterprise dashboard + CSR protection pool.
```

### Slide 12: Closing

```text
KAAM turns invisible labour into trusted financial identity.
```

### Clarity final line

> In 30 seconds: KAAM turns work records into income proof, income proof into score, and score into safe financial access.

---

## 10.5 Business / Monetization — 10/10 Fix

### Business concern

A judge may ask:

```text
Why will contractors use this?
Who pays?
How does this scale?
```

### Final business fix

Every stakeholder gets direct value.

## Revenue Streams

| Revenue Stream | Customer | Why They Pay |
|---|---|---|
| Contractor SaaS | Contractors | Attendance, wages, disputes, records |
| Verified Lead Fee | Lenders/NGOs | Credit-ready worker profiles |
| Enterprise Dashboard | Large builders | Subcontractor workforce visibility |
| CSR Protection Pool | Companies/NGOs | Worker emergency support |
| Verification API | Partners | Verify wage slips/income passports |

## Pricing

| Plan | Price | Features |
|---|---:|---|
| Free | ₹0 | Up to 5 workers |
| Basic Site | ₹299/month | Attendance + worker records |
| Pro Site | ₹799/month | Wage slips + disputes + analytics |
| Enterprise | Custom | Multi-site + API + reports |

## Why Contractors Pay

Contractors get:
- easier attendance
- wage calculation
- reduced disputes
- downloadable records
- cleaner site management

## Why Workers Use It

Workers get:
- income proof
- wage slips
- dispute power
- credit eligibility
- protection eligibility

## Why Lenders Pay

Lenders get:
- verified income data
- reduced manual verification
- score explanation
- safer loan recommendation
- lower risk

### Business final line

> Contractors pay for operations. Lenders pay for verified intelligence. Workers get financial access.

---

# 11. Final Product Workflow

## Full End-to-End Workflow

```text
1. Contractor signs up
2. Contractor creates a site
3. Contractor adds worker
4. Worker confirms consent
5. Contractor marks attendance
6. GPS/geofence verifies location
7. Worker confirms or disputes attendance
8. Attendance becomes verified
9. Wage cycle closes
10. Wage slip is generated
11. SHA-256 hash is created
12. QR verification page is generated
13. Worker views wage slip in KAAM Pass
14. KAAM Score is calculated
15. Safe loan recommendation is generated
16. Worker gives consent to share profile
17. Lender/NGO reviews verified income
18. Income interruption trigger monitors risk
19. Emergency protection case can be created
```

---

# 12. Core Modules

---

## Module 1: Authentication and Roles

### Roles

```text
Contractor
Worker
Lender/NGO
Admin
```

### Requirements

- secure signup/login
- role-based redirection
- protected routes
- profile creation
- no unauthorized access

### Example

```text
Contractor logs in → goes to /contractor/dashboard
Worker logs in → goes to /worker/pass
Lender logs in → goes to /lender/dashboard
```

---

## Module 2: Contractor Dashboard

### Dashboard Cards

| Card | Meaning |
|---|---|
| Active Workers | Total workers assigned to contractor |
| Present Today | Workers marked present |
| Pending Confirmations | Attendance waiting for worker confirmation |
| Open Disputes | Worker complaints pending |
| Wage Due | Estimated upcoming wage payout |
| Loan-Ready Workers | Workers with good KAAM Score |
| Contractor Trust Score | Reliability of contractor records |

### Example

```text
Site: Green Valley Apartments
Workers: 42
Present Today: 36
Pending Confirmation: 5
Open Disputes: 2
Wage Due: ₹1,92,500
Loan-Ready Workers: 18
Trust Score: 84/100
```

---

## Module 3: Site Creation

### Inputs

| Field | Example |
|---|---|
| Site Name | Green Valley Apartments |
| Address | Mysuru |
| Latitude | 12.2958 |
| Longitude | 76.6394 |
| Geofence Radius | 200 meters |
| Wage Cycle | Weekly/Fortnightly/Monthly |

### Outputs

- site ID
- site dashboard
- QR code
- geofence boundary

---

## Module 4: Worker Onboarding

### Inputs

| Field | Example |
|---|---|
| Worker Name | Ramesh |
| Phone | 9876543210 |
| Skill | Mason |
| Daily Wage | ₹700 |
| Language | Kannada |
| Emergency Contact | 9876500000 |
| Site | Green Valley Apartments |

### Consent Text

```text
I agree that my attendance and wage records can be used to create my KAAM Income Passport. My data will not be shared with lenders without my permission.
```

### Worker Statuses

| Status | Meaning |
|---|---|
| Pending | Worker added but not confirmed |
| Active | Worker confirmed and active |
| Disputed | Worker disputed details |
| Inactive | Worker no longer active |

---

## Module 5: Attendance Verification

### Verification Signals

1. Contractor marking
2. GPS/geofence verification
3. Worker confirmation

### Attendance Trust Levels

| Level | Signals | Trust |
|---|---|---|
| Level 1 | Contractor only | Low |
| Level 2 | Contractor + GPS | Medium |
| Level 3 | Contractor + GPS + worker confirmation | High |
| Level 4 | Repeated verified pattern | Very High |

### Attendance Flow

```text
Contractor marks worker present
→ Browser captures location
→ Haversine distance checks site radius
→ Worker receives confirmation
→ Worker confirms or disputes
→ Attendance status updated
```

---

## Module 6: Worker Confirmation

### Worker Message

```text
You were marked present today for 9.5 hours at Green Valley Apartments.
Is this correct?

[Confirm] [Dispute]
```

### If Confirmed

```text
Attendance status = Worker Confirmed
```

### If Disputed

```text
Dispute ticket created
Contractor notified
Attendance not finalized until resolved
```

---

## Module 7: Dispute System

### Dispute Types

| Type | Example |
|---|---|
| Missing Attendance | I worked but was marked absent |
| Wrong Hours | I worked 10 hours but 8 were recorded |
| Overtime Missing | Extra hours not added |
| Wrong Wage Rate | My wage rate is incorrect |
| Unfair Deduction | Deduction is not valid |
| Wage Slip Error | Wage slip amount is wrong |

### Dispute Status

| Status | Meaning |
|---|---|
| Pending | Waiting for contractor response |
| Accepted | Contractor accepted correction |
| Rejected | Contractor rejected dispute |
| Escalated | Unresolved for long time |
| Closed | Final status |

### Why This Matters

This prevents contractor manipulation and makes the product inclusive.

---

## Module 8: Wage Calculation

### Inputs

- attendance records
- daily wage
- total days worked
- total hours
- overtime
- advances
- deductions

### Formula

```text
Base Wage = Days Worked × Daily Wage
Gross Wage = Base Wage + Overtime
Net Pay = Gross Wage - Advances - Deductions
```

### Example

```text
Daily Wage: ₹700
Days Worked: 12
Base Wage: 12 × ₹700 = ₹8,400
Overtime: ₹600
Advance: ₹1,000
Deductions: ₹0
Net Pay: ₹8,000
```

---

## Module 9: Wage Slip PDF

### Wage Slip Fields

- worker name
- worker ID
- contractor name
- site name
- wage period
- days worked
- total hours
- daily wage
- overtime amount
- advances
- deductions
- net pay
- generated date
- QR code
- hash ID

### Wage Slip Purpose

The wage slip becomes worker income proof.

---

## Module 10: SHA-256 Hash Verification

### Purpose

Make wage slips tamper-evident.

### Process

```text
Wage slip data
→ Normalize JSON
→ Generate SHA-256 hash
→ Store hash in database
→ Add QR to PDF
→ QR opens /verify/[hash]
→ Verification page shows result
```

### Verification Output

```text
Wage Slip Verified
Worker: Ramesh
Net Pay: ₹8,000
Period: 01 Jun - 15 Jun 2026
Hash Match: Yes
```

---

## Module 11: Worker KAAM Pass

### Worker Pass Sections

1. Profile
2. Verified work days
3. Monthly income
4. Attendance history
5. Wage slips
6. KAAM Score
7. Safe loan limit
8. Disputes
9. Protection status
10. Consent controls

### Example

```text
Worker: Ramesh
Skill: Mason
Verified Work Days: 24
Monthly Verified Income: ₹16,800
KAAM Score: 83/100
Safe Loan Limit: ₹4,000
Protection Status: Eligible
```

---

## Module 12: KAAM Score

### Score Range

```text
0 - 100
```

### Score Components

| Component | Weight |
|---|---:|
| Attendance Consistency | 25% |
| Wage Stability | 25% |
| Contractor Trust Score | 15% |
| Dispute Score | 10% |
| Income Gap Score | 10% |
| Repayment Score | 10% |
| Profile Completeness | 5% |

### Formula

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

### Score Bands

| Score | Band |
|---|---|
| 0-30 | Very Low Confidence |
| 31-50 | Low Confidence |
| 51-70 | Medium Confidence |
| 71-85 | Good Confidence |
| 86-100 | Strong Confidence |

### Example

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

---

## Module 13: Score Explanation

### Example Explanation

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

### Why This Matters

Explainability makes the system fair, transparent, and lender-friendly.

---

## Module 14: Contractor Trust Score

### Purpose

Measure reliability of contractor records.

### Components

| Component | Weight |
|---|---:|
| Worker Confirmation Rate | 25% |
| GPS Match Rate | 20% |
| Dispute Ratio | 20% |
| Wage Slip Consistency | 15% |
| Site Activity Pattern | 10% |
| Repayment Outcome | 10% |

### Example

```text
Contractor Trust Score: 84/100

Positive:
+ 92% worker confirmation rate
+ GPS match is consistent
+ Wage slips generated weekly

Risk:
- 2 unresolved wage disputes
```

---

## Module 15: Safe Loan Recommendation

### Purpose

Prevent over-borrowing.

### Rule

```text
Weekly repayment should not exceed 20% of verified weekly income.
```

### Formula

```text
Verified Weekly Income = Verified Monthly Income / 4
Max Weekly Repayment = Verified Weekly Income × 0.20
Safe Loan Amount = Max Weekly Repayment × Tenure Weeks
Recommended Amount = Min(Requested Amount, Safe Loan Amount)
```

### Example

```text
Verified Monthly Income: ₹16,800
Weekly Income: ₹4,200
Max Weekly Repayment: ₹840
Tenure: 6 weeks
Safe Amount: ₹5,040
Requested Amount: ₹10,000
Recommended Amount: ₹4,000 - ₹5,000
```

### Output

```text
You requested ₹10,000.
KAAM recommends ₹4,000 because repayment should stay within safe limits.
```

---

## Module 16: Lender / NGO Dashboard

### Partner Sees Only With Worker Consent

Fields:
- worker name
- verified monthly income
- attendance consistency
- wage slip count
- KAAM Score
- score explanation
- safe loan recommendation
- contractor trust score
- dispute history
- income gap risk

### Example

```text
Worker: Ramesh
Verified Monthly Income: ₹16,800
KAAM Score: 83/100
Risk Band: Good
Safe Loan Limit: ₹4,000
Contractor Trust: 84/100
Recommendation: Eligible for safe emergency credit
```

---

## Module 17: Income Interruption Protection

### Important Wording

Do not say:

```text
We sell insurance.
```

Say:

```text
We detect income interruption and enable partners to trigger emergency support.
```

### Trigger Conditions

| Trigger | Condition | Suggested Support |
|---|---|---:|
| Work Stoppage | 7 days no attendance after stable work | ₹1,000 |
| Site Accident | Accident marked by contractor and worker | ₹2,000 |
| Heavy Rain | Site activity stopped due to weather | ₹500-₹1,500 |
| Site Shutdown | Contractor marks site closed | ₹500-₹2,000 |

### Example

```text
Ramesh worked 24 days last month.
This week: 0 attendance for 7 days.
Reason: Site shutdown.
Protection Case: Triggered
Suggested Support: ₹1,000
```

---

# 13. Database Design

## Tables

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

## Data Relationship

```text
Contractor
→ Site
→ Worker Assignment
→ Attendance
→ Wage Slip
→ KAAM Score
→ Loan Recommendation
→ Lender Review / Protection Case
```

## Main Table Details

### profiles

Stores app user profile and role.

Fields:
- id
- auth_user_id
- role
- full_name
- phone
- email
- created_at
- updated_at

### contractors

Stores contractor business details.

Fields:
- id
- profile_id
- company_name
- city
- trust_score
- created_at
- updated_at

### sites

Stores construction sites.

Fields:
- id
- contractor_id
- site_name
- address
- latitude
- longitude
- geofence_radius_m
- wage_cycle
- active
- created_at
- updated_at

### workers

Stores worker details.

Fields:
- id
- profile_id
- full_name
- phone
- skill
- language_preference
- emergency_contact
- consent_status
- active
- created_at
- updated_at

### attendance

Stores daily attendance.

Fields:
- id
- worker_id
- site_id
- contractor_id
- attendance_date
- check_in
- check_out
- hours_worked
- latitude
- longitude
- gps_verified
- worker_confirmed
- trust_level
- status

### wage_slips

Stores wage slip records.

Fields:
- id
- worker_id
- contractor_id
- site_id
- period_start
- period_end
- days_worked
- total_hours
- base_wage
- overtime_amount
- advances
- deductions
- net_pay
- document_hash
- pdf_url
- verification_url
- status
- generated_at

### kaam_scores

Stores score history.

Fields:
- id
- worker_id
- score
- attendance_score
- wage_stability_score
- contractor_trust_score
- dispute_score
- income_gap_score
- repayment_score
- profile_score
- risk_band
- explanation_json
- generated_at

---

# 14. API Design

## Authentication

```text
POST /auth/signup
POST /auth/login
POST /auth/logout
```

## Contractor

```text
GET /contractor/dashboard
POST /api/sites
GET /api/sites
POST /api/workers
GET /api/workers
```

## Attendance

```text
POST /api/attendance
POST /api/attendance/{id}/confirm
POST /api/attendance/{id}/dispute
GET /api/attendance/worker/{worker_id}
```

## Wage Slip

```text
POST /api/wage-slips/generate
GET /api/wage-slips/{id}
GET /verify/{hash}
```

## KAAM Score

```text
POST /api/score/calculate/{worker_id}
GET /api/score/{worker_id}
```

## Loan Recommendation

```text
POST /api/loan/recommend
GET /api/loan/worker/{worker_id}
```

## Protection

```text
POST /api/protection/check/{worker_id}
GET /api/protection/worker/{worker_id}
```

## Lender

```text
GET /api/lender/workers
GET /api/lender/workers/{id}
POST /api/lender/request-consent
```

---

# 15. Security and Privacy

## Security Requirements

- Supabase Auth
- Role-based access
- Row-level security
- Protected routes
- Audit logs
- Secure file storage
- Environment variable protection
- No public access to private worker data

## Privacy Requirements

- worker consent required
- minimum data collection
- no Aadhaar in v1
- no sensitive scoring factors
- worker can control lender sharing
- lenders see only consented profiles
- public verification page shows limited data only

## Public Verification Page Data

Allowed:
- verification status
- worker first name or masked name
- net pay
- wage period
- site name
- hash match

Not allowed:
- phone number
- full personal profile
- emergency contact
- loan eligibility
- disputes
- private history

---

# 16. Production-Ready Build Plan

## Week 1: Foundation

Build:
- Next.js setup
- Supabase setup
- database schema
- authentication
- roles
- contractor dashboard
- site creation
- worker onboarding
- consent flow

Deliverable:

```text
A real contractor can create a site and add workers.
```

## Week 2: Work Records

Build:
- attendance marking
- GPS/geofence validation
- worker confirmation
- dispute system
- attendance history
- contractor trust basics

Deliverable:

```text
A real worker can be marked present, confirm, or dispute attendance.
```

## Week 3: Income Proof

Build:
- wage calculation
- wage slip PDF
- QR generation
- SHA-256 hashing
- public verification page
- Worker KAAM Pass

Deliverable:

```text
A worker can download and verify a real wage slip.
```

## Week 4: Fintech Layer and Polish

Build:
- KAAM Score
- score explanation
- safe loan recommendation
- lender dashboard
- lender consent
- protection trigger
- audit logs
- deployment
- final UI polish

Deliverable:

```text
The app is pilot-ready and can be deployed for real users.
```

---

# 17. Demo Story

## Character

```text
Name: Ramesh
Age: 32
Skill: Mason
Daily Wage: ₹700
Site: Green Valley Apartments, Mysuru
Contractor: Manjunath Constructions
```

## Before KAAM

```text
Ramesh earns regularly but has:
- no salary slip
- no formal credit score
- no verified income proof
- no safe emergency credit
- no strong way to dispute wage errors
```

## After KAAM

```text
Ramesh gets:
- verified attendance
- wage slips
- income passport
- KAAM Score
- safe loan recommendation
- protection eligibility
- dispute rights
```

## Demo Flow

```text
1. Contractor logs in
2. Creates Green Valley site
3. Adds Ramesh
4. Ramesh confirms consent
5. Contractor marks attendance
6. GPS verifies site
7. Ramesh confirms attendance
8. Wage slip is generated
9. QR verifies wage slip
10. KAAM Score is shown
11. Ramesh requests ₹10,000
12. KAAM recommends ₹4,000
13. Lender views profile after consent
14. Protection case triggers if work stops
```

---

# 18. Final 3-Minute Pitch Script

## Opening

Informal workers are not uncreditworthy. They are undocumented.

A construction worker like Ramesh may earn ₹700 every day, but when he goes to a lender, he has no salary slip, no credit history, and no trusted income proof.

## Problem

Today, many contractors still record attendance and wages manually. Workers cannot prove their income. Lenders cannot trust verbal claims. This creates a documentation black hole.

## Solution

KAAM Setu AI converts daily work records into a verified income passport.

The contractor records attendance. The worker confirms it. KAAM generates hash-verified wage slips. These records build a KAAM Score and safe credit recommendation.

## Product

KAAM has three dashboards:

1. Contractor Dashboard
2. Worker KAAM Pass
3. Lender / NGO Dashboard

## Innovation

Unlike traditional fintech apps, KAAM does not wait for financial history. KAAM creates financial history from verified work.

## Responsible Finance

If a worker asks for ₹10,000 but can safely repay only ₹4,000, KAAM recommends ₹4,000. We protect the worker from debt stress.

## Impact

Workers get proof of income. Contractors get clean records. Lenders get trusted alternative data. The informal worker becomes visible to formal finance.

## Closing

KAAM Setu AI turns invisible labour into trusted financial identity.

---

# 19. Judge Questions and Perfect Answers

## Q1. Is this just another attendance app?

No. Attendance is only the first data point. KAAM converts verified attendance into wage slips, income passport, KAAM Score, and safe credit recommendation.

## Q2. Is this just a payroll app?

No. Payroll apps stop at salary records. KAAM turns wage records into worker-owned financial identity.

## Q3. Are you giving loans?

No. KAAM is not a lender. KAAM creates verified income intelligence and safe recommendations for regulated lenders, NGOs, or employer advance programs.

## Q4. Are you selling insurance?

No. KAAM detects income interruption and enables partner organizations to trigger emergency support.

## Q5. How do you prevent fake workers?

Worker consent, phone confirmation, GPS/geofence, attendance confirmation, disputes, and contractor trust score.

## Q6. What if contractor manipulates data?

Workers can dispute records. Repeated unresolved disputes reduce contractor trust score.

## Q7. What makes your score fair?

KAAM does not use sensitive attributes. It only uses verified work behavior, wage stability, disputes, income gaps, and repayment history.

## Q8. Why will contractors use this?

They get attendance tracking, wage calculation, wage slips, fewer disputes, and cleaner records.

## Q9. Why will lenders use this?

They get verified income data and lower borrower verification cost.

## Q10. What can you build in one month?

A production-ready core: auth, sites, workers, attendance, geofence, consent, disputes, wage slips, QR/hash verification, KAAM Score, safe loan recommendation, and lender dashboard.

---

# 20. Risk Register

| Risk | Severity | Fix |
|---|---|---|
| Scope overload | High | Build verified income core first |
| Legal issue from lending | High | Do not lend directly |
| Insurance regulation issue | High | Use protection eligibility, not insurance sale |
| Fake data | High | GPS + worker confirmation + disputes |
| Contractor manipulation | High | Contractor trust score |
| Privacy concern | High | Consent + minimal data |
| Worker adoption | Medium | PWA, simple language, wage proof value |
| Contractor adoption | Medium | Attendance/wage/dispute utility |
| Lender trust | Medium | Hash-verified wage slips |
| AI bias | Medium | Avoid sensitive factors |

---

# 21. Success Metrics

## Worker Metrics

- workers onboarded
- wage slips generated
- KAAM Scores created
- disputes resolved
- workers with safe loan eligibility
- workers with verified income passport

## Contractor Metrics

- sites created
- attendance records marked
- wage slips generated
- disputes reduced
- active workers managed

## Lender Metrics

- profiles reviewed
- verified income checks
- safe recommendations generated
- consented data shares

## Impact Metrics

- informal income records created
- workers moved from undocumented to income-verified
- unsafe loan requests reduced
- emergency cases detected

---

# 22. Final Business Model

## Phase 1 Revenue

```text
Contractor SaaS
```

Contractors pay for:
- attendance
- worker records
- wage slips
- dispute management

## Phase 2 Revenue

```text
Verified lead fee
```

Lenders/NGOs pay for:
- verified worker profiles
- safe loan recommendations
- income passport verification

## Phase 3 Revenue

```text
Enterprise dashboard
```

Large builders pay for:
- multi-site worker visibility
- subcontractor tracking
- income verification APIs

## Phase 4 Revenue

```text
CSR protection pool
```

Companies/NGOs fund:
- emergency support
- income interruption protection
- worker welfare programs

---

# 23. Final 10/10 Criteria Mapping

| Criteria | Final Fix | Target |
|---|---|---|
| Innovation | Verified Income Passport + Dual Trust Score | 10/10 |
| Technical Feasibility | One-month deployable Next.js + Supabase app | 10/10 |
| Impact | Worker proof, voice, consent, safe finance | 10/10 |
| Clarity | One simple flow: Work → Wage → Score → Credit | 10/10 |
| Business | Contractor SaaS + lender intelligence + enterprise scale | 10/10 |

---

# 24. Final Build Priorities

If time becomes limited, build these first:

## Priority 1

```text
Contractor creates site
Worker added
Attendance marked
Worker confirms
```

## Priority 2

```text
Wage slip generated
QR created
Hash verified
```

## Priority 3

```text
KAAM Score
Safe loan recommendation
Worker KAAM Pass
```

## Priority 4

```text
Lender dashboard
Protection trigger
Business analytics
```

Never sacrifice the verified income core.

---

# 25. Final Product Summary

KAAM Setu AI is a production-ready fintech infrastructure platform for informal workers.

It creates a trusted bridge between:
- workers who lack proof
- contractors who record work
- lenders who need reliable data
- NGOs that provide support

## Final Formula

```text
Verified Work
→ Verified Wage Slip
→ Worker Income Passport
→ KAAM Score
→ Safe Credit
→ Emergency Protection
```

## Final Closing Line

> KAAM Setu AI turns invisible labour into trusted financial identity.

---

# 26. Final Notes for Team

## Build real, not fake

Do not hardcode main flows.

Use real:
- auth
- database
- attendance records
- wage calculations
- PDF generation
- QR codes
- hashes
- score calculations
- consent records
- disputes

## Keep the pitch simple

Do not overexplain technical details first.

Lead with:

```text
Workers cannot prove income.
KAAM creates income proof.
Income proof unlocks safe finance.
```

## Keep the product ethical

Do not push loans.

Protect workers.

Show safe loan recommendation clearly.

## Keep the MVP focused

Do not add advanced integrations until the core works.

---

# 27. Final Verdict

This final version fixes the major weaknesses:

| Old Weakness | Fixed By |
|---|---|
| Too broad | Simple verified income flow |
| Too risky legally | Partner-based lending/protection |
| Too contractor-focused | Worker consent and dispute rights |
| Too demo-like | Real production-ready build plan |
| Too generic | Verified Income Passport innovation |
| Too unclear | Clear 12-slide pitch flow |
| Too hard to monetize | Contractor SaaS + lender intelligence |

## Final Rating Target

```text
Innovation: 10/10
Feasibility: 10/10
Impact: 10/10
Clarity: 10/10
Business: 10/10
```

Execution will decide the actual score.

But this is the strongest, most practical, judge-proof version of KAAM Setu AI.
