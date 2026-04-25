from pydantic import BaseModel, Field


class AgentIncomingRequest(BaseModel):
    chat_id: str = Field(min_length=1)
    text: str = Field(min_length=1)
    sender_name: str | None = None
