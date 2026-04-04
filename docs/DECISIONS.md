# Decisions

This document captures the main architectural decisions behind SupportOps AI at its current stage.

## 001 - Deterministic mock AI before live provider integration

### Context

The product needs to demonstrate support prioritization, summaries, and reply assistance without making the demo dependent on live model latency, cost, or API availability.

### Decision

The current AI layer is implemented as a deterministic mock support engine instead of a live provider integration.

### Why

This keeps the product reproducible, stable for demos, and easier to reason about while the workflow itself is still being validated.

### Trade-off

This improves reliability and cost control, but it limits realism compared with live inference behavior.

### What would change in production

The AI layer should be isolated behind a provider-backed interface with confidence-aware fallbacks and better observability.

## 002 - Support operations layer before full helpdesk scope

### Context

The operational problem is not “build a whole support suite,” but “help teams make better decisions inside support queues.”

### Decision

SupportOps AI focuses on prioritization, AI context, and ticket-handling workflow instead of full helpdesk replacement.

### Why

This keeps the product focused on the operational bottlenecks that create support pressure: urgency triage, reply support, and decision consistency.

### Trade-off

The product becomes clearer and more opinionated, but it depends on existing helpdesk or channel infrastructure for broader lifecycle behavior.

### What would change in production

Real integrations would likely complement existing support tooling rather than replace it outright.

## 003 - State-driven ticket workflow

### Context

Support actions such as assign, escalate, respond, and close need predictable handling if the workspace is going to feel operationally trustworthy.

### Decision

Ticket workflow is modeled explicitly through state-driven UI and deterministic action handling.

### Why

This keeps the operator flow legible and prevents ambiguous behavior in the parts of the system that directly affect queue management.

### Trade-off

The system becomes less flexible than a loosely structured interaction model, but more controllable and easier to audit later.

### What would change in production

Workflow state would likely move to persistent storage with stronger audit and attribution requirements.

## 004 - Policy context inside the ticket workspace

### Context

Agents often lose time switching between the ticket, internal policy docs, and prior context.

### Decision

Policy references and support guidance are surfaced directly in the workspace where the decision is made.

### Why

This reduces context switching and makes support handling more consistent, especially in billing and access workflows where policy accuracy matters.

### Trade-off

Inline guidance improves speed, but it increases the importance of keeping references accurate and context-aware.

### What would change in production

Reference retrieval should be validated against ticket type, policy version, and confidence before being treated as trustworthy support context.
