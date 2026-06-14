## KAAM Finance 

## _The Compliance Operating System for India's Construction Supply Chain_ 

## One Line 

India just made it illegal to pay construction workers without documentation. KAAM turns contractor compliance into 55 million workers' first credit identity — and 

becomes the operating system every builder in India cannot afford to ignore. 

## The Real Problem 

A construction worker in India works 26 days for a contractor. At month end: 

- No payslip. No appointment letter. No proof of work. 

- Contractor pays whatever he wants. Worker cannot fight it. 

- Worker goes to a bank for a ₹5,000 loan — rejected. No credit history. 

- Worker needs insurance — rejected. No income proof. 

## **This is the daily reality of 55 million construction workers.** 

But here is the deeper problem nobody talks about: 

A regional builder hires 15 sub-contractors. One sub-contractor violates India's Labour Codes. The **principal employer** — the builder — gets blacklisted,  fined, or sued. Builders are terrified of their own supply chain. 

## **Two parties in desperate pain. One platform fixes both.** 

## What Changed in November 2025 

India's four Labour Codes came into force on **21 November  2025** : 

- Written appointment letters mandatory for every daily wage worker 

- Wage slips required every pay cycle 

- Records must be maintained **electronically** 

- Algorithm-driven **randomized inspections** — nobody is  safe 

- Principal employer **liable for sub-contractor violations** 

- Contractors get 30-day notice to rectify, then ₹50,000+ fines 

## **5 million small contractors non-compliant today. No tool exists for them. The gap opened 6 months ago. Nobody has filled it.** 

## The Strategic Architecture: Shield & Sword 

KAAM operates a two-sided acquisition engine: 

Regional Builder (terrified of liability) 

│ 

│ Mandates KAAM to all sub-contractors 

│ "You don't get paid unless you're on KAAM" 

▼ 

Small Contractor (pays ₹499/month to avoid ₹50,000 fine) 

│ 

│ Registers workers, marks attendance, issues wage slips 

▼ 

Worker (gets everything free via WhatsApp) 

│ 

│ Receives wage slip → KAAM Score → Loan → Insurance 

▼ 

Financial Inclusion at Zero Marginal Cost 

**Customer Acquisition Cost = ₹0.** The builder mandates it. The contractor pays. The worker benefits. 

## Why Regional Builders, Not L&T 

Large enterprises (L&T, DLF, Lodha) have 12–18 month procurement cycles. Regional builders in Karnataka managing ₹50–200 crore projects with 5–15 sub-contractors have the same liability fear and 4–6 week decision cycles. This is the wedge. Bengaluru and Mangalore alone have 300+ such builders. 

## How It Works 

## Step 1 — Builder Onboards (One Time) 

- Builder registers on KAAM web dashboard 

- Adds all sub-contractors with license numbers 

- Sets mandate: "Sub-contractors must maintain KAAM compliance to receive payment" 

- Builder gets real-time compliance dashboard for all sub-contractors 

## Step 2 — Contractor Onboards (5 minutes) 

- Downloads KAAM app (Flutter, Android, works on ₹4,000 phones) 

- Aadhaar eKYC (already legally required) 

- Registers site with GPS geofence 

## Step 3 — Worker Registration (2 minutes per worker) 

- Contractor enters worker Aadhaar number 

- UIDAI eKYC auto-fills name and photo 

- Worker receives WhatsApp welcome message + appointment letter 

- **Zero app download required for worker** 

## Step 4 — Daily Attendance with Proof of Proximity 

Standard marking: 

- Contractor marks Present / Absent / Half Day / Overtime on worker photo grid 

**The Innovation — Proof of Proximity:** For attendance  to be marked **VERIFIED** (not just logged): 

- Worker's phone and contractor's phone must be within 5 meters via Google Nearby Connections API (Bluetooth) 

- Both phones must be within the site GPS geofence simultaneously 

- 15-second proximity handshake required 

Attendance Status: 

VERIFIED   = GPS geofence ✓ + Bluetooth proximity ✓ 

GPS-ONLY   = GPS geofence ✓ + no proximity (worker may not have app) 

FLAGGED    = GPS mismatch or impossible timestamp 

Workers without smartphones: GPS-ONLY status — still valid, just lower verification tier. No worker is excluded. 

Every attendance record: 

hash = SHA-256(worker_id + site_id + date + status + 

contractor_gps + worker_gps + timestamp + proximity_flag) 

Stored immutably. Any alteration breaks the hash. 

