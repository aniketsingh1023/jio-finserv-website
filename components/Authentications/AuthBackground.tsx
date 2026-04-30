"use client";

import styles from "./AuthBackground.module.css";

export default function AuthBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gradient}></div>

      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
