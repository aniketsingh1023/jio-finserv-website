"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Step1SignUp.module.css";
import { ApplicationFormData } from "@/types/application.types";
import { useApplicationForm } from "./ApplicationFormProvider";

interface Props {
  data?: ApplicationFormData["personalInfo"];
  // setFormData?: Dispatch<SetStateAction<ApplicationFormData>>;
  nextStep?: () => void;
  readOnly?: boolean;
}

export default function Step1SignUp({
  data,
  // setFormData,
  nextStep,
  readOnly = false,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    formData: appFormData,
    setFormData,
    applicationId,
    setApplicationId,
  } = useApplicationForm();
  const [isDirty, setIsDirty] = useState(false);

  const [localData, setLocalData] = useState<
    ApplicationFormData["personalInfo"]
  >({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    profilePic: "",
    pincode: "",
  });

  const [registrationData, setRegistrationData] = useState<any>(null);

  /**
   * Fetch logged-in user profile
   */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile-get");

        if (!res.ok) return;

        const result = await res.json();

        if (result?.user) {
          const user = result.user;

          setRegistrationData(user);

          const mappedUser: ApplicationFormData["personalInfo"] = {
            name: user.name || "",
            mobile: String(user.mobile || ""),
            email: user.email || "",
            gender: user.gender || "",
            dob: user.dob || "",
            address: user.address || "",
            city: user.city || "",
            profilePic: user.profilePic || "",
            pincode: String(user.pincode || ""),
          };

          setLocalData(mappedUser);
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };

    fetchProfile();
  }, [data]);

  /**
   * Detect edit mode
   */

  useEffect(() => {
    if (!data) return;

    const hasRealData =
      data.name ||
      data.mobile ||
      data.email ||
      data.gender ||
      data.address ||
      data.city ||
      data.pincode;

    if (hasRealData) {
      setLocalData(data);
    }
  }, [data]);

  /**
   * Current Form Data
   */

  const formData = localData;

  /**
   * ReadOnly Logic
   */

  const isReadOnly = readOnly || (!!registrationData && !data);

  /**
   * DOB restriction
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

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid mobile number";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter valid email";

    if (!formData.gender) newErrors.gender = "Select gender";

    if (!formData.dob) newErrors.dob = "DOB required";

    if (!formData.address.trim()) newErrors.address = "Address required";

    if (!formData.city.trim()) newErrors.city = "City required";

    if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle Change
   */

  const handleChange = (field: string, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsDirty(true);

    // if (setFormData) {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
    // }
  };

  /**
   * Continue
   */

  const handleNext = async () => {
    if (!validate()) return;

    if (applicationId && !isDirty) {
      nextStep?.();
      return;
    }
    setLoading(true);

    try {
      const form = new FormData();

      form.append(
        "data",
        JSON.stringify({
          applicationId,
          personalInfo: formData,
        }),
      );

      const res = await fetch("/api/save-application", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        setGlobalError(result.message || "Failed to save application");
        setLoading(false);
        return;
      }

      // if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        personalInfo: formData,
      }));
      // }
      if (!applicationId) {
        setApplicationId(result.applicationId);
      }
      setIsDirty(false);
      // setApplicationId(result.applicationId);
      nextStep?.();
    } catch (error) {
      console.error(error);
      setGlobalError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Step 1: Personal Information</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Name</label>
          <input
            value={formData.name}
            disabled={isReadOnly}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label>Mobile</label>
          <input
            maxLength={10}
            value={formData.mobile}
            disabled={isReadOnly}
            onChange={(e) =>
              handleChange("mobile", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.mobile && <span>{errors.mobile}</span>}
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            value={formData.email}
            disabled={isReadOnly}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <select
            value={formData.gender}
            disabled={isReadOnly}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <span>{errors.gender}</span>}
        </div>

        <div className={styles.field}>
          <label>DOB</label>
          <input
            type="date"
            max={formattedMaxDate}
            value={formData.dob}
            disabled={isReadOnly}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
          {errors.dob && <span>{errors.dob}</span>}
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label>Address</label>
          <textarea
            value={formData.address}
            disabled={isReadOnly}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          {errors.address && <span>{errors.address}</span>}
        </div>

        <div className={styles.field}>
          <label>City</label>
          <input
            value={formData.city}
            disabled={isReadOnly}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {errors.city && <span>{errors.city}</span>}
        </div>

        <div className={styles.field}>
          <label>Pincode</label>
          <input
            maxLength={6}
            value={formData.pincode}
            disabled={isReadOnly}
            onChange={(e) =>
              handleChange("pincode", e.target.value.replace(/\D/g, ""))
            }
          />
          {errors.pincode && <span>{errors.pincode}</span>}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleNext} disabled={loading}>
          {loading ? "Saving..." : "Continue"}
        </button>

        {globalError && <p className={styles.globalError}>{globalError}</p>}
      </div>
    </div>
  );
}
