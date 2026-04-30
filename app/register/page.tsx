import RegistrationPageComponent from "@/components/Authentications/RegistrationComponent";
import AuthBackground from "@/components/Authentications/AuthBackground";
export default function RegistrationPage() {
  return (
    <AuthBackground>
      <div style={{ marginTop: "50px" }}></div>
      <RegistrationPageComponent />
      <div style={{ marginTop: "50px" }}></div>
    </AuthBackground>
  );
}
