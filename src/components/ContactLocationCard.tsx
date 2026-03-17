import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NORTHWIND_ADDRESS, NORTHWIND_MAP_LINK } from "@/lib/external";

const ContactLocationCard = () => {
  return (
    <div className="rounded-2xl border border-border/50 bg-gradient-card p-6 shadow-card">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <MapPin className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Helyszín
          </div>
          <h3 className="text-lg font-semibold text-foreground">Személyes elérhetőség</h3>
          <p className="text-muted-foreground">{NORTHWIND_ADDRESS}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Látogasson el hozzánk személyesen, vagy kérjen útvonaltervet az alábbi gombbal!
          </p>
          <Button asChild className="w-full sm:w-fit">
            <a href={NORTHWIND_MAP_LINK} target="_blank" rel="noopener noreferrer">
              Útvonal megnyitása
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactLocationCard;
