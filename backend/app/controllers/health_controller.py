from app.services.health_service import health_status


def get_health() -> dict[str, str]:
    return health_status()
