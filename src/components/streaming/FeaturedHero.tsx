import { Info, Play, Star } from "lucide-react";

import type { Video } from "../../types/video";
import { formatCompactNumber, formatDuration } from "../../utils/formatters";
import { getPublicAssetUrl } from "../../utils/getPublicAssetUrl";

type FeaturedHeroProps = {
  video: Video;
  onPreview: () => void;
  onShowDetails: () => void;
};

export function FeaturedHero({ video, onPreview, onShowDetails }: FeaturedHeroProps) {
  const backdropPath = video.backdropPath ?? video.thumbnailPath;

  return (
    <section
      className="relative flex min-h-[560px] w-full items-end overflow-hidden md:min-h-[650px] md:items-center"
      aria-labelledby="featured-video-title"
    >
      <img
        className="absolute inset-0 size-full object-cover"
        src={getPublicAssetUrl(backdropPath)}
        alt=""
        width="1600"
        height="900"
        loading="eager"
        fetchPriority="high"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-black/5" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/25" />

      <div className="relative z-10 max-w-3xl px-4 pt-28 pb-16 md:px-12 md:py-28 lg:px-16">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-accent">{video.category}</span>

          <span className="text-white/25" aria-hidden="true">
            —
          </span>

          <span className="text-white/50">Documentaire</span>
        </div>

        <h1
          id="featured-video-title"
          className="mt-4 max-w-2xl text-balance font-display text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.01em] text-white"
        >
          {video.title}
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-relaxed font-light text-white/70 md:text-base">
          {video.description}
        </p>

        <ul
          className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-white/55"
          aria-label="Informations sur le documentaire"
        >
          <li>{video.releaseYear}</li>
          <li aria-hidden="true">·</li>
          <li>{formatDuration(video.durationMinutes)}</li>

          {video.rating !== undefined && (
            <>
              <li aria-hidden="true">·</li>
              <li className="flex items-center gap-1">
                <Star className="size-3 fill-accent text-accent" aria-hidden="true" />
                <span>{video.rating}</span>
              </li>
            </>
          )}

          <li aria-hidden="true">·</li>
          <li>{formatCompactNumber(video.views)} vues</li>
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            type="button"
            onClick={onPreview}
            aria-label={`Voir l'extrait de ${video.title}`}
          >
            <Play className="size-4 fill-current" aria-hidden="true" />
            Voir l'extrait
          </button>

          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            type="button"
            onClick={onShowDetails}
          >
            <Info className="size-4" aria-hidden="true" />
            Plus d'informations
          </button>
        </div>
      </div>
    </section>
  );
}
