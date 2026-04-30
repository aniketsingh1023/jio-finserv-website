"use client";

import { useEffect, useState } from "react";
import styles from "./Step3KYCDetails.module.css";
import { useApplicationForm } from "./ApplicationFormProvider";

export default function Step3KYCDetails({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const { formData, setFormData, applicationId } = useApplicationForm();

  const data = formData.kycDetails;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previews, setPreviews] = useState<Record<string, string | null>>({
    aadharFront: null,
    aadharBack: null,
    panFile: null,
  });

  /**
   * Preview files
   */

  useEffect(() => {
    const updatePreview = (
      file: File | null,
      path: string | undefined,
      key: string,
    ) => {
      if (file instanceof File) {
        const url = URL.createObjectURL(file);

        setPreviews((prev) => ({ ...prev, [key]: url }));

        return () => URL.revokeObjectURL(url);
      }

      if (path) {
        setPreviews((prev) => ({ ...prev, [key]: path }));
      }
    };

    updatePreview(data?.aadharFront, data?.aadharFrontPath, "aadharFront");
    updatePreview(data?.aadharBack, data?.aadharBackPath, "aadharBack");
    updatePreview(data?.panFile, data?.panFilePath, "panFile");
  }, [
    data?.aadharFront,
    data?.aadharBack,
    data?.panFile,
    data?.aadharFrontPath,
    data?.aadharBackPath,
    data?.panFilePath,
  ]);

  /**
   * Validation
   */

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!/^[0-9]{12}$/.test(data?.aadharNo || ""))
      newErrors.aadharNo = "Enter valid 12 digit Aadhaar number";

    if (!data?.aadharFront && !data?.aadharFrontPath)
      newErrors.aadharFront = "Upload Aadhaar front side";

    if (!data?.aadharBack && !data?.aadharBackPath)
      newErrors.aadharBack = "Upload Aadhaar back side";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data?.panNo || ""))
      newErrors.panNo = "Enter valid PAN (ABCDE1234F)";

    if (!data?.panFile && !data?.panFilePath)
      newErrors.panFile = "Upload PAN card";

    if (!data?.nomineeName?.trim())
      newErrors.nomineeName = "Nominee name required";

    if (!data?.nomineeRelation?.trim())
      newErrors.nomineeRelation = "Relation required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle Input
   */

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      kycDetails: {
        ...prev.kycDetails,
        [field]: value,
      },
    }));
  };

  /**
   * Handle File
   */

  const handleFileChange = (field: string, file: File | null) => {
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Only JPG, PNG or PDF allowed",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Max file size 5MB",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      kycDetails: {
        ...prev.kycDetails,
        [field]: file,
      },
    }));

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  /**
   * Continue
   */

  const handleNext = async () => {
    if (!validate()) return;

    if (!applicationId) {
      alert("Application not initialized");
      return;
    }

    try {
      const form = new FormData();

      form.append(
        "data",
        JSON.stringify({
          applicationId,
          kycDetails: {
            ...data,
            aadharFront: undefined,
            aadharBack: undefined,
            panFile: undefined,
          },
        }),
      );

      if (data.aadharFront instanceof File)
        form.append("aadharFront", data.aadharFront);

      if (data.aadharBack instanceof File)
        form.append("aadharBack", data.aadharBack);

      if (data.panFile instanceof File) form.append("panFile", data.panFile);

      const res = await fetch("/api/save-application", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to save KYC");
        return;
      }

      nextStep();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Step 3: KYC Details</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Aadhaar Number</label>

          <input
            maxLength={12}
            value={data?.aadharNo || ""}
            onChange={(e) =>
              handleChange("aadharNo", e.target.value.replace(/\D/g, ""))
            }
          />

          {errors.aadharNo && <span>{errors.aadharNo}</span>}
        </div>

        <div className={styles.field}>
          <label>PAN Number</label>

          <input
            maxLength={10}
            value={data?.panNo || ""}
            onChange={(e) =>
              handleChange("panNo", e.target.value.toUpperCase())
            }
          />

          {errors.panNo && <span>{errors.panNo}</span>}
        </div>

        {["aadharFront", "aadharBack", "panFile"].map((field) => (
          <div key={field} className={`${styles.field} ${styles.full}`}>
            <label>
              {field === "panFile"
                ? "PAN Card"
                : field === "aadharFront"
                  ? "Aadhaar Front"
                  : "Aadhaar Back"}
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                handleFileChange(field, e.target.files?.[0] || null)
              }
            />

            {errors[field] && <span>{errors[field]}</span>}

            {previews[field] && (
              <div className={styles.preview}>
                {previews[field]?.endsWith(".pdf") ? (
                  <iframe src={previews[field]!} />
                ) : (
                  <img src={previews[field]!} />
                )}
              </div>
            )}
          </div>
        ))}

        <div className={styles.field}>
          <label>Nominee Name</label>

          <input
            value={data?.nomineeName || ""}
            onChange={(e) => handleChange("nomineeName", e.target.value)}
          />

          {errors.nomineeName && <span>{errors.nomineeName}</span>}
        </div>

        <div className={styles.field}>
          <label>Relation with Nominee</label>

          <input
            value={data?.nomineeRelation || ""}
            onChange={(e) => handleChange("nomineeRelation", e.target.value)}
          />

          {errors.nomineeRelation && <span>{errors.nomineeRelation}</span>}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.backBtn} onClick={prevStep}>
          Back
        </button>

        <button onClick={handleNext}>Continue</button>
      </div>
    </div>
  );
}
