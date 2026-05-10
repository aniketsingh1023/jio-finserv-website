export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import LoanHighlightSectionComponent from "@/components/Loans/LoanHighlightSectionComponent";
import OurStoryComponent from "@/components/AboutUs/OurStoryComponent";
import OurCoreValuesComponent from "@/components/AboutUs/OurCoreValuesComponent";
import WhyChooseUsAboutComponent from "@/components/AboutUs/WhyChooseUsAboutComponent";

export default function AboutUsPage() {
  return (
    <>
      <SubPageComponent
        title="About Jio Finserv Limited"
        subTitle=""
        description="Your trusted partner in financial growth, committed to making your dreams a reality through accessible and affordable financial solutions."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      <LoanHighlightSectionComponent
        highlights={[
          { tags: " ", value: "10+", label: "Years of Experience" },
          { tags: " ", value: "50,000+", label: "Happy Customers" },
          { tags: " ", value: "₹500 Cr+", label: "Loans Disbursed" },
          { tags: " ", value: "25+", label: "Branch Locations" },
        ]}
      />

      <OurStoryComponent />
      <OurCoreValuesComponent />
      <WhyChooseUsAboutComponent />
    </>
  );
}
