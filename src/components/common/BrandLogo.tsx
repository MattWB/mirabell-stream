import { Film } from "lucide-react";
import { Link } from "react-router";

export function BrandLogo() {
  return (
    <Link
      className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      to="/"
      aria-label="Mirabell Stream, accueil"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-accent">
        <Film className="size-4 text-accent-foreground" aria-hidden="true" />
      </span>

      <span className="hidden font-display text-sm font-black uppercase tracking-[0.16em] text-white sm:block">
        Mirabell <span className="text-accent">Stream</span>
      </span>
    </Link>
  );
}
