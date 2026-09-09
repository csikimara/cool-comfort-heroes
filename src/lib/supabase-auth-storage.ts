const memoryStore = new Map<string, string>();

const memoryOnlyStorage: Storage = {
  get length() {
    return memoryStore.size;
  },
  clear: () => {
    memoryStore.clear();
  },
  getItem: (key: string) => memoryStore.get(key) ?? null,
  key: (index: number) => Array.from(memoryStore.keys())[index] ?? null,
  removeItem: (key: string) => {
    memoryStore.delete(key);
  },
  setItem: (key: string, value: string) => {
    memoryStore.set(key, value);
  },
};

export const getTabScopedAuthStorage = (): Storage => {
  try {
    const storage = window.sessionStorage;
    const probeKey = "northwind-session-storage-probe";
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return storage;
  } catch {
    // Keep public API calls usable in storage-restricted contexts. Admin auth
    // then becomes memory-only and intentionally disappears on page reload.
    return memoryOnlyStorage;
  }
};

export const removeLegacyPersistentAuthToken = (projectId: string): void => {
  try {
    // Sign old admin sessions out instead of leaving a refresh token behind
    // after the switch from persistent to tab-scoped authentication.
    window.localStorage.removeItem(`sb-${projectId}-auth-token`);
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }
};
