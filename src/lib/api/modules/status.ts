import { apiGet } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { StatusResult, TrackableResource } from "../types";

export const statusApi = {
  lookup: (resource: TrackableResource, id: string) =>
    apiGet<StatusResult>(ENDPOINTS.status.lookup, { query: { resource, id } }),
};