import { useEffect } from "react";
import { isLikelyInAppWebView, loadExternalScript } from "@/lib/external";

type FeaturebaseFn = ((command: string, options?: Record<string, unknown>) => void) & {
  isBooted?: boolean;
  q?: unknown[][];
};

declare global {
  interface Window {
    Featurebase?: FeaturebaseFn;
  }
}

const FEATUREBASE_APP_ID = "699d9791df681b5493364ade";
const FEATUREBASE_SCRIPT_URL = "https://do.featurebase.app/js/sdk.js";

const bootFeaturebase = () => {
  if (typeof window.Featurebase === "function" && window.Featurebase.isBooted) {
    return;
  }

  if (typeof window.Featurebase !== "function") {
    const queueable = ((...args: unknown[]) => {
      (queueable.q = queueable.q || []).push(args);
    }) as FeaturebaseFn;

    window.Featurebase = queueable;
  }

  window.Featurebase?.("boot", {
    appId: FEATUREBASE_APP_ID,
    placement: "right",
  });

  if (window.Featurebase) {
    window.Featurebase.isBooted = true;
  }
};

const FeaturebaseLoader = () => {
  useEffect(() => {
    if (typeof window === "undefined" || isLikelyInAppWebView()) {
      return;
    }

    let isCancelled = false;

    const start = async () => {
      const isLoaded = await loadExternalScript({
        id: "featurebase-sdk",
        src: FEATUREBASE_SCRIPT_URL,
        timeoutMs: 8000,
      });

      if (!isLoaded || isCancelled) {
        return;
      }

      bootFeaturebase();
    };

    const handleLoad = () => {
      window.setTimeout(() => {
        void start();
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
};

export default FeaturebaseLoader;
