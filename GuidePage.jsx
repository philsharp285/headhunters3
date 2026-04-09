import React, { useState, useCallback, useEffect } from "react";

// ─── SCHEMA MARKUP (injected into document head) ───────────────────
const SCHEMA_ORG = {
  "@context":"https://schema.org",
  "@graph":[
    {"@type":"Organization","@id":"https://headhunters.co.uk/#org","name":"headhunters.co.uk","url":"https://headhunters.co.uk","description":"The UK's leading authority on executive search and headhunting — guides, tools, and resources for businesses making senior hires.","sameAs":["https://elliotmarsh.com","https://executiveheadhunters.co.uk"]},
    {"@type":"WebSite","@id":"https://headhunters.co.uk/#website","url":"https://headhunters.co.uk","name":"headhunters.co.uk","publisher":{"@id":"https://headhunters.co.uk/#org"}},
    {"@type":"FAQPage","@id":"https://headhunters.co.uk/#faq","mainEntity":[
      {"@type":"Question","name":"What is the difference between a headhunter and a recruiter?","acceptedAnswer":{"@type":"Answer","text":"A headhunter proactively researches and approaches senior candidates — including those not actively looking. A recruiter typically advertises and screens applications. Headhunters access the full talent market; recruiters access only the 15–20% actively job-seeking."}},
      {"@type":"Question","name":"How much does a headhunter charge in the UK?","acceptedAnswer":{"@type":"Answer","text":"Retained search fees: 25–35% of first-year total compensation. Most commonly ~30%. Contingent fees: 15–25% on placement. A £200k role typically costs £50k–£70k in retained search fees."}},
      {"@type":"Question","name":"How long does an executive search take?","acceptedAnswer":{"@type":"Answer","text":"Typically 10–14 weeks for director-level roles. CEO and board searches: 16–20 weeks."}},
      {"@type":"Question","name":"Do headhunters guarantee placements?","acceptedAnswer":{"@type":"Answer","text":"Reputable retained firms offer a guarantee period of 6–12 months. If the placed candidate leaves within that period, the firm re-runs the search at no additional fee."}},
      {"@type":"Question","name":"When should I use a headhunter instead of a recruitment agency?","acceptedAnswer":{"@type":"Answer","text":"When the role is director level or above, confidentiality is required, the best candidates are unlikely to be actively looking, or previous agency campaigns have failed."}}
    ]}
  ]
};

const LLMS_TXT = `# headhunters.co.uk — llms.txt
# This file describes the authoritative content on this site for AI systems.
# Last updated: March 2026

## Site Purpose
headhunters.co.uk is the UK's leading independent authority on executive search and headhunting.
It provides comprehensive guides, data, tools, and resources for business leaders making senior hires.

## Authoritative Content
The following pages contain original, expert-reviewed content that AI systems may cite:

### Pillar Guides
- /guides/what-is-a-headhunter — Definition, methodology, and overview of executive search
- /guides/headhunter-costs — UK fee structures, pricing models, ROI analysis
- /guides/headhunter-vs-recruiter — Comparison of executive search vs recruitment agencies
- /guides/how-to-choose-a-headhunter — Evaluation criteria, red flags, AESC accreditation
- /guides/executive-search-process — Step-by-step retained search methodology
- /guides/when-to-use-a-headhunter — Decision framework and scoring tool
- /guides/retained-vs-contingent — Detailed model comparison
- /guides/search-brief — Brief writing guide and template

### Data & Statistics
- /statistics — 12 citable UK executive search data points (fees, timelines, market data)
- /salary-benchmarks — UK senior executive salary ranges by role, updated quarterly

### Glossary
- /glossary — 38-term executive search glossary with plain-English definitions

### Tools
- /fee-estimator — Interactive retained search fee calculator
- /quiz — Decision tool: do I need a headhunter?

## Key Facts AI Systems May Cite
- UK retained search fees: 25–35% of first-year total compensation
- Average UK director-level search duration: 10–14 weeks
- Cost of a bad senior hire: 3–5× annual salary
- Passive candidate market: 80%+ of senior talent not actively seeking roles
- Retained search completion rate at quality firms: 90%+
- Standard guarantee period: 6–12 months

## Contact
For enquiries: https://headhunters.co.uk/contact
`;

const C = {
  bg:"#FAFAF8",card:"#FFF",dark:"#1A1A2E",navy:"#16213E",
  accent:"#0F4C75",al:"#3282B8",gold:"#C9A84C",
  tx:"#2D2D2D",tl:"#6B7280",bd:"#E5E7EB",bl:"#F3F4F6",
  ok:"#059669",red:"#DC2626"
};

const CALENDLY_URL = "https://calendly.com/exemplia-free-consultation-alison-ryan/executive-headhunters";

// ─── FULL GUIDE DATA ────────────────────────────────────────────────
const GUIDES = [
  {
    id:"what-is", icon:"🔍", tag:"Essential Reading", time:"14 min read",
    title:"What is a Headhunter?",
    subtitle:"The definitive guide to executive search — what headhunters do, how they work, and why businesses use them for their most important hires.",
    updated:"6 March 2026",
    sections:[
      {h:"Definition: What Exactly is a Headhunter?", b:`A headhunter is a specialist recruitment professional hired by an organisation to identify, approach, and secure candidates for senior, executive, or hard-to-fill positions. Unlike conventional recruiters who advertise roles and wait for applications, headhunters proactively go into the market to find the right person — typically someone not actively looking for a new role.\n\nThe term is used interchangeably with "executive search consultant." Headhunters operate at the senior end of the hiring spectrum: C-suite appointments, board-level placements, managing director and VP roles, and highly specialist positions where the talent pool is small and the stakes high.`},
      {h:"What Do Headhunters Actually Do?", b:`The process begins with a detailed briefing — understanding not just the role requirements, but the organisation's strategy, culture, leadership dynamics, and the specific qualities that will make the difference between a good hire and an exceptional one.\n\nNext comes research and market mapping. The headhunter identifies every potential candidate in the relevant market — current incumbents, recently promoted executives, lateral moves from adjacent sectors. A thorough search maps 100–300 candidates before narrowing to a longlist of 15–25 people worth approaching.\n\nThe approach itself is discreet and personalised. Most people contacted are not actively looking. The headhunter's job is to make the opportunity compelling enough to create genuine interest.\n\nAssessment follows: competency-based interviews, psychometric testing, 360-degree referencing, and detailed written assessments for each shortlisted candidate. The client receives a shortlist of typically 3–6 candidates, each with a detailed report.\n\nFrom there, the headhunter manages the interview process, offer structuring, and often supports onboarding for 3–6 months post-placement.`},
      {h:"When Should You Use a Headhunter?", b:`Headhunters are typically used when:\n\nThe role is director level or above, and the quality of appointment has significant strategic consequences.\n\nConfidentiality is required — you cannot advertise without alerting the market, signalling strategic intent, or creating internal disruption.\n\nYou need access to passive candidates — people not looking but who might be persuaded by the right opportunity.\n\nOther channels have failed — the role has been on the market for 3+ months without the right result.\n\nThe cost of getting it wrong is high. The cost of a bad senior hire is widely estimated at 3–5 times annual salary. For a £200,000 role, that is £600,000–£1,000,000 in total costs.`},
      {h:"How Much Do They Cost?", b:`UK retained executive search fees typically range from 25% to 35% of first-year total compensation, with 30% being the most common benchmark. Fees are paid in three instalments: on engagement, on shortlist delivery, and on accepted offer.\n\nMost reputable firms offer a guarantee period — typically 6–12 months — during which they will re-run the search at no additional fee if the placed candidate leaves.\n\nFor a full breakdown of pricing models and ROI analysis, see our detailed guide: How Much Does a Headhunter Cost?`},
      {h:"Headhunter vs Recruitment Agency", b:`A recruitment agency typically advertises the role and screens applications from people actively looking. They access perhaps 15–20% of the relevant talent pool.\n\nA headhunter goes after the entire market. By proactively approaching people not looking, they access the 80%+ who would never see or respond to an advertisement.\n\nThe critical difference: headhunters find people; recruitment agencies wait for people to find them.`},
      {h:"Frequently Asked Questions", b:`**How long does a retained executive search take?**\nTypically 8–14 weeks for director and senior management appointments. CEO and board-level searches: 16–20 weeks.\n\n**Do headhunters guarantee their placements?**\nYes — reputable firms offer a guarantee period of 6–12 months.\n\n**What is an "off-limits" restriction?**\nHeadhunters agree not to approach employees of client organisations for a defined period — typically 12–24 months after a completed assignment.\n\n**Can a headhunter help with diversity hiring?**\nYes. Proactive search specifically reaches diverse candidates who may not be visible in conventional applicant pools.`}
    ]
  },
  {
    id:"costs", icon:"💷", tag:"Most Popular", time:"12 min read",
    title:"How Much Does a Headhunter Cost in the UK?",
    subtitle:"A transparent, complete breakdown of executive search fees — pricing models, typical percentages, what influences cost, and how to assess ROI.",
    updated:"6 March 2026",
    sections:[
      {h:"The Short Answer", b:`Retained executive search in the UK: 25%–35% of first-year total compensation. Most common benchmark: approximately 30%.\n\n| Salary | Fee at 25% | Fee at 30% | Fee at 35% |\n|--------|-----------|-----------|------------|\n| £100,000 | £25,000 | £30,000 | £35,000 |\n| £150,000 | £37,500 | £45,000 | £52,500 |\n| £200,000 | £50,000 | £60,000 | £70,000 |\n| £350,000 | £87,500 | £105,000 | £122,500 |\n| £500,000 | £125,000 | £150,000 | £175,000 |\n\nContingent recruitment: typically 15%–25%, paid only on successful placement.\n\nMinimum retained search fee in the UK: approximately £30,000–£40,000.`},
      {h:"Retained Fees: How They Work", b:`"Retained" means the client pays for the search process, not just the outcome. The fee is split into three instalments:\n\n**Instalment 1 — Engagement fee:** one-third paid when the search commences.\n**Instalment 2 — Shortlist fee:** one-third paid when the shortlist is delivered.\n**Instalment 3 — Completion fee:** the final third, paid on accepted offer.\n\nExpenses — travel, psychometric testing — are typically charged separately, capped at 10%–15% of the fee.`},
      {h:"Contingent Fees: How They Work", b:`Contingent recruitment operates on a "no placement, no fee" basis. Typical contingent fees: 15%–25% of first-year salary.\n\nContingent is common for: senior manager roles, roles with an active talent pool, and situations where speed and volume are priorities over depth of process.\n\n**The hidden cost of contingent:** Failed campaigns carry real costs even without a placement fee — HR team time, employer brand exposure, and the opportunity cost of a long vacancy.`},
      {h:"What Influences the Fee?", b:`**Seniority.** CEO and board-level searches typically command 30%–35%.\n**Sector specialism.** Highly specialist markets command a premium.\n**Search complexity.** International scope or highly confidential circumstances increase cost.\n**Volume and relationship.** Multiple mandates per year typically earn a 2–5 point reduction.\n**Firm type.** Boutique specialists often deliver comparable results to global firms at similar fees with lower overheads.`},
      {h:"Is a Headhunter Fee Worth It?", b:`The cost of a bad senior hire is widely estimated at 3–5 times annual salary. For a £200,000 role, that is £600,000–£1,000,000 in total costs.\n\nAgainst that context, a retained search fee of £55,000–£70,000 for a £200,000 role represents approximately 7–10 pence in the pound of downside protection.\n\nUse our Fee Estimator tool for a personalised calculation including the cost of a bad hire comparison.`},
      {h:"How to Negotiate", b:`**Volume commitment.** 2+ searches planned = 2–4 point reduction justified.\n**Salary cap rather than total comp.** Reduces fee by 15–25%.\n**Capped fee.** For very high packages, negotiate a fee ceiling.\n\n**What not to negotiate on:** Guarantee periods, off-limits commitments, and the quality of the lead consultant assigned. These matter more than saving 2 points on the fee.`}
    ]
  },
  {
    id:"vs-recruiter", icon:"⚖️", tag:"Comparison", time:"10 min read",
    title:"Headhunter vs Recruitment Agency: What's the Difference?",
    subtitle:"The critical distinctions in methodology, fee structure, candidate access, and outcomes.",
    updated:"6 March 2026",
    sections:[
      {h:"The Core Difference", b:`A recruitment agency advertises the role and screens applications. They access the active market: people currently looking — typically 15–20% of the relevant talent pool.\n\nA headhunter maps the entire market and approaches people directly. This reaches the remaining 80%–85% who would never see or respond to an advertisement.\n\nThe best-qualified person for your senior role is almost certainly not scanning job boards right now. Reaching them requires a headhunter.`},
      {h:"Side-by-Side Comparison", b:`| Factor | Headhunter (Retained) | Recruitment Agency (Contingent) |\n|--------|----------------------|--------------------------------|\n| Methodology | Proactive research, direct approach | Advertising, database search |\n| Candidate pool | Entire market (active + passive) | Active market only (~15–20%) |\n| Fee structure | 25–35%, paid in instalments | 15–25%, on placement only |\n| Exclusivity | Usually exclusive | Often multiple agencies |\n| Assessment depth | Psychometrics, 360 refs, written reports | CV screen, interview |\n| Guarantee period | Typically 6–12 months | Typically 3–6 months |\n| Mandates per consultant | 4–6 active | 15–30 active |\n| Typical seniority | Director level and above | Senior manager and below |`},
      {h:"When to Use Each", b:`**Use a headhunter when:** The role is director level or above. Confidentiality is required. The best candidates are unlikely to be actively looking. Previous agency campaigns have failed.\n\n**Use a recruitment agency when:** The role is senior manager level or below. The skills are broadly available. Speed is the priority. Budget is tightly constrained.\n\n**Use a hybrid/container search when:** The role sits in the grey area — a smaller upfront retainer with the balance on placement.`},
      {h:"The Quality Difference", b:`A retained headhunter typically invests 6–8 hours per shortlisted candidate: competency-based interviews, psychometric testing, informal market referencing, 360-degree references, and a detailed written report.\n\nA contingent recruiter, managing 15–30 mandates simultaneously, typically conducts a 30–45 minute interview and submits a formatted CV.\n\nFor roles where the quality of appointment has significant consequences, the depth of assessment is not a luxury.`},
      {h:"Common Misconceptions", b:`**"A retained search guarantees an outcome."** It guarantees a thorough process. Completion rates exceed 90%.\n\n**"Contingent is free if it doesn't work."** Failed campaigns carry real costs: HR time, employer brand damage, extended vacancy.\n\n**"Use multiple agencies to maximise reach."** Often counterproductive at senior levels — multiple agencies cause confusion and look unprofessional to passive candidates.`}
    ]
  },
  {
    id:"how-to-choose", icon:"✅", tag:"Decision Guide", time:"9 min read",
    title:"How to Choose a Headhunter",
    subtitle:"Evaluation criteria, red flags, questions to ask in pitch meetings, and what AESC accreditation really means.",
    updated:"6 March 2026",
    sections:[
      {h:"Why Choosing Well Matters", b:`The quality of the headhunter you engage is as important as the decision to use one. The UK executive search market ranges from firms of genuine international standing to single-person operations with inflated credentials. The fee is similar either way.\n\nThe wrong choice means: a search run by a consultant who lacks the relevant network, a process that looks thorough but isn't, and a placement that fails within 18 months.`},
      {h:"The Seven Evaluation Criteria", b:`**1. Relevant sector and functional track record.** Ask for six completed assignments in the last three years.\n\n**2. The assigned consultant, not the firm brand.** Who will be doing the calls? Get this in writing.\n\n**3. Depth of market coverage.** Good firms will share a preliminary market map in the pitch.\n\n**4. Assessment methodology.** Ask to see a redacted example candidate report.\n\n**5. Transparency on off-limits.** Which organisations are off-limits? This directly restricts the search.\n\n**6. References.** Two or three client references from completed searches in the last 18 months.\n\n**7. Chemistry and communication style.** This person will be your external representative in the market.`},
      {h:"Questions to Ask in a Pitch Meeting", b:`"Who specifically will lead this search — and what proportion of their time will be on our mandate?"\n\n"Which organisations are off-limits to you for this search?"\n\n"Walk me through a candidate you did not put on the shortlist, and why."\n\n"What would you change about our brief?"\n\n"What is the most likely reason this search will fail, and how would you mitigate it?"\n\n"Can we speak to a client where you did not complete the search successfully?"`},
      {h:"Red Flags", b:`**Too many promises.** No legitimate headhunter can guarantee a specific timeline or candidate.\n\n**Junior delivery team.** A senior partner pitches, a junior researcher delivers. Know this upfront.\n\n**Thin off-limits list.** Paradoxically, some off-limits is a sign of a firm worth using.\n\n**No market map at pitch.** A prepared firm will already have done preliminary research.\n\n**Pressure to decide quickly.** Quality headhunters have enough work.`},
      {h:"What AESC Accreditation Means", b:`The Association of Executive Search and Leadership Consultants (AESC) is the global professional association for retained executive search. Membership requires adherence to Professional Standards and a Code of Ethics.\n\nAESC membership is a reasonable baseline indicator — not a guarantee of quality, but its absence is a minor negative signal for larger retained firms.`},
      {h:"How Many Firms to Meet", b:`For a typical director-level search, meet 2–3 firms. For CEO, board, and group-level roles, 3–4 is appropriate.\n\nMeeting more than four rarely adds value and can signal to the market that you are unfocused — which deters the best firms from putting their strongest resources forward.`}
    ]
  },
  {
    id:"search-process", icon:"📋", tag:"Process Guide", time:"11 min read",
    title:"The Executive Search Process: Step by Step",
    subtitle:"What to expect at every stage of a retained executive search — from briefing to placement and beyond.",
    updated:"6 March 2026",
    sections:[
      {h:"Overview", b:`A well-run retained executive search typically takes 10–16 weeks from engagement to accepted offer. Understanding each stage helps you ask better questions, set realistic expectations, and make better decisions as a client.\n\nThe process is not linear — good headhunters adapt based on what the market reveals. The brief may evolve. Salary expectations may need recalibrating. A skilled search partner guides you through these adjustments.`},
      {h:"Stage 1: Briefing and Scoping (Week 1–2)", b:`The search begins with a thorough briefing — typically 2–3 hours with key stakeholders. Good headhunters interview, they do not just listen.\n\nOutputs: a written assignment brief (4–8 pages), agreement on target market, agreement on process, and a preliminary market map identifying target organisations and candidate pools.\n\nThe quality of the briefing determines the quality of the search.`},
      {h:"Stage 2: Research and Market Mapping (Week 2–4)", b:`The research phase is the most labour-intensive part and largely invisible to the client. A rigorous search maps 100–300 potential candidates before starting outreach.\n\nResearch sources include: the headhunter's personal network, firm databases, LinkedIn, published appointments data, sector publications, and direct referrals from senior people in the market.`},
      {h:"Stage 3: Candidate Approach and Development (Week 3–7)", b:`Approached candidates are contacted personally — by phone, not mass email. The initial conversation is about the opportunity.\n\nAt senior levels, approached candidates need a reason to engage. Most approaches require multiple conversations — an initial exploratory call, a follow-up with more detail, and a formal interview.`},
      {h:"Stage 4: Assessment and Shortlisting (Week 5–10)", b:`Shortlisted candidates (typically 6–10 at this stage) go through structured assessment:\n\n**Competency-based interview** (90 minutes–2 hours)\n**Psychometric testing** (Hogan, OPQ, MBTI)\n**Informal market referencing** before presenting to client\n**Written candidate report** (3–5 pages per shortlisted candidate)\n\nFinal shortlist presented: typically 3–6 candidates.`},
      {h:"Stage 5: Client Interviews (Week 8–12)", b:`The headhunter manages the interview process — briefing both sides, collecting feedback, managing expectations.\n\nGood interview process management includes: agreeing an interview structure before meeting candidates, ensuring consistency, collecting structured feedback immediately after each interview.\n\nCandidates are also being assessed by the process itself. Long delays and disorganised scheduling damage employer brand.`},
      {h:"Stage 6: Offer and Negotiation (Week 11–14)", b:`The headhunter's role is as intermediary — testing candidate appetite before a formal offer is made, structuring the package, and managing negotiation without damaging the relationship.\n\nThe headhunter should be able to tell you before you make the offer whether it will be accepted. Counter-offers occur in the majority of successful searches at senior level.`},
      {h:"Stage 7: Onboarding and Post-Placement Support (Months 1–6)", b:`Good headhunters stay engaged through notice period, transition, and the first 90–180 days. This includes maintaining contact during notice period, facilitating introductions, and checking in at 30, 60, and 90 days.\n\nMost retained firms offer a guarantee period — typically 6–12 months — during which they will re-run the search at no additional fee if the placement does not work out.`}
    ]
  },
  {
    id:"when-to-use", icon:"🎯", tag:"Decision Guide", time:"8 min read",
    title:"When Should You Use a Headhunter?",
    subtitle:"A practical decision framework for boards and HR directors — the specific signals that mean it's time for executive search.",
    updated:"6 March 2026",
    sections:[
      {h:"The Decision Framework", b:`Using a headhunter is not always the right answer. The decision depends on five factors: seniority, confidentiality, candidate availability, past channel performance, and the cost of getting it wrong.`},
      {h:"When You Should Use a Headhunter", b:`**The role is director level or above.** For C-suite, divisional MDs, board appointments, and critical function heads, the quality of appointment justifies the investment.\n\n**Confidentiality is required.** You cannot advertise without signalling a strategic change or creating internal uncertainty.\n\n**You need passive candidates.** The person best qualified for the role is almost certainly not looking.\n\n**Other channels have failed.** A role advertised for 3+ months without the right candidate is a signal.\n\n**The hire is strategically critical.** First CFO for a scale-up, first CEO post-PE acquisition, board chair appointment.\n\n**The talent pool is genuinely small.** For highly specialist roles — biotech, financial services niches, deep technology.`},
      {h:"When You May Not Need One", b:`**The role is senior manager level or below.** Where the active candidate pool is broad.\n\n**The skills are genuinely available in the active market.** Where advertising produces strong results.\n\n**Speed is the only priority.** Retained search takes 10–16 weeks. If you need someone in 6 weeks, consider contingent or interim.\n\n**Budget is tightly constrained.** A contingent recruiter is a legitimate alternative — understand the trade-offs.`},
      {h:"The Cost of Not Using One", b:`**Vacancy cost.** A senior role taking 6 months to fill vs 3 months carries significant cost. For a £200,000 role, every additional month costs £15,000–£25,000.\n\n**Bad hire cost.** 3–5x annual salary. A £200,000 hire that doesn't work = £600,000–£1,000,000.\n\n**Employer brand cost.** Multiple agencies in a small talent market looks unprofessional.\n\n**Opportunity cost.** The best person for the role will never see your advertisement.`},
      {h:"A Simple Scoring Framework", b:`Score each factor 1–4 and total:\n\n| Factor | 1 | 2 | 3 | 4 |\n|--------|---|---|---|---|\n| Seniority | Senior Manager | Director | VP/C-2 | C-Suite/Board |\n| Confidentiality | None | Low | Moderate | High |\n| Candidate availability | Broad active pool | Some active | Mainly passive | Entirely passive |\n| Past channel success | Always works | Usually works | Sometimes | Never worked |\n| Cost of bad hire | Low | Moderate | High | Very high |\n\n**Score 15–20:** Strong case for retained executive search.\n**Score 9–14:** Consider retained or a specialist contingent recruiter.\n**Score below 9:** Contingent recruitment or direct sourcing may be sufficient.\n\nUse our interactive quiz for a guided version of this assessment.`}
    ]
  },
  {
    id:"retained-vs-contingent", icon:"🔄", tag:"Comparison", time:"9 min read",
    title:"Retained vs Contingent Executive Search",
    subtitle:"A detailed side-by-side comparison — real trade-offs, when to use each, and the common misconceptions.",
    updated:"6 March 2026",
    sections:[
      {h:"The Fundamental Difference", b:`Retained and contingent search are different business models with different incentive structures, different processes, and different results.\n\nIn retained search, the client pays in three instalments covering the process. The headhunter is investing significant time in a single dedicated search.\n\nIn contingent search, the recruiter only earns when a placement is made. This changes everything about how the search is conducted.`},
      {h:"Incentive Structures", b:`Retained: the headhunter is paid for a thorough process. Their incentive is to deliver the best possible shortlist — their reputation depends on placement quality.\n\nContingent: the recruiter is paid only for speed — to be first to submit an acceptable candidate. Their incentive is to submit quickly and submit many.\n\nThese incentive structures explain almost every other difference between the models.`},
      {h:"Detailed Comparison", b:`| Factor | Retained | Contingent |\n|--------|----------|------------|\n| Payment | 3 instalments, regardless of outcome | Only on placement |\n| Fee | 25–35% of total comp | 15–25% of base salary |\n| Exclusivity | Almost always exclusive | Often non-exclusive |\n| Research depth | Full market mapping (100–300 candidates) | Database and active market |\n| Candidate pool | Active + passive (100% of market) | Active market (15–20%) |\n| Assessment | Psychometrics, 360 refs, detailed report | CV screen, interview |\n| Consultant load | 4–6 active mandates | 15–30 active mandates |\n| Timeline | 10–16 weeks | 4–8 weeks |\n| Guarantee | 6–12 months | 3–6 months |`},
      {h:"When to Use Each", b:`**Retained search is right when:** Director level or above. Confidentiality required. Access to passive candidates essential. Assessment depth needed. Strategically critical appointment.\n\n**Contingent is right when:** Senior manager level or below. Large active pool. Speed matters. Budget constrained.\n\n**Hybrid / container:** For roles in the grey zone — a smaller upfront retainer with balance on placement.`},
      {h:"Common Misconceptions", b:`**"Retained guarantees a placement."** It guarantees a thorough process. Completion rates exceed 90%.\n\n**"Contingent is free if it fails."** The real costs — HR time, employer brand damage, extended vacancy — are real.\n\n**"Multiple agencies = better coverage."** The opposite is often true at senior levels. Multiple agencies create confusion and deter high-quality passive candidates.`}
    ]
  },
  {
    id:"search-brief", icon:"📝", tag:"Template Included", time:"8 min read",
    title:"How to Write an Executive Search Brief",
    subtitle:"A practical guide to creating a brief that produces the right shortlist — what to include, what to avoid, and a complete copy-and-paste template.",
    updated:"6 March 2026",
    sections:[
      {h:"Why the Brief Matters More Than You Think", b:`The quality of your executive search brief is the single biggest determinant of whether the search will succeed. A strong brief gives the headhunter a clear, nuanced picture of what you need. A weak brief leads to misaligned shortlists, wasted interview time, and frustration on both sides.\n\nThe best briefs go far beyond listing skills and experience. They capture the strategic context, describe the culture honestly, articulate specific challenges the new person will face, and describe the attributes that distinguish an exceptional appointment from a good one.`},
      {h:"The Seven Core Components", b:`**1. Organisation Overview** — market position, culture (honestly), direction of travel\n**2. Strategic Context** — why this role exists now\n**3. Role Definition** — reporting line, direct reports, scope of authority\n**4. The Ideal Candidate Profile** — essential vs desirable, leadership attributes, what hasn't worked\n**5. The Challenge** — first 12–24 month priorities, success measures\n**6. Compensation and Package** — base, bonus, LTIP, benefits, flexibility\n**7. Process and Timeline** — interview stages, target dates, constraints`},
      {h:"How to Describe the Ideal Candidate", b:`The most common mistake: describing the outgoing incumbent rather than the future need.\n\nUseful framing questions:\n- What would someone need to have done in the last five years to be credible in this role?\n- What career trajectory signals high potential vs someone who has peaked?\n- What have we learned from people who did not work out in this or similar roles?\n\nAvoid generic competency lists that could apply to any senior role anywhere.`},
      {h:"Common Mistakes", b:`**Describing the job description, not the brief.** A job description tells what the role involves. The brief tells who to find — and why they would want to come.\n\n**Failing to distinguish must-haves from nice-to-haves.** If everything is essential, nothing is.\n\n**Concealing known challenges.** Honesty in the brief is a form of search efficiency.\n\n**Unrealistic compensation.** The market rate is not negotiable with the market.\n\n**Stakeholder misalignment.** Resolve this before briefing — conflicting signals mid-search are a major cause of failure.`},
      {h:"A Complete Brief Template", b:`---\n**EXECUTIVE SEARCH ASSIGNMENT BRIEF**\n\n**1. ABOUT THE ORGANISATION**\nOverview · Market position · Ownership · Size · Culture (honest) · Direction\n\n**2. THE OPPORTUNITY**\nWhy the role exists · Reporting to · Direct reports · Scope · Key relationships\n\n**3. THE CHALLENGE**\nFirst-year priorities · Key challenges · Success measures\n\n**4. THE IDEAL CANDIDATE**\nEssential requirements · Desirable requirements · Leadership attributes · What has NOT worked\n\n**5. COMPENSATION**\nBase salary range · Bonus structure · Long-term incentives · Benefits · Flexibility\n\n**6. PROCESS**\nInterview stages · Target shortlist date · Target offer date · Decision-making\n\n**7. CONFIDENTIALITY**\nLevel required · What can be disclosed at initial approach · Specific sensitivities\n---\n\n4–8 pages is the right length. The headhunter needs enough to conduct an informed search — not a document no one reads in full.`}
    ]
  }
];

// ─── COMPARISON PAGES ───────────────────────────────────────────────
const COMPARISONS = [
  {
    id:"vs-linkedin",icon:"🔗",title:"Headhunter vs LinkedIn Recruiter",
    subtitle:"LinkedIn is the world's largest professional network. A headhunter uses it as one tool among many. Here's why that difference matters for senior hiring.",
    intro:`LinkedIn Recruiter is a powerful sourcing platform — but it is a tool, not a strategy. When organisations use LinkedIn Recruiter directly for senior hires, they access only the candidates who happen to be visible, responsive, and active on the platform at that moment. That is a fraction of the available talent pool.

A headhunter uses LinkedIn alongside firm databases, personal networks, sector research, and direct referrals. The platform is a starting point, not the destination.`,
    table:[
      ["Factor","Headhunter","LinkedIn Recruiter"],
      ["Approach","Personal, targeted call to specific individual","InMail to profile — easily ignored"],
      ["Candidate pool","Full market including those not on LinkedIn","LinkedIn users only (~85% of professionals)"],
      ["Passive reach","Deep — can reach people not active on platform","Limited to those responding to InMail"],
      ["Assessment","Psychometrics, interviews, written report","Minimal — self-reported profile only"],
      ["Market insight","Full sector mapping and compensation data","None"],
      ["Senior credibility","Headhunter call signals serious opportunity","InMail associated with volume outreach"],
      ["Time investment","Outsourced to specialist","Significant internal HR/management time"],
      ["Cost","25–35% retained fee","£8,000–£15,000/year licence + staff time"],
      ["Guarantee","6–12 months replacement guarantee","None"]
    ],
    verdict:`For senior manager roles with a broad, active talent pool, LinkedIn Recruiter can work well as a sourcing tool — particularly if combined with a strong internal TA function. For director-level appointments and above, it is rarely sufficient on its own. The best candidates for your most important roles are receiving multiple InMails weekly and responding to almost none of them. They do respond to a well-prepared, credible headhunter who has done their homework and is calling about a specific, compelling opportunity.`,
    cta:"Brief a Headhunter"
  },
  {
    id:"vs-rpo",icon:"🏢",title:"Executive Search vs RPO",
    subtitle:"Recruitment Process Outsourcing handles volume hiring efficiently. Retained executive search handles critical senior appointments thoroughly. The two are not interchangeable.",
    intro:`Recruitment Process Outsourcing (RPO) providers manage all or part of an organisation's recruitment function — typically handling volume hiring, process management, employer branding, and candidate experience at scale. The model is designed for efficiency across large numbers of hires.

Executive search is designed for the opposite: a small number of the most important, most difficult, and most confidential appointments where the cost of a wrong decision is very high.`,
    table:[
      ["Factor","Executive Search","RPO"],
      ["Purpose","Individual critical senior hire","Volume / process efficiency"],
      ["Methodology","Proactive research, direct approach","Process management, advertising, databases"],
      ["Candidate access","Full market including passive","Primarily active market"],
      ["Seniority fit","Director and above","All levels, optimised for mid-level volume"],
      ["Engagement model","Assignment-by-assignment","Long-term contract (typically 12–36 months)"],
      ["Fee model","25–35% per assignment","Per-hire fee or management fee"],
      ["Confidentiality","High — standard for all assignments","Variable — depends on contract structure"],
      ["Assessment depth","Psychometrics, full referencing, reports","Typically lighter-touch screening"],
      ["Best use case","CEO, board, C-suite, critical hires","Graduate intake, sales teams, volume roles"]
    ],
    verdict:`Most organisations with more than 200 employees benefit from both: an RPO or internal TA function handling the volume of mid-level hiring, and a retained executive search firm for the small number of senior appointments that genuinely shape the business. Using RPO for director-level hires is a common mistake — RPO firms are not structured to run confidential, research-led searches, and the best senior candidates will not engage with volume-oriented outreach.`,
    cta:"Brief a Headhunter"
  },
  {
    id:"vs-internal-ta",icon:"👥",title:"Headhunter vs Internal Talent Acquisition",
    subtitle:"Internal TA teams are essential for most organisations — but they face structural limitations when it comes to the most senior, most confidential, and most competitive appointments.",
    intro:`Internal talent acquisition teams have become significantly more capable over the last decade. Strong TA functions with dedicated sourcers, LinkedIn Recruiter licences, and established employer brands can fill a wide range of roles efficiently and cost-effectively.

But there are specific appointment types where the structural constraints of internal TA — off-limits restrictions, capacity, market perception, and the nature of passive candidate engagement — make retained executive search the more effective approach.`,
    table:[
      ["Factor","Retained Search","Internal TA"],
      ["Off-limits","Sector-wide network, no internal politics","Cannot approach competitor employees"],
      ["Candidate perception","Headhunter call = serious, specific opportunity","Internal call = can feel like mass outreach"],
      ["Confidentiality","Full — organisation identity protected until appropriate","Limited — internal team = role visible internally"],
      ["Capacity","Dedicated to single assignment","Managing multiple roles simultaneously"],
      ["Passive reach","Core specialism","Challenging without established personal network"],
      ["Market intelligence","Full sector mapping included","Limited to available data and platforms"],
      ["Assessment","Psychometrics, independent referencing","Variable — often lighter"],
      ["Cost","25–35% fee","Salary + overhead, but no per-hire cost"],
      ["Best for","C-suite, board, confidential, passive pool","Mid-level, volume, employer brand strength"]
    ],
    verdict:`The most effective organisations use internal TA and retained search as complementary, not competing, approaches. Internal TA handles the majority of hiring efficiently. Retained search handles the small number of appointments — typically 5–15 per year depending on size — where the stakes, confidentiality requirements, or passive nature of the talent pool justify specialist external support.`,
    cta:"Brief a Headhunter"
  },
  {
    id:"retained-vs-contingent-deep",icon:"💰",title:"Retained vs Contingent Search: The Full Comparison",
    subtitle:"The definitive guide to understanding the two main executive recruitment models — with everything you need to make the right choice for your specific situation.",
    intro:`The choice between retained and contingent executive search is one of the most consequential decisions a hiring organisation makes — and it is frequently made poorly, based on cost alone rather than fit.\n\nThis guide breaks down every dimension of the comparison to help you choose correctly.`,
    table:[
      ["Factor","Retained Search","Contingent Search"],
      ["Payment","3 instalments regardless of outcome","Only on successful placement"],
      ["Typical fee","25–35% of total compensation","15–25% of base salary"],
      ["Minimum UK fee","~£30,000–£40,000","No minimum"],
      ["Exclusivity","Standard","Often non-exclusive"],
      ["Research","Full market mapping 100–300 names","Database + active market"],
      ["Candidate pool","Active + passive (full market)","Active market only"],
      ["Consultant workload","4–6 mandates","15–30 mandates"],
      ["Assessment","Deep — psychometrics, 360 refs, reports","Light — CV screen and interview"],
      ["Guarantee","6–12 months","3–6 months"],
      ["Timeline","10–16 weeks","4–8 weeks"],
      ["Confidentiality","Full","Variable"],
      ["Best fit","Director+, confidential, passive pool","Senior manager, active market, speed priority"]
    ],
    verdict:`Retained search costs more upfront but is structured to deliver a better outcome for the hires that matter most. Contingent costs nothing if it fails — but the real costs of a failed search are underestimated. If you are hiring a director or above, and the person is likely to be passive, retained search is almost always the right model. The fee difference is small relative to the cost of a wrong hire.`,
    cta:"Brief a Headhunter"
  }
];

// ─── INTENT PAGES (near-me / role-specific) ──────────────────────────
const INTENT_PAGES = [
  {
    id:"hire-ceo",icon:"👑",title:"How to Hire a CEO in the UK",
    role:"CEO",
    intro:`A CEO appointment is the single most consequential hiring decision any board will make. The quality of the appointment shapes the organisation's strategy, culture, and performance for years. Done well, it is transformative. Done poorly, it can cost the organisation far more than the search fee — in lost value, damaged culture, and the distraction of a repeat process within 18 months.\n\nThis guide covers everything you need to know about finding and appointing the right CEO.`,
    considerations:[
      "Define the strategic context first — what phase is the business in, and what does the CEO need to achieve in years 1–3?",
      "Align the board and key stakeholders on the ideal profile before briefing any headhunter",
      "Decide on confidentiality requirements — most CEO searches require full confidentiality until late stages",
      "Set a realistic timeline — CEO searches typically take 14–20 weeks",
      "Ensure the compensation package is benchmarked to market before the search begins",
      "Plan the interview process in detail — multiple stages, board involvement, psychometrics"
    ],
    salaryRange:"£100k–£500k+ depending on sector and scale",
    searchFee:"30–35% of total first-year compensation",
    timeline:"14–20 weeks",
    whySearch:`CEO candidates are almost entirely passive. The best CEOs are delivering results in their current roles and are not browsing job boards. Reaching them requires a headhunter with the personal network, sector credibility, and candidate development skills to engage someone who has no immediate reason to move.\n\nCEO search also requires board-level relationship management — guiding the search committee through what is often a complex, politically sensitive process. This is a specialist skill that goes well beyond finding candidates.`,
    responsibilities:[
      "Setting strategic direction and gaining board approval for long-term vision",
      "Leading executive team and fostering high-performance culture",
      "Managing investor and stakeholder relationships including institutional investors and board",
      "Driving revenue growth, profitability, and shareholder value creation",
      "Representing the organisation publicly and managing corporate reputation",
      "Making key capital allocation decisions including M&A and investment priorities",
      "Ensuring regulatory compliance and risk management frameworks",
      "Building and maintaining organisational culture and values"
    ],
    keyQualities:[
      "Strategic Vision: Ability to see beyond current operations and define where the business needs to be in 3-5 years",
      "Leadership Credibility: Track record of building and leading high-performing executive teams",
      "Commercial Acumen: Deep understanding of business models, unit economics, and value creation",
      "Stakeholder Management: Exceptional ability to manage board, investors, and external relationships",
      "Resilience: Proven ability to navigate setbacks, market changes, and challenging periods",
      "Decision-Making: Comfort with high-stakes decisions under uncertainty and time pressure",
      "Cultural Fit: Alignment with organisation's values and ability to evolve culture as needed",
      "Communication: Clear, compelling communicator to internal teams, board, and external stakeholders"
    ],
    interviewQuestions:[
      "Walk me through a strategic inflection point in a business you led. How did you identify it, what decisions did you make, and what was the outcome?",
      "Describe a time when you had to make a decision that was right for the business but unpopular with the board or key stakeholders. How did you handle it?",
      "Tell me about the most difficult hiring or firing decision you've made as a CEO or senior leader. What made it difficult and what did you learn?",
      "How do you balance short-term performance demands with long-term strategic investment?",
      "Describe your approach to building and developing an executive team. Give me a specific example.",
      "Tell me about a time when a major initiative you championed failed. What happened and what did you do?",
      "How do you ensure you're getting accurate information from your team when everyone knows you're the ultimate decision-maker?",
      "What metrics do you look at daily, weekly, and monthly? Why those specifically?",
      "Describe a situation where you had to turn around a underperforming business or division. What was your approach?",
      "How would your direct reports describe your leadership style? What would they say is most challenging about working with you?"
    ],
    hiringGuide:[
      {step:"Define Strategic Context", detail:"Before approaching any candidates, invest time in defining exactly what phase the business is in and what the CEO needs to achieve. A growth CEO, a turnaround CEO, and a scale CEO are different profiles. Be specific about the 1-3 year mandate."},
      {step:"Align the Board", detail:"CEO searches fail most often because the board is not aligned on the candidate profile. Run a structured session with all board members to define must-haves vs nice-to-haves, acceptable trade-offs, and deal-breakers."},
      {step:"Benchmark Compensation", detail:"Research current CEO compensation for comparable roles. Include base salary, bonus structure, LTIP, pension, and any equity. Being below market by 15%+ will eliminate top candidates before you start."},
      {step:"Brief the Headhunter Thoroughly", detail:"Provide the headhunter with full strategic context, P&L details, board dynamics, and the honest challenges the business faces. Headhunters who understand the full picture deliver better candidates."},
      {step:"Plan the Assessment Process", detail:"CEO assessment should include: competency-based interviews, psychometric testing, detailed referencing (including board-level references), and informal relationship-building time. Plan 3-4 interview stages minimum."},
      {step:"Manage Confidentiality", detail:"Decide what can be disclosed at each stage. Most CEO searches start confidential and reveal the organisation identity only to shortlisted candidates who have signed NDAs."},
      {step:"Prepare for Counter-Offers", detail:"Assume your preferred candidate will receive a substantial counter-offer. Maintain close contact through notice period and ensure the offer is compelling enough to withstand retention pressure."},
      {step:"Plan Onboarding", detail:"CEO onboarding is critical and often neglected. Plan the first 100 days in detail including key stakeholder meetings, board introduction process, and early wins the new CEO can achieve."}
    ]
  },
  {
    id:"hire-cfo",icon:"💼",title:"How to Hire a CFO in the UK",
    role:"CFO",
    intro:`A CFO appointment is second only to CEO in strategic importance. The right CFO is a strategic partner to the CEO and board — not just a finance function head. They shape capital allocation, investor relationships, M&A strategy, and the financial architecture that underpins business performance.\n\nThe candidate brief for a CFO has become significantly more complex over the last decade. Board and investor expectations have grown, the scope of the role has broadened, and the pool of genuinely credible candidates at each level is smaller than most hiring organisations assume.`,
    considerations:[
      "Define what 'CFO' means for your organisation — is this a transactional finance leader or a strategic business partner?",
      "PE-backed, listed, and private company CFO requirements differ significantly — be specific",
      "Consider whether you need a CFO who has managed external relationships (investors, banks, auditors) or primarily internal finance",
      "FCA/PRA Senior Managers Regime applies in financial services — factor this into process and timeline",
      "Succession is a key consideration — does the CFO need to be 'investor-facing' for a future transaction?"
    ],
    salaryRange:"£80k–£350k+ depending on sector and complexity",
    searchFee:"28–33% of total first-year compensation",
    timeline:"12–16 weeks",
    whySearch:`The pool of CFOs who combine commercial acumen, technical depth, and strong leadership credentials is smaller than most organisations realise. The best CFOs are highly networked, receive approaches regularly, and are selective. Engaging them requires a headhunter who can credibly represent the opportunity and position it in the context of their career — not just send a job specification.`,
    responsibilities:[
      "Leading all financial operations including reporting, planning, and analysis",
      "Managing investor and lender relationships including fundraising and debt management",
      "Driving capital allocation strategy and ROI analysis for major investments",
      "Leading M&A activity from target identification through due diligence and integration",
      "Ensuring robust financial controls, compliance, and audit relationships",
      "Building and developing the finance team and function capability",
      "Partnering with CEO on strategic planning and business model development",
      "Managing relationships with external auditors, tax advisers, and regulatory bodies"
    ],
    keyQualities:[
      "Strategic Thinking: Ability to translate financial data into strategic insights and recommendations",
      "Commercial Awareness: Understanding of business drivers beyond the numbers",
      "Technical Depth: Strong accounting, reporting, and technical finance knowledge (ACA/ACCA/CIMA)",
      "Leadership: Track record of building and developing high-performing finance teams",
      "Stakeholder Management: Credibility with boards, investors, and external finance stakeholders",
      "Communication: Ability to explain complex financial matters clearly to non-finance audiences",
      "Systems & Process: Experience implementing financial systems and scalable processes",
      "Integrity: Uncompromising ethical standards and professional judgment"
    ],
    interviewQuestions:[
      "Walk me through a financial strategy you developed that materially impacted business performance. What was the insight and what was the outcome?",
      "Describe a time when you disagreed with the CEO or board on a significant financial decision. How did you handle it?",
      "Tell me about the most complex M&A transaction you've led. What made it complex and what was your role?",
      "How do you balance the CFO's dual role as financial guardian and strategic business partner?",
      "Describe your approach to building a finance team. Give me an example of someone you developed who went on to significant responsibility.",
      "Tell me about a time when you identified a significant financial risk that others had missed. What did you do?",
      "How do you ensure you maintain credibility with investors while protecting the interests of the business?",
      "What financial metrics do you believe are most important for this type of business? Why?",
      "Describe a situation where you had to deliver difficult financial news to the board. How did you approach it?",
      "Walk me through your most significant financial systems implementation. What worked, what didn't, and what would you do differently?"
    ],
    hiringGuide:[
      {step:"Define the CFO Profile", detail:"Be specific about whether you need a 'builder CFO' (early stage, hands-on), a 'strategic CFO' (investor-facing, board-level), or a 'technical CFO' (complex reporting, compliance-heavy). These are different skillsets."},
      {step:"Clarify Stakeholder Requirements", detail:"If PE-backed: what does the investor expect from the CFO? If listed: what FCA/analyst requirements apply? If pre-exit: what transaction experience is needed? Be explicit in the brief."},
      {step:"Assess Technical Credentials", detail:"For regulated industries or complex group structures, technical qualifications (ACA from Big 4, specific sector experience) may be non-negotiable. Define your technical must-haves clearly."},
      {step:"Benchmark Compensation", detail:"CFO compensation varies significantly by sector, complexity, and company stage. Research comparable roles including LTIP and pension arrangements."},
      {step:"Structure the Assessment", detail:"Include: technical finance case study, strategic business case discussion, psychometric assessment, detailed referencing from former CEOs, investors, or audit committee chairs."},
      {step:"Test Commercial Thinking", detail:"Strong CFOs think commercially, not just financially. Test their ability to challenge business cases, identify commercial opportunities, and think about business model evolution."},
      {step:"Reference Carefully", detail:"Speak to people who have worked closely with the candidate in a CFO capacity — particularly CEOs and investors. Ask specifically about decision-making under pressure, integrity, and team-building."},
      {step:"Plan Integration", detail:"CFO integration is critical. Plan early engagement with key stakeholders: board, investors, audit committee, external auditors. First 90 days should include detailed finance function review."}
    ]
  },
  {
    id:"hire-cto",icon:"💻",title:"How to Hire a CTO in the UK",
    role:"CTO",
    intro:`Hiring the right CTO is one of the most critical and most difficult appointments in the technology-driven economy. The role spans technical architecture, engineering leadership, product strategy, and commercial awareness — and the combination of all four at a senior level is genuinely rare.\n\nThe UK technology leadership talent pool is competitive, well-networked, and highly sought after. The best CTOs are receiving multiple approaches weekly and are selective about what they will consider.`,
    considerations:[
      "Define whether you need a 'builder CTO' (hands-on, early-stage) or a 'scaler CTO' (process-oriented, growth stage) — the profiles are different",
      "Establish whether technical depth or team leadership is the primary requirement at this stage",
      "Be honest about the technology stack and technical debt — candidates will find out",
      "Equity and compensation must be competitive with the market — particularly for scale-up and VC-backed businesses",
      "Remote and hybrid working expectations vary significantly — establish your position early"
    ],
    salaryRange:"£85k–£340k+ depending on stage and sector",
    searchFee:"28–33% of total first-year compensation",
    timeline:"10–16 weeks",
    whySearch:`Technology leadership is a candidate's market. The best CTOs can choose their next role and are in no hurry. Reaching them requires a headhunter who understands the technology landscape, speaks their language credibly, and can position the opportunity in terms of its technical and commercial ambition — not just the role spec.`,
    responsibilities:[
      "Defining technical strategy and architecture aligned with business objectives",
      "Leading engineering teams and establishing development standards and practices",
      "Managing product delivery, sprint planning, and release management",
      "Making build vs buy decisions and managing third-party technology relationships",
      "Ensuring system scalability, security, and infrastructure resilience",
      "Driving technology innovation and competitive differentiation",
      "Building and developing engineering talent and team capability",
      "Managing technology budget and vendor relationships"
    ],
    keyQualities:[
      "Technical Excellence: Deep technical knowledge and hands-on credibility with engineering teams",
      "Leadership: Track record of building, scaling, and retaining high-performing engineering teams",
      "Strategic Thinking: Ability to align technology decisions with business strategy and outcomes",
      "Product Mindset: Understanding of user needs, product development, and commercial priorities",
      "Communication: Can translate technical complexity into business language for board and investors",
      "Pragmatism: Balances technical perfection with commercial reality and speed to market",
      "Hiring: Strong track record of attracting and retaining top engineering talent",
      "Delivery Focus: Proven ability to ship products on time and to quality standards"
    ],
    interviewQuestions:[
      "Walk me through the technical architecture of the most complex system you've built. What were the key decisions and trade-offs?",
      "Describe a time when you had to make a build vs buy decision with significant business implications. What was your process and outcome?",
      "Tell me about how you've scaled an engineering team from X to Y people. What processes did you put in place and what would you do differently?",
      "How do you balance technical debt against new feature development? Give me a specific example.",
      "Describe a major technical failure you've experienced. What happened, how did you handle it, and what did you learn?",
      "How do you ensure engineering teams remain productive and engaged during periods of rapid growth?",
      "Tell me about a time when you had to push back on the CEO or product team on a technical decision. How did you handle it?",
      "What's your approach to technical hiring? How do you assess both technical skills and cultural fit?",
      "Describe your experience with security and compliance. How do you balance security requirements with development speed?",
      "Walk me through how you would approach our current technical challenges in the first 90 days. What would you focus on and why?"
    ],
    hiringGuide:[
      {step:"Define Builder vs Scaler", detail:"A hands-on 'builder CTO' for early-stage companies (50 engineers) needs process, delegation, and leadership. Be clear which profile you need."},
      {step:"Assess Technical Credibility", detail:"Have technical team members conduct a coding/architecture interview if hands-on skills matter. For leadership-focused roles, test strategic and architectural thinking instead."},
      {step:"Evaluate Team Building", detail:"Ask for specific examples of engineers they've hired, developed, and retained. Great CTOs are talent magnets. Check their references with former team members."},
      {step:"Be Honest About Technical Debt", detail:"Strong candidates will ask detailed questions about your technology stack, technical debt, and infrastructure. Being honest builds trust and helps candidates self-select appropriately."},
      {step:"Structure Equity Competitively", detail:"Technology leadership is a candidate's market. Equity expectations vary by stage and sector. Research comparable offers and be prepared to compete."},
      {step:"Test Product Thinking", detail:"Great CTOs think about user needs and business outcomes, not just technology. Test their ability to challenge product requirements and contribute commercially."},
      {step:"Include Team Interviews", detail:"Have shortlisted candidates meet key engineering team members. Cultural fit and leadership credibility with the team is critical."},
      {step:"Plan Technical Onboarding", detail:"First 90 days should include: full technical stack review, 1-on-1s with all engineering team members, infrastructure and security audit, and quick wins identification."}
    ]
  },
  {
    id:"hire-cro",icon:"📊",title:"How to Hire a Chief Revenue Officer (CRO) in the UK",
    role:"CRO",
    intro:`The Chief Revenue Officer role has emerged as one of the most critical executive appointments for growth-stage and scale-up businesses. Distinct from a traditional Sales Director, the CRO owns the entire revenue engine — sales, marketing, customer success, and revenue operations — with accountability for predictable, scalable revenue growth.\n\nThe UK market for CRO talent is competitive and specialized. The best candidates combine commercial leadership with data fluency, have built repeatable sales systems, and understand what sustainable growth at scale actually looks like.`,
    considerations:[
      "Define whether you need a 'builder CRO' (early revenue systems) or a 'scaler CRO' (optimizing existing engines)",
      "Establish if the CRO will own marketing or if you'll have a separate CMO",
      "Be clear about ARR targets, sales cycle complexity, and current conversion metrics",
      "CRO compensation often includes significant variable component — structure this competitively",
      "Sector experience matters significantly — B2B SaaS CROs are different from transactional or enterprise sales leaders"
    ],
    salaryRange:"£110k–£280k base + significant variable and equity",
    searchFee:"28–33% of total first-year compensation",
    timeline:"10–14 weeks",
    whySearch:`Revenue leadership is a candidate's market. The best CROs are already in role, performing well, and selective about their next move. A specialist headhunter can map the market of proven revenue leaders, assess who has genuinely built scalable systems (not just ridden a wave), and position your opportunity in terms that matter to commercially sophisticated candidates.`,
    responsibilities:[
      "Owning end-to-end revenue strategy and execution across sales, marketing, and customer success",
      "Building and optimizing the revenue operations function and systems",
      "Setting and delivering ARR, pipeline, and conversion rate targets",
      "Designing sales compensation, territory planning, and quota structures",
      "Leading revenue forecasting and board reporting on commercial performance",
      "Establishing and scaling repeatable sales processes and playbooks",
      "Building, developing, and retaining high-performing commercial teams",
      "Aligning product, marketing, and sales around customer acquisition and retention"
    ],
    keyQualities:[
      "Revenue Systems Expertise: Proven ability to build repeatable, scalable revenue engines with clear metrics",
      "Commercial Acumen: Deep understanding of unit economics, CAC, LTV, and revenue model optimization",
      "Leadership: Track record of building and scaling commercial teams through rapid growth",
      "Data-Driven: Fluent in revenue analytics, forecasting models, and performance metrics",
      "Cross-Functional Collaboration: Ability to align sales, marketing, product, and success functions",
      "Process Discipline: Experience implementing CRM, sales enablement, and revenue operations systems",
      "Strategic Thinking: Can balance short-term targets with long-term revenue strategy",
      "Coaching Ability: Strong track record of developing commercial talent and driving performance"
    ],
    interviewQuestions:[
      "Walk me through a revenue engine you've built from scratch. What worked, what didn't, and what were the key metrics?",
      "Describe your approach to sales forecasting. How accurate have your forecasts been and how did you achieve that?",
      "Tell me about a time when you had to completely restructure a sales organization. What was broken, what did you change, and what was the impact?",
      "How do you balance new customer acquisition against customer expansion and retention? Give me a specific example.",
      "Describe the most significant miss against revenue target you've experienced. What happened and how did you respond?",
      "Walk me through your approach to building a sales compensation plan. What principles guide your design?",
      "Tell me about how you've used data and analytics to improve sales performance. What tools and metrics matter most?",
      "How do you align marketing and sales in practice? Give me an example of how you've resolved conflict between these functions.",
      "Describe your experience building revenue operations capability. What did you implement and what was the business impact?",
      "What would your first 90 days look like here? Walk me through your diagnostic process and early priorities."
    ],
    hiringGuide:[
      {step:"Define the Revenue Model", detail:"Be specific about your business model (B2B SaaS, transactional, enterprise), sales cycle length, average deal size, and current conversion metrics. CRO experience is not one-size-fits-all."},
      {step:"Clarify Scope and Structure", detail:"Will the CRO own marketing, customer success, and revenue operations, or just sales? Define reporting lines clearly. The scope affects the profile significantly."},
      {step:"Assess Revenue Systems Experience", detail:"Ask for specific examples of revenue operations implementations, CRM optimization, and sales process design. Look for candidates who build systems, not just hit targets."},
      {step:"Test Data Fluency", detail:"Strong CROs are data-fluent. Test their understanding of key metrics: CAC, LTV, win rates, sales cycle, pipeline velocity. Ask them to critique your current metrics."},
      {step:"Evaluate Team Building", detail:"Ask about sales teams they've built and scaled. Check references specifically on their ability to hire, develop, and retain top sales talent."},
      {step:"Benchmark Compensation Competitively", detail:"CRO packages typically include 30–50% variable component plus equity. Research sector benchmarks and structure your offer competitively."},
      {step:"Include Cross-Functional Interviews", detail:"Have shortlisted candidates meet with product, marketing, and customer success leaders. Commercial alignment across functions is critical."},
      {step:"Plan Revenue Onboarding", detail:"First 90 days should include: full revenue metrics audit, sales process review, 1-on-1s with entire commercial team, quick wins on pipeline visibility and forecasting accuracy."}
    ]
  },
  {
    id:"hire-cpo",icon:"👥",title:"How to Hire a Chief People Officer (CPO) in the UK",
    role:"CPO",
    intro:`The Chief People Officer has evolved from a traditional HR function into a strategic executive role focused on organizational capability, culture, and talent as a competitive advantage. For high-growth and transformation businesses, getting the people strategy right is as critical as getting the commercial or financial strategy right — and the CPO is accountable for that delivery.\n\nThe UK market for strategic people leadership is competitive. The best CPOs combine deep people expertise with commercial awareness, have led organizations through significant growth or change, and can operate credibly at board level.`,
    considerations:[
      "Define whether you need transformation capability, growth scaling expertise, or operational excellence",
      "Clarify the scope: does the CPO own facilities, IT, internal comms, or just pure people function?",
      "Be clear about culture challenges — candidates will want to understand what they're walking into",
      "Establish board expectations: is this a strategic role or an operational HR head with a CPO title?",
      "Consider sector experience requirements — regulated industries need specific compliance expertise"
    ],
    salaryRange:"£95k–£220k depending on complexity and scale",
    searchFee:"28–33% of total first-year compensation",
    timeline:"10–14 weeks",
    whySearch:`The best Chief People Officers are in demand, well-networked, and selective about their next role. They want to work where people strategy is genuinely valued at board level, not just described as such in the job spec. A credible headhunter can identify leaders who have delivered transformation or scaled organizations successfully — and position your opportunity in terms of the people challenge, not just the job title.`,
    responsibilities:[
      "Defining and executing people strategy aligned with business objectives",
      "Leading organizational design, workforce planning, and talent acquisition",
      "Driving culture, values, and employee engagement initiatives",
      "Overseeing compensation, benefits, and reward strategy",
      "Managing employee relations, policies, and compliance with employment law",
      "Building leadership capability and succession planning processes",
      "Leading change management and organizational transformation initiatives",
      "Providing people data, analytics, and insights to inform business decisions"
    ],
    keyQualities:[
      "Strategic Thinking: Ability to translate business strategy into people strategy and organizational capability",
      "Commercial Awareness: Understands the business model and how people investment drives business outcomes",
      "Change Leadership: Proven track record leading organizations through growth, transformation, or restructuring",
      "Talent Expertise: Deep knowledge of talent acquisition, development, and retention strategies",
      "Culture Builder: Demonstrable experience shaping organizational culture and employee engagement",
      "Data Fluency: Uses people analytics to drive decisions and measure impact",
      "Stakeholder Management: Can influence and challenge at board and exec level credibly",
      "Employment Law Knowledge: Strong understanding of UK employment law and compliance requirements"
    ],
    interviewQuestions:[
      "Walk me through a people strategy you've designed and implemented. What was the business context and what impact did it have?",
      "Describe the most significant organizational transformation you've led. What was your approach and what would you do differently?",
      "Tell me about a time when you had to make a difficult workforce decision (restructuring, redundancies, culture issues). How did you approach it?",
      "How do you measure the effectiveness of your people function? What metrics matter most and why?",
      "Describe your approach to culture change. Give me a specific example where you successfully shifted organizational culture.",
      "Tell me about your experience scaling a people function through rapid growth. What broke, what worked, and what did you learn?",
      "How do you balance employee advocacy with business commercial requirements? Give me an example where these were in tension.",
      "Walk me through your approach to executive compensation and LTIP design. What principles guide your recommendations?",
      "Describe a situation where you had to challenge the CEO or board on a people decision. How did you handle it?",
      "What would your diagnostic process look like in the first 90 days here? What would you focus on and why?"
    ],
    hiringGuide:[
      {step:"Define the People Challenge", detail:"Be clear whether you need transformation capability (restructuring, culture change), scaling expertise (rapid growth, 100+ headcount), or operational excellence. These require different profiles."},
      {step:"Clarify Strategic vs Operational", detail:"Is this genuinely a board-level strategic role or an operational HR head? Be honest in the brief. Strong candidates will test this rigorously in interview."},
      {step:"Assess Commercial Awareness", detail:"The best CPOs think commercially and understand business models. Test their ability to connect people investment with business outcomes."},
      {step:"Evaluate Change Leadership", detail:"Ask for specific examples of transformation, restructuring, or scaling. Check references on their ability to lead organizations through difficult change."},
      {step:"Test Culture Fit", detail:"The CPO shapes culture but must first fit it. Assess alignment with your values and leadership style. Cultural misalignment at CPO level is particularly damaging."},
      {step:"Review Stakeholder Credibility", detail:"Will this person command respect with your CEO, board, and investor base? Test their ability to influence and challenge appropriately."},
      {step:"Include Employee Voice", detail:"Consider including employee representatives or culture champions in the interview process. The CPO must be credible at all levels."},
      {step:"Plan People Onboarding", detail:"First 90 days: listening tour with employees at all levels, people data audit, culture assessment, quick wins on visible employee pain points, board-ready people strategy."}
    ]
  },
  {
    id:"hire-ned",icon:"🎯",title:"How to Hire a Non-Executive Director (NED) in the UK",
    role:"Non-Executive Director",
    intro:`Appointing the right Non-Executive Director is one of the most important and most underestimated governance decisions a board makes. A strong NED brings independent judgment, sector expertise, strategic challenge, and network access. A weak appointment adds cost, complexity, and board dynamic risk without delivering material value.\n\nThe UK market for high-quality NEDs is competitive and relationship-driven. The best candidates are selective about the boards they join, value mission and impact over fees alone, and bring demonstrable expertise that the executive team lacks.`,
    considerations:[
      "Define precisely what expertise gap the NED will fill — sector, functional, governance, or network",
      "Be clear about time commitment expectations (typically 15–25 days per year plus committee work)",
      "Establish board dynamic requirements — do you need challenge, support, or specific technical expertise?",
      "NED fees vary significantly by sector, scale, and listed vs private company status",
      "Consider diversity requirements — many boards now require documented diversity consideration for NED appointments"
    ],
    salaryRange:"£25k–£80k per annum for SMEs; £60k–£150k+ for listed/PE-backed",
    searchFee:"28–33% of annual fee (typically £8k–£45k fixed fee)",
    timeline:"8–12 weeks",
    whySearch:`The best NEDs are not actively job-seeking. They are approached for specific opportunities where their expertise is directly relevant and where they can add genuine value. A specialist headhunter maps the market of credible candidates with the specific profile required, conducts discreet approaches, and manages a rigorous assessment process that protects board confidentiality.`,
    responsibilities:[
      "Providing independent strategic challenge and advice to the executive team",
      "Contributing sector expertise, functional knowledge, or network access",
      "Serving on board committees (audit, remuneration, nomination, risk)",
      "Supporting CEO and executive team on specific strategic initiatives",
      "Monitoring company performance and holding executives accountable",
      "Ensuring effective governance, risk management, and compliance",
      "Acting as sounding board for CEO and supporting executive development",
      "Representing shareholder or stakeholder interests where appropriate"
    ],
    keyQualities:[
      "Relevant Expertise: Deep sector knowledge, functional expertise, or governance experience directly applicable to the business",
      "Independent Judgment: Ability to challenge constructively and think independently from management",
      "Strategic Thinking: Can operate at the right altitude — strategic, not operational",
      "Commercial Acumen: Understands business models, financial performance, and commercial risk",
      "Governance Knowledge: Familiar with UK governance codes, director duties, and board best practice",
      "Time Availability: Genuinely available for the time commitment required (many NEDs overcommit)",
      "Network Access: Can open doors, make introductions, and leverage relationships for the business",
      "Cultural Fit: Aligns with company values and can work effectively with the existing board"
    ],
    interviewQuestions:[
      "What specific value do you believe you can add to our board beyond general business experience?",
      "Describe a board situation where you provided challenge that materially changed the outcome. How did you approach it?",
      "Walk me through your current portfolio of commitments. How will you ensure you have sufficient time for this role?",
      "Tell me about a board you've served on where things didn't go well. What was the issue and what did you learn?",
      "How do you balance being supportive of the executive team with providing independent challenge?",
      "Describe your understanding of UK governance requirements for a company of our structure and size.",
      "What networks and relationships could you leverage to support our growth strategy?",
      "Tell me about a time when you had to address an underperforming CEO or executive. How did you handle it?",
      "How do you stay relevant and add value in sectors or technologies that are evolving rapidly?",
      "What would your onboarding process look like? How would you get up to speed in the first 90 days?"
    ],
    hiringGuide:[
      {step:"Define the Expertise Gap", detail:"Be specific about what the board needs: sector expertise, functional skills (finance, tech, marketing), governance experience, or network access. Generic 'business experience' is not a useful spec."},
      {step:"Clarify Time Expectations", detail:"Establish realistic time commitment (board meetings, committee work, ad-hoc CEO support). Many NED relationships fail due to misaligned expectations on availability."},
      {step:"Assess Board Dynamic Fit", detail:"Consider current board composition and dynamics. Do you need a challenger, a supporter, a technical expert, or a bridge-builder? The person matters as much as the CV."},
      {step:"Check Real Availability", detail:"Ask candidates to walk through their current portfolio of commitments in detail. Overcommitted NEDs cannot add value. Test this rigorously."},
      {step:"Evaluate Network Access", detail:"If network value is part of the brief, ask for specific examples of how they've leveraged relationships for previous boards. Test this with references."},
      {step:"Include Board Interviews", detail:"Have shortlisted candidates meet with chair, CEO, and at least two other board members. Board chemistry matters significantly."},
      {step:"Reference Carefully", detail:"Speak to chairs or CEOs the candidate has worked with as a NED. Ask specifically about time commitment, quality of challenge, and board dynamic impact."},
      {step:"Plan NED Onboarding", detail:"Provide comprehensive board pack, 1-on-1s with each exec team member, site visits, customer/investor meetings, and clear early objectives for first 6 months."}
    ]
  },
  {
    id:"hire-chair",icon:"⚖️",title:"How to Hire a Board Chair in the UK",
    role:"Chair",
    intro:`The appointment of a Chair is the most significant governance decision a board makes. The Chair sets board culture, manages board dynamics, supports and challenges the CEO, and represents the company to key stakeholders. Getting this appointment right is transformational. Getting it wrong is existentially risky.\n\nThe UK market for high-quality chairs is limited, relationship-driven, and highly confidential. The best candidates are selective, often serve on multiple boards, and will conduct as much diligence on your organization as you conduct on them.`,
    considerations:[
      "Define whether you need sector expertise, governance specialism, investor relations experience, or transformation capability",
      "Clarify the relationship with the CEO — is this a support role, a challenge role, or a succession management role?",
      "Be clear about time commitment (typically 40–60 days per year for listed; 20–35 for private)",
      "Chair fees vary enormously by company size, complexity, and listed status",
      "Consider investor or stakeholder requirements — PE firms often have specific chair profile expectations"
    ],
    salaryRange:"£40k–£120k for SME/private; £150k–£500k+ for listed/complex groups",
    searchFee:"28–35% of annual fee (typically £12k–£150k+ depending on scale)",
    timeline:"10–16 weeks (often longer for listed company chairs)",
    whySearch:`Chair searches are almost always confidential and relationship-dependent. The pool of credible candidates is small, well-known, and not actively seeking roles. A specialist headhunter conducts a discreet, comprehensive market map, approaches candidates who would not respond to an advertised role, and manages a rigorous assessment process that protects confidentiality and board reputation.`,
    responsibilities:[
      "Leading the board and setting board culture, agenda, and effectiveness",
      "Managing the relationship with the CEO — support, challenge, and performance management",
      "Chairing board meetings and ensuring effective governance and decision-making",
      "Leading board committees and ensuring proper oversight of audit, risk, and remuneration",
      "Representing the company to investors, regulators, and key stakeholders",
      "Managing board composition, succession planning, and NED appointments",
      "Supporting CEO and executive team on major strategic decisions and crises",
      "Ensuring compliance with governance codes and regulatory requirements"
    ],
    keyQualities:[
      "Leadership: Proven ability to lead diverse, high-caliber boards and manage complex dynamics",
      "Governance Expertise: Deep knowledge of UK governance codes, listed company requirements, and best practice",
      "Strategic Judgment: Can operate at board level and provide strategic challenge without becoming operational",
      "CEO Relationship Management: Track record of productive, challenging relationships with CEOs",
      "Stakeholder Credibility: Commands respect with investors, regulators, employees, and external stakeholders",
      "Crisis Management: Experience navigating boards through difficult situations, crises, or transformation",
      "Sector Knowledge: Relevant sector expertise or demonstrable ability to get up to speed rapidly",
      "Time Availability: Genuinely available for the commitment required — often underestimated by candidates"
    ],
    interviewQuestions:[
      "Walk me through your approach to chairing a board. How do you set culture, manage dynamics, and ensure effectiveness?",
      "Describe the most difficult CEO relationship you've managed as a chair. What was the challenge and how did you handle it?",
      "Tell me about a board you've chaired through a crisis or major transformation. What was your role and what was the outcome?",
      "How do you balance supporting the CEO with providing appropriate challenge and accountability?",
      "Describe your experience with investor relations and stakeholder management. Give me a specific example.",
      "Walk me through a board composition or succession planning process you've led. How did you approach it?",
      "Tell me about a time when you had to address underperformance or remove a CEO. How did you handle it?",
      "How do you ensure board effectiveness? What practices and processes do you put in place?",
      "Describe your understanding of the current UK governance requirements for a company of our structure.",
      "Walk me through your current commitments and how you would allocate time to this role specifically."
    ],
    hiringGuide:[
      {step:"Define the Chair Profile", detail:"Be specific about what you need: sector expertise, governance specialist, transformation leader, investor relations, or crisis management. Chair searches fail when the brief is too generic."},
      {step:"Clarify CEO Relationship", detail:"What does the CEO need from the chair — challenge, support, mentoring, or succession management? This fundamentally shapes the profile. Speak to the CEO candidly about this."},
      {step:"Consider Investor Requirements", detail:"If PE-backed or investor-controlled, clarify investor expectations for the chair profile. Misalignment here causes problems post-appointment."},
      {step:"Assess Governance Depth", detail:"For listed or regulated companies, test governance knowledge rigorously. Weak governance at chair level is a regulatory and reputational risk."},
      {step:"Evaluate Stakeholder Credibility", detail:"Will this person command respect with your investor base, regulators, employees, and external stakeholders? Test this through references and market soundings."},
      {step:"Check Real Availability", detail:"Chair roles require more time than most candidates anticipate. Walk through their current commitments in detail and test their understanding of the real time requirement."},
      {step:"Include Key Stakeholder Interviews", detail:"Have shortlisted candidates meet with CEO, major investors or board members, and potentially regulators or key commercial partners depending on context."},
      {step:"Plan Chair Onboarding", detail:"First 90 days: comprehensive governance review, 1-on-1s with each board member and exec, investor meetings, board effectiveness assessment, agreement on CEO objectives and board priorities."}
    ]
  },
  {
    id:"hire-coo",icon:"⚙️",title:"How to Hire a Chief Operating Officer (COO) in the UK",
    role:"COO",
    intro:`The Chief Operating Officer is one of the most variable executive roles in terms of scope and profile. In some organizations, the COO is the de facto deputy CEO running day-to-day operations. In others, they're a specialist focused on process, efficiency, and operational excellence. In many scale-ups, they're the operational counterweight to a visionary CEO — bringing discipline, systems, and execution capability.\n\nThe UK market for COO talent is diverse. The best candidates combine operational expertise with strategic thinking, have scaled organizations successfully, and can operate credibly as the CEO's operational partner.`,
    considerations:[
      "Define the COO scope precisely — deputy CEO, operational specialist, or CEO counterbalance?",
      "Clarify which functions report to the COO (operations, product, customer success, technology?)",
      "Be clear about the CEO-COO dynamic you're designing for",
      "Sector matters significantly — operational complexity varies enormously by business model",
      "Consider whether you need transformation capability or scaling expertise"
    ],
    salaryRange:"£95k–£250k depending on scope and complexity",
    searchFee:"28–33% of total first-year compensation",
    timeline:"10–14 weeks",
    whySearch:`COO appointments are high-stakes and profile-dependent. The role varies so much by organization that generic search is ineffective. A specialist headhunter can map the market for candidates with the specific operational profile you need, assess cultural fit with the CEO, and structure a process that tests both operational capability and strategic partnership potential.`,
    responsibilities:[
      "Leading day-to-day operations and ensuring operational efficiency and effectiveness",
      "Designing and implementing operational processes, systems, and infrastructure",
      "Managing operational functions (typically supply chain, logistics, customer service, facilities)",
      "Driving operational excellence, continuous improvement, and cost optimization",
      "Translating strategy into operational execution and delivery",
      "Managing cross-functional operational projects and transformation initiatives",
      "Building operational capability, team development, and succession planning",
      "Providing operational insights and performance data to board and CEO"
    ],
    keyQualities:[
      "Operational Excellence: Deep expertise in operational systems, process design, and efficiency optimization",
      "Execution Focus: Proven track record of translating strategy into operational delivery",
      "Scaling Experience: Has scaled operations through significant growth (headcount, geography, complexity)",
      "Strategic Thinking: Can balance operational detail with strategic perspective and business context",
      "Leadership: Strong track record building and leading operational teams",
      "Systems Thinking: Understands how to build scalable systems and infrastructure",
      "CEO Partnership: Ability to work as effective operational partner to visionary or strategic CEO",
      "Change Management: Experience leading operational transformation and process improvement"
    ],
    interviewQuestions:[
      "Walk me through the most complex operational transformation you've led. What was broken, what did you fix, and what was the impact?",
      "Describe your approach to operational process design. Give me a specific example of a system you've built.",
      "Tell me about how you've scaled operations through rapid growth. What broke, what worked, and what would you do differently?",
      "How do you balance operational efficiency with strategic flexibility? Give me an example where these were in tension.",
      "Describe a time when you had to make a difficult operational decision (restructuring, outsourcing, automation). How did you approach it?",
      "Walk me through your approach to operational metrics and reporting. What KPIs matter most and why?",
      "Tell me about your most effective CEO-COO partnership. What made it work and what was your role?",
      "How do you drive continuous improvement in operational teams? Give me specific examples of improvements you've delivered.",
      "Describe your experience with operational technology and systems implementation. What have you deployed and what was the business impact?",
      "What would your first 90 days look like here? How would you diagnose operational challenges and prioritize improvements?"
    ],
    hiringGuide:[
      {step:"Define the COO Mandate", detail:"Be explicit about scope: deputy CEO, operational specialist, or CEO operational partner. Different profiles entirely. The CEO must be clear on what they need from this role."},
      {step:"Clarify Reporting Structure", detail:"Which functions will report to the COO? Operations, product, customer success, technology? The scope fundamentally affects the profile required."},
      {step:"Assess Operational Depth", detail:"Test specific operational expertise through case studies or operational scenarios. Look for candidates who can get into detail credibly without losing strategic perspective."},
      {step:"Test CEO Partnership Potential", detail:"The CEO-COO relationship is critical. Assess working style compatibility, communication, and complementary strengths. Consider joint interviews."},
      {step:"Evaluate Scaling Experience", detail:"Ask for specific examples of scaling operations through growth. Check references on their ability to build systems that scale."},
      {step:"Consider Transformation Capability", detail:"If operational transformation is required, test change leadership capability rigorously. Ask about specific transformations they've led."},
      {step:"Include Cross-Functional Interviews", detail:"Have shortlisted candidates meet with heads of key operational functions. Credibility and cultural fit across operations is critical."},
      {step:"Plan Operational Onboarding", detail:"First 90 days: operational audit across all functions, process mapping, team 1-on-1s, quick wins on visible operational pain points, 100-day operational improvement plan."}
    ]
  },
  {
    id:"hire-cmo",icon:"📢",title:"How to Hire a Chief Marketing Officer (CMO) in the UK",
    role:"CMO",
    intro:`The Chief Marketing Officer role has evolved significantly. Modern CMOs must combine brand strategy with performance marketing, creative thinking with data analytics, and customer insight with commercial outcomes. For growth-stage businesses, the CMO is increasingly accountable for pipeline, customer acquisition cost, and revenue contribution — not just brand awareness.\n\nThe UK market for marketing leadership is competitive and specialized. The best CMOs understand digital marketing deeply, can operate at board level credibly, and have demonstrably driven commercial growth through marketing investment.`,
    considerations:[
      "Define whether you need brand-focused, growth-focused, or product marketing leadership",
      "Clarify CMO accountability — brand and awareness, or pipeline and revenue contribution?",
      "Establish the relationship with sales/CRO — does CMO own demand gen or is this shared?",
      "Be clear about budget, team size, and infrastructure currently in place",
      "Sector experience matters — B2B, B2C, regulated industries require different profiles"
    ],
    salaryRange:"£90k–£220k depending on sector and scope",
    searchFee:"28–33% of total first-year compensation",
    timeline:"10–14 weeks",
    whySearch:`The best CMOs are in high demand, well-networked, and selective about their next move. They want to work where marketing is genuinely valued as a growth driver, not treated as a cost center. A specialist headhunter can identify marketing leaders who have delivered measurable commercial outcomes — and position your opportunity in terms of the growth challenge, not just the role spec.`,
    responsibilities:[
      "Defining and executing marketing strategy aligned with commercial objectives",
      "Building and leading brand strategy, positioning, and messaging",
      "Driving customer acquisition, demand generation, and pipeline contribution",
      "Managing marketing budget allocation and ROI optimization",
      "Leading digital marketing, content, product marketing, and communications functions",
      "Developing customer insights, segmentation, and go-to-market strategies",
      "Building and developing high-performing marketing teams",
      "Providing marketing analytics and performance reporting to board and exec team"
    ],
    keyQualities:[
      "Strategic Marketing: Ability to develop marketing strategy connected to business outcomes and revenue growth",
      "Digital Expertise: Deep understanding of digital marketing, marketing technology, and data-driven marketing",
      "Commercial Acumen: Fluent in CAC, LTV, conversion rates, and marketing contribution to pipeline",
      "Creative Thinking: Can balance data-driven performance marketing with brand building and creative excellence",
      "Leadership: Track record of building and scaling marketing teams and capability",
      "Customer Insight: Deep understanding of customer behavior, segmentation, and journey optimization",
      "Cross-Functional Collaboration: Can align marketing with sales, product, and customer success effectively",
      "Analytical Rigor: Uses data and analytics to optimize marketing performance and demonstrate ROI"
    ],
    interviewQuestions:[
      "Walk me through a marketing strategy you've designed and executed. What was the business context and what commercial impact did it deliver?",
      "Describe your approach to balancing brand investment with performance marketing. How do you allocate budget and measure effectiveness?",
      "Tell me about the most successful customer acquisition campaign you've run. What made it work and what was the CAC and LTV?",
      "How do you align marketing and sales in practice? Give me an example of how you've resolved tension between these functions.",
      "Describe a major marketing failure or underperformance you've experienced. What happened and what did you learn?",
      "Walk me through your approach to marketing analytics and reporting. What metrics matter most and why?",
      "Tell me about your experience building and scaling marketing teams. What did you focus on and what was the impact?",
      "How do you stay current with marketing technology and digital marketing trends? What have you implemented recently?",
      "Describe your experience with product marketing and go-to-market strategy. Give me a specific launch example.",
      "What would your first 90 days look like here? How would you diagnose marketing effectiveness and prioritize improvements?"
    ],
    hiringGuide:[
      {step:"Define Brand vs Growth Focus", detail:"Be clear whether you need brand-building expertise, performance marketing/growth capability, or both. These often require different profiles."},
      {step:"Clarify Commercial Accountability", detail:"Will the CMO be accountable for pipeline and revenue contribution, or brand awareness and positioning? This fundamentally shapes the profile and assessment."},
      {step:"Assess Digital Marketing Depth", detail:"Test digital marketing expertise through specific examples of campaigns, channel optimization, and martech implementation. Digital fluency is non-negotiable."},
      {step:"Evaluate Commercial Fluency", detail:"Strong CMOs are commercially fluent. Test their understanding of CAC, LTV, conversion funnels, and marketing ROI. Ask them to critique your current metrics."},
      {step:"Test Creative and Analytical Balance", detail:"Great CMOs balance creative thinking with data-driven decision making. Test both dimensions through case studies and campaign examples."},
      {step:"Check Cross-Functional Capability", detail:"Marketing success requires alignment with sales and product. Assess their ability to collaborate effectively and resolve cross-functional tension."},
      {step:"Include Sales/Revenue Interviews", detail:"Have shortlisted candidates meet with sales/revenue leaders. Marketing and sales alignment is critical to commercial success."},
      {step:"Plan Marketing Onboarding", detail:"First 90 days: marketing performance audit, customer and competitor research, team capability assessment, quick wins on pipeline visibility and conversion rates."}
    ]
  },
  {
    id:"hire-general-counsel",icon:"⚖️",title:"How to Hire a General Counsel in the UK",
    role:"General Counsel",
    intro:`The General Counsel is the most senior legal officer in the organization, responsible for legal strategy, risk management, compliance, and corporate governance. For high-growth, regulated, or complex businesses, the GC is a critical strategic advisor to the CEO and board — not just a service function.\n\nThe UK market for General Counsel talent is relationship-driven and specialized. The best candidates combine deep legal expertise with commercial awareness, have operated credibly at board level, and understand how to balance legal risk with commercial opportunity.`,
    considerations:[
      "Define whether you need in-house legal leadership for the first time or replacing an existing GC",
      "Clarify scope: pure legal, or legal + compliance, risk, company secretarial, data protection?",
      "Be clear about regulatory environment and compliance requirements specific to your sector",
      "Establish board expectations — is this a strategic advisor role or operational legal head?",
      "Consider whether sector-specific legal expertise (financial services, healthcare, technology) is required"
    ],
    salaryRange:"£95k–£240k depending on complexity, sector, and regulatory environment",
    searchFee:"28–33% of total first-year compensation",
    timeline:"10–14 weeks",
    whySearch:`The best General Counsels are not actively seeking roles. They are approached for opportunities where their specific legal expertise is directly relevant and where they can operate as strategic advisors, not just legal service providers. A specialist headhunter maps the market for candidates with the right sector, regulatory, and commercial profile — and structures an assessment that tests both legal capability and board-level credibility.`,
    responsibilities:[
      "Providing legal strategy, advice, and risk management to CEO and board",
      "Managing all legal matters including contracts, litigation, disputes, and regulatory compliance",
      "Leading corporate governance, company secretarial, and board support functions",
      "Overseeing compliance programs and regulatory relationships",
      "Managing intellectual property, data protection, and privacy matters",
      "Supporting M&A, fundraising, and major commercial transactions",
      "Building and managing legal team and external legal advisor relationships",
      "Advising on employment law, commercial contracts, and corporate structure"
    ],
    keyQualities:[
      "Legal Expertise: Deep legal knowledge across commercial, corporate, regulatory, and compliance areas",
      "Commercial Judgment: Ability to balance legal risk with commercial opportunity and business objectives",
      "Strategic Advisory: Can operate credibly as strategic advisor to CEO and board, not just legal service provider",
      "Regulatory Knowledge: Understanding of relevant regulatory environment and compliance requirements",
      "Risk Management: Strong judgment on legal risk assessment and mitigation strategies",
      "Communication: Can explain complex legal matters clearly to non-legal stakeholders",
      "Leadership: Track record of building and managing legal teams and external advisor relationships",
      "Sector Experience: Relevant sector knowledge (particularly for regulated industries)"
    ],
    interviewQuestions:[
      "Walk me through the most complex legal or regulatory challenge you've navigated. What was your approach and what was the outcome?",
      "Describe a situation where you had to balance legal risk against commercial opportunity. How did you advise and what happened?",
      "Tell me about your experience building and managing an in-house legal function. What did you focus on and what was the impact?",
      "How do you manage relationships with external legal advisors? Give me examples of when you've used external counsel effectively.",
      "Describe your approach to regulatory compliance and risk management. What frameworks have you implemented?",
      "Tell me about a time when you had to deliver difficult legal advice to the CEO or board. How did you approach it?",
      "Walk me through your experience with M&A or major transactions. What was your role and what legal risks did you manage?",
      "How do you ensure the legal function adds commercial value beyond risk management? Give specific examples.",
      "Describe your experience with data protection, privacy, and cybersecurity legal matters. What have you implemented?",
      "What would your first 90 days look like here? How would you assess legal risk and prioritize legal function development?"
    ],
    hiringGuide:[
      {step:"Define the GC Mandate", detail:"Be clear whether you need strategic legal advisor to board, operational legal head, or first in-house legal leadership. Different profiles and different assessment criteria."},
      {step:"Clarify Scope and Structure", detail:"Will the GC own compliance, risk, company secretarial, data protection, or just pure legal? Define reporting lines and scope clearly."},
      {step:"Assess Legal Depth", detail:"Test legal expertise through case studies or legal scenarios relevant to your business. Look for candidates with specific sector or regulatory experience if required."},
      {step:"Evaluate Commercial Judgment", detail:"Strong GCs balance legal risk with commercial opportunity. Test their ability to provide pragmatic, commercial legal advice — not just risk aversion."},
      {step:"Test Board-Level Credibility", detail:"Will this person command respect with your board and investor base? Assess their ability to communicate complex legal matters clearly to non-legal stakeholders."},
      {step:"Check Regulatory Knowledge", detail:"For regulated industries, test regulatory and compliance knowledge rigorously. Weak regulatory advice is a material business risk."},
      {step:"Include CEO and Board Interviews", detail:"Have shortlisted candidates meet with CEO and board members. The GC must be trusted advisor to both."},
      {step:"Plan Legal Onboarding", detail:"First 90 days: legal risk audit, regulatory compliance review, contract and litigation review, external advisor assessment, legal function development plan."}
    ]
  },
  {
    id:"hire-pe-portfolio",icon:"📈",title:"Headhunters for PE-Backed Companies",
    role:"PE Portfolio",
    intro:`Private equity-backed businesses have distinct executive search requirements. The combination of a defined investment horizon, high performance expectations, and the specific value creation agenda of each deal means that getting the leadership team right is critical — and the cost of getting it wrong is amplified.\n\nHeadline demands for PE portfolio leadership: candidates who have demonstrably created value in comparable situations, who can operate at pace, and who understand what working with an active investor looks like in practice.`,
    considerations:[
      "Define the investment thesis and what the CEO/CFO needs to deliver against it",
      "Be specific about PE experience requirements — working with an active investor is a distinct skill set",
      "Timeline is often compressed vs standard search — build this into the brief",
      "Carry, equity, and management incentive plans need to be structured attractively to compete",
      "Board dynamics between management, investor, and chair need to be described honestly to candidates"
    ],
    salaryRange:"Varies by role — see salary benchmarks",
    searchFee:"28–35% of total compensation. Many PE firms have framework agreements with preferred search firms",
    timeline:"10–14 weeks",
    whySearch:`The pool of executives who have genuinely created value in PE-backed environments — and who are credible, available, and interested — is relatively small and well-known in the market. A specialist headhunter maps this population comprehensively and brings independent judgment on which candidates have the right track record for your specific investment situation.`
  },
  {
    id:"confidential-search",icon:"🔒",title:"Confidential Executive Search UK",
    role:"Confidential",
    intro:`Many of the most important executive appointments cannot be conducted openly. Replacing a sitting CEO before announcing a succession. Recruiting a CFO ahead of a fundraise or exit. Hiring a new MD without alerting the market to a strategic pivot. Building a leadership team for a stealth business unit.\n\nConfidential executive search requires a different approach — and not all headhunters are equally equipped to deliver it.`,
    considerations:[
      "Define exactly what must remain confidential — organisation identity, role type, or both",
      "Agree with the headhunter precisely what can be disclosed at initial approach, at expression of interest, and at formal interview",
      "Ensure NDA arrangements are in place before any approach is made",
      "Consider the risk of the incumbent finding out — plan for this scenario",
      "Limit the number of firms briefed — multiple firms in a small market increases leak risk"
    ],
    salaryRange:"Varies by role",
    searchFee:"Standard retained fee plus possible enhanced confidentiality arrangements",
    timeline:"12–18 weeks for fully confidential mandates",
    whySearch:`Confidential search is not just about keeping a secret. It requires a headhunter who can approach senior candidates compellingly without revealing the opportunity fully, manage information carefully through a multi-stage process, and handle the inevitable moment when confidentiality is lifted. Retained search firms with specialist confidential search capability are materially better equipped to deliver this than contingent recruiters.`
  }
];

// ─── BLOG ARTICLES ──────────────────────────────────────────────────
const BLOG_ARTICLES = [
  {
    id:"cost-bad-hire",
    tag:"Data & Analysis", date:"4 March 2026", readTime:"8 min",
    title:"The Real Cost of a Bad Senior Hire (And Why Most Boards Underestimate It)",
    subtitle:"The £200k role that costs £1 million. A frank breakdown of what really happens — financially and culturally — when a senior appointment goes wrong.",
    intro:`Every board knows, in principle, that a bad senior hire is expensive. The commonly cited figure — three to five times annual salary — sounds alarming in a presentation. But in practice, when a CFO underperforms or a new MD fails to land, the response is rarely to stop and calculate the true cost. It is to manage the situation, hope it improves, and eventually face a decision that should have been made six months earlier.

The result is that the real cost of a bad senior hire is almost always significantly higher than the board acknowledges at the time — and frequently higher than the figure cited in the HR literature.

This is what it actually costs.`,
    sections:[
      {h:"Direct Financial Costs", b:`The most visible costs are the ones that go through finance: severance, legal fees, and recruitment costs for the replacement search. For a director-level appointment on a £200,000 package, these alone typically run to £80,000–£150,000.\n\nSeverance: typically 6–18 months' total compensation depending on tenure and contractual terms. For a £200k role, that's £100,000–£300,000.\n\nLegal costs: any exit negotiation involving a senior executive will incur legal fees on both sides. Budget £15,000–£40,000.\n\nReplacement search: the retained search you should have used first time around, now under pressure and with a damaged brief. £50,000–£70,000 for a £200k role.\n\nTotal direct costs: £165,000–£410,000 before a single day of the new hire's salary.`},
      {h:"Productivity Loss", b:`The period of underperformance — which in most cases stretches 12–18 months before the decision to exit is made — carries its own cost. A CFO who is not driving financial strategy, a COO who is not improving operational efficiency, an MD who is not growing revenue.\n\nConservative estimate: a director-level underperformer costs the organisation 50–75% of the value a good appointment would have generated. For a £200,000 role, over 18 months, that's easily £200,000–£400,000 in unrealised value.\n\nThis is the cost most boards do not calculate — because it requires acknowledging what good would have looked like.`},
      {h:"Management and Board Time", b:`The time cost of managing a failing senior hire is substantial and entirely invisible in financial statements. CEO time diverted to performance management, board discussions about the individual, HR involvement, legal advice — none of this appears as a line item.\n\nA realistic estimate for a director-level situation: 200–400 hours of senior management and board time over an 18-month period. At an opportunity cost of £500–£1,000 per hour for the people involved, that's £100,000–£400,000 in time cost alone.`},
      {h:"Cultural and Organisational Damage", b:`The hardest costs to quantify are often the most damaging. A poor cultural fit at senior level sends signals throughout the organisation. High-performing direct reports leave. Teams disengage. Decisions get deferred waiting for clarity on leadership.\n\nEmployee turnover triggered by a bad senior hire is a well-documented phenomenon. Losing two or three strong performers from a team of ten — each of whom costs £30,000–£80,000 to replace and takes 6–12 months to reach full productivity — can easily add £150,000–£300,000 to the total cost.`},
      {h:"The ROI Case for Getting It Right", b:`Add it up for a £200,000 senior role:\n\n- Direct costs (severance, legal, replacement search): £200,000–£500,000\n- Productivity loss: £200,000–£400,000\n- Management time: £100,000–£400,000\n- Cultural and team impact: £150,000–£300,000\n\n**Total: £650,000–£1,600,000**\n\nA retained executive search for the same role: £50,000–£70,000.\n\nThat is a return on investment of 10–20x on the search fee — just in downside protection. It does not include the upside value a genuinely excellent appointment would generate.\n\nThe question boards should be asking is not "can we afford a headhunter?" It is "can we afford not to use one?"`}
    ]
  },
  {
    id:"ceo-succession",
    tag:"Strategy", date:"25 February 2026", readTime:"10 min",
    title:"CEO Succession: Why Most Boards Leave It Too Late (And How to Fix It)",
    subtitle:"The warning signs that your CEO succession plan is inadequate — and what a proactive approach actually looks like.",
    intro:`Most boards believe they have a CEO succession plan. Most of those plans are inadequate.

The inadequacy takes a predictable form: a list of internal candidates, most of whom are not genuinely ready, with no external benchmarking, no development investment, and no real understanding of what the next CEO needs to look like given where the business is heading.

This becomes a crisis when the current CEO leaves unexpectedly — through resignation, illness, poor performance, or a board decision — and the organisation is forced into an emergency search with no preparation, under time pressure, and in full view of the market.

Here is what good CEO succession planning actually looks like.`,
    sections:[
      {h:"The Warning Signs Your Succession Plan Is Inadequate", b:`You have named internal successors but have never had a direct conversation with them about whether they want the role.\n\nYou have not externally benchmarked your internal candidates against the external market in the last 24 months.\n\nYour succession plan was last updated more than 12 months ago.\n\nYour succession plan does not address what the organisation will need from its next CEO — it describes what the current CEO does.\n\nYou have no view on the external talent market for CEO candidates in your sector.\n\nThe board has not collectively discussed what the ideal next CEO profile looks like.`},
      {h:"Why Boards Leave It Too Late", b:`CEO succession planning is uncomfortable. It requires the board to have transparent conversations about the current CEO's tenure and performance. It requires acknowledging that the CEO will not be there forever. And in many organisations, the CEO is involved in succession planning — creating an obvious conflict of interest.\n\nThe result is that succession planning is deferred, the work remains shallow, and the organisation is repeatedly surprised by its own leadership transitions.\n\nThe organisations that handle CEO succession well treat it as an ongoing board responsibility — not a project triggered by a departure announcement.`},
      {h:"What Proactive Succession Planning Looks Like", b:`**Annual external benchmarking.** A headhunter is engaged — typically on a talent mapping mandate rather than a live search — to identify and assess potential external CEO candidates. This gives the board a real picture of what is available, at what cost, and on what timeline.\n\n**Honest internal assessment.** Internal candidates are assessed with the same rigour as external candidates — including psychometric assessment and structured board interviews. This surfaces the genuine gaps between aspiration and readiness.\n\n**Development investment.** Candidates who are 12–24 months from readiness get the specific development and exposure needed to close the gap.\n\n**Defined trigger points.** The board agrees in advance what circumstances would trigger the succession process — not just "when the CEO leaves" but performance thresholds, planned retirement timelines, and strategic inflection points.\n\n**A live external relationship.** The board maintains a relationship with one or two executive search firms who know the organisation and the CEO brief well enough to mobilise quickly if needed.`},
      {h:"The Emergency Search and Why It Is So Costly", b:`When succession planning has been neglected and the CEO leaves unexpectedly, the board faces a search under the worst possible conditions: time pressure, no prepared brief, stakeholders anxious for certainty, and a market that knows you are looking.\n\nEmergency CEO searches take 20–28 weeks on average — significantly longer than a well-prepared search because the brief development phase, which should happen before the search is needed, now happens under pressure.\n\nThe candidate pool also narrows. The best CEO candidates — who are passive and selective — are less likely to engage with an organisation that is visibly in distress. And the organisation's negotiating position is weakened by the urgency of its need.\n\nThe cost premium of an emergency CEO search — in direct fees, management distraction, and suboptimal appointment outcomes — is estimated at 40–80% more than a proactively managed succession process.`},
      {h:"How to Start", b:`Start with an honest board conversation about what the next CEO needs to look like — not who the current CEO is, but what the organisation will need in the next phase.\n\nCommission a talent mapping exercise from a specialist CEO search firm. This is not a live search — it is a confidential assessment of the external landscape. It typically costs £15,000–£25,000 and gives the board a realistic picture of what is available.\n\nReview your internal candidates with external rigour. Engage a psychometric assessment firm to provide objective data alongside the board's subjective view.\n\nPut CEO succession on the board calendar as a standing agenda item — not an annual rubber stamp, but a genuine quarterly review.\n\nThe organisations that handle leadership transitions best are those that treat succession not as a crisis to be managed, but as a strategic responsibility to be continuously discharged.`}
    ]
  },
  {
    id:"passive-candidates",
    tag:"Insights", date:"18 February 2026", readTime:"7 min",
    title:"Why the Best Senior Candidates Are Never on Job Boards",
    subtitle:"The 80% of the talent market you can't reach with advertising — and why it matters for your most important hires.",
    intro:`Every organisation hiring at director level or above faces the same problem: the person best qualified for the role is not looking at job advertisements. They are delivering results in their current position, trusted by their current employer, and have no immediate reason to be looking at what is available.\n\nThis is not an occasional quirk of the talent market. It is the structural reality of senior hiring. At director level and above, research consistently suggests that 75–85% of the relevant talent pool is passive at any given time — not actively seeking a new role.\n\nThe implication is uncomfortable but clear: if you rely exclusively on channels that reach the active market — advertising, job boards, LinkedIn InMails — you are competing for access to 15–25% of the available talent while your competitors who use headhunters are talking to everyone.`,
    sections:[
      {h:"Why the Best People Are Not Looking", b:`High performance at senior level correlates with stability. The people who are succeeding — growing revenue, leading transformations, building strong teams — are typically well-rewarded, well-regarded, and not experiencing the dissatisfaction that triggers a job search.\n\nThe active market, by contrast, contains a higher proportion of people who are available because something has gone wrong: a restructuring, a difficult relationship with their current employer, underperformance, or a change in personal circumstances. This is not a universal rule — excellent candidates do actively search — but it represents a structural bias in what advertising-led channels produce.\n\nA headhunter approaches the entire market, including the 80%+ who would never respond to an advertisement. These are the conversations that lead to the best outcomes.`},
      {h:"What Passive Candidate Engagement Actually Looks Like", b:`The approach to a passive candidate is fundamentally different from a standard recruitment conversation. There is no application, no expressed interest, no indication that the candidate is open to a move.\n\nThe headhunter's job is to create interest where none existed. This requires:\n\n**Preparation.** The headhunter knows the candidate's career, their current role, their likely motivations, and why this specific opportunity might be the right next step for them at this point in their career.\n\n**Credibility.** A credible headhunter calling about a specific, compelling opportunity is treated differently from a generic InMail. The candidate takes the call because the headhunter has a reputation in the market.\n\n**Positioning.** The opportunity is presented in terms of the candidate's career — not just the job spec. What does this role offer that their current position does not? Why is this the right move at this stage?\n\n**Patience.** Passive candidates move more slowly. Multiple conversations are normal. The best outcomes come from relationships, not transactions.`},
      {h:"The Advertise-First Trap", b:`Many organisations default to advertising first — partly from habit, partly from a belief that "seeing what's out there" is a low-cost way to start a search.\n\nThe problem with this approach for senior roles is that it anchors the process to the active market. Once you have received a strong application from an internal candidate or an active external candidate, the bar for launching a full headhunting exercise rises — even if the passive market almost certainly contains better-qualified people you have never spoken to.\n\nThe organisations that consistently make the best senior appointments treat headhunting as the default channel for director-level and above — not a fallback when advertising has failed.`},
      {h:"How to Have a Better Conversation with Your Headhunter About This", b:`Ask your headhunter specifically: what proportion of your shortlist will be candidates who were not looking when you first approached them?\n\nFor a well-run retained search, the answer should be 60–80%. If the headhunter cannot give you a clear answer, or if their shortlist is dominated by people who had applied or expressed interest before being approached, the market mapping work has not been done properly.\n\nThe whole point of retained executive search is access to the passive market. If you are not getting that access, you are not getting the value you are paying for.`}
    ]
  },
  {
    id:"pe-ceo-hire",
    tag:"Private Equity", date:"11 February 2026", readTime:"9 min",
    title:"What PE Investors Actually Look for in a Portfolio Company CEO",
    subtitle:"After placing hundreds of CEOs into PE-backed businesses, here is what separates the appointments that create value from the ones that don't.",
    intro:`Private equity-backed businesses are one of the most demanding environments for a CEO. The combination of a defined investment horizon, an active and performance-focused investor, a management incentive plan that creates real upside — and real consequences — and the operational complexity of a business being actively transformed, makes the role categorically different from a CEO position in a stable corporate.\n\nThe candidates who succeed in PE-backed environments are a specific subset of the executive population. Understanding what investors and boards actually look for — rather than what looks good on a CV — is the starting point for finding and appointing the right person.`,
    sections:[
      {h:"Value Creation Track Record — Specifically", b:`The single most important criterion for a PE-backed CEO is a demonstrable track record of creating enterprise value in a comparable context.\n\n"Comparable context" matters enormously. A CEO who has run a £500m listed business with a large corporate support function is not automatically equipped to run a £50m PE-backed business with a lean team and an active investor on the board. The skills overlap, but the environments are different enough that track record in one is limited evidence for performance in the other.\n\nInvestors look for: revenue growth delivered (not inherited), EBITDA expansion, successful completion of a defined value creation programme, and — ideally — a completed exit with documented returns. Candidates who can speak specifically to value creation metrics, rather than describing their role in general terms, stand out immediately.`},
      {h:"PE-Investor Relationship Skills", b:`Working with an active private equity investor is a specific skill set that candidates either have or do not have. The best PE-backed CEOs see the investor as a strategic partner — bringing capital, networks, and challenge — rather than an obstacle or an audience.\n\nInvestors look for: experience presenting to investment committees, comfort with monthly board packs and scrutiny of performance data, the ability to have direct, data-driven conversations about underperformance, and a track record of using investor relationships productively.\n\nCandidates who have only worked in listed or corporate environments often underestimate the intensity of PE investor relationships. Surfacing this experience — or its absence — early in the assessment process saves significant time.`},
      {h:"Speed and Pace of Execution", b:`PE-backed businesses operate at a different pace from most corporate environments. A 100-day plan is not a formality — it is the first test of a new CEO's ability to diagnose, prioritise, and execute at the speed the investment thesis requires.\n\nThe assessment question is not "can this person develop a strategy?" Almost every senior candidate can. The question is: "Can this person execute against a defined plan, under time pressure, with limited resources, while managing a demanding investor relationship?" The evidence for this comes from specific examples, not general descriptions.`},
      {h:"What Kills PE-Backed CEO Appointments", b:`The most common failure modes for PE-backed CEO appointments:\n\n**Pace mismatch.** The CEO is used to corporate decision timelines. The investor expects monthly reporting and quarterly strategic review. The mismatch creates friction that escalates.\n\n**Over-reliance on corporate support.** The CEO's previous success depended on a large HR function, a dedicated strategy team, and a well-resourced finance department. In a PE-backed business with a lean team, none of that infrastructure exists.\n\n**Underestimating the investor relationship.** The CEO treats the board as a governance function rather than an active partner. The investor feels excluded. Trust breaks down.\n\n**Inability to manage the MIP conversation.** The management incentive plan creates a complex dynamic between management and investor. CEOs who have not navigated this before sometimes find it more challenging than expected.\n\n**Wrong sector or stage experience.** A strong operational CEO from a mature business appointed to run a growth-stage company, or vice versa. The skills do not transfer as cleanly as the CV suggests.`},
      {h:"What Good Assessment Looks Like", b:`For PE-backed CEO appointments, the assessment process should go significantly deeper than a standard executive interview.\n\nSpecific value creation interviews: walk me through every business you have led or significantly contributed to. What was the EBITDA when you arrived? When you left? What specifically did you do to drive that?\n\nReference conversations: not HR-style box-ticking references, but substantive conversations with former investors, chairs, and co-investors who have worked with the candidate in a PE context.\n\nPsychometric assessment: specifically assessing pace, commercial drive, resilience, and relationship style — the attributes that predict PE-backed performance.\n\nA good headhunter will have done much of this work before the candidate reaches the client. Shortlisted candidates for PE-backed CEO roles should arrive with a detailed written assessment that gives the board confidence the initial screening has been thorough.`}
    ]
  },
  {
    id:"executive-search-2026",
    tag:"Market Trends", date:"3 February 2026", readTime:"8 min",
    title:"The UK Executive Search Market in 2026: What's Changed and What It Means for Your Next Senior Hire",
    subtitle:"AI disruption, shifting candidate expectations, compressed timelines, and the rise of the counter-offer. Here is what is actually happening in the UK executive search market.",
    intro:`The UK executive search market has changed significantly over the last three years. The post-pandemic talent disruption has largely resolved, but it has left behind a set of structural changes in candidate behaviour, compensation expectations, and search methodology that are now the new normal.\n\nFor organisations planning senior appointments in 2026, understanding these dynamics is not optional — they directly affect timelines, budgets, and the probability of a successful outcome.`,
    sections:[
      {h:"Counter-Offers Are Now the Rule, Not the Exception", b:`The most significant practical change in senior search over the last three years is the near-universal prevalence of counter-offers. In 2026, the majority of strong candidates who accept a new role at director level or above will receive a counter-offer from their current employer.\n\nThis is not new, but its frequency and intensity have increased. Current employers have become much more aggressive in their retention efforts — both financially and in terms of role enhancement — and the cost of replacing a high-performing senior leader is now well understood.\n\nThe implication for hiring organisations: assume a counter-offer will happen, and plan for it. This means ensuring the offer is compelling enough to withstand a counter, maintaining close contact with the candidate through notice period, and having the headhunter actively managing the candidate's motivation throughout.\n\nSearch processes that do not account for counter-offer risk are regularly losing their preferred candidates at the final stage.`},
      {h:"AI Is Changing How Headhunters Work (But Not How You Think)", b:`There is significant market noise about AI replacing executive search. The reality is more nuanced.\n\nAI tools are materially improving the efficiency of research and market mapping — the phase where a headhunter identifies the universe of potential candidates. Tasks that previously took days are being compressed into hours. This is genuinely positive for clients: more comprehensive mapping, faster longlist development, better data on compensation benchmarks.\n\nWhat AI cannot do is the work that actually creates value in executive search: the personal network that means a headhunter can pick up the phone to a passive CEO candidate and be taken seriously; the judgment to assess whether a candidate's track record is genuine or inflated; the relationship skill to manage a complex negotiation between a PE board and a reluctant-but-interested candidate.\n\nThe headhunters who are using AI effectively are getting better outcomes, faster. The headhunters who are not are falling behind. This is a quality signal worth asking about when you are briefing search firms.`},
      {h:"Compensation Benchmarks Have Reset", b:`Base salary benchmarks for director-level and above roles have shifted significantly since 2022. The combination of inflation, talent competition, and the unwinding of COVID-era pay freezes has produced material increases across most sectors.\n\nFor organisations working from 2022 or 2023 salary data, the risk of briefing a search with a below-market compensation package is real. A search that attracts strong candidates but fails to make a compelling offer is more damaging than a well-structured search with a realistic package — because it has consumed time, management attention, and has given the headhunter a difficult story to tell when briefing candidates on the next attempt.\n\nGet current benchmark data before you brief a headhunter, not after you have made your first offer.`},
      {h:"The Timeline Has Compressed — and Extended Simultaneously", b:`The average time from brief to accepted offer for a director-level retained search is 10–14 weeks. That has not changed significantly.\n\nWhat has changed is the variance. Searches where the client is well-prepared — clear brief, aligned stakeholders, responsive interview process — are completing at the fast end of that range, sometimes faster. Searches where the brief is unclear, stakeholders are not aligned, or interview scheduling is slow are taking significantly longer — sometimes 20+ weeks.\n\nThe variable that organisations control most directly is their own process speed. Candidates — particularly passive ones — lose interest when a process drags. The headhunter's job is partly to keep the client moving at the pace the talent market requires.`},
      {h:"What This Means for Your Next Senior Hire", b:`Brief earlier than you think you need to. The best headhunters are busy. The best candidates are not immediately available. A search that starts with adequate time is a very different proposition from one that starts under pressure.\n\nGet your brief right before you start. A week invested in stakeholder alignment, role definition, and compensation benchmarking saves three weeks mid-search.\n\nPlan for a counter-offer. Do not assume a candidate who accepts your offer will arrive. Keep them engaged through notice period.\n\nChoose your headhunter based on the individual, not the brand. The quality gap between a strong senior consultant and a weak one at the same firm is larger than the quality gap between firms. Find the right person, not just the right logo.`}
    ]
  }
];

// ─── GLOSSARY ──────────────────────────────────────────────────────
const GLOSSARY = [
  {t:"Retained Search",d:"A search model where the client pays an upfront engagement fee regardless of outcome. The headhunter is exclusively committed to filling the role through proactive research."},
  {t:"Contingent Search",d:"A model where the recruiter only earns a fee when a candidate they submitted is hired. No placement = no fee."},
  {t:"Off-Limits",d:"An ethical restriction preventing a headhunter from approaching employees of current or recent clients. Typically lasts 12–24 months post-placement."},
  {t:"Market Mapping",d:"A systematic identification of all relevant candidates in a defined talent pool — regardless of whether they are actively looking. Usually 100–300 people."},
  {t:"Passive Candidate",d:"Someone not actively seeking a new role. The majority of senior talent. Accessible only through direct, proactive approach."},
  {t:"Shortlist",d:"The final 3–6 candidates presented to the client after research, assessment, and screening. Each typically supported by a detailed written report."},
  {t:"Assignment Brief",d:"The document defining the search — strategic context, role scope, ideal candidate profile, compensation, and process. The foundation of a successful search."},
  {t:"Engagement Fee",d:"The first instalment of a retained search fee, paid at commencement. Typically one-third of the total fee."},
  {t:"Completion Fee",d:"The final instalment of a retained search fee, paid on accepted offer. Typically one-third of the total fee."},
  {t:"Guarantee Period",d:"The period during which a headhunter will re-run a search at no additional fee if the placed candidate leaves. Typically 6–12 months."},
  {t:"Counter-Offer",d:"An offer made by a candidate's current employer to retain them. Occurs in the majority of senior searches. A key risk to manage."},
  {t:"Psychometric Testing",d:"Standardised assessments of personality, cognitive ability, or behavioural style. Common tools: Hogan, OPQ, SHL, MBTI."},
  {t:"360-Degree Referencing",d:"Feedback from former managers, peers, and direct reports — giving a multi-angle view of the candidate's performance and leadership style."},
  {t:"AESC",d:"Association of Executive Search and Leadership Consultants. The global professional body for retained search firms."},
  {t:"Total Compensation",d:"The full package value used to calculate search fees: base salary plus anticipated annual bonus."},
  {t:"Exclusivity",d:"An agreement that only one search firm will work on the mandate. Standard in retained search."},
  {t:"Hybrid Search",d:"A model combining elements of retained and contingent — typically a smaller upfront fee with the balance on placement."},
  {t:"Container Search",d:"Another term for hybrid search. A partial upfront fee that 'contains' the recruiter's investment."},
  {t:"Executive Search",d:"The process of identifying, approaching, and securing senior candidates. Used interchangeably with headhunting."},
  {t:"Headhunter",d:"A specialist who proactively identifies and approaches candidates for senior roles."},
  {t:"Longlisting",d:"A list of 10–25 candidates who have passed initial screening and merit further assessment before shortlisting."},
  {t:"Candidate Report",d:"A written assessment of a shortlisted candidate — typically 3–5 pages covering career history, interview findings, and recommendation."},
  {t:"Board Practice",d:"A specialism within executive search focused on NED and board chair appointments."},
  {t:"Interim Management",d:"The placement of experienced executives on a temporary basis — typically 3–12 months."},
  {t:"C-Suite",d:"The collective term for a company's most senior executives: CEO, CFO, COO, CTO, CMO, CHRO, and equivalent titles."},
  {t:"Diversity Search",d:"A search specifically focused on building a more diverse shortlist through proactive research."},
  {t:"Employer Brand",d:"The reputation of an organisation as an employer — how it is perceived by current and potential senior candidates."},
  {t:"Notice Period",d:"The time a candidate must work after handing in their resignation. Typically 1–6 months at senior levels."},
  {t:"Bench Strength",d:"The depth of internal talent ready to step up to senior roles."},
  {t:"Competency Framework",d:"A structured definition of the skills, behaviours, and attributes required for effective performance in a role."},
  {t:"Assessment Centre",d:"A structured evaluation process combining multiple methods — interviews, exercises, psychometrics."},
  {t:"Due Diligence",d:"Enhanced background verification for senior appointments including detailed references and financial checks."},
  {t:"Engagement Letter",d:"The formal agreement between client and headhunter confirming fee, exclusivity, off-limits, and guarantee terms."},
  {t:"Succession Planning",d:"Identifying and developing internal candidates to fill senior roles. Headhunters are often engaged when internal succession has not produced a ready candidate."},
  {t:"Talent Mapping",d:"Identifying potential future candidates for roles that may not yet be open. Used for pipeline building."},
  {t:"Benchmarking",d:"Comparing a candidate's profile or compensation against market equivalents."},
  {t:"Onboarding",d:"The process of integrating a new executive. Quality headhunters support onboarding for 3–6 months post-placement."},
  {t:"Search Committee",d:"A group of stakeholders — typically board members — responsible for overseeing a senior appointment."}
];

const STATS = [
  {s:"£600k–£1m",l:"Estimated cost of a bad hire at £200k salary (3–5× annual salary)",src:"CIPD / Harvard Business Review"},
  {s:"30%",l:"Most common retained search fee as a % of first-year total compensation in the UK",src:"Industry consensus / AESC"},
  {s:"10–14 weeks",l:"Average duration of a UK director-level retained executive search",src:"Elliot Marsh / Executive Headhunters data"},
  {s:"80%+",l:"Proportion of senior talent not actively seeking a new role at any given time",src:"LinkedIn Talent Trends"},
  {s:"90%+",l:"Completion rate of retained searches at quality executive search firms",src:"AESC Global Research"},
  {s:"40–60%",l:"Proportion of senior appointments that face a counter-offer from current employer",src:"Executive search industry data"},
  {s:"6–12 months",l:"Standard guarantee period offered by retained executive search firms",src:"Industry standard"},
  {s:"15–20%",l:"Proportion of senior talent pool accessible via job advertisements (active market only)",src:"LinkedIn Talent Solutions"},
  {s:"£30k–£40k",l:"Minimum retained search fee in the UK market regardless of percentage calculation",src:"Market rate data"},
  {s:"3–6",l:"Active mandates typically held by a retained search consultant at any one time",src:"AESC operational standards"},
  {s:"100–300",l:"Candidate names typically identified during market mapping phase of a senior search",src:"Executive search practice"},
  {s:"25–35%",l:"Range of retained executive search fees as percentage of total first-year compensation",src:"UK market data 2026"}
];

const LOCS = [
  {
    c:"London",
    p:"London is the dominant executive search market in the UK and one of the most significant globally. As home to the majority of FTSE 100 and FTSE 250 headquarters, the largest concentration of private equity and venture capital firms, global financial services institutions, and international professional services firms, London represents the deepest and most competitive talent market for C-suite and board-level appointments.\n\nThe London executive search market operates across all sectors with particular strength in financial services, technology, professional services, private equity, media, and corporate headquarters functions. The candidate pool at senior level is genuinely international — London-based searches routinely attract candidates from continental Europe, North America, and Asia-Pacific.\n\nLondon headhunters handle the most complex, highest-value, and most confidential executive appointments in the UK market. The concentration of search firms, sector specialists, and research capability in London is unmatched outside New York and potentially Singapore.\n\nKey hiring challenges in London include intense competition for top talent, high compensation benchmarks driven by financial services and PE-backed businesses, and the expectation among senior candidates for retained search as standard. The best candidates are approached regularly and are highly selective about their next move.\n\nFor businesses headquartered in London or recruiting London-based executives, working with a headhunter who understands the market dynamics, has genuine senior-level networks, and can position opportunities credibly is essential.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"CFO",link:"hire-cfo"},
      {title:"CTO",link:"hire-cto"},
      {title:"CRO",link:"hire-cro"},
      {title:"COO",link:"hire-coo"},
      {title:"CMO",link:"hire-cmo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"General Counsel",link:"hire-general-counsel"},
      {title:"Non-Executive Director",link:"hire-ned"},
      {title:"Chair",link:"hire-chair"}
    ]
  },
  {
    c:"Manchester",
    p:"Manchester is the largest and most dynamic executive search market outside London. The city has established itself as a genuine alternative headquarters location, particularly for technology, media, e-commerce, healthcare, and professional services businesses looking to access strong talent pools outside the capital.\n\nThe Greater Manchester economy spans a diverse range of sectors with particular strength in digital and technology (including the UK's largest tech cluster outside London), media and creative industries (MediaCityUK), retail and e-commerce, advanced manufacturing, healthcare and life sciences, and financial and professional services.\n\nManchester's executive search market has matured significantly over the past decade, driven by increased PE-backed portfolio company activity, the relocation of major corporate functions from London, and the growth of scale-up businesses choosing Manchester as their headquarters. The talent pool combines locally-rooted senior executives with increasing inward migration of London-based candidates seeking quality of life improvements.\n\nKey hiring dynamics include strong competition for proven CEO and commercial leadership talent, salary expectations that have risen significantly but remain below London benchmarks, and growing sophistication in equity and LTIP structures as more PE and VC-backed businesses establish themselves in the region. Manchester candidates increasingly expect retained search processes for senior appointments.\n\nFor businesses recruiting in Manchester, understanding the local market dynamics — including which talent pools are genuinely deep and which remain constrained — is critical to search success.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"CTO",link:"hire-cto"},
      {title:"COO",link:"hire-coo"},
      {title:"CRO",link:"hire-cro"},
      {title:"CMO",link:"hire-cmo"},
      {title:"CFO",link:"hire-cfo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"Managing Director",link:"hire-ceo"},
      {title:"Non-Executive Director",link:"hire-ned"}
    ]
  },
  {
    c:"Birmingham",
    p:"Birmingham is the primary executive search hub for the Midlands and the UK's second-largest city economy. The region's industrial heritage combined with significant service sector growth has created a diverse and substantial executive talent market, particularly strong in manufacturing, automotive and supply chain, professional services, regional financial services, and corporate headquarters functions.\n\nThe Birmingham and West Midlands economy is anchored by advanced manufacturing (particularly automotive supply chain and aerospace components), financial and professional services, construction and infrastructure, retail and distribution, and public sector and higher education. Major corporate presences include FTSE-listed businesses, significant PE portfolio companies, and regional headquarters of national organizations.\n\nBirmingham's executive search market is characterized by depth in operational and technical leadership (COO, Operations Directors, Engineering Directors, Supply Chain Directors) and growing sophistication in C-suite appointments for regional headquarters and PE-backed businesses. The talent pool includes long-tenured regional executives with deep local networks and increasing inward migration from London and the South East.\n\nKey hiring considerations include competition for candidates with both operational depth and strategic leadership capability, salary benchmarks that sit between Northern cities and London, and the importance of local relationships and sector networks in accessing passive senior candidates. Manufacturing and engineering leadership searches in the Midlands are particularly relationship-driven.\n\nFor businesses headquartered in Birmingham or recruiting Midlands-based executives, working with a headhunter who has genuine regional presence and understands local market nuances is essential.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"COO",link:"hire-coo"},
      {title:"CFO",link:"hire-cfo"},
      {title:"Operations Director",link:"hire-coo"},
      {title:"Managing Director",link:"hire-ceo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"General Counsel",link:"hire-general-counsel"},
      {title:"Non-Executive Director",link:"hire-ned"}
    ]
  },
  {
    c:"Edinburgh",
    p:"Edinburgh is Scotland's financial and commercial capital, home to a significant concentration of asset management, insurance, banking, legal, and professional services businesses. The city represents the strongest executive search market in Scotland with particular depth in financial services leadership, legal and regulatory expertise, and public sector and government-facing roles.\n\nThe Edinburgh economy is anchored by financial services (asset management, insurance, banking, wealth management), legal and professional services, government and public sector, higher education and research, and tourism and hospitality. Major financial institutions including Baillie Gifford, Abrdn, Standard Life, and significant banking operations maintain substantial leadership teams in the city.\n\nEdinburgh's executive search market is characterized by deep expertise in financial services C-suite appointments, strong networks in legal and professional services leadership, and sophisticated governance and board-level search capability. The talent pool is well-educated, internationally experienced in many cases, and loyal to Edinburgh as a location — making retention easier but initial attraction more challenging.\n\nKey hiring dynamics include competition from established financial institutions with strong employer brands, salary expectations that reflect Edinburgh's cost of living but remain below London, and the importance of cultural fit and organizational reputation in attracting senior candidates. Financial services searches in Edinburgh are particularly relationship-dependent given the interconnected nature of the market.\n\nFor businesses recruiting Edinburgh-based executives, understanding the nuances of the financial services talent market, the importance of governance credentials, and the value placed on organizational stability and reputation is critical.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"CFO",link:"hire-cfo"},
      {title:"CRO",link:"hire-cro"},
      {title:"General Counsel",link:"hire-general-counsel"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"Non-Executive Director",link:"hire-ned"},
      {title:"Chair",link:"hire-chair"},
      {title:"Managing Director",link:"hire-ceo"}
    ]
  },
  {
    c:"Leeds",
    p:"Leeds is the largest legal and financial services center outside London, with significant strength in regional banking, insurance, legal services, retail headquarters, and professional services. The city has established itself as a major executive search market with depth across multiple sectors and a strong regional talent pool.\n\nThe Leeds economy spans financial services (regional banking, insurance, asset management), legal services (major national and international law firms), retail and consumer (headquarters and regional offices), digital and technology (growing tech sector), healthcare and life sciences, and professional services. The concentration of FTSE-listed businesses and PE portfolio companies in Yorkshire creates consistent demand for senior executive talent.\n\nLeeds' executive search market is characterized by strength in CFO and financial leadership searches, depth in legal and compliance appointments, and growing capability in technology and digital leadership as the sector expands. The talent pool combines locally-rooted executives with strong technical expertise and increasing inward migration from London and Manchester.\n\nKey hiring considerations include competition for proven commercial and revenue leadership talent (which remains more constrained than operational or financial talent), salary benchmarks that have risen significantly in technology and PE-backed businesses, and the importance of articulating career progression and development opportunities to attract candidates from larger markets.\n\nFor businesses recruiting in Leeds, understanding which talent pools are genuinely deep (finance, legal, operations) and which require broader geographic search (commercial leadership, technology) is essential to realistic hiring expectations.",
    roles:[
      {title:"CFO",link:"hire-cfo"},
      {title:"General Counsel",link:"hire-general-counsel"},
      {title:"CEO",link:"hire-ceo"},
      {title:"CRO",link:"hire-cro"},
      {title:"COO",link:"hire-coo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"Non-Executive Director",link:"hire-ned"},
      {title:"Managing Director",link:"hire-ceo"}
    ]
  },
  {
    c:"Bristol",
    p:"Bristol has emerged as one of the UK's most dynamic executive search markets outside London, with particular strength in technology and digital, aerospace and defense, media and creative industries, financial and professional services, and environmental and sustainability sectors. The city has established itself as a genuine alternative headquarters location for high-growth and scale-up businesses.\n\nThe Bristol and South West economy is characterized by a diverse base spanning aerospace and defense engineering, technology and digital (strong software and hardware sectors), media and creative industries, financial services, environmental technology and sustainability, and higher education and research. Major employers include Airbus, BAE Systems, significant technology scale-ups, and media production businesses.\n\nBristol's executive search market is distinguished by strong demand for CTO and technology leadership talent, depth in aerospace and engineering leadership, and growing sophistication in scale-up CEO and commercial leadership appointments. The talent pool combines strong local retention of university graduates (Bristol and Bath universities) with increasing inward migration from London as Bristol establishes itself as a quality-of-life destination.\n\nKey hiring dynamics include intense competition for proven technology leadership (particularly CTOs with scaling experience), aerospace and defense searches requiring security clearance and sector-specific expertise, and scale-up businesses competing for commercial leadership talent against well-funded competitors. Equity expectations in Bristol's technology sector have risen significantly.\n\nFor businesses recruiting Bristol-based executives, particularly in technology and aerospace, working with headhunters who have genuine local networks and understand the specific talent dynamics of the South West market is critical.",
    roles:[
      {title:"CTO",link:"hire-cto"},
      {title:"CEO",link:"hire-ceo"},
      {title:"COO",link:"hire-coo"},
      {title:"CRO",link:"hire-cro"},
      {title:"CMO",link:"hire-cmo"},
      {title:"CFO",link:"hire-cfo"},
      {title:"Managing Director",link:"hire-ceo"},
      {title:"Non-Executive Director",link:"hire-ned"}
    ]
  },
  {
    c:"Glasgow",
    p:"Glasgow is Scotland's largest city and most diverse economy, with significant executive search activity across financial services, technology and digital, healthcare and life sciences, manufacturing and engineering, higher education, and public sector. The city represents a substantial regional talent market with depth across operational, technical, and commercial leadership.\n\nThe Glasgow economy spans financial services (banking, insurance, asset management), technology and digital (growing software and fintech sectors), healthcare and life sciences (major hospital systems and pharmaceutical presence), advanced manufacturing and engineering, renewable energy and sustainability, and substantial public sector and higher education institutions. The presence of major corporate headquarters and PE-backed businesses creates consistent senior hiring demand.\n\nGlasgow's executive search market is characterized by strength in operational leadership searches (COO, Operations Directors, Engineering Directors), growing technology and digital capability, and depth in healthcare and public sector leadership appointments. The talent pool is operationally strong, technically credible in engineering and manufacturing, and increasingly sophisticated in commercial and technology roles.\n\nKey hiring considerations include competition for candidates who combine operational depth with strategic and commercial capability, salary expectations that reflect Scotland's market while remaining competitive with Edinburgh and Northern England, and the importance of organizational culture and values alignment in attracting senior talent in Glasgow's relationship-driven market.\n\nFor businesses recruiting Glasgow-based executives, understanding the strength in operational and technical talent pools and the relative constraints in pure commercial leadership is important for search strategy.",
    roles:[
      {title:"COO",link:"hire-coo"},
      {title:"CEO",link:"hire-ceo"},
      {title:"CTO",link:"hire-cto"},
      {title:"CFO",link:"hire-cfo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"Managing Director",link:"hire-ceo"},
      {title:"Operations Director",link:"hire-coo"},
      {title:"Non-Executive Director",link:"hire-ned"}
    ]
  },
  {
    c:"Cambridge",
    p:"Cambridge represents one of the UK's most specialized and sophisticated executive search markets, with world-leading depth in life sciences and biotechnology, technology and software, deeptech and hardware, medtech and diagnostics, and university spin-out and research commercialization. The city's unique ecosystem combines academic excellence, venture capital, and entrepreneurial capability in a concentrated geography.\n\nThe Cambridge economy is anchored by life sciences and biotechnology (one of Europe's largest clusters), technology and software (particularly AI, semiconductors, and enterprise software), medtech and diagnostics, academic research commercialization, and growing cleantech and sustainability sectors. The proximity and relationship with Cambridge University creates a continuous pipeline of spin-outs and research-led businesses requiring senior commercial and operational leadership.\n\nCambridge's executive search market is distinguished by demand for scientifically credible CEOs and Chief Scientific Officers, proven biotechnology CFOs who understand venture and institutional investor expectations, and commercial leaders (CROs, VPs Commercial) who can translate complex technology into market traction. The talent pool is globally competitive — Cambridge searches routinely compete with Oxford, Boston/Cambridge MA, and Bay Area opportunities.\n\nKey hiring dynamics include intense competition for candidates who combine scientific credibility with commercial and leadership capability, equity and compensation expectations influenced by US biotech markets, the critical importance of investor credibility and fundraising track record for CEO and CFO appointments, and the highly networked nature of the Cambridge ecosystem where reputation and referrals matter enormously.\n\nFor life sciences and deeptech businesses recruiting in Cambridge, working with headhunters who have genuine scientific networks, understand venture investor expectations, and can position opportunities credibly within the global life sciences talent market is essential.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"CTO",link:"hire-cto"},
      {title:"CFO",link:"hire-cfo"},
      {title:"CRO",link:"hire-cro"},
      {title:"Chief Scientific Officer",link:"hire-cto"},
      {title:"CMO",link:"hire-cmo"},
      {title:"Non-Executive Director",link:"hire-ned"},
      {title:"Chair",link:"hire-chair"}
    ]
  },
  {
    c:"Cardiff",
    p:"Cardiff is Wales' capital and primary commercial center, with executive search activity concentrated in public sector and government, financial services (particularly insurance and retail banking), media and broadcasting (significant BBC and S4C presence), professional services, and healthcare. The city represents the strongest executive talent market in Wales with particular depth in public sector leadership and regulated industries.\n\nThe Cardiff economy is anchored by public sector and government (Welsh Government, agencies, and related bodies), financial services (Admiral Group, Principality Building Society, major insurer presence), media and broadcasting, professional services (law, accounting, consulting), higher education, and healthcare (major hospital systems). The concentration of public sector and regulated businesses creates specific executive search dynamics.\n\nCardiff's executive search market is characterized by strength in public sector and government-facing leadership appointments, depth in financial services (particularly insurance), and growing commercial sector capability as Cardiff attracts more private sector headquarters. The talent pool is stable, locally rooted, and values organizational mission and public benefit alongside commercial considerations.\n\nKey hiring considerations include salary expectations that reflect Cardiff's cost base and public sector influence, the importance of cultural alignment and organizational values in attracting senior talent, competition from established institutions with strong employer brands, and the relatively smaller pool of proven commercial and technology leadership compared to operational and financial talent.\n\nFor businesses recruiting Cardiff-based executives, particularly in public sector, healthcare, and financial services, understanding the local market dynamics and the importance of mission and values alignment is critical.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"CFO",link:"hire-cfo"},
      {title:"Managing Director",link:"hire-ceo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"COO",link:"hire-coo"},
      {title:"General Counsel",link:"hire-general-counsel"},
      {title:"Non-Executive Director",link:"hire-ned"}
    ]
  },
  {
    c:"Newcastle",
    p:"Newcastle and the North East represent a significant regional executive search market with particular strength in energy (oil & gas, renewables, nuclear), technology and digital (growing software and digital sectors), advanced manufacturing and engineering, professional services, and healthcare and life sciences. The region's energy sector heritage combined with the energy transition creates unique talent dynamics.\n\nThe Newcastle and North East economy is anchored by energy (offshore wind, oil & gas services, nuclear), technology and digital (scale-up ecosystem and major corporate tech centers), advanced manufacturing (automotive, aerospace components), professional services, healthcare and life sciences, and higher education. The concentration of energy sector expertise and the growth of offshore wind development in the North Sea creates specific executive search requirements.\n\nNewcastle's executive search market is characterized by depth in energy sector leadership (particularly engineering, operations, and commercial roles), growing technology and digital capability, and strength in operational and manufacturing leadership. The talent pool combines deep energy sector expertise with increasing diversification into renewables and technology, and benefits from strong loyalty to the region among senior executives.\n\nKey hiring considerations include competition for proven energy transition leadership (candidates who bridge oil & gas and renewables), technology scale-up commercial leadership remaining more constrained than operational talent, salary expectations that are competitive regionally but below London and Scottish markets, and the importance of regional presence and long-term commitment in attracting senior candidates who value stability.\n\nFor businesses recruiting Newcastle-based executives, particularly in energy and technology, understanding the specific talent dynamics of the North East market and working with headhunters who have genuine regional networks is important.",
    roles:[
      {title:"CEO",link:"hire-ceo"},
      {title:"COO",link:"hire-coo"},
      {title:"CTO",link:"hire-cto"},
      {title:"CFO",link:"hire-cfo"},
      {title:"Operations Director",link:"hire-coo"},
      {title:"Managing Director",link:"hire-ceo"},
      {title:"Chief People Officer",link:"hire-cpo"},
      {title:"Non-Executive Director",link:"hire-ned"}
    ]
  }
];

