import TaskForm from "../components/task/TaskForm";
import colors from "../constants/colors";

/**
 * AddTask page — macOS-style card form.
 */
export default function AddTask({ onAddTask }) {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: 700,
          color: colors.textPrimary,
          marginBottom: "4px",
          letterSpacing: "-0.03em",
        }}>
          Add Task
        </h1>
        <p style={{ fontSize: "14px", color: colors.textSecondary, letterSpacing: "-0.01em" }}>
          Create a new task.
        </p>
      </div>

      <div
        style={{
          maxWidth: "560px",
          backgroundColor: colors.surface,
          border: `0.5px solid ${colors.borderLight}`,
          borderRadius: colors.radius,
          padding: "28px",
          boxShadow: colors.shadowSm,
        }}
      >
        <TaskForm onAddTask={onAddTask} />
      </div>
    </div>
  );
}
