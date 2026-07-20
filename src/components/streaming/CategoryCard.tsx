import { BookOpen, Compass, Cpu, Globe, Leaf, Microscope, type LucideIcon } from "lucide-react";
import { Link } from "react-router";

import type { VideoCategory, VideoCategorySummary } from "../../types/video";
import { getPublicAssetUrl } from "../../utils/getPublicAssetUrl";

type CategoryCardProps = {
  category: VideoCategorySummary;
};

const categoryIcons: Record<VideoCategory, LucideIcon> = {
  Culture: BookOpen,
  Société: Globe,
  Science: Microscope,
  Nature: Leaf,
  Voyage: Compass,
  Technologie: Cpu,
};

export function CategoryCard({ category }: CategoryCardProps) {
  const { name, imagePath, contentCount } = category;
  const Icon = categoryIcons[name];
  const search = new URLSearchParams({ category: name }).toString();

  return (
    <Link
      to={{
        pathname: "/catalogue",
        search,
      }}
      className="group relative aspect-4/3 overflow-hidden rounded-lg bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Explorer la catégorie ${name}, ${contentCount} documentaires`}
    >
      <img
        src={getPublicAssetUrl(imagePath)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10 transition-colors duration-300 group-hover:from-black/80" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-4">
        <Icon className="mb-2 size-4 xl:size-6 text-primary" aria-hidden="true" />

        <h3 className="font-display font-bold uppercase tracking-wide text-white text-base xl:text-xl">
          {name}
        </h3>

        <p className="mt-1 text-xs text-white/65">{contentCount} documentaires</p>
      </div>
    </Link>
  );
}
