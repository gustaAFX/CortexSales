from unittest.mock import MagicMock, patch

from langchain_core.messages import AIMessage, HumanMessage

from app.ai.agents.sdr import sdr_node
from app.ai.agents.closer import closer_node
from app.ai.agents.gerente import gerente_node
from app.ai.langgraph.state import AgentState


def _make_state(
    text: str = "Oi, quero saber mais",
    lead_status: str = "new",
    assigned_agent: str = "sdr",
) -> AgentState:
    return {
        "messages": [HumanMessage(content=text)],
        "chat_id": "5511999999999@s.whatsapp.net",
        "sender_name": "Lead Teste",
        "lead_status": lead_status,
        "assigned_agent": assigned_agent,
        "requires_human": False,
        "response_text": "",
    }


@patch("app.ai.agents.sdr.get_llm")
def test_sdr_node_returns_state_update(mock_get_llm: MagicMock) -> None:
    mock_llm = MagicMock()
    mock_llm.invoke.return_value = AIMessage(
        content="Qual sua principal dor no processo comercial?"
    )
    mock_get_llm.return_value = mock_llm

    state = _make_state()
    result = sdr_node(state)

    assert result["assigned_agent"] == "sdr"
    assert result["response_text"] != ""
    assert len(result["messages"]) > 0


@patch("app.ai.agents.closer.get_llm")
def test_closer_node_returns_state_update(mock_get_llm: MagicMock) -> None:
    mock_llm = MagicMock()
    mock_llm.invoke.return_value = AIMessage(
        content="Vou te apresentar a proposta ideal para seu cenario."
    )
    mock_get_llm.return_value = mock_llm

    state = _make_state(
        text="Tenho dor no processo e orcamento aprovado",
        lead_status="qualified",
        assigned_agent="closer",
    )
    result = closer_node(state)

    assert result["assigned_agent"] == "closer"
    assert result["response_text"] != ""


@patch("app.ai.agents.gerente.get_llm")
def test_gerente_node_sets_requires_human(mock_get_llm: MagicMock) -> None:
    mock_llm = MagicMock()
    mock_llm.invoke.return_value = AIMessage(
        content="Acionando intervencao humana para call."
    )
    mock_get_llm.return_value = mock_llm

    state = _make_state(
        text="Preciso de call com especialista",
        lead_status="closing",
        assigned_agent="gerente",
    )
    result = gerente_node(state)

    assert result["assigned_agent"] == "gerente"
    assert result["requires_human"] is True
    assert result["response_text"] != ""
