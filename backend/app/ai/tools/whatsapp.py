from __future__ import annotations

from langchain_core.tools import tool


@tool
def send_whatsapp_message(chat_id: str, text: str) -> str:
    """Envia uma mensagem de texto via WhatsApp para o lead.

    Args:
        chat_id: ID do chat no WhatsApp (formato: numero@s.whatsapp.net)
        text: Texto da mensagem a ser enviada
    """
    from app.services.whatsapp_service import dispatch_text_message
    import asyncio

    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                result = loop.run_in_executor(pool, asyncio.run, dispatch_text_message(chat_id, text))
        else:
            result = asyncio.run(dispatch_text_message(chat_id, text))
        return f"Mensagem enviada com sucesso para {chat_id}"
    except Exception as exc:
        return f"Erro ao enviar mensagem: {exc}"
