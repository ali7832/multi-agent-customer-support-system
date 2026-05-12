from support_system.router import classify, get_agent, should_escalate
from support_system.schemas import RoutedTicket, Ticket


def route_ticket(ticket: Ticket) -> RoutedTicket:
    category = classify(ticket.message + ' ' + ticket.subject)
    agent = get_agent(category)
    escalation = should_escalate(ticket.message, ticket.priority)
    return RoutedTicket(
        customer_id=ticket.customer_id,
        category=category,
        assigned_agent=agent.name,
        escalation_required=escalation,
        response=agent.respond(ticket.message),
        confidence=0.86 if category != 'general' else 0.62,
    )
