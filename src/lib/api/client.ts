import { API_CONFIG, buildUrl, isFlowApiConfigured } from "./config";
import { ApiError } from "./errors";
import type { ApiErrorBody, ApiResponse } from "./types";

export interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  /** Override the global timeout for this call. */
  timeoutMs?: number;
  /** Override the global retry count for this call. */
  retries?: number;
  /**
   * Opt-in retry for non-idempotent methods (POST/PATCH/PUT/DELETE).
   * Only set this when the endpoint is safe to repeat — typically together
   * with `idempotencyKey`, which lets the backend de-duplicate replays.
   */
  allowUnsafeRetry?: boolean;
  /** Sent as `Idempotency-Key`; enables safe retry of write operations. */
  idempotencyKey?: string;
  signal?: AbortSignal;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** HTTP methods that are safe to repeat without side effects. */
const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "PUT", "DELETE"]);

const withQuery = (url: string, query?: RequestOptions["query"]): string => {
  if (!query) return url;
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
};

const kindForStatus = (status: number) => {
  if (status === 401 || status === 403) return "unauthorized" as const;
  if (status === 422 || status === 400) return "validation" as const;
  if (status === 429) return "rate_limited" as const;
  return "http" as const;
};

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

/**
 * Low-level request helper: versioned URL building, timeout, retry with
 * exponential backoff and normalized ApiError handling.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!isFlowApiConfigured()) {
    throw new ApiError("not_configured", "A Northwind Flow API nincs konfigurálva (VITE_FLOW_API_BASE_URL).", {
      endpoint: path,
    });
  }

  const {
    method = "GET",
    body,
    query,
    headers = {},
    timeoutMs = API_CONFIG.timeoutMs,
    retries = API_CONFIG.retries,
    allowUnsafeRetry = false,
    idempotencyKey,
    signal,
  } = options;

  const url = withQuery(buildUrl(path), query);
  // Never replay a non-idempotent write unless the caller explicitly opts in
  // or supplies an idempotency key the backend can de-duplicate on.
  const retryAllowed =
    IDEMPOTENT_METHODS.has(method) || allowUnsafeRetry || Boolean(idempotencyKey);
  const maxRetries = retryAllowed ? Math.max(0, retries) : 0;
  let lastError: ApiError | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const onExternalAbort = () => controller.abort();
    signal?.addEventListener("abort", onExternalAbort, { once: true });

    try {
      const response = await fetch(url, {
        method,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
          ...(API_CONFIG.clientKey ? { "X-Api-Key": API_CONFIG.clientKey } : {}),
          ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      const payload = await parseBody(response);

      if (!response.ok) {
        const errBody = (payload ?? {}) as ApiErrorBody;
        throw new ApiError(kindForStatus(response.status), errBody.error || `HTTP ${response.status}`, {
          status: response.status,
          details: errBody.details ?? payload,
          endpoint: path,
        });
      }

      if (payload && typeof payload === "object" && "data" in (payload as object)) {
        return (payload as ApiResponse<T>).data;
      }
      return payload as T;
    } catch (error) {
      const aborted = error instanceof Error && error.name === "AbortError";
      const apiError = error instanceof ApiError
        ? error
        : aborted && signal?.aborted
          // Caller-initiated cancellation — not retryable.
          ? new ApiError("unknown", "A kérés megszakadt.", { endpoint: path, cause: error })
          : aborted
            ? new ApiError("timeout", `A kérés időtúllépés miatt megszakadt (${timeoutMs} ms).`, { endpoint: path })
            : new ApiError("network", "Hálózati hiba a kérés közben.", { endpoint: path, cause: error });

      lastError = apiError;
      if (!apiError.isRetryable || attempt === maxRetries) throw apiError;
      await sleep(API_CONFIG.retryDelayMs * 2 ** attempt);
    } finally {
      clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onExternalAbort);
    }
  }

  throw lastError ?? new ApiError("unknown", "Ismeretlen hiba.", { endpoint: path });
}

export const apiGet = <T>(path: string, options: Omit<RequestOptions, "method" | "body"> = {}) =>
  apiRequest<T>(path, { ...options, method: "GET" });

export const apiPost = <T>(path: string, body?: unknown, options: Omit<RequestOptions, "method" | "body"> = {}) =>
  apiRequest<T>(path, { ...options, method: "POST", body });

export const apiPatch = <T>(path: string, body?: unknown, options: Omit<RequestOptions, "method" | "body"> = {}) =>
  apiRequest<T>(path, { ...options, method: "PATCH", body });