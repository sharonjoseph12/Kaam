## KAAM Finance — Complete Workflow 

_Every screen, every API call, every data flow, every edge case_ 

## System Architecture Overview 

**==> picture [471 x 455] intentionally omitted <==**

**----- Start of picture text -----**<br>
 ┌───────────────────────────────────────────────────────────<br> ──────┐<br> │                        KAAM PLATFORM                            │<br> │                                                                 │<br> │  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │<br> │  │  Flutter App │    │  FastAPI     │    │  External APIs   │  │<br> │  │  (Contractor)│◄──►│  Backend     │◄──►│  WhatsApp        │  │<br> │  └──────────────┘    │  PostgreSQL  │    │  DigiLocker      │  │<br> │                      │  PostGIS     │    │  Bhashini        │  │<br> │  ┌──────────────┐    └──────────────┘    │  Claude API      │  │<br> │  │  React Web   │           │            │  Rang De         │  │<br> │  │  Dashboard   │◄──────────┘            │  Bima Sugam      │  │<br> │  │  (Admin +    │                        │  Aadhaar eKYC    │  │<br> │  │  Labour Dept)│                        └──────────────────┘  │<br> │  └──────────────┘                                               │<br> └───────────────────────────────────────────────────────────<br> ──────┘<br>**----- End of picture text -----**<br>


## Actor Map 

|Actor Map||||
|---|---|---|---|
|**Actor**|**Device**|**Tech Literacy**|**Primary Action**|
|**Contractor**|Android (₹6,000+)|Low-medium|Marks attendance,<br>approves wage slips|
|**Worker**|Any phone with<br>WhatsApp|Very low|Receives slips,<br>requests loans via<br>WhatsApp|
|**Labour Inspector**|Web dashboard|Medium|Views compliance<br>reports per contractor|
|**KAAM Admin**|Web dashboard|High|Monitors platform,<br>flags anomalies|
|**Rang De (NGO)**|API integration|N/A|Receives loan<br>requests, disburses<br>funds|
|**Bima Sugam**|API integration|N/A|Receives insurance<br>triggers, issues<br>payouts|



## Workflow 1 — Contractor Onboarding 

## 1.1 App Download & Registration 

Contractor downloads KAAM app (Play Store) 

↓ 

Language selection screen 

[Kannada] [Hindi] [English] [Tulu] [Malayalam] 

↓ 

Phone number entry → OTP via SMS 

↓ 

Aadhaar eKYC (mandatory — Labour Codes require contractor identity) 

- → Aadhaar number + OTP 

- → UIDAI API verifies → name, address auto-filled 

↓ 

Business registration 

- → Contractor name (auto from Aadhaar) 

- → Trade license number (optional at signup, required within 30 days) 

- → State + District selection 

- → Primary work type: [Construction] [Renovation] [Electrical] [Plumbing] [Other] 

↓ 

Account created → Contractor ID: KAM-CTR-XXXXXX generated 

## 1.2 Site Registration 

Contractor taps "Add Site" 

↓ 

Site name (voice input supported via Bhashini) 

↓ 

GPS auto-captures current location 

- → Contractor confirms pin on map 

- → Geofence radius set: 50m / 100m / 200m (contractor chooses) 

↓ 

Site details: 

- → Expected start date 

- → Expected end date 

- → Type: [New Construction] [Renovation] [Infrastructure] [Other] 

↓ 

Site ID generated: KAM-SITE-XXXXXX 

- QR code generated for site (printed or shown on screen) 

## 1.3 Worker Registration (Per Site) 

- Contractor taps "Add Worker" 

↓ 

Worker's Aadhaar number entered (or scanned via camera) 

- → UIDAI eKYC: name + photo pulled automatically 

- → Contractor cannot manually edit name (fraud prevention) 

↓ 

Worker details (contractor fills): 

- → Work category: [Mason] [Helper] [Carpenter] [Electrician] [Painter] [Other] 

- → Daily wage rate: ₹___ 

- → Wage cycle: [Daily] [Weekly] [Fortnightly] [Monthly] 

- → Start date on this site 

↓ 

Worker WhatsApp number entered 

- → WhatsApp verification message sent automatically 

- → Worker replies "JOIN" to confirm 

- → If worker doesn't have WhatsApp: slip sent as SMS PDF link 

↓ 

Worker ID generated: KAM-WKR-XXXXXX 

Worker receives WhatsApp welcome message: 

"Namaskara [Name]! You are registered on KAAM Finance by 

contractor [Name] for site [Site Name]. You will receive 

your wage slip every [cycle]. Reply HELP for assistance." 

↓ 

Appointment letter auto-generated (Labour Code compliant): 

- → Worker name, Aadhaar (masked), work category, wage rate, 

site address, start date, contractor name + license 

- → Sent to worker's WhatsApp as PDF 

- → Stored in worker's DigiLocker automatically 

- → Contractor gets copy for their records 

**Edge case:** Worker refuses WhatsApp verification →  Slip stored in KAAM portal, accessible via 

SMS link with OTP 

## Workflow 2 — Daily Attendance 

- 2.1 Standard Attendance Marking (Contractor) 

- Contractor opens app → "Mark Attendance" (home screen, large button) 

↓ 

Site selection (if multiple sites) 

↓ 

Worker list loads (with photos from Aadhaar eKYC) 

↓ 

For each worker, contractor taps: 

[P] Present  [A] Absent  [H] Half Day  [OT] Overtime 

↓ 

Attendance submitted 

↓ 

Backend processing: 

- → Timestamp recorded (UTC, cannot be altered) 

→ GPS coordinates of contractor at time of submission recorded 

→ GPS cross-checked against site geofence 

✓ Within geofence → marked VERIFIED 

✗ Outside geofence → marked FLAGGED (visible to KAAM admin) 

- → Record hashed: SHA-256(worker_id + date + status + contractor_gps + timestamp) 

- → Hash stored in DB — any alteration invalidates hash 

↓ 

Confirmation shown to contractor 

Worker receives NO notification for daily attendance 

(Reduces noise — worker notified only on wage slip) 

2.2 Offline Attendance (No Internet on Site) 

Contractor marks attendance offline (app caches locally) 

↓ 

Cached with device timestamp + last known GPS 

↓ 

Sync queue holds records 

↓ 

When internet available (contractor reaches home/town): 

- → Auto-sync triggered 

- → Records uploaded with offline flag 

→ KAAM admin can see which records were offline-synced 

- → Offline records accepted if synced within 24 hours 

→ After 24 hours: requires contractor explanation note 

2.3 Attendance Dispute (Worker Challenges) 

Worker receives wage slip (see Workflow 3) 

Worker notices wrong attendance count 

↓ 

Worker replies to WhatsApp slip message: "DISPUTE" 

↓ 

KAAM chatbot (Bhashini-powered, vernacular): 

"Which dates are wrong? Reply with date e.g. 15 June" 

↓ 

Worker lists disputed dates 

↓ 

## KAAM backend: 

- → Fetches attendance records for those dates 

- → Fetches contractor's GPS for those dates 

- → Generates dispute summary 

↓ 

Sent to contractor for response (48-hour window) 

↓ 

Contractor responds: [Agree to correct] [Disagree + explanation] 

↓ 

If agree: wage slip corrected, reissued, difference paid next cycle 

If disagree: KAAM AI generates formal dispute brief 

- → Worker can submit to Labour Court / Lok Adalat 

- → PDF generated with all evidence: attendance logs, GPS, hashes, timestamps 

## Workflow 3 — Wage Slip Generation 

## 3.1 Automatic Calculation 

Trigger: Wage cycle end date reached (system cron job) 

↓ 

For each active worker on each site: 

## CALCULATION ENGINE: 

Days Present = COUNT(status='P') in cycle 

Half Days = COUNT(status='H') × 0.5 

Overtime Days = COUNT(status='OT') × 1.5  (Labour Code: 2× rate) 

Absent Days = COUNT(status='A') 

Gross Wages = (Days Present + Half Days + Overtime Days) × Daily Rate 

Deductions (if applicable): 

- → Advance recovery (if worker took advance) 

- → Insurance premium (₹2/day × days present, if enrolled) 

Net Wages = Gross Wages - Deductions 

KAAM checks: 

- → Net Wages ≥ State Minimum Wage for category? 

If NO → FLAG for contractor + alert (Labour Code violation) 

- → Overtime rate correct? (Must be 2× basic, not 1.5×) 

If NO → Auto-correct + flag 

↓ 

Wage slip draft generated 

3.2 Wage Slip Format (Labour Code Compliant) 

═══════════════════════════════════════ 

## KAAM FINANCE WAGE SLIP 

(Labour Code Compliant) 

═══════════════════════════════════════ 

Worker Name:    [Name from Aadhaar] 

Worker ID:      KAM-WKR-XXXXXX 

Aadhaar:        XXXX-XXXX-XXXX (masked) 

Site:           [Site Name, Address] 

Contractor:     [Name], License: [No.] 

Period:         01 June – 15 June 2026 

═══════════════════════════════════════ 

ATTENDANCE SUMMARY 

Days Present:      12 Half Days:          1 Overtime Days:      2 Days Absent:        0 

Total Payable Days: 13.5 + 3 OT 

═══════════════════════════════════════ 

EARNINGS 

Basic Wages:    13.5 × ₹700  = ₹9,450 

Overtime:        3  × ₹1,400 = ₹4,200 (2× rate as per Labour Code) 

Gross Wages:                   ₹13,650 

═══════════════════════════════════════ 

DEDUCTIONS 

Advance Recovery:              ₹1,000 

Insurance Premium:             ₹26 

Total Deductions:              ₹1,026 

═══════════════════════════════════════ 

NET WAGES:                    ₹12,624 

═══════════════════════════════════════ 

Payment Mode:   Cash / UPI / Bank 

Payment Date:   16 June 2026 

KAAM Slip ID:   KAM-SLIP-XXXXXXXX 

Verification:   [QR Code to verify] 

═══════════════════════════════════════ 

Stored in DigiLocker. Legally valid. 

## 3.3 Contractor Approval 

Contractor receives in-app notification: 

"Wage slips ready for 18 workers. Review and approve." 

↓ 

Contractor reviews summary screen: 

- → Total payout: ₹X 

- → Any flagged violations highlighted in red 

- → Individual slip preview available 

↓ 

## Contractor taps [Approve All] or reviews individually 

↓ 

## On approval: 

- → All slips digitally signed with contractor's KAAM key 

- → Timestamp of approval recorded 

- → Cannot be altered after approval 

↓ 

Distribution triggered automatically 

## 3.4 Worker Delivery 

For each worker: 

↓ 

## WhatsApp message sent: 

"Namaskara [Name]! Your wage slip for 1–15 June is ready. 

Net wages: ₹12,624. Payment date: 16 June. 

View slip: [PDF link] | Stored in DigiLocker ✓ 

Reply DISPUTE if anything is wrong. 

Reply LOAN if you need an advance." 

↓ 

PDF link: hosted on KAAM servers, accessible with worker OTP 

↓ 

DigiLocker: 

- → Slip auto-uploaded to worker's DigiLocker 

- → Worker receives DigiLocker notification separately 

- → Slip is now a government-recognized document 

↓ 

## KAAM database: 

- → Slip marked DELIVERED 

- → If WhatsApp fails: SMS fallback with PDF link 

- → If SMS fails: slip available at KAAM web portal with OTP login 

## Workflow 4 — KAAM Score Generation 

4.1 Score Calculation (Runs Monthly After 3rd Slip) 

KAAM SCORE ENGINE (0–100): 

Component 1: Payment Consistency (40 points) 

- → Was worker paid within 48 hours of wage slip approval? 

Each on-time payment: +3 points 

Each late payment (48–96 hrs): +1 point 

Each very late / missing payment: -5 points 

- → Max: 40 points 

Component 2: Employment Continuity (30 points) 

- → Months with ≥ 15 days worked: +3 points each 

- → Months with 8–14 days: +1 point 

- → Months with < 8 days: 0 points 

- → Gap between contracts > 30 days: -3 points 

- → Max: 30 points 

Component 3: Dispute History (20 points) 

- → No disputes: full 20 points 

- → Dispute raised, resolved in worker's favour: -2 points 

- → Dispute raised, contractor refused, went to court: -5 points 

- → Multiple disputes same contractor: additional -3 points 

- Component 4: Income Growth (10 points) 

- → Wage rate increased over time: +5 points 

- → Consistent same rate: +3 points 

- → Rate decreased: 0 points 

FINAL KAAM SCORE = Sum of all components (0–100) 

## 4.2 Score Tiers 

