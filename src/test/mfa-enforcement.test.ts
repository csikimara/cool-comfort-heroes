import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { isAdminSessionIdle } from "../lib/admin-session";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("admin MFA enforcement", () => {
  const auth = read("src/pages/Auth.tsx");
  const admin = read("src/pages/Admin.tsx");
  const migration = read(
    "supabase/migrations/20260814222000_enforce_admin_mfa_and_immutable_holds.sql",
  );

  it("supports TOTP enrollment and step-up verification", () => {
    expect(auth).toContain('factorType: "totp"');
    expect(auth).toContain("challengeAndVerify");
    expect(auth).toContain('autoComplete="one-time-code"');
    expect(auth).not.toContain("error.message");
  });

  it("refuses to render the admin data area without AAL2", () => {
    expect(admin).toContain('assurance?.currentLevel !== "aal2"');
    expect(admin).toContain('navigate("/auth?mfa=required"');
  });

  it("ends an admin session after 15 minutes of inactivity", () => {
    const sessionGuard = read("src/lib/admin-session.ts");
    expect(sessionGuard).toContain("ADMIN_IDLE_TIMEOUT_MS = 15 * 60 * 1000");
    expect(sessionGuard).toContain("northwind-admin-last-activity");
    expect(admin).toContain("Date.now() - lastActivityAt >= ADMIN_IDLE_TIMEOUT_MS");
    expect(admin).toContain("isAdminSessionIdle()");
    expect(admin).toContain('navigate("/auth?reason=idle"');
    expect(admin).toContain('document.addEventListener("visibilitychange"');
    expect(admin).toContain("clearAdminActivity();");
    expect(admin).toContain("onClick={signOutAdmin}");
    expect(isAdminSessionIdle(Date.now(), null)).toBe(true);
  });

  it("enforces AAL2 inside the central database role helper", () => {
    expect(migration).toContain("auth.jwt() ->> 'aal'");
    expect(migration).toContain("= 'aal2'");
    expect(migration).toContain("auth.role() = 'service_role'");
    expect(migration).toContain("SECURITY DEFINER");
  });
});
