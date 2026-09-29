import { createContext, useContext, useState, useEffect } from "react";
import {
  createSimulatedJWT,
  decodeSimulatedJWT,
  validateCredentials,
  storeAuthToken,
  getAuthToken,
  removeAuthToken,
  storeRememberedUser,
  removeRememberedUser,
} from "../utils/auth";

// Create the Auth Context
const AuthContext = createContext(null);

// Custom hook to use the Auth Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Auth Provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing authentication state when the application starts
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const payload = decodeSimulatedJWT(token);
      if (payload && payload.username) {
        setIsAuthenticated(true);
        setUser({ username: payload.username });
      } else {
        // Invalid token — clean up
        removeAuthToken();
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login function
   * Validates credentials, creates a simulated JWT, stores it,
   * and optionally remembers the user.
   *
   * Returns: { success: boolean, error?: string }
   */
  function login(username, password, rememberMe) {
    if (!validateCredentials(username, password)) {
      return { success: false, error: "Invalid username or password." };
    }

    // Create simulated JWT token
    const token = createSimulatedJWT(username);

    // Store token in Local Storage
    storeAuthToken(token);

    // Handle Remember Me
    if (rememberMe) {
      storeRememberedUser(username);
    } else {
      removeRememberedUser();
    }

    // Update authentication state
    setIsAuthenticated(true);
    setUser({ username });

    return { success: true };
  }

  /**
   * Logout function
   * Removes token, clears auth state, navigates to login.
   */
  function logout() {
    removeAuthToken();
    setIsAuthenticated(false);
    setUser(null);
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
