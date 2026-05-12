from __future__ import annotations

from pydantic import BaseModel


class Ticket(BaseModel):
    customer_id: str
    subject: str
    message: str
    channel: str = 'email'
    priority: str = 'normal'


class RoutedTicket(BaseModel):
    customer_id: str
    category: str
    assigned_agent: str
    escalation_required: bool
    response: str
    confidence: float
