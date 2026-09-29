import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ListTodo, PlusCircle, CheckCircle, Clock, ArrowUpRight } from "lucide-react";
import colors from "../constants/colors";

/**
 * Dashboard page — macOS-inspired overview with widget-style stat cards.
 */
export default function Dashboard({ tasks }) {
  const { user } = useAuth();

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");
  const highPriority = tasks.filter((t) => t.priority === "high" && t.status === "pending");

  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      color: colors.accent,
      bg: colors.accentSoft,
      link: "/tasks",
    },
    {
      label: "Pending",
      value: pendingTasks.length,
      icon: Clock,
      color: colors.warning,
      bg: colors.warningSoft,
      link: "/tasks",
    },
    {
      label: "Completed",
      value: completedTasks.length,
      icon: CheckCircle,
      color: colors.success,
      bg: colors.successSoft,
      link: "/completed",
    },
    {
      label: "High Priority",
      value: highPriority.length,
      icon: PlusCircle,
      color: colors.error,
      bg: colors.errorSoft,
      link: "/tasks",
    },
  ];

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: 700,
          color: colors.textPrimary,
          marginBottom: "4px",
          letterSpacing: "-0.03em",
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: colors.textSecondary, letterSpacing: "-0.01em" }}>
          Welcome back, {user?.username}. Here is your task overview.
        </p>
      </div>

      {/* Stat widgets */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "18px",
              backgroundColor: colors.surface,
              border: `0.5px solid ${colors.borderLight}`,
              borderRadius: colors.radius,
              textDecoration: "none",
              boxShadow: colors.shadowSm,
              transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = colors.shadowMd;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = colors.shadowSm;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: colors.radius,
                backgroundColor: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <stat.icon size={20} color={stat.color} strokeWidth={2} />
            </div>
            <div>
              <p style={{
                fontSize: "24px",
                fontWeight: 700,
                color: colors.textPrimary,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: "12px",
                color: colors.textSecondary,
                marginTop: "2px",
                fontWeight: 500,
              }}>
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent pending tasks section */}
      <div
        style={{
          backgroundColor: colors.surface,
          border: `0.5px solid ${colors.borderLight}`,
          borderRadius: colors.radius,
          boxShadow: colors.shadowSm,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: `0.5px solid ${colors.borderLight}`,
          }}
        >
          <h2 style={{
            fontSize: "15px",
            fontWeight: 600,
            color: colors.textPrimary,
            letterSpacing: "-0.02em",
          }}>
            Recent Pending Tasks
          </h2>
          <Link
            to="/tasks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "12px",
              color: colors.accent,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            View all
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {pendingTasks.length === 0 ? (
          <p style={{
            fontSize: "14px",
            color: colors.textSecondary,
            padding: "28px 20px",
            textAlign: "center",
          }}>
            No pending tasks. You are all caught up!
          </p>
        ) : (
          <div>
            {pendingTasks.slice(0, 4).map((task, index) => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 20px",
                  textDecoration: "none",
                  borderBottom: index < Math.min(pendingTasks.length, 4) - 1 ? `0.5px solid ${colors.borderLight}` : "none",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surfaceSoft;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: colors.textPrimary,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {task.title}
                  </p>
                  <p style={{ fontSize: "11px", color: colors.textMuted, marginTop: "2px", fontWeight: 500 }}>
                    {task.category} · {task.dueDate}
                  </p>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: colors.radiusFull,
                    textTransform: "capitalize",
                    flexShrink: 0,
                    marginLeft: "12px",
                    backgroundColor: task.priority === "high" ? colors.errorSoft : task.priority === "medium" ? colors.warningSoft : colors.successSoft,
                    color: task.priority === "high" ? colors.error : task.priority === "medium" ? "#B87A1E" : "#1B9E4B",
                  }}
                >
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    backgroundColor: task.priority === "high" ? colors.error : task.priority === "medium" ? colors.warning : colors.success,
                  }} />
                  {task.priority}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
