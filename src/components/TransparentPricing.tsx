import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";

const TransparentPricing = () => {
  return (
    <section className="py-20 sm:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
              Átlátható árazás
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Korrekt elszámolás,{" "}
              <span className="text-gradient">rejtett költségek nélkül</span>
            </h2>
          </div>

          <div className="relative rounded-3xl p-8 sm:p-12 border border-border/50 bg-gradient-card shadow-elevated">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <BadgeCheck className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Nálunk az árajánlat nem csak egy becslés, hanem ígéret. Az ingyenes helyszíni felmérés során pontosan 
                  rögzítjük a szükséges anyagokat és munkafolyamatokat, így a végösszeg pontosan annyi lesz, amennyiben 
                  megállapodtunk. Nincs 'kiszállási díj' a munka végén, nincsenek váratlan felárak – csak tiszta és 
                  becsületes elszámolás, ahogy azt <strong>1993 óta</strong> minden ügyfelünknek garantáljuk.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/5 border border-primary/10">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">
                      Fix munkadíj és tételes anyagelszámolás
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-accent/10 border border-accent/20">
                    <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">
                      Meglepetések nélkül
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparentPricing;
