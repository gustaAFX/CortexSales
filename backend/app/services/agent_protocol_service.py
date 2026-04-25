def _is_group_chat(chat_id: str) -> bool:
    return "@g.us" in chat_id


def _is_private_chat(chat_id: str) -> bool:
    return "@s.whatsapp.net" in chat_id


def handle_incoming_message(chat_id: str, text: str, sender_name: str | None = None) -> dict:
    normalized_text = text.lower()

    if _is_group_chat(chat_id):
        return {
            "route": "manager_human_handoff",
            "assigned_agent": "Gerente",
            "should_send_message": False,
            "reason": "Grupo detectado: acionar intervencao humana",
            "reply_text": "",
            "sender_name": sender_name or "Desconhecido",
        }

    if not _is_private_chat(chat_id):
        return {
            "route": "manager_human_handoff",
            "assigned_agent": "Gerente",
            "should_send_message": False,
            "reason": "Formato de chat nao suportado",
            "reply_text": "",
            "sender_name": sender_name or "Desconhecido",
        }

    if "call" in normalized_text:
        return {
            "route": "manager_human_handoff",
            "assigned_agent": "Gerente",
            "should_send_message": True,
            "reason": "Lead exige call, gerente deve acionar humano",
            "reply_text": "Entendido! Vou agendar um especialista humano para a call.",
            "sender_name": sender_name or "Desconhecido",
        }

    qualified = "dor" in normalized_text and "orcamento" in normalized_text
    if qualified:
        return {
            "route": "closer",
            "assigned_agent": "Closer",
            "should_send_message": True,
            "reason": "Lead qualificado pelo SDR e encaminhado ao Closer",
            "reply_text": "Perfeito. Vou te apresentar a proposta ideal para seu cenario.",
            "sender_name": sender_name or "Desconhecido",
        }

    return {
        "route": "sdr",
        "assigned_agent": "SDR",
        "should_send_message": True,
        "reason": "SDR mantendo qualificacao sem vender/preco final",
        "reply_text": "Para te direcionar melhor, pode me contar sua dor principal e faixa de orcamento?",
        "sender_name": sender_name or "Desconhecido",
    }
