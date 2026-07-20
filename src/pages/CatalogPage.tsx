import { useState } from "react";
import { SearchX } from "lucide-react";
import { Link, useSearchParams } from "react-router";

import { CatalogFilters } from "../components/streaming/CatalogFilters";
import { VideoCard } from "../components/streaming/VideoCard";
import { VideoPreviewDialog } from "../components/streaming/VideoPreviewDialog";
import { categories } from "../data/categories";
import { videos } from "../data/videos";
import type { Video, VideoCategory } from "../types/video";

function isVideoCategory(value: string | null): value is VideoCategory {
  return categories.some((category) => category.name === value);
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("fr-FR");
}

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const query = searchParams.get("q")?.trim() ?? "";
  const requestedCategory = searchParams.get("category");

  const activeCategory = isVideoCategory(requestedCategory) ? requestedCategory : null;

  const normalizedQuery = normalizeSearchValue(query);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = activeCategory === null || video.category === activeCategory;

    const searchableContent = [
      video.title,
      video.description,
      video.category,
      String(video.releaseYear),
    ]
      .map(normalizeSearchValue)
      .join(" ");

    const matchesQuery = normalizedQuery === "" || searchableContent.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  const resultCountLabel = `${filteredVideos.length} résultat${
    filteredVideos.length === 1 ? "" : "s"
  }`;

  return (
    <main id="main-content" className="min-h-screen px-4 pt-24 pb-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <header>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">Mirabell Stream</p>

          <h1 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
            Explorer le catalogue
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Parcourez notre sélection de documentaires consacrés au monde, aux sciences et aux
            sociétés.
          </p>
        </header>

        <CatalogFilters />

        <section className="mt-10" aria-labelledby="catalog-results-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <h2
              id="catalog-results-title"
              className="font-display text-xl font-bold uppercase tracking-wide"
            >
              {activeCategory ?? "Tous les documentaires"}
            </h2>

            <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
              {resultCountLabel}
            </p>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} layout="grid" onSelect={setSelectedVideo} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-72 place-items-center rounded-lg border border-border bg-card px-6 py-12 text-center">
              <div>
                <SearchX className="mx-auto size-8 text-muted-foreground" aria-hidden="true" />

                <h2 className="mt-4 text-lg font-semibold">Aucun documentaire trouvé</h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Modifiez votre recherche ou supprimez les filtres pour afficher davantage de
                  contenus.
                </p>

                <Link
                  className="mt-6 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                  to="/catalogue"
                >
                  Réinitialiser les filtres
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>

      {selectedVideo && (
        <VideoPreviewDialog
          key={selectedVideo.id}
          video={selectedVideo}
          initialView="details"
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </main>
  );
}
