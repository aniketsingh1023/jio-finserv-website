import { Suspense } from "react";
import LoginComponent from "@/components/Authentications/LoginComponent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginComponent />
    </Suspense>
  );
}
