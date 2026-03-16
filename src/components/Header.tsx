import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isOnHomePage = location.pathname === "/";

  const getNavHref = (hash: string) => {
    return isOnHomePage ? hash : `/${hash}`;
  };

  const navLinks = [
    { href: getNavHref("#szolgaltatasok"), label: "Szolgáltatások" },
    { href: getNavHref("#rolunk"), label: "Rólunk" },
    { href: getNavHref("#kapcsolat"), label: "Kapcsolat" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0 mr-6 lg:mr-10">
            <img 
              src={logo} 
              alt="Northwind Hűtéstechnika Kft. logó" 
              className="max-h-14 sm:max-h-16 lg:max-h-[70px] w-auto min-w-[180px] sm:min-w-[240px] lg:min-w-[300px] object-contain object-left"
              width={320}
              height={70}
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+36704099760" className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              <Phone className="w-4 h-4 flex-shrink-0" />
              +36 70 409 9760
            </a>
            <Button variant="default" size="sm" asChild>
              <a href={getNavHref("#kapcsolat")}>Ajánlatkérés</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="default" className="mt-2" asChild>
                <a href={getNavHref("#kapcsolat")} onClick={() => setIsMenuOpen(false)}>Ajánlatkérés</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
