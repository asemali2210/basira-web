"use client";

import { useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { fetchLessons } from "@/store/slices/lessonsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import styles from "./LessonsTable.module.scss";

const PLACEHOLDER_ROWS = 4;

type LessonRow = {
  id: string | number;
  name?: string;
  date?: string;
  duration?: string;
  category?: string;
  instructor?: string;
  child?: string;
  status?: string;
  loading?: boolean;
};

export default function LessonsTable() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  const rows: LessonRow[] = useMemo(() => {
    if (loading && list.length === 0) {
      return Array.from({ length: PLACEHOLDER_ROWS }, (_, index) => ({
        id: `placeholder-${index}`,
        loading: true,
      }));
    }

    return list;
  }, [list, loading]);

  const formatDate = (value?: string) => {
    if (!value) return "";

    try {
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
      }).format(new Date(value));
    } catch (error) {
      return value;
    }
  };

  const resolveStatus = (status?: string) => {
    if (!status) {
      return {
        label: "--",
        modifier: "unknown",
      };
    }

    const normalized = status.toLowerCase();

    if (normalized === "completed") {
      return {
        label: t("table.completed"),
        modifier: "completed",
      };
    }

    return {
      label: t("table.active"),
      modifier: "active",
    };
  };

  return (
    <div className={styles.lessonsTable}>
      <div className={`${styles.lessonsTable__container} table-responsive`}>
        <table className={`table align-middle ${styles.lessonsTable__table}`}>
          <caption className="visually-hidden">{t("main.keepTrack")}</caption>
          <thead>
            <tr>
              <th scope="col">{t("table.lessonName")}</th>
              <th scope="col">{t("table.date")}</th>
              <th scope="col">{t("table.duration")}</th>
              <th scope="col">{t("table.category")}</th>
              <th scope="col">{t("table.instructor")}</th>
              <th scope="col">{t("table.child")}</th>
              <th scope="col">{t("table.status")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lesson) => {
              if (lesson.loading) {
                return (
                  <tr key={lesson.id}>
                    {Array.from({ length: 7 }, (_, cellIndex) => (
                      <td key={cellIndex}>
                        <span className={styles.lessonsTable__skeleton} aria-hidden="true" />
                      </td>
                    ))}
                  </tr>
                );
              }

              const status = resolveStatus(lesson.status);

              return (
                <tr key={lesson.id}>
                  <td>{lesson.name}</td>
                  <td>{formatDate(lesson.date)}</td>
                  <td>{lesson.duration}</td>
                  <td>{lesson.category}</td>
                  <td>{lesson.instructor}</td>
                  <td>{lesson.child}</td>
                  <td>
                    <span
                      className={`${styles.lessonsTable__status} ${styles[`lessonsTable__status--${status.modifier}`]}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
