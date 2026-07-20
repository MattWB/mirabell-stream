import { useState, type SyntheticEvent } from "react";
import { Link, useSearchParams } from "react-router";

import { categories } from "../../data/categories";
import { cn } from "../../utils/cn";
import { SearchField } from "../common/SearchField";

type CatalogSearchFormProps = {
  initialQuery: string;
};

function CatalogSearchForm({ initialQuery }: CatalogSearchFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  function handleSearchSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextSearchParams = new URLSearchParams(searchParams);
    const query = searchQuery.trim();

    if (query) {
      nextSearchParams.set("q", query);
    } else {
      nextSearchParams.delete("q");
    }

    setSearchParams(nextSearchParams);
  }

  return (
    <form className="max-w-xl" role="search" onSubmit={handleSearchSubmit}>
      <SearchField
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Rechercher un documentaire..."
      />
    </form>
  );
}

export function CatalogFilters() {
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get("q") ?? "";
  const requestedCategory = searchParams.get("category");

  const activeCategory = categories.some(({ name }) => name === requestedCategory)
    ? requestedCategory
    : null;

  function createCategoryUrl(category?: string) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (category) {
      nextSearchParams.set("category", category);
    } else {
      nextSearchParams.delete("category");
    }

    const search = nextSearchParams.toString();

    return search ? `/catalogue?${search}` : "/catalogue";
  }

  return (
    <div className="mt-8 space-y-6">
      <CatalogSearchForm key={currentQuery} initialQuery={currentQuery} />

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Filtrer par catégorie
        </p>

        <nav
          className="scrollbar-hide flex gap-2 overflow-x-auto pb-2"
          aria-label="Catégories du catalogue"
        >
          <Link
            className={cn(
              "shrink-0 rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              activeCategory === null
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground",
            )}
            to={createCategoryUrl()}
          >
            Toutes
          </Link>

          {categories.map(({ name }) => {
            const isActive = activeCategory === name;

            return (
              <Link
                key={name}
                className={cn(
                  "shrink-0 rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
                to={createCategoryUrl(name)}
                aria-current={activeCategory === null ? "page" : undefined}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
