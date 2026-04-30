import { Suspense } from "react";
import ApplicationViewComponent from "@/components/MyAccounts/ApplicationViewComponent";
import AuthBackground from "@/components/Authentications/AuthBackground";
export const dynamic = "force-dynamic";

export default function ApplicationViewPage() {
  return (
    <AuthBackground>
      <div style={{ marginTop: "50px" }}></div>
      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationViewComponent />
      </Suspense>
    </AuthBackground>
  );
}