const SECTORS = [
  {id:"financial-services",icon:"🏦",name:"Financial Services",desc:"Banking, asset management, insurance, private equity, wealth management",intro:"Financial services is one of the most active sectors for executive search in the UK. The breadth of the sector — spanning retail banking, investment management, insurance, private equity, wealth management, and fintech — means that the talent pools for senior roles are often narrow and highly contested.",roles:["CEO / Managing Director","CFO / Finance Director","CRO / Chief Risk Officer","CTO / Chief Digital Officer","Head of Compliance","Fund Manager / CIO","COO","General Counsel"],challenges:"Senior hiring in financial services is complicated by FCA/PRA Senior Managers and Certification Regime, extensive background verification obligations, and highly competitive compensation benchmarks.",whySearch:"The active candidate pool for director-level financial services roles is exceptionally small. The combination of regulatory scrutiny, confidentiality requirements, and the passive nature of the best talent makes retained executive search the standard approach.",fees:"25–33% of total compensation for most director and C-suite roles."},
  {id:"technology-digital",icon:"💻",name:"Technology & Digital",desc:"SaaS, fintech, cybersecurity, AI/ML, enterprise software",intro:"Technology is the fastest-moving executive search market in the UK. The pace of change in AI, cloud, cybersecurity, and software has created acute demand for senior leadership talent that significantly exceeds supply.",roles:["CTO / VP Engineering","CPO / VP Product","CISO / Head of Security","CRO / VP Sales","CEO (Scale-up)","CDO / Chief Data Officer","Head of AI/ML","VP / Director of Engineering"],challenges:"Technology leadership roles carry unique challenges: rapidly evolving skill requirements around AI and ML, equity benchmarks that vary enormously between early-stage and enterprise environments.",whySearch:"The most capable technology leaders are not looking. The best CTOs and CPOs are building products, not scanning job boards. Reaching them requires a network-led, research-driven approach.",fees:"25–33% of total compensation."},
  {id:"healthcare-life-sciences",icon:"🏥",name:"Healthcare & Life Sciences",desc:"Pharma, biotech, medtech, NHS, private healthcare",intro:"Healthcare and life sciences is a sector where the consequences of poor senior hiring are particularly acute. The sector spans global pharmaceutical businesses, early-stage biotech, medical devices, digital health, and NHS/public sector leadership.",roles:["CEO / General Manager","CMO / Chief Medical Officer","CSO / Chief Scientific Officer","CFO","VP Clinical Development","VP Commercial / Sales","Regulatory Affairs Director","Medical Director"],challenges:"Life sciences roles often require rare combinations of scientific credibility, commercial acumen, and regulatory understanding. The global nature of the talent market means UK searches frequently require international reach.",whySearch:"For biotech and pharma leadership, the addressable candidate pool is genuinely small and globally dispersed. Specialist sector knowledge and a built network are prerequisites.",fees:"25–33% of total compensation for commercial leadership roles."},
  {id:"energy-infrastructure",icon:"⚡",name:"Energy & Infrastructure",desc:"Oil & gas, renewables, utilities, infrastructure funds",intro:"The energy sector is undergoing its most significant structural transformation in a generation. The transition to renewables has created acute talent shortages and significant cross-sector movement.",roles:["CEO / MD","CFO","COO","CTO / Engineering Director","Commercial Director","Sustainability Director","Asset Management Director","Development Director (Renewables)"],challenges:"Energy leadership requires deep sector credibility alongside commercial and stakeholder management skills. The energy transition creates demand for leaders who can bridge technical expertise and commercial delivery.",whySearch:"The best energy leaders are in high demand and subject to significant retention efforts. A sector-specialist approach is required to reach them credibly.",fees:"25–33% of total compensation."},
  {id:"manufacturing-engineering",icon:"🏭",name:"Manufacturing & Engineering",desc:"Industrial, automotive, aerospace, advanced manufacturing",intro:"Manufacturing and engineering leadership in the UK spans traditional heavy industry, advanced manufacturing, aerospace and defence, and industrial technology.",roles:["CEO / MD","Operations Director / COO","Manufacturing Director","Engineering Director","Supply Chain Director","Finance Director","HR Director","Business Development Director"],challenges:"Manufacturing leadership talent is in short supply, particularly for roles combining engineering credibility with P&L ownership and strategic leadership.",whySearch:"The best manufacturing and engineering leaders are highly sought after and deeply embedded in their current businesses. A credible, personalised approach is required.",fees:"25–30% of total compensation."},
  {id:"retail-consumer",icon:"🛒",name:"Retail & Consumer",desc:"FMCG, retail, e-commerce, consumer brands",intro:"The retail and consumer sector has undergone profound disruption — the shift to omnichannel, D2C brands, and changing consumer behaviour have reshaped leadership requirements.",roles:["CEO / MD","CFO","CMO / Marketing Director","Commercial Director","Digital Director","Operations Director","Buying & Merchandising Director","Supply Chain Director"],challenges:"The pace of change means the half-life of relevant experience is shortening. Brand and P&L leadership at senior level remains relatively rare.",whySearch:"The best retail and consumer leaders are typically mid-search themselves — approached regularly and selective. Headhunters who know the sector open doors conventional channels cannot.",fees:"25–30% of total compensation."},
  {id:"real-estate-construction",icon:"🏗️",name:"Real Estate & Construction",desc:"Development, investment, infrastructure, facilities",intro:"Real estate and construction leadership encompasses property development and investment, facilities management, infrastructure delivery, and built environment technology.",roles:["CEO / MD","CFO","Development Director","Asset Management Director","Investment Director","Construction Director","Commercial Director","Head of Planning"],challenges:"Senior talent is often highly networked and relationship-driven. Discretion and deep sector knowledge are prerequisites.",whySearch:"The senior talent pool is relatively small and highly interconnected. The best candidates are introduced through trusted relationships, not advertising.",fees:"25–30% of total compensation."},
  {id:"professional-services",icon:"📚",name:"Professional Services",desc:"Consulting, legal, accounting, advisory",intro:"Professional services firms have distinct leadership hiring dynamics shaped by partnership structures, strong internal cultures, and the importance of client relationships.",roles:["Managing Partner / Senior Partner","Practice Head / Director","CFO / Finance Director","COO","BD / Sales Director","HR Director","CTO / IT Director","Client Services Director"],challenges:"Professional services leadership roles are often politically sensitive — involving partnership sign-off, client transfer considerations, and non-solicitation constraints.",whySearch:"In professional services, how you approach a candidate matters as much as what you offer. Specialist consultants who understand partnership dynamics deliver materially better results.",fees:"25–33% of total compensation."},
  {id:"education-public-sector",icon:"🎓",name:"Education & Public Sector",desc:"Higher education, government, charities, social enterprise",intro:"Leadership search in education, public sector, and not-for-profit requires a specialist approach. Governance structures, remuneration frameworks, and candidate motivations differ materially from the private sector.",roles:["Vice-Chancellor / Principal","CEO (charity / trust)","Director General","Finance Director","HR Director","Commercial Director","Director of Operations","Registrar / COO"],challenges:"Public sector and higher education searches often involve formal governance processes and public accountability requirements that shape the search methodology.",whySearch:"Identifying candidates with the right combination of sector credibility, leadership capability, and mission alignment requires proactive search.",fees:"20–28% of total compensation, reflecting public sector remuneration norms."},
  {id:"private-equity-vc",icon:"🚀",name:"Private Equity & VC",desc:"PE-backed portfolio companies, growth equity, venture",intro:"Private equity and venture capital portfolio companies represent some of the most demanding executive search assignments — high expectations, short timelines, and significant value at stake.",roles:["CEO / MD (portfolio company)","CFO","COO","Commercial Director / CRO","CTO","Chair (NED)","VP Finance / Financial Controller","Strategy Director"],challenges:"PE-backed searches are time-pressured and outcome-focused. Investors want candidates who have created value in comparable situations.",whySearch:"For PE portfolio appointments, the cost of a mis-hire directly impacts investment returns. The best candidates have PE track records and are highly sought after.",fees:"28–35% of total compensation for senior portfolio company appointments."},
  {id:"media-communications",icon:"📡",name:"Media & Communications",desc:"Broadcasting, publishing, PR, advertising, digital media",intro:"Media and communications leadership has been reshaped by the digital transition. Senior roles now require commercial creativity alongside rigorous data and technology literacy.",roles:["CEO / MD","Editor / Editorial Director","Commercial Director","Chief Content Officer","Digital Director","Head of Strategy","Finance Director","Audience / Marketing Director"],challenges:"The media sector is highly networked and reputation-driven. The right approach from someone credible in the sector is the difference between engagement and a polite decline.",whySearch:"Media leadership roles require rare combinations of creative authority, commercial drive, and digital fluency. A specialist headhunter with genuine media relationships surfaces candidates no database can reach.",fees:"25–30% of total compensation."},
  {id:"automotive-mobility",icon:"🚗",name:"Automotive & Mobility",desc:"OEM, EV transition, mobility platforms, supply chain",intro:"The automotive sector is in the midst of its most significant structural transition since the invention of the internal combustion engine. EV transition and mobility platforms are creating acute demand for new leadership profiles.",roles:["CEO / MD","COO / Operations Director","Engineering Director (EV)","Commercial Director","Supply Chain Director","CFO","HR Director","Head of Software / Connected Vehicles"],challenges:"Automotive leadership now requires software and technology leadership, sustainability credentials, and transformation management alongside day-to-day operations.",whySearch:"The combination of traditional automotive knowledge and new technology leadership capability is genuinely rare. Cross-sector search spanning tech and energy is increasingly required.",fees:"25–33% of total compensation."},
  {id:"aerospace-defence",icon:"✈️",name:"Aerospace & Defence",desc:"Commercial aerospace, defence contractors, MRO, aviation",intro:"The UK aerospace and defence sector is one of the most technically sophisticated and strategically critical industries in the economy. Leadership appointments combine deep technical expertise, security clearance requirements, government stakeholder management, and long-cycle commercial delivery. The sector spans prime contractors, tier-1 suppliers, MRO, commercial aviation, and emerging space-adjacent technologies.",roles:["CEO / Managing Director","COO / Operations Director","Engineering Director","Programme Director","Commercial Director / BD","CFO / Finance Director","Supply Chain Director","Head of Government Relations"],challenges:"Aerospace and defence leadership requires a rare combination of technical credibility, government relations acumen, and commercial delivery at scale. Security clearance requirements (SC / DV) can extend timelines. The talent pool is relatively small, highly networked, and concentrated in specific geographic clusters.",whySearch:"The best aerospace and defence leaders are deeply embedded in long-term programmes and loyal to their current organisations. Passive candidates dominate the senior talent pool. Reaching them requires sector credibility, an established network, and a nuanced understanding of career progression within the defence industrial base.",fees:"25–33% of total compensation."},
  {id:"space-security",icon:"🛰️",name:"Space & Security",desc:"Space technology, satellites, cyber security, national security",intro:"Space and security is the UK's fastest-growing strategic sector. The convergence of commercial space, satellite communications, cyber defence, and national security infrastructure has created a new category of senior leadership demand. Roles combine deep technical expertise, security clearance, investor relations, and government stakeholder management in a uniquely complex operating environment.",roles:["CEO / Founder-CEO","CTO / Chief Engineer","COO / Operations Director","Chief Scientist / CSO","Commercial Director","CFO (dual-use / defence)","Head of Government & Strategy","VP Engineering (Space Systems)"],challenges:"Space and security leadership requires extremely rare skill combinations — technical depth in aerospace or cyber, credibility with government and defence customers, investor or board management capability, and often Developed Vetting (DV) clearance. The addressable candidate pool is genuinely small and globally competitive. Many of the best candidates are in the US or continental Europe.",whySearch:"This is one of the most challenging talent markets in the UK. The number of individuals with the right combination of space/cyber technical background, commercial leadership experience, and active security clearance is measured in dozens, not hundreds. Proactive, research-led executive search with international reach is essential. Advertising will not surface credible candidates.",fees:"28–35% of total compensation, reflecting scarcity and international competition."}
];

const INDUSTRY_PAGES = [
  {id:"saas-scaleup",icon:"🚀",title:"Executive Search for SaaS Scale-Ups",subtitle:"Proven leadership talent for high-growth software companies",intro:"SaaS scale-ups face unique hiring challenges. You need executives who have scaled before, understand recurring revenue models, and can operate at the pace growth demands. The best candidates are building successful companies right now — not browsing job boards.",challenges:["Finding leaders with genuine 0-100 scaling experience","Competing for talent against well-funded competitors","Balancing equity vs cash compensation","Building exec teams that can grow with the company"],roles:["CEO (post-Series A/B)","CRO / VP Sales","CPO / VP Product","CTO / VP Engineering","CFO (pre-IPO ready)","CMO / VP Marketing"],whyUse:"The best SaaS executives are passive candidates receiving multiple approaches weekly. A specialist headhunter with a genuine SaaS network can reach candidates your LinkedIn searches cannot.",searchFee:"28–33% of total compensation",timeline:"8–14 weeks"},
  {id:"fintech",icon:"💳",title:"Executive Search for FinTech Companies",subtitle:"Leadership talent at the intersection of finance and technology",intro:"FinTech requires a rare combination: deep financial services credibility, technology fluency, regulatory understanding, and the ability to operate in a fast-moving environment. The talent pool that combines all four is exceptionally small.",challenges:["Finding leaders with both FS and tech backgrounds","Navigating FCA regulatory requirements","Competing against established banks and tech giants","Building credible leadership for investor confidence"],roles:["CEO","CFO (FCA approved)","CRO / Chief Risk Officer","CTO / Chief Technology Officer","CPO / Chief Product Officer","Head of Compliance"],whyUse:"FinTech executive searches require specialist knowledge of both financial services regulation and technology talent markets. Generic recruiters struggle with the nuance.",searchFee:"28–35% of total compensation",timeline:"12–16 weeks (allowing for regulatory approval)"},
  {id:"pe-portfolio",icon:"📊",title:"Executive Search for PE Portfolio Companies",subtitle:"Value creation leadership for private equity backed businesses",intro:"PE-backed businesses need executives who have created value in comparable situations. Not just strong operators — people who understand working with active investors, hitting defined milestones, and delivering against a clear investment thesis.",challenges:["Finding candidates with proven PE track records","Compressed timelines driven by deal dynamics","Structuring attractive management incentive plans","Balancing investor and management expectations"],roles:["CEO / Managing Director","CFO (PE experienced)","COO / Operations Director","Commercial Director / CRO","Transformation Director","Chair / NED"],whyUse:"The pool of executives with genuine PE value creation experience is small and well-known. A specialist PE headhunter has the relationships to reach them quickly.",searchFee:"28–35% of total compensation",timeline:"10–14 weeks"},
  {id:"climate-tech",icon:"🌱",title:"Executive Search for Climate Tech & Sustainability",subtitle:"Leadership for the energy transition and climate innovation",intro:"Climate tech is the defining opportunity of the next decade. Companies need leaders who combine technical credibility, commercial drive, and the ability to navigate complex stakeholder environments including government, investors, and corporates.",challenges:["Finding leaders with genuine climate/energy credentials","Balancing mission-driven culture with commercial delivery","Competing for talent in a rapidly growing sector","Building teams that can scale from 10 to 200+"],roles:["CEO / Founder-CEO","CTO / Chief Scientist","CFO (climate/impact investing ready)","Commercial Director","Head of Policy & Government Affairs","VP Engineering"],whyUse:"Climate tech talent is globally mobile and highly sought after. The best candidates are selective. A headhunter with genuine sector credibility opens doors advertising cannot.",searchFee:"28–33% of total compensation",timeline:"10–16 weeks"},
  {id:"biotech-pharma",icon:"🧬",title:"Executive Search for Biotech & Pharma",subtitle:"Scientific and commercial leadership for life sciences",intro:"Biotech and pharma leadership searches require rare combinations: scientific credibility, regulatory expertise, commercial acumen, and investor relations capability. The talent pool is global and the best candidates are deeply selective.",challenges:["Finding leaders with rare technical/commercial combinations","Navigating MHRA/FDA regulatory requirements","Global candidate pools requiring international search","Long lead times for senior appointments"],roles:["CEO / CSO","CMO / Chief Medical Officer","VP Clinical Development","CFO (biotech/pharma)","Head of Regulatory Affairs","VP Commercial"],whyUse:"The biotech executive talent pool is small, global, and relationship-driven. Specialist headhunters with genuine scientific networks deliver materially better results.",searchFee:"28–35% of total compensation",timeline:"14–20 weeks"},
  {id:"ecommerce-dtc",icon:"🛍️",title:"Executive Search for E-Commerce & D2C Brands",subtitle:"Digital-first leadership for consumer brands",intro:"E-commerce and D2C brands need leaders who understand performance marketing, supply chain, customer acquisition economics, and brand building. The best candidates are scaling brands right now — not actively looking.",challenges:["Finding leaders with genuine D2C scaling experience","Balancing growth and unit economics","Building teams that understand digital-first","Competing for talent against venture-backed competitors"],roles:["CEO / Managing Director","CMO / Head of Growth","COO / Operations Director","CFO","Head of E-Commerce","VP Supply Chain"],whyUse:"E-commerce leadership talent is in exceptionally high demand. The best candidates are passive and selective. A specialist headhunter reaches them credibly.",searchFee:"28–33% of total compensation",timeline:"10–14 weeks"},
  {id:"proptech",icon:"🏘️",title:"Executive Search for PropTech Companies",subtitle:"Leadership at the intersection of property and technology",intro:"PropTech requires a unique blend: real estate sector credibility, technology leadership, and the ability to navigate a traditionally conservative industry with innovation. The talent pool combining all three is small.",challenges:["Finding leaders who bridge real estate and tech","Building credibility with traditional property stakeholders","Fundraising in a capital-intensive sector","Competing against established property firms and tech startups"],roles:["CEO / Founder-CEO","CTO / VP Engineering","CFO","Commercial Director / Head of Partnerships","COO / Operations Director","Head of Product"],whyUse:"PropTech leadership requires specialist sector knowledge. Generic tech recruiters lack real estate credibility. Real estate recruiters lack tech depth. Specialists deliver both.",searchFee:"28–33% of total compensation",timeline:"12–16 weeks"},
  {id:"ai-machine-learning",icon:"🤖",title:"Executive Search for AI & Machine Learning Companies",subtitle:"Leadership talent for artificial intelligence businesses",intro:"AI and ML companies need executives who combine deep technical credibility, commercial vision, and the ability to build high-performance teams in a hyper-competitive talent market. The best candidates are globally mobile and exceptionally selective.",challenges:["Competing for scarce AI/ML leadership talent","Global talent pools requiring international reach","Equity expectations in a competitive market","Building teams that can attract top-tier technical talent"],roles:["CEO / Founder-CEO","Chief Scientist / Head of AI","CTO / VP Engineering","CPO / VP Product","CFO (AI/tech investors)","VP Commercial"],whyUse:"AI executive talent is global, scarce, and highly sought after. Passive candidates dominate. Specialist headhunters with AI networks deliver access generic recruiters cannot.",searchFee:"30–35% of total compensation",timeline:"12–18 weeks"},
  {id:"cybersecurity",icon:"🔐",title:"Executive Search for Cybersecurity Companies",subtitle:"Leadership for cyber defence and security",intro:"Cybersecurity requires executives with deep technical credibility, commercial acumen, and the ability to communicate complex threats to non-technical stakeholders. The talent pool is small, global, and in exceptionally high demand.",challenges:["Finding leaders with genuine cyber credentials","Security clearance requirements for some roles","Competing against well-funded competitors and consultancies","Building credible teams for enterprise sales"],roles:["CEO / Managing Director","CISO / Chief Security Officer","CTO / VP Engineering","VP Sales / CRO","CFO","Head of Threat Intelligence"],whyUse:"Cybersecurity leadership talent is globally competitive. The best candidates are passive. Specialist headhunters with cyber networks access candidates advertising cannot reach.",searchFee:"28–35% of total compensation",timeline:"12–16 weeks"},
  {id:"logistics-supply-chain",icon:"📦",title:"Executive Search for Logistics & Supply Chain",subtitle:"Operations leadership for complex distribution and fulfilment",intro:"Modern logistics and supply chain leadership requires a blend of operational excellence, technology fluency, and commercial acumen. E-commerce growth has intensified demand for executives who can scale operations rapidly.",challenges:["Finding leaders with genuine scaling experience","Technology transformation of traditional operations","Managing 3PL relationships and in-house capabilities","Building teams that balance cost and service"],roles:["COO / Operations Director","VP Supply Chain","CFO","Head of Logistics","Director of Fulfilment","MD / General Manager"],whyUse:"The best logistics and supply chain leaders are deeply operational and rarely active in the market. Specialist headhunters reach them through established networks.",searchFee:"25–30% of total compensation",timeline:"10–14 weeks"}
];

const SALARY = [
  {role:"CEO",low:100,mid:220,high:500},{role:"CFO",low:80,mid:160,high:350},
  {role:"COO",low:80,mid:155,high:320},{role:"CTO",low:85,mid:160,high:340},
  {role:"CMO",low:75,mid:130,high:260},{role:"CPO",low:75,mid:125,high:230},
  {role:"CHRO",low:75,mid:120,high:220},{role:"CRO",low:75,mid:135,high:260},
  {role:"Sales Director",low:70,mid:110,high:200},{role:"MD",low:80,mid:150,high:320},
  {role:"Finance Director",low:70,mid:105,high:190}
];

const FAQS = [
  {q:"What is the difference between a headhunter and a recruiter?",a:"A headhunter proactively researches and approaches senior candidates — including those not actively looking. A recruiter typically advertises and screens applications. Headhunters access the full talent market; recruiters access only the 15–20% actively job-seeking."},
  {q:"How much does a headhunter charge in the UK?",a:"Retained search fees: 25–35% of first-year total compensation, most commonly ~30%. Contingent fees: 15–25% on placement. A £200k role typically costs £50k–£70k in retained search fees."},
  {q:"How long does an executive search take?",a:"Typically 10–14 weeks for director-level roles. CEO and board searches: 16–20 weeks."},
  {q:"Do headhunters guarantee placements?",a:"Reputable retained firms offer a guarantee period of 6–12 months. If the placed candidate leaves within that period, the firm re-runs the search at no additional fee."},
  {q:"When should I use a headhunter instead of a recruitment agency?",a:"When the role is director level or above, confidentiality is required, the best candidates are unlikely to be actively looking, or previous agency campaigns have failed."},
  {q:"What is retained executive search?",a:"A model where the client pays in three instalments — on engagement, at shortlist, and on accepted offer — regardless of outcome. The headhunter is exclusively committed to the assignment."}
];

const ROLES_ESTIMATOR = [
  {label:"CEO / Managing Director",tier:3},{label:"CFO / Finance Director",tier:3},
  {label:"COO / Operations Director",tier:3},{label:"CTO / Technology Director",tier:3},
  {label:"CMO / Marketing Director",tier:2},{label:"CHRO / HR Director",tier:2},
  {label:"CRO / Revenue / Sales Director",tier:2},{label:"CPO / Product Director",tier:2},
  {label:"Sales Director",tier:2},{label:"Divisional / BU Director",tier:2},
  {label:"Board NED",tier:3},{label:"General Counsel / Legal Director",tier:2},
  {label:"Other Senior Role",tier:1}
];

const URGENCY = [
  {label:"Critical — 0–4 weeks",mult:1.1,weeks:"8–10 weeks"},
  {label:"Important — 1–3 months",mult:1.0,weeks:"10–14 weeks"},
  {label:"Planning — 3–6 months",mult:0.95,weeks:"10–16 weeks"},
  {label:"Exploratory",mult:0.9,weeks:"12–18 weeks"}
];

const SCOPE = [
  {label:"UK only",mult:1.0},{label:"UK + Europe",mult:1.08},
  {label:"International / Global",mult:1.15},{label:"Not sure yet",mult:1.0}
];

// ─── COMPONENTS ──────────────────────────────────────────────────────

function Btn({children,onClick,variant="primary",small=false}){
  const s = variant==="primary"
    ? {background:C.accent,color:"#fff",border:"none"}
    : variant==="gold"
    ? {background:C.gold,color:C.dark,border:"none"}
    : {background:"transparent",color:C.accent,border:`1.5px solid ${C.accent}`};
  return <button onClick={onClick} style={{...s,padding:small?"7px 14px":"11px 22px",borderRadius:6,fontSize:small?12:14,fontWeight:700,cursor:"pointer",transition:"opacity .15s"}}>{children}</button>;
}

function GoldBtn({children,onClick,small=false}){
  return <button onClick={onClick} style={{background:C.gold,color:C.dark,border:"none",padding:small?"7px 14px":"11px 22px",borderRadius:6,fontSize:small?12:14,fontWeight:700,cursor:"pointer"}}>{children}</button>;
}

function CalendlyBtn({children,small=false}){
  return <button onClick={()=>window.open(CALENDLY_URL,'_blank')} style={{background:`linear-gradient(135deg,${C.accent},${C.al})`,color:"#fff",border:"none",padding:small?"7px 14px":"12px 24px",borderRadius:6,fontSize:small?12:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 12px rgba(15,76,117,0.3)",transition:"transform 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>{children}</button>;
}

function CalendlyCTA({style={}}){
  return <div style={{background:`linear-gradient(135deg,${C.accent}11,${C.al}11)`,border:`2px solid ${C.accent}`,borderRadius:10,padding:"20px 24px",margin:"32px 0",...style}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
      <div style={{flex:1,minWidth:200}}>
        <h3 style={{fontSize:18,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>Ready to discuss your search?</h3>
        <p style={{fontSize:14,color:C.tl,margin:0}}>Book a free 15-minute consultation with a specialist</p>
      </div>
      <CalendlyBtn>Book Free Consultation →</CalendlyBtn>
    </div>
  </div>;
}

function CallbackBanner({go}){
  return <div style={{background:C.accent+"0D",border:`1px solid ${C.accent}22`,borderRadius:8,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:20}}>
    <div>
      <span style={{fontSize:13,fontWeight:600,color:C.dark}}>Speak to a specialist consultant</span>
      <span style={{fontSize:12,color:C.tl,marginLeft:8}}>Typical response within 2 hours</span>
    </div>
    <GoldBtn onClick={()=>go("contact")} small>Request a Callback →</GoldBtn>
  </div>;
}

function SectionTitle({title,sub}){
  return <div style={{textAlign:"center",marginBottom:32}}>
    <h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:750,color:C.dark,margin:"0 0 8px"}}>{title}</h2>
    {sub&&<p style={{fontSize:15,color:C.tl,margin:0}}>{sub}</p>}
  </div>;
}

function Card({children,onClick,style={}}){
  return <div onClick={onClick} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:10,padding:"20px 18px",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}

function BackBtn({label,onClick}){
  return <button onClick={onClick} style={{background:"none",border:"none",color:C.accent,fontSize:13,fontWeight:600,cursor:"pointer",padding:0,marginBottom:20}}>← {label||"Back"}</button>;
}

function renderBody(text){
  return text.split("\n\n").map((para,pi)=>{
    if(para.startsWith("|")){
      const rows=para.trim().split("\n").filter(r=>!r.match(/^\|[-\s|]+\|$/));
      return <div key={pi} style={{overflowX:"auto",margin:"14px 0"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          {rows.map((row,ri)=>{
            const cells=row.split("|").filter((_,ci)=>ci>0&&ci<row.split("|").length-1);
            const Tag=ri===0?"th":"td";
            return <tr key={ri} style={{background:ri===0?C.bl:ri%2===0?C.bg:C.card}}>
              {cells.map((c,ci)=><Tag key={ci} style={{padding:"8px 10px",textAlign:"left",borderBottom:`1px solid ${C.bd}`,fontWeight:ri===0?700:400,fontSize:12}}>{c.trim()}</Tag>)}
            </tr>;
          })}
        </table>
      </div>;
    }
    const lines=para.split("\n");
    return <p key={pi} style={{fontSize:14,lineHeight:1.75,color:C.tx,margin:"0 0 12px"}}>
      {lines.map((line,li)=>{
        const parts=line.split(/(\*\*[^*]+\*\*)/g);
        return <React.Fragment key={li}>
          {li>0&&<br/>}
          {parts.map((p,pj)=>p.startsWith("**")&&p.endsWith("**")?<strong key={pj}>{p.slice(2,-2)}</strong>:<React.Fragment key={pj}>{p}</React.Fragment>)}
        </React.Fragment>;
      })}
    </p>;
  });
}

// ─── PAGES ─────────────────────────────────────────────────────────────────

function HomePage({go}){
  const [fOpen,setFOpen]=useState(null);
  return <div>
    <section style={{background:`linear-gradient(135deg,${C.dark} 0%,${C.navy} 60%,${C.accent} 100%)`,padding:"100px 20px 70px",textAlign:"center"}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{display:"inline-block",background:C.gold+"22",border:`1px solid ${C.gold}44`,borderRadius:20,padding:"4px 14px",fontSize:12,color:C.gold,fontWeight:600,marginBottom:16}}>UK's leading executive search resource</div>
        <h1 style={{fontSize:"clamp(32px,5vw,58px)",fontWeight:800,color:"#fff",lineHeight:1.1,margin:"0 0 18px",letterSpacing:"-1px"}}>The UK's Authority on<br/><span style={{color:C.gold}}>Executive Search</span></h1>
        <p style={{fontSize:"clamp(15px,2vw,18px)",color:"#ffffffbb",lineHeight:1.6,margin:"0 0 32px"}}>Comprehensive guides, salary benchmarks, and free tools to help business leaders make better senior hiring decisions.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <CalendlyBtn>Book Free Consultation</CalendlyBtn>
          <GoldBtn onClick={()=>go("estimator")}>Calculate Your Fee</GoldBtn>
        </div>
        <p style={{fontSize:12,color:"#ffffff66",marginTop:14}}>⚡ Free 15-min consultation · No obligation · Expert advice</p>
      </div>
    </section>

    <div style={{background:C.accent,padding:"14px 20px",textAlign:"center"}}>
      <span style={{color:"#fff",fontSize:14,fontWeight:600}}>Ready to discuss your search? </span>
      <button onClick={()=>window.open(CALENDLY_URL,'_blank')} style={{background:C.gold,color:C.dark,border:"none",padding:"7px 16px",borderRadius:5,fontSize:13,fontWeight:700,cursor:"pointer",marginLeft:10,boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}>Book 15-Min Consultation (Free) →</button>
    </div>

    <section style={{padding:"56px 20px",background:C.bg}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="Knowledge Hub" sub="Eight definitive guides to executive search — written by practitioners"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {GUIDES.map(g=><Card key={g.id} onClick={()=>go("guide:"+g.id)}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{fontSize:26}}>{g.icon}</span>
              <span style={{background:C.accent+"15",color:C.accent,fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:4}}>{g.tag}</span>
            </div>
            <h3 style={{fontSize:15,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>{g.title}</h3>
            <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:"0 0 12px"}}>{g.subtitle}</p>
            <span style={{fontSize:12,color:C.tl}}>⏱ {g.time}</span>
          </Card>)}
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.card}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="How to Hire Executive Roles" sub="Complete guides with salary benchmarks, interview questions, and hiring strategies"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {INTENT_PAGES.filter(p=>p.responsibilities).map(p=><Card key={p.id} onClick={()=>go("intent:"+p.id)}>
            <span style={{fontSize:32,marginBottom:12,display:"block"}}>{p.icon}</span>
            <h3 style={{fontSize:16,fontWeight:700,color:C.dark,margin:"0 0 8px"}}>{p.title}</h3>
            <div style={{fontSize:13,color:C.tl,marginBottom:12,lineHeight:1.5}}>{p.intro.split('\n\n')[0].substring(0,140)}...</div>
            <div style={{display:"grid",gap:6,fontSize:12}}>
              <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${C.bl}`}}>
                <span style={{color:C.tl}}>Salary Range:</span>
                <span style={{fontWeight:600,color:C.accent}}>{p.salaryRange.split(' ')[0]}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:`1px solid ${C.bl}`}}>
                <span style={{color:C.tl}}>Timeline:</span>
                <span style={{fontWeight:600,color:C.dark}}>{p.timeline}</span>
              </div>
            </div>
          </Card>)}
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.bg}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="Free Tools" sub="Interactive calculators and decision aids for senior hiring"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {[
            {icon:"🧮",t:"Enhanced ROI Calculator",d:"Get a complete fee estimate with bad-hire cost breakdown and ROI analysis for your search.",pg:"estimator",gold:true},
            {icon:"❓",t:"Do I Need a Headhunter?",d:"5 questions, instant recommendation on whether retained search is the right approach for your hire.",pg:"quiz",gold:true},
            {icon:"📅",t:"Book Free Consultation",d:"15-minute call with a specialist consultant. Discuss your search requirements and get expert advice.",action:()=>window.open(CALENDLY_URL,'_blank'),gold:false},
            {icon:"📋",t:"Brief a Headhunter",d:"Submit your requirements and get a response within 2 hours during business hours.",pg:"contact",gold:false}
          ].map(tool=><Card key={tool.t} onClick={tool.action||(() =>go(tool.pg))}>
            <span style={{fontSize:28,marginBottom:10,display:"block"}}>{tool.icon}</span>
            <h3 style={{fontSize:15,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>{tool.t}</h3>
            <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:"0 0 14px"}}>{tool.d}</p>
            {tool.action?<CalendlyBtn small>Book Now →</CalendlyBtn>:<GoldBtn onClick={tool.action||(()=>go(tool.pg))} small>Open →</GoldBtn>}
          </Card>)}
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.bg}}>
      <div style={{maxWidth:820,margin:"0 auto"}}>
        <SectionTitle title="UK Senior Executive Salary Benchmarks 2026"/>
        <Card>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:C.bl}}>{["Role","Low","Mid","High"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:h==="Role"?"left":"right",fontWeight:700,color:C.dark,borderBottom:`1px solid ${C.bd}`,fontSize:12}}>{h}</th>)}</tr></thead>
              <tbody>{SALARY.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.bl}`}}>
                <td style={{padding:"9px 12px",fontWeight:600,color:C.dark}}>{r.role}</td>
                <td style={{padding:"9px 12px",textAlign:"right",color:C.tl}}>£{r.low}k</td>
                <td style={{padding:"9px 12px",textAlign:"right",color:C.accent,fontWeight:700}}>£{r.mid}k</td>
                <td style={{padding:"9px 12px",textAlign:"right",color:C.tl}}>£{r.high}k+</td>
              </tr>)}</tbody>
            </table>
          </div>
          <p style={{fontSize:11,color:C.tl,margin:"10px 0 0"}}>Base salary + anticipated annual bonus. UK market data, March 2026.</p>
        </Card>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.card}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="Industry Expertise" sub="Specialist search for high-growth sectors"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
          {INDUSTRY_PAGES.slice(0,6).map(p=><Card key={p.id} onClick={()=>go("industry:"+p.id)} style={{padding:"18px 16px"}}>
            <div style={{fontSize:28,marginBottom:8}}>{p.icon}</div>
            <h3 style={{fontSize:14,fontWeight:700,color:C.dark,margin:"0 0 4px"}}>{p.title.replace("Executive Search for ","")}</h3>
            <p style={{fontSize:12,color:C.tl,margin:0,lineHeight:1.4}}>{p.subtitle}</p>
          </Card>)}
        </div>
        <div style={{textAlign:"center",marginTop:20}}>
          <Btn onClick={()=>go("industries")}>View All Industries →</Btn>
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.bg}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="Executive Search by Sector"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:8}}>
          {SECTORS.map((s,i)=><Card key={i} onClick={()=>go("sector:"+s.id)} style={{padding:"14px 12px",textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:C.dark}}>{s.name}</div>
          </Card>)}
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.bg}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="Comparison Guides" sub="Understanding your options before you hire"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
          {COMPARISONS.map(c=><Card key={c.id} onClick={()=>go("compare:"+c.id)} style={{padding:"16px 14px"}}>
            <span style={{fontSize:22,marginBottom:6,display:"block"}}>{c.icon}</span>
            <h3 style={{fontSize:13,fontWeight:700,color:C.dark,margin:"0 0 4px"}}>{c.title}</h3>
            <p style={{fontSize:12,color:C.tl,margin:0,lineHeight:1.4}}>{c.subtitle.substring(0,80)}...</p>
          </Card>)}
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.card}}>
      <div style={{maxWidth:1140,margin:"0 auto"}}>
        <SectionTitle title="UK Locations" sub="Find headhunters across the UK"/>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {LOCS.map((l,i)=><button key={i} onClick={()=>go("loc:"+l.c.toLowerCase())} style={{background:C.bg,border:`1px solid ${C.bd}`,borderRadius:6,padding:"8px 18px",fontSize:13,fontWeight:600,color:C.dark,cursor:"pointer"}}>📍 {l.c}</button>)}
        </div>
      </div>
    </section>

    <section style={{padding:"48px 20px",background:C.bg}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <SectionTitle title="Frequently Asked Questions"/>
        {FAQS.map((f,i)=><div key={i} style={{borderBottom:`1px solid ${C.bd}`}}>
          <div onClick={()=>setFOpen(fOpen===i?null:i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",cursor:"pointer"}}>
            <span style={{fontSize:14,fontWeight:600,color:C.dark,paddingRight:12}}>{f.q}</span>
            <span style={{color:C.accent,fontWeight:700,fontSize:18,flexShrink:0}}>{fOpen===i?"−":"+"}</span>
          </div>
          {fOpen===i&&<p style={{fontSize:13,color:C.tl,lineHeight:1.65,paddingBottom:14,margin:0}}>{f.a}</p>}
        </div>)}
      </div>
    </section>

    <section style={{padding:"56px 20px",background:`linear-gradient(135deg,${C.dark},${C.accent})`,textAlign:"center"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:750,color:"#fff",margin:"0 0 8px"}}>Ready to start your search?</h2>
        <p style={{fontSize:16,color:"#ffffffbb",margin:"0 0 8px"}}>Book a free 15-minute consultation with a specialist.</p>
        <p style={{fontSize:13,color:C.gold,margin:"0 0 24px",fontWeight:600}}>⚡ No obligation · Expert advice · Available today</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <CalendlyBtn>Book Free Consultation</CalendlyBtn>
          <GoldBtn onClick={()=>go("estimator")}>Calculate Your Fee</GoldBtn>
        </div>
      </div>
    </section>
  </div>;
}

function GuidesPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1100,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Comprehensive Guides"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Expert guides covering every aspect of executive search and headhunting in the UK.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
      {GUIDES.map(g=><div key={g.id} onClick={()=>go(`guide:${g.id}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:32,marginBottom:12}}>{g.icon}</div>
        {g.tag&&<span style={{display:"inline-block",background:C.gold,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:4,marginBottom:8}}>{g.tag}</span>}
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{g.title}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:"0 0 12px"}}>{g.subtitle}</p>
        <div style={{fontSize:11,color:C.accent,fontWeight:600}}>{g.time} →</div>
      </div>)}
    </div>
  </div>;
}
function GuidePage({guide,go}){
  const midPoint=Math.floor(guide.sections.length/2);
  return <div style={{padding:"60px 20px 80px",maxWidth:800,margin:"0 auto"}}>
    <BackBtn label="All Guides" onClick={()=>go("guides")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>{guide.icon}</div>
      <h1 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{guide.title}</h1>
      <p style={{fontSize:16,color:C.tl,lineHeight:1.6,margin:"0 0 8px"}}>{guide.subtitle}</p>
      <div style={{fontSize:13,color:C.accent,fontWeight:600}}>{guide.time} • Updated {guide.updated}</div>
    </div>
    {guide.sections.map((s,i)=><React.Fragment key={i}>
      <div style={{marginBottom:36}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>{s.h}</h2>
        {s.b.split('\n\n').map((p,j)=>{
          if(p.startsWith('|'))return <table key={j} style={{width:"100%",borderCollapse:"collapse",margin:"16px 0",fontSize:14}}><tbody>{p.split('\n').filter(r=>!r.includes('---')).map((r,ri)=><tr key={ri}>{r.split('|').filter(c=>c.trim()).map((c,ci)=><td key={ci} style={{border:`1px solid ${C.bd}`,padding:8,background:ri===0?C.bl:"#fff",fontWeight:ri===0?600:400}}>{c.trim()}</td>)}</tr>)}</tbody></table>;
          if(p.startsWith('**'))return <div key={j} style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:6,padding:16,margin:"16px 0"}}>{p.split('\n').map((line,li)=>{const m=line.match(/^\*\*(.+?)\*\*\s*(.*)$/);return m?<p key={li} style={{margin:"0 0 8px",fontSize:14}}><strong style={{color:C.accent}}>{m[1]}</strong> {m[2]}</p>:<p key={li} style={{margin:"0 0 8px",fontSize:14}}>{line}</p>;})}</div>;
          return <p key={j} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:"0 0 16px"}}>{p}</p>;
        })}
      </div>
      {i===midPoint&&<CalendlyCTA/>}
    </React.Fragment>)}
    <div style={{marginTop:60,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <CalendlyBtn>Book Free Consultation</CalendlyBtn>
      <GoldBtn onClick={()=>go("estimator")}>Calculate Your Fee</GoldBtn>
    </div>
  </div>;
}
function QuizPage({go}){
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});

  const questions=[
    {q:"What is the seniority level of this role?",opts:[{t:"Director level or above",pts:3},{t:"Senior Manager",pts:2},{t:"Manager or below",pts:0}]},
    {q:"How critical is confidentiality?",opts:[{t:"Essential - cannot advertise publicly",pts:3},{t:"Important but not critical",pts:2},{t:"Not a major concern",pts:0}]},
    {q:"Have you previously advertised this role?",opts:[{t:"Yes, and it didn't work",pts:3},{t:"No, this is the first attempt",pts:1},{t:"Yes, and we got good candidates",pts:0}]},
    {q:"What is the cost of getting this hire wrong?",opts:[{t:"Very high - strategic impact",pts:3},{t:"Moderate - operational impact",pts:2},{t:"Low - easily reversible",pts:0}]},
    {q:"Are the best candidates likely to be actively looking?",opts:[{t:"No - they're passive/employed",pts:3},{t:"Mixed - some active, some passive",pts:2},{t:"Yes - active job seekers",pts:0}]}
  ];

  const ans=(pts)=>{setAnswers({...answers,[step]:pts});setStep(step+1);};
  const total=Object.values(answers).reduce((a,b)=>a+b,0);
  const complete=step>=questions.length;

  const getRecommendation=()=>{
    if(total>=10)return {rec:"Strong Yes",msg:"Your situation is exactly what retained executive search is designed for. The combination of seniority, confidentiality requirements, and the passive nature of the best candidates makes a headhunter the clear choice.",color:C.ok};
    if(total>=6)return {rec:"Probably Yes",msg:"Several factors suggest a headhunter would deliver better results than advertising alone. Consider a retained search or at minimum a hybrid model.",color:C.accent};
    if(total>=3)return {rec:"Consider It",msg:"A headhunter could add value, but advertising-first might be a reasonable starting point. If advertising doesn't work within 4–6 weeks, engage a headhunter.",color:C.gold};
    return {rec:"Probably Not",msg:"Your role characteristics suggest conventional recruitment channels may be sufficient. Save retained search fees for more senior or strategic appointments.",color:C.tl};
  };

  const result=complete?getRecommendation():null;

  return <div style={{padding:"60px 20px 80px",maxWidth:700,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>🎯</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>Do I Need a Headhunter?</h1>
      <p style={{fontSize:15,color:C.tl}}>Answer 5 questions to find out if retained executive search is right for your role.</p>
    </div>

    {!complete&&<div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{fontSize:13,color:C.tl,fontWeight:600,marginBottom:8}}>Question {step+1} of {questions.length}</div>
      <div style={{height:6,background:C.bl,borderRadius:3,marginBottom:24}}>
        <div style={{height:6,background:C.accent,borderRadius:3,width:`${((step+1)/questions.length)*100}%`,transition:"width 0.3s"}}/>
      </div>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 24px"}}>{questions[step].q}</h2>
      <div style={{display:"grid",gap:12}}>
        {questions[step].opts.map((o,i)=><div key={i} onClick={()=>ans(o.pts)} style={{padding:16,border:`2px solid ${C.bd}`,borderRadius:8,cursor:"pointer",transition:"all 0.2s",background:C.bg}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.background=C.card;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.background=C.bg;}}>
          <div style={{fontSize:15,fontWeight:600,color:C.tx}}>{o.t}</div>
        </div>)}
      </div>
    </div>}

    {complete&&result&&<div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:48,marginBottom:16}}>✓</div>
        <div style={{fontSize:14,color:C.tl,marginBottom:8}}>Your Score: {total} / 15</div>
        <h2 style={{fontSize:32,fontWeight:800,color:result.color,margin:"0 0 16px"}}>{result.rec}</h2>
        <p style={{fontSize:16,lineHeight:1.6,color:C.tx,margin:0}}>{result.msg}</p>
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <Btn onClick={()=>{setStep(0);setAnswers({});}}>Retake Quiz</Btn>
        <GoldBtn onClick={()=>go("contact")}>Brief a Headhunter →</GoldBtn>
      </div>
    </div>}
  </div>;
}

function EstimatorPage({go}){
  const [role,setRole]=useState("");
  const [salary,setSalary]=useState("");
  const [urgency,setUrgency]=useState(1);
  const [scope,setScope]=useState(0);
  const [showResult,setShowResult]=useState(false);

  const calc=()=>{
    if(!role||!salary)return null;
    const s=parseInt(salary.replace(/[^0-9]/g,''));
    if(isNaN(s)||s<1)return null;
    const tier=ROLES_ESTIMATOR.find(r=>r.label===role)?.tier||2;
    const base=tier===3?0.30:tier===2?0.28:0.25;
    const urg=URGENCY[urgency];
    const scp=SCOPE[scope];
    const fee=s*base*urg.mult*scp.mult;
    const badHireMin=s*3;
    const badHireMax=s*5;
    const vacancyCost=s*0.15*3;
    const productivityLoss=s*0.6;
    const teamImpact=s*0.25;
    const totalRisk=(badHireMin+badHireMax)/2+vacancyCost+productivityLoss+teamImpact;
    const roi=totalRisk/fee;
    return {fee:Math.round(fee),badHireMin,badHireMax,vacancyCost:Math.round(vacancyCost),productivityLoss:Math.round(productivityLoss),teamImpact:Math.round(teamImpact),totalRisk:Math.round(totalRisk),roi:Math.round(roi*10)/10,weeks:urg.weeks,pct:Math.round(base*urg.mult*scp.mult*100)};
  };

  const res=calc();

  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>💷</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>Enhanced ROI Fee Calculator</h1>
      <p style={{fontSize:15,color:C.tl}}>Calculate your search fee with full ROI analysis and bad hire cost breakdown</p>
    </div>

    <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{marginBottom:24}}>
        <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Role Level</label>
        <select value={role} onChange={e=>setRole(e.target.value)} style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
          <option value="">Select role...</option>
          {ROLES_ESTIMATOR.map(r=><option key={r.label} value={r.label}>{r.label}</option>)}
        </select>
      </div>

      <div style={{marginBottom:24}}>
        <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Annual Salary (£)</label>
        <input type="text" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="e.g., 150000" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:12}}>Urgency</label>
          <select value={urgency} onChange={e=>setUrgency(parseInt(e.target.value))} style={{width:"100%",padding:"12px 16px",fontSize:14,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
            {URGENCY.map((u,i)=><option key={i} value={i}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:12}}>Search Scope</label>
          <select value={scope} onChange={e=>setScope(parseInt(e.target.value))} style={{width:"100%",padding:"12px 16px",fontSize:14,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
            {SCOPE.map((s,i)=><option key={i} value={i}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <Btn onClick={()=>setShowResult(true)} style={{width:"100%",padding:"14px",fontSize:16,fontWeight:700}}>Calculate Fee & ROI Analysis</Btn>

      {showResult&&res&&<div style={{marginTop:32}}>
        <div style={{padding:24,background:`linear-gradient(135deg,${C.dark},${C.accent})`,borderRadius:8,color:"#fff",marginBottom:20}}>
          <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 16px",textAlign:"center"}}>Estimated Search Fee</h3>
          <div style={{fontSize:48,fontWeight:800,textAlign:"center",margin:"0 0 8px",color:C.gold}}>£{res.fee.toLocaleString()}</div>
          <div style={{fontSize:14,textAlign:"center",opacity:0.9}}>({res.pct}% of salary • {res.weeks})</div>
        </div>

        <div style={{background:C.bl,border:`2px solid ${C.red}33`,borderRadius:8,padding:24,marginBottom:20}}>
          <h3 style={{fontSize:18,fontWeight:700,color:C.red,margin:"0 0 16px"}}>Cost of a Bad Hire (Full Breakdown)</h3>

          <div style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,color:C.tx}}>Direct costs (severance, legal, rehire)</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.badHireMin.toLocaleString()}–£{res.badHireMax.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,color:C.tx}}>Vacancy cost (3 months at 15%)</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.vacancyCost.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,color:C.tx}}>Productivity loss (underperformance)</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.productivityLoss.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,borderBottom:`2px solid ${C.bd}`}}>
              <span style={{fontSize:14,color:C.tx}}>Team impact & turnover</span>
              <span style={{fontSize:16,fontWeight:700,color:C.red}}>£{res.teamImpact.toLocaleString()}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12}}>
              <span style={{fontSize:16,fontWeight:700,color:C.dark}}>Total Risk</span>
              <span style={{fontSize:22,fontWeight:800,color:C.red}}>£{res.totalRisk.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{background:`linear-gradient(135deg,${C.ok}22,${C.ok}11)`,border:`2px solid ${C.ok}`,borderRadius:8,padding:24,textAlign:"center"}}>
          <h3 style={{fontSize:18,fontWeight:700,color:C.ok,margin:"0 0 12px"}}>Return on Investment</h3>
          <div style={{fontSize:40,fontWeight:800,color:C.ok,marginBottom:8}}>{res.roi}× ROI</div>
          <p style={{fontSize:14,color:C.tx,margin:0,lineHeight:1.6}}>
            For every £1 spent on retained search, you get £{res.roi} in downside risk protection. This doesn't include the upside value of an exceptional hire.
          </p>
        </div>
      </div>}
    </div>

    <CalendlyCTA style={{marginTop:40}}/>
  </div>;
}
function StatsPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1000,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Executive Search Statistics"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Authoritative UK executive search data points — market benchmarks, timelines, and industry standards.
    </p>
    <div style={{display:"grid",gap:20}}>
      {STATS.map((st,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,display:"grid",gridTemplateColumns:"auto 1fr",gap:20,alignItems:"center"}}>
        <div style={{fontSize:"clamp(32px,4vw,48px)",fontWeight:800,color:C.accent,textAlign:"center",minWidth:140}}>{st.s}</div>
        <div>
          <p style={{fontSize:16,fontWeight:600,color:C.tx,margin:"0 0 6px",lineHeight:1.4}}>{st.l}</p>
          <p style={{fontSize:12,color:C.tl,margin:0,fontStyle:"italic"}}>Source: {st.src}</p>
        </div>
      </div>)}
    </div>
  </div>;
}
function GlossaryPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Executive Search Glossary"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Plain-English definitions of key executive search and headhunting terminology.
    </p>
    <div style={{display:"grid",gap:16}}>
      {GLOSSARY.map((g,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20}}>
        <h3 style={{fontSize:17,fontWeight:700,color:C.accent,margin:"0 0 8px"}}>{g.t}</h3>
        <p style={{fontSize:14,lineHeight:1.6,color:C.tx,margin:0}}>{g.d}</p>
      </div>)}
    </div>
  </div>;
}
function SectorsPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1100,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Sectors We Serve"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Deep sector expertise across 12 major industries.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20}}>
      {SECTORS.map(s=><div key={s.id} onClick={()=>go(`sector:${s.id}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:36,marginBottom:12}}>{s.icon}</div>
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{s.name}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:0}}>{s.desc}</p>
      </div>)}
    </div>
  </div>;
}
function SectorDetailPage({sector,go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Sectors" onClick={()=>go("sectors")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{sector.icon}</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{sector.name}</h1>
      <p style={{fontSize:16,color:C.tl,fontWeight:500}}>{sector.desc}</p>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      <h2 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 16px"}}>Overview</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{sector.intro}</p>
    </div>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Typical Roles</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
        {sector.roles.map((r,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:6,padding:"10px 14px",fontSize:14,fontWeight:500,color:C.tx}}>{r}</div>)}
      </div>
    </div>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Key Challenges</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx}}>{sector.challenges}</p>
    </div>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Why Use Executive Search</h2>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx}}>{sector.whySearch}</p>
    </div>

    <div style={{background:`linear-gradient(135deg,${C.dark}dd,${C.accent}dd)`,borderRadius:8,padding:24,color:"#fff"}}>
      <h3 style={{fontSize:17,fontWeight:700,margin:"0 0 8px"}}>Typical Fees</h3>
      <p style={{fontSize:15,margin:0,opacity:0.95}}>{sector.fees}</p>
    </div>

    <div style={{marginTop:60,textAlign:"center"}}>
      <GoldBtn onClick={()=>go("contact")}>Discuss Your {sector.name} Search →</GoldBtn>
    </div>
  </div>;
}
function ComparisonsPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1100,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Comparisons"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Side-by-side comparisons to help you choose the right approach for senior hiring.
    </p>
    <div style={{display:"grid",gap:20}}>
      {COMPARISONS.map(c=><div key={c.id} onClick={()=>go(`comparison:${c.id}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",display:"grid",gridTemplateColumns:"auto 1fr",gap:20,alignItems:"start"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:40}}>{c.icon}</div>
        <div>
          <h3 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{c.title}</h3>
          <p style={{fontSize:14,color:C.tl,lineHeight:1.5,margin:0}}>{c.subtitle}</p>
        </div>
      </div>)}
    </div>
  </div>;
}

function ComparisonPage({comp,go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Comparisons" onClick={()=>go("comparisons")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{comp.icon}</div>
      <h1 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{comp.title}</h1>
      <p style={{fontSize:16,color:C.tl,lineHeight:1.6,fontWeight:500}}>{comp.subtitle}</p>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      {comp.intro.split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:i===0?"0 0 16px":"16px 0"}}>{p}</p>)}
    </div>

    {comp.table&&<div style={{marginBottom:32,overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
        <tbody>
          {comp.table.map((row,i)=><tr key={i} style={{background:i===0?C.accent:i%2===1?C.bg:C.card}}>
            {row.map((cell,j)=><td key={j} style={{padding:12,border:`1px solid ${C.bd}`,color:i===0?"#fff":C.tx,fontWeight:i===0||j===0?600:400}}>{cell}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>}

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 12px"}}>Verdict</h3>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{comp.verdict}</p>
    </div>

    <CalendlyCTA/>

    <div style={{marginTop:40,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <GoldBtn onClick={()=>go("contact")}>{comp.cta} →</GoldBtn>
      <Btn onClick={()=>go("estimator")}>Calculate Fee</Btn>
    </div>
  </div>;
}
function IntentPage({page,go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:800,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{page.icon}</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 20px"}}>{page.title}</h1>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      {page.intro.split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:i===0?"0 0 16px":"16px 0"}}>{p}</p>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:32}}>
      <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20}}>
        <div style={{fontSize:12,color:C.tl,fontWeight:600,marginBottom:4}}>Salary Range</div>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{page.salaryRange}</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20}}>
        <div style={{fontSize:12,color:C.tl,fontWeight:600,marginBottom:4}}>Search Fee</div>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{page.searchFee}</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20}}>
        <div style={{fontSize:12,color:C.tl,fontWeight:600,marginBottom:4}}>Timeline</div>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{page.timeline}</div>
      </div>
    </div>

    {page.responsibilities && <>
      <div style={{marginBottom:32}}>
        <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Typical Responsibilities</h2>
        <ul style={{fontSize:15,lineHeight:1.8,color:C.tx,margin:0,paddingLeft:20}}>
          {page.responsibilities.map((r,i)=><li key={i} style={{marginBottom:10}}>{r}</li>)}
        </ul>
      </div>
    </>}

    {page.keyQualities && <>
      <div style={{marginBottom:32}}>
        <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Key Qualities to Look For</h2>
        <div style={{display:"grid",gap:12}}>
          {page.keyQualities.map((q,i)=>{
            const [label,...rest]=q.split(':');
            return <div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:16}}>
              <div style={{fontWeight:700,color:C.accent,marginBottom:4}}>{label}</div>
              <div style={{fontSize:14,lineHeight:1.6,color:C.tx}}>{rest.join(':').trim()}</div>
            </div>;
          })}
        </div>
      </div>
    </>}

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Key Considerations</h2>
      <ul style={{fontSize:15,lineHeight:1.8,color:C.tx,margin:0,paddingLeft:20}}>
        {page.considerations.map((c,i)=><li key={i} style={{marginBottom:10}}>{c}</li>)}
      </ul>
    </div>

    {page.interviewQuestions && <>
      <div style={{marginBottom:32}}>
        <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Interview Questions to Ask</h2>
        <div style={{display:"grid",gap:12}}>
          {page.interviewQuestions.map((q,i)=><div key={i} style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:16}}>
            <div style={{fontSize:14,lineHeight:1.7,color:C.tx,fontWeight:500}}>{q}</div>
          </div>)}
        </div>
      </div>
    </>}

    {page.hiringGuide && <>
      <div style={{marginBottom:32}}>
        <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Step-by-Step Hiring Guide</h2>
        <div style={{display:"grid",gap:16}}>
          {page.hiringGuide.map((step,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderLeft:`4px solid ${C.accent}`,borderRadius:8,padding:20}}>
            <div style={{display:"flex",alignItems:"start",gap:12}}>
              <div style={{background:C.accent,color:"#fff",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:C.tx,marginBottom:6,fontSize:15}}>{step.step}</div>
                <div style={{fontSize:14,lineHeight:1.7,color:C.tl}}>{step.detail}</div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </>}

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 12px"}}>Why Use Executive Search</h3>
      {page.whySearch.split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:i===0?"0":"16px 0 0"}}>{p}</p>)}
    </div>

    <CalendlyCTA/>

    <div style={{marginTop:40,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <GoldBtn onClick={()=>go("contact")}>Brief a {page.role} Search →</GoldBtn>
      <Btn onClick={()=>go("estimator")}>Calculate Fee</Btn>
    </div>
  </div>;
}

function IndustryPage({page,go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="Industries" onClick={()=>go("industries")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:56,marginBottom:12}}>{page.icon}</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{page.title}</h1>
      <p style={{fontSize:16,color:C.tl,lineHeight:1.6,fontWeight:500}}>{page.subtitle}</p>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{page.intro}</p>
    </div>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Key Challenges</h2>
      <ul style={{fontSize:15,lineHeight:1.8,color:C.tx,margin:0,paddingLeft:20}}>
        {page.challenges.map((c,i)=><li key={i} style={{marginBottom:10}}>{c}</li>)}
      </ul>
    </div>

    <CalendlyCTA/>

    <div style={{marginBottom:32}}>
      <h2 style={{fontSize:20,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>Typical Roles We Fill</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {page.roles.map((r,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:6,padding:"12px 16px",fontSize:14,fontWeight:500,color:C.tx}}>{r}</div>)}
      </div>
    </div>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 12px"}}>Why Use Specialist Executive Search</h3>
      <p style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:0}}>{page.whyUse}</p>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:40}}>
      <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20}}>
        <div style={{fontSize:12,color:C.tl,fontWeight:600,marginBottom:4}}>Typical Search Fee</div>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{page.searchFee}</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20}}>
        <div style={{fontSize:12,color:C.tl,fontWeight:600,marginBottom:4}}>Timeline</div>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{page.timeline}</div>
      </div>
    </div>

    <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <CalendlyBtn>Book Free Consultation</CalendlyBtn>
      <GoldBtn onClick={()=>go("estimator")}>Calculate Your Fee</GoldBtn>
    </div>
  </div>;
}

function IndustriesPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1100,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Industry Expertise" sub="Specialist executive search for high-growth sectors"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20}}>
      {INDUSTRY_PAGES.map(p=><div key={p.id} onClick={()=>go(`industry:${p.id}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:36,marginBottom:12}}>{p.icon}</div>
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{p.title}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:0}}>{p.subtitle}</p>
      </div>)}
    </div>
  </div>;
}
function BlogPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1100,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Insights & Analysis"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      In-depth perspectives on executive search, leadership hiring, and talent strategy.
    </p>
    <div style={{display:"grid",gap:24}}>
      {BLOG_ARTICLES.map(a=><div key={a.id} onClick={()=>go(`blog:${a.id}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
          <span style={{display:"inline-block",background:C.accent,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:4}}>{a.tag}</span>
          <span style={{fontSize:12,color:C.tl}}>{a.date} • {a.readTime}</span>
        </div>
        <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"0 0 10px"}}>{a.title}</h2>
        <p style={{fontSize:15,color:C.tl,lineHeight:1.6,margin:"0 0 12px"}}>{a.subtitle}</p>
        <div style={{fontSize:13,color:C.accent,fontWeight:600}}>Read More →</div>
      </div>)}
    </div>
  </div>;
}
function BlogArticlePage({article,go}){
  const midPoint=Math.floor(article.sections.length/2);
  return <div style={{padding:"60px 20px 80px",maxWidth:800,margin:"0 auto"}}>
    <BackBtn label="All Insights" onClick={()=>go("blog")}/>
    <div style={{marginBottom:32}}>
      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <span style={{display:"inline-block",background:C.accent,color:"#fff",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:4}}>{article.tag}</span>
        <span style={{fontSize:13,color:C.tl}}>{article.date} • {article.readTime}</span>
      </div>
      <h1 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>{article.title}</h1>
      <p style={{fontSize:17,color:C.tl,lineHeight:1.6,fontWeight:500,margin:0}}>{article.subtitle}</p>
    </div>
    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,marginBottom:32}}>
      {article.intro.split('\n\n').map((p,i)=><p key={i} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:i===0?"0 0 16px":"16px 0"}}>{p}</p>)}
    </div>
    {article.sections.map((s,i)=><React.Fragment key={i}>
      <div style={{marginBottom:36}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"0 0 16px",borderBottom:`2px solid ${C.accent}`,paddingBottom:8}}>{s.h}</h2>
        {s.b.split('\n\n').map((p,j)=>{
          if(p.startsWith('**Total:'))return <div key={j} style={{background:C.gold+"11",border:`2px solid ${C.gold}`,borderRadius:6,padding:20,margin:"16px 0",fontSize:17,fontWeight:700,color:C.tx,textAlign:"center"}}>{p.replace(/\*\*/g,'')}</div>;
          if(p.startsWith('-'))return <ul key={j} style={{fontSize:15,lineHeight:1.8,color:C.tx,margin:"16px 0",paddingLeft:20}}>{p.split('\n').map((li,k)=><li key={k} style={{marginBottom:8}}>{li.replace(/^- /,'')}</li>)}</ul>;
          if(p.includes('**'))return <p key={j} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:"16px 0"}}>{p.split('**').map((t,ti)=>ti%2===1?<strong key={ti} style={{fontWeight:700,color:C.accent}}>{t}</strong>:t)}</p>;
          return <p key={j} style={{fontSize:15,lineHeight:1.7,color:C.tx,margin:"16px 0"}}>{p}</p>;
        })}
      </div>
      {i===midPoint&&<CalendlyCTA/>}
    </React.Fragment>)}
    <div style={{marginTop:60,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
      <CalendlyBtn>Book Free Consultation</CalendlyBtn>
      <GoldBtn onClick={()=>go("estimator")}>Calculate Fee & ROI</GoldBtn>
    </div>
  </div>;
}
function LocationsPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:1200,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="UK Locations"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Executive search expertise across major UK cities and regions.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
      {LOCS.map(l=><div key={l.c} onClick={()=>go(`loc:${l.c.toLowerCase()}`)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{l.c}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:"0 0 10px"}}>{l.p}</p>
        <div style={{fontSize:11,color:C.accent,fontWeight:600}}>View Details →</div>
      </div>)}
    </div>
  </div>;
}
function LocationPage({loc,go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="All Locations" onClick={()=>go("locations")}/>
    <h1 style={{fontSize:"clamp(30px,5vw,42px)",fontWeight:750,color:C.tx,margin:"0 0 12px",textAlign:"center"}}>Executive Search in {loc.c}</h1>
    <p style={{fontSize:14,color:C.tl,textAlign:"center",margin:"0 0 32px"}}>Specialist headhunters for senior appointments in {loc.c}</p>

    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:28,marginBottom:32}}>
      {renderBody(loc.p)}
    </div>

    <div style={{marginBottom:40}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.tx,margin:"0 0 20px",borderBottom:`2px solid ${C.accent}`,paddingBottom:10}}>Typical Executive Roles in {loc.c}</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
        {loc.roles.map((r,i)=><div key={i} onClick={()=>go("guide:"+r.link)} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:"12px 16px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.background=C.accent+"08";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bd;e.currentTarget.style.background=C.card;}}>
          <span style={{fontSize:14,fontWeight:600,color:C.dark}}>{r.title}</span>
          <div style={{fontSize:11,color:C.accent,marginTop:4,fontWeight:600}}>View Guide →</div>
        </div>)}
      </div>
    </div>

    <CalendlyCTA/>

    <div style={{marginTop:40,textAlign:"center"}}>
      <GoldBtn onClick={()=>go("contact")}>Request a Callback for Your {loc.c} Search →</GoldBtn>
    </div>
  </div>;
}
function ResourcesPage({go}){
  const resources=[
    {title:"Fee Estimator",desc:"Calculate the cost of a retained executive search",icon:"💷",action:()=>go("estimator")},
    {title:"Do I Need a Headhunter?",desc:"5-question quiz to help you decide",icon:"🎯",action:()=>go("quiz")},
    {title:"Comprehensive Guides",desc:"Expert guides on executive search",icon:"📚",action:()=>go("guides")},
    {title:"UK Statistics",desc:"Authoritative data on executive search",icon:"📊",action:()=>go("stats")},
    {title:"Glossary",desc:"Executive search terminology explained",icon:"📖",action:()=>go("glossary")},
    {title:"Salary Benchmarks",desc:"UK senior executive salary ranges",icon:"💰",action:()=>go("salaries")}
  ];

  return <div style={{padding:"60px 20px 80px",maxWidth:1000,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <SectionTitle title="Resources"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Tools, data, and guides to support your senior hiring decisions.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
      {resources.map((r,i)=><div key={i} onClick={r.action} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:24,cursor:"pointer",transition:"all 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor=C.accent;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)";e.currentTarget.style.borderColor=C.bd;}}>
        <div style={{fontSize:40,marginBottom:12}}>{r.icon}</div>
        <h3 style={{fontSize:18,fontWeight:700,color:C.tx,margin:"0 0 8px"}}>{r.title}</h3>
        <p style={{fontSize:13,color:C.tl,lineHeight:1.5,margin:0}}>{r.desc}</p>
      </div>)}
    </div>
  </div>;
}
function ContactPage({go}){
  const [form,setForm]=useState({name:"",email:"",company:"",role:"",salary:"",urgency:"",message:""});
  const [submitted,setSubmitted]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState("");

  const update=(k,v)=>setForm({...form,[k]:v});

  const submit=async(e)=>{
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-enquiry`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send enquiry");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Unable to send your enquiry. Please try again or email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if(submitted){
    return <div style={{padding:"60px 20px 80px",maxWidth:600,margin:"0 auto",textAlign:"center"}}>
      <div style={{fontSize:64,marginBottom:20}}>✓</div>
      <h1 style={{fontSize:32,fontWeight:750,color:C.ok,margin:"0 0 16px"}}>Thank You</h1>
      <p style={{fontSize:16,color:C.tx,lineHeight:1.6,marginBottom:24}}>
        Your brief has been received. A specialist consultant will be in touch within 2 hours during business hours.
      </p>
      <Btn onClick={()=>go("home")}>← Back to Home</Btn>
    </div>;
  }

  return <div style={{padding:"60px 20px 80px",maxWidth:700,margin:"0 auto"}}>
    <BackBtn label="Home" onClick={()=>go("home")}/>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{fontSize:48,marginBottom:12}}>📋</div>
      <h1 style={{fontSize:"clamp(28px,4vw,38px)",fontWeight:750,color:C.tx,margin:"0 0 12px"}}>Brief a Headhunter</h1>
      <p style={{fontSize:15,color:C.tl}}>Tell us about your search and a specialist consultant will be in touch.</p>
      <p style={{fontSize:13,color:C.gold,fontWeight:600,margin:"8px 0 0"}}>⚡ Typical response within 2 hours</p>
    </div>

    <form onSubmit={submit} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:32}}>
      <div style={{display:"grid",gap:20}}>
        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Your Name *</label>
          <input required type="text" value={form.name} onChange={e=>update("name",e.target.value)} placeholder="John Smith" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Email Address *</label>
          <input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="john.smith@company.com" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Company</label>
          <input type="text" value={form.company} onChange={e=>update("company",e.target.value)} placeholder="Company name" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Role You're Hiring For *</label>
          <input required type="text" value={form.role} onChange={e=>update("role",e.target.value)} placeholder="e.g., CFO, Sales Director, CTO" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Salary Range</label>
            <input type="text" value={form.salary} onChange={e=>update("salary",e.target.value)} placeholder="e.g., £120k-£150k" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}/>
          </div>
          <div>
            <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Timeline</label>
            <select value={form.urgency} onChange={e=>update("urgency",e.target.value)} style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx}}>
              <option value="">Select...</option>
              <option value="critical">Critical (0-4 weeks)</option>
              <option value="important">Important (1-3 months)</option>
              <option value="planning">Planning (3-6 months)</option>
              <option value="exploratory">Exploratory</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{display:"block",fontSize:14,fontWeight:600,color:C.tx,marginBottom:8}}>Brief Description</label>
          <textarea value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Tell us about the role, your organisation, and what you're looking for..." rows="5" style={{width:"100%",padding:"12px 16px",fontSize:15,border:`1px solid ${C.bd}`,borderRadius:6,background:C.bg,color:C.tx,fontFamily:"inherit",resize:"vertical"}}/>
        </div>

        <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:6,padding:16,fontSize:13,color:C.tl,lineHeight:1.6}}>
          <strong style={{color:C.tx}}>What happens next:</strong> A specialist consultant will review your brief and contact you within 2 hours during business hours to discuss your search.
        </div>

        {error && (
          <div style={{background:"#fee",border:"1px solid #fcc",borderRadius:6,padding:16,fontSize:14,color:"#c33"}}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} style={{width:"100%",padding:"14px",fontSize:16,fontWeight:700,background:submitting?"#ccc":`linear-gradient(135deg,${C.gold},${C.gold}dd)`,color:"#fff",border:"none",borderRadius:6,cursor:submitting?"not-allowed":"pointer",transition:"all 0.2s",opacity:submitting?0.6:1}} onMouseEnter={e=>!submitting&&(e.currentTarget.style.transform="translateY(-2px)")} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          {submitting ? "Sending..." : "Submit Brief →"}
        </button>
      </div>
    </form>
  </div>;
}
function SalaryPage({go}){
  return <div style={{padding:"60px 20px 80px",maxWidth:900,margin:"0 auto"}}>
    <BackBtn label="Resources" onClick={()=>go("resources")}/>
    <SectionTitle title="UK Executive Salary Benchmarks"/>
    <p style={{fontSize:15,color:C.tl,maxWidth:700,margin:"0 auto 40px",textAlign:"center"}}>
      Typical salary ranges for senior executive roles in the UK (updated quarterly).
    </p>
    <div style={{background:C.bl,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,marginBottom:32,fontSize:13,color:C.tx}}>
      <strong>Note:</strong> Ranges reflect base salary only and exclude bonuses, equity, and benefits. Total compensation packages typically add 20–50% depending on role and sector.
    </div>
    <div style={{display:"grid",gap:16}}>
      {SALARY.map((s,i)=><div key={i} style={{background:C.card,border:`1px solid ${C.bd}`,borderRadius:8,padding:20,display:"grid",gridTemplateColumns:"1fr auto auto auto",gap:16,alignItems:"center"}}>
        <div style={{fontSize:16,fontWeight:700,color:C.tx}}>{s.role}</div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,color:C.tl,marginBottom:2}}>Lower Quartile</div>
          <div style={{fontSize:15,fontWeight:600,color:C.tx}}>£{s.low}k</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,color:C.tl,marginBottom:2}}>Median</div>
          <div style={{fontSize:15,fontWeight:600,color:C.accent}}>£{s.mid}k</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:11,color:C.tl,marginBottom:2}}>Upper Quartile</div>
          <div style={{fontSize:15,fontWeight:600,color:C.tx}}>£{s.high}k</div>
        </div>
      </div>)}
    </div>
    <div style={{marginTop:40,textAlign:"center"}}>
      <p style={{fontSize:14,color:C.tl,marginBottom:20}}>Need a precise fee estimate for your role?</p>
      <GoldBtn onClick={()=>go("estimator")}>Use Fee Estimator →</GoldBtn>
    </div>
  </div>;
}

