import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import LogoutButton from "../components/auth/LogoutButton/LogoutButton";
import { Session } from "@supabase/supabase-js";
import "../page-styles/root.css";
import getUserSession from "../services/session";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const userSession = await getUserSession();
      setSession(userSession);
    };

    fetchSession();
  }, []);

  return (
    <>
      <nav className="navbar">
        {session ? (
          <LogoutButton />
        ) : (
          <Link to={"/login"} className="btn">
            Login
          </Link>
        )}
      </nav>
      <Outlet />
    </>
  );
}
