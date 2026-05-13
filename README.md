# Multi-Agent Customer Support System

Deployable customer support routing application with specialized agents, ticket lifecycle metadata, SLA assignment, escalation decisions, audit events, FastAPI APIs, CLI workflows, Docker, CI, and tests.

## Core Capabilities

- Multi-agent ticket routing
- Specialized agents for billing, technical, account, and general support
- Ticket IDs and audit IDs for traceability
- SLA assignment by priority, account tier, and escalation state
- Escalation logic for urgent tickets
- Routing confidence and routing strategy version metadata
- JSONL ticket event stream for local audit and demo mode
- FastAPI `/tickets/route` API
- CLI demo workflow
- Runtime configuration through environment variables
- Docker and Docker Compose deployment
- GitHub Actions CI
- Pytest coverage
- Operations runbook and architecture decision record

## Quickstart

```bash
pip install .[dev]
supportctl demo
uvicorn support_system.api:app --reload
pytest -q
```

## API

```bash
curl http://localhost:8000/health
curl -X POST http://localhost:8000/tickets/route \
  -H 'Content-Type: application/json' \
  -d @sample_ticket.json
```

## Docker

```bash
docker-compose up --build
```

## Runtime Configuration

See `.env.example` for environment, routing version, escalation priorities, ticket event path, and SLA settings.

## Documentation

- `ARCHITECTURE.md`
- `DEPLOYMENT.md`
- `OPERATIONS.md`
- `docs/adr-001-support-routing-service.md`
- `sample_ticket.json`

## Production Roadmap

- Helpdesk integrations
- LLM-based intent classification
- Human escalation queue
- Customer history retrieval
- SLA dashboard and routing analytics
- Multi-tenant configuration
