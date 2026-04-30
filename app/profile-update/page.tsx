export const dynamic = "force-dynamic";
import ProfileUpdateComponent from "@/components/MyAccounts/ProfileUpdateComponent";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import AuthBackground from "@/components/Authentications/AuthBackground";
import { cookies } from "next/headers";

export default async function ProfileUpdatePage() {
  const cookieStore = cookies();
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AuthBackground>
      <div style={{ marginTop: "50px" }}></div>
      <ProfileUpdateComponent user={user} />
    </AuthBackground>
  );
  // <ProfileUpdateComponent user={user} />;
}
