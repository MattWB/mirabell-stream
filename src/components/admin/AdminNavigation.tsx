import { ExternalLink, Film, LayoutDashboard, Settings, Users } from "lucide-react";
import { Link } from "react-router";

import { cn } from "../../utils/cn";

type AdminNavigationProps = {
  className?: string;
  onNavigate?: () => void;
};

const navigationItems = [
  {
    label: "Vue d'ensemble",
    href: "#overview",
    icon: LayoutDashboard,
  },
  {
    label: "Contenus",
    href: "#content",
    icon: Film,
  },
  {
    label: "Audience",
    href: "#audience",
    icon: Users,
  },
] as const;

export function AdminNavigation({ className, onNavigate }: AdminNavigationProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <nav className="flex-1 px-3 py-4" aria-label="Navigation du dashboard">
        <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          Navigation
        </p>

        <ul className="space-y-1">
          {navigationItems.map(({ label, href, icon: Icon }, index) => (
            <li key={href}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  index === 0
                    ? "bg-sidebar-primary/10 text-sidebar-primary"
                    : "text-white/55 hover:bg-white/5 hover:text-white",
                )}
                href={href}
                onClick={onNavigate}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <Link
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          to="/"
          onClick={onNavigate}
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          Voir la plateforme
        </Link>

        <button
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/35"
          type="button"
          disabled
          title="Fonctionnalité non disponible dans cette démonstration"
        >
          <Settings className="size-4" aria-hidden="true" />
          Paramètres
        </button>

        <div className="mt-3 flex items-center gap-3 border-t border-sidebar-border px-3 pt-4">
          <div
            className="grid size-8 shrink-0 place-items-center rounded-full bg-sidebar-primary/15 text-xs font-semibold text-sidebar-primary"
            aria-hidden="true"
          >
            AM
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-white">Admin Mirabell</p>

            <p className="truncate font-mono text-[10px] text-white/35">admin@mirabelltest.fr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
