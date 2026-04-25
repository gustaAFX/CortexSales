from langchain_groq import ChatGroq

from app.core.settings import get_groq_settings


def get_llm() -> ChatGroq:
    settings = get_groq_settings()
    return ChatGroq(
        api_key=settings.api_key,
        model=settings.model,
        temperature=0.3,
    )
