import { apiGet, apiPost } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { CreateLeadInput, Lead } from "../types";

export const leadsApi = {
  create: (input: CreateLeadInput) => apiPost<Lead>(ENDPOINTS.leads.create, input),
  get: (id: string) => apiGet<Lead>(ENDPOINTS.leads.get(id)),
};