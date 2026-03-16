import { useEffect, useState } from "react";
import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NORTHWIND_ADDRESS,
  NORTHWIND_MAP_EMBED,
  NORTHWIND_MAP_LINK,
  isLikelyInAppWebView,
} from "@/lib/external";

interface MapEmbedProps {
  className?: string;
  title?: string;
}

const MapEmbed = ({
  className = "h-64",
  title = "Northwind Hűtéstechnika helyszíne",
}: MapEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(() => isLikelyInAppWebView());

  useEffect(() => {
    if (showFallback) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowFallback((current) => current || !isLoaded);
    }, 7000);

    return () => window.clearTimeout(timeoutId);
  }, [isLoaded, showFallback]);

  if (showFallback) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-card p-6 shadow-card ${className}`}>
        <div className="flex h-full flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Biztonságos fallback
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Northwind Hűtéstechnika</h3>
                <p className="text-muted-foreground">{NORTHWIND_ADDRESS}</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              A beágyazott térkép biztonsági, SSL vagy mobil webview korlátozás miatt nem töltődött be, ezért egy stabil
              tartalék megoldást jelenítünk meg.
            </p>
          </div>

          <Button asChild className="w-full sm:w-fit">
            <a href={NORTHWIND_MAP_LINK} target="_blank" rel="noopener noreferrer">
              Megnyitás Google Mapsben
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border/50 shadow-card ${className}`}>
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden="true" />}
      <iframe
        src={NORTHWIND_MAP_EMBED}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="h-full w-full bg-background"
        onLoad={() => setIsLoaded(true)}
        onError={() => setShowFallback(true)}
      />
    </div>
  );
};

export default MapEmbed;
