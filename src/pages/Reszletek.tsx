import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info, Factory, Wallet, Wrench } from "lucide-react";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import About from "@/components/About";
import { Skeleton } from "@/components/ui/skeleton";

const IndustrialCooling = lazy(() => import("@/components/IndustrialCooling"));
const TransparentPricing = lazy(() => import("@/components/TransparentPricing"));
const MaintenanceTimeline = lazy(() => import("@/components/MaintenanceTimeline"));
const Footer = lazy(() => import("@/components/Footer"));
const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));

const SectionSkeleton = () => (
  <div className="py-20 sm:py-32">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full max-w-xl mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

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
                Minden, amit a Northwind klímatechnikáról és <span className="text-gradient">szakértelmünkről</span> tudni érdemes
              </h1>
              <p className="text-lg text-muted-foreground">
                Ipari hűtés, átlátható árazás és karbantartási menetrend –
                mélyebb betekintés a Northwind munkájába.
              </p>
            </div>

            {/* Quick navigation cards */}
            <nav aria-label="Oldal szakaszai" className="mt-10 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "#rolunk", label: "Rólunk", desc: "33 év tapasztalat", Icon: Info },
                { href: "#ipari", label: "Ipari hűtés", desc: "Chiller, AHU, Fan-coil", Icon: Factory },
                { href: "#arazas", label: "Átlátható árazás", desc: "Fix árak, nincs rejtett költség", Icon: Wallet },
                { href: "#karbantartas", label: "Karbantartás", desc: "Szezonális menetrend", Icon: Wrench },
              ].map(({ href, label, desc, Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group relative flex flex-col items-start gap-3 p-5 sm:p-6 rounded-2xl bg-card border-2 border-primary/20 shadow-sm hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {label}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{desc}</p>
                  </div>
                  <ArrowRight className="absolute top-5 right-5 w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* About loaded eagerly so the top of the page renders immediately */}
        <About />

        <Suspense fallback={<SectionSkeleton />}>
          <div id="ipari" className="scroll-mt-24">
            <IndustrialCooling />
          </div>
        </Suspense>

        {/* Mid-page CTA between Industrial cooling and Pricing */}
        <section className="py-12 sm:py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
              Ipari vagy lakossági projektje van?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
              Kérjen ingyenes, kötelezettség nélküli árajánlatot – pontos elszámolással, rejtett költségek nélkül.
            </p>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/#kapcsolat">
                Ingyenes ajánlatkérés
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton />}>
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