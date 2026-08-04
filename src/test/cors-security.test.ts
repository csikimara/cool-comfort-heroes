import { describe, it, expect } from "vitest";
import {
  resolveCors,
  allowedOrigins,
  isLocalhostAllowed,
  PRODUCTION_ALLOWED_ORIGINS,
} from "../../supabase/functions/_shared/cors";

describe("edge function CORS", () => {
  it("echoes back allowed production origins exactly", () => {
    for (const origin of PRODUCTION_ALLOWED_ORIGINS) {
      const cors = resolveCors(origin);
      expect(cors.allowed).toBe(true);
      expect(cors.headers["Access-Control-Allow-Origin"]).toBe(origin);
      expect(cors.headers["Vary"]).toBe("Origin");
    }
  });

  it("never emits a wildcard origin", () => {
    const cases = [null, "https://northwind.hu", "https://evil.example"];
    for (const c of cases) {
      expect(resolveCors(c, true).headers["Access-Control-Allow-Origin"]).not.toBe("*");
    }
  });

  it("rejects unknown and substring-similar origins", () => {
    const bad = [
      "https://evil.example",
      "https://northwind.hu.evil.com",
      "https://evil.com/https://northwind.hu",
      "http://northwind.hu",
      "https://sub.northwind.hu",
      "https://cool-comfort-heroes.lovable.app.evil.com",
    ];
    for (const origin of bad) {
      const cors = resolveCors(origin);
      expect(cors.allowed).toBe(false);
      expect(cors.headers["Access-Control-Allow-Origin"]).toBeUndefined();
    }
  });

  it("allows origin-less (server-to-server) requests without an ACAO header", () => {
    const cors = resolveCors(null);
    expect(cors.allowed).toBe(true);
    expect(cors.headers["Access-Control-Allow-Origin"]).toBeUndefined();
  });

  it("only allows localhost when explicitly enabled via env", () => {
    expect(resolveCors("http://localhost:8080").allowed).toBe(false);
    expect(resolveCors("http://localhost:8080", true).allowed).toBe(true);
    expect(isLocalhostAllowed({})).toBe(false);
    expect(isLocalhostAllowed({ ALLOW_LOCALHOST_CORS: "true" })).toBe(true);
    expect(isLocalhostAllowed({ ALLOW_LOCALHOST_CORS: "false" })).toBe(false);
    expect(allowedOrigins(false)).toHaveLength(3);
  });
});