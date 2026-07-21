import type { VideoCategory } from "./video";

type TrendDirection = "up" | "down";

export type ContentStatus = "active" | "scheduled" | "inactive";

export type ActivityKind =
  "publication" | "audience-peak" | "maintenance" | "removal" | "editorial-suggestion";

type DashboardMetricUnit = "count" | "minutes" | "percentage";

export type DashboardMetric = {
  id: string;
  label: string;
  value: number;
  unit: DashboardMetricUnit;
  changePercentage: number;
};

export type AudienceDataPoint = {
  label: string;
  views: number;
  uniqueUsers: number;
};

export type CategoryDistribution = {
  category: VideoCategory;
  percentage: number;
};

export type TopContentMetric = {
  videoId: number;
  views: number;
  completionRate: number;
  trendPercentage: number;
  trendDirection: TrendDirection;
  status: ContentStatus;
};

export type RecentActivity = {
  id: string;
  kind: ActivityKind;
  message: string;
  timeLabel: string;
};
