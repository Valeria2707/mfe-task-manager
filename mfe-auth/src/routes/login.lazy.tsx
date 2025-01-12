import { createLazyFileRoute } from "@tanstack/react-router";
import AuthForm from "../components/auth/AuthForm/AuthForm";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  return <AuthForm mode="login" />;
}
