export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import LoanHighlightSectionComponent from "@/components/Loans/LoanHighlightSectionComponent";
import LoanDetailsSectionServer from "@/components/Loans/LoanDetailsSectionServer";
import ReviewsSection from "@/components/Testimonials/TestimonialsSection";
import FAQsSection from "@/components/FAQ/FAQSection";
import FAQSection from "@/components/FAQ/FAQSection";

export default function BusinessLoanPage() {
  return (
    <>
      <SubPageComponent
        title="Business Loan"
        subTitle="Fuel Your Business Growth"
        description="Expand your business, manage working capital, or purchase equipment with our flexible business loans designed for entrepreneurs and SMEs."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Business Loan" }]}
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
            title: "Collateral Free",
            body: "Get business loans without pledging assets.",
          },
          {
            title: "Quick Processing",
            body: "Fast approval to meet urgent business needs.",
          },
          {
            title: "Flexible Use",
            body: "Use funds for any business purpose.",
          },
          {
            title: "Easy Documentation",
            body: "Minimal paperwork for faster processing.",
          },
        ]}
      />

      <ReviewsSection loanType="Business Loan" />
      <FAQSection />
    </>
  );
}
