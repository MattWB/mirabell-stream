import { categories } from "../../data/categories";
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
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
}
