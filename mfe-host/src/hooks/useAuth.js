import { useState, useEffect } from "react";
import getUserSession from "../services/session";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getUserSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  return isAuthenticated;
}
