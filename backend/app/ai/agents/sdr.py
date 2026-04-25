from langchain_core.messages import AIMessage, SystemMessage

from app.ai.agents.base import get_llm
from app.ai.langgraph.state import AgentState
from app.ai.prompts.sdr import SDR_SYSTEM_PROMPT


def sdr_node(state: AgentState) -> dict:
    llm = get_llm()

    messages = [SystemMessage(content=SDR_SYSTEM_PROMPT), *state["messages"]]
    response: AIMessage = llm.invoke(messages)

    lead_status = state["lead_status"]
    content = response.content.lower() if isinstance(response.content, str) else ""

    if "qualificado" in content or "encaminh" in content:
        lead_status = "qualified"
    elif "descartar" in content or "nao qualificado" in content:
        lead_status = "discarded"
    elif lead_status == "new":
        lead_status = "qualifying"

    return {
        "messages": [response],
        "assigned_agent": "sdr",
        "lead_status": lead_status,
        "response_text": response.content if isinstance(response.content, str) else "",
    }
