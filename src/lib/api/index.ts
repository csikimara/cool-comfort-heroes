export { API_CONFIG, buildUrl, isFlowApiConfigured } from "./config";
export { ApiError, toUserMessage } from "./errors";
export type { ApiErrorKind } from "./errors";
export { apiRequest, apiGet, apiPost, apiPatch } from "./client";
export type { RequestOptions } from "./client";
export { ENDPOINTS } from "./endpoints";
export * from "./types";

import { calendarApi } from "./modules/calendar";
import { contactApi } from "./modules/contact";
import { customersApi } from "./modules/customers";
import { leadsApi } from "./modules/leads";
import { statusApi } from "./modules/status";
import { waitlistApi } from "./modules/waitlist";
import { workOrdersApi } from "./modules/workOrders";

export { calendarApi, contactApi, customersApi, leadsApi, statusApi, waitlistApi, workOrdersApi };

/** Single entry point for all outbound communication. */
export const api = {
  contact: contactApi,
  leads: leadsApi,
  waitlist: waitlistApi,
  customers: customersApi,
  workOrders: workOrdersApi,
  calendar: calendarApi,
  status: statusApi,
} as const;