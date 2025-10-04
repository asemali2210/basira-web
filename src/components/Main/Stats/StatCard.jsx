"use client";

import styles from "./StatCard.module.scss";

export default function StatCard({ value, label, icon, loading }) {
  const displayValue = loading ? "--" : Number(value ?? 0).toLocaleString();

  return (
    <div className={styles.stat}>
      {icon ? <span className={styles.stat__icon}>{icon}</span> : null}
      <strong className={styles.stat__value}>
        {loading ? <span className={styles.stat__placeholder} aria-hidden="true" /> : displayValue}
      </strong>
      <span className={styles.stat__label}>{label}</span>
    </div>
  );
}
