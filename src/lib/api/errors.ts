/** Machine-readable error categories returned by the API layer. */
export type ApiErrorKind =
  | "network"
  | "timeout"
  | "http"
  | "validation"
  | "rate_limited"
  | "unauthorized"
  | "not_configured"
  | "parse"
  | "unknown";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly details?: unknown;
  readonly endpoint?: string;

  constructor(
    kind: ApiErrorKind,
    message: string,
    options: { status?: number; details?: unknown; endpoint?: string; cause?: unknown } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = options.status;
    this.details = options.details;
    this.endpoint = options.endpoint;
    if (options.cause !== undefined) {
      (this as { cause?: unknown }).cause = options.cause;
    }
  }

  /** Whether retrying the same request could plausibly succeed. */
  get isRetryable(): boolean {
    if (this.kind === "network" || this.kind === "timeout" || this.kind === "rate_limited") return true;
    return this.kind === "http" && typeof this.status === "number" && this.status >= 500;
  }
}

/** Hungarian, user-facing message for any thrown value. */
export const toUserMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.kind) {
      case "timeout":
        return "A kérés időtúllépés miatt megszakadt. Kérjük, próbálja újra.";
      case "network":
        return "Nem sikerült kapcsolódni a szerverhez. Ellenőrizze az internetkapcsolatát.";
      case "rate_limited":
        return "Túl sok kérés érkezett rövid idő alatt. Kérjük, várjon néhány percet.";
      case "unauthorized":
        return "A művelethez nincs jogosultság.";
      case "validation":
        return error.message || "A megadott adatok hiányosak vagy hibásak.";
      case "not_configured":
        return "A szolgáltatás jelenleg nem érhető el.";
      default:
        return error.message || "Váratlan hiba történt. Kérjük, próbálja újra később.";
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return "Váratlan hiba történt. Kérjük, próbálja újra később.";
};