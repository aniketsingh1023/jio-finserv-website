"use client";

import styles from "./FooterSection.module.css";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { PlayStoreIcon } from "./PlayStoreIcon";

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1 */}
        <div className={`${styles.column} ${styles.glass}`}>
          <div className={styles.logo}>F</div>
          <p className={styles.description}>
            Finserve is a trusted financial partner offering various loan
            products with competitive interest rates starting from 8.50% p.a.
            and flexible repayment options.
          </p>
        </div>

        {/* Quick Links */}
        <div className={`${styles.column} ${styles.glass}`}>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.links}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="about">About Us</Link>
            </li>
            <li>
              <Link href="emi-calculator">EMI Calculator</Link>
            </li>
            <li>
              <Link href="contact">Contact Us</Link>
            </li>
            <li>
              <Link href="apply-for-loan">Apply for Loan</Link>
            </li>
          </ul>
        </div>

        {/* Loans */}
        <div className={`${styles.column} ${styles.glass}`}>
          <h4 className={styles.heading}>Our Loans</h4>
          <ul className={styles.links}>
            <li>
              <Link href="personal-loan">Personal Loan</Link>
            </li>
            <li>
              <Link href="home-loan">Home Loan</Link>
            </li>
            <li>
              <Link href="business-loan">Business Loan</Link>
            </li>
            <li>
              <Link href="education-loan">Education Loan</Link>
            </li>
            <li>
              <Link href="property-loan">Loan Against Property</Link>
            </li>
            <li>
              <Link href="credit-card-loan">Loan Against Credit Card</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className={`${styles.column} ${styles.glass}`}>
          <h4 className={styles.heading}>Contact Us</h4>

          <div className={styles.contactItem}>
            <MapPin size={18} />
            <span>
              Tower-2, DB Block, Godrej Waterside, Nere Collage More, Salt City,
              Sector-5, Kolkata, India
            </span>
          </div>

          <div className={styles.contactItem}>
            <Phone size={18} />
            <span>0868-81912865</span>
          </div>

          <div className={styles.contactItem}>
            <Mail size={18} />
            <span>care@finserve.com</span>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.bottomRow}>
        <p>© {new Date().getFullYear()} Finserve. All rights reserved.</p>

        <div className={styles.bottomLinks}>
          <Link href="terms-conditions">Terms & Conditions</Link>
          <Link href="privacy-policy">Privacy Policy</Link>
        </div>

        <a
          href="/apk/jio-finserv-v2.apk"
          download
          className={styles.downloadAppBtn}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginLeft: 16,
          }}
        >
          <PlayStoreIcon size={28} />
          <span>Download the App Now</span>
        </a>
      </div>
    </footer>
  );
}