|4.2 Score Tiers||||
|---|---|---|---|
|**Score**|**Tier**|**Loan Limit**|**Insurance**|
|0–30|Bronze|Not eligible|Basic ₹5,000|
|31–55|Silver|₹1,000–₹3,000|₹10,000|
|56–75|Gold|₹3,000–₹7,000|₹25,000|
|76–100|Platinum|₹7,000–₹15,000|₹50,000|



## 4.3 Score Delivery to Worker 

Monthly WhatsApp message: 

"Your KAAM Score this month: 72 (Gold) 🥇 

This means you can borrow up to ₹7,000. 

You are covered for ₹25,000 insurance. 

Reply LOAN to apply. Reply SCORE to see details." 

## Workflow 5 — Micro-Loan Facilitation 

## 5.1 Worker Requests Loan 

Worker replies "LOAN" to any KAAM WhatsApp message 

↓ 

KAAM chatbot responds: 

"Your KAAM Score: 72 (Gold) 

Maximum loan: ₹7,000 

How much do you need? Reply with amount e.g. 2000" 

↓ 

Worker replies: "2000" 

↓ 

Chatbot: 

"₹2,000 loan. Repaid from your next wage slip on [date]. 

Interest: ₹40 (2% flat, Rang De partner rate). 

Total repayment: ₹2,040. 

Confirm? Reply YES or NO" 

↓ 

Worker replies: "YES" 

↓ 

## KAAM backend: 

- → Creates loan request object 

- → Attaches: worker ID, KAAM score, last 3 wage slips, repayment date 

- → Sends to Rang De API 

## 5.2 Rang De Processing 

Rang De API receives loan request 

↓ 

Rang De underwriting (automated, < 60 seconds): 

- → Verifies KAAM score 

- → Verifies wage slip authenticity (KAAM slip ID check) 

- → Verifies DigiLocker storage (tamper-proof confirmation) 

- → Checks prior loan history (if any) 

↓ 

Decision: APPROVED / REJECTED 

↓ 

## If APPROVED: 

- → Rang De disburses to worker's UPI ID or bank account 

- → KAAM notified via webhook 

- → Worker WhatsApp: "₹2,000 sent to your UPI [ID]. 

Repayment of ₹2,040 will be deducted from your 

wage slip on [date]. KAAM Loan ID: KAM-LN-XXXXX" 

↓ 

## If REJECTED: 

- → Reason sent to KAAM 

- → KAAM notifies worker: "Loan not approved this time. 

Reason: [reason]. Build your score by working 

consistently for 2 more months." 

## 5.3 Loan Repayment 

Next wage cycle end: 

↓ 

Wage slip calculation includes: 

Deductions → Loan repayment: ₹2,040 

↓ 

Contractor approves slip (deduction visible) 

↓ 

On wage slip approval: 

- → KAAM triggers repayment to Rang De 

- → Rang De confirms receipt 

- → Worker WhatsApp: "Loan repaid ✓. 

Your KAAM Score has improved." 

↓ 

KAAM Score update: 

- → On-time repayment: +5 bonus points 

- → Score recalculated 

**Edge case:** Contractor doesn't pay worker (wage theft  scenario) 

- → Worker doesn't receive wages 

- → Loan repayment cannot be triggered 

- → KAAM flags contractor (wage theft alert) 

- → Rang De notified (30-day grace period) 

- → KAAM AI generates dispute brief for worker automatically 

- → Contractor account flagged, cannot add new workers until resolved 

## Workflow 6 — Parametric Insurance 

## 6.1 Enrollment 

When worker reaches Silver tier (score ≥ 31): 

## ↓ 

## WhatsApp message: 

"You qualify for KAAM Insurance! ₹2/day premium. 

Payout: ₹10,000 if you can't work due to illness/injury. 

No paperwork, no claim form — automatic payout. 

Reply INSURE to enroll." 

↓ 

Worker replies: "INSURE" 

↓ 

KAAM backend: 

- → Creates insurance enrollment 

- → Sends to Bima Sugam API 

→ Premium: ₹2/day deducted from each wage slip 

→ Worker receives policy document on WhatsApp + DigiLocker 

## 6.2 Automatic Payout Trigger 

Income Gap Detection (runs daily): 

↓ 

For each insured worker: 

Check: Has this worker received a wage slip in the last 21 days? 

↓ 

NO → Income gap detected 

↓ 

Check: Is worker registered on another site? (may have changed jobs) 

YES → No trigger. New site detected. 

NO → Potential income disruption 

↓ 

KAAM chatbot WhatsApp to worker: 

"We noticed you haven't received wages in 21 days. 

Are you unwell or injured? Reply: 

SICK — illness 

HURT — injury 

NOWORK — no work available 

OK — I'm fine, working elsewhere" 

↓ 

Worker replies: "HURT" 

↓ 

KAAM: 

- → Requests hospital/clinic photo (optional, not mandatory) 

- → Worker uploads photo of any document (even informal) 

- → OR simply confirms via WhatsApp (no document required for < ₹5,000) 

↓ 

Bima Sugam API triggered: 

- → Policy ID + worker ID + trigger reason sent 

→ Payout: ₹10,000 (Gold tier) initiated 

- → Worker UPI/bank credited within 24 hours 

↓ 

Worker WhatsApp: "₹10,000 insurance payout sent ✓ 

Get well soon. Your policy remains active." 

## Workflow 7 — AI Dispute Brief Generator 

## 7.1 Worker Initiates Dispute 

Worker replies "DISPUTE" to wage slip 

↓ 

KAAM chatbot (Bhashini — Kannada/Hindi/Tulu): 

"What is the problem? You can speak or type." 

↓ 

Worker speaks in Kannada: 

"Nanu 20 dina keli madide, avaaru 14 dina maatra helu-tiddare" 

- (Translation: "I worked 20 days but they are saying only 14") 

↓ 

Bhashini ASR: voice → Kannada text 

Bhashini translation: Kannada → English 

↓ 

Claude API receives: 

- Worker complaint (translated) 

- Attendance records (from DB) 

- Wage slip data 

- GPS logs for disputed dates 

- Contractor response (if any) 

↓ 

Claude generates formal complaint letter: 

## **Sample AI-Generated Complaint:** 

TO: The Labour Inspector 

District Labour Office, Mangalore 

Karnataka 

SUBJECT: Complaint of Wage Underpayment under Code on Wages, 2019 

Respected Sir/Madam, 

I, [Worker Name], Aadhaar No. XXXX-XXXX-XXXX, employed as a 

Mason at [Site Name], [Site Address], by contractor [Name], 

License No. [X], wish to register the following complaint: 

FACTS: 

1. I was employed from [date] to [date] at a daily wage of ₹700. 

2. KAAM platform records (cryptographically verified) show I 

worked 20 days during the period 1–30 May 2026. 

3. The contractor issued a wage slip showing only 14 days worked. 

4. Underpayment: 6 days × ₹700 = ₹4,200. 

EVIDENCE ATTACHED: 

- KAAM attendance log (hash-verified): Exhibit A 

- GPS records of contractor on disputed dates: Exhibit B 

- Original wage slip issued: Exhibit C 

- Corrected wage slip (KAAM calculated): Exhibit D 

This constitutes a violation of Section 43 of the Code on 

Wages, 2019, which mandates accurate wage payment within 

the prescribed wage period. 

I request immediate intervention and recovery of ₹4,200. 

Yours faithfully, 

[Worker Name] 

KAAM Worker ID: KAM-WKR-XXXXXX 

Date: [Date] 

↓ 

PDF generated, sent to worker's WhatsApp 

Worker taps: [Submit to Labour Dept Portal] or [Save PDF] 

↓ 

Optional: KAAM submits directly via Shram Suvidha 2.0 portal API 

## Workflow 8 — Labour Inspector Dashboard 

## 8.1 Inspector Login 

Inspector receives KAAM portal access from Labour Dept 

↓ 

Login: Government credentials (OAuth with NIC) 

↓ 

Dashboard shows: 

- → All contractors registered in their jurisdiction 

- → Compliance score per contractor (0–100%) 

- → Active workers per site 

- → Pending wage disputes 

- → Wage anomaly alerts 

- → Last inspection date 

## 8.2 Compliance Report (Per Contractor) 

Inspector selects contractor 

↓ 

Full report: 

- → Appointment letters issued: X of X workers ✓ 

- → Wage slips issued on time: 94% ✓ 

- → Minimum wage violations: 0 ✓ 

- → Disputes filed: 2 (both resolved) 

- → Workers registered on e-Shram: X of X 

- → BOCW cess paid: [status] 

↓ 

Inspector can: 

- → Download PDF compliance report 

- → Flag contractor for inspection 

- → Mark contractor as compliant (reduces future inspection frequency) 

- → Send notice through portal 

## Workflow 9 — Fraud Detection & Anomaly Alerts 

## 9.1 Contractor Fraud Patterns Detected 

KAAM AI monitors (runs nightly): 

Pattern 1: Wage Suppression 

- → Attendance shows 22 days 

- → Wage slip shows payment for 18 days 

- → No documented deductions 

- → ACTION: Flag contractor, alert KAAM admin 

## Pattern 2: Wage Rate Manipulation 

- → Worker registered at ₹700/day 

- → Wage slip calculates at ₹600/day 

- → No record of rate change 

- → ACTION: Block slip approval, notify contractor 

## Pattern 3: Ghost Workers 

- → Worker registered, attendance marked present daily 

- → Worker's WhatsApp unresponsive (never replied to welcome message) 

- → Wage slip delivered but PDF never opened 

- → ACTION: Flag for KAAM admin review, possible phantom worker 

Pattern 4: GPS Impossibility 

- → Contractor marked attendance at 9am 

- → Contractor GPS places them 40km from site 

- → ACTION: Flag attendance record as SUSPICIOUS 

Pattern 5: Minimum Wage Violation 

- → Calculated wage < Karnataka state minimum for category 

- → ACTION: Block slip approval, show contractor exact shortfall 

## 9.2 Alert Routing 

Severity LOW → KAAM admin dashboard notification 

Severity MEDIUM → Contractor in-app warning, 48hr to correct 

Severity HIGH → Auto-reported to Labour Inspector dashboard 

Severity CRITICAL (ghost workers, systematic fraud) → 

- Auto-report + contractor account suspended pending review 

## Workflow 10 — Data Flow & Security 

## 10.1 Data Architecture 

PostgreSQL Tables: 

- ├── contractors (id, aadhaar_hash, name, license, location, tier) 

├── sites (id, contractor_id, name, gps_point, geofence_radius, active) 

- ├── workers (id, aadhaar_hash, name, whatsapp, digilocker_id, kaam_score) 

├── worker_sites (worker_id, site_id, wage_rate, category, start, end) 

├── attendance (id, worker_id, site_id, date, status, contractor_gps, hash) 

- ├── wage_slips (id, worker_id, cycle_start, cycle_end, gross, net, status) 

├── loans (id, worker_id, amount, status, rangde_ref, repayment_date) 

├── insurance (id, worker_id, policy_ref, premium, coverage, active) 

├── disputes (id, worker_id, slip_id, dates, status, brief_pdf) 

├── anomaly_alerts (id, contractor_id, type, severity, timestamp, resolved) 

└── kaam_scores (id, worker_id, score, tier, calculated_at, breakdown_json) 

## 10.2 Security 

Attendance record integrity: 

hash = SHA-256(worker_id + site_id + date + status + contractor_gps 

+ timestamp + contractor_id) 

Stored in attendance table 

Any field change = hash mismatch = tamper detected 

Aadhaar data: 

Never stored raw 

Only hash stored (SHA-256 of Aadhaar number) 

eKYC response cached for 24hrs only, then discarded 

Compliant with Aadhaar Act 2016 + DPDP Act 2023 

WhatsApp communication: 

End-to-end encrypted (WhatsApp Business API) 

No message content stored on KAAM servers 

Only delivery status stored 

Worker consent: 

Explicit opt-in via WhatsApp "JOIN" reply 

KAAM Score shared with lenders only on worker's explicit "LOAN" request 

- Data deletion request: worker replies "DELETE" — 

all personal data purged within 72 hours 

## Workflow 11 — Monetization Mechanics 

## 11.1 Contractor Subscription 

- Free tier (first 30 days): 

- → Up to 5 workers 

- → Basic wage slips 

- → No financial products 

- ₹499/month (Standard): 

- → Unlimited workers 

- → All wage slips 

- → Compliance reports 

- → Anomaly alerts 

- → Labour Inspector dashboard access 

₹999/month (Pro): 

- → All Standard features 

- → Multi-site management 

- → Advance analytics 

- → Priority support 

→ Auto Shram Suvidha filing 

11.2 Financial Product Revenue 

Micro-loan facilitation: 

Rang De pays KAAM 0.5% of each loan disbursed 

₹2,000 loan → ₹10 facilitation fee 

At scale: 10,000 loans/month × ₹10 = ₹1 lakh/month 

Insurance commission: 

Bima Sugam pays KAAM ₹8/policy/month 

At scale: 50,000 policies × ₹8 = ₹4 lakh/month 

Labour Dept SaaS: 

₹5,000/month per district (30 districts in Karnataka = ₹1.5 lakh/month) 

## Tech Stack — Implementation Detail 

BACKEND (FastAPI) 

├── /api/contractor — registration, site management 

├── /api/workers — registration, Aadhaar eKYC 

├── /api/attendance — mark, verify, hash, sync 

├── /api/wageslips — calculate, generate PDF, approve, deliver 

├── /api/score — calculate KAAM score, update 

├── /api/loans — request, Rang De webhook, repayment 

├── /api/insurance — enrollment, Bima Sugam webhook, payout 

- ├── /api/disputes — initiate, Claude API, generate PDF 

- ├── /api/anomalies — detection, alert routing 

└── /api/inspector — compliance dashboard data 

## CRON JOBS 

- ├── Daily: income gap detection for insured workers 

- ├── Nightly: anomaly detection across all contractor records 

├── Per wage cycle: auto wage slip generation 

└── Monthly: KAAM score recalculation 

## EXTERNAL API INTEGRATIONS 

├── UIDAI (Aadhaar eKYC) — worker + contractor identity 

- ├── WhatsApp Business API — all worker communication 

- ├── DigiLocker API — document storage 

- ├── Bhashini API — vernacular ASR + translation 

- ├── Claude API — dispute brief generation + anomaly reasoning 

- ├── Rang De API — loan disbursement webhook 

├── Bima Sugam API — insurance enrollment + payout 

- └── Shram Suvidha 2.0 — Labour Dept portal filing 

## FLUTTER APP SCREENS 

├── Splash + language selection 

├── OTP login 

├── Aadhaar eKYC 

- ├── Home dashboard (attendance button prominent) 

├── Site list + add site 

- ├── Worker list per site + add worker 

├── Attendance marking (photo grid of workers) 

├── Wage slip review + approval 

├── Anomaly alerts 

├── Compliance status 

└── Settings + subscription 

## Edge Cases Handled 

|Edge Cases Handled||
|---|---|
|**Scenario**|**KAAM Response**|
|Worker changes contractor mid-month|Previous slips retained, new site started,<br>KAAM score carries over|
|Contractor closes business|All worker records retained, workers notified,<br>income gap detection activated|
|Worker loses phone|OTP login with Aadhaar on any device, all<br>data in cloud|
|Contractor disputes worker's dispute|Three-way mediation workflow, Labour Dept<br>auto-notified after 7 days|
|Loan not repaid (contractor wage theft)|Grace period → dispute brief generated →<br>contractor flagged → Rang De notified|
|WhatsApp number changed|Worker updates via KAAM portal with OTP +<br>Aadhaar verify|
|Site GPS incorrect|Contractor can request correction with photo<br>evidence, KAAM admin approves|
|Multiple contractors same worker|Worker gets consolidated KAAM score across<br>all employers|



|**Scenario**|**KAAM Response**|
|---|---|
|Minimum wage changes (state revision)|KAAM auto-updates rate floor, flags existing<br>contracts below new minimum|
|Internet outage > 24 hours|Offline mode holds up to 7 days of<br>attendance, syncs on reconnect|



## Success Metrics (6-Month Pilot) 

|Success Metrics (6-Month Pilot)||
|---|---|
|**Metric**|**Target**|
|Contractors onboarded|50+|
|Workers registered|500+|
|Wage slips issued|3,000+|
|Disputes filed|Track all|
|Disputes resolved without court|> 80%|
|Micro-loans facilitated|100+|
|Loan repayment rate|> 90%|
|Insurance policies active|200+|
|Minimum wage violations caught|Track all|
|Karnataka Labour Dept letter|1|



_KAAM Finance — Complete Workflow Document  Version  1.0 | Built for National Hackathon | Theme 2: Fintech & Financial Inclusion_ 

