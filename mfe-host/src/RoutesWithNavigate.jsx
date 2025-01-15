import TaskList from "./TaskList";
import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import getUserSession from "./services/session";

const Auth = React.lazy(() => import("remoteAuthApp/Auth"));
const ManageTask = React.lazy(() => import("remoteTaskManagerApp/ManageTask"));

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getUserSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function RoutesWithNavigate() {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <ManageTask onNavigate={onNavigate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <ManageTask onNavigate={onNavigate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-page"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}
