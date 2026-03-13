import { Button } from "@/components/ui/button";

const FujitsuHero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="text-4xl sm:text-5xl font-bold tracking-tight">FUJITSU</span>
          <span className="text-2xl sm:text-3xl font-light">KLÍMA ÚTMUTATÓ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Melyik Fujitsu klíma való Önnek?
        </h1>

        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Három sorozat, három különböző igényre – a nyári hűtéstől az egész éves prémium fűtésig.
          Hivatalos Fujitsu partnerként 33 év tapasztalattal segítünk a választásban.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-white/90 hover:text-red-700 font-semibold"
            asChild
          >
            <a href="/#kapcsolat">Személyre szabott ajánlat</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
            asChild
          >
            <a href="https://www.fujitsuklima.hu/klimak" target="_blank" rel="noopener noreferrer">
              Fujitsu termékkatalógus
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default FujitsuHero;
