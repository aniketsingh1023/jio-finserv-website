export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import LoanHighlightSectionComponent from "@/components/Loans/LoanHighlightSectionComponent";
import LoanDetailsSectionServer from "@/components/Loans/LoanDetailsSectionServer";
import ReviewsSection from "@/components/Testimonials/TestimonialsSection";
import FAQsSection from "@/components/FAQ/FAQSection";
import FAQSection from "@/components/FAQ/FAQSection";

export default function PersonalLoanPage() {
  return (
    <>
      <SubPageComponent
        title="Personal Loan"
        subTitle="Quick Funds for All Your Personal Needs"
        description="Whether it's a wedding, vacation, medical emergency, or home renovation - get instant personal loans with minimal documentation"
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Personal Loan" }]}
      />
      <LoanHighlightSectionComponent
        highlights={[
          { tags: "Starting from", value: "8.50%", label: "Interest Rate" },
          { tags: "up to", value: "₹50 Lakhs", label: "Loan Amount" },
          { tags: "customized", value: "72 Months", label: "Max Tenure" },
          { tags: "variable", value: "1-2%", label: "Processing Fee" },
        ]}
      />

      <LoanDetailsSectionServer
        keyFeatures={[
          "Loan amount up to ₹50 Lakhs",
          "Interest rates starting from 8.50% p.a.",
          "Flexible tenure from 12 to 72 months",
          "Collateral-free loans available",
          "Quick approval within 48 hours",
          "Minimal documentation required",
          "Overdraft facility available",
          "No end-use restrictions",
        ]}
        benefits={[
          {
            title: "No Collateral",
            body: "Get funds without pledging any asset or property.",
          },
          {
            title: "Quick Disbursal",
            body: "Funds credited to your account within 24-48 hours.",
          },
          {
            title: "Flexible Use",
            body: "Use the loan for any personal expense of your choice.",
          },
          {
            title: "Easy Repayment",
            body: "Choose EMI options that suit your budget.",
          },
        ]}
      />

      <ReviewsSection loanType="Personal Loan" />
      <FAQSection />
    </>
  );
}
