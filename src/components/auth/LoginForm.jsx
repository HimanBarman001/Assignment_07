import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRememberedUser } from "../../utils/auth";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import PasswordStrength from "./PasswordStrength";
import colors from "../../constants/colors";

/**
 * LoginForm component — macOS-inspired clean form.
 * Handles validation, password strength, Remember Me, and auth via AuthContext.
 */
export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Restore remembered username on mount
  useEffect(() => {
    const remembered = getRememberedUser();
    if (remembered) {
      setUsername(remembered);
      setRememberMe(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    setErrors({});
    setAuthError("");

    // Validate fields
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Please enter your username.";
    }
    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Brief loading state for polish
    setIsLoading(true);
    setTimeout(() => {
      const result = login(username.trim(), password, rememberMe);
      setIsLoading(false);
      if (result.success) {
        navigate("/dashboard", { replace: true });
      } else {
        setAuthError(result.error);
      }
    }, 300);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ErrorMessage message={authError} />

      <Input
        id="username"
        name="username"
        label="Username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
        }}
        error={errors.username}
      />

      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
        }}
        error={errors.password}
      />

      <PasswordStrength password={password} />

      {/* Remember Me — macOS-style checkbox */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        <div
          onClick={() => setRememberMe(!rememberMe)}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "5px",
            border: `1.5px solid ${rememberMe ? colors.accent : colors.border}`,
            backgroundColor: rememberMe ? colors.accent : colors.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            flexShrink: 0,
          }}
        >
          {rememberMe && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path
                d="M1 4L4 7L10 1"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <label
          onClick={() => setRememberMe(!rememberMe)}
          style={{
            fontSize: "13px",
            color: colors.textSecondary,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Remember me
        </label>
      </div>

      <Button type="submit" fullWidth size="large" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <p
        style={{
          fontSize: "11px",
          color: colors.textMuted,
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Demo authentication for this assignment.
      </p>
    </form>
  );
}
