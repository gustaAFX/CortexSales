from langgraph.graph import END, StateGraph

from app.ai.agents.closer import closer_node
from app.ai.agents.gerente import gerente_node
from app.ai.agents.sdr import sdr_node
from app.ai.langgraph.state import AgentState


def route_message(state: AgentState) -> str:
    chat_id = state["chat_id"]

    if "@g.us" in chat_id:
        return "gerente"

    if state["requires_human"]:
        return "gerente"

    if state["assigned_agent"] == "gerente":
        return "gerente"

    if state["lead_status"] in ("qualified", "closing"):
        return "closer"

    return "sdr"


def _after_sdr(state: AgentState) -> str:
    if state["lead_status"] == "qualified":
        return "closer"
    if state["lead_status"] == "discarded":
        return END
    return END


def _after_closer(state: AgentState) -> str:
    if state["requires_human"]:
        return "gerente"
    if state["lead_status"] == "closed":
        return END
    return END


def build_graph() -> StateGraph:
    graph = StateGraph(AgentState)

    graph.add_node("sdr", sdr_node)
    graph.add_node("closer", closer_node)
    graph.add_node("gerente", gerente_node)

    graph.set_conditional_entry_point(route_message)

    graph.add_conditional_edges("sdr", _after_sdr)
    graph.add_conditional_edges("closer", _after_closer)
    graph.add_edge("gerente", END)

    return graph.compile()
