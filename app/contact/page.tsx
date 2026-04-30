export const dynamic = "force-dynamic";
import SubPageComponent from "@/components/SubPageCardComponent";
import ContactUsComponent from "@/components/AboutUs/ContactUsComponent";

export default function AboutUsPage() {
  return (
    <>
      <SubPageComponent
        title="Contact Us"
        subTitle=""
        description="Have questions? We're here to help. Reach out to us and our team will get back to you shortly."
        buttonText="Apply Now"
        backgroundImage="https://www.jfs.in/docs/cms/assets/jfs/pdp/lending/instant-loans-desk.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <ContactUsComponent />
    </>
  );
}
