import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    evolution_base_url: str
    evolution_api_key: str
    evolution_instance: str


def get_settings() -> Settings:
    return Settings(
        evolution_base_url=os.getenv("EVOLUTION_BASE_URL", ""),
        evolution_api_key=os.getenv("EVOLUTION_API_KEY", ""),
        evolution_instance=os.getenv("EVOLUTION_INSTANCE", ""),
    )
