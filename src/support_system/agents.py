class GeneralAgent:
    name = 'general_agent'

    def respond(self, message: str) -> str:
        return 'Thanks for contacting support. We are reviewing your request.'


class BillingAgent:
    name = 'billing_agent'

    def respond(self, message: str) -> str:
        return 'I can help with billing, invoices, refunds, and payment issues.'


class TechnicalAgent:
    name = 'technical_agent'

    def respond(self, message: str) -> str:
        return 'I can help troubleshoot errors, bugs, and service outages.'


class AccountAgent:
    name = 'account_agent'

    def respond(self, message: str) -> str:
        return 'I can help with login, password, and account access issues.'
