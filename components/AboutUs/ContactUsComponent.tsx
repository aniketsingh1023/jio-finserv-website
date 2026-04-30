"use client";

import styles from "./ContactUsComponent.module.css";
import SendMessageComponent from "./SendMessageComponent";
import GetInTouchComponent from "./GetInTouchComponent";

export default function ContactUsComponent() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <SendMessageComponent />
        </div>

        <div className={styles.right}>
          <GetInTouchComponent />
        </div>
      </div>
    </section>
  );
}
