"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  BsJournalText,
  BsCheckCircle,
  BsGrid,
  BsTrophy,
} from "react-icons/bs";
import StatCard from "./StatCard";
import styles from "./StatsSection.module.scss";
import { fetchStats } from "@/store/slices/lessonsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function StatsSection() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const cards = [
    {
      key: "inProgress",
      value: stats.inProgress,
      label: t("stats.inProgress"),
      icon: <BsJournalText aria-hidden="true" />,
    },
    {
      key: "completed",
      value: stats.completed,
      label: t("stats.completed"),
      icon: <BsCheckCircle aria-hidden="true" />,
    },
    {
      key: "categoriesCompleted",
      value: stats.categoriesCompleted,
      label: t("stats.categoriesCompleted"),
      icon: <BsGrid aria-hidden="true" />,
    },
    {
      key: "achievements",
      value: stats.achievements,
      label: t("stats.achievements"),
      icon: <BsTrophy aria-hidden="true" />,
    },
  ];

  return (
    <section className={styles.stats} aria-label={t("stats.achievements")}>
      <div
        className={`${styles.stats__grid} row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3`}
      >
        {cards.map(({ key, value, label, icon }) => (
          <div key={key} className={`${styles.stats__column} col`}>
            <StatCard value={value} label={label} icon={icon} loading={loading} />
          </div>
        ))}
      </div>
    </section>
  );
}
