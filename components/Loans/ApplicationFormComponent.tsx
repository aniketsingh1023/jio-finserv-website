"use client";

import styles from "./ApplicationFormComponent.module.css";
import { useState } from "react";

export default function ApplicationFormComponent() {
  const [formData, setFormData] = useState({
    amount: "",
    tenure: "",
    purpose: "",
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
      <h3 className={styles.title}>Complete Your Loan Application</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Loan Amount (₹) *
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tenure (Months) *
          <select
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            required
          >
            <option value="">Select Tenure</option>
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
            <option value="36">36 Months</option>
            <option value="60">60 Months</option>
          </select>
        </label>

        <label>
          Loan Purpose *
          <input
            type="text"
            name="purpose"
            placeholder="Enter purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Proceed
        </button>
      </form>
    </div>
  );
}
