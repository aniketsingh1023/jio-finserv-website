"use client";

import styles from "./WhyTrustSection.module.css";
import {
  Landmark,
  ShieldCheck,
  Award,
  Users,
  FileCheck,
  Star,
} from "lucide-react";

const trustPoints = [
  {
    icon: <Landmark size={28} />,
    title: "RBI Registered NBFC",
    desc: "Fully compliant with Reserve Bank of India regulations",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "ISO 27001 Certified",
    desc: "Bank-grade data security & encryption standards",
  },
  {
    icon: <Award size={28} />,
    title: "10+ Years Experience",
    desc: "Trusted by thousands of customers across India",
  },
  {
    icon: <Users size={28} />,
    title: "50,000+ Happy Customers",
    desc: "Serving individuals & businesses nationwide",
  },
  {
    icon: <FileCheck size={28} />,
    title: "100% Transparent",
    desc: "No hidden charges, no surprises — ever",
  },
  {
    icon: <Star size={28} />,
    title: "Rated 4.5+/5",
    desc: "Highly rated on Google & financial review platforms",
  },
];

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Why Customers Trust Us</h2>
        <p className={styles.subheading}>
          We are a fully regulated and transparent financial institution
          committed to your financial well-being.
        </p>

        <div className={styles.grid}>
          {trustPoints.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
