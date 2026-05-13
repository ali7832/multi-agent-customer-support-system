# ADR-001: Support Routing Service Layer

## Status

Accepted

## Context

Customer support systems need more than category classification. Operational teams need ticket IDs, audit IDs, escalation decisions, SLA metadata, routing confidence, and a clear service boundary that can later connect to helpdesk platforms.

## Decision

Create a dedicated `SupportRoutingService` that coordinates classification, agent selection, escalation, SLA assignment, response generation, and ticket event logging.

## Consequences

Benefits:

- FastAPI routes can remain thin.
- Routing behavior is easier to test.
- Ticket lifecycle metadata is available for real demos and downstream systems.
- JSONL event storage provides a simple local audit stream.

Tradeoffs:

- Rule-based routing is deterministic and easy to explain, but production systems should later add LLM intent classification, retrieval over customer history, and human review workflows.
