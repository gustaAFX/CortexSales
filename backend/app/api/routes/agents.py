from fastapi import APIRouter

from app.controllers.agent_controller import AgentIncomingRequest, handle_incoming_controller

router = APIRouter(prefix="/agents", tags=["agents"])


@router.post("/handle-incoming")
def handle_incoming(payload: AgentIncomingRequest) -> dict:
    return handle_incoming_controller(payload)
