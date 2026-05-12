# Deployment Guide

## Local Development

```bash
pip install .[dev]
uvicorn support_system.api:app --reload
```

## CLI Demo

```bash
supportctl demo
```

## Docker

```bash
docker build -t multi-agent-support .
docker run -p 8000:8000 multi-agent-support
```

## Docker Compose

```bash
docker-compose up --build
```

## Health Check

```bash
curl http://localhost:8000/health
```

## Route A Ticket

```bash
curl -X POST http://localhost:8000/tickets/route \
  -H 'Content-Type: application/json' \
  -d @sample_ticket.json
```
