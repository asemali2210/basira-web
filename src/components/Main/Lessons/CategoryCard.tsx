"use client";

import type { ReactNode } from "react";
import { BsBookmark } from "react-icons/bs";
import styles from "./CategoriesGrid.module.scss";

type CategoryCardProps = {
  title: string;
  icon?: ReactNode;
  loading?: boolean;
};

export default function CategoryCard({ title, icon, loading }: CategoryCardProps) {
  const fallbackIcon = <BsBookmark aria-hidden="true" />;
  const effectiveIcon = icon ?? fallbackIcon;

  return (
    <article
      className={`${styles.categories__card} ${
        loading ? styles["categories__card--loading"] : ""
      }`}
    >
      <span className={styles.categories__cardIcon}>
        {loading ? <span className={styles.categories__cardIconSkeleton} /> : effectiveIcon}
      </span>
      <h3 className={styles.categories__cardTitle}>
        {loading ? <span className={styles.categories__cardTitleSkeleton} /> : title}
      </h3>
    </article>
  );
}
