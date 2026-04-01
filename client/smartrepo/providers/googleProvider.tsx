"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { buildApiUrl } from "@/lib/api";

export default function GoogleProvider({ children }: { children: ReactNode }) {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadClientId() {
      try {
        const res = await fetch(buildApiUrl("/api/auth/google-client-id"), {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = (await res.json().catch(() => null)) as
          | { clientId?: unknown; message?: unknown }
          | null;

        if (!res.ok) {
          const message =
            (data && typeof data.message === "string" && data.message) ||
            `Failed to load Google client id (${res.status})`;
          throw new Error(message);
        }

        const id = data && typeof data.clientId === "string" ? data.clientId : null;
        if (!id) {
          throw new Error("Server returned an invalid Google client id");
        }

        if (!cancelled) {
          setClientId(id);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load GOOGLE_CLIENT_ID from backend", err);
        }
      }
    }

    loadClientId();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!clientId) {
    return null; // prevents Google OAuth components from crashing
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}