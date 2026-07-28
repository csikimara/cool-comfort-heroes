import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./config", () => ({
  API_CONFIG: {
    baseUrl: "https://flow.example.com",
    versionPrefix: "/api/v1",
    clientKey: "",
    timeoutMs: 50,
    retries: 2,
    retryDelayMs: 1,
  },
  isFlowApiConfigured: () => true,
  buildUrl: (p: string) => `https://flow.example.com/api/v1${p}`,
}));

import { apiGet, apiPost, apiRequest } from "./client";
import { ApiError } from "./errors";

const originalFetch = globalThis.fetch;

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("apiRequest", () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("builds versioned URLs and unwraps the data envelope", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ data: { id: "1" } }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(apiGet<{ id: string }>("/leads/1")).resolves.toEqual({ id: "1" });
    expect(fetchMock.mock.calls[0][0]).toBe("https://flow.example.com/api/v1/leads/1");
  });

  it("retries idempotent GET requests on 500", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ error: "boom" }, 500))
      .mockResolvedValueOnce(jsonResponse({ data: "ok" }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(apiGet<string>("/status")).resolves.toBe("ok");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does NOT retry POST by default", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ error: "boom" }, 500));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(apiPost("/leads", { a: 1 })).rejects.toBeInstanceOf(ApiError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries POST when an idempotency key is supplied", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ error: "boom" }, 503))
      .mockResolvedValueOnce(jsonResponse({ data: { id: "l1" } }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(apiPost("/leads", { a: 1 }, { idempotencyKey: "key-1" })).resolves.toEqual({ id: "l1" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][1].headers["Idempotency-Key"]).toBe("key-1");
  });

  it("maps status codes to error kinds and does not retry validation errors", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ error: "bad email" }, 422));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(apiGet("/leads")).rejects.toMatchObject({ kind: "validation", status: 422 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("times out slow requests", async () => {
    globalThis.fetch = ((_url: string, init: RequestInit) =>
      new Promise((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => {
          const err = new Error("aborted");
          err.name = "AbortError";
          reject(err);
        });
      })) as unknown as typeof fetch;

    await expect(apiRequest("/slow", { timeoutMs: 10, retries: 0 })).rejects.toMatchObject({ kind: "timeout" });
  });
});