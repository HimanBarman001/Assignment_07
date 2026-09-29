import colors from "../../constants/colors";
import { getPasswordStrength } from "../../utils/auth";

/**
 * PasswordStrength component — macOS-inspired segmented indicator.
 * Shows Weak / Medium / Strong with a smooth animated bar.
 */
export default function PasswordStrength({ password }) {
  const strength = getPasswordStrength(password);

  if (!strength) return null;

  const strengthConfig = {
    weak: {
      label: "Weak",
      color: colors.error,
      segments: 1,
    },
    medium: {
      label: "Medium",
      color: colors.warning,
      segments: 2,
    },
    strong: {
      label: "Strong",
      color: colors.success,
      segments: 3,
    },
  };

  const config = strengthConfig[strength];

  return (
    <div style={{ marginTop: "-10px", marginBottom: "18px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: colors.textMuted,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          Password strength
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: config.color,
            letterSpacing: "0.02em",
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Segmented strength bar — 3 segments like macOS Wi-Fi indicator */}
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3].map((segment) => (
          <div
            key={segment}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              backgroundColor: segment <= config.segments ? config.color : colors.surfaceSoft,
              transition: "background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
