from langchain_core.messages import AIMessage, SystemMessage

from app.ai.agents.base import get_llm
from app.ai.langgraph.state import AgentState
from app.ai.prompts.gerente import GERENTE_SYSTEM_PROMPT


def gerente_node(state: AgentState) -> dict:
    llm = get_llm()

    messages = [SystemMessage(content=GERENTE_SYSTEM_PROMPT), *state["messages"]]
    response: AIMessage = llm.invoke(messages)

    return {
        "messages": [response],
        "assigned_agent": "gerente",
        "requires_human": True,
        "response_text": response.content if isinstance(response.content, str) else "",
    }
