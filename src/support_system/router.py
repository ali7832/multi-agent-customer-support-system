from support_system.agents import AccountAgent, BillingAgent, GeneralAgent, TechnicalAgent


def classify(message: str) -> str:
    text = message.lower()
    if 'bill' in text or 'invoice' in text or 'refund' in text or 'payment' in text:
        return 'billing'
    if 'error' in text or 'bug' in text or 'crash' in text or 'outage' in text:
        return 'technical'
    if 'login' in text or 'password' in text or 'account' in text or 'access' in text:
        return 'account'
    return 'general'


def get_agent(category: str):
    if category == 'billing':
        return BillingAgent()
    if category == 'technical':
        return TechnicalAgent()
    if category == 'account':
        return AccountAgent()
    return GeneralAgent()


def should_escalate(message: str, priority: str) -> bool:
    text = message.lower()
    return priority == 'urgent' or 'cancel' in text or 'lawsuit' in text
