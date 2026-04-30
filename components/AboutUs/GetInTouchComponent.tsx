"use client";

import styles from "./GetInTouchComponent.module.css";
import { MapPin, Mail, Clock } from "lucide-react";

export default function GetInTouchComponent() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Get in Touch</h2>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <MapPin size={22} />
          </div>
          <div>
            <h3>Our Office</h3>
            <p>
              1st Floor, R-Tech IT Park, Nirlon Compound,
              <br />
              Off Western Express Highway,
              <br />
              Goregaon (East), Mumbai 400 063, India
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Mail size={22} />
          </div>
          <div>
            <h3>Email</h3>
            <p>fincareliance@gmail.com</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Clock size={22} />
          </div>
          <div>
            <h3>Working Hours</h3>
            <p>
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 9:00 AM - 1:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
