import { useState } from "react";
import colors from "../../constants/colors";

/**
 * Reusable Input component — macOS-inspired design.
 * Clean, minimal input with smooth focus transitions.
 */
export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  id,
  name,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
      ? colors.accent
      : colors.border;

  const shadowStyle = error
    ? `0 0 0 3px ${colors.errorSoft}`
    : isFocused
      ? "0 0 0 3px rgba(0, 122, 255, 0.12)"
      : "none";

  return (
    <div style={{ marginBottom: "18px" }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 600,
            color: colors.textSecondary,
            marginBottom: "6px",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: "100%",
          height: "40px",
          padding: "0 14px",
          fontSize: "14px",
          fontFamily: "'Inter', -apple-system, sans-serif",
          color: colors.textPrimary,
          backgroundColor: disabled ? colors.surfaceSoft : colors.surface,
          border: `1.5px solid ${borderColor}`,
          borderRadius: colors.radiusSm,
          outline: "none",
          boxShadow: shadowStyle,
          transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          letterSpacing: "-0.01em",
        }}
      />
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: colors.error,
            marginTop: "6px",
            fontWeight: 500,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
