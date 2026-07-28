/**
 * Every path is relative to `${VITE_FLOW_API_BASE_URL}${VITE_FLOW_API_VERSION}`
 * and individually overridable with an environment variable, so a single
 * endpoint can be repointed without a code change.
 */
const path = (key: string, fallback: string): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  return value && value.length > 0 ? value : fallback;
};

export const ENDPOINTS = {
  leads: {
    create: path("VITE_FLOW_EP_LEADS_CREATE", "/leads"),
    get: (id: string) => `${path("VITE_FLOW_EP_LEADS", "/leads")}/${encodeURIComponent(id)}`,
  },
  waitlist: {
    join: path("VITE_FLOW_EP_WAITLIST_JOIN", "/waitlist"),
    get: (id: string) => `${path("VITE_FLOW_EP_WAITLIST", "/waitlist")}/${encodeURIComponent(id)}`,
    leave: (id: string) => `${path("VITE_FLOW_EP_WAITLIST", "/waitlist")}/${encodeURIComponent(id)}/cancel`,
  },
  customers: {
    create: path("VITE_FLOW_EP_CUSTOMERS_CREATE", "/customers"),
    get: (id: string) => `${path("VITE_FLOW_EP_CUSTOMERS", "/customers")}/${encodeURIComponent(id)}`,
  },
  workOrders: {
    create: path("VITE_FLOW_EP_WORK_ORDERS_CREATE", "/work-orders"),
    get: (id: string) => `${path("VITE_FLOW_EP_WORK_ORDERS", "/work-orders")}/${encodeURIComponent(id)}`,
  },
  calendar: {
    availability: path("VITE_FLOW_EP_CALENDAR_AVAILABILITY", "/calendar/availability"),
    book: path("VITE_FLOW_EP_CALENDAR_BOOK", "/calendar/bookings"),
    cancel: (id: string) =>
      `${path("VITE_FLOW_EP_CALENDAR_BOOKINGS", "/calendar/bookings")}/${encodeURIComponent(id)}/cancel`,
  },
  status: {
    lookup: path("VITE_FLOW_EP_STATUS", "/status"),
  },
} as const;