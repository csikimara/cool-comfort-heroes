/**
 * Central API configuration for the Northwind Flow integration layer.
 * Every value is overridable via Vite environment variables so endpoints
 * can be swapped without touching application code.
 */

const env = (key: string, fallback: string): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  return value && value.length > 0 ? value : fallback;
};

const envNumber = (key: string, fallback: number): number => {
  const raw = (import.meta.env as Record<string, string | undefined>)[key];
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const API_CONFIG = {
  /** Base URL of the Northwind Flow backend, e.g. https://flow.northwind.hu */
  baseUrl: env("VITE_FLOW_API_BASE_URL", ""),
  /** API version prefix — all paths are resolved as `${baseUrl}${versionPrefix}${path}` */
  versionPrefix: env("VITE_FLOW_API_VERSION", "/api/v1"),
  /** Optional public client key sent as `X-Api-Key` (never a private secret). */
  clientKey: env("VITE_FLOW_API_CLIENT_KEY", ""),
  /** Per-request timeout in milliseconds. */
  timeoutMs: envNumber("VITE_FLOW_API_TIMEOUT_MS", 15000),
  /** Number of retries for transient failures (network / 5xx / 429). */
  retries: envNumber("VITE_FLOW_API_RETRIES", 2),
  /** Base delay for exponential backoff between retries. */
  retryDelayMs: envNumber("VITE_FLOW_API_RETRY_DELAY_MS", 400),
} as const;

/** True when a Northwind Flow backend URL has been configured. */
export const isFlowApiConfigured = (): boolean => API_CONFIG.baseUrl.length > 0;

export const buildUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = API_CONFIG.baseUrl.replace(/\/+$/, "");
  const prefix = API_CONFIG.versionPrefix.replace(/\/+$/, "");
  return `${base}${prefix}${normalizedPath}`;
};