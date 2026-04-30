"use client";

import { useState } from "react";
import styles from "./Step4Review.module.css";
import { useApplicationForm } from "./ApplicationFormProvider";

interface Props {
  readOnly?: boolean;
  nextStep: () => void;
  prevStep: () => void;
}

/* ---------------- Reusable Components ---------------- */

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.section}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: any }) {
  return (
    <div className={styles.row}>
      <span>{label}</span>
      <p>{value || "-"}</p>
    </div>
  );
}

function DocumentPreview({
  label,
  file,
  path,
}: {
  label: string;
  file: File | null;
  path?: string;
}) {
  const url = file instanceof File ? URL.createObjectURL(file) : path;

  if (!url) {
    return (
      <div className={styles.fileSection}>
        <label>{label}</label>
        <p>Not Uploaded</p>
      </div>
    );
  }

  const isPdf = url.toLowerCase().endsWith(".pdf");

  return (
    <div className={styles.fileSection}>
      <label>{label}</label>

      <div className={styles.previewBox}>
        {isPdf ? (
          <iframe src={url} className={styles.previewFrame} />
        ) : (
          <img src={url} className={styles.previewImage} />
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewBtn}
        >
          View Full
        </a>
      </div>
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function Step4Review({ readOnly, nextStep, prevStep }: Props) {
  const { formData } = useApplicationForm();

  const { personalInfo, loanDetails, kycDetails } = formData;

  const [confirmed, setConfirmed] = useState(false);

  /* ---------- Mask helpers ---------- */

  const maskAadhaar = (value: string) =>
    value ? `XXXX-XXXX-${value.slice(-4)}` : "";

  const maskMobile = (value: string) =>
    value ? `XXXXXX${value.slice(-4)}` : "";

  const maskPan = (value: string) =>
    value ? `${value.slice(0, 2)}XXXXX${value.slice(-3)}` : "";

  const handleContinue = () => {
    if (readOnly) return;
    if (confirmed) nextStep();
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Step 4: Review & Confirm</h2>

      {/* -------- Personal Info -------- */}

      <ReviewSection title="Personal Information">
        <ReviewRow label="Name" value={personalInfo.name} />
        <ReviewRow label="Mobile" value={maskMobile(personalInfo.mobile)} />
        <ReviewRow label="Email" value={personalInfo.email} />
        <ReviewRow label="Gender" value={personalInfo.gender} />
        <ReviewRow label="Date of Birth" value={personalInfo.dob} />
        <ReviewRow label="Address" value={personalInfo.address} />
        <ReviewRow label="City" value={personalInfo.city} />
        <ReviewRow label="Pincode" value={personalInfo.pincode} />

        {personalInfo.profilePic && (
          <DocumentPreview
            label="Profile Picture"
            file={null}
            path={personalInfo.profilePic}
          />
        )}
      </ReviewSection>

      {/* -------- Loan Details -------- */}

      <ReviewSection title="Loan Details">
        <ReviewRow label="Loan Type" value={loanDetails.loanType} />
        <ReviewRow label="Loan Amount" value={`₹ ${loanDetails.loanAmount}`} />
        <ReviewRow label="Company Name" value={loanDetails.companyName} />
        <ReviewRow
          label="Monthly Income"
          value={`₹ ${loanDetails.monthlyIncome}`}
        />
        <ReviewRow
          label="Existing EMI"
          value={`₹ ${loanDetails.existingEmi}`}
        />
        <ReviewRow label="Primary Bank" value={loanDetails.primaryBank} />
        <ReviewRow label="CIBIL Score" value={loanDetails.cibilScore} />

        <DocumentPreview
          label="Bank Statement"
          file={loanDetails.bankStatement}
          path={loanDetails.bankStatementPath}
        />
      </ReviewSection>

      {/* -------- KYC -------- */}

      <ReviewSection title="KYC Details">
        <ReviewRow
          label="Aadhaar Number"
          value={maskAadhaar(kycDetails.aadharNo)}
        />
        <ReviewRow label="PAN Number" value={maskPan(kycDetails.panNo)} />

        <ReviewRow
          label="Nominee"
          value={`${kycDetails.nomineeName} (${kycDetails.nomineeRelation})`}
        />

        <DocumentPreview
          label="Aadhaar Front"
          file={kycDetails.aadharFront}
          path={kycDetails.aadharFrontPath}
        />

        <DocumentPreview
          label="Aadhaar Back"
          file={kycDetails.aadharBack}
          path={kycDetails.aadharBackPath}
        />

        <DocumentPreview
          label="PAN Card"
          file={kycDetails.panFile}
          path={kycDetails.panFilePath}
        />
      </ReviewSection>

      {/* -------- Confirmation -------- */}

      {!readOnly && (
        <div className={styles.confirmBox}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />

          <label>
            I confirm that all the above information provided is correct.
          </label>
        </div>
      )}

      <div className={styles.buttonWrapper}>
        <button className={styles.backBtn} onClick={prevStep}>
          Back
        </button>

        {!readOnly && (
          <button
            disabled={!confirmed}
            className={!confirmed ? styles.disabled : ""}
            onClick={handleContinue}
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}