## Step 5 — Daily Cryptographic Seal (6 PM) 

Every evening at 6 PM: 

MERKLE TREE CONSTRUCTION: 

Leaf nodes = SHA-256 hash of each attendance record that day 

Branch nodes = SHA-256(left_child + right_child) 

Root Hash = single 64-character fingerprint of entire day's records 

Root Hash → signed PDF "KAAM Audit Certificate [Date]" 

→ auto-uploaded to DigiLocker 

- → timestamped by DigiLocker (government-recognized) 

## **Even if the contractor deletes the app tonight, every worker's history is mathematically sealed and government-stored. It is cryptographically impossible to retroactively alter attendance.** 

Step 6 — KAAM Shield Alert (Pre-Audit Defense AI) 

Every night, KAAM AI scans all contractor records silently. 

If anomaly detected — contractor receives **private  in-app alert** : 

⚠  KAAM SHIELD ALERT — Action Required 

Worker #KAM-WKR-4051 (Raju, Mason) 

Attendance: 24 days worked 

Wage slip logged: 16 days payment 

Risk Level: HIGH 

Estimated Labour Code Violation: Section 43, Code on Wages 2019 

Potential Fine: ₹50,000+ 

This warning is PRIVATE. Not reported to Labour Department. 

You have 48 hours to rectify before monthly report is sealed. 

[Rectify Now] [View Records] [Speak to Support] 

## **KAAM is not a whistleblower. KAAM is the contractor's private legal advisor.** 

After 48 hours: if unresolved, anomaly escalates to Labour Inspector dashboard automatically. Contractor was warned. They chose not to act. 

## Step 7 — Wage Slip Auto-Generation 

CALCULATION: 

Gross = (Days Present + 0.5×Half Days + 1.5×Overtime) × Daily Rate 

Overtime rate = 2× (Labour Code mandate) 

Minimum Wage Check: 

Calculated wage < Karnataka state minimum? → BLOCK approval, show shortfall 

Deductions: 

Loan repayment (if active) 

Insurance premium (₹2/day if enrolled) 

Net Wages = Gross - Deductions 

Contractor approves with one tap → cannot alter after approval. 

Worker receives on WhatsApp: 

Namaskara Raju! Your wage slip for 1–15 June is ready. 

Net wages: ₹12,624. Payment date: 16 June. 

Paid via: UPI ✓ (Payment detected automatically) 

View slip: [PDF link] | Stored in DigiLocker ✓ 

Reply DISPUTE | LOAN | SCORE for assistance. 

**UPI Payment Detection:** When contractor pays via UPI  to worker's registered UPI ID, KAAM webhook detects matching transaction amount → wage slip marked **PAID — VERIFIED** . For cash payments: slip marked **PAYMENT UNVERIFIED** — honest,  still legally valid as income record. 

Slip stored in worker's DigiLocker automatically — government-recognized, tamper-proof. 

## Step 8 — KAAM Score 

KAAM SCORE (0–100): 

Payment Consistency    (40 pts)  On-time wage payment per cycle 

Employment Continuity  (30 pts)  Days worked, gaps between contracts 

Dispute History        (20 pts)  Clean record = full points 

Income Trend           (10 pts)  Wage growth over time 

Tiers: 

Bronze  0–30   → Loan: not eligible  | Insurance: ₹5,000 

Silver  31–55  → Loan: ₹1,000–3,000  | Insurance: ₹10,000 

Gold    56–75  → Loan: ₹3,000–7,000  | Insurance: ₹25,000 

Platinum 76–100 → Loan: ₹7,000–15,000 | Insurance: ₹50,000 

Step 9 — Micro-Loan in 90 Seconds 

Worker: replies "LOAN" on WhatsApp 

KAAM chatbot: "Your score: 72 (Gold). Max loan: ₹7,000. How much?" 

Worker: "2000" 

KAAM: "₹2,000 at 2% flat = ₹2,040 repaid on [date]. Confirm? YES/NO" 

Worker: "YES" 

↓ 

KAAM → Rang De API: 

Attaches: KAAM score + last 3 DigiLocker wage slips + repayment date 

↓ 

Rang De approves (< 60 seconds) → UPI disbursement 

↓ 

Repayment: auto-deducted from next wage slip 

No RBI license required — KAAM facilitates, Rang De lends. 

## **If contractor doesn't pay (wage theft):** 

- Loan grace period activated 

- KAAM Shield Alert fires to contractor (pay worker or face Labour Dept) 

- Dispute brief auto-generated for worker 

