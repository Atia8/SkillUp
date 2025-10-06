import Join from "../components/Join";
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <Join/>
      <SignUpForm />
    </div>
  );
}