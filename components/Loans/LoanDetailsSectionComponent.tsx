"use client";

import styles from "./LoanDetailsSectionComponent.module.css";
import RegistrationFormComponent from "@/components/Loans/RegistrationFormComponent";
import ApplicationFormComponent from "@/components/Loans/ApplicationFormComponent";

interface BenefitsItem {
  title: string;
  body: string;
}

interface Props {
  keyFeatures: string[];
  isLoggedIn: boolean;
  benefits: BenefitsItem[];
}

export default function LoanDetailsSectionComponent({
  keyFeatures = [],
  isLoggedIn,
  benefits = [],
}: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.leftSection}>
          <h2 className={styles.heading}>Key Features</h2>
          <ul className={styles.featureList}>
            {keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h2 className={styles.heading}>Benefits</h2>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <h4>{benefit.title}</h4>
                <p>{benefit.body}</p>
              </div>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.emiBtn}>Calculate EMI</button>
            <button className={styles.contactBtn}>Contact Us →</button>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className={styles.rightSection}>
          {isLoggedIn ? (
            <ApplicationFormComponent />
          ) : (
            <RegistrationFormComponent />
          )}
        </div>
      </div>
    </section>
  );
}
