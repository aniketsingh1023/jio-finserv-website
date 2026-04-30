"use client";

import styles from "./WhyChooseUsAboutComponent.module.css";

export default function WhyChooseUsAboutComponent() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Why Choose Us?</h2>
        <p className={styles.subheading}>
          We are committed to providing the best financial services to our
          customers.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Quick Processing</h3>
            <p>
              Our streamlined processes ensure that your loan application is
              processed quickly, with most loans approved within 24-48 hours.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Flexible Terms</h3>
            <p>
              We offer flexible repayment options up to 72 months and
              competitive interest rates starting from 8.50% p.a. tailored to
              your financial situation.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Expert Guidance</h3>
            <p>
              Our team of financial experts is always ready to guide you in
              choosing the right loan product for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
