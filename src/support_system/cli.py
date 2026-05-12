import typer
from rich.console import Console

from support_system.router import classify, get_agent, should_escalate

app = typer.Typer(help='Multi-agent customer support CLI')
console = Console()


@app.command()
def demo(message: str = 'I need help with my invoice refund', priority: str = 'normal') -> None:
    category = classify(message)
    agent = get_agent(category)
    console.print_json(
        data={
            'category': category,
            'assigned_agent': agent.name,
            'escalation_required': should_escalate(message, priority),
            'response': agent.respond(message),
        }
    )
