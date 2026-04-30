import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { getUser } from "@/lib/getUser";
import { UserRegistrationDto } from "@/types/userRegistration";

export const metadata = {
  title: "FinServe",
  description: "Financial Service Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: UserRegistrationDto | null = null;

  try {
    user = await getUser();
  } catch (error) {
    console.error("User fetch error:", error);
  }

  return (
    <html lang="en">
      <body>
        <LayoutWrapper user={user}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
