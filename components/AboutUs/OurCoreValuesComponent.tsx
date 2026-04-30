"use client";

import styles from "./OurCoreValuesComponent.module.css";
import { ShieldCheck, Users, TrendingUp, Award } from "lucide-react";

export default function OurCoreValuesComponent() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Core Values</h2>
        <p className={styles.subheading}>
          These values guide every decision we make and every interaction we
          have with our customers.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={26} />
            </div>
            <h3>Trust & Transparency</h3>
            <p>
              We believe in building long-lasting relationships based on trust
              and complete transparency in all our dealings.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Users size={26} />
            </div>
            <h3>Customer First</h3>
            <p>
              Our customers are at the heart of everything we do. We strive to
              exceed their expectations at every touchpoint.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <TrendingUp size={26} />
            </div>
            <h3>Innovation</h3>
            <p>
              We continuously innovate our products and services to provide the
              best financial solutions to our customers.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Award size={26} />
            </div>
            <h3>Excellence</h3>
            <p>
              We are committed to delivering excellence in every aspect of our
              service, from application to disbursement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
