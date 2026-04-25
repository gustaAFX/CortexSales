from app.schemas.whatsapp_schema import SendMediaRequest, SendTextRequest
from app.services.whatsapp_service import (
    dispatch_media_message,
    dispatch_text_message,
    parse_webhook_payload,
)


def parse_webhook_controller(payload: dict) -> dict:
    parsed = parse_webhook_payload(payload)
    return {
        "chat_id": parsed.chat_id,
        "sender_name": parsed.sender_name,
        "text": parsed.text,
        "chat_type": parsed.chat_type,
    }


async def send_text_controller(payload: SendTextRequest) -> dict:
    return await dispatch_text_message(number=payload.number, text=payload.text)


async def send_media_controller(payload: SendMediaRequest) -> dict:
    return await dispatch_media_message(
        number=payload.number,
        media_type=payload.media_type,
        media=payload.media,
        caption=payload.caption,
    )
