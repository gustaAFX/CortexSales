from __future__ import annotations

from dataclasses import dataclass

import httpx
from fastapi import HTTPException, status

from app.core.settings import get_settings
from app.services.evolution_client import (
    EvolutionClientError,
    send_media_message,
    send_text_message,
)


@dataclass
class ParsedWebhookMessage:
    chat_id: str
    sender_name: str
    text: str
    chat_type: str


def parse_webhook_payload(payload: dict) -> ParsedWebhookMessage:
    if payload.get("event") != "MESSAGES_UPSERT":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported event")

    data = payload.get("data", {})
    key = data.get("key", {})
    message = data.get("message", {})

    chat_id = key.get("remoteJid")
    if not chat_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing remoteJid")

    text = message.get("conversation") or message.get("extendedTextMessage", {}).get("text")
    if not text:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing message text")

    sender_name = data.get("pushName", "Desconhecido")
    chat_type = "group" if "@g.us" in chat_id else "private"
    return ParsedWebhookMessage(
        chat_id=chat_id, sender_name=sender_name, text=text, chat_type=chat_type
    )


async def dispatch_text_message(number: str, text: str) -> dict:
    settings = get_settings()
    async with httpx.AsyncClient(timeout=20.0) as client:
        try:
            return await send_text_message(
                client=client,
                base_url=settings.evolution_base_url,
                api_key=settings.evolution_api_key,
                instance=settings.evolution_instance,
                chat_id=number,
                text=text,
            )
        except EvolutionClientError as exc:
            detail = str(exc)
            if exc.is_instance_not_connected:
                detail = "Instance not connected. Alerta: administrador deve reconectar a instancia."
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=detail) from exc


async def dispatch_media_message(number: str, media_type: str, media: str, caption: str | None) -> dict:
    settings = get_settings()
    async with httpx.AsyncClient(timeout=20.0) as client:
        try:
            return await send_media_message(
                client=client,
                base_url=settings.evolution_base_url,
                api_key=settings.evolution_api_key,
                instance=settings.evolution_instance,
                chat_id=number,
                media_type=media_type,
                media=media,
                caption=caption,
            )
        except EvolutionClientError as exc:
            detail = str(exc)
            if exc.is_instance_not_connected:
                detail = "Instance not connected. Alerta: administrador deve reconectar a instancia."
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=detail) from exc
