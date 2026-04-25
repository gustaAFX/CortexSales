import os
from dataclasses import dataclass


class SettingsError(Exception):
    pass


@dataclass(frozen=True)
class Settings:
    evolution_base_url: str
    evolution_api_key: str
    evolution_instance: str


@dataclass(frozen=True)
class GroqSettings:
    api_key: str
    model: str


def get_settings() -> Settings:
    base_url = os.getenv("EVOLUTION_BASE_URL", "")
    api_key = os.getenv("EVOLUTION_API_KEY", "")
    instance = os.getenv("EVOLUTION_INSTANCE", "")

    missing = []
    if not base_url:
        missing.append("EVOLUTION_BASE_URL")
    if not api_key:
        missing.append("EVOLUTION_API_KEY")
    if not instance:
        missing.append("EVOLUTION_INSTANCE")

    if missing:
        raise SettingsError(
            f"Missing required environment variables: {', '.join(missing)}"
        )

    return Settings(
        evolution_base_url=base_url,
        evolution_api_key=api_key,
        evolution_instance=instance,
    )


def get_groq_settings() -> GroqSettings:
    api_key = os.getenv("GROQ_API_KEY", "")
    model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    if not api_key:
        raise SettingsError("Missing required environment variable: GROQ_API_KEY")

    return GroqSettings(api_key=api_key, model=model)
