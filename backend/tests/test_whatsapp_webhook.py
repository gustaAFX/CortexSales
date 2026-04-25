from fastapi.testclient import TestClient

from main import app


def test_webhook_parses_conversation_text_private_chat() -> None:
    client = TestClient(app)
    response = client.post(
        "/whatsapp/webhook",
        json={
            "event": "MESSAGES_UPSERT",
            "data": {
                "key": {"remoteJid": "5511999999999@s.whatsapp.net"},
                "pushName": "Joao",
                "message": {"conversation": "Quero saber sobre o produto"}
            }
        }
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["chat_id"] == "5511999999999@s.whatsapp.net"
    assert payload["sender_name"] == "Joao"
    assert payload["text"] == "Quero saber sobre o produto"
    assert payload["chat_type"] == "private"


def test_webhook_parses_extended_text_group_chat() -> None:
    client = TestClient(app)
    response = client.post(
        "/whatsapp/webhook",
        json={
            "event": "MESSAGES_UPSERT",
            "data": {
                "key": {"remoteJid": "1203630@g.us"},
                "pushName": "Equipe",
                "message": {
                    "extendedTextMessage": {"text": "Tem alguem ai?"}
                }
            }
        }
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["chat_id"] == "1203630@g.us"
    assert payload["text"] == "Tem alguem ai?"
    assert payload["chat_type"] == "group"


def test_webhook_requires_messages_upsert_event() -> None:
    client = TestClient(app)
    response = client.post(
        "/whatsapp/webhook",
        json={
            "event": "CONNECTION_UPDATE",
            "data": {"key": {"remoteJid": "5511999999999@s.whatsapp.net"}}
        }
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported event"
