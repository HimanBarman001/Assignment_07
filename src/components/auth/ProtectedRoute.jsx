import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * ProtectedRoute component
 * Wraps protected pages and redirects unauthenticated users to /login.
 * Uses React Router's Navigate component for proper route-level protection.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // While checking auth state, show nothing (prevents flash)
  if (loading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return children;
}