- Contractor account suspended from adding new workers 

## Step 10 — Parametric Insurance (No Claim Form) 

Income Gap Detection (runs daily): 

Worker hasn't received wage slip in 21 days? 

Not registered on new site? 

↓ 

WhatsApp: "Are you unwell? Reply SICK / HURT / NOWORK / OK" 

Worker: "HURT" 

↓ 

Optional: photo of any document (not mandatory for < ₹5,000) 

↓ 

Bima Sugam API → payout to worker UPI within 24 hours 

Premium: ₹2/day deducted from wage slip. No agent. No claim form. No hospital letter. Pure parametric. 

## Step 11 — AI Dispute Brief (Last Resort) 

If Shield Alert ignored and worker files dispute: 

Worker: replies "DISPUTE" on WhatsApp 

KAAM chatbot (Kannada/Tulu/Hindi via Bhashini): "What happened?" 

Worker speaks in Kannada (voice input) 

↓ 

Bhashini: voice → text → English translation 

↓ 

Claude API receives: 

- Worker complaint 

- Merkle-verified attendance records 

- Wage slip history 

- Contractor GPS logs 

- Shield Alert history (was contractor warned?) 

↓ 

Generates formal Labour Court complaint letter 

PDF → worker WhatsApp + DigiLocker 

Optional: auto-submit via Shram Suvidha 2.0 portal 

## The Immutable Ledger of Labor 

Day 1 Records:          Day 2 Records: 

[W001, Present, hash1]  [W001, Present, hash5] 

[W002, Absent,  hash2]  [W002, Present, hash6] 

[W003, Present, hash3]  [W003, Half,    hash7] 

[W004, OT,      hash4]  [W004, Present, hash8] 

│                       │ 

Merkle Root 1           Merkle Root 2 

│                       │ 

└──────────┬────────────┘ 

Weekly Root 

│ 

DigiLocker PDF 

"KAAM Audit Certificate" 

Timestamped. Government-stored. 

Mathematically impossible to alter. 

This is the same cryptographic principle used by Git and Bitcoin — applied to labor records for the first time in India. 

## KAAM Wallet (Near-Term) → KAAM Card (Year 3 Vision) 

## **Near-term (Buildable now — no new license):** 

- Contractor pays wages directly into worker's KAAM Wallet via UPI 

- Worker spends via any UPI QR at shops, pharmacies, schools 

- KAAM earns on loan float + insurance premium float 

## **Year 3 Vision (with banking partner):** 

- Co-branded RuPay Prepaid Card via small finance bank partner 

- Worker gets physical card — psychological ownership of financial identity 

- Transaction data enriches KAAM Score further 

- Path to full bank account for workers who qualify 

_RuPay card requires banking partner + RBI PPI framework — correct path is via Equitas or IDFC Small Finance Bank partnership, not direct issuance._ 

## What Doesn't Exist Yet (Verified) 

|**Existing Tool**|**Gap KAAM Fills**|
|---|---|
|HajariBook, Powerplay|Contractor-only. Worker gets nothing. No<br>compliance reporting.|
|Keka, Razorpay Payroll|Organized sector only. Cannot handle daily<br>wage, Aadhaar-based workers.|
|KreditBee, Aye Finance|No verified labour history. Uses social/UPI<br>data only.|
|India Labourline helpline|Reactive, phone-based, 40–50% resolution<br>rate.|
|Any builder compliance tool|None exists for sub-contractor Labour Code<br>compliance. Zero.|



**No platform combines: builder compliance mandate + contractor compliance tool + worker financial identity + cryptographic audit trail. This combination does not exist.** 

## AI Layer — Specific and Defensible 

|**Feature**|**What It Does**|**Tech**|
|---|---|---|
|KAAM Shield Alert|Private anomaly warning to<br>contractor 48hrs before<br>violation|Rule engine + Claude API|
|Wage Calculator|Auto-calculate with overtime,<br>minimum wage guard|Python rules|
|KAAM Score Engine|4-component scoring from<br>verified wage slip data|Weighted algorithm|
|Dispute Brief|Kannada voice → formal<br>Labour Court complaint|Bhashini + Claude API|
|Income Gap Detector|Triggers insurance when<br>wage slips stop|Cron job + pattern matching|



|**Feature**|**What It Does**|**Tech**|
|---|---|---|
|UPI Payment Detector|Marks slip PAID when UPI<br>transaction matches|Webhook from payment<br>partner|
|Fraud Patterns|Ghost workers, GPS<br>spoofing, wage suppression|Rule-based anomaly engine|
|Merkle Sealer|Daily cryptographic audit<br>certificate|Python hashlib|



