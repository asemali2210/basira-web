"use client";

import styles from "./Overview.module.scss";

export default function Overview() {
  return (
    <section className={styles.overview}>
      <header className={styles.overview__header}>
        <div>
          <h1 className={styles.overview__title}>Overview</h1>
          <p className={styles.overview__subtitle}>Summary placeholder</p>
        </div>
        <div className={styles.overview__icon} aria-hidden="true" />
      </header>
      <ul className={styles.overview__notifications}>
        <li className={styles.overview__notificationItem}>Notification placeholder</li>
      </ul>
    </section>
  );
}
