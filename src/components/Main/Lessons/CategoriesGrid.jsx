"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  BsBook,
  BsGlobe2,
  BsPalette,
  BsMusicNoteBeamed,
} from "react-icons/bs";
import CategoryCard from "./CategoryCard";
import styles from "./CategoriesGrid.module.scss";
import { fetchCategories } from "@/store/slices/categoriesSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

const ICON_SEQUENCE = [
  <BsBook aria-hidden="true" key="book" />,
  <BsGlobe2 aria-hidden="true" key="globe" />,
  <BsPalette aria-hidden="true" key="palette" />,
  <BsMusicNoteBeamed aria-hidden="true" key="music" />,
];

export default function CategoriesGrid() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useMemo(() => {
    if (loading && items.length === 0) {
      return Array.from({ length: 4 }, (_, index) => ({
        id: `placeholder-${index}`,
        title: t("main.lessons"),
        loading: true,
      }));
    }

    return items.map((item, index) => ({
      id: item.id,
      title: item.title,
      icon: ICON_SEQUENCE[index % ICON_SEQUENCE.length],
      loading: false,
    }));
  }, [items, loading, t]);

  return (
    <section className={styles.categories}>
      <header className={styles.categories__header}>
        <h2 className={styles.categories__title}>{t("main.lessons")}</h2>
        <p className={styles.categories__subtitle}>{t("main.lessonsSub")}</p>
      </header>

      <div className={`${styles.categories__grid} row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3`}>
        {categories.map((category, index) => (
          <div key={category.id} className={`${styles.categories__column} col`}>
            <CategoryCard
              title={category.title}
              icon={category.icon ?? ICON_SEQUENCE[index % ICON_SEQUENCE.length]}
              loading={category.loading}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
