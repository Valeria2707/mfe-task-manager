import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  return <div>Сторінка реєстрації (SignUp)</div>;
}
