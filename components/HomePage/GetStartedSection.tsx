"use client";

import styles from "./GetStartedSection.module.css";
import { ArrowRight } from "lucide-react";

export default function GetStartedSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Ready to <span>Get Started?</span>
        </h2>

        <p className={styles.subtitle}>
          Apply now and get your loan approved within 24 hours. Our team is
          ready to assist you every step of the way.
        </p>

        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.primary}`}>
            Apply Now
          </button>

          <button className={`${styles.btn} ${styles.outline}`}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
