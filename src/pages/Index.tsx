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
import FujitsuFloatingButton from "@/components/FujitsuFloatingButton";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const Index = () => {
  useScrollToHash();
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <JapaneseTechnology />
      <IndustrialCooling />
      <About />
      <TransparentPricing />
      <MaintenanceTimeline />
      <Contact />
      <Footer />
      <FujitsuFloatingButton />
    </div>
  );
};

export default Index;
