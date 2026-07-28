import { apiGet, apiPost } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { CreateCustomerInput, Customer } from "../types";

export const customersApi = {
  create: (input: CreateCustomerInput) => apiPost<Customer>(ENDPOINTS.customers.create, input),
  get: (id: string) => apiGet<Customer>(ENDPOINTS.customers.get(id)),
};