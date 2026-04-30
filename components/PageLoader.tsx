"use client";

import styles from "./PageLoader.module.css";

export default function PageLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}
