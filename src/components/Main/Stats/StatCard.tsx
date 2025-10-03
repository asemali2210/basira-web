"use client";

import type { ReactNode } from "react";
import styles from "./StatCard.module.scss";

type StatCardProps = {
  value: number;
  label: string;
  icon?: ReactNode;
  loading?: boolean;
};

export default function StatCard({ value, label, icon, loading }: StatCardProps) {
  const displayValue = loading ? "--" : value.toLocaleString();

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
