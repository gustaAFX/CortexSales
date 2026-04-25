from app.services.agent_protocol_service import handle_incoming_message


def test_group_chat_requires_human_intervention() -> None:
    result = handle_incoming_message(
        chat_id="1203630@g.us",
        text="Pessoal, precisamos de suporte humano",
        sender_name="Equipe"
    )

    assert result["route"] == "manager_human_handoff"
    assert result["should_send_message"] is False
    assert "intervencao humana" in result["reason"].lower()


def test_sdr_qualifies_and_handoffs_to_closer_without_selling() -> None:
    result = handle_incoming_message(
        chat_id="5511999999999@s.whatsapp.net",
        text="Tenho dor no processo comercial e orcamento aprovado",
        sender_name="Joao"
    )

    assert result["route"] == "closer"
    assert result["assigned_agent"] == "Closer"
    assert "preco final" not in result["reply_text"].lower()


def test_closer_requests_human_when_call_is_required() -> None:
    result = handle_incoming_message(
        chat_id="5511888888888@s.whatsapp.net",
        text="Quero fechar agora, mas preciso de call",
        sender_name="Maria"
    )

    assert result["route"] == "manager_human_handoff"
    assert result["should_send_message"] is True
    assert "agendar um especialista humano" in result["reply_text"].lower()
