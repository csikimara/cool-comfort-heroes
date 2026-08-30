import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import SkipLink from "./components/SkipLink";

// Lazy load non-critical routes
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Fujitsu = lazy(() => import("./pages/Fujitsu"));
const Reszletek = lazy(() => import("./pages/Reszletek"));
const LakossagiKlima = lazy(() => import("./pages/LakossagiKlima"));
const Fisher = lazy(() => import("./pages/Fisher"));
const FisherHoszivattyu = lazy(() => import("./pages/FisherHoszivattyu"));
const Galeria = lazy(() => import("./pages/Galeria"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <main id="main-content" tabIndex={-1} className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true" />
    <span className="sr-only">Az oldal betöltése folyamatban…</span>
  </main>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipLink />
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/adatvedelem" element={<PrivacyPolicy />} />
            <Route path="/impresszum" element={<Impressum />} />
            <Route path="/fujitsu" element={<Fujitsu />} />
            <Route path="/fujitsu-megoldasok" element={<Navigate to="/fujitsu" replace />} />
            <Route path="/reszletek" element={<Reszletek />} />
            <Route path="/lakossagi-klima" element={<LakossagiKlima />} />
            <Route path="/fisher" element={<Fisher />} />
            <Route path="/fisher-hoszivattyu" element={<FisherHoszivattyu />} />
            <Route path="/referenciak/:slug" element={<Galeria />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
