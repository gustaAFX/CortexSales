from app.schemas.agent_schema import AgentIncomingRequest
from app.services.agent_protocol_service import handle_incoming_message


def handle_incoming_controller(payload: AgentIncomingRequest) -> dict:
    return handle_incoming_message(
        chat_id=payload.chat_id,
        text=payload.text,
        sender_name=payload.sender_name,
    )
