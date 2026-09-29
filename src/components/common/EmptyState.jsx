import colors from "../../constants/colors";

/**
 * Reusable EmptyState component — macOS-inspired minimal design.
 */
export default function EmptyState({ icon, title, description }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 24px",
        textAlign: "center",
      }}
    >
      {icon && (
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: colors.radius,
            backgroundColor: colors.surfaceSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.textMuted,
            marginBottom: "20px",
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: "6px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: "14px",
            color: colors.textSecondary,
            maxWidth: "300px",
            lineHeight: "1.5",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
