import { apiGet, apiPost } from "../client";
import { ENDPOINTS } from "../endpoints";
import type { AvailabilityQuery, AvailabilitySlot, Booking, CreateBookingInput } from "../types";

export const calendarApi = {
  availability: (query: AvailabilityQuery) =>
    apiGet<AvailabilitySlot[]>(ENDPOINTS.calendar.availability, {
      query: {
        serviceType: query.serviceType,
        from: query.from,
        to: query.to,
        postalCode: query.postalCode,
      },
    }),
  book: (input: CreateBookingInput) => apiPost<Booking>(ENDPOINTS.calendar.book, input),
  cancel: (id: string) => apiPost<Booking>(ENDPOINTS.calendar.cancel(id)),
};