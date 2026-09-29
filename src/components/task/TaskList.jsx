import TaskCard from "./TaskCard";
import EmptyState from "../common/EmptyState";
import { ListTodo } from "lucide-react";

/**
 * TaskList component — renders a responsive grid of TaskCards.
 * Shows EmptyState when no tasks match the filter.
 */
export default function TaskList({ tasks, emptyTitle, emptyDescription }) {
  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon={<ListTodo size={28} strokeWidth={1.5} />}
        title={emptyTitle || "No tasks found"}
        description={emptyDescription || "There are no tasks to display."}
      />
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "14px",
      }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
