import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { describe, expect, it, vi } from "vitest";

const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const guardScript = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((script) => script.includes("Canonical-host guard"));

if (!guardScript) {
  throw new Error("Canonical-host guard script not found in index.html");
}

type GuardOptions = {
  hostname?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  storage?: Map<string, string>;
  storageUnavailable?: boolean;
};

function runGuard({
  hostname = "cool-comfort-heroes.lovable.app",
  pathname = "/",
  search = "",
  hash = "",
  storage = new Map<string, string>(),
  storageUnavailable = false,
}: GuardOptions = {}) {
  const replace = vi.fn();
  const sessionStorage = {
    getItem(key: string) {
      if (storageUnavailable) throw new Error("storage unavailable");
      return storage.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      if (storageUnavailable) throw new Error("storage unavailable");
      storage.set(key, value);
    },
  };

  const window = {
    location: { hostname, pathname, search, hash, replace },
    sessionStorage,
  };

  vm.runInNewContext(guardScript, { window, URLSearchParams });

  return { replace, storage };
}

describe("Lovable canonical-host guard", () => {
  it("redirects a normal public Lovable URL to the same northwind.hu path", () => {
    const { replace } = runGuard({
      pathname: "/fisher",
      search: "?kampany=nyar",
      hash: "#ajanlat",
    });

    expect(replace).toHaveBeenCalledOnce();
    expect(replace).toHaveBeenCalledWith(
      "https://northwind.hu/fisher?kampany=nyar#ajanlat",
    );
  });

  it("keeps an explicit ?teszt=1 visit on the Lovable hostname", () => {
    const { replace, storage } = runGuard({ search: "?teszt=1" });

    expect(replace).not.toHaveBeenCalled();
    expect(storage.get("northwind-lovable-test-mode")).toBe("1");
  });

  it("keeps later navigation in the same test tab on Lovable", () => {
    const storage = new Map<string, string>();
    runGuard({ search: "?teszt=1", storage });

    const { replace } = runGuard({
      pathname: "/fujitsu",
      storage,
    });

    expect(replace).not.toHaveBeenCalled();
  });

  it("never redirects the admin and authentication routes", () => {
    expect(runGuard({ pathname: "/admin" }).replace).not.toHaveBeenCalled();
    expect(runGuard({ pathname: "/admin/messages" }).replace).not.toHaveBeenCalled();
    expect(runGuard({ pathname: "/auth" }).replace).not.toHaveBeenCalled();
  });

  it("matches only the exact published Lovable hostname", () => {
    const { replace } = runGuard({
      hostname: "cool-comfort-heroes.lovable.app.evil.example",
    });

    expect(replace).not.toHaveBeenCalled();
  });

  it("still honors explicit test mode if session storage is unavailable", () => {
    const { replace } = runGuard({
      search: "?teszt=1",
      storageUnavailable: true,
    });

    expect(replace).not.toHaveBeenCalled();
  });
});
