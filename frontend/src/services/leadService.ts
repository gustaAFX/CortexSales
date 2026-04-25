import { api } from "./api";
import type { Lead } from "../types/domain";

export async function getLeads(): Promise<Lead[]> {
  const response = await api.get<Lead[]>("/leads");
  return response.data;
}
