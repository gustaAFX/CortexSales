from app.ai.prompts.gerente import GERENTE_SYSTEM_PROMPT
from app.ai.prompts.sdr import SDR_SYSTEM_PROMPT
from app.ai.prompts.closer import CLOSER_SYSTEM_PROMPT


def test_gerente_prompt_contains_core_rules() -> None:
    prompt = GERENTE_SYSTEM_PROMPT
    assert "auditor" in prompt.lower() or "orquestrador" in prompt.lower()
    assert "proibido vender" in prompt.lower() or "nao vende" in prompt.lower()
    assert "nao interage" in prompt.lower() or "proibido interagir" in prompt.lower()
    assert "humano" in prompt.lower()


def test_sdr_prompt_contains_core_rules() -> None:
    prompt = SDR_SYSTEM_PROMPT
    assert "qualifica" in prompt.lower()
    assert "dor" in prompt.lower()
    assert "orcamento" in prompt.lower() or "orçamento" in prompt.lower()
    assert "nao pode vender" in prompt.lower() or "proibido vender" in prompt.lower()
    assert "preco" in prompt.lower() or "preço" in prompt.lower()


def test_closer_prompt_contains_core_rules() -> None:
    prompt = CLOSER_SYSTEM_PROMPT
    assert "fechamento" in prompt.lower() or "fechar" in prompt.lower()
    assert "objecoe" in prompt.lower() or "objeção" in prompt.lower() or "objecao" in prompt.lower()
    assert "desconto" in prompt.lower()
    assert "nao realiza reunioe" in prompt.lower() or "nao faz reuniao" in prompt.lower() or "nao agenda reuniao" in prompt.lower()


def test_prompts_are_not_empty() -> None:
    assert len(GERENTE_SYSTEM_PROMPT) > 100
    assert len(SDR_SYSTEM_PROMPT) > 100
    assert len(CLOSER_SYSTEM_PROMPT) > 100
