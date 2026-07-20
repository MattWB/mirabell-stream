import { Search, X } from "lucide-react";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export function SearchField({
  value,
  onChange,
  placeholder = "Rechercher...",
  autoFocus = false,
}: SearchFieldProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center">
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
      </span>

      <input
        className="h-10 w-full appearance-none rounded-md border border-border bg-secondary pr-10 pl-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher un documentaire"
        autoFocus={autoFocus}
      />

      {value.length > 0 && (
        <button
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          type="button"
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
