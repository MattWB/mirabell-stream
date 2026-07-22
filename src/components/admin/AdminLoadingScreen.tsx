import { Film, LoaderCircle } from "lucide-react";

export function AdminLoadingScreen() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-stone-100 px-4 text-stone-900"
      aria-busy="true"
    >
      <div className="flex flex-col items-center text-center" role="status" aria-live="polite">
        <span className="grid size-12 place-items-center rounded-md bg-stone-900 text-amber-400">
          <Film className="size-6" aria-hidden="true" />
        </span>

        <p className="mt-5 font-display text-lg font-bold uppercase tracking-[0.12em]">
          Mirabell Admin
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
          <LoaderCircle
            className="size-4 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />

          <span>Chargement du dashboard...</span>
        </div>
      </div>
    </main>
  );
}
