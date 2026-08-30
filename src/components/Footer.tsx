import { forwardRef } from "react";
import { Wind, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Wind className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Northwind</h3>
                <p className="text-sm opacity-70">Hűtéstechnika Kft.</p>
              </div>
            </div>
            <p className="text-background/70 leading-relaxed max-w-md mb-4">
              Több mint három évtizedes szakmai tapasztalatunkkal biztosítunk
              stabil hátteret ügyfeleinknek.
            </p>
            <p className="text-background/60 text-sm leading-relaxed max-w-md mb-6">
              Klímaszerelés, karbantartás és ipari hűtéstechnika Budapesten és Pest vármegye egész területén.
              A Northwind Hűtéstechnika Kft. 2009 óta dolgozik ügyfelei megbízható szakmai partnereként.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <a href="tel:+36704099760" className="flex items-center gap-2 text-background underline underline-offset-4 decoration-background/40 hover:decoration-background transition-colors text-sm sm:text-base">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +36 70 409 9760
              </a>
              <a href="mailto:northwind@northwind.hu" className="flex items-center gap-2 text-background underline underline-offset-4 decoration-background/40 hover:decoration-background transition-colors text-sm sm:text-base break-all sm:break-normal">
                <Mail className="w-4 h-4 flex-shrink-0" />
                northwind@northwind.hu
              </a>
              <a href="https://www.facebook.com/northwindkft/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background underline underline-offset-4 decoration-background/40 hover:decoration-background transition-colors text-sm sm:text-base">
                <Facebook className="w-4 h-4 flex-shrink-0" />
                Facebook
              </a>
              <a href="https://www.instagram.com/northwind_hutestechnika/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background underline underline-offset-4 decoration-background/40 hover:decoration-background transition-colors text-sm sm:text-base">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                Instagram
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Szolgáltatások</h3>
            <ul className="space-y-3">
              <li><Link to="/lakossagi-klima" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Klímaszerelés</Link></li>
              <li><a href="/#karbantartas-idovonal" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Karbantartás</a></li>
              <li><Link to="/fisher-hoszivattyu" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Hőszivattyú</Link></li>
              <li><Link to="/reszletek#ipari" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Légtechnika</Link></li>
              <li><Link to="/lakossagi-klima" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Klímatisztítás</Link></li>
            </ul>
          </div>

          {/* Gyors navigáció */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Gyors navigáció</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Northwind Főoldal</Link></li>
              <li><a href="/#rolunk" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Rólunk</a></li>
              <li><Link to="/reszletek#ipari" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Ipari hűtés</Link></li>
              <li><a href="/#arazas" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Árazás</a></li>
              <li><a href="/#karbantartas-idovonal" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Karbantartás</a></li>
              <li><Link to="/fujitsu" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Fujitsu megoldások</Link></li>
              <li><Link to="/fisher" className="text-background/85 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Fisher megoldások</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Elérhetőség</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-70" />
                <span className="text-background/70">Helyszíni kiszállás<br />Budapesten és Pest vármegyében</span>
              </li>
              <li>
                <p className="text-background/70 text-sm">Nyitvatartás:</p>
                <p className="font-medium">H–P: 8:00–17:00</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Service area */}
        <div className="pt-8 border-t border-background/10 mb-6">
          <p className="text-background/60 text-sm leading-relaxed">
            Elsődleges szolgáltatási területünk: Budapest és Pest vármegye (kiemelten XI., XII., XXII. kerület, Budaörs, Érd, Törökbálint, Diósd).
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2026 Northwind Hűtéstechnika Kft. Minden jog fenntartva.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/adatvedelem" className="text-background/80 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Adatkezelés</Link>
            <Link to="/adatvedelem#sutik" className="text-background/80 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Sütik</Link>
            <Link to="/impresszum" className="text-background/80 underline underline-offset-4 decoration-background/30 hover:decoration-background transition-colors">Impresszum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
