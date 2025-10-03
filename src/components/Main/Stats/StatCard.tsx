"use client";

import type { ReactNode } from "react";
import styles from "./StatCard.module.scss";

type StatCardProps = {
  value: number;
  label: string;
  icon?: ReactNode;
};

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className={styles.stat}>
      {icon ? <span className={styles.stat__icon}>{icon}</span> : null}
      <strong className={styles.stat__value}>{value}</strong>
      <span className={styles.stat__label}>{label}</span>
    </div>
  );
}
