# Multi-Agent Customer Support System

Deployable customer support routing application with specialized agents, ticket lifecycle metadata, SLA assignment, escalation decisions, audit events, FastAPI APIs, CLI workflows, Docker, CI, tests, and a premium multi-page React support operations dashboard.

## Product Demo Video


https://github.com/user-attachments/assets/dac8d9d2-19de-42dc-b6b5-e6d96cb5fc7d


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
- Multi-page React/Vite support operations frontend

## Quickstart

```bash
pip install .[dev]
supportctl demo
uvicorn support_system.api:app --reload
pytest -q
```

## Frontend SupportOps AI Dashboard

The `frontend/` directory contains a premium React/Vite command center for support leaders, supervisors, and AI operations teams.

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Frontend pages:

- Overview: support KPIs, SLA trend charts, agent workload distribution
- Routing Lab: interactive ticket simulator with multi-agent routing result
- Agent Cockpit: specialized agent overview and priority ticket queue
- Escalations: high-risk ticket escalation and supervisor review workflow
- SLA Analytics: resolution velocity charts and SLA policy controls
- Knowledge/RAG: retrieved policy references and grounded response card
- Audit Timeline: traceable event history for routing, retrieval, escalation, and approval

The UI attempts to call `/tickets/route` and falls back to demo routing intelligence if the backend is offline.

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
