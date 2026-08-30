import { MapPin, ShieldCheck } from "lucide-react";

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
            Helyszíni szolgáltatás
          </div>
          <h3 className="text-lg font-semibold text-foreground">Kiszállással dolgozunk</h3>
          <p className="text-muted-foreground">Budapest és Pest vármegye</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ügyfélfogadási helyet nem tartunk fenn. A felmérést, telepítést,
            karbantartást és javítást az ügyfél helyszínén végezzük, előzetes
            telefonos vagy írásos egyeztetés alapján.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactLocationCard;
