import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load non-critical routes
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Fujitsu = lazy(() => import("./pages/Fujitsu"));
const Reszletek = lazy(() => import("./pages/Reszletek"));
const LakossagiKlima = lazy(() => import("./pages/LakossagiKlima"));
const Fisher = lazy(() => import("./pages/Fisher"));
const Galeria = lazy(() => import("./pages/Galeria"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/adatvedelem" element={<PrivacyPolicy />} />
            <Route path="/fujitsu" element={<Fujitsu />} />
            <Route path="/fujitsu-megoldasok" element={<Navigate to="/fujitsu" replace />} />
            <Route path="/reszletek" element={<Reszletek />} />
            <Route path="/lakossagi-klima" element={<LakossagiKlima />} />
            <Route path="/fisher" element={<Fisher />} />
            <Route path="/referenciak/:slug" element={<Galeria />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
