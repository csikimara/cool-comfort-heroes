import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Nincs fallback kulcs: élesben kizárólag a valódi, buildkor beállított
// VITE_TURNSTILE_SITE_KEY használható.
const GENERIC_WIDGET_ERROR =
  "A robotellenőrzés jelenleg nem elérhető. Kérjük, töltse újra az oldalt, vagy keressen minket telefonon: +36 70 409 9760.";

function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.turnstile) return resolve();
    const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as
      | HTMLScriptElement
      | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("turnstile-load")), {
        once: true,
      });
      return;
    }
    const s = document.createElement("script");
    s.id = TURNSTILE_SCRIPT_ID;
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile-load"));
    document.head.appendChild(s);
  });
}

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
  className?: string;
}

const TurnstileWidget = ({ onToken, className }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const siteKey = (
    (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? ""
  ).trim();

  useEffect(() => {
    if (!siteKey) {
      setHasError(true);
      onToken(null);
      return;
    }
    let cancelled = false;
    setHasError(false);
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          size: "flexible",
          callback: (token: string) => {
            setHasError(false);
            onToken(token);
          },
          "error-callback": () => {
            setHasError(true);
            onToken(null);
          },
          "expired-callback": () => onToken(null),
        });
      })
      .catch(() => {
        setHasError(true);
        onToken(null);
      });
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* noop */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return (
    <div className={className}>
      <div ref={containerRef} />
      {hasError && (
        <p className="mt-2 text-sm text-destructive">{GENERIC_WIDGET_ERROR}</p>
      )}
    </div>
  );
};

export default TurnstileWidget;