export const dynamic = "force-dynamic";
import { cookies } from "next/headers";

import ProfileDetailsComponent from "@/components/MyAccounts/ProfileDetailsComponent";
import MyApplications from "@/components/MyAccounts/MyApplicationsComponent";
import AuthBackground from "@/components/Authentications/AuthBackground";

import fs from "fs";
import path from "path";
import { COOKIE_NAMES, FILE_PATHS } from "@/lib/constants";
import { getCookie } from "@/lib/cookiesStorage";
import { redirect } from "next/navigation";

export default async function MyAccountPage() {
  const cookieStore = cookies();
  const cookiesUserId = await getCookie(COOKIE_NAMES.USER_ID);

  if (!cookiesUserId) {
    redirect("/login?logout=1");
    return <div>Please login</div>;
  }
  const usersPath = path.join(process.cwd(), FILE_PATHS.REGISTRATION_DATA);
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  const user = users.find((u: any) => u.id === cookiesUserId);

  if (!user) {
    // return <div>User not found</div>;
    redirect("/login?logout=1");
  }

  return (
    <AuthBackground>
      <div style={{ marginTop: "50px" }}></div>
      <ProfileDetailsComponent user={user} />
      <MyApplications />
    </AuthBackground>
  );
}
