export const dynamic = "force-dynamic";
import { cookies } from "next/headers";

export default function AdminPage() {
  const cookieStore = cookies();
  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Page</h1>
    </div>
  );
}
