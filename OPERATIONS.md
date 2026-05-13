# Operations Runbook

## Purpose

This service routes customer support tickets to specialized agents and returns routing metadata that can be used by helpdesk, CRM, and customer success workflows.

## Runtime Configuration

Configuration is controlled through `.env.example`:

- `SUPPORT_ENV`: deployment environment.
- `SUPPORT_SERVICE_NAME`: service identifier.
- `SUPPORT_ROUTING_MODEL_VERSION`: routing strategy version returned in responses.
- `SUPPORT_ESCALATION_PRIORITIES`: priority levels that trigger escalation.
- `SUPPORT_TICKET_STORE_PATH`: JSONL ticket event path.
- `SUPPORT_DEFAULT_SLA_MINUTES`: default SLA for standard tickets.

## Ticket Lifecycle

1. Ticket arrives through `/tickets/route`.
2. Intent classifier assigns category.
3. Specialized agent is selected.
4. Escalation and SLA rules are applied.
5. Routing response is returned with ticket ID, audit ID, SLA, status, and confidence.
6. Ticket event is written to the JSONL event stream.

## SLA Rules

- Escalated tickets: 30 minutes
- Enterprise/VIP accounts: 60 minutes
- High priority tickets: 120 minutes
- Standard tickets: configured default SLA

## Production Roadmap

- Persist tickets in PostgreSQL.
- Integrate with Zendesk, Salesforce, or HubSpot.
- Replace rule router with LLM intent classifier and evaluation gates.
- Add human-in-the-loop escalation queue.
- Add customer history memory and retrieval.
- Add dashboard for routing quality and SLA compliance.
