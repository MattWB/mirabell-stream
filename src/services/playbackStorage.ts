export type PlaybackEntry = {
  currentTime: number;
  updatedAt: string;
};

type PlaybackStore = Record<string, PlaybackEntry>;

const STORAGE_KEY = "mirabell-stream:playback-progress:v1";

function isPlaybackEntry(value: unknown): value is PlaybackEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.currentTime === "number" &&
    Number.isFinite(entry.currentTime) &&
    entry.currentTime >= 0 &&
    typeof entry.updatedAt === "string"
  );
}

function readPlaybackStore(): PlaybackStore {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return {};
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!parsedValue || typeof parsedValue !== "object" || Array.isArray(parsedValue)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsedValue).filter(([, entry]) => isPlaybackEntry(entry)),
    );
  } catch {
    return {};
  }
}

function writePlaybackStore(store: PlaybackStore): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // If not available : preserve playback
  }
}

export function getPlaybackEntry(videoId: number): PlaybackEntry | undefined {
  return readPlaybackStore()[String(videoId)];
}

export function savePlaybackPosition(videoId: number, currentTime: number): void {
  if (!Number.isFinite(currentTime) || currentTime <= 0) {
    return;
  }

  const store = readPlaybackStore();

  store[String(videoId)] = {
    currentTime,
    updatedAt: new Date().toISOString(),
  };

  writePlaybackStore(store);
}

export function clearPlaybackPosition(videoId: number): void {
  const store = readPlaybackStore();
  const key = String(videoId);

  if (!(key in store)) {
    return;
  }

  delete store[key];
  writePlaybackStore(store);
}
