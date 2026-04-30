"use client";

import { useEffect, useState } from "react";
import styles from "./TestimonialsSection.module.css";
import testimonialsData from "@/data/testimonials.json";
import { Testimonial, LoanType } from "@/types/testimonial";

interface Props {
  loanType?: LoanType;
}

const getRandomTestimonials = (
  data: Testimonial[],
  count: number,
): Testimonial[] => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Testimonials = ({ loanType }: Props) => {
  const [randomTestimonials, setRandomTestimonials] = useState<Testimonial[]>(
    [],
  );
  const [filtered, setFiltered] = useState<Testimonial[]>([]);

  useEffect(() => {
    let data: Testimonial[] = testimonialsData as Testimonial[];

    if (loanType) {
      data = data.filter((t) => t.loanType === loanType);
    }

    // const limited = data.slice(0, 10);

    setFiltered(data);
    setRandomTestimonials(getRandomTestimonials(data, 5));
  }, [loanType]);

  const avgRating =
    filtered.length > 0
      ? (
          filtered.reduce((acc, cur) => acc + cur.rating, 0) / filtered.length
        ).toFixed(1)
      : "4.8";

  const totalReviews = filtered.length || 1200;

  if (randomTestimonials.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>What Our Customers Say</h2>
          <p className={styles.subheading}>
            Thousands of satisfied customers trust us with their financial
            needs. Here's what they have to say.
          </p>
        </div>

        <div className={styles.summary}>
          <span className={styles.avg}>{avgRating}</span>
          <span className={styles.outOf}> / 5</span>
          {/* <span className={styles.total}> from {totalReviews}K+ reviews</span> */}
          <span className={styles.total}> from 50K+ reviews</span>
        </div>

        <div className={styles.autoScrollWrapper}>
          <div className={styles.autoScroll}>
            {randomTestimonials
              .concat(randomTestimonials)
              .map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.star} ${
                          i < item.rating ? styles.filled : styles.empty
                        }`}
                        style={{ animationDelay: `${i * 0.3}s` }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className={styles.text}>"{item.description}"</p>

                  <hr className={styles.divider} />

                  <div>
                    <h4 className={styles.name}>{item.name}</h4>
                    <p className={styles.role}>
                      {item.role} • {item.location}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
