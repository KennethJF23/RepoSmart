import { buildApiUrl } from "@/lib/api";

const OAUTH_STATE_STORAGE_KEY = "reposmart_github_oauth_state";

type GithubClientIdResponse = {
  clientId?: unknown;
  message?: unknown;
};

async function getGithubClientId(): Promise<string> {
  const res = await fetch(buildApiUrl("/api/auth/github-client-id"), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = (await res.json().catch(() => null)) as GithubClientIdResponse | null;

  if (!res.ok) {
    const message =
      (data && typeof data.message === "string" && data.message) ||
      `Failed to load GitHub client id (${res.status})`;
    throw new Error(message);
  }

  const clientId = data && typeof data.clientId === "string" ? data.clientId : null;
  if (!clientId) {
    throw new Error("Server returned an invalid GitHub client id");
  }

  return clientId;
}

export function useGithubAuth() {
  const login = async () => {
    try {
      if (typeof window === "undefined") return;

      const clientId = await getGithubClientId();
      const state = crypto.randomUUID();
      const redirectUri = `${window.location.origin}/auth/github/callback`;

      sessionStorage.setItem(OAUTH_STATE_STORAGE_KEY, state);

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: "read:user user:email",
        state,
      });

      window.location.assign(`https://github.com/login/oauth/authorize?${params.toString()}`);
    } catch (err) {
      console.error("GitHub login failed", err);
      alert(err instanceof Error ? err.message : "Unable to start GitHub sign in.");
    }
  };

  return { login };
}

export { OAUTH_STATE_STORAGE_KEY };
