import { useState, type SyntheticEvent } from "react";
import { LayoutDashboard, Menu, Search, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";

import { cn } from "../../utils/cn";
import { BrandLogo } from "../common/BrandLogo";
import { SearchField } from "../common/SearchField";

const navigationItems = [
  { label: "Accueil", to: "/" },
  { label: "Catalogue", to: "/catalogue" },
] as const;

export function PublicHeader() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();
    const search = query ? `?${new URLSearchParams({ q: query }).toString()}` : "";

    navigate(`/catalogue${search}`);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  }

  function toggleSearch() {
    setIsSearchOpen((current) => !current);
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
    setIsSearchOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/5 bg-linear-to-b from-black/95 via-black/75 to-black/30 backdrop-blur-sm">
        <div className="grid h-16 grid-cols-[1fr_auto] items-center px-4 md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-12">
          <div className="justify-self-start">
            <BrandLogo />
          </div>

          <nav
            className="hidden items-center gap-1 justify-self-center md:flex"
            aria-label="Navigation principale"
          >
            {navigationItems.map(({ label, to }) => (
              <NavLink
                key={to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-accent" : "text-white/65 hover:text-white",
                  )
                }
                end={to === "/"}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 justify-self-end md:flex">
            {isSearchOpen ? (
              <form
                className="flex items-center gap-1 justify-self-end"
                role="search"
                onSubmit={handleSearchSubmit}
              >
                <div className="w-56">
                  <SearchField value={searchQuery} onChange={setSearchQuery} autoFocus />
                </div>

                <button
                  className="flex size-9 items-center justify-center rounded-md text-white/55 transition-colors hover:text-white"
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Fermer la recherche"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </form>
            ) : (
              <button
                className="flex size-9 items-center justify-center rounded-md text-white/55 transition-colors hover:text-white"
                type="button"
                onClick={toggleSearch}
                aria-label="Ouvrir la recherche"
              >
                <Search className="size-4" aria-hidden="true" />
              </button>
            )}

            <Link
              className="flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-sm font-medium text-white/65 transition-colors hover:border-accent/50 hover:text-white"
              to="/dashboard"
            >
              <LayoutDashboard className="size-3.5" aria-hidden="true" />
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              className="flex size-10 items-center justify-center rounded-md text-white/65 transition-colors hover:text-white"
              type="button"
              onClick={toggleSearch}
              aria-expanded={isSearchOpen}
              aria-controls="mobile-search"
              aria-label={isSearchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
            >
              {isSearchOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Search className="size-5" aria-hidden="true" />
              )}
            </button>

            <button
              className="flex size-10 items-center justify-center rounded-md text-white/65 transition-colors hover:text-white"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <form
            id="mobile-search"
            className="px-4 pb-3 md:hidden"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un documentaire..."
              autoFocus
            />
          </form>
        )}
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-b border-border bg-card/98 px-4 py-3 backdrop-blur-md md:hidden"
          aria-label="Navigation mobile"
        >
          <div className="space-y-1">
            {navigationItems.map(({ label, to }) => (
              <NavLink
                key={to}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )
                }
                end={to === "/"}
                to={to}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            <Link
              className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              Dashboard
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
