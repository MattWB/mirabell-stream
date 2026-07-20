import { useEffect, useRef, useState } from "react";
import { Film, Menu, X } from "lucide-react";

import { AdminNavigation } from "./AdminNavigation";

export function AdminMobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-sidebar-border bg-sidebar md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Film className="size-4" aria-hidden="true" />
          </span>

          <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Mirabell Admin
          </span>
        </div>

        <button
          ref={menuButtonRef}
          className="grid size-10 place-items-center rounded-md text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="admin-mobile-navigation"
          aria-label={isMenuOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
        >
          {isMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <AdminNavigation
          className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-sidebar-border"
          onNavigate={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
