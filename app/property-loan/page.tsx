export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import LoanHighlightSectionComponent from "@/components/Loans/LoanHighlightSectionComponent";
import LoanDetailsSectionServer from "@/components/Loans/LoanDetailsSectionServer";
import ReviewsSection from "@/components/Testimonials/TestimonialsSection";
import FAQSection from "@/components/FAQ/FAQSection";

export default function LoanAgainstPropertyPage() {
  return (
    <>
      <SubPageComponent
        title="Loan Against Property"
        subTitle="Unlock the Value of Your Property"
        description="Get substantial funds by leveraging your residential or commercial property. Our LAP loans offer high loan amounts at competitive interest rates."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Loan Against Property" },
        ]}
      />
      <LoanHighlightSectionComponent
        highlights={[
          { tags: "Starting from", value: "8.50%", label: "Interest Rate" },
          { tags: "up to", value: "₹10 Crores", label: "Loan Amount" },
          { tags: "customized", value: "15 Years", label: "Max Tenure" },
          { tags: "variable", value: "0.5-1%", label: "Processing Fee" },
        ]}
      />

      <LoanDetailsSectionServer
        keyFeatures={[
          "Loan amount up to ₹10 Crores",
          "Interest rates starting from 8.50% p.a.",
          "Tenure up to 15 years",
          "Up to 70% of property value as loan",
          "Both residential and commercial property accepted",
          "Minimal documentation required",
          "Quick processing within 7 days",
          "No end-use restrictions",
        ]}
        benefits={[
          {
            title: "High Loan Amount",
            body: "Get up to ₹10 Crores based on property value.",
          },
          {
            title: "Flexible Use",
            body: "Use funds for business, education, or personal needs.",
          },
          {
            title: "Lower Interest",
            body: "Secured loans offer lower rates than unsecured loans.",
          },
          {
            title: "Long Tenure",
            body: "Repay comfortably over 15 years.",
          },
        ]}
      />

      <ReviewsSection loanType="Loan Against Property" />
      <FAQSection />
    </>
  );
}
