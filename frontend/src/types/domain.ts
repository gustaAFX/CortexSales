export type LeadStatus =
  | "Novo Lead"
  | "Qualificacao (SDR)"
  | "Proposta (Closer)"
  | "Fechado"
  | "Perdido";

export type MeetingStatus = "Agendada" | "Concluida" | "Cancelada";

export interface Lead {
  id: string;
  name: string;
  status: LeadStatus;
  lastInteraction: string;
  ownerAgent: "Gerente" | "SDR" | "Closer";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}
