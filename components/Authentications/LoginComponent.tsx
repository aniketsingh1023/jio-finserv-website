"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./LoginComponent.module.css";

export default function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  /* logout detection */
  const logout = searchParams.get("logout");

  useEffect(() => {
    const logoutUser = async () => {
      if (logout === "1") {
        await fetch("/api/logout");
        setError("Your session expired. Please login again.");
        router.replace("/login");
      }
    };

    logoutUser();
  }, [logout, router]);

  /* 3D Parallax mouse movement */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(result.message);
      return;
    }

    router.refresh();
    router.push("/my-account");
  };

  return (
    <div className={styles.wrapper}>
      {/* Parallax blobs */}

      <div
        className={`${styles.blob} ${styles.blob1}`}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      ></div>

      <div
        className={`${styles.blob} ${styles.blob2}`}
        style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)` }}
      ></div>

      {/* shimmer background */}

      <div className={styles.shimmer}></div>

      <div className={styles.box}>
        <h2>Sign In</h2>

        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? <span className={styles.spinner}></span> : "Sign In"}
        </button>

        <div className={styles.links}>
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Create an Account</a>
        </div>
      </div>
    </div>
  );
}
