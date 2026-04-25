from fastapi import APIRouter

from app.controllers.whatsapp_controller import (
    parse_webhook_controller,
    send_media_controller,
    send_text_controller,
)
from app.schemas.whatsapp_schema import SendMediaRequest, SendTextRequest

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])


@router.post("/webhook")
def whatsapp_webhook(payload: dict) -> dict:
    return parse_webhook_controller(payload)


@router.post("/send-text")
async def whatsapp_send_text(payload: SendTextRequest) -> dict:
    return await send_text_controller(payload)


@router.post("/send-media")
async def whatsapp_send_media(payload: SendMediaRequest) -> dict:
    return await send_media_controller(payload)
