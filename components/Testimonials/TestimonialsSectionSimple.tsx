import styles from "./TestimonialsSectionSimple.module.css";
import testimonialsData from "@/data/testimonials.json";
import { Testimonial, LoanType } from "@/types/testimonial";

interface Props {
  loanType?: LoanType; // optional filter
}

const getRandomTestimonials = (
  data: Testimonial[],
  count: number,
): Testimonial[] => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Testimonials = ({ loanType }: Props) => {
  let filtered: Testimonial[] = testimonialsData as Testimonial[];

  // Apply filter only if loanType passed
  if (loanType) {
    filtered = filtered.filter((t) => t.loanType === loanType);
  }

  // Take 10 max per LoanType (logical restriction)
  const limited = filtered.slice(0, 10);

  // Pick random 4
  const randomTestimonials = getRandomTestimonials(limited, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>What Our Customers Say</h2>
          <p className={styles.subheading}>
            Trusted by thousands across India.
          </p>
        </div>

        <div className={styles.grid}>
          {randomTestimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* Display rating as stars */}
              <div className={styles.stars}>
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>
              {/* Display testimonial text */}
              <p className={styles.text}>"{item.description}"</p>
              <hr className={styles.divider} />
              {/* Display user info */}
              <div>
                <h4 className={styles.name}>{item.name}</h4>
                <p className={styles.role}>{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
