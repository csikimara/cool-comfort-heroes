import { forwardRef } from "react";
import { Link } from "react-router-dom";

const FujitsuFloatingButton = forwardRef<HTMLAnchorElement>((_, ref) => {
  return (
    <Link
      to="/fujitsu"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group hidden sm:block"
    >
      <div className="flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white rounded-l-xl shadow-elevated overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Collapsed state - always visible */}
        <div className="px-3 py-4 flex flex-col items-center justify-center gap-1 writing-mode-vertical">
          <span className="text-xs font-bold tracking-wider [writing-mode:vertical-lr] rotate-180">
            FUJITSU
          </span>
          <span className="text-[10px] font-light [writing-mode:vertical-lr] rotate-180">
            Partner
          </span>
        </div>
        
        {/* Expanded content on hover */}
        <div className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 ease-out">
          <div className="px-4 py-3 whitespace-nowrap">
            <p className="text-sm font-semibold">Fujitsu Klíma</p>
            <p className="text-xs text-white/80">10 év garancia</p>
          </div>
        </div>
      </div>
    </Link>
  );
});

FujitsuFloatingButton.displayName = "FujitsuFloatingButton";

export default FujitsuFloatingButton;
