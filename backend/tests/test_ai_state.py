from app.ai.langgraph.state import AgentState


def test_agent_state_has_required_keys() -> None:
    state: AgentState = {
        "messages": [],
        "chat_id": "5511999999999@s.whatsapp.net",
        "sender_name": "Joao",
        "lead_status": "new",
        "assigned_agent": "sdr",
        "requires_human": False,
        "response_text": "",
    }

    assert state["chat_id"] == "5511999999999@s.whatsapp.net"
    assert state["sender_name"] == "Joao"
    assert state["lead_status"] == "new"
    assert state["assigned_agent"] == "sdr"
    assert state["requires_human"] is False
    assert state["response_text"] == ""
    assert state["messages"] == []


def test_agent_state_lead_status_values() -> None:
    valid_statuses = [
        "new", "qualifying", "qualified",
        "closing", "closed", "lost", "discarded",
    ]
    for status in valid_statuses:
        state: AgentState = {
            "messages": [],
            "chat_id": "test@s.whatsapp.net",
            "sender_name": "Test",
            "lead_status": status,
            "assigned_agent": "sdr",
            "requires_human": False,
            "response_text": "",
        }
        assert state["lead_status"] == status


def test_agent_state_assigned_agent_values() -> None:
    valid_agents = ["sdr", "closer", "gerente"]
    for agent in valid_agents:
        state: AgentState = {
            "messages": [],
            "chat_id": "test@s.whatsapp.net",
            "sender_name": "Test",
            "lead_status": "new",
            "assigned_agent": agent,
            "requires_human": False,
            "response_text": "",
        }
        assert state["assigned_agent"] == agent
