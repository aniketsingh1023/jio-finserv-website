"use client";

import styles from "./LoanHighlightSectionComponent.module.css";

interface HighlightItem {
  tags: string;
  value: string;
  label: string;
}

interface Props {
  highlights: HighlightItem[];
}

export default function LoanHighlightSectionComponent({ highlights }: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {highlights.map((item, index) => (
          <div key={index} className={styles.item}>
            <p className={styles.label}>{item.tags}</p>
            <h3 className={styles.value}>{item.value}</h3>
            <p className={styles.label}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
