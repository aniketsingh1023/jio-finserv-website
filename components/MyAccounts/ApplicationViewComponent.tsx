"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ApplicationViewComponent.module.css";

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

function DocumentPreview({ label, path }: { label: string; path?: string }) {
  if (!path) {
    return (
      <div className={styles.fileSection}>
        <label>{label}</label>
        <p className={styles.fileNotUploaded}>Not Uploaded</p>
      </div>
    );
  }

  const isPdf = path.toLowerCase().endsWith(".pdf");

  return (
    <div className={styles.fileSection}>
      <label>{label}</label>

      <div className={styles.previewBox}>
        {isPdf ? (
          <iframe src={path} className={styles.previewFrame} />
        ) : (
          <img src={path} className={styles.previewImage} />
        )}

        <a
          href={path}
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

export default function ApplicationViewComponent() {
  const params = useSearchParams();
  const appId = params.get("appId");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!appId) return;

    async function loadApplication() {
      try {
        const res = await fetch(`/api/get-application?appId=${appId}`);
        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        setData(data.application);
      } catch (err) {
        console.error("Failed to load application", err);
      }
    }

    loadApplication();
  }, [appId]);

  if (!data) return <div className={styles.loading}>Loading...</div>;

  const { personalInfo, loanDetails, kycDetails, payment } = data;

  /* ---------- Mask helpers ---------- */

  const maskAadhaar = (value: string) =>
    value ? `XXXX-XXXX-${value.slice(-4)}` : "";

  const maskMobile = (value: string) =>
    value ? `XXXXXX${value.slice(-4)}` : "";

  const maskPan = (value: string) =>
    value ? `${value.slice(0, 2)}XXXXX${value.slice(-3)}` : "";

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Application Details</h2>

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

        <DocumentPreview
          label="Profile Picture"
          path={personalInfo.profilePic}
        />
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
          path={kycDetails.aadharFrontPath}
        />

        <DocumentPreview
          label="Aadhaar Back"
          path={kycDetails.aadharBackPath}
        />

        <DocumentPreview label="PAN Card" path={kycDetails.panFilePath} />
      </ReviewSection>

      {/* -------- Payment Details -------- */}

      <ReviewSection title="Payment Details">
        <ReviewRow label="ECS Method" value={payment.ecsMethod} />
        <ReviewRow label="Status" value="Success" />
      </ReviewSection>
    </div>
  );
}
