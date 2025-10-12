import { useRouter } from "expo-router";
import SignUpForm from "@/components/SignUpForm";

export default function SignInPage() {
  const router = useRouter();
  const onSignUp = () => {
    router.navigate("/");
  };

  return <SignUpForm onSignUp={onSignUp} />;
}
