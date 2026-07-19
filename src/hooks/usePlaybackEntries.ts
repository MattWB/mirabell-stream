import { useMemo, useSyncExternalStore } from "react";

import {
  getPlaybackSnapshot,
  getServerPlaybackSnapshot,
  parsePlaybackSnapshot,
  subscribePlaybackStore,
  type PlaybackStore,
} from "../services/playbackStorage";

export function usePlaybackEntries(): PlaybackStore {
  const snapshot = useSyncExternalStore(
    subscribePlaybackStore,
    getPlaybackSnapshot,
    getServerPlaybackSnapshot,
  );

  return useMemo(() => parsePlaybackSnapshot(snapshot), [snapshot]);
}
