import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import JapaneseTechnology from "@/components/JapaneseTechnology";
import IndustrialCooling from "@/components/IndustrialCooling";
import About from "@/components/About";
import TransparentPricing from "@/components/TransparentPricing";
import MaintenanceTimeline from "@/components/MaintenanceTimeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import FujitsuFloatingButton from "@/components/FujitsuFloatingButton";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import { useScrollToHash } from "@/hooks/useScrollToHash";

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
        title="Klímaszerelés és Ipari Hűtés Budapest | Northwind – 33 év tapasztalat"
        description="Profi klímaszerelés, zsákos mélytisztítás és ipari hűtéstechnika Budapesten és Pest vármegyében. Japán minőség (Fujitsu KG), rejtett költségek nélkül, 1993 óta."
      />
      <JsonLd data={businessJsonLd} />
      <Header />
      <main>
        <Hero />
        <Services />
        <JapaneseTechnology />
        <IndustrialCooling />
        <About />
        <TransparentPricing />
        <MaintenanceTimeline />
        <Contact />
        <GoogleMap />
      </main>
      <Footer />
      <FujitsuFloatingButton />
    </div>
  );
};

export default Index;
