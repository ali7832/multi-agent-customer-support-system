from support_system.router import classify, get_agent, should_escalate


def test_billing_classification():
    category = classify('I need a refund for my invoice')
    assert category == 'billing'
    assert get_agent(category).name == 'billing_agent'


def test_escalation_for_urgent_ticket():
    assert should_escalate('service is down', 'urgent') is True
