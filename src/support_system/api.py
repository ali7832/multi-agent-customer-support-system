from fastapi import FastAPI

from support_system.router import classify, get_agent, should_escalate
from support_system.schemas import RoutedTicket, Ticket

app = FastAPI(title='Multi-Agent Customer Support API')


@app.get('/health')
def health() -> dict:
    return {'status': 'ok'}


@app.post('/tickets/route', response_model=RoutedTicket)
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
        confidence=0.87,
    )
