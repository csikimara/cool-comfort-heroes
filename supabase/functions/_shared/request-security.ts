/** Pure request guards shared by the contact Edge Function and unit tests. */

export const MAX_REQUEST_BYTES = 12 * 1024 * 1024;

type HeaderReader = Pick<Headers, "get">;

const isIpv4 = (value: string): boolean => {
  const parts = value.split(".");
  return parts.length === 4 && parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const octet = Number(part);
    return octet >= 0 && octet <= 255;
  });
};

const isIpv6 = (value: string): boolean => {
  if (!value.includes(":")) return false;
  const halves = value.split("::");
  if (halves.length > 2) return false;

  const parts = [
    ...(halves[0] ? halves[0].split(":") : []),
    ...(halves[1] ? halves[1].split(":") : []),
  ];
  let groups = 0;
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (part.includes(".")) {
      if (index !== parts.length - 1 || !isIpv4(part)) return false;
      groups += 2;
    } else {
      if (!/^[0-9a-f]{1,4}$/i.test(part)) return false;
      groups += 1;
    }
  }

  return halves.length === 2 ? groups < 8 : groups === 8;
};

const firstHeaderValue = (value: string | null): string | null => {
  const candidate = value?.split(",", 1)[0]?.trim();
  if (
    !candidate ||
    candidate.length > 64 ||
    (!isIpv4(candidate) && !isIpv6(candidate))
  ) {
    return null;
  }
  return candidate;
};

/**
 * The edge platform-provided single-client headers take precedence over the
 * potentially chained X-Forwarded-For value.
 */
export const getClientIp = (headers: HeaderReader): string =>
  firstHeaderValue(headers.get("cf-connecting-ip")) ??
  firstHeaderValue(headers.get("x-real-ip")) ??
  firstHeaderValue(headers.get("x-forwarded-for")) ??
  "unknown";

export const exceedsRequestLimit = (contentLength: string | null): boolean => {
  if (!contentLength) return false;
  if (!/^\d+$/.test(contentLength.trim())) return true;
  const bytes = Number(contentLength);
  return !Number.isSafeInteger(bytes) || bytes < 0 || bytes > MAX_REQUEST_BYTES;
};

/**
 * Reads a possibly chunked request with an actual byte ceiling. Content-Length
 * is only an early rejection hint and cannot be trusted to be present.
 * Returns null when the stream exceeds the configured limit.
 */
export const readRequestBodyWithLimit = async (
  request: Request,
  maxBytes = MAX_REQUEST_BYTES,
): Promise<Uint8Array | null> => {
  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel("request body too large").catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
};
