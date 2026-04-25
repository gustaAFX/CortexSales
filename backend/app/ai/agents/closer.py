from langchain_core.messages import AIMessage, SystemMessage

from app.ai.agents.base import get_llm
from app.ai.langgraph.state import AgentState
from app.ai.prompts.closer import CLOSER_SYSTEM_PROMPT


def closer_node(state: AgentState) -> dict:
    llm = get_llm()

    messages = [SystemMessage(content=CLOSER_SYSTEM_PROMPT), *state["messages"]]
    response: AIMessage = llm.invoke(messages)

    lead_status = state["lead_status"]
    requires_human = state["requires_human"]
    assigned_agent = "closer"
    content = response.content.lower() if isinstance(response.content, str) else ""

    if "call" in content or "reuniao" in content or "gerente" in content:
        requires_human = True
        assigned_agent = "gerente"
        lead_status = "closing"
    elif "fechad" in content or "parabens" in content:
        lead_status = "closed"

    return {
        "messages": [response],
        "assigned_agent": assigned_agent,
        "lead_status": lead_status,
        "requires_human": requires_human,
        "response_text": response.content if isinstance(response.content, str) else "",
    }
