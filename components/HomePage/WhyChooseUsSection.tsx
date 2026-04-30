"use client";

import styles from "./WhyChooseUsSection.module.css";
import { Clock, Percent, Shield, Users } from "lucide-react";

const features = [
  {
    icon: <Clock size={28} />,
    title: "Quick Approval",
    description:
      "Get your loan approved within 24 hours with minimal documentation.",
  },
  {
    icon: <Percent size={28} />,
    title: "Competitive Rates",
    description:
      "Enjoy interest rates starting from 8.50% p.a. with flexible repayment options.",
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Process",
    description:
      "Your data is protected with bank-grade security and encryption.",
  },
  {
    icon: <Users size={28} />,
    title: "Expert Support",
    description:
      "Our dedicated team is available 24/7 to assist you with your queries.",
  },
];

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Why Choose Us</h2>
        <p className={styles.subheading}>
          We provide fast approvals, competitive rates, secure processing, and
          dedicated support to make your loan journey simple and stress-free.
        </p>
      </div>
      <div className={styles.container}>
        {features.map((feature, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
