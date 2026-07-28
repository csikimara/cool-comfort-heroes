import { apiGet, apiPost } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { CreateWorkOrderInput, WorkOrder } from "../types";

export const workOrdersApi = {
  create: (input: CreateWorkOrderInput) => apiPost<WorkOrder>(ENDPOINTS.workOrders.create, input),
  get: (id: string) => apiGet<WorkOrder>(ENDPOINTS.workOrders.get(id)),
};