"use client";

import { useEffect, useState } from "react";
import styles from "./Step2LoanDetails.module.css";
import { useApplicationForm } from "./ApplicationFormProvider";

export default function Step2LoanDetails({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const { formData, setFormData, applicationId } = useApplicationForm();

  const data = formData.loanDetails;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * File Preview
   */

  useEffect(() => {
    if (data?.bankStatement instanceof File) {
      const url = URL.createObjectURL(data.bankStatement);

      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    if (data?.bankStatementPath) {
      setPreviewUrl(data.bankStatementPath);
    }
  }, [data?.bankStatement, data?.bankStatementPath]);

  /**
   * Validation
   */

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data?.loanType) newErrors.loanType = "Select loan type";

    if (!data?.loanAmount || Number(data.loanAmount) <= 0)
      newErrors.loanAmount = "Enter valid loan amount";

    if (!data?.companyName?.trim())
      newErrors.companyName = "Company name required";

    if (!data?.monthlyIncome || Number(data.monthlyIncome) <= 0)
      newErrors.monthlyIncome = "Enter valid income";

    if (!data?.primaryBank) newErrors.primaryBank = "Select primary bank";

    if (!data?.bankStatement && !data?.bankStatementPath)
      newErrors.bankStatement = "Bank statement required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle Input Change
   */

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      loanDetails: {
        ...prev.loanDetails,
        [field]: value,
      },
    }));
  };

  /**
   * File Upload
   */

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      loanDetails: {
        ...prev.loanDetails,
        bankStatement: file,
      },
    }));
  };

  /**
   * Continue
   */

  const handleNext = async () => {
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
          loanDetails: {
            ...data,
            bankStatement: undefined,
          },
        }),
      );

      if (data.bankStatement instanceof File) {
        form.append("bankStatement", data.bankStatement);
      }

      const res = await fetch("/api/save-application", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to save loan details");
        setLoading(false);
        return;
      }

      nextStep();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Step 2: Loan Details</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Loan Type</label>

          <select
            value={data?.loanType || ""}
            onChange={(e) => handleChange("loanType", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Business Loan">Business Loan</option>
          </select>

          {errors.loanType && <span>{errors.loanType}</span>}
        </div>

        <div className={styles.field}>
          <label>Loan Amount</label>

          <input
            type="number"
            value={data?.loanAmount || ""}
            onChange={(e) => handleChange("loanAmount", e.target.value)}
          />

          {errors.loanAmount && <span>{errors.loanAmount}</span>}
        </div>

        <div className={styles.field}>
          <label>Company Name</label>

          <input
            type="text"
            value={data?.companyName || ""}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />

          {errors.companyName && <span>{errors.companyName}</span>}
        </div>

        <div className={styles.field}>
          <label>Monthly Income</label>

          <input
            type="number"
            value={data?.monthlyIncome || ""}
            onChange={(e) => handleChange("monthlyIncome", e.target.value)}
          />

          {errors.monthlyIncome && <span>{errors.monthlyIncome}</span>}
        </div>

        <div className={styles.field}>
          <label>Existing EMI</label>

          <input
            type="number"
            value={data?.existingEmi || ""}
            onChange={(e) => handleChange("existingEmi", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Primary Bank</label>

          <input
            type="text"
            value={data?.primaryBank || ""}
            onChange={(e) => handleChange("primaryBank", e.target.value)}
          />

          {errors.primaryBank && <span>{errors.primaryBank}</span>}
        </div>

        <div className={styles.field}>
          <label>CIBIL Score</label>

          <input
            type="number"
            value={data?.cibilScore || ""}
            onChange={(e) => handleChange("cibilScore", e.target.value)}
          />
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label>Bank Statement (PDF)</label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />

          {errors.bankStatement && <span>{errors.bankStatement}</span>}

          {previewUrl && (
            <a href={previewUrl} target="_blank">
              View Uploaded Statement
            </a>
          )}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.backBtn} onClick={prevStep}>
          Back
        </button>

        <button onClick={handleNext} disabled={loading}>
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
