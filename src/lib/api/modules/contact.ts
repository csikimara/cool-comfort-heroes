import { supabase } from "@/integrations/supabase/client";
import { ApiError } from "../errors";

/**
 * Contact channel: everything (fields, Turnstile token and the optional file)
 * is sent in a single request to the `send-contact-email` edge function, which
 * verifies the request server-side before storing anything. The browser never
 * uploads directly to the private `contact-attachments` bucket.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  page_url?: string;
  turnstileToken?: string | null;
  /** Optional file — validated and stored server-side by the edge function. */
  attachment?: File | null;
}

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;

export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;

export const validateAttachment = (file: File): void => {
  if (file.size > MAX_ATTACHMENT_SIZE) {
    throw new ApiError("validation", "A csatolt fájl mérete túl nagy (max. 10 MB).");
  }
  if (!(ALLOWED_ATTACHMENT_MIME_TYPES as readonly string[]).includes(file.type.toLowerCase())) {
    throw new ApiError("validation", "Nem támogatott fájlformátum. Engedélyezett: PDF, JPG, JPEG, PNG.");
  }
};

export const buildContactFormData = (payload: ContactSubmission): FormData => {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("email", payload.email);
  form.append("phone", payload.phone ?? "");
  form.append("message", payload.message);
  form.append("source", payload.source);
  form.append("page_url", payload.page_url ?? "");
  form.append("turnstileToken", payload.turnstileToken ?? "");
  if (payload.attachment) {
    form.append("attachment", payload.attachment, payload.attachment.name);
  }
  return form;
};

export const contactApi = {
  validateAttachment,
  submit: async (payload: ContactSubmission): Promise<void> => {
    if (payload.attachment) validateAttachment(payload.attachment);
    const { data, error } = await supabase.functions.invoke("send-contact-email", {
      body: buildContactFormData(payload),
    });
    if (error) throw new ApiError("http", error.message, { details: error });
    const err = (data as { error?: string } | null)?.error;
    if (err) throw new ApiError("http", err);
  },
};