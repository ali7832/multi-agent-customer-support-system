from fastapi import FastAPI

from support_system.config import settings
from support_system.schemas import HealthResponse, RoutedTicket, Ticket
from support_system.service import SupportRoutingService

app = FastAPI(title='Multi-Agent Customer Support API', version='0.2.0')

_service = SupportRoutingService()


@app.get('/health', response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status='ok',
        service_name=settings.service_name,
        environment=settings.environment,
        routing_model_version=settings.routing_model_version,
    )


@app.post('/tickets/route', response_model=RoutedTicket)
def route_ticket(ticket: Ticket) -> RoutedTicket:
    return _service.route(ticket)
