import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, CheckSquare } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";
import colors from "../../constants/colors";

/**
 * Header component — macOS-inspired window titlebar style.
 * Shows traffic light dots, app name, user info, and logout with confirmation.
 */
export default function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    setShowLogoutConfirm(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "52px",
          padding: "0 20px",
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `0.5px solid ${colors.borderLight}`,
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* Left: Traffic lights + App name */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Mobile menu toggle */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: colors.textSecondary,
              display: "none",
            }}
            aria-label="Toggle sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>

          {/* Traffic light dots */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FF5F57" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#28C840" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "4px" }}>
            <CheckSquare size={17} color={colors.accent} strokeWidth={2.5} />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: colors.textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              Task Manager
            </span>
          </div>
        </div>

        {/* Right: User + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* User avatar pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px 4px 4px",
              backgroundColor: colors.surfaceSoft,
              borderRadius: colors.radiusFull,
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span
              style={{
                fontSize: "12px",
                color: colors.textSecondary,
                fontWeight: 500,
              }}
            >
              {user?.username}
            </span>
          </div>

          {/* Logout button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 500,
              color: colors.textSecondary,
              backgroundColor: "transparent",
              border: `1px solid ${colors.borderLight}`,
              borderRadius: colors.radiusFull,
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              fontFamily: "'Inter', -apple-system, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.errorSoft;
              e.currentTarget.style.color = colors.error;
              e.currentTarget.style.borderColor = "rgba(255, 59, 48, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.textSecondary;
              e.currentTarget.style.borderColor = colors.borderLight;
            }}
          >
            <LogOut size={13} />
            Log out
          </button>
        </div>
      </header>

      {/* Logout confirmation modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Log out"
        message="Are you sure you want to log out? You will need to sign in again to access your tasks."
        confirmLabel="Log out"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
