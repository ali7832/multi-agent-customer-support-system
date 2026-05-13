from support_system.schemas import Ticket
from support_system.service import SupportRoutingService


def test_support_service_returns_ticket_lifecycle_metadata():
    ticket = Ticket(
        customer_id='cust_001',
        subject='Invoice refund request',
        message='I need help with a refund for my latest invoice.',
        priority='high',
        account_tier='enterprise',
    )

    routed = SupportRoutingService().route(ticket)

    assert routed.ticket_id.startswith('tkt_')
    assert routed.audit_id
    assert routed.category == 'billing'
    assert routed.assigned_agent == 'billing_agent'
    assert routed.sla_minutes <= 120
    assert routed.routing_model_version
    assert 0 <= routed.confidence <= 1
