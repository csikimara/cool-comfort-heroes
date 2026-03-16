import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEOHead
        title="404 – Az oldal nem található | Northwind Hűtéstechnika"
        description="A keresett oldal nem található. Térjen vissza a Northwind Hűtéstechnika főoldalára."
        noindex
      />
      <main className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Az oldal nem található</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Vissza a főoldalra
        </a>
      </main>
    </div>
  );
};

export default NotFound;
