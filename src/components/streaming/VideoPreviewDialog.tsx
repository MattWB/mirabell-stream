import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Play, RotateCcw, Star, X } from "lucide-react";

import { usePlaybackProgress } from "../../hooks/usePlaybackProgress";
import type { Video } from "../../types/video";
import { formatCompactNumber, formatDuration, formatTimecode } from "../../utils/formatters";
import { getPublicAssetUrl } from "../../utils/getPublicAssetUrl";

type DialogView = "details" | "player";

type VideoPreviewDialogProps = {
  video: Video;
  initialView?: DialogView;
  onClose: () => void;
};

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function VideoPreviewDialog({
  video,
  initialView = "details",
  onClose,
}: VideoPreviewDialogProps) {
  const [currentView, setCurrentView] = useState<DialogView>(initialView);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    resumeTime,
    persistPosition,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePause,
    handleEnded,
  } = usePlaybackProgress(video.id);

  const saveCurrentPosition = useCallback(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    persistPosition(videoElement.currentTime, videoElement.duration);
  }, [persistPosition]);

  const handleClose = useCallback(() => {
    saveCurrentPosition();
    onClose();
  }, [onClose, saveCurrentPosition]);

  function showDetails() {
    saveCurrentPosition();
    setCurrentView("details");
  }

  function showPlayer() {
    setCurrentView("player");
  }

  function restartPreview() {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.currentTime = 0;
    void videoElement.play();
  }

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, []);

  useEffect(() => {
    if (currentView === "player") {
      videoRef.current?.focus();
    }
  }, [currentView]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const titleId = `video-preview-title-${video.id}`;
  const descriptionId = `video-preview-description-${video.id}`;

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/85 backdrop-blur-sm md:items-center md:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="relative max-h-[95svh] w-full overflow-y-auto rounded-t-xl border border-border bg-card shadow-2xl md:max-w-3xl md:rounded-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 z-20 flex size-10 items-center justify-center rounded-md bg-black/65 text-white transition-colors hover:bg-black/85"
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {currentView === "player" ? (
          <div>
            <div className="bg-black">
              <video
                ref={videoRef}
                className="aspect-video w-full"
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={getPublicAssetUrl(video.thumbnailPath)}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPause={handlePause}
                onEnded={handleEnded}
                aria-label={`Extrait de ${video.title}`}
                tabIndex={0}
              >
                <source src={getPublicAssetUrl(video.previewPath)} type="video/mp4" />
                Votre navigateur ne permet pas de lire cette vidéo.
              </video>
            </div>

            <div className="p-5 md:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Extrait de démonstration
              </p>

              <h2
                id={titleId}
                className="mt-1 font-display text-2xl font-black uppercase leading-tight text-foreground md:text-3xl"
              >
                {video.title}
              </h2>

              <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
                {resumeTime > 0
                  ? `Lecture reprise à ${formatTimecode(resumeTime)}.`
                  : "Court extrait optimisé pour la démonstration du lecteur."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
                  type="button"
                  onClick={showDetails}
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Informations
                </button>

                <button
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
                  type="button"
                  onClick={restartPreview}
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Recommencer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                className="size-full object-cover"
                src={getPublicAssetUrl(video.thumbnailPath)}
                alt=""
                width="960"
                height="540"
              />

              <div className="absolute inset-0 bg-linear-to-t from-card via-card/15 to-black/15" />

              <div className="absolute right-14 bottom-5 left-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {video.category}
                </p>

                <h2
                  id={titleId}
                  className="mt-1 max-w-xl font-display text-2xl font-black uppercase leading-tight text-white md:text-4xl"
                >
                  {video.title}
                </h2>
              </div>
            </div>

            <div className="p-5 md:p-6">
              <ul
                className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground"
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

              <p
                id={descriptionId}
                className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground"
              >
                {video.description}
              </p>

              <div className="mt-6">
                <button
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
                  type="button"
                  onClick={showPlayer}
                  aria-label={`Voir l’extrait de ${video.title}`}
                >
                  <Play className="size-4 fill-current" aria-hidden="true" />

                  {resumeTime > 0 ? `Reprendre à ${formatTimecode(resumeTime)}` : "Voir l'extrait"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
