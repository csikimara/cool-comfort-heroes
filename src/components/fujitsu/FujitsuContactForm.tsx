import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "A név megadása kötelező").max(100),
  email: z.string().trim().email("Érvénytelen email cím").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Az üzenet megadása kötelező").max(2000),
});

const FujitsuContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      toast({
        title: "Ellenőrizze a mezőket",
        description: parsed.error.issues[0]?.message ?? "Hibás bemenet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { ...parsed.data, source: "Fujitsu oldal – Northwind Hűtéstechnika Kft." },
      });
      if (error) throw error;

      toast({
        title: "Üzenet elküldve!",
        description: "Köszönjük megkeresését, hamarosan felvesszük Önnel a kapcsolatot.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Fujitsu contact submit error:", err);
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
    <section
      id="fujitsu-contact"
      className="py-20 sm:py-24 bg-secondary scroll-mt-24"
      aria-label="Fujitsu kapcsolatfelvétel"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              Northwind Hűtéstechnika Kft.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3">
              Küldjön üzenetet
            </h2>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border-2 border-primary/20 shadow-elevated">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fj-name" className="block text-sm font-medium text-foreground mb-2">
                  Név *
                </label>
                <Input
                  id="fj-name"
                  type="text"
                  placeholder="Az Ön neve"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={100}
                  className="h-12 focus-visible:ring-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fj-email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="fj-email"
                    type="email"
                    placeholder="pelda@email.hu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                    className="h-12 focus-visible:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="fj-phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefon
                  </label>
                  <Input
                    id="fj-phone"
                    type="tel"
                    placeholder="+36 30 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={40}
                    className="h-12 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fj-message" className="block text-sm font-medium text-foreground mb-2">
                  Üzenet *
                </label>
                <Textarea
                  id="fj-message"
                  placeholder="Írja le, miben segíthetünk..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  maxLength={2000}
                  rows={5}
                  className="resize-none focus-visible:ring-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[52px]"
                disabled={isSubmitting}
              >
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

              <p className="text-sm text-foreground/80 mt-3 text-center leading-relaxed">
                <span className="font-semibold text-foreground">Korrekt elszámolás:</span>{" "}
                Nincsenek rejtett költségek és váratlan kiszállási díjak. Amit a felméréskor
                rögzítünk, az a végösszeg.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FujitsuContactForm;
