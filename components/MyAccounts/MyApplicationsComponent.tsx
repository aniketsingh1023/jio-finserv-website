"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./MyApplicationsComponent.module.css";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  loanDetails?: {
    loanType?: string;
    loanAmount?: number;
  };
}

export default function MyApplications() {
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/my-applications");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const result = await res.json();

        setApplications(result.applications || []);
      } catch (err) {
        console.error("Fetch applications failed", err);
      }

      setLoading(false);
    };

    fetchApplications();
  }, [router]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const shortId = (id: string) => id.slice(0, 8);

  const getStatusBadge = (status: string) => {
    if (status === "submitted") {
      return <span className={styles.submittedBadge}>Submitted</span>;
    }

    return <span className={styles.draftBadge}>Draft</span>;
  };

  if (loading) {
    return <p className={styles.loading}>Loading applications...</p>;
  }

  return (
    <div className={styles.container}>
      <h2>My Applications</h2>

      {applications.length === 0 && (
        <div className={styles.emptyBox}>
          <p>No applications found.</p>

          <button
            className={styles.newBtn}
            onClick={() => router.push("/apply")}
          >
            Start New Application
          </button>
        </div>
      )}

      {applications.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Loan</th>
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className={styles.appId}>{shortId(app.id)}</td>

                <td>
                  {app.loanDetails?.loanType || "-"} <br />
                  {app.loanDetails?.loanAmount
                    ? `₹${app.loanDetails.loanAmount}`
                    : ""}
                </td>

                <td>{formatDate(app.createdAt)}</td>

                <td>{getStatusBadge(app.status)}</td>

                <td>
                  {app.status === "submitted" ? (
                    <button
                      className={styles.viewButton}
                      onClick={() =>
                        router.push(`/application-view?appId=${app.id}`)
                      }
                    >
                      View
                    </button>
                  ) : (
                    <button
                      className={styles.editButton}
                      onClick={() => router.push(`/apply?appId=${app.id}`)}
                    >
                      Continue
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
