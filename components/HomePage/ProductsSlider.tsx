"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import ApplyButton from "@/components/Buttons/ApplyButton";
import styles from "./ProductsSlider.module.css";
import {
  User2Icon,
  Building,
  Wallet,
  Shield,
  Home,
  BriefcaseBusiness,
} from "lucide-react";

const services = [
  {
    icon: <User2Icon size={50} />,
    title: "Personal Loan",
    description:
      "Quick personal loans for all your needs with minimal documentation.",
  },
  {
    icon: <Home size={50} />,
    title: "Home Loan",
    description:
      "Make your dream home a reality with our affordable home loans.",
  },
  {
    icon: <BriefcaseBusiness size={50} />,
    title: "Business Loan",
    description: "Fuel your business growth with our flexible business loans.",
  },
  {
    icon: <Shield size={50} />,
    title: "Education Loan",
    description:
      "Invest in your future with our education financing solutions.",
  },
  {
    icon: <Building size={50} />,
    title: "Loan Against Property",
    description: "Unlock the value of your property with our LAP loans.",
  },
  {
    icon: <Wallet size={50} />,
    title: "Loan Against Credit Card",
    description: "Unlock the value of your credit cards with our LACC loans.",
  },
];

export default function ServiceSlider() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Loan Products</h2>
        <p className={styles.subheading}>
          Choose from our wide range of loan products designed to meet your
          specific financial needs.
        </p>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        centeredSlides={false}
        breakpoints={{
          1400: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          0: {
            slidesPerView: 1.2,
            spaceBetween: 15,
            centeredSlides: true,
          },
        }}
        className={styles.swiper}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <a className={styles.exploreBtn}>
                Explore
                <span className={styles.arrow}>→</span>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
