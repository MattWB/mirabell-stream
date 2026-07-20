import { Fragment, useState } from "react";
import { Clock, Flame, Star } from "lucide-react";
import { usePlaybackEntries } from "../hooks/usePlaybackEntries";

import { FeaturedHero } from "../components/streaming/FeaturedHero";
import { VideoPreviewDialog } from "../components/streaming/VideoPreviewDialog";
import { VideoRow } from "../components/streaming/VideoRow";
import { videos } from "../data/videos";
import { CategoryGrid } from "../components/streaming/CategoryGrid";
import type { Video } from "../types/video";

type DialogView = "details" | "player";

type DialogState = {
  video: Video;
  initialView: DialogView;
};

export function HomePage() {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);

  const playbackEntries = usePlaybackEntries();

  const featuredVideo = videos.find((video) => video.featured);

  const continueWatching = videos.filter(
    (video) => video.progress !== undefined || playbackEntries[String(video.id)] !== undefined,
  );

  const trendingVideos = videos
    .filter((video) => video.badge === "Tendance" || video.views > 200_000)
    .slice(0, 4);

  const newVideos = videos.filter((video) => video.badge === "Nouveau").slice(0, 4);

  const visibleRows = [
    {
      id: "continue-watching",
      title: "Continuer à regarder",
      videos: continueWatching,
      icon: <Clock className="size-4 text-accent" aria-hidden="true" />,
    },
    {
      id: "trending",
      title: "Tendances du moment",
      videos: trendingVideos,
      icon: <Flame className="size-4 text-accent" aria-hidden="true" />,
    },
    {
      id: "new-releases",
      title: "Nouveautés",
      videos: newVideos,
      icon: <Star className="size-4 text-accent" aria-hidden="true" />,
    },
  ].filter(({ videos }) => videos.length > 0);

  if (!featuredVideo) {
    return (
      <main id="main-content" className="grid min-h-screen place-items-center px-4 pt-16">
        <p className="text-muted-foreground">Aucun contenu n'est actuellement mis en avant.</p>
      </main>
    );
  }

  function openDialog(video: Video, initialView: DialogView) {
    setDialogState({ video, initialView });
  }

  function openVideoDetails(video: Video) {
    openDialog(video, "details");
  }

  return (
    <main id="main-content">
      <FeaturedHero
        video={featuredVideo}
        onPreview={() => openDialog(featuredVideo, "player")}
        onShowDetails={() => openDialog(featuredVideo, "details")}
      />

      <div className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8 lg:px-12">
        {visibleRows.map((row, index) => (
          <Fragment key={row.id}>
            {index > 0 && <div className="border-t border-border" />}

            <VideoRow
              id={row.id}
              title={row.title}
              videos={row.videos}
              icon={row.icon}
              onVideoSelect={openVideoDetails}
            />
          </Fragment>
        ))}

        {visibleRows.length > 0 && <div className="border-t border-border" />}

        <CategoryGrid />
      </div>

      {dialogState && (
        <VideoPreviewDialog
          key={`${dialogState.video.id}-${dialogState.initialView}`}
          video={dialogState.video}
          initialView={dialogState.initialView}
          onClose={() => setDialogState(null)}
        />
      )}
    </main>
  );
}
