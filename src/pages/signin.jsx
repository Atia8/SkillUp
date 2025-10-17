import Welcome from "../components/Welcome";
import SignInForm from "../components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <Welcome />
      <SignInForm />
    </div>
  );
}