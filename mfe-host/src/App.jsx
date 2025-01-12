import React, { Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskList from "./TaskList";
import getUserSession from "./services/session";

const Auth = React.lazy(() => import("remoteAuthApp/Auth"));
const ManageTask = React.lazy(() => import("remoteTaskManagerApp/ManageTask"));

function ProtectedRoute({ children, session }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const userSession = await getUserSession();
      setSession(userSession);
    };

    fetchSession();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute session={session}>
                <ManageTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute session={session}>
                <ManageTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute session={session}>
                <TaskList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
