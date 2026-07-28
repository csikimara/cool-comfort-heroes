import { apiGet, apiPost } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { WaitlistEntry, WaitlistEntryInput } from "../types";

export const waitlistApi = {
  join: (input: WaitlistEntryInput) => apiPost<WaitlistEntry>(ENDPOINTS.waitlist.join, input),
  get: (id: string) => apiGet<WaitlistEntry>(ENDPOINTS.waitlist.get(id)),
  leave: (id: string) => apiPost<{ id: string; status: string }>(ENDPOINTS.waitlist.leave(id)),
};