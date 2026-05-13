from __future__ import annotations

from uuid import uuid4

from support_system.config import settings
from support_system.router import classify, get_agent, should_escalate
from support_system.schemas import RoutedTicket, Ticket
from support_system.storage import append_ticket_event


class SupportRoutingService:
    def route(self, ticket: Ticket) -> RoutedTicket:
        ticket_id = ticket.ticket_id or f'tkt_{uuid4().hex[:12]}'
        audit_id = str(uuid4())
        category = classify(ticket.message + ' ' + ticket.subject)
        agent = get_agent(category)
        escalation = self._requires_escalation(ticket)
        sla_minutes = self._sla_minutes(ticket.priority, ticket.account_tier, escalation)

        routed = RoutedTicket(
            ticket_id=ticket_id,
            customer_id=ticket.customer_id,
            category=category,
            assigned_agent=agent.name,
            escalation_required=escalation,
            sla_minutes=sla_minutes,
            status='escalated' if escalation else 'routed',
            response=agent.respond(ticket.message),
            confidence=self._confidence(category, ticket),
            routing_model_version=settings.routing_model_version,
            audit_id=audit_id,
        )

        append_ticket_event(
            {
                'event_type': 'ticket_routed',
                'audit_id': audit_id,
                'ticket': ticket.model_dump(),
                'routing': routed.model_dump(),
            },
            settings.ticket_store_path,
        )
        return routed

    def _requires_escalation(self, ticket: Ticket) -> bool:
        return ticket.priority.lower() in settings.escalation_priority_levels or should_escalate(ticket.message, ticket.priority)

    @staticmethod
    def _sla_minutes(priority: str, account_tier: str, escalation: bool) -> int:
        if escalation:
            return 30
        if account_tier.lower() in {'enterprise', 'vip'}:
            return 60
        if priority.lower() == 'high':
            return 120
        return settings.default_sla_minutes

    @staticmethod
    def _confidence(category: str, ticket: Ticket) -> float:
        text = f'{ticket.subject} {ticket.message}'.lower()
        if category != 'general':
            return 0.91
        if len(text.split()) < 5:
            return 0.55
        return 0.74


def route_ticket(ticket: Ticket) -> RoutedTicket:
    return SupportRoutingService().route(ticket)
