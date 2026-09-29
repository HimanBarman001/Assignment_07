import { Link } from "react-router-dom";
import { Calendar, Tag, ChevronRight } from "lucide-react";
import colors from "../../constants/colors";

/**
 * TaskCard — premium macOS-inspired card with layered design.
 * Features: colored left accent bar, hover lift, chevron indicator.
 */

const priorityConfig = {
  high: { color: colors.error, bg: colors.errorSoft, label: "High" },
  medium: { color: colors.warning, bg: colors.warningSoft, label: "Medium" },
  low: { color: colors.success, bg: colors.successSoft, label: "Low" },
};

export default function TaskCard({ task }) {
  const priority = priorityConfig[task.priority] || priorityConfig.low;

  return (
    <Link
      to={`/tasks/${task.id}`}
      style={{
        display: "block",
        backgroundColor: colors.surface,
        border: `0.5px solid ${colors.borderLight}`,
        borderRadius: colors.radius,
        textDecoration: "none",
        boxShadow: colors.shadowSm,
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = colors.shadowMd;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.querySelector('.card-chevron').style.opacity = "1";
        e.currentTarget.querySelector('.card-chevron').style.transform = "translateX(0)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = colors.shadowSm;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = colors.borderLight;
        e.currentTarget.querySelector('.card-chevron').style.opacity = "0";
        e.currentTarget.querySelector('.card-chevron').style.transform = "translateX(-4px)";
      }}
    >
      {/* Colored top accent bar */}
      <div style={{
        height: "3px",
        backgroundColor: priority.color,
        borderRadius: "12px 12px 0 0",
      }} />

      <div style={{ padding: "16px 18px 14px" }}>
        {/* Top row: Priority badge + Chevron */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: colors.radiusFull,
              backgroundColor: priority.bg,
              color: priority.color,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: priority.color,
            }} />
            {priority.label}
          </span>

          <div
            className="card-chevron"
            style={{
              opacity: 0,
              transform: "translateX(-4px)",
              transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              color: colors.textMuted,
            }}
          >
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: colors.textPrimary,
            lineHeight: "1.4",
            letterSpacing: "-0.02em",
            marginBottom: "6px",
          }}
        >
          {task.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            color: colors.textSecondary,
            lineHeight: "1.55",
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.description}
        </p>

        {/* Bottom meta — separated by a subtle top border */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          paddingTop: "12px",
          borderTop: `0.5px solid ${colors.borderLight}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Tag size={13} color={colors.textMuted} strokeWidth={1.8} />
            <span style={{
              fontSize: "12px",
              color: colors.textMuted,
              fontWeight: 500,
            }}>
              {task.category}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Calendar size={13} color={colors.textMuted} strokeWidth={1.8} />
            <span style={{
              fontSize: "12px",
              color: colors.textMuted,
              fontWeight: 500,
            }}>
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
