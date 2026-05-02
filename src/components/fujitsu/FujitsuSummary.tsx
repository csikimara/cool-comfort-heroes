import { Award, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FujitsuSummary = () => (
  <section className="py-20 sm:py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto rounded-3xl bg-card border-2 border-primary/30 p-8 sm:p-12 text-center shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
          <Award className="w-8 h-8 text-primary-foreground" />
        </div>
        <span className="text-primary text-sm font-bold uppercase tracking-wider">
          Szakmai konzultáció és felmérés
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-4">
          Kérjen egyedi Fujitsu tervezést és ajánlatot a Northwind szakértőitől
        </h2>
        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          33 év hűtéstechnikai tapasztalattal rendelkező szakmai háttérrel.
          Helyszíni felmérés és szakszerű rendszervázlat – kötelezettségek nélkül.
          Hivatalos Columbus Klíma garanciális feltételekkel: 10 év az oldalfali
          split klímákra, 3 év a hőszivattyúkra és egyéb rendszerekre.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href="/#kapcsolat">Ajánlatkérés</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="tel:+36704099760">
              <Phone className="w-4 h-4" />
              +36 70 409 9760
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="mailto:northwind@northwind.hu">
              <Mail className="w-4 h-4" />
              northwind@northwind.hu
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default FujitsuSummary;
