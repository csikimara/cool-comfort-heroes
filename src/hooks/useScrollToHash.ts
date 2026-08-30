import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const hasAsciiControlCharacter = (value: string): boolean =>
  Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && (codePoint <= 0x1f || codePoint === 0x7f);
  });

export const safeHashTargetId = (hash: string): string | null => {
  if (!hash.startsWith("#") || hash.length > 257) return null;
  try {
    const id = decodeURIComponent(hash.slice(1));
    if (!id || id.length > 128 || hasAsciiControlCharacter(id)) return null;
    return id;
  } catch {
    return null;
  }
};

export const useScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    const targetId = safeHashTargetId(hash);
    if (!targetId) return;
    let cancelled = false;
    let attempts = 0;
    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(targetId);
      if (el) {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        return;
      }
      if (attempts++ < 40) {
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [hash]);
};
