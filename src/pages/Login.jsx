import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { CheckSquare } from "lucide-react";
import colors from "../constants/colors";

/**
 * Login page — macOS-inspired centered card on a clean background.
 * If already authenticated, redirects to /dashboard.
 */
export default function Login() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          backgroundColor: colors.surface,
          border: `0.5px solid ${colors.borderLight}`,
          borderRadius: colors.radiusLg,
          padding: "40px 32px 36px",
          boxShadow: colors.shadowLg,
        }}
      >
        {/* Logo & Heading */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              backgroundColor: colors.accentSoft,
              borderRadius: colors.radius,
              marginBottom: "16px",
            }}
          >
            <CheckSquare size={24} color={colors.accent} strokeWidth={2.2} />
          </div>
          <h1
            style={{
              fontSize: "21px",
              fontWeight: 700,
              color: colors.textPrimary,
              marginBottom: "4px",
              letterSpacing: "-0.03em",
            }}
          >
            Task Manager
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: colors.textSecondary,
              letterSpacing: "-0.01em",
            }}
          >
            Sign in to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
