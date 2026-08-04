import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      toast({
        title: "Sikertelen bejelentkezés",
        description: err instanceof Error ? err.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-secondary/50">
      <SEOHead title="Bejelentkezés | Northwind" description="Admin bejelentkezés a Northwind adminfelületre." noindex />
      <div className="w-full max-w-md rounded-3xl border border-border/50 bg-gradient-card shadow-elevated p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Admin bejelentkezés</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} required autoComplete="email"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Jelszó</Label>
            <Input id="password" type="password" value={password} required minLength={8}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Folyamatban…" : "Bejelentkezés"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ez a felület kizárólag a Northwind adminisztrátorai számára készült. Új fiók regisztrációja nem lehetséges.
        </p>
      </div>
    </main>
  );
};

export default Auth;