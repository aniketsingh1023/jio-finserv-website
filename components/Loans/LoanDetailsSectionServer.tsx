import { cookies } from "next/headers";
import LoanDetailsSectionComponent from "./LoanDetailsSectionComponent";

interface BenefitsItem {
  title: string;
  body: string;
}

interface Props {
  keyFeatures: string[];
  benefits: BenefitsItem[];
}

export default async function LoanDetailsSectionServer({
  keyFeatures,
  benefits,
}: Props) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid");

  const isLoggedIn = !!userId;

  return (
    <LoanDetailsSectionComponent
      keyFeatures={keyFeatures}
      isLoggedIn={isLoggedIn}
      benefits={benefits}
    />
  );
}
