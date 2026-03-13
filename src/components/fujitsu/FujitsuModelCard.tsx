import { CheckCircle2, ImageIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FujitsuModel {
  id: string;
  badge: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
  accentClass: string;
  badgeClass: string;
}

const FujitsuModelCard = ({ model }: { model: FujitsuModel }) => (
  <div className="group rounded-2xl border border-border/50 bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 flex flex-col">
    {/* Image placeholder */}
    <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden bg-muted flex items-center justify-center">
      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${model.accentClass} flex items-center justify-center`}>
        <model.icon className="w-10 h-10 text-white" />
      </div>
      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${model.badgeClass}`}>
        {model.badge}
      </span>
    </div>

    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-xl font-bold text-foreground">{model.name}</h3>
      <p className="text-sm font-medium text-muted-foreground mb-1">{model.subtitle}</p>
      <span className={`inline-block text-sm font-semibold bg-gradient-to-r ${model.accentClass} bg-clip-text text-transparent mb-4`}>
        {model.tagline}
      </span>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{model.description}</p>

      <ul className="space-y-2.5 mb-6 flex-1">
        {model.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <Button className={`w-full bg-gradient-to-r ${model.accentClass} text-white hover:opacity-90`} asChild>
        <a href="/#kapcsolat">Ajánlatot kérek</a>
      </Button>
    </div>
  </div>
);

export default FujitsuModelCard;
