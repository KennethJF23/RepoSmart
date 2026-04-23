export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

export type AuthMeta = {
  firstAuthenticatedAt: string;
  lastAuthenticatedAt: string;
};

const STORAGE_KEYS = {
  token: "reposmart_token",
  user: "reposmart_user",
  meta: "reposmart_auth_meta",
} as const;

const AUTH_CHANGED_EVENT = "reposmart-auth-changed";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAuthToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function getAuthUser(): AuthUser | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      "id" in parsed &&
      "username" in parsed &&
      "email" in parsed &&
      typeof (parsed as { id: unknown }).id === "string" &&
      typeof (parsed as { username: unknown }).username === "string" &&
      typeof (parsed as { email: unknown }).email === "string"
    ) {
      return {
        id: (parsed as { id: string }).id,
        username: (parsed as { username: string }).username,
        email: (parsed as { email: string }).email,
      };
    }
  } catch {
    // ignore
  }

  return null;
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export function setAuth(payload: {
  id: string;
  username: string;
  email: string;
  token: string;
}) {
  if (!isBrowser()) return;

  const now = new Date().toISOString();
  const existingMeta = getAuthMeta();

  localStorage.setItem(STORAGE_KEYS.token, payload.token);
  localStorage.setItem(
    STORAGE_KEYS.user,
    JSON.stringify({
      id: payload.id,
      username: payload.username,
      email: payload.email,
    }),
  );
  localStorage.setItem(
    STORAGE_KEYS.meta,
    JSON.stringify({
      firstAuthenticatedAt: existingMeta?.firstAuthenticatedAt ?? now,
      lastAuthenticatedAt: now,
    }),
  );

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function getAuthMeta(): AuthMeta | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.meta);
  if (!raw) {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    const user = localStorage.getItem(STORAGE_KEYS.user);

    if (token && user) {
      const now = new Date().toISOString();
      const fallbackMeta: AuthMeta = {
        firstAuthenticatedAt: now,
        lastAuthenticatedAt: now,
      };
      localStorage.setItem(STORAGE_KEYS.meta, JSON.stringify(fallbackMeta));
      return fallbackMeta;
    }

    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      "firstAuthenticatedAt" in parsed &&
      "lastAuthenticatedAt" in parsed &&
      typeof (parsed as { firstAuthenticatedAt: unknown }).firstAuthenticatedAt === "string" &&
      typeof (parsed as { lastAuthenticatedAt: unknown }).lastAuthenticatedAt === "string"
    ) {
      return {
        firstAuthenticatedAt: (parsed as { firstAuthenticatedAt: string }).firstAuthenticatedAt,
        lastAuthenticatedAt: (parsed as { lastAuthenticatedAt: string }).lastAuthenticatedAt,
      };
    }
  } catch {
    // ignore
  }

  return null;
}

export function clearAuth() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS.meta);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function subscribeAuth(callback: () => void) {
  if (!isBrowser()) return () => {};

  const onCustom = () => callback();
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEYS.token || event.key === STORAGE_KEYS.user) {
      callback();
    }
  };

  window.addEventListener(AUTH_CHANGED_EVENT, onCustom);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(AUTH_CHANGED_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}
