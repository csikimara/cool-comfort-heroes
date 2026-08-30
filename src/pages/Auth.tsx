import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { Loader2, LogOut, ShieldCheck } from "lucide-react";
import {
  clearAdminActivity,
  isAdminSessionIdle,
  recordAdminActivity,
} from "@/lib/admin-session";

type MfaStage = "password" | "checking" | "setup-required" | "verify";

type EnrollmentDetails = {
  factorId: string;
  qrCode: string;
  secret: string;
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentDetails | null>(null);
  const [stage, setStage] = useState<MfaStage>("checking");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const showAuthError = useCallback(() => {
    toast({
      title: "Hitelesítés sikertelen",
      description: "A biztonsági ellenőrzés nem sikerült. Kérjük, próbálja újra.",
      variant: "destructive",
    });
  }, [toast]);

  const prepareMfa = useCallback(async () => {
    setStage("checking");

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setStage("password");
      return;
    }

    // A user may read only their own role at AAL1. Every actual admin data
    // operation is separately protected by has_role(), which requires AAL2.
    const { data: adminRole, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleError) {
      showAuthError();
      await supabase.auth.signOut();
      setStage("password");
      return;
    }
    if (!adminRole) {
      navigate("/admin", { replace: true });
      return;
    }

    const { data: assurance, error: assuranceError } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assuranceError || !assurance) {
      showAuthError();
      setStage("setup-required");
      return;
    }
    if (assurance.currentLevel === "aal2") {
      if (isAdminSessionIdle()) {
        clearAdminActivity();
        await supabase.auth.signOut();
        setStage("password");
        return;
      }
      recordAdminActivity();
      navigate("/admin", { replace: true });
      return;
    }

    const { data: factors, error: factorsError } =
      await supabase.auth.mfa.listFactors();
    if (factorsError || !factors) {
      showAuthError();
      setStage("setup-required");
      return;
    }

    const verifiedTotp = factors.totp[0];
    if (verifiedTotp) {
      setFactorId(verifiedTotp.id);
      setEnrollment(null);
      setStage("verify");
      return;
    }

    setFactorId(null);
    setEnrollment(null);
    setStage("setup-required");
  }, [navigate, showAuthError]);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session) {
        void prepareMfa();
      } else {
        setStage("password");
      }
    });
    return () => {
      active = false;
    };
  }, [prepareMfa]);

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setPassword("");
    if (error) {
      toast({
        title: "Sikertelen bejelentkezés",
        description:
          "Az e-mail-cím vagy a jelszó hibás, illetve a bejelentkezés átmenetileg nem érhető el.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    await prepareMfa();
    setLoading(false);
  };

  const beginEnrollment = async () => {
    setLoading(true);

    // An interrupted setup leaves an unverified factor without a reusable QR
    // code. Remove such remnants before creating a fresh enrollment.
    const { data: factors, error: factorsError } =
      await supabase.auth.mfa.listFactors();
    if (factorsError || !factors) {
      showAuthError();
      setLoading(false);
      return;
    }
    for (const factor of factors.all) {
      if (factor.factor_type === "totp" && factor.status === "unverified") {
        const { error } = await supabase.auth.mfa.unenroll({
          factorId: factor.id,
        });
        if (error) {
          showAuthError();
          setLoading(false);
          return;
        }
      }
    }

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Northwind admin",
    });
    setLoading(false);
    if (error || !data || data.type !== "totp") {
      showAuthError();
      return;
    }

    setFactorId(data.id);
    setEnrollment({
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
    });
    setMfaCode("");
    setStage("verify");
  };

  const handleMfaSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!factorId || !/^\d{6}$/.test(mfaCode)) {
      toast({
        title: "Hibás ellenőrzőkód",
        description: "Adja meg a hitelesítő alkalmazás hatjegyű kódját.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code: mfaCode,
    });
    setLoading(false);
    if (error) {
      setMfaCode("");
      showAuthError();
      return;
    }
    recordAdminActivity();
    navigate("/admin", { replace: true });
  };

  const signOut = async () => {
    clearAdminActivity();
    await supabase.auth.signOut();
    setEmail("");
    setPassword("");
    setMfaCode("");
    setFactorId(null);
    setEnrollment(null);
    setStage("password");
  };

  if (stage === "checking") {
    return (
      <main id="main-content" tabIndex={-1} className="min-h-screen flex items-center justify-center bg-secondary/50">
        <SEOHead title="Bejelentkezés | Northwind" description="Admin bejelentkezés." noindex />
        <Loader2 className="w-7 h-7 animate-spin text-primary" aria-label="Hitelesítés ellenőrzése" />
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex items-center justify-center px-4 py-16 bg-secondary/50">
      <SEOHead title="Bejelentkezés | Northwind" description="Admin bejelentkezés a Northwind adminfelületre." noindex />
      <div className="w-full max-w-md rounded-3xl border border-border/50 bg-gradient-card shadow-elevated p-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
          Admin bejelentkezés
        </h1>

        {stage === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                required
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Jelszó</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                required
                minLength={8}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Folyamatban…" : "Tovább"}
            </Button>
          </form>
        )}

        {stage === "setup-required" && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Az adminadatok eléréséhez kötelező a kétlépcsős azonosítás. A
              beállításhoz hitelesítő alkalmazás szükséges, például Google
              Authenticator, Microsoft Authenticator vagy 1Password.
            </p>
            <Button className="w-full" onClick={beginEnrollment} disabled={loading}>
              {loading ? "Beállítás…" : "Hitelesítő alkalmazás beállítása"}
            </Button>
            <Button variant="outline" className="w-full" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Kijelentkezés
            </Button>
          </div>
        )}

        {stage === "verify" && (
          <form onSubmit={handleMfaSubmit} className="space-y-5">
            {enrollment ? (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Olvassa be a QR-kódot a hitelesítő alkalmazásba, majd adja meg
                  az alkalmazásban megjelenő hatjegyű kódot.
                </p>
                <img
                  src={enrollment.qrCode}
                  alt="Northwind admin kétlépcsős azonosítás QR-kódja"
                  width={240}
                  height={240}
                  className="mx-auto rounded-xl border border-border bg-white p-2"
                />
                <p className="text-xs text-muted-foreground break-all">
                  Kézi beállítókulcs:{" "}
                  <code className="select-all text-foreground">{enrollment.secret}</code>
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adja meg a hitelesítő alkalmazásban látható hatjegyű kódot.
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="mfa-code">Ellenőrzőkód</Label>
              <Input
                id="mfa-code"
                name="mfa-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={mfaCode}
                required
                onChange={(event) =>
                  setMfaCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ellenőrzés…" : "Belépés ellenőrzőkóddal"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Másik fiók
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ez a felület kizárólag a Northwind adminisztrátorai számára készült.
          Új fiók nyilvánosan nem regisztrálható.
        </p>
      </div>
    </main>
  );
};

export default Auth;
