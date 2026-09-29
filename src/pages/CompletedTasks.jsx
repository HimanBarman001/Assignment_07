import TaskList from "../components/task/TaskList";
import { CheckCircle } from "lucide-react";
import colors from "../constants/colors";

/**
 * CompletedTasks page — macOS-consistent completed tasks view.
 */
export default function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter((t) => t.status === "completed");

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
          Completed Tasks
        </h1>
        <p style={{ fontSize: "14px", color: colors.textSecondary, letterSpacing: "-0.01em" }}>
          Tasks you have finished.
        </p>
      </div>

      <TaskList
        tasks={completedTasks}
        emptyTitle="No completed tasks"
        emptyDescription="Tasks you mark as complete will appear here."
      />
    </div>
  );
}
