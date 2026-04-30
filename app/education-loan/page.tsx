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
        title="Education Loan"
        subTitle="Invest in Your Future"
        description="Don't let finances come in the way of your education. Our education loans cover tuition fees, living expenses, and more for studies in India and abroad."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Education Loan" },
        ]}
      />
      <LoanHighlightSectionComponent
        highlights={[
          { tags: "Starting from", value: "8.50%", label: "Interest Rate" },
          { tags: "up to", value: "₹75 Lakhs", label: "Loan Amount" },
          { tags: "customized", value: "15 Years", label: "Max Tenure" },
          { tags: "variable", value: "1%", label: "Processing Fee" },
        ]}
      />

      <LoanDetailsSectionServer
        keyFeatures={[
          "Loan amount up to ₹75 Lakhs",
          "Interest rates starting from 8.50% p.a.",
          "Tenure up to 15 years after course completion",
          "Covers tuition fees, living expenses, and more",
          "Moratorium period during study + 6 months",
          "No collateral required up to ₹7.5 Lakhs",
          "Tax benefits under Section 80E",
          "Covers studies in India and abroad",
        ]}
        benefits={[
          {
            title: "Moratorium Period",
            body: "Start repayment after course completion.",
          },
          {
            title: "Complete Coverage",
            body: "Covers fees, books, equipment, and living costs.",
          },
          {
            title: "Tax Benefits",
            body: "Interest deduction under Section 80E.",
          },
          {
            title: "Global Studies",
            body: "Finance your studies anywhere in the world.",
          },
        ]}
      />

      <ReviewsSection loanType="Education Loan" />
      <FAQSection />
    </>
  );
}
