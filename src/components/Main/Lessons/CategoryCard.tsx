"use client";

import type { ReactNode } from "react";
import styles from "./CategoriesGrid.module.scss";

type CategoryCardProps = {
  title: string;
  icon?: ReactNode;
};

export default function CategoryCard({ title, icon }: CategoryCardProps) {
  return (
    <article className={styles.categories__card}>
      <span className={styles.categories__cardIcon}>{icon}</span>
      <h3 className={styles.categories__cardTitle}>{title}</h3>
    </article>
  );
}
