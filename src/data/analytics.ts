import type {
  AudienceDataPoint,
  CategoryDistribution,
  DashboardMetric,
  RecentActivity,
  TopContentMetric,
} from "../types/analytics";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "active-users",
    label: "Utilisateurs actifs",
    value: 24_831,
    unit: "count",
    changePercentage: 12.4,
  },
  {
    id: "total-views",
    label: "Vues totales",
    value: 183_920,
    unit: "count",
    changePercentage: 8.7,
  },
  {
    id: "average-watch-time",
    label: "Durée moy. de visionnage",
    value: 38,
    unit: "minutes",
    changePercentage: -2.1,
  },
  {
    id: "completion-rate",
    label: "Taux de complétion",
    value: 67,
    unit: "percentage",
    changePercentage: 4.3,
  },
];

export const audienceData: AudienceDataPoint[] = [
  {
    label: "Lun",
    views: 22_400,
    uniqueUsers: 16_800,
  },
  {
    label: "Mar",
    views: 24_800,
    uniqueUsers: 18_200,
  },
  {
    label: "Mer",
    views: 21_600,
    uniqueUsers: 15_900,
  },
  {
    label: "Jeu",
    views: 27_300,
    uniqueUsers: 20_100,
  },
  {
    label: "Ven",
    views: 31_200,
    uniqueUsers: 22_800,
  },
  {
    label: "Sam",
    views: 29_800,
    uniqueUsers: 21_400,
  },
  {
    label: "Dim",
    views: 26_800,
    uniqueUsers: 19_600,
  },
];

export const categoryDistribution: CategoryDistribution[] = [
  {
    category: "Culture",
    percentage: 28,
  },
  {
    category: "Science",
    percentage: 22,
  },
  {
    category: "Nature",
    percentage: 19,
  },
  {
    category: "Société",
    percentage: 14,
  },
  {
    category: "Voyage",
    percentage: 10,
  },
  {
    category: "Technologie",
    percentage: 7,
  },
];

export const topContentMetrics: TopContentMetric[] = [
  {
    videoId: 7,
    views: 48_200,
    completionRate: 81,
    trendPercentage: 18,
    trendDirection: "up",
    status: "active",
  },
  {
    videoId: 2,
    views: 41_300,
    completionRate: 74,
    trendPercentage: 31,
    trendDirection: "up",
    status: "active",
  },
  {
    videoId: 1,
    views: 38_900,
    completionRate: 69,
    trendPercentage: 8,
    trendDirection: "up",
    status: "active",
  },
  {
    videoId: 8,
    views: 22_100,
    completionRate: 88,
    trendPercentage: 2,
    trendDirection: "up",
    status: "active",
  },
  {
    videoId: 9,
    views: 18_700,
    completionRate: 92,
    trendPercentage: 5,
    trendDirection: "down",
    status: "active",
  },
];

export const recentActivity: RecentActivity[] = [
  {
    id: "publication-antarctica",
    kind: "publication",
    message: "Nouveau contenu publié : « Antarctique, Terre de Glace »",
    timeLabel: "il y a 2 h",
  },
  {
    id: "audience-peak-cosmos",
    kind: "audience-peak",
    message: "Pic d’audience : « Cosmos Invisible » franchit 50 000 vues",
    timeLabel: "il y a 4 h",
  },
  {
    id: "scheduled-maintenance",
    kind: "maintenance",
    message: "Maintenance planifiée ce soir de 23 h à 1 h",
    timeLabel: "il y a 6 h",
  },
  {
    id: "expired-content-removal",
    kind: "removal",
    message: "Contenu retiré : « Frontières Silencieuses » — droits expirés",
    timeLabel: "il y a 1 jour",
  },
  {
    id: "gastronomy-suggestion",
    kind: "editorial-suggestion",
    message: "Suggestion éditoriale : créer une catégorie « Gastronomie »",
    timeLabel: "il y a 2 jours",
  },
];
