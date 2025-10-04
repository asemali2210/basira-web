"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { BsBell, BsJournalText, BsTrophy } from "react-icons/bs";
import { fetchOverview } from "@/store/slices/notificationsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import styles from "./Overview.module.scss";

const notificationIcons = {
  bell: <BsBell aria-hidden="true" />,
  trophy: <BsTrophy aria-hidden="true" />,
  journal: <BsJournalText aria-hidden="true" />,
};

export default function Overview() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { overviewText, items, unreadCount, loading } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  const subtitle = useMemo(
    () => overviewText || t("main.overviewSub"),
    [overviewText, t]
  );

  const notifications = loading
    ? Array.from({ length: 3 }, (_, index) => ({
        id: `placeholder-${index}`,
        text: t("main.keepTrack"),
        icon: "bell",
        type: "info",
        placeholder: true,
      }))
    : items;

  return (
    <section className={styles.overview}>
      <header className={styles.overview__header}>
        <div className={styles.overview__headingGroup}>
          <h1 className={styles.overview__title}>{t("main.overview")}</h1>
          <p className={styles.overview__subtitle}>{subtitle}</p>
        </div>
        <span className={styles.overview__headerIcon} aria-hidden="true">
          <BsBell />
        </span>
      </header>

      <div className={styles.overview__notificationsHeader}>
        <h2 className={styles.overview__notificationsTitle}>
          {t("notifications")}
        </h2>
        {unreadCount > 0 && !loading ? (
          <span className={styles.overview__badge}>{unreadCount}</span>
        ) : null}
      </div>

      <ul className={styles.overview__notifications}>
        {notifications.map((notification) => {
          const iconKey = notification.icon?.toLowerCase?.() ?? "bell";
          const icon = notificationIcons[iconKey] ?? notificationIcons.bell;
          const itemClassName = [
            styles.overview__notificationItem,
            styles[`overview__notificationItem--${notification.type}`],
            notification.placeholder
              ? styles.overview__notificationItemPlaceholder
              : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={notification.id} className={itemClassName}>
              <span className={styles.overview__notificationIcon}>{icon}</span>
              <span className={styles.overview__notificationText}>
                {notification.placeholder ? t("main.keepTrack") : notification.text}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
