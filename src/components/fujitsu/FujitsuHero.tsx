import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const FujitsuHero = () => (
  <section className="relative pt-32 pb-24 overflow-hidden bg-white">
    <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          Hivatalos Fujitsu partner
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] text-foreground">
          Northwind – Az Ön kiemelt{" "}
          <span className="text-primary">Fujitsu</span> partnere
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-9 max-w-2xl mx-auto leading-relaxed">
          33 év mérnöki tapasztalat és hivatalos Columbus Klíma garancia –
          minden telepített rendszer mögött.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <a href="#fujitsu-contact">Kérjen egyedi Fujitsu tervezést</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#garancia">10 éves garancia részletei</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default FujitsuHero;
