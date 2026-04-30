export const dynamic = "force-dynamic";

import ApplicationForm from "@/components/ApplicationForms/ApplicationForm";
import { COOKIE_NAMES } from "@/lib/constants";
import { getCookie } from "@/lib/cookiesStorage";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ appId?: string }>;
}) {
  const params = await searchParams;
  const cookiesUserId = await getCookie(COOKIE_NAMES.USER_ID);

  if (!cookiesUserId) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationForm appId={params?.appId || null} />
    </Suspense>
  );
}
