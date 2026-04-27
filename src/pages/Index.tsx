import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { useScrollToHash } from "@/hooks/useScrollToHash";

// Lazy load below-the-fold sections
const Services = lazy(() => import("@/components/Services"));
const Contact = lazy(() => import("@/components/Contact"));
const GoogleMap = lazy(() => import("@/components/GoogleMap"));
const Footer = lazy(() => import("@/components/Footer"));
const FujitsuFloatingButton = lazy(() => import("@/components/FujitsuFloatingButton"));

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Northwind Hűtéstechnika Kft.",
  description:
    "Profi klímaszerelés, zsákos mélytisztítás és ipari hűtéstechnika Budapesten és Pest vármegyében. Japán minőség (Fujitsu KG), rejtett költségek nélkül, 1993 óta.",
  url: "https://cool-comfort-heroes.lovable.app",
  telephone: "+36704099760",
  email: "northwind@northwind.hu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Torbágy u. 16.",
    addressLocality: "Budapest",
    postalCode: "1118",
    addressCountry: "HU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.4634,
    longitude: 19.0234,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  areaServed: {
    "@type": "State",
    name: "Budapest és Pest vármegye",
  },
  foundingDate: "1993",
  priceRange: "$$",
};

const Index = () => {
  useScrollToHash();
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Fujitsu klíma telepítés és javítás Budapest | Northwind – 33 év tapasztalat"
        description="Fujitsu klíma szakértő telepítése és javítása Budapesten és Pest vármegyében. Japán minőség, akár 10 év garancia, megbízhatóság, rejtett költségek nélkül. Ipari hűtés és karbantartás 1993 óta."
      />
      <JsonLd data={businessJsonLd} />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <Contact />
          <GoogleMap />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FujitsuFloatingButton />
      </Suspense>
    </div>
  );
};

export default Index;
