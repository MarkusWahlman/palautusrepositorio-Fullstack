import { useRouter } from "expo-router";
import SignInForm from "../components/SignInForm";

export default function SignInPage() {
  const router = useRouter();
  const onSignIn = () => {
    router.navigate("/");
  };

  return <SignInForm onSignIn={onSignIn} />;
}
