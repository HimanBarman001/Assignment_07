import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo, PlusCircle, CheckCircle } from "lucide-react";
import colors from "../../constants/colors";

/**
 * Sidebar navigation — macOS Finder-style translucent sidebar.
 * Uses NavLink for active state highlighting with pill-shaped active items.
 */
const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: ListTodo },
  { to: "/tasks/add", label: "Add Task", icon: PlusCircle },
  { to: "/completed", label: "Completed Tasks", icon: CheckCircle },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(2px)",
            zIndex: 25,
          }}
        />
      )}

      <aside
        className="sidebar-desktop"
        style={{
          width: "220px",
          height: "calc(100vh - 52px)",
          backgroundColor: colors.sidebarBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: `0.5px solid ${colors.borderLight}`,
          padding: "12px 10px",
          position: "fixed",
          top: "52px",
          left: 0,
          zIndex: 30,
          overflowY: "auto",
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: colors.textMuted,
            padding: "6px 10px 8px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Navigation
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/tasks"}
              onClick={onClose}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 10px",
                borderRadius: "7px",
                fontSize: "13px",
                fontWeight: isActive ? 500 : 400,
                textDecoration: "none",
                color: isActive ? colors.accent : colors.textSecondary,
                backgroundColor: isActive ? colors.accentSoft : "transparent",
                transition: "all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                letterSpacing: "-0.01em",
              })}
              onMouseEnter={(e) => {
                const active = e.currentTarget.style.backgroundColor === colors.accentSoft;
                if (!active) {
                  e.currentTarget.style.backgroundColor = colors.surfaceHover;
                }
              }}
              onMouseLeave={(e) => {
                const link = e.currentTarget;
                if (link.style.color !== colors.accent) {
                  link.style.backgroundColor = "transparent";
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
