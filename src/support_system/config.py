from __future__ import annotations

from dataclasses import dataclass
import os


@dataclass(frozen=True)
class SupportSettings:
    environment: str = os.getenv('SUPPORT_ENV', 'local')
    service_name: str = os.getenv('SUPPORT_SERVICE_NAME', 'multi-agent-customer-support')
    routing_model_version: str = os.getenv('SUPPORT_ROUTING_MODEL_VERSION', 'rules-router-v1')
    escalation_priority_levels: tuple[str, ...] = tuple(
        item.strip() for item in os.getenv('SUPPORT_ESCALATION_PRIORITIES', 'urgent,critical').split(',')
    )
    ticket_store_path: str = os.getenv('SUPPORT_TICKET_STORE_PATH', 'support_tickets.jsonl')
    default_sla_minutes: int = int(os.getenv('SUPPORT_DEFAULT_SLA_MINUTES', '240'))


settings = SupportSettings()
