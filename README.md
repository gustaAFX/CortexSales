# CortexSales

Plataforma de vendas com agentes de IA para automacao comercial via WhatsApp.

## Arquitetura

```
CortexSales/
├── backend/          # FastAPI + SQLAlchemy + SQLite
│   ├── app/
│   │   ├── ai/           # Modulo de IA (LangGraph/LangChain)
│   │   │   ├── agents/   # Nos dos agentes (SDR, Closer, Gerente)
│   │   │   ├── langgraph/ # StateGraph e estado compartilhado
│   │   │   ├── prompts/  # System prompts dos agentes
│   │   │   └── tools/    # Tools para LangChain (WhatsApp)
│   │   ├── api/routes/   # Rotas HTTP
│   │   ├── controllers/  # Controladores
│   │   ├── core/         # Configuracoes
│   │   ├── database/     # Sessao e engine do banco
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── repositories/ # Acesso a dados
│   │   ├── schemas/      # Schemas Pydantic
│   │   └── services/     # Logica de negocios
│   ├── tests/
│   ├── main.py
│   └── requirements.txt
└── frontend/         # React 18 + TypeScript + Vite + Tailwind CSS
    ├── src/
    │   ├── components/   # Componentes reutilizaveis
    │   ├── features/     # Modulos por funcionalidade
    │   ├── hooks/        # Hooks customizados
    │   ├── layouts/      # Layouts da aplicacao
    │   ├── pages/        # Paginas/rotas
    │   ├── services/     # Clientes de API
    │   ├── store/        # Estado global (Context API)
    │   └── types/        # Tipos de dominio
    ├── tests/
    ├── package.json
    └── index.html
```

## Requisitos

- Python 3.11+
- Node.js 18+
- npm 9+

## Configuracao

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Variaveis de Ambiente

### Backend

| Variavel | Descricao | Obrigatoria |
|---|---|---|
| `DATABASE_URL` | URL de conexao ao banco (padrao: `sqlite:///./cortexsales.db`) | Nao |
| `EVOLUTION_BASE_URL` | URL base da Evolution API | Sim* |
| `EVOLUTION_API_KEY` | Chave de API da Evolution | Sim* |
| `EVOLUTION_INSTANCE` | Nome da instancia Evolution | Sim* |
| `GROQ_API_KEY` | Chave de API do Groq para LLMs | Sim** |
| `GROQ_MODEL` | Modelo Groq (padrao: `llama-3.3-70b-versatile`) | Nao |

\* Obrigatorias apenas para funcionalidades de WhatsApp.

\*\* Obrigatoria para agentes IA. Sem a key, o sistema usa fallback baseado em keywords.

### Frontend

| Variavel | Descricao | Obrigatoria |
|---|---|---|
| `VITE_API_URL` | URL da API backend (padrao: `http://localhost:8000`) | Nao |

## Executando

### Backend

```bash
cd backend
uvicorn main:app --reload
```

A API estara disponivel em `http://localhost:8000`. Documentacao interativa em `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm run dev
```

A aplicacao estara disponivel em `http://localhost:5173`.

## Testes

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd frontend
npm test
```

## Endpoints da API

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/products` | Criar produto |
| `GET` | `/products` | Listar produtos |
| `GET` | `/products/{id}` | Buscar produto |
| `PUT` | `/products/{id}` | Atualizar produto |
| `DELETE` | `/products/{id}` | Remover produto |
| `GET` | `/branding` | Buscar configuracao de branding |
| `PUT` | `/branding` | Criar/atualizar branding |
| `POST` | `/whatsapp/webhook` | Webhook do WhatsApp (Evolution API) |
| `POST` | `/whatsapp/send-text` | Enviar mensagem de texto |
| `POST` | `/whatsapp/send-media` | Enviar midia |
| `POST` | `/agents/handle-incoming` | Processar mensagem recebida pelo protocolo de agentes |

## Agentes de IA

O sistema usa LangGraph para orquestrar 3 agentes:

| Agente | Papel | Regras |
|---|---|---|
| **Gerente** | Auditor e orquestrador | Nao vende, nao interage com leads. Aciona humanos. |
| **SDR** | Primeiro contato e qualificacao | Identifica dor + orcamento. Nao vende, nao informa preco. |
| **Closer** | Fechamento de vendas | Contorna objecoes, concede desconto ate 10%. Nao faz reunioes. |

### Fluxo

1. Mensagem recebida → Router define agente inicial
2. SDR qualifica → encaminha ao Closer ou descarta
3. Closer tenta fechar → sucesso (END) ou aciona Gerente
4. Gerente → aciona intervencao humana

### Fallback

Sem `GROQ_API_KEY`, o sistema usa routing baseado em keywords (sem LLM).

## Licenca

Consulte o arquivo [LICENSE](LICENSE).
