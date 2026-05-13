import { Link } from "react-router-dom";

// Fisher Navy Blue partner tab. Positioned 15px below the Fujitsu floating bar.
// Fujitsu bar is anchored at top-1/2 with -translate-y-1/2; we add ~105px (full bar height + 15px gap).
const FisherFloatingButton = () => {
  return (
    <Link
      to="/fisher"
      className="group block"
      aria-label="Fisher klíma partner oldal"
    >
      <div
        className="flex items-center text-white rounded-l-xl shadow-elevated overflow-hidden transition-all duration-300 hover:shadow-2xl"
        style={{ background: "linear-gradient(90deg, #1f3d66 0%, #007ec6 100%)" }}
      >
        <div className="px-2 py-2 sm:px-3 sm:py-4 flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] sm:text-xs font-bold tracking-wider [writing-mode:vertical-lr] rotate-180">
            FISHER
          </span>
          <span className="hidden sm:inline text-[8px] sm:text-[10px] font-light [writing-mode:vertical-lr] rotate-180">
            Partner
          </span>
        </div>
        <div className="hidden sm:block max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 ease-out">
          <div className="px-4 py-3 whitespace-nowrap">
            <p className="text-sm font-semibold">Fisher Klíma</p>
            <p className="text-xs text-white/80">6 év garancia</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FisherFloatingButton;