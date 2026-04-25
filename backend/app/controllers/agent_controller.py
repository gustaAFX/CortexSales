from pydantic import BaseModel, Field

from app.services.agent_protocol_service import handle_incoming_message


class AgentIncomingRequest(BaseModel):
    chat_id: str = Field(min_length=1)
    text: str = Field(min_length=1)
    sender_name: str | None = None


def handle_incoming_controller(payload: AgentIncomingRequest) -> dict:
    return handle_incoming_message(
        chat_id=payload.chat_id,
        text=payload.text,
        sender_name=payload.sender_name,
    )
