import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

import type { Video } from "../../types/video";
import { VideoCard } from "./VideoCard";

type VideoRowProps = {
  id: string;
  title: string;
  videos: readonly Video[];
  icon?: ReactNode;
  onVideoSelect: (video: Video) => void;
};

export function VideoRow({ id, title, videos, icon, onVideoSelect }: VideoRowProps) {
  const titleId = `${id}-title`;

  return (
    <section className="py-8 md:py-10" aria-labelledby={titleId}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id={titleId}
          className="flex items-center gap-2 font-display text-base font-black uppercase tracking-wide text-foreground md:text-lg"
        >
          {icon}
          {title}
        </h2>

        <Link
          className="flex shrink-0 items-center gap-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-accent"
          to="/catalogue"
        >
          Voir tout
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} layout="carousel" onSelect={onVideoSelect} />
        ))}
      </div>
    </section>
  );
}
