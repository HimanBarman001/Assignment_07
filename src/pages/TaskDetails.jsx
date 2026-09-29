import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, Tag, Flag, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import colors from "../constants/colors";

/**
 * TaskDetails page — macOS-style detail view.
 * Uses useParams() to read task ID from URL (dynamic route).
 */

const priorityConfig = {
  high: { bg: colors.errorSoft, text: colors.error, dot: colors.error },
  medium: { bg: colors.warningSoft, text: "#B87A1E", dot: colors.warning },
  low: { bg: colors.successSoft, text: "#1B9E4B", dot: colors.success },
};

export default function TaskDetails({ tasks, onUpdateTask, onDeleteTask }) {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => String(t.id) === taskId);

  if (!task) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "72px 20px",
          backgroundColor: colors.surface,
          borderRadius: colors.radius,
          border: `0.5px solid ${colors.borderLight}`,
          boxShadow: colors.shadowSm,
        }}
      >
        <h2 style={{
          fontSize: "17px",
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}>
          Task not found
        </h2>
        <p style={{ fontSize: "14px", color: colors.textSecondary, marginBottom: "20px" }}>
          The task you are looking for does not exist.
        </p>
        <Link
          to="/tasks"
          style={{
            fontSize: "13px",
            color: colors.accent,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← Back to Tasks
        </Link>
      </div>
    );
  }

  const priority = priorityConfig[task.priority] || priorityConfig.low;

  function handleComplete() {
    onUpdateTask(task.id, { status: "completed" });
    navigate("/tasks");
  }

  function handleDelete() {
    onDeleteTask(task.id);
    navigate("/tasks");
  }

  function handleReopen() {
    onUpdateTask(task.id, { status: "pending" });
  }

  return (
    <div>
      {/* Back navigation */}
      <Link
        to="/tasks"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "13px",
          color: colors.accent,
          textDecoration: "none",
          marginBottom: "18px",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        <ArrowLeft size={14} />
        Back to Tasks
      </Link>

      <div
        style={{
          maxWidth: "640px",
          backgroundColor: colors.surface,
          border: `0.5px solid ${colors.borderLight}`,
          borderRadius: colors.radius,
          boxShadow: colors.shadowSm,
          overflow: "hidden",
        }}
      >
        {/* Header section */}
        <div style={{ padding: "24px 28px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "12px" }}>
            <h1 style={{
              fontSize: "20px",
              fontWeight: 700,
              color: colors.textPrimary,
              flex: 1,
              letterSpacing: "-0.03em",
              lineHeight: "1.3",
            }}>
              {task.title}
            </h1>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: colors.radiusFull,
                backgroundColor: task.status === "completed" ? colors.successSoft : colors.warningSoft,
                color: task.status === "completed" ? "#1B9E4B" : "#B87A1E",
                textTransform: "capitalize",
                flexShrink: 0,
              }}
            >
              {task.status}
            </span>
          </div>

          <p style={{
            fontSize: "14px",
            color: colors.textSecondary,
            lineHeight: "1.6",
            letterSpacing: "-0.01em",
          }}>
            {task.description}
          </p>
        </div>

        {/* Meta info — macOS-style key-value rows */}
        <div
          style={{
            padding: "16px 28px",
            backgroundColor: colors.surfaceSoft,
            borderTop: `0.5px solid ${colors.borderLight}`,
            borderBottom: `0.5px solid ${colors.borderLight}`,
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <Flag size={14} color={priority.text} />
            <span style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 500 }}>Priority</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: colors.radiusFull,
                backgroundColor: priority.bg,
                color: priority.text,
                textTransform: "capitalize",
              }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: priority.dot }} />
              {task.priority}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <Tag size={14} color={colors.textMuted} />
            <span style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 500 }}>Category</span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: colors.textPrimary }}>{task.category}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <Calendar size={14} color={colors.textMuted} />
            <span style={{ fontSize: "12px", color: colors.textMuted, fontWeight: 500 }}>Due</span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: colors.textPrimary }}>{task.dueDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: "20px 28px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {task.status === "pending" ? (
            <Button variant="success" onClick={handleComplete}>
              Mark as Complete
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleReopen}>
              Reopen Task
            </Button>
          )}
          <Button variant="danger" onClick={handleDelete}>
            Delete Task
          </Button>
        </div>
      </div>
    </div>
  );
}
