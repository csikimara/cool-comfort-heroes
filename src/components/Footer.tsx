import { Wind, Phone, Mail, MapPin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
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
              Professzionális klíma és légtechnikai megoldások 33 év szakmai tapasztalattal.
              Bízza ránk otthona vagy irodája komfortját!
            </p>
            <p className="text-background/60 text-sm leading-relaxed max-w-md mb-6">
              Klímaszerelés, karbantartás és ipari hűtéstechnika Budapesten és Pest vármegye egész területén.
              A Northwind Hűtéstechnika 2009 óta biztosít megbízható vállalkozói hátteret ügyfeleinek.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <a href="tel:+36704099760" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm sm:text-base">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +36 70 409 9760
              </a>
              <a href="mailto:northwind@northwind.hu" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm sm:text-base break-all sm:break-normal">
                <Mail className="w-4 h-4 flex-shrink-0" />
                northwind@northwind.hu
              </a>
              <a href="https://www.facebook.com/northwindkft/?locale=hu_HU" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm sm:text-base">
                <Facebook className="w-4 h-4 flex-shrink-0" />
                Facebook
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Szolgáltatások</h4>
            <ul className="space-y-3">
              <li><a href="#szolgaltatasok" className="text-background/70 hover:text-background transition-colors">Klímaszerelés</a></li>
              <li><a href="#szolgaltatasok" className="text-background/70 hover:text-background transition-colors">Karbantartás</a></li>
              <li><a href="#szolgaltatasok" className="text-background/70 hover:text-background transition-colors">Hőszivattyú</a></li>
              <li><a href="#szolgaltatasok" className="text-background/70 hover:text-background transition-colors">Légtechnika</a></li>
              <li><a href="#szolgaltatasok" className="text-background/70 hover:text-background transition-colors">Klímatisztítás</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 text-lg">Elérhetőség</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-70" />
                <span className="text-background/70">1118 Budapest,<br />Torbágy u. 16.</span>
              </li>
              <li>
                <p className="text-background/70 text-sm">Nyitvatartás:</p>
                <p className="font-medium">H-P: 8:00 - 17:00</p>
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
          <div className="flex gap-6 text-sm">
            <Link to="/adatvedelem" className="text-background/50 hover:text-background transition-colors">Adatvédelem</Link>
            <a href="#" className="text-background/50 hover:text-background transition-colors">ÁSZF</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
