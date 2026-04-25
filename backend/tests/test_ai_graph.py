from unittest.mock import MagicMock, patch

from langchain_core.messages import AIMessage, HumanMessage

from app.ai.langgraph.graph import build_graph, route_message
from app.ai.langgraph.state import AgentState


def test_build_graph_compiles() -> None:
    graph = build_graph()
    assert graph is not None


def test_route_message_sdr_for_new_lead() -> None:
    state: AgentState = {
        "messages": [HumanMessage(content="Oi, quero saber mais")],
        "chat_id": "5511999999999@s.whatsapp.net",
        "sender_name": "Lead",
        "lead_status": "new",
        "assigned_agent": "sdr",
        "requires_human": False,
        "response_text": "",
    }
    assert route_message(state) == "sdr"


def test_route_message_closer_for_qualified() -> None:
    state: AgentState = {
        "messages": [HumanMessage(content="Tenho dor e orcamento")],
        "chat_id": "5511999999999@s.whatsapp.net",
        "sender_name": "Lead",
        "lead_status": "qualified",
        "assigned_agent": "closer",
        "requires_human": False,
        "response_text": "",
    }
    assert route_message(state) == "closer"


def test_route_message_gerente_when_human_required() -> None:
    state: AgentState = {
        "messages": [HumanMessage(content="Preciso de call")],
        "chat_id": "5511999999999@s.whatsapp.net",
        "sender_name": "Lead",
        "lead_status": "closing",
        "assigned_agent": "gerente",
        "requires_human": True,
        "response_text": "",
    }
    assert route_message(state) == "gerente"


def test_route_message_gerente_for_group_chat() -> None:
    state: AgentState = {
        "messages": [HumanMessage(content="Mensagem no grupo")],
        "chat_id": "1203630@g.us",
        "sender_name": "Equipe",
        "lead_status": "new",
        "assigned_agent": "sdr",
        "requires_human": False,
        "response_text": "",
    }
    assert route_message(state) == "gerente"


@patch("app.ai.agents.sdr.get_llm")
def test_graph_invocation_with_mocked_llm(mock_get_llm: MagicMock) -> None:
    mock_llm = MagicMock()
    mock_llm.invoke.return_value = AIMessage(
        content="Qual sua principal dor?"
    )
    mock_get_llm.return_value = mock_llm

    graph = build_graph()
    initial_state: AgentState = {
        "messages": [HumanMessage(content="Oi, quero saber mais")],
        "chat_id": "5511999999999@s.whatsapp.net",
        "sender_name": "Lead",
        "lead_status": "new",
        "assigned_agent": "sdr",
        "requires_human": False,
        "response_text": "",
    }

    result = graph.invoke(initial_state)
    assert result["response_text"] != ""
    assert result["assigned_agent"] == "sdr"
