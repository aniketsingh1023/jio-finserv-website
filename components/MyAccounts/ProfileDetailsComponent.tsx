"use client";

import styles from "./ProfileDetailsComponent.module.css";
import { UserRegistrationDto } from "@/types/userRegistration";
import { useRouter } from "next/navigation";

interface Props {
  user: UserRegistrationDto;
}

export default function ProfileDetailsComponent({ user }: Props) {
  const router = useRouter();
  const formatDate = (date?: string) => {
    if (!date) return "-";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.container}>
      {/* Edit Button */}
      <button
        className={styles.editButton}
        title="Edit profile"
        onClick={() => router.push("/profile-update")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536M9 11l6.536-6.536a2.5 2.5 0 113.536 3.536L12.536 14.536a4 4 0 01-1.414.944L8 16l.52-3.122A4 4 0 019 11z"
          />
        </svg>
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.avatarRing}>
            {user.profilePic ? (
              <img src={user.profilePic} alt="profile" />
            ) : (
              <span>{user.name?.charAt(0)?.toUpperCase()}</span>
            )}
          </div>

          <div className={styles.nameBlock}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className={styles.headerInfo}>
          <div className={styles.item}>
            <label>Mobile</label>
            <span>{user.mobile || "-"}</span>
          </div>

          <div className={styles.item}>
            <label>Gender</label>
            <span>{user.gender || "-"}</span>
          </div>

          <div className={styles.item}>
            <label>Date of Birth</label>
            <span>{formatDate(user.dob)}</span>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className={styles.grid}>
        <div className={`${styles.item} ${styles.full}`}>
          <label>Address</label>
          <span>{user.address || "-"}</span>
        </div>
        <div className={styles.item}>
          <label>City</label>
          <span>{user.city || "-"}</span>
        </div>

        <div className={styles.item}>
          <label>Pincode</label>
          <span>{user.pincode || "-"}</span>
        </div>
      </div>
    </div>
  );
}
