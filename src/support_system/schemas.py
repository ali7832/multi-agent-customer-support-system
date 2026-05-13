from __future__ import annotations

from pydantic import BaseModel, Field


class Ticket(BaseModel):
    customer_id: str
    subject: str
    message: str
    channel: str = 'email'
    priority: str = 'normal'
    ticket_id: str | None = None
    account_tier: str = 'standard'
    locale: str = 'en'


class RoutedTicket(BaseModel):
    ticket_id: str
    customer_id: str
    category: str
    assigned_agent: str
    escalation_required: bool
    sla_minutes: int
    status: str
    response: str
    confidence: float = Field(..., ge=0, le=1)
    routing_model_version: str
    audit_id: str


class HealthResponse(BaseModel):
    status: str
    service_name: str
    environment: str
    routing_model_version: str
