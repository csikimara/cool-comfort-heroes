/**
 * Shared TypeScript contracts for the Northwind Flow API layer.
 * These describe the wire format the Flow backend is expected to implement.
 */

/** Envelope every Flow endpoint should return. */
export interface ApiResponse<T> {
  data: T;
  requestId?: string;
  meta?: Record<string, unknown>;
}

/** Error body shape the Flow backend should return for 4xx/5xx. */
export interface ApiErrorBody {
  error: string;
  code?: string;
  details?: unknown;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface ContactDetails {
  name: string;
  email: string;
  phone?: string;
}

export interface AttachmentRef {
  path: string;
  name: string;
  size: number;
  mime: string;
}

export interface AddressInput {
  postalCode?: string;
  city?: string;
  street?: string;
  note?: string;
}

/* ------------------------------------------------------------------ leads */

export type LeadSource = string;

export interface CreateLeadInput extends ContactDetails {
  message?: string;
  source: LeadSource;
  pageUrl?: string;
  brand?: "fujitsu" | "fisher" | "general";
  serviceType?: string;
  address?: AddressInput;
  attachments?: AttachmentRef[];
  captchaToken?: string;
}

export interface Lead extends ContactDetails {
  id: string;
  status: "new" | "contacted" | "qualified" | "converted" | "archived";
  message?: string;
  source: LeadSource;
  createdAt: string;
}

/* --------------------------------------------------------------- waitlist */

export interface WaitlistEntryInput extends ContactDetails {
  serviceType: string;
  preferredFrom?: string;
  preferredTo?: string;
  note?: string;
}

export interface WaitlistEntry extends ContactDetails {
  id: string;
  serviceType: string;
  position?: number;
  status: "waiting" | "offered" | "scheduled" | "cancelled";
  createdAt: string;
}

/* -------------------------------------------------------------- customers */

export interface CreateCustomerInput extends ContactDetails {
  companyName?: string;
  taxNumber?: string;
  address?: AddressInput;
  leadId?: string;
}

export interface Customer extends ContactDetails {
  id: string;
  companyName?: string;
  address?: AddressInput;
  createdAt: string;
}

/* ------------------------------------------------------------ work orders */

export interface CreateWorkOrderInput {
  customerId: string;
  serviceType: string;
  description?: string;
  scheduledAt?: string;
  attachments?: AttachmentRef[];
}

export interface WorkOrder {
  id: string;
  customerId: string;
  serviceType: string;
  status: "draft" | "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduledAt?: string;
  createdAt: string;
}

/* ---------------------------------------------------------------- calendar */

export interface AvailabilityQuery {
  serviceType: string;
  from: string;
  to: string;
  postalCode?: string;
}

export interface AvailabilitySlot {
  start: string;
  end: string;
  capacity: number;
}

export interface CreateBookingInput {
  slotStart: string;
  slotEnd: string;
  serviceType: string;
  contact: ContactDetails;
  customerId?: string;
  workOrderId?: string;
  note?: string;
}

export interface Booking {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  slotStart: string;
  slotEnd: string;
  createdAt: string;
}

/* ------------------------------------------------------------------ status */

export type TrackableResource = "lead" | "waitlist" | "work-order" | "booking";

export interface StatusResult {
  resource: TrackableResource;
  id: string;
  status: string;
  updatedAt: string;
  history?: Array<{ status: string; at: string; note?: string }>;
}