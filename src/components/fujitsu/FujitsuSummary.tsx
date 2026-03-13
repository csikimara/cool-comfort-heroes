import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const FujitsuSummary = () => (
  <section className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Nem biztos benne, melyik modell a legjobb választás?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          33 év szakmai tapasztalattal segítünk kiválasztani az Ön igényeihez legjobban illeszkedő modellt.
          A Northwind Hűtéstechnika 2009 óta a Fujitsu elkötelezett partnere Budapesten és Pest vármegyében.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          asChild
        >
          <a href="/#kapcsolat">Kérjen személyre szabott ajánlatot</a>
        </Button>
      </div>
    </div>
  </section>
);

export default FujitsuSummary;
