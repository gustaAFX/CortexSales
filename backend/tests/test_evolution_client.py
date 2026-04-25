import httpx
import pytest

from app.services.evolution_client import (
    EvolutionClientError,
    build_send_media_payload,
    build_send_text_payload,
    send_media_message,
    send_text_message
)


def test_build_send_text_payload_uses_composing_defaults() -> None:
    payload = build_send_text_payload(
        chat_id="5511999999999@s.whatsapp.net",
        text="Ola, tudo bem?",
    )

    assert payload["number"] == "5511999999999@s.whatsapp.net"
    assert payload["options"]["presence"] == "composing"
    assert payload["options"]["delay"] == 1000
    assert payload["textMessage"]["text"] == "Ola, tudo bem?"


def test_build_send_media_payload_contains_media_type_and_source() -> None:
    payload = build_send_media_payload(
        chat_id="5511999999999",
        media_type="image",
        media="https://cdn.example.com/banner.png",
        caption="Material comercial"
    )

    assert payload["number"] == "5511999999999"
    assert payload["mediatype"] == "image"
    assert payload["media"] == "https://cdn.example.com/banner.png"
    assert payload["caption"] == "Material comercial"
    assert payload["options"]["presence"] == "composing"


@pytest.mark.anyio
async def test_send_text_raises_specific_error_when_instance_not_connected() -> None:
    def handler(_: httpx.Request) -> httpx.Response:
        return httpx.Response(
            status_code=400,
            json={"message": "Instance not connected"}
        )

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport, base_url="https://api.mock") as client:
        with pytest.raises(EvolutionClientError) as exc_info:
            await send_text_message(
                client=client,
                base_url="https://api.mock",
                api_key="secret",
                instance="main",
                chat_id="5511999999999@s.whatsapp.net",
                text="Teste"
            )

    assert "Instance not connected" in str(exc_info.value)
    assert exc_info.value.is_instance_not_connected is True


@pytest.mark.anyio
async def test_send_media_posts_expected_endpoint() -> None:
    captured: dict[str, str] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["url"] = str(request.url)
        captured["apikey"] = request.headers.get("apikey", "")
        return httpx.Response(status_code=200, json={"ok": True})

    transport = httpx.MockTransport(handler)
    async with httpx.AsyncClient(transport=transport, base_url="https://api.mock") as client:
        response = await send_media_message(
            client=client,
            base_url="https://api.mock",
            api_key="secret",
            instance="main",
            chat_id="5511999999999",
            media_type="document",
            media="https://cdn.example.com/proposta.pdf",
            caption="Segue proposta"
        )

    assert response == {"ok": True}
    assert captured["url"].endswith("/message/sendMedia/main")
    assert captured["apikey"] == "secret"