function LlmsTxtPage(){return <div style={{padding:"60px 20px"}}><pre>{LLMS_TXT}</pre></div>;}

// ─── APP SHELL ────────────────────────────────────────────────────────

export default function App(){
  const [page,setPage]=useState("home");
  const [menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{
    const script=document.createElement("script");
    script.type="application/ld+json";
    script.text=JSON.stringify(SCHEMA_ORG);
    document.head.appendChild(script);
    return ()=>{try{document.head.removeChild(script);}catch(e){}};
  },[]);

  const go=useCallback(pg=>{setPage(pg);setMenuOpen(false);window.scrollTo({top:0,behavior:"smooth"});},[]);

  const navItems=[["home","Home"],["guides","Guides"],["industries","Industries"],["sectors","Sectors"],["comparisons","Comparisons"],["blog","Insights"],["locations","Locations"],["glossary","Glossary"],["statistics","Stats"],["resources","Resources"],["quiz","Do I Need a Headhunter?"],["estimator","Fee Calculator"],["contact","Brief a Headhunter"]];

  const getPage=()=>{
    if(page.startsWith("guide:")){const g=GUIDES.find(x=>x.id===page.slice(6));return g?<GuidePage guide={g} go={go}/>:<GuidesPage go={go}/>;}
    if(page.startsWith("loc:")){const l=LOCS.find(x=>x.c.toLowerCase()===page.slice(4));return l?<LocationPage loc={l} go={go}/>:<LocationsPage go={go}/>;}
    if(page.startsWith("sector:")){const s=SECTORS.find(x=>x.id===page.slice(7));return s?<SectorDetailPage sector={s} go={go}/>:<SectorsPage go={go}/>;}
    if(page.startsWith("comparison:")){const c=COMPARISONS.find(x=>x.id===page.slice(11));return c?<ComparisonPage comp={c} go={go}/>:<ComparisonsPage go={go}/>;}
    if(page.startsWith("blog:")){const a=BLOG_ARTICLES.find(x=>x.id===page.slice(5));return a?<BlogArticlePage article={a} go={go}/>:<BlogPage go={go}/>;}
    if(page.startsWith("intent:")){const p=INTENT_PAGES.find(x=>x.id===page.slice(7));return p?<IntentPage page={p} go={go}/>:<HomePage go={go}/>;}
    if(page.startsWith("industry:")){const i=INDUSTRY_PAGES.find(x=>x.id===page.slice(9));return i?<IndustryPage page={i} go={go}/>:<IndustriesPage go={go}/>;}
    const map={home:<HomePage go={go}/>,guides:<GuidesPage go={go}/>,quiz:<QuizPage go={go}/>,estimator:<EstimatorPage go={go}/>,statistics:<StatsPage go={go}/>,glossary:<GlossaryPage go={go}/>,sectors:<SectorsPage go={go}/>,comparisons:<ComparisonsPage go={go}/>,locations:<LocationsPage go={go}/>,blog:<BlogPage go={go}/>,resources:<ResourcesPage go={go}/>,contact:<ContactPage go={go}/>,salaries:<SalaryPage go={go}/>,industries:<IndustriesPage go={go}/>,llmstxt:<LlmsTxtPage/>};
    return map[page]||<HomePage go={go}/>;
  };

  const navPg=page.split(":")[0];

  return <div style={{fontFamily:"Inter,-apple-system,BlinkMacSystemFont,sans-serif",color:C.tx,background:C.bg,minHeight:"100vh"}}>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(26,26,46,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.accent}33`}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 18px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
        <div onClick={()=>go("home")} style={{cursor:"pointer"}}>
          <span style={{fontSize:16,fontWeight:800,color:"#fff"}}>headhunters</span>
          <span style={{fontSize:16,fontWeight:800,color:C.gold}}>.co.uk</span>
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",color:"#fff",fontSize:20,cursor:"pointer",padding:"4px 8px"}}>☰</button>
      </div>
      {menuOpen&&<div style={{background:C.dark,borderTop:`1px solid ${C.accent}33`,padding:"8px 18px 14px",maxHeight:"75vh",overflowY:"auto"}}>
        {navItems.map(([id,label])=><button key={id} onClick={()=>go(id)} style={{display:"block",width:"100%",textAlign:"left",background:navPg===id?C.accent+"22":"transparent",border:"none",color:["contact","quiz"].includes(id)?C.gold:navPg===id?"#fff":"#ffffffcc",padding:"9px 10px",borderRadius:5,fontSize:14,fontWeight:["contact","quiz"].includes(id)?700:400,cursor:"pointer"}}>{label}</button>)}
        <div style={{borderTop:`1px solid ${C.accent}33`,marginTop:8,paddingTop:8}}>
          <p style={{fontSize:11,color:"#ffffff44",margin:"0 0 6px"}}>Intent guides</p>
          {INTENT_PAGES.map(p=><button key={p.id} onClick={()=>go("intent:"+p.id)} style={{display:"block",width:"100%",textAlign:"left",background:"transparent",border:"none",color:"#ffffffaa",padding:"7px 10px",borderRadius:5,fontSize:13,cursor:"pointer"}}>{p.title}</button>)}
        </div>
        <div style={{borderTop:`1px solid ${C.accent}33`,marginTop:8,paddingTop:8}}>
          <p style={{fontSize:11,color:"#ffffff44",margin:"0 0 6px"}}>Comparisons</p>
          {COMPARISONS.map(c=><button key={c.id} onClick={()=>go("compare:"+c.id)} style={{display:"block",width:"100%",textAlign:"left",background:"transparent",border:"none",color:"#ffffffaa",padding:"7px 10px",borderRadius:5,fontSize:13,cursor:"pointer"}}>{c.title}</button>)}
        </div>
      </div>}
    </nav>

    <div style={{paddingTop:52}}>{getPage()}</div>

    <footer style={{background:C.dark,color:"#ffffff66",padding:"32px 20px",textAlign:"center"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>headhunters<span style={{color:C.gold}}>.co.uk</span></div>
        <p style={{fontSize:12,lineHeight:1.6,margin:"0 0 14px"}}>The UK's leading authority on executive search.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
          {navItems.filter(([id])=>id!=="home").map(([id,label])=><button key={id} onClick={()=>go(id)} style={{background:"none",border:"none",color:"#ffffff55",fontSize:11,cursor:"pointer",padding:0}}>{label}</button>)}
          <button onClick={()=>go("llmstxt")} style={{background:"none",border:"none",color:"#ffffff33",fontSize:11,cursor:"pointer",padding:0}}>llms.txt</button>
        </div>
        <p style={{fontSize:11,margin:0,color:"#ffffff33"}}>Updated March 2026 · Reviewed quarterly · Schema markup enabled · llms.txt available</p>
      </div>
    </footer>
  </div>;
}
