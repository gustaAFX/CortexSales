from fastapi import APIRouter

from app.controllers.agent_controller import handle_incoming_controller
from app.schemas.agent_schema import AgentIncomingRequest

router = APIRouter(prefix="/agents", tags=["agents"])


@router.post("/handle-incoming")
def handle_incoming(payload: AgentIncomingRequest) -> dict:
    return handle_incoming_controller(payload)
