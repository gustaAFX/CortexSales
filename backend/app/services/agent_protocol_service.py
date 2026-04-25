from __future__ import annotations

import logging
import os

from langchain_core.messages import HumanMessage

logger = logging.getLogger(__name__)


def _is_group_chat(chat_id: str) -> bool:
    return "@g.us" in chat_id


def _is_private_chat(chat_id: str) -> bool:
    return "@s.whatsapp.net" in chat_id


def _has_groq_key() -> bool:
    return bool(os.getenv("GROQ_API_KEY"))


def handle_incoming_message(chat_id: str, text: str, sender_name: str | None = None) -> dict:
    name = sender_name or "Desconhecido"

    if _has_groq_key():
        return _handle_with_ai(chat_id, text, name)

    logger.info("GROQ_API_KEY not set — using keyword-based routing fallback")
    return _handle_with_keywords(chat_id, text, name)


def _handle_with_ai(chat_id: str, text: str, sender_name: str) -> dict:
    from app.ai.langgraph.graph import build_graph
    from app.ai.langgraph.state import AgentState

    initial_state: AgentState = {
        "messages": [HumanMessage(content=text)],
        "chat_id": chat_id,
        "sender_name": sender_name,
        "lead_status": "new",
        "assigned_agent": "sdr",
        "requires_human": False,
        "response_text": "",
    }

    graph = build_graph()
    result = graph.invoke(initial_state)

    return {
        "route": result["assigned_agent"],
        "assigned_agent": result["assigned_agent"].capitalize(),
        "should_send_message": not result["requires_human"] or result["assigned_agent"] != "gerente",
        "reason": f"Processado pelo agente {result['assigned_agent']}",
        "reply_text": result["response_text"],
        "sender_name": sender_name,
        "lead_status": result["lead_status"],
    }


def _handle_with_keywords(chat_id: str, text: str, sender_name: str) -> dict:
    normalized_text = text.lower()

    if _is_group_chat(chat_id):
        return {
            "route": "manager_human_handoff",
            "assigned_agent": "Gerente",
            "should_send_message": False,
            "reason": "Grupo detectado: acionar intervencao humana",
            "reply_text": "",
            "sender_name": sender_name,
        }

    if not _is_private_chat(chat_id):
        return {
            "route": "manager_human_handoff",
            "assigned_agent": "Gerente",
            "should_send_message": False,
            "reason": "Formato de chat nao suportado",
            "reply_text": "",
            "sender_name": sender_name,
        }

    if "call" in normalized_text:
        return {
            "route": "manager_human_handoff",
            "assigned_agent": "Gerente",
            "should_send_message": True,
            "reason": "Lead exige call, gerente deve acionar humano",
            "reply_text": "Entendido! Vou agendar um especialista humano para a call.",
            "sender_name": sender_name,
        }

    qualified = "dor" in normalized_text and "orcamento" in normalized_text
    if qualified:
        return {
            "route": "closer",
            "assigned_agent": "Closer",
            "should_send_message": True,
            "reason": "Lead qualificado pelo SDR e encaminhado ao Closer",
            "reply_text": "Perfeito. Vou te apresentar a proposta ideal para seu cenario.",
            "sender_name": sender_name,
        }

    return {
        "route": "sdr",
        "assigned_agent": "SDR",
        "should_send_message": True,
        "reason": "SDR mantendo qualificacao sem vender/preco final",
        "reply_text": "Para te direcionar melhor, pode me contar sua dor principal e faixa de orcamento?",
        "sender_name": sender_name,
    }
