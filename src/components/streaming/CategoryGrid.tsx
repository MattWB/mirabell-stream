import { categories } from "../../data/categories";
import { videos } from "../../data/videos";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  return (
    <section className="py-8 md:py-10" aria-labelledby="category-grid-title">
      <h2
        id="category-grid-title"
        className="mb-5 text-lg font-bold uppercase tracking-wide text-foreground md:text-xl"
      >
        Explorer par catégorie
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {categories.map((category) => {
          const contentCount = videos.filter((video) => video.category === category.name).length;

          return (
            <CategoryCard
              key={category.name}
              category={{
                ...category,
                contentCount,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
