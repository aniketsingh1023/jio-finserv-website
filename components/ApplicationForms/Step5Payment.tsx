"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Step5Payment.module.css";
import { useApplicationForm } from "./ApplicationFormProvider";

export default function Step5Payment({
  prevStep,
  readOnly,
}: {
  prevStep: () => void;
  readOnly?: boolean;
}) {
  const router = useRouter();

  const { formData, setFormData, applicationId } = useApplicationForm();
  const data = formData.payment;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState<string>("");

  /* ---------------- Card Type Detection ---------------- */

  const detectCardType = (number: string) => {
    const n = number.replace(/\s/g, "");

    if (/^4/.test(n)) return "Visa";
    if (/^5[1-5]/.test(n)) return "MasterCard";
    if (/^3[47]/.test(n)) return "Amex";
    if (/^6/.test(n)) return "RuPay";

    return "";
  };

  /* ---------------- Validation ---------------- */
  const validateExpiry = (expiry: string) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

    const [mm, yy] = expiry.split("/").map(Number);

    if (mm < 1 || mm > 12) return false;

    const current = new Date();
    const currentYear = current.getFullYear() % 100;
    const currentMonth = current.getMonth() + 1;

    if (yy < currentYear) return false;
    if (yy === currentYear && mm < currentMonth) return false;

    return true;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data?.ecsMethod) newErrors.ecsMethod = "Select ECS method";

    const cleanCard = data?.cardNo?.replace(/\s/g, "") || "";

    if (!/^[0-9]{16}$/.test(cleanCard))
      newErrors.cardNo = "Enter valid 16 digit card number";

    if (!validateExpiry(data?.expiry || "")) {
      newErrors.expiry = "Enter valid future expiry (MM/YY)";
    }

    if (!/^[0-9]{3,4}$/.test(data?.cvv || ""))
      newErrors.cvv = "Enter valid CVV";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- Card Number Format ---------------- */

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  /* ---------------- Handle Input ---------------- */

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value,
      },
    }));
  };

  const handleCardChange = (value: string) => {
    const formatted = formatCardNumber(value);

    const detected = detectCardType(formatted);
    setCardType(detected);

    handleChange("cardNo", formatted);
  };

  const handleCvvChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    handleChange("cvv", clean);
  };

  const handleExpiryChange = (value: string) => {
    let clean = value.replace(/\D/g, "").slice(0, 4);

    if (clean.length >= 3) {
      clean = clean.slice(0, 2) + "/" + clean.slice(2);
    }

    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        expiry: clean,
      },
    }));
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async () => {
    if (readOnly) return;
    if (!validate()) return;

    if (!applicationId) {
      alert("Application not initialized.");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      form.append(
        "data",
        JSON.stringify({
          applicationId,
          payment: data,
          status: "submitted",
        }),
      );

      const res = await fetch("/api/save-application", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Submission failed");
        setLoading(false);
        return;
      }

      router.push("/my-account");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  /* ---------------- Readonly Mode ---------------- */

  if (readOnly) {
    return (
      <div className={styles.successBox}>
        <h2>Application Already Submitted ✅</h2>
        <p>This application cannot be modified.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Step 5: Payment</h2>

      <div className={styles.grid}>
        {/* ECS Method */}

        <div className={styles.field}>
          <label>ECS Method</label>

          <select
            value={data?.ecsMethod || ""}
            onChange={(e) => handleChange("ecsMethod", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
          </select>

          {errors.ecsMethod && <span>{errors.ecsMethod}</span>}
        </div>

        {/* Card Number */}

        <div className={styles.field}>
          <label>Card Number</label>

          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={data?.cardNo || ""}
            onChange={(e) => handleCardChange(e.target.value)}
            maxLength={19}
          />

          {cardType && (
            <small className={styles.cardType}>Detected Card: {cardType}</small>
          )}

          {errors.cardNo && <span>{errors.cardNo}</span>}
        </div>

        {/* Expiry */}

        <div className={styles.field}>
          <label>Expiry Date</label>

          <input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={data?.expiry || ""}
            onChange={(e) => handleExpiryChange(e.target.value)}
          />

          {errors.expiry && <span>{errors.expiry}</span>}
        </div>

        {/* CVV */}

        <div className={styles.field}>
          <label>CVV</label>

          <input
            type="password"
            placeholder="***"
            maxLength={4}
            value={data?.cvv || ""}
            onChange={(e) => handleCvvChange(e.target.value)}
          />

          {errors.cvv && <span>{errors.cvv}</span>}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.backBtn} onClick={prevStep}>
          Back
        </button>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
