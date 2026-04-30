"use client";

import { useState } from "react";
import styles from "./ProfileUpdateComponent.module.css";
import { UserRegistrationDto } from "@/types/userRegistration";

interface Props {
  user: UserRegistrationDto;
}

interface FieldProps {
  label: string;
  value?: string;
  editMode: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

interface TextareaProps extends FieldProps {
  full?: boolean;
}

/* ===============================
VALIDATION HELPERS
================================ */

const validateMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile);

const validatePincode = (pincode: string) => /^[1-9][0-9]{5}$/.test(pincode);

const validateAge = (dob: string) => {
  if (!dob) return false;

  const birth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

  return age >= 18;
};

export default function ProfileUpdateComponent({ user }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user.profilePic || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: String(user.mobile || ""),
    gender: user.gender || "",
    dob: user.dob || "",
    address: user.address || "",
    city: user.city || "",
    pincode: String(user.pincode || ""),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ===============================
     FIELD VALIDATION
  ================================ */

  const validateField = (field: string) => {
    let message = "";

    if (field === "mobile") {
      if (!validateMobile(formData.mobile))
        message = "Enter valid 10 digit mobile number";
    }

    if (field === "pincode") {
      if (!validatePincode(formData.pincode))
        message = "Enter valid 6 digit pincode";
    }

    if (field === "dob") {
      if (!validateAge(formData.dob))
        message = "User must be at least 18 years old";
    }

    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));

    return message === "";
  };

  const validateAll = () => {
    const fields = ["mobile", "pincode", "dob"];
    let valid = true;

    fields.forEach((f) => {
      if (!validateField(f)) valid = false;
    });

    return valid;
  };

  /* ===============================
     IMAGE UPLOAD
  ================================ */

  const handleFile = async (selected: File) => {
    if (!selected.type.startsWith("image/")) return;

    if (selected.size > 2 * 1024 * 1024) return;

    const previewUrl = URL.createObjectURL(selected);
    setPreview(previewUrl);

    const form = new FormData();
    form.append("file", selected);

    const res = await fetch("/api/profile-image", {
      method: "POST",
      body: form,
    });

    const result = await res.json();

    if (result.success) {
      setPreview(result.profilePic + "?t=" + new Date().getTime());
    }
  };

  /* ===============================
     UPDATE PROFILE
  ================================ */

  const handleUpdate = async () => {
    if (!validateAll()) return;

    setLoading(true);

    const payload = {
      name: formData.name,
      mobile: Number(formData.mobile),
      gender: formData.gender,
      dob: formData.dob,
      address: formData.address,
      city: formData.city,
      pincode: Number(formData.pincode),
    };

    const res = await fetch("/api/profile-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    await res.json();

    setEditMode(false);
    setLoading(false);
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.avatarBox}>
          {preview ? (
            <img src={preview} alt="profile" />
          ) : (
            <span>{formData.name?.charAt(0)?.toUpperCase() || "U"}</span>
          )}

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
          )}
        </div>

        <div className={styles.userInfo}>
          <h2>{formData.name}</h2>
          <p>{formData.email}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Account Information</h3>

        <div className={styles.grid}>
          <Field
            label="Name"
            value={formData.name}
            editMode={editMode}
            onChange={(v) => handleChange("name", v)}
          />

          <Field
            label="Mobile"
            value={formData.mobile}
            editMode={editMode}
            error={errors.mobile}
            onBlur={() => validateField("mobile")}
            onChange={(v) => {
              if (/^\d*$/.test(v) && v.length <= 10) handleChange("mobile", v);
            }}
          />

          <SelectField
            label="Gender"
            value={formData.gender}
            editMode={editMode}
            onChange={(v) => handleChange("gender", v)}
          />

          <DateField
            label="Date of Birth"
            value={formData.dob}
            editMode={editMode}
            maxDate={maxDate}
            error={errors.dob}
            onBlur={() => validateField("dob")}
            onChange={(v) => handleChange("dob", v)}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3>Address Information</h3>

        <div className={styles.grid}>
          <TextareaField
            label="Address"
            value={formData.address}
            editMode={editMode}
            onChange={(v) => handleChange("address", v)}
            full
          />

          <Field
            label="City"
            value={formData.city}
            editMode={editMode}
            onChange={(v) => handleChange("city", v)}
          />

          <Field
            label="Pincode"
            value={formData.pincode}
            editMode={editMode}
            error={errors.pincode}
            onBlur={() => validateField("pincode")}
            onChange={(v) => {
              if (/^\d*$/.test(v) && v.length <= 6) handleChange("pincode", v);
            }}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        {!editMode ? (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        ) : (
          <>
            <button onClick={handleUpdate} disabled={loading}>
              {loading ? <span className={styles.spinner}></span> : "Update"}
            </button>

            <button
              className={styles.cancel}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* VALIDATION SUMMARY */}

      {Object.values(errors).some((e) => e) && (
        <div className={styles.errorSummary}>
          <strong>Please fix the following:</strong>
          <ul>
            {Object.entries(errors).map(([k, v]) => v && <li key={k}>{v}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ===============================
UI COMPONENTS
================================ */

function Field({
  label,
  value,
  editMode,
  error,
  onChange,
  onBlur,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label>{label}</label>

      {editMode ? (
        <>
          <input
            className={error ? styles.errorInput : ""}
            value={value || ""}
            placeholder={`Enter ${label}`}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />
          {error && <span className={styles.errorText}>{error}</span>}
        </>
      ) : (
        <div className={styles.review}>{value || "-"}</div>
      )}
    </div>
  );
}

function SelectField({ label, value, editMode, onChange }: FieldProps) {
  return (
    <div className={styles.field}>
      <label>{label}</label>

      {editMode ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      ) : (
        <div className={styles.review}>{value || "-"}</div>
      )}
    </div>
  );
}

interface DateFieldProps extends FieldProps {
  error?: string;
  maxDate: string;
}

function DateField({
  label,
  value,
  editMode,
  error,
  maxDate,
  onChange,
  onBlur,
}: DateFieldProps) {
  return (
    <div className={styles.field}>
      <label>{label}</label>

      {editMode ? (
        <>
          <input
            type="date"
            value={value || ""}
            max={maxDate}
            className={error ? styles.errorInput : ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />

          {error && <span className={styles.errorText}>{error}</span>}
        </>
      ) : (
        <div className={styles.review}>{value || "-"}</div>
      )}
    </div>
  );
}

function TextareaField({
  label,
  value,
  editMode,
  onChange,
  full,
}: TextareaProps) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ""}`}>
      <label>{label}</label>

      {editMode ? (
        <textarea
          value={value}
          placeholder={`Enter ${label}`}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className={styles.review}>{value || "-"}</div>
      )}
    </div>
  );
}
