export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import LoanHighlightSectionComponent from "@/components/Loans/LoanHighlightSectionComponent";
import LoanDetailsSectionServer from "@/components/Loans/LoanDetailsSectionServer";
import ReviewsSection from "@/components/Testimonials/TestimonialsSection";
import FAQsSection from "@/components/FAQ/FAQSection";
import FAQSection from "@/components/FAQ/FAQSection";

export default function HomeLoanPage() {
  return (
    <>
      <SubPageComponent
        title="Home Loan"
        subTitle="Make Your Dream Home a Reality"
        description="Turn your dream of owning a home into reality with our affordable home loans. Whether you're buying a new property or constructing one, we have you covered."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Home Loan" }]}
      />
      <LoanHighlightSectionComponent
        highlights={[
          { tags: "Starting from", value: "8.50%", label: "Interest Rate" },
          { tags: "up to", value: "₹5 Crores", label: "Loan Amount" },
          { tags: "customized", value: "30 Years", label: "Max Tenure" },
          { tags: "variable", value: "0.5%", label: "Processing Fee" },
        ]}
      />

      <LoanDetailsSectionServer
        keyFeatures={[
          "Loan amount up to ₹5 Crores",
          "Interest rates starting from 8.50% p.a.",
          "Tenure up to 30 years",
          "Up to 90% financing on property value",
          "Balance transfer facility available",
          "Top-up loan option available",
          "Tax benefits under Section 80C and 24",
          "Doorstep service for document collection",
        ]}
        benefits={[
          {
            title: "High Loan Amount",
            body: "Get up to 90% of your property value as loan.",
          },
          {
            title: "Long Tenure",
            body: "Repay comfortably over 30 years with low EMIs.",
          },
          {
            title: "Tax Benefits",
            body: "Save on taxes under Section 80C and 24.",
          },
          {
            title: "Balance Transfer",
            body: "Transfer your existing loan at lower rates.",
          },
        ]}
      />

      <ReviewsSection loanType="Home Loan" />
      <FAQSection />
    </>
  );
}
