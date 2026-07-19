import { useState } from "react";

import { FeaturedHero } from "../components/streaming/FeaturedHero";
import { VideoPreviewDialog } from "../components/streaming/VideoPreviewDialog";
import { videos } from "../data/videos";
import type { Video } from "../types/video";

type DialogView = "details" | "player";

type DialogState = {
  video: Video;
  initialView: DialogView;
};

export function HomePage() {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);

  const featuredVideo = videos.find((video) => video.featured);

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

  return (
    <main id="main-content">
      <FeaturedHero
        video={featuredVideo}
        onPreview={() => openDialog(featuredVideo, "player")}
        onShowDetails={() => openDialog(featuredVideo, "details")}
      />

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
