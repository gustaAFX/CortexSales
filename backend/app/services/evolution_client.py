from __future__ import annotations

from dataclasses import dataclass

import httpx


@dataclass
class EvolutionClientError(Exception):
    message: str
    is_instance_not_connected: bool = False

    def __str__(self) -> str:
        return self.message


def build_send_text_payload(chat_id: str, text: str, delay: int = 1000) -> dict:
    return {
        "number": chat_id,
        "options": {"delay": delay, "presence": "composing"},
        "textMessage": {"text": text},
    }


def build_send_media_payload(
    chat_id: str, media_type: str, media: str, caption: str | None = None, delay: int = 1000
) -> dict:
    payload = {
        "number": chat_id,
        "mediatype": media_type,
        "media": media,
        "options": {"delay": delay, "presence": "composing"},
    }
    if caption:
        payload["caption"] = caption
    return payload


async def _post_with_error_mapping(
    *,
    client: httpx.AsyncClient,
    url: str,
    api_key: str,
    payload: dict,
) -> dict:
    response = await client.post(
        url,
        json=payload,
        headers={"apikey": api_key, "Content-Type": "application/json"},
    )
    if response.status_code >= 400:
        message = response.text
        try:
            body = response.json()
            message = body.get("message") or body.get("error") or response.text
        except Exception:
            pass
        is_instance_not_connected = "Instance not connected" in message
        raise EvolutionClientError(
            message=message, is_instance_not_connected=is_instance_not_connected
        )
    return response.json()


async def send_text_message(
    *,
    client: httpx.AsyncClient,
    base_url: str,
    api_key: str,
    instance: str,
    chat_id: str,
    text: str,
) -> dict:
    payload = build_send_text_payload(chat_id=chat_id, text=text)
    return await _post_with_error_mapping(
        client=client,
        url=f"{base_url}/message/sendText/{instance}",
        api_key=api_key,
        payload=payload,
    )


async def send_media_message(
    *,
    client: httpx.AsyncClient,
    base_url: str,
    api_key: str,
    instance: str,
    chat_id: str,
    media_type: str,
    media: str,
    caption: str | None = None,
) -> dict:
    payload = build_send_media_payload(
        chat_id=chat_id,
        media_type=media_type,
        media=media,
        caption=caption,
    )
    return await _post_with_error_mapping(
        client=client,
        url=f"{base_url}/message/sendMedia/{instance}",
        api_key=api_key,
        payload=payload,
    )
