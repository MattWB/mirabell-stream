import { cva } from "class-variance-authority";
import { Play } from "lucide-react";

import type { Video } from "../../types/video";
import { cn } from "../../utils/cn";
import { formatDuration } from "../../utils/formatters";
import { getPublicAssetUrl } from "../../utils/getPublicAssetUrl";
import { usePlaybackEntries } from "../../hooks/usePlaybackEntries";

const videoCardVariants = cva("group block text-left text-foreground", {
  variants: {
    layout: {
      carousel: "w-[min(240px,72vw)] shrink-0 md:w-auto",
      grid: "w-full",
    },
  },
  defaultVariants: {
    layout: "grid",
  },
});

type VideoCardProps = {
  video: Video;
  onSelect: (video: Video) => void;
  layout?: "carousel" | "grid";
  showProgress?: boolean;
};

export function VideoCard({
  video,
  onSelect,
  layout = "grid",
  showProgress = true,
}: VideoCardProps) {
  const playbackEntries = usePlaybackEntries();
  const playbackEntry = playbackEntries[String(video.id)];

  const previewProgress =
    playbackEntry !== undefined
      ? Math.min(
          99,
          Math.max(1, Math.round((playbackEntry.currentTime / playbackEntry.duration) * 100)),
        )
      : undefined;

  const displayedProgress = previewProgress ?? video.progress;

  const hasProgress = showProgress && displayedProgress !== undefined;

  const isPreviewProgress = previewProgress !== undefined;

  return (
    <button
      className={cn(videoCardVariants({ layout }))}
      type="button"
      onClick={() => onSelect(video)}
      aria-label={`Ouvrir la fiche de ${video.title}`}
    >
      <span className="relative block aspect-video overflow-hidden rounded-md bg-muted">
        <img
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
          src={getPublicAssetUrl(video.thumbnailPath)}
          alt=""
          width="960"
          height="540"
          loading="lazy"
          decoding="async"
        />

        <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25 group-focus-visible:bg-black/25" />

        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex size-10 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm">
            <Play className="size-4 fill-current" aria-hidden="true" />
          </span>
        </span>

        {video.badge && (
          <span className="absolute top-2 right-2 rounded-sm bg-accent px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-foreground">
            {video.badge}
          </span>
        )}

        <span className="absolute right-2 bottom-2 rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white/85">
          {formatDuration(video.durationMinutes)}
        </span>

        {hasProgress && (
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/15" aria-hidden="true">
            <span className="block h-full bg-accent" style={{ width: `${displayedProgress}%` }} />
          </span>
        )}
      </span>

      <span className="mt-2.5 block">
        <span className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{video.category}</span>
          <span aria-hidden="true">·</span>
          <span>{video.releaseYear}</span>

          {hasProgress && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-accent">
                {displayedProgress}% {isPreviewProgress ? "extrait" : "vu"}
              </span>
            </>
          )}
        </span>

        <span className="mt-1 block line-clamp-2 text-sm font-medium leading-snug transition-colors group-hover:text-accent group-focus-visible:text-accent">
          {video.title}
        </span>
      </span>
    </button>
  );
}
