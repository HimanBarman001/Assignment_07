import colors from "../../constants/colors";

/**
 * Reusable Button component — macOS-inspired design.
 * Supports variants: primary, secondary, danger, ghost, success
 */
export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  size = "default",
  className = "",
}) {
  const sizes = {
    small: { height: "32px", padding: "0 14px", fontSize: "12px" },
    default: { height: "36px", padding: "0 18px", fontSize: "13px" },
    large: { height: "42px", padding: "0 24px", fontSize: "14px" },
  };

  const sizeStyle = sizes[size] || sizes.default;

  const baseStyles = {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: sizeStyle.fontSize,
    fontWeight: 500,
    height: sizeStyle.height,
    padding: sizeStyle.padding,
    borderRadius: colors.radiusSm,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? "100%" : "auto",
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.accent,
      color: "#FFFFFF",
      boxShadow: "0 1px 2px rgba(0, 122, 255, 0.2)",
    },
    secondary: {
      backgroundColor: colors.surface,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
      boxShadow: colors.shadowSm,
    },
    danger: {
      backgroundColor: colors.errorSoft,
      color: colors.error,
      border: `1px solid rgba(255, 59, 48, 0.15)`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: colors.textSecondary,
    },
    success: {
      backgroundColor: colors.successSoft,
      color: "#1B9E4B",
      border: `1px solid rgba(52, 199, 89, 0.15)`,
    },
  };

  const hoverStyles = {
    primary: { backgroundColor: colors.accentHover, transform: "translateY(-0.5px)", boxShadow: "0 2px 6px rgba(0, 122, 255, 0.25)" },
    secondary: { backgroundColor: colors.surfaceSoft, transform: "translateY(-0.5px)" },
    danger: { backgroundColor: "#FFD5D3", transform: "translateY(-0.5px)" },
    ghost: { backgroundColor: colors.surfaceSoft },
    success: { backgroundColor: "#CBF0D5", transform: "translateY(-0.5px)" },
  };

  const styles = { ...baseStyles, ...variantStyles[variant] };
  const hover = hoverStyles[variant] || {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={styles}
      onMouseEnter={(e) => {
        if (disabled) return;
        Object.assign(e.currentTarget.style, hover);
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        Object.assign(e.currentTarget.style, variantStyles[variant]);
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(0.5px) scale(0.98)";
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(-0.5px)";
      }}
    >
      {children}
    </button>
  );
}
