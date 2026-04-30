"use client";

import Link from "next/link";
import styles from "./ApplyButton.module.css";

interface ApplyButtonProps {
  text?: string;
  href?: string;
  variant?: "primary" | "dark";
}

export default function ApplyButton({
  text = "Apply Now",
  href = "apply",
  variant = "primary",
}: ApplyButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${
        variant === "dark" ? styles.dark : styles.primary
      }`}
    >
      {text}
    </Link>
  );
}
