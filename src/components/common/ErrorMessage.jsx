import colors from "../../constants/colors";
import { AlertCircle } from "lucide-react";

/**
 * Reusable ErrorMessage component — macOS-style alert.
 */
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        backgroundColor: colors.errorSoft,
        border: `1px solid rgba(255, 59, 48, 0.12)`,
        borderRadius: colors.radiusSm,
        marginBottom: "18px",
      }}
    >
      <AlertCircle size={16} color={colors.error} style={{ flexShrink: 0 }} />
      <p
        style={{
          fontSize: "13px",
          color: colors.error,
          margin: 0,
          fontWeight: 500,
          lineHeight: "1.4",
        }}
      >
        {message}
      </p>
    </div>
  );
}
