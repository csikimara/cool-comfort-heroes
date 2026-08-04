// Strict, exact-match CORS handling for the public edge functions.
//
// Notes:
// - Requests WITHOUT an `Origin` header (server-to-server, curl, internal
//   tests) are NOT blocked here: CORS is a browser mechanism and blocking
//   them would break legitimate backend calls. They receive no
//   Access-Control-Allow-Origin header at all. Abuse protection for those
//   requests comes from Turnstile, rate limiting and server-side validation.
// - CORS never prevents direct HTTP calls; it only constrains browsers.

export const PRODUCTION_ALLOWED_ORIGINS = [
  "https://cool-comfort-heroes.lovable.app",
  "https://northwind.hu",
  "https://www.northwind.hu",
] as const;

const DEV_ALLOWED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5173",
];

export const ALLOWED_HEADERS =
  "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version";

export function allowedOrigins(allowLocalhost: boolean): string[] {
  return allowLocalhost
    ? [...PRODUCTION_ALLOWED_ORIGINS, ...DEV_ALLOWED_ORIGINS]
    : [...PRODUCTION_ALLOWED_ORIGINS];
}

export function isLocalhostAllowed(env: {
  ALLOW_LOCALHOST_CORS?: string;
}): boolean {
  return (env.ALLOW_LOCALHOST_CORS ?? "").toLowerCase() === "true";
}

export interface CorsDecision {
  /** Whether the request may proceed. */
  allowed: boolean;
  /** Headers to attach to every response (including errors). */
  headers: Record<string, string>;
}

/**
 * Exact-match origin check. `origin` is the raw `Origin` request header
 * (null/empty when absent).
 */
export function resolveCors(
  origin: string | null,
  allowLocalhost = false,
): CorsDecision {
  const base: Record<string, string> = {
    "Vary": "Origin",
    "Access-Control-Allow-Headers": ALLOWED_HEADERS,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };

  // No Origin header: not a browser CORS request. Allowed, no ACAO header.
  if (!origin) return { allowed: true, headers: base };

  if (allowedOrigins(allowLocalhost).includes(origin)) {
    return {
      allowed: true,
      headers: { ...base, "Access-Control-Allow-Origin": origin },
    };
  }

  return { allowed: false, headers: base };
}