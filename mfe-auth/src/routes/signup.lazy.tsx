import { createLazyFileRoute } from "@tanstack/react-router";
import AuthForm from "../components/auth/AuthForm/AuthForm";

export const Route = createLazyFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  return <AuthForm mode="signup" />;
}
