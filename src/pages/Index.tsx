import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import { useScrollToHash } from "@/hooks/useScrollToHash";

// Lazy load below-the-fold sections
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const MaintenanceTimeline = lazy(() => import("@/components/MaintenanceTimeline"));
const TransparentPricing = lazy(() => import("@/components/TransparentPricing"));
const Promotions = lazy(() => import("@/components/Promotions"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));
const FisherFloatingButton = lazy(() => import("@/components/FisherFloatingButton"));

const Index = () => {
  useScrollToHash();
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Klímaszerelés, hőszivattyú és ipari hűtés Budapest | Northwind – szakmai tapasztalat 1993 óta"
        description="Klímaszerelés, hőszivattyú, klímamosás és ipari hűtéstechnika Budapesten és Pest vármegyében. Szakmai tapasztalat 1993 óta; tételes ajánlat helyszíni felmérés után."
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <About />
          <MaintenanceTimeline />
          <TransparentPricing />
          <Promotions />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-4 items-end">
          <FujitsuFloatingButton />
          <FisherFloatingButton />
        </div>
      </Suspense>
    </div>
  );
};

export default Index;
