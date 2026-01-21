import { Wind, Phone, Mail, MapPin } from "lucide-react";

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
            <p className="text-background/70 leading-relaxed max-w-md mb-6">
              Professzionális klíma és légtechnikai megoldások már több mint 15 éve. 
              Bízza ránk otthona vagy irodája komfortját!
            </p>
            <div className="flex gap-6">
              <a href="tel:+36123456789" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                +36 1 234 5678
              </a>
              <a href="mailto:info@northwind.hu" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                info@northwind.hu
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
                <span className="text-background/70">1138 Budapest,<br />Váci út 140.</span>
              </li>
              <li>
                <p className="text-background/70 text-sm">Nyitvatartás:</p>
                <p className="font-medium">H-P: 8:00 - 17:00</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 Northwind Hűtéstechnika Kft. Minden jog fenntartva.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/50 hover:text-background transition-colors">Adatvédelem</a>
            <a href="#" className="text-background/50 hover:text-background transition-colors">ÁSZF</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
