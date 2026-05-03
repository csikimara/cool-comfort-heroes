import { Link } from "react-router-dom";

const FisherFloatingButton = () => {
  return (
    <Link
      to="/fisher"
      className="fixed right-0 top-1/2 -translate-y-1/2 -mt-[120px] z-40 group"
      aria-label="Fisher klíma partner oldal"
    >
      <div className="flex items-center bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-l-xl shadow-elevated overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="px-2 py-3 sm:px-3 sm:py-4 flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] sm:text-xs font-bold tracking-wider [writing-mode:vertical-lr] rotate-180">
            FISHER
          </span>
          <span className="text-[8px] sm:text-[10px] font-light [writing-mode:vertical-lr] rotate-180">
            Partner
          </span>
        </div>
        <div className="hidden sm:block max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 ease-out">
          <div className="px-4 py-3 whitespace-nowrap">
            <p className="text-sm font-semibold">Fisher Klíma</p>
            <p className="text-xs text-primary-foreground/80">6 év garancia</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FisherFloatingButton;