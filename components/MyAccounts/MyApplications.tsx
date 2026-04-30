"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./MyApplications.module.css";

interface Application {
  id: string;
  status: string;
  createdAt: string;
}

export default function MyApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch("/api/my-applications");

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const result = await res.json();
      setApplications(result.applications || []);
    };
    setLoading(false);

    fetchApplications();
  }, [router]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    if (status === "submitted") {
      return <span className={styles.submittedBadge}>Submitted</span>;
    }

    return <span className={styles.draftBadge}>Draft</span>;
  };

  if (loading) return <p>Loading applications...</p>;

  return (
    <div className={styles.container}>
      <h2>My Applications</h2>

      {applications.length === 0 && (
        <p className={styles.empty}>No applications found.</p>
      )}

      {applications.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{formatDate(app.createdAt)}</td>
                <td>{getStatusBadge(app.status)}</td>
                <td>
                  {app.status === "submitted" ? (
                    <button
                      className={styles.viewButton}
                      onClick={() => router.push(`/apply?appId=${app.id}`)}
                    >
                      View
                    </button>
                  ) : (
                    <button
                      className={styles.editButton}
                      onClick={() => router.push(`/apply?appId=${app.id}`)}
                    >
                      Edit
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
