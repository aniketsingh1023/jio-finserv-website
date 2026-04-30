"use client";

import { useState } from "react";
import styles from "./FAQSection.module.css";
import { ChevronDown } from "lucide-react";
import faqs from "@/data/faqs.json"; // 👈 Import JSON

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to the most common questions about our loan products
            and services.
          </p>
        </div>

        <div className={styles.faqList}>
          {(faqs as FAQ[]).map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button className={styles.question} onClick={() => toggle(index)}>
                <span>{faq.question}</span>
                <ChevronDown
                  className={`${styles.icon} ${
                    openIndex === index ? styles.rotate : ""
                  }`}
                />
              </button>

              <div
                className={`${styles.answer} ${
                  openIndex === index ? styles.open : ""
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
