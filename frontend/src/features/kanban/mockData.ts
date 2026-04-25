import type { Lead } from "../../types/domain";

export const kanbanColumns: Lead["status"][] = [
  "Novo Lead",
  "Qualificacao (SDR)",
  "Proposta (Closer)",
  "Fechado",
  "Perdido"
];

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Ana Souza",
    status: "Novo Lead",
    lastInteraction: "Mensagem no WhatsApp ha 2 min",
    ownerAgent: "SDR"
  },
  {
    id: "lead-2",
    name: "Marcos Lima",
    status: "Qualificacao (SDR)",
    lastInteraction: "Perguntou sobre prazo",
    ownerAgent: "SDR"
  },
  {
    id: "lead-3",
    name: "ACME Ltda",
    status: "Proposta (Closer)",
    lastInteraction: "Solicitou condicao comercial",
    ownerAgent: "Closer"
  }
];
