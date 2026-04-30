"use client";

import styles from "./SubPageCardComponent.module.css";
import Link from "next/link";
import ApplyButton from "@/components/Buttons/ApplyButton";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  subTitle?: string; // optional subtitle
  description: string;
  buttonText: string;
  backgroundImage?: string; // optional now
  breadcrumbs: BreadcrumbItem[];
}

export default function SubPageComponent({
  title,
  subTitle,
  description,
  buttonText,
  backgroundImage,
  breadcrumbs,
}: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          {breadcrumbs.map((item, index) => (
            <span key={index} className={styles.breadcrumbItem}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className={styles.active}>{item.label}</span>
              )}
              {index !== breadcrumbs.length - 1 && <span>›</span>}
            </span>
          ))}
        </div>

        {/* Hero Section */}
        <div
          className={styles.heroBox}
          style={{
            backgroundImage: backgroundImage
              ? `
        linear-gradient(
          90deg,
          rgba(58,31,14,0.85) 0%,
          rgba(168,112,32,0.75) 50%,
          rgba(228,176,70,0.7) 100%
        ),
        url(${backgroundImage})
      `
              : `
        linear-gradient(
          90deg,
          #3a1f0e 0%,
          #a87020 50%,
          #e4b046 100%
        )
      `,
          }}
        >
          <div className={styles.content}>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <p>{description}</p>
            <ApplyButton />
          </div>
        </div>
      </div>
    </section>
  );
}