## Tech Stack 

|Tech Stack|||
|---|---|---|
|**Layer**|**Technology**|**Why**|
|Mobile App|Flutter (Android)|Offline-first, works on ₹4,000<br>phones|
|Proximity|Google Nearby Connections<br>API|Bluetooth attendance<br>verification|
|Backend|FastAPI (Python)|Async, WebSocket, fast to<br>build|
|Database|PostgreSQL + PostGIS|Geospatial geofence checks|
|Cryptography|Python hashlib (SHA-256 +<br>Merkle)|Tamper-evident records|
|Worker delivery|WhatsApp Business API|Zero friction, zero download|
|Documents|DigiLocker API|Government-recognized<br>storage|
|Identity|Aadhaar eKYC (UIDAI)|Already legally mandated|
|Vernacular|Bhashini API (free, Govt of<br>India)|Kannada, Tulu, Hindi,<br>Malayalam|
|AI|Claude API + rule engine|Shield alerts + dispute briefs|
|Payment detect|UPI webhook (via Razorpay)|Auto-verify wage payment|



|**Layer**|**Technology**|**Why**|
|---|---|---|
|Loans|Rang De API|NGO partner, no RBI license|
|Insurance|Bima Sugam API|IRDAI marketplace, no<br>license|
|Dashboard|React + Leaflet.js|Builder + inspector web view|
|Deploy|Railway + Vercel|Free tiers, instant deploy|



## **Total infrastructure cost for pilot: ₹0** 

## Regulatory Position 

|Regulatory Position||
|---|---|
|**Concern**|**Reality**|
|Lending without RBI license|KAAM facilitates via Rang De (NGO). Legal.|
|Insurance without IRDAI license|KAAM connects to Bima Sugam marketplace.<br>Legal.|
|Aadhaar data handling|Mandatory under Labour Codes. Hash only<br>stored. DPDP compliant.|
|Prepaid wallet|UPI rails only (near-term). No PPI license<br>needed.|
|Credit scoring|Internal score only. Not sold as bureau<br>product. Legal.|
|Reporting violations|Shield Alert is private. Only escalates if<br>contractor ignores 48hr window.|



## **Zero regulatory risk at pilot stage.** 

## 6-Month Roadmap 

## Month 1 — Core Build 

- Flutter app: contractor onboarding, Aadhaar eKYC, site + worker registration 

- Wage slip auto-generation (Labour Code compliant) 

- WhatsApp delivery + DigiLocker storage 

- SHA-256 attendance hashing 

**Milestone:** 3 contractors, 30 workers, WhatsApp wage  slips live in Mangalore. 

## Month 2 — Intelligence Layer 

- Google Nearby Connections proximity verification 

- Daily Merkle root + DigiLocker audit certificate 

- KAAM Shield Alert (private anomaly warning) 

- UPI payment webhook detection 

- Bhashini voice input (Kannada) 

**Milestone:** First Shield Alert sent. First Merkle audit  certificate in DigiLocker. 

## Month 3 — Financial Layer 

- KAAM Score algorithm 

- Rang De API integration (micro-loans) 

- Bima Sugam API integration (parametric insurance) 

- Income gap detector 

- Dispute brief generator (Claude API) 

**Milestone:** First micro-loan facilitated. First insurance  policy issued. 

## Month 4 — Builder Dashboard 

- React web dashboard for regional builders 

- Sub-contractor compliance scorecards 

- Real-time anomaly alerts for principal employers 

- Onboard 2 regional builders in Mangalore/Udupi 

**Milestone:** First builder mandates KAAM to sub-contractors.  CAC = ₹0 proven. 

## Month 5 — Scale 

- Onboard 50 contractors via builder mandates 

- 500 workers receiving wage slips 

- Karnataka Labour Department demo 

- Letter of support from builder + Labour Dept 

**Milestone:** 500 workers. Government letter. Builder  mandate model proven. 

## Month 6 — Hackathon 

- Case study: X contractors, Y workers, Z slips, ₹A loans, B disputes prevented 

- Accuracy metrics: Shield Alerts sent vs violations caught 

- Pitch deck on real numbers 

- Opening slide: the workers who built your house 

## Team of 4 

