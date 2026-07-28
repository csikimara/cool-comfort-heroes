import { supabase } from "@/integrations/supabase/client";
import { ApiError } from "../errors";
import type { AttachmentRef } from "../types";

/**
 * Current (unchanged) contact channel: Supabase Storage upload + the
 * `send-contact-email` edge function. Exposed through the API layer so the
 * transport can later be swapped for the Northwind Flow `leads` endpoint
 * without touching the form components.
 */

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  page_url?: string;
  turnstileToken?: string | null;
  attachment?: AttachmentRef | null;
}

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;

export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;

const sanitizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-120);

export const uploadContactAttachment = async (file: File): Promise<AttachmentRef> => {
  if (file.size > MAX_ATTACHMENT_SIZE) {
    throw new ApiError("validation", "A csatolt fájl mérete túl nagy (max. 10 MB).");
  }
  if (!(ALLOWED_ATTACHMENT_MIME_TYPES as readonly string[]).includes(file.type.toLowerCase())) {
    throw new ApiError("validation", "Nem támogatott fájlformátum. Engedélyezett: PDF, JPG, JPEG, PNG.");
  }

  const objectPath = `${crypto.randomUUID()}/${sanitizeFileName(file.name)}`;
  const { error } = await supabase.storage
    .from("contact-attachments")
    .upload(objectPath, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new ApiError("http", error.message, { details: error });
  }

  return {
    path: objectPath,
    name: file.name.slice(0, 200),
    size: file.size,
    mime: file.type,
  };
};

export const contactApi = {
  uploadAttachment: uploadContactAttachment,
  submit: async (payload: ContactSubmission): Promise<void> => {
    const { data, error } = await supabase.functions.invoke("send-contact-email", { body: payload });
    if (error) throw new ApiError("http", error.message, { details: error });
    const err = (data as { error?: string } | null)?.error;
    if (err) throw new ApiError("http", err);
  },
};