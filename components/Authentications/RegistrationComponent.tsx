"use client";

import { useState } from "react";
import styles from "./RegistrationComponent.module.css";

import { useRouter } from "next/navigation";

export default function RegistrationFormComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * DOB restriction (18+)
   */
  const today = new Date();

  const minAllowedDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const formattedMaxDate = minAllowedDate.toISOString().split("T")[0];

  /**
   * Validation
   */
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.name?.trim()) newErrors.name = "Name is required";

    if (!/^[0-9]{10}$/.test(formData?.mobile || ""))
      newErrors.mobile = "Enter valid 10 digit mobile number";

    if (!/^\S+@\S+\.\S+$/.test(formData?.email || ""))
      newErrors.email = "Enter valid email address";

    if (!formData?.gender) newErrors.gender = "Select gender";

    if (!formData?.dob) newErrors.dob = "Date of birth required";

    if (!formData?.address?.trim()) newErrors.address = "Address required";

    if (!formData?.city?.trim()) newErrors.city = "City required";

    if (!/^[0-9]{6}$/.test(formData?.pincode || ""))
      newErrors.pincode = "Enter valid 6 digit pincode";

    if (!formData?.password) newErrors.password = "Password required";

    if ((formData?.password || "").length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!formData?.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";

    if (formData?.password !== formData?.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setGlobalError("Please correct the highlighted fields above.");
    } else {
      setGlobalError("");
    }

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle Change
   */
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Continue / Register
   */
  const handleRegister = async () => {
    if (!validate()) return;

    /**
     * Standalone Registration
     */
    try {
      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          signup: formData,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Registration failed");

        setGlobalError(result.message || "Registration failed");

        return;
      }

      alert("Registration successful");

      router.refresh();

      router.push("/my-account");
    } catch (error) {
      console.error(error);

      alert("Registration failed");

      setGlobalError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Create new account</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Name</label>
          <input
            type="text"
            value={formData?.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label>Mobile No</label>
          <input
            type="text"
            maxLength={10}
            value={formData?.mobile || ""}
            onChange={(e) =>
              handleChange("mobile", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.mobile && <span>{errors.mobile}</span>}
        </div>

        <div className={styles.field}>
          <label>Email Id (username)</label>
          <input
            type="email"
            value={formData?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={formData?.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <div className={styles.field}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={formData?.confirmPassword || ""}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <select
            value={formData?.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender}</span>}
        </div>

        <div className={styles.field}>
          <label>Date of Birth</label>
          <input
            type="date"
            max={formattedMaxDate}
            value={formData?.dob || ""}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
          {errors.dob && <span>{errors.dob}</span>}
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label>Full Address</label>
          <textarea
            value={formData?.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          {errors.address && <span>{errors.address}</span>}
        </div>

        <div className={styles.field}>
          <label>City</label>
          <input
            type="text"
            value={formData?.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {errors.city && <span>{errors.city}</span>}
        </div>

        <div className={styles.field}>
          <label>Pincode</label>
          <input
            type="text"
            maxLength={6}
            value={formData?.pincode || ""}
            onChange={(e) =>
              handleChange("pincode", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.pincode && <span>{errors.pincode}</span>}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Continue"}
        </button>

        {globalError && <p className={styles.globalError}>{globalError}</p>}
      </div>
    </div>
  );
}
