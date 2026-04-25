import { api } from "./api";

export interface AgentActivity {
  id: string;
  agent: "Gerente" | "SDR" | "Closer";
  message: string;
  createdAt: string;
}

export async function getAgentActivities(): Promise<AgentActivity[]> {
  const response = await api.get<AgentActivity[]>("/agents/activities");
  return response.data;
}
