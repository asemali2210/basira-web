"use client";

import CategoryCard from "./CategoryCard";
import styles from "./CategoriesGrid.module.scss";

const demoCategories = [
  { id: 1, title: "Category" },
  { id: 2, title: "Category" },
  { id: 3, title: "Category" },
  { id: 4, title: "Category" }
];

export default function CategoriesGrid() {
  return (
    <section className={styles.categories}>
      <header className={styles.categories__header}>
        <h2 className={styles.categories__title}>Lessons</h2>
        <p className={styles.categories__subtitle}>Pick a category to start.</p>
      </header>
      <div className={styles.categories__grid}>
        {demoCategories.map((category) => (
          <CategoryCard key={category.id} title={category.title} />
        ))}
      </div>
    </section>
  );
}
