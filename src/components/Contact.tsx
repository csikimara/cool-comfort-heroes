import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, MapPin, Clock, Send, Loader2, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ContactLocationCard from "@/components/ContactLocationCard";
import { supabase } from "@/integrations/supabase/client";
import TurnstileWidget from "@/components/TurnstileWidget";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const sanitizeFileName = (name: string) =>
  name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-120);

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
    href: "#kapcsolat",
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
  const [attachment, setAttachment] = useState<File | null>(null);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprAccepted) {
      toast({
        title: "Adatkezelési hozzájárulás szükséges",
        description: "Kérjük, fogadja el az adatkezelési tájékoztatót az üzenet elküldéséhez.",
        variant: "destructive",
      });
      return;
    }
    if (!turnstileToken) {
      toast({
        title: "Ellenőrzés szükséges",
        description: "Kérjük, várja meg a biztonsági ellenőrzés befejezését.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Attachment feltöltése privát Supabase Storage bucketbe (ha van)
      let attachmentMeta: {
        path: string;
        name: string;
        size: number;
        mime: string;
      } | null = null;

      if (attachment) {
        if (attachment.size > MAX_FILE_SIZE) {
          throw new Error("A csatolt fájl mérete túl nagy (max. 10 MB).");
        }
        if (!ALLOWED_MIME_TYPES.includes(attachment.type.toLowerCase())) {
          throw new Error("Nem támogatott fájlformátum. Engedélyezett: PDF, JPG, JPEG, PNG.");
        }
        const safeName = sanitizeFileName(attachment.name);
        const objectPath = `${crypto.randomUUID()}/${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("contact-attachments")
          .upload(objectPath, attachment, {
            contentType: attachment.type,
            upsert: false,
          });
        if (uploadError) throw uploadError;
        attachmentMeta = {
          path: objectPath,
          name: attachment.name.slice(0, 200),
          size: attachment.size,
          mime: attachment.type,
        };
      }

      // 2. Adatbázisba mentés + email a szervizfüggvényen keresztül
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...formData,
          source: "Főoldal – Northwind Hűtéstechnika Kft.",
          page_url: typeof window !== "undefined" ? window.location.href : undefined,
          turnstileToken,
          attachment: attachmentMeta,
        },
      });
      if (error) throw error;
      if (data && (data as { error?: string }).error) {
        throw new Error((data as { error: string }).error);
      }

      toast({
        title: "Üzenet elküldve!",
        description: "Köszönjük megkeresését, hamarosan felvesszük Önnel a kapcsolatot.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setAttachment(null);
      setGdprAccepted(false);
      setTurnstileToken(null);
      if (typeof window !== "undefined" && window.turnstile) {
        try { window.turnstile.reset(); } catch { /* noop */ }
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Hiba történt",
        description:
          error instanceof Error && error.message
            ? error.message
            : "Az üzenet küldése sikertelen. Kérjük, próbálja újra később.",
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
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
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
                const isStatic = !item.href;
                return (
                  <Tag
                    key={item.label}
                    {...(item.href ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined } : {})}
                    className={
                      isStatic
                        ? "flex items-start gap-4 p-5 rounded-2xl bg-gradient-card border border-border/50 shadow-card cursor-default"
                        : "group flex items-start gap-4 p-5 rounded-2xl bg-gradient-card border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
                    }
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0 ${isStatic ? "" : "group-hover:scale-110 transition-transform"}`}>
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className={`font-semibold text-foreground ${isStatic ? "" : "group-hover:text-primary transition-colors"}`}>
                        {item.value}
                      </div>
                    </div>
                  </Tag>
                );
              })}
            </div>

            <ContactLocationCard />

            {/* Social CTA */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.facebook.com/northwindkft/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-card border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Facebook
                </span>
              </a>
              <a
                href="https://www.instagram.com/northwind_hutestechnika/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-card border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Instagram
                </span>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-gradient-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-border/50 shadow-elevated">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Küldjön üzenetet
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
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
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-foreground mb-2">
                  Alaprajz vagy kép feltöltése (opcionális)
                </label>
                <Input
                  id="attachment"
                  name="attachment"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (file && file.size > 10 * 1024 * 1024) {
                      toast({
                        title: "Túl nagy fájl",
                        description: "Maximum 10 MB méretű fájl tölthető fel.",
                        variant: "destructive",
                      });
                      e.target.value = "";
                      setAttachment(null);
                      return;
                    }
                    setAttachment(file);
                  }}
                  className="h-12 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Elfogadott formátumok: PDF, JPG, JPEG, PNG (max. 10 MB).
                </p>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Checkbox
                  id="gdpr-consent"
                  checked={gdprAccepted}
                  onCheckedChange={(checked) => setGdprAccepted(checked === true)}
                  className="mt-1"
                  required
                />
                <label htmlFor="gdpr-consent" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
                  Elfogadom az <a href="/adatvedelem" target="_blank" rel="noopener noreferrer" className="text-primary underline">adatkezelési tájékoztatót</a>, és hozzájárulok, hogy a Northwind Hűtéstechnika Kft. a megkeresésem megválaszolása, ajánlatadás, illetve a szolgáltatás előkészítése (pl. felmérés, hibafelvétel) céljából kezelje a megadott adataimat és a feltöltött fájlokat. *
                </label>
              </div>
              <TurnstileWidget onToken={setTurnstileToken} className="min-h-[65px]" />
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
              <p className="text-sm sm:text-sm text-foreground/80 mt-3 text-center leading-relaxed">
                <span className="font-semibold text-foreground">Korrekt elszámolás:</span> Nincsenek rejtett költségek és váratlan kiszállási díjak. Amit a felméréskor rögzítünk, az a végösszeg.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
