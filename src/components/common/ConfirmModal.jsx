import { useEffect } from "react";
import colors from "../../constants/colors";
import Button from "./Button";

/**
 * ConfirmModal — macOS-style confirmation dialog with backdrop blur.
 */
export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onCancel();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "modalOverlayIn 0.15s ease",
      }}
    >
      <style>{`
        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalCardIn {
          from { opacity: 0; transform: scale(0.95) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "340px",
          backgroundColor: colors.surface,
          border: `0.5px solid ${colors.borderLight}`,
          borderRadius: colors.radiusLg,
          boxShadow: colors.shadowLg,
          padding: "28px 24px 20px",
          textAlign: "center",
          animation: "modalCardIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: colors.radius,
            backgroundColor: colors.errorSoft,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: "6px",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: "13px",
            color: colors.textSecondary,
            lineHeight: "1.5",
            marginBottom: "24px",
          }}
        >
          {message}
        </p>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="secondary"
            onClick={onCancel}
            fullWidth
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            fullWidth
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
