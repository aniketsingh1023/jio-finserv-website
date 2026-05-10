"use client";

import styles from "./OurStoryComponent.module.css";
import { Target, Eye } from "lucide-react";

export default function OurStoryComponent() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <h2 className={styles.heading}>Our Story</h2>

          <p>
            Jio Finserv Limited was established with a vision to provide accessible
            financial solutions to individuals and businesses across India. With
            over a decade of experience in the financial services industry, we
            have grown to become one of the most trusted names in the NBFC
            sector.
          </p>

          <p>
            Our journey began with a simple belief – that everyone deserves
            access to quality financial services regardless of their background.
            Today, we proudly serve over 50,000 customers across 25+ locations,
            disbursing loans worth over ₹500 crores.
          </p>

          <p>
            We offer a comprehensive range of loan products including Personal
            Loans, Home Loans, Business Loans, Vehicle Loans, Gold Loans,
            Education Loans, and Loans Against Property — designed to meet the
            diverse financial needs of our customers with interest rates
            starting from 8.50% p.a.
          </p>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className={styles.cardsWrapper}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Target size={26} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To empower individuals and businesses with accessible financial
              solutions.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Eye size={26} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be India's most trusted and customer-centric financial
              institution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
