"use client";

import Link from "next/link";
import styles from "./HeaderComponent.module.css";
import { useState, useEffect, useRef } from "react";

import ApplyButton from "@/components/Buttons/ApplyButton";
import { PlayStoreIcon } from "../PlayStoreIcon";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function HeaderComponent({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = !!user;
  const userName = user?.name || "";
  const [profileOpen, setProfileOpen] = useState(false);

  const mobileRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Check Session

  // Shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.href = "/";
  };

  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.shrink : ""}`}>
        <div className={styles.container}>
          <div className={styles.logo}>Fin</div>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            <div className={styles.navItem}>
              <Link href="/">Home</Link>
            </div>

            <div className={styles.navItemWrapper}>
              <div className={styles.navItem}>
                Loans
                <span className={styles.arrow}>▼</span>
              </div>

              <div className={styles.dropdown}>
                <Link href="personal-loan">Personal Loan</Link>
                <Link href="home-loan">Home Loan</Link>
                <Link href="business-loan">Business Loan</Link>
                <Link href="education-loan">Education Loan</Link>
                <Link href="property-loan">Loan Against Property</Link>
                <Link href="credit-card-loan">Loan Against Credit Card</Link>
              </div>
            </div>

            <div className={styles.navItem}>
              <Link href="emi-calculator">EMI Calculator</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="about">About Us</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="contact">Contact Us</Link>
            </div>
          </nav>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <a
              href="/apk/jio-finserv-v2.apk"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(90deg, #d4a65a 0%, #b8842f 100%)",
                color: "#0b1a33",
                fontWeight: 600,
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 16,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(212, 166, 90, 0.15)",
                transition: "background 0.3s, color 0.3s",
              }}
            >
              <PlayStoreIcon size={24} />
              <span>Download the App</span>
            </a>
            {!isLoggedIn ? (
              <Link href="/login" className={styles.signIn}>
                Sign In
              </Link>
            ) : (
              <div className={styles.profileWrapper} ref={profileRef}>
                <div
                  className={styles.profileTrigger}
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <span className={styles.profileName}>{userName}</span>
                  <div className={styles.profileIcon}>🧑</div>
                </div>

                {profileOpen && (
                  <div className={styles.profileDropdown}>
                    <Link href="/my-account">My Account</Link>
                    <Link href="/profile-update">Profile Update</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}

            <ApplyButton />

            <div
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay blur for mobile */}
      {menuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
      >
        <a
          href="/apk/jio-finserv-v2.apk"
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(90deg, #d4a65a 0%, #b8842f 100%)",
            color: "#0b1a33",
            fontWeight: 600,
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: 16,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(212, 166, 90, 0.15)",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          <PlayStoreIcon size={24} />
          <span>Download the App</span>
        </a>
        <Link href="/">Home</Link>

        <div className={styles.mobileItem}>
          <div
            className={styles.mobileItemHeader}
            onClick={() => setMobileSubOpen(!mobileSubOpen)}
          >
            Loans
            <span
              className={`${styles.mobileArrow} ${
                mobileSubOpen ? styles.rotate : ""
              }`}
            >
              ▼
            </span>
          </div>

          <div
            className={`${styles.mobileSubmenu} ${
              mobileSubOpen ? styles.mobileSubOpen : ""
            }`}
          >
            <Link href="personal-loan">Personal Loan</Link>
            <Link href="home-loan">Home Loan</Link>
            <Link href="business-loan">Business Loan</Link>
            <Link href="education-loan">Education Loan</Link>
            <Link href="property-loan">Loan Against Property</Link>
            <Link href="credit-card-loan">Loan Against Credit Card</Link>
          </div>
        </div>

        <Link href="emi-calculator">EMI Calculator</Link>
        <Link href="about">About Us</Link>
        <Link href="contact">Contact Us</Link>

        {!isLoggedIn ? (
          <Link href="/login" className={styles.mobileSignIn}>
            Sign In
          </Link>
        ) : (
          <>
            <Link href="/my-account">My Account</Link>
            <Link href="/profile-update">Profile Update</Link>
            <button onClick={handleLogout} className={styles.mobileSignIn}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
