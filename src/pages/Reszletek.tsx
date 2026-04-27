import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const IndustrialCooling = lazy(() => import("@/components/IndustrialCooling"));
const TransparentPricing = lazy(() => import("@/components/TransparentPricing"));
const MaintenanceTimeline = lazy(() => import("@/components/MaintenanceTimeline"));
const About = lazy(() => import("@/components/About"));
const Footer = lazy(() => import("@/components/Footer"));
const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));

const Reszletek = () => {
  useScrollToHash();
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Részletek – Japán technológia, ipari hűtés, árazás | Northwind"
        description="Mindent egy helyen: Fujitsu japán technológia, ipari hűtéstechnika, átlátható árazás és karbantartási menetrend a Northwind Hűtéstechnikától."
      />
      <Header />
      <main className="pt-24">
        {/* Page intro */}
        <section className="py-12 sm:py-16 bg-secondary/30 border-b border-border/50">
          <div className="container mx-auto px-4">
            {/* Back link – left-aligned, separated row */}
            <div className="max-w-3xl mx-auto mb-8">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Vissza a kezdőlapra
              </Link>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                Részletek
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Minden, amit a <span className="text-gradient">szakértelmünkről</span> tudni érdemes
              </h1>
              <p className="text-lg text-muted-foreground">
                Ipari hűtés, átlátható árazás és karbantartási menetrend –
                mélyebb betekintés a Northwind munkájába.
              </p>

              {/* Quick navigation */}
              <nav className="mt-8 flex flex-wrap justify-center gap-2">
                <a href="#rolunk" className="px-5 py-2.5 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all">
                  Rólunk
                </a>
                <a href="#ipari" className="px-5 py-2.5 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all">
                  Ipari hűtés
                </a>
                <a href="#arazas" className="px-5 py-2.5 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all">
                  Átlátható árazás
                </a>
                <a href="#karbantartas" className="px-5 py-2.5 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all">
                  Karbantartás
                </a>
              </nav>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <About />
          <div id="ipari" className="scroll-mt-24">
            <IndustrialCooling />
          </div>
          <div id="arazas" className="scroll-mt-24">
            <TransparentPricing />
          </div>
          <div id="karbantartas" className="scroll-mt-24">
            <MaintenanceTimeline />
          </div>
        </Suspense>

        {/* Closing CTA */}
        <section className="py-16 sm:py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Készen áll egy személyre szabott ajánlatra?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              33 év szakmai tapasztalattal segítünk megtalálni az Ön igényeihez legjobban illő megoldást.
            </p>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/#kapcsolat">
                Ingyenes ajánlatkérés
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FujitsuFloatingButton />
      </Suspense>
    </div>
  );
};

export default Reszletek;