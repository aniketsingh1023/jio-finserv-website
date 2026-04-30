export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import EmiCalculatorComponent from "@/components/EMICalculator/EmiCalculatorComponent";

export default function EmiCalculatorPage() {
  return (
    <>
      <SubPageComponent
        title="EMI Calculator"
        subTitle="Plan Your Loan Repayment"
        description="Plan your loan repayment with our easy-to-use EMI calculator. Get instant results and make informed decisions."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "EMI Calculator" },
        ]}
      />
      <EmiCalculatorComponent />
    </>
  );
}
