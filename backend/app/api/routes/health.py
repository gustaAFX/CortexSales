from fastapi import APIRouter

from app.controllers.health_controller import get_health

router = APIRouter()


@router.get("/health")
def health_check() -> dict[str, str]:
    return get_health()
