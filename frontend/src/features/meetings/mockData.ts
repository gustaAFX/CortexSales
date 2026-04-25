import type { MeetingStatus } from "../../types/domain";

export interface Meeting {
  id: string;
  lead: string;
  datetime: string;
  agent: "Gerente" | "SDR" | "Closer";
  status: MeetingStatus;
}

export const mockMeetings: Meeting[] = [
  {
    id: "m1",
    lead: "Ana Souza",
    datetime: "2026-04-26 10:00",
    agent: "Closer",
    status: "Agendada"
  },
  {
    id: "m2",
    lead: "ACME Ltda",
    datetime: "2026-04-26 14:30",
    agent: "Gerente",
    status: "Concluida"
  },
  {
    id: "m3",
    lead: "Marcos Lima",
    datetime: "2026-04-27 09:00",
    agent: "SDR",
    status: "Cancelada"
  }
];
