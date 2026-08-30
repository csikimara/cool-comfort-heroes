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
