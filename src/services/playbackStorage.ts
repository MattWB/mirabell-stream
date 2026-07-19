export type PlaybackEntry = {
  currentTime: number;
  duration: number;
  updatedAt: string;
};

export type PlaybackStore = Record<string, PlaybackEntry>;

const STORAGE_KEY = "mirabell-stream:playback-progress:v2";
const EMPTY_SNAPSHOT = "{}";

const subscribers = new Set<() => void>();

function isPlaybackEntry(value: unknown): value is PlaybackEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.currentTime === "number" &&
    Number.isFinite(entry.currentTime) &&
    entry.currentTime >= 0 &&
    typeof entry.duration === "number" &&
    Number.isFinite(entry.duration) &&
    entry.duration > 0 &&
    typeof entry.updatedAt === "string"
  );
}

function notifySubscribers(): void {
  subscribers.forEach((subscriber) => subscriber());
}

export function getPlaybackSnapshot(): string {
  if (typeof window === "undefined") {
    return EMPTY_SNAPSHOT;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

export function getServerPlaybackSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

export function parsePlaybackSnapshot(snapshot: string): PlaybackStore {
  try {
    const parsedValue: unknown = JSON.parse(snapshot);

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

function readPlaybackStore(): PlaybackStore {
  return parsePlaybackSnapshot(getPlaybackSnapshot());
}

function writePlaybackStore(store: PlaybackStore): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));

    notifySubscribers();
  } catch {
    // if not available : preserve playback;
  }
}

export function subscribePlaybackStore(subscriber: () => void): () => void {
  subscribers.add(subscriber);

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      subscriber();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    subscribers.delete(subscriber);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getPlaybackEntry(videoId: number): PlaybackEntry | undefined {
  return readPlaybackStore()[String(videoId)];
}

export function savePlaybackPosition(videoId: number, currentTime: number, duration: number): void {
  if (
    !Number.isFinite(currentTime) ||
    currentTime <= 0 ||
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    return;
  }

  const store = readPlaybackStore();

  store[String(videoId)] = {
    currentTime,
    duration,
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
