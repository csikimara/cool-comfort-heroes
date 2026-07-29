import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { usePublicPromotions } from "@/hooks/usePromotions";

const Promotions = () => {
  const { promotions, images, loading } = usePublicPromotions();

  if (loading || promotions.length === 0) return null;

  return (
    <section id="akciok" className="py-20 sm:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Aktuális ajánlatok
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Akcióink
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {promotions.map((promo) => (
            <article
              key={promo.id}
              className="flex flex-col rounded-3xl overflow-hidden border border-border/50 bg-gradient-card shadow-elevated"
            >
              {images[promo.id] ? (
                <img
                  src={images[promo.id]}
                  alt={promo.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-24 bg-gradient-hero flex items-center justify-center">
                  <Tag className="w-8 h-8 text-primary-foreground" />
                </div>
              )}
              <div className="flex flex-col flex-1 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-foreground mb-3">{promo.title}</h3>
                {promo.description && (
                  <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                    {promo.description}
                  </p>
                )}
                {promo.button_label && promo.button_url && (
                  <Button asChild className="mt-auto w-full">
                    <a href={promo.button_url}>{promo.button_label}</a>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;