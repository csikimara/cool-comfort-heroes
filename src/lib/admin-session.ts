export const ADMIN_IDLE_TIMEOUT_MS = 15 * 60 * 1000;

const ADMIN_ACTIVITY_KEY = "northwind-admin-last-activity";
let memoryLastActivity: number | null = null;

const validTimestamp = (value: number): boolean =>
  Number.isFinite(value) && value > 0 && value <= Date.now() + 60_000;

export const readAdminLastActivity = (): number | null => {
  try {
    const stored = Number(window.sessionStorage.getItem(ADMIN_ACTIVITY_KEY));
    if (validTimestamp(stored)) {
      memoryLastActivity = stored;
      return stored;
    }
  } catch {
    // The shared in-memory value still protects the current page lifetime.
  }
  return memoryLastActivity;
};

export const recordAdminActivity = (at = Date.now()): void => {
  if (!validTimestamp(at)) return;
  memoryLastActivity = at;
  try {
    window.sessionStorage.setItem(ADMIN_ACTIVITY_KEY, String(at));
  } catch {
    // Storage-restricted browsers use the module-level value only.
  }
};

export const clearAdminActivity = (): void => {
  memoryLastActivity = null;
  try {
    window.sessionStorage.removeItem(ADMIN_ACTIVITY_KEY);
  } catch {
    // Nothing else to clear when browser storage is unavailable.
  }
};

export const isAdminSessionIdle = (
  now = Date.now(),
  lastActivity = readAdminLastActivity(),
): boolean =>
  lastActivity === null || now - lastActivity >= ADMIN_IDLE_TIMEOUT_MS;
