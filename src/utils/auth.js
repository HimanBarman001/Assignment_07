// JWT Token Simulation Utility
// This is a frontend-only simulated JWT for academic demonstration.
// It does NOT provide real security — it demonstrates the concept of token-based auth.

// Local Storage key constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  REMEMBERED_USER: "rememberedUser",
};

// Demo credentials for the assignment
export const DEMO_CREDENTIALS = {
  username: "student",
  password: "student123",
};

/**
 * Simulates creating a JWT token.
 * A real JWT has the structure: header.payload.signature
 * We simulate this by base64-encoding each part.
 */
export function createSimulatedJWT(username) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    username: username,
    iat: Date.now(),
  };

  // Base64 encode each part to simulate JWT structure
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  // Simulated signature (not cryptographically valid)
  const simulatedSignature = btoa(username + "-" + Date.now());

  return `${encodedHeader}.${encodedPayload}.${simulatedSignature}`;
}

/**
 * Decodes the payload from a simulated JWT token.
 * Returns the payload object or null if decoding fails.
 */
export function decodeSimulatedJWT(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates demo credentials.
 * Returns true if username and password match.
 */
export function validateCredentials(username, password) {
  return (
    username === DEMO_CREDENTIALS.username &&
    password === DEMO_CREDENTIALS.password
  );
}

/**
 * Stores the auth token in Local Storage.
 */
export function storeAuthToken(token) {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

/**
 * Retrieves the auth token from Local Storage.
 */
export function getAuthToken() {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

/**
 * Removes the auth token from Local Storage.
 */
export function removeAuthToken() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

/**
 * Stores the remembered username in Local Storage.
 */
export function storeRememberedUser(username) {
  localStorage.setItem(STORAGE_KEYS.REMEMBERED_USER, username);
}

/**
 * Retrieves the remembered username from Local Storage.
 */
export function getRememberedUser() {
  return localStorage.getItem(STORAGE_KEYS.REMEMBERED_USER);
}

/**
 * Removes the remembered username from Local Storage.
 */
export function removeRememberedUser() {
  localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USER);
}

/**
 * Calculates password strength for the strength indicator.
 * Returns: "weak", "medium", or "strong"
 *
 * Rules:
 * - Weak: less than 6 characters
 * - Medium: 6+ characters with some variety (has letters and numbers)
 * - Strong: 8+ characters with uppercase, lowercase, numbers, and special characters
 */
export function getPasswordStrength(password) {
  if (!password || password.length === 0) return null;
  if (password.length < 6) return "weak";

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSpecial].filter(Boolean).length;

  if (password.length >= 8 && varietyCount >= 3) return "strong";
  if (password.length >= 6 && varietyCount >= 2) return "medium";
  return "weak";
}
