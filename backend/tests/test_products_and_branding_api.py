from fastapi.testclient import TestClient

from app.database.session import Base, engine
from main import app


def setup_function() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_products_crud_flow() -> None:
    client = TestClient(app)

    create_response = client.post(
        "/products",
        json={
            "name": "Plano Growth",
            "price": 1499.0,
            "description": "Automacao comercial base"
        }
    )
    assert create_response.status_code == 201
    created = create_response.json()
    assert created["id"] > 0
    assert created["name"] == "Plano Growth"

    list_response = client.get("/products")
    assert list_response.status_code == 200
    assert len(list_response.json()) == 1

    get_response = client.get(f"/products/{created['id']}")
    assert get_response.status_code == 200
    assert get_response.json()["description"] == "Automacao comercial base"

    update_response = client.put(
        f"/products/{created['id']}",
        json={
            "name": "Plano Scale",
            "price": 2499.0,
            "description": "Fluxo completo com IA"
        }
    )
    assert update_response.status_code == 200
    assert update_response.json()["name"] == "Plano Scale"

    delete_response = client.delete(f"/products/{created['id']}")
    assert delete_response.status_code == 204

    missing_response = client.get(f"/products/{created['id']}")
    assert missing_response.status_code == 404


def test_branding_upsert_and_get() -> None:
    client = TestClient(app)

    initial_get_response = client.get("/branding")
    assert initial_get_response.status_code == 404

    upsert_response = client.put(
        "/branding",
        json={
            "company_name": "CortexSales",
            "voice_tone": "Consultivo e objetivo",
            "primary_color": "#6366f1",
            "ai_context": "Priorizar qualificacao e conversao."
        }
    )
    assert upsert_response.status_code == 200
    assert upsert_response.json()["company_name"] == "CortexSales"

    get_response = client.get("/branding")
    assert get_response.status_code == 200
    payload = get_response.json()
    assert payload["voice_tone"] == "Consultivo e objetivo"
    assert payload["primary_color"] == "#6366f1"