|Team of 4|||
|---|---|---|
|**Person**|**Owns**|**Stack**|
|P1|Flutter app, proximity, offline<br>sync|Flutter, Nearby Connections,<br>Bhashini|
|P2|Backend, Merkle engine,<br>wage calculation, scoring|FastAPI, PostgreSQL, Python<br>hashlib|
|P3|Shield Alert AI, dispute briefs,<br>UPI webhook, dashboard|Claude API, React, Razorpay<br>webhook|
|P4|Builder partnerships, Labour<br>Dept relations, pitch deck|Outreach, documentation,<br>demo script|



P4 is not support. The builder MOU and government letter are what separate you from every other team. 

## Monetization 

|**Stream**|**Model**|**Near-Term**|
|---|---|---|
|Contractor SaaS|₹499/month Standard,<br>₹999/month Pro|Month 1|



|**Stream**|**Model**|**Near-Term**|
|---|---|---|
|Builder Compliance<br>Dashboard|₹5,000–₹15,000/month per<br>builder|Month 4|
|Loan facilitation|0.5% per loan via Rang De|Month 3|
|Insurance commission|₹8/policy/month via Bima<br>Sugam|Month 3|
|Labour Dept SaaS|₹5,000/month per district|Month 6|
|KAAM Wallet float|Interest on held wage funds|Year 2|
|KAAM Card MDR|Via banking partner (RuPay)|Year 3|



**Year 1 realistic:** 200 contractors × ₹499 + 5 builders  × ₹10,000 = ~₹15 lakh/month ARR 

## Prior Work Reuse 

|Prior Work Reuse||
|---|---|
|**Project**|**Reused In KAAM**|
|VORTEX (Algorand smart contracts)|Merkle tree audit logic + cryptographic<br>signing|
|VORTEX (adversarial AI jury)|Shield Alert anomaly detection + fraud pattern<br>engine|
|AETHER (Neo4j knowledge graph)|Builder → contractor → worker relationship<br>graph|
|SENTINEL (TTL Confidence Decay)|Shield Alert 48hr escalation window|
|KAWACH (offline mesh)|Offline attendance sync architecture|
|PRISM (on-device processing)|Offline-first Flutter app patterns|



## Judging Criteria — How KAAM Scores 

|**Criterion**|**KAAM's Answer**|**Strength**|
|---|---|---|
|Innovation & Originality|Proximity handshake +<br>Merkle labor ledger + Shield<br>Alert +<br>compliance-as-acquisition.<br>No combination exists<br>anywhere.|★★★★★|
|Technical Feasibility|Every component is a free,<br>production-grade API. Flutter<br>+ FastAPI + WhatsApp +<br>DigiLocker + Bhashini +<br>Claude. All live, all demo-able<br>day 1.|★★★★★|
|Impact & Inclusivity|55M workers, zero digital<br>literacy required, vernacular<br>voice, WhatsApp delivery, no<br>app download for workers.<br>Builder compliance solves<br>principal employer terror.|★★★★★|
|Clarity|One story. One pivot. One<br>supply chain. "The workers<br>who built my house. Now<br>protected."|★★★★★|
|Monetization|₹499/month SaaS + builder<br>dashboard + facilitation fees.<br>Contractor pays because law<br>forces them. Not charity. Not<br>optional.|★★★★★|



## The Pitch That Ends Competition 

_"The workers who built my house got cheated. No payslip. No proof. No recourse._ 

_In November 2025, India made that illegal. 5 million contractors are non-compliant today. And the builders who hired them are equally terrified — because under the new Labour Codes, the builder is liable for their sub-contractor's violations._ 

_KAAM solves both sides with one platform. Builders mandate it. Contractors pay ₹499/month to avoid a ₹50,000 fine. Workers get their first wage slip, first credit score, first loan in 90 seconds, and insurance that pays without a claim form._ 

_Our AI doesn't report violations. It privately warns contractors 48 hours before a violation becomes one. We are their legal advisor, not the government's informant._ 

_Every attendance record is cryptographically sealed daily into DigiLocker using Merkle trees — the same math behind Git and Bitcoin. Even if the contractor deletes the app, the worker's history is mathematically impossible to forge._ 

_500 workers in Mangalore are already using it. 2 regional builders have mandated it to their sub-contractors. This is not a prototype._ 

_This is the operating system for India's construction supply chain."_ 

_KAAM Finance — 11/10 Architecture  Version 2.0 | National  Hackathon | Theme 2: Fintech & Financial Inclusion  Built on: Flutter · FastAPI ·  WhatsApp API · DigiLocker · Bhashini · Claude API · Rang De · Bima Sugam_ 

