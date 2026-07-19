import { useCallback, useRef, useState, type SyntheticEvent } from "react";

import {
  clearPlaybackPosition,
  getPlaybackEntry,
  savePlaybackPosition,
} from "../services/playbackStorage";

const END_THRESHOLD_SECONDS = 2;

export function usePlaybackProgress(videoId: number) {
  const [resumeTime, setResumeTime] = useState(() => getPlaybackEntry(videoId)?.currentTime ?? 0);

  const lastSavedSecond = useRef(-1);

  const persistPosition = useCallback(
    (currentTime: number, duration: number) => {
      if (!Number.isFinite(currentTime) || !Number.isFinite(duration)) {
        return;
      }

      if (currentTime <= 0 || currentTime >= duration - END_THRESHOLD_SECONDS) {
        clearPlaybackPosition(videoId);
        return;
      }

      savePlaybackPosition(videoId, currentTime, duration);
    },
    [videoId],
  );

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const videoElement = event.currentTarget;
      const savedEntry = getPlaybackEntry(videoId);

      if (!savedEntry || savedEntry.currentTime >= videoElement.duration - END_THRESHOLD_SECONDS) {
        clearPlaybackPosition(videoId);
        setResumeTime(0);
        return;
      }

      videoElement.currentTime = savedEntry.currentTime;
      lastSavedSecond.current = Math.floor(savedEntry.currentTime);
      setResumeTime(savedEntry.currentTime);
    },
    [videoId],
  );

  const handleTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const videoElement = event.currentTarget;
      const currentSecond = Math.floor(videoElement.currentTime);

      if (currentSecond === lastSavedSecond.current) {
        return;
      }

      lastSavedSecond.current = currentSecond;

      persistPosition(videoElement.currentTime, videoElement.duration);
    },
    [persistPosition],
  );

  const handlePause = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const videoElement = event.currentTarget;

      persistPosition(videoElement.currentTime, videoElement.duration);
    },
    [persistPosition],
  );

  const handleEnded = useCallback(() => {
    clearPlaybackPosition(videoId);
    lastSavedSecond.current = -1;
    setResumeTime(0);
  }, [videoId]);

  return {
    resumeTime,
    persistPosition,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePause,
    handleEnded,
  };
}
