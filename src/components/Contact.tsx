import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+36 70 409 9760",
    href: "tel:+36704099760",
  },
  {
    icon: Mail,
    label: "Email",
    value: "northwind@northwind.hu",
    href: "mailto:northwind@northwind.hu",
  },
  {
    icon: MapPin,
    label: "Cím",
    value: "1118 Budapest, Torbágy u. 16.",
    href: "https://maps.google.com/?q=1118+Budapest+Torbágy+u.+16.",
  },
  {
    icon: Clock,
    label: "Nyitvatartás",
    value: "H-P: 8:00 - 17:00",
    href: "",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Üzenet elküldve!",
        description: "Köszönjük megkeresését, hamarosan felvesszük Önnel a kapcsolatot.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Hiba történt",
        description: "Az üzenet küldése sikertelen. Kérjük, próbálja újra később.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kapcsolat" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Kapcsolat
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kérjen{" "}
            <span className="text-gradient">ingyenes árajánlatot</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Vegye fel velünk a kapcsolatot telefonon, emailben vagy az alábbi űrlap kitöltésével!
          </p>
          <p className="text-sm text-muted-foreground/80">
            Klímaszerelés, karbantartás és ipari hűtéstechnika Budapesten és Pest vármegye egész területén – 1993 óta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {contactInfo.map((item) => {
                const Tag = item.href ? 'a' : 'div';
                return (
                  <Tag
                    key={item.label}
                    {...(item.href ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined } : {})}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-card border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </Tag>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-card border border-border/50 h-64 bg-gradient-frost flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">Budapest, Torbágy u. 16.</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-gradient-card rounded-3xl p-8 sm:p-10 border border-border/50 shadow-elevated">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Küldjön üzenetet
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Név *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Az Ön neve"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="pelda@email.hu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+36 30 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Üzenet *
                </label>
                <Textarea
                  id="message"
                  placeholder="Írja le, miben segíthetünk..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Küldés...
                  </>
                ) : (
                  <>
                    Üzenet küldése
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Korrekt elszámolás: Nincsenek rejtett költségek és váratlan kiszállási díjak. Amit a felméréskor rögzítünk, az a végösszeg.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
