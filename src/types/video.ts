export type VideoCategory = "Culture" | "Société" | "Science" | "Nature" | "Voyage" | "Technologie";

export type VideoBadge = "Nouveau" | "Tendance";

export type Video = {
  id: number;
  title: string;
  category: VideoCategory;
  durationMinutes: number;
  releaseYear: number;
  views: number;
  thumbnailPath: string;
  backdropPath?: string;
  description: string;
  badge?: VideoBadge;
  progress?: number;
  rating?: number;
  featured?: boolean;
};

export type VideoCategorySummary = {
  name: VideoCategory;
  imagePath: string;
  contentCount: number;
};
