export const NORTHWIND_ADDRESS = "1118 Budapest, Torbágy u. 16.";
export const NORTHWIND_MAP_LINK = "https://maps.google.com/?q=1118+Budapest+Torb%C3%A1gy+u.+16.";
export const NORTHWIND_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.5!2d19.0234!3d47.4634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddbd5f0b9a3b%3A0x0!2s1118+Budapest%2C+Torb%C3%A1gy+utca+16!5e0!3m2!1shu!2shu!4v1700000000000";

const WEBVIEW_PATTERN = /UAVServiceWebActivity|; wv\)|\bwv\b|WebView|FBAN|FBAV|Instagram|Line\//i;

export const isLikelyInAppWebView = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent || "";
  const isIOSWebView =
    /iPhone|iPad|iPod/i.test(userAgent) && /AppleWebKit/i.test(userAgent) && !/Safari/i.test(userAgent);

  return isIOSWebView || WEBVIEW_PATTERN.test(userAgent);
};

interface LoadExternalScriptOptions {
  id: string;
  src: string;
  timeoutMs?: number;
}

export const loadExternalScript = ({
  id,
  src,
  timeoutMs = 8000,
}: LoadExternalScriptOptions) =>
  new Promise<boolean>((resolve) => {
    if (typeof document === "undefined") {
      resolve(false);
      return;
    }

    const existingScript = document.getElementById(id) as HTMLScriptElement | null;

    if (existingScript?.dataset.loaded === "true") {
      resolve(true);
      return;
    }

    const script = existingScript ?? document.createElement("script");
    let settled = false;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };

    const finish = (value: boolean) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve(value);
    };

    const handleLoad = () => {
      script.dataset.loaded = "true";
      finish(true);
    };

    const handleError = () => {
      script.dataset.loaded = "false";
      finish(false);
    };

    const timeoutId = window.setTimeout(() => {
      finish(script.dataset.loaded === "true");
    }, timeoutMs);

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.id = id;
      script.src = src;
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      return;
    }

    if (existingScript.dataset.loaded === "false") {
      finish(false);
    }
  });
