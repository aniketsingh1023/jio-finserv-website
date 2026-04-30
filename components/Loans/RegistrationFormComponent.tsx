"use client";

import styles from "./RegistrationFormComponent.module.css";
import { useState } from "react";

export default function RegistrationFormComponent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanType: "Business Loan",
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Apply for a Loan</h3>
      <p className={styles.subtitle}>
        Fill out the form and our team will contact you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Full Name *
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email Address *
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number *
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Loan Type *
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
          >
            <option>Business Loan</option>
            <option>Personal Loan</option>
            <option>Home Loan</option>
          </select>
        </label>

        <label>
          Loan Amount (₹) *
          <input
            type="number"
            name="amount"
            placeholder="Enter desired loan amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Submit Application
        </button>
      </form>
    </div>
  );
}
