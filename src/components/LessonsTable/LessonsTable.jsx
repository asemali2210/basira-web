"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { fetchLessons } from "@/store/slices/lessonsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import styles from "./LessonsTable.module.scss";
import { getStrapiBaseUrl } from "@/hooks/useAuth/useStrapiUrl";

const PLACEHOLDER_ROWS = 4;

export default function LessonsTable() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState([]);
  const { list, loading } = useAppSelector((state) => state.lessons);
  useEffect(() => {
    const fetchLessons = async function () {
      const jwtToken = window.localStorage.getItem("jwt");
      try {
        const respone = await fetch(
          "http://localhost:1337/api/lessons?popualte=*",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        const data = await respone.json();
        setLessons(data);
        console.log(lessons);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLessons();
    return () => {
      console.log("first");
    };
  }, []);

  const localizedLessons = useMemo(() => {
    if (!Array.isArray(list)) {
      return [];
    }

    return list.filter((lesson) => !lesson.locale || lesson.locale === locale);
  }, [list, locale]);

  const rows = useMemo(() => {
    if (loading && localizedLessons.length === 0) {
      return Array.from({ length: PLACEHOLDER_ROWS }, (_, index) => ({
        id: `placeholder-${index}`,
        loading: true,
      }));
    }

    return localizedLessons;
  }, [localizedLessons, loading]);

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
            {lessons.data?.map((lesson) => {
              return (
                <tr key={lesson.id}>
                  <td>{lesson.title}</td>
                  <td>{lesson.publishedAt}</td>
                  <td>{lesson.durationMinutes}</td>
                  <td>{lesson.category}</td>
                  <td>{lesson.instructor}</td>
                  <td>{lesson.locale}</td>
                  <td>
                    <span
                      className={`${styles.lessonsTable__status} ${
                        styles[`lessonsTable__status--${lesson.status}`]
                      }`}
                    ></span>
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
