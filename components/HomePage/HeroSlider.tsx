"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import styles from "./HeroSection.module.css";
import ApplyButton from "@/components/Buttons/ApplyButton";

const slides = [
  {
    image: "/images/hero-slider-1.png",
    // image: "https://www.jfs.in/docs/cms/assets/jfs/home/hero-banner2-desk.webp",
    title: "Your Trusted ",
    highlight: "Partner for Financial Growth",
    description:
      "Get instant loans with interest rates starting from 8.50% p.a., minimal documentation, and quick approval. We're here to make your financial dreams come true.",
  },

  // {
  //   image: "https://www.jfs.in/docs/cms/assets/jfs/home/hero-banner3-desk.webp",
  //   title: "Your Trusted ",
  //   highlight: "Partner for Financial Growth",
  //   description:
  //     "Get instant loans with interest rates starting from 8.50% p.a., minimal documentation, and quick approval. We're here to make your financial dreams come true.",
  // },
  // {
  //   image: "https://www.jfs.in/docs/cms/assets/jfs/home/hero-banner4-desk.webp",
  //   title: "Your Trusted ",
  //   highlight: "Partner for Financial Growth",
  //   description:
  //     "Get instant loans with interest rates starting from 8.50% p.a., minimal documentation, and quick approval. We're here to make your financial dreams come true.",
  // },
];

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className={styles.swiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.hero}>
              {/* Animated Background */}
              <div
                className={styles.background}
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              <div className={styles.overlay}></div>

              <div className={styles.content}>
                <h1 className={styles.heading}>
                  {slide.title} <span>{slide.highlight}</span>
                </h1>
                <span>{slide.description}</span>
                <br />
                <br />

                <div className={styles.buttons}>
                  <ApplyButton text="Apply Now" />
                  <ApplyButton text="Calculate EMI" href="/emi-calculator" variant="dark" />
                     <a
                       href="/apk/finserve-app.apk"
                       download
                       style={{
                         display: "inline-flex",
                         alignItems: "center",
                         gap: 8,
                         background: "linear-gradient(90deg, #d4a65a 0%, #b8842f 100%)",
                         color: "#0b1a33",
                         fontWeight: 600,
                         borderRadius: 8,
                         padding: "8px 18px",
                         fontSize: 16,
                         textDecoration: "none",
                         boxShadow: "0 2px 8px rgba(212, 166, 90, 0.15)",
                         transition: "background 0.3s, color 0.3s"
                       }}
                     >
                       {/* @ts-ignore */}
                       <PlayStoreIcon size={28} />
                       <span>Download the App Now</span>
                     </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
import { PlayStoreIcon } from "../PlayStoreIcon";
