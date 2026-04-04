# SupportOps AI

**AI support operations workspace for high-pressure ticket handling.**

SupportOps AI helps support teams prioritize risky tickets, improve response consistency, and reduce handling friction across operational support workflows.

---

## Live Links

* Live Demo: https://supportops-ai-phi.vercel.app
* GitHub: https://github.com/iveteamorim/supportops-ai

---

## Overview

Support teams often lose time and consistency when urgent tickets, SLA pressure, policy references, and repetitive replies compete for attention at the same time.

SupportOps AI introduces an operational support layer that helps teams:

* Prioritize high-risk tickets
* Surface urgency through explicit signals
* Generate structured reply suggestions
* Keep policy context visible during ticket handling

---

## Who is this for

Support teams handling operational ticket queues where speed and consistency matter, such as:

* Billing and plan-change support
* Access and account issues
* Subscription-related customer operations

---

## How It Works

1. **Ticket ingestion**  
   Tickets enter the queue with customer context, wait time, and SLA-related metadata.

2. **Priority evaluation**  
   The support engine classifies urgency, queue pressure, and likely risk.

3. **AI assistance**  
   The workspace surfaces a summary, suggested reply, and relevant knowledge references.

4. **Operational actions**  
   Agents can assign, escalate, close, or respond with structured support context.

5. **Feedback loop**  
   Suggestion quality can be reviewed to support future iteration of the support logic.

---

## Architecture

![Dashboard](./public/dashboard.png)

### Stack

* **Frontend / Backend:** Next.js (App Router + Route Handlers)
* **Language:** TypeScript
* **Data Layer:** Local support dataset
* **AI Layer:** Deterministic mock support engine
* **Deployment:** Vercel

---

## Technical Docs

* [Decisions](./docs/DECISIONS.md)
* [Failure Modes](./docs/FAILURE_MODES.md)

---

## Technical Decisions

This system is designed as an AI-assisted support operations workspace, not as a full helpdesk platform.

* **Deterministic mock AI layer for the current stage**  
  The current AI behavior is simulated so the product remains reproducible, inspectable, and demo-friendly without relying on paid inference at runtime.

* **Operational workflow before automation depth**  
  The product prioritizes queue handling, ticket context, and agent action flow before deeper automation or multi-system execution.

* **State-driven support UI**  
  Ticket handling actions are modeled explicitly so agents can move through assign, escalate, respond, and close flows predictably.

* **Policy context inside the workspace**  
  Support guidance is surfaced where the decision happens instead of being treated as separate documentation outside the ticket flow.

---

## System Boundaries

This system focuses on:

* Ticket prioritization
* AI-assisted support context
* Agent response support
* Operational handling of urgent cases

It does not attempt to solve:

* Full omnichannel helpdesk infrastructure
* Full CRM or account lifecycle management
* Fully autonomous support resolution

---

## Trade-offs

* **Deterministic mock AI vs live model dependency**  
  The current implementation favors reproducibility and demo stability over real model variability.

* **Operational support layer vs full helpdesk scope**  
  The product goes deep on triage and action support, but does not attempt to replace full ticketing infrastructure.

* **Single-workspace clarity vs broader workflow coverage**  
  A focused workspace improves legibility, but reduces breadth compared with enterprise support suites.

* **Local dataset vs production integrations**  
  The current product demonstrates workflow quality through controlled data rather than live system connections.

---

## Expected Impact

This system is designed to:

* Improve prioritization in support queues
* Reduce response inconsistency across agents
* Surface risky tickets earlier
* Lower friction in repetitive support handling

> Note: Impact is based on system design and expected workflow behavior, not measured production data.

---

## Production Readiness

This system is currently designed as a functional support-operations demo with a clear path to production hardening.

### Current capabilities

* Support dashboard
* Prioritized inbox
* Ticket workspace with AI summary and reply suggestion
* Deterministic support engine
* Agent action flow for assign, escalate, and close states

### Current limitations

* No real external ticket ingestion
* No persistent database or tenant model
* No provider-isolated AI integration
* No audit logging for agent decisions

### Next steps

* Real support channel ingestion
* Persistent database-backed state
* Provider-backed AI layer
* Audit and analytics layer for operational review

---

## Failure Modes & Engineering Risks

As the system moves beyond demo use, several risks become important:

* **Misprioritized tickets**  
  Weak scoring or poor urgency inference can push the wrong tickets to the top of the queue.

* **Low-quality reply suggestions**  
  AI-generated or simulated replies can sound plausible while missing policy nuance.

* **Policy-reference mismatch**  
  Surfaced guidance may not align with the actual ticket context if retrieval or mapping is weak.

* **Queue-state inconsistency**  
  Assignment, escalation, and closure flows can drift if state transitions are not enforced consistently.

* **Lack of auditability**  
  Without persistent logs, agent actions and support reasoning become difficult to review.

---

## Mitigation Strategy (Planned)

* Calibrate queue prioritization against real support outcomes
* Add confidence-aware handling for suggestions
* Harden policy/reference retrieval against ticket context
* Add durable state and audit logs
* Validate support actions through explicit workflow rules

---

## Positioning

SupportOps AI is not a generic chatbot for support teams.

It is an **AI support operations workspace**, designed to help agents make faster, more consistent decisions while keeping ticket context, urgency, and policy guidance visible in one place.

The goal is not full automation —  
but better operational support handling under pressure.

---

## Screenshots

### Dashboard

![Dashboard](./public/dashboard.png)

### Inbox

![Inbox](./public/inbox.png)

### Ticket Workspace

![Ticket Workspace](./public/ticket-detail.png)

---

## Project Structure

* `src/app/dashboard` – support operations overview
* `src/app/inbox` – prioritized ticket queue
* `src/app/ticket/[id]` – ticket workspace
* `src/app/api` – route handlers for tickets and support logic
* `src/lib/demo-data.ts` – demo dataset
* `src/lib/support-engine.ts` – support prioritization and suggestion logic

---

## Local Development

Use Node 20:

```bash
source ~/.nvm/nvm.sh
nvm use 20
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open:

* `http://localhost:3000/dashboard`
* `http://localhost:3000/inbox`
* `http://localhost:3000/ticket/t-1001`

---

## Scripts

* `npm run dev`
* `npm run build`
* `npm run start`
* `npm run lint`
