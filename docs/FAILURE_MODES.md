# Failure Modes

This document captures the main failure modes expected in SupportOps AI as it moves from demo-grade support tooling toward production-grade operational software.

## 001 - Misprioritized tickets

### Risk

If the support engine scores urgency poorly, low-priority tickets can surface ahead of more critical issues.

### Current handling

The current prioritization model is deterministic and easier to inspect than an opaque inference-only approach.

### Missing

- Calibration against real support outcomes
- Feedback loop from agents to priority quality
- Stronger validation of SLA-sensitive logic

### Production mitigation

- Compare queue ranking against real support resolution outcomes
- Track priority misses explicitly
- Refine scoring rules based on operational evidence

## 002 - Weak reply suggestion quality

### Risk

Suggested replies may sound plausible while missing policy nuance or customer-specific context.

### Current handling

The current product uses a deterministic mock layer, which makes behavior predictable but does not guarantee real support quality under diverse input.

### Missing

- Confidence-aware suggestion behavior
- Better context validation before suggestion display
- Quality review around suggestion usefulness

### Production mitigation

- Add suggestion confidence thresholds
- Require human review for low-confidence cases
- Track agent acceptance and rejection of suggestions

## 003 - Policy-reference mismatch

### Risk

The wrong policy or knowledge reference can be surfaced for a ticket, leading to inconsistent or incorrect support action.

### Current handling

Policy context is modeled as a useful workspace aid, but retrieval reliability is not yet the core engineering problem of the current version.

### Missing

- Stronger mapping between ticket type and policy source
- Version-aware policy handling
- Validation of reference relevance

### Production mitigation

- Add stronger retrieval rules by ticket category
- Track policy version and relevance
- Separate recommendation from approved support answer

## 004 - Queue-state inconsistency

### Risk

Assignment, escalation, and closure actions can drift if transitions are not enforced consistently across the workflow.

### Current handling

The current UI is state-driven, which helps keep actions predictable.

### Missing

- Persistent workflow history
- Stronger invariants around invalid transitions
- Audit visibility for agent actions

### Production mitigation

- Persist workflow transitions durably
- Enforce allowed transitions explicitly
- Add audit logs and operator attribution

## 005 - Missing auditability

### Risk

Without durable records of what the system recommended and what the agent did, support review and quality control become weak.

### Current handling

The product models support actions clearly, but persistent audit review is not yet part of the current implementation.

### Missing

- Durable action history
- Reason capture on escalation or close actions
- Reviewable timeline per ticket

### Production mitigation

- Add persistent audit logs
- Store agent actions with timestamps and reasons
- Expose review history in the ticket workspace
