import ContactUserTemplate from "@/lib/emailTemplates/contactus/contactUsUserTemplate";
import ContactAdminTemplate from "@/lib/emailTemplates/contactus/contactUsAdminTemplate";

export default function EmailPreviewPage() {
  return (
    // <ContactUserTemplate
    //   fullName="Vimal Kumar"
    //   message="I am interested in a personal loan."
    // />


    <ContactAdminTemplate
      fullName="Vimal Kumar"
      email="email@email.com"
      phone="1234567890"
      message="I am interested in a personal loan."
    />
  );
}
