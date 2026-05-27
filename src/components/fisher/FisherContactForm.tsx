import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Loader2 } from "lucide-react";
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

const FISHER_NAVY = "#1f3d66";

const FisherContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

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
        body: { ...parsed.data, source: "Fisher oldal – Northwind Hűtéstechnika Kft." },
      });
      if (error) throw error;
      toast({
        title: "Üzenet elküldve!",
        description: "Köszönjük megkeresését, hamarosan felvesszük Önnel a kapcsolatot.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setGdprAccepted(false);
    } catch (err) {
      console.error("Fisher contact submit error:", err);
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
    <div id="fisher-contact-form" className="max-w-2xl mx-auto scroll-mt-24">
      <div
        className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border-2 shadow-elevated"
        style={{ borderColor: "rgba(31,61,102,0.25)" }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-6">
          Küldjön üzenetet
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fi-name" className="block text-sm font-medium text-foreground mb-2">
              Név *
            </label>
            <Input
              id="fi-name"
              type="text"
              placeholder="Az Ön neve"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={100}
              className="h-12"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fi-email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <Input
                id="fi-email"
                type="email"
                placeholder="pelda@email.hu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                maxLength={255}
                className="h-12"
              />
            </div>
            <div>
              <label htmlFor="fi-phone" className="block text-sm font-medium text-foreground mb-2">
                Telefon
              </label>
              <Input
                id="fi-phone"
                type="tel"
                placeholder="+36 30 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={40}
                className="h-12"
              />
            </div>
          </div>
          <div>
            <label htmlFor="fi-message" className="block text-sm font-medium text-foreground mb-2">
              Üzenet *
            </label>
            <Textarea
              id="fi-message"
              placeholder="Írja le, miben segíthetünk..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              maxLength={2000}
              rows={5}
              className="resize-none"
            />
          </div>
          <div className="flex items-start gap-3 pt-1">
            <Checkbox
              id="fi-gdpr"
              checked={gdprAccepted}
              onCheckedChange={(c) => setGdprAccepted(c === true)}
              className="mt-1"
              required
            />
            <label htmlFor="fi-gdpr" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
              Elfogadom az <a href="/adatvedelem" target="_blank" rel="noopener noreferrer" className="text-primary underline">adatkezelési tájékoztatót</a>, és hozzájárulok, hogy a Northwind Kft. a hibaelhárítás érdekében kezelje a megadott adataimat és fotóimat. *
            </label>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full text-white hover:opacity-90 min-h-[52px]"
            style={{ backgroundColor: FISHER_NAVY }}
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
  );
};

export default FisherContactForm;