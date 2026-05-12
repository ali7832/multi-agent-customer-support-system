# Multi-Agent Customer Support System

Production-ready AI-style customer support orchestration platform with specialized agents, ticket routing, escalation logic, FastAPI APIs, CLI workflows, tests, Docker, and CI.

## Features

- Multi-agent ticket routing
- Specialized support agents for billing, technical, account, and general queries
- Priority and escalation scoring
- FastAPI support API
- CLI demo workflow
- JSON ticket example
- Docker and Docker Compose deployment
- GitHub Actions CI
- Pytest test suite
- Architecture and deployment documentation

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

## Docs

- `ARCHITECTURE.md`
- `DEPLOYMENT.md`
- `sample_ticket.json`

## Portfolio Highlights

- Demonstrates agent orchestration and production API design
- Shows routing, escalation, and modular AI workflow patterns
- Deployable, testable, and recruiter-friendly
- Strong foundation for LangGraph, CRM integration, vector memory, and human escalation workflows
