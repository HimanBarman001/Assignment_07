import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TaskList from "../components/task/TaskList";
import TaskFilters from "../components/task/TaskFilters";
import colors from "../constants/colors";

/**
 * Tasks page — heading and filters on the same row.
 * Uses Outlet for nested routes (/tasks/add, /tasks/:taskId).
 */
export default function Tasks({ tasks, onUpdateTask, onDeleteTask }) {
  const location = useLocation();
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // If on a nested route, render only the Outlet
  const isNestedRoute = location.pathname !== "/tasks";
  if (isNestedRoute) {
    return <Outlet />;
  }

  const pendingTasks = tasks.filter((t) => t.status === "pending");

  const filteredTasks = pendingTasks.filter((task) => {
    const matchPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchCategory = categoryFilter === "all" || task.category === categoryFilter;
    return matchPriority && matchCategory;
  });

  return (
    <div>
      {/* Heading + Filters on the same line */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}>
        <div style={{ flexShrink: 0 }}>
          <h1 style={{
            fontSize: "24px",
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: "4px",
            letterSpacing: "-0.03em",
          }}>
            Tasks
          </h1>
          <p style={{ fontSize: "14px", color: colors.textSecondary, letterSpacing: "-0.01em" }}>
            {filteredTasks.length} pending {filteredTasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>

        <TaskFilters
          priorityFilter={priorityFilter}
          categoryFilter={categoryFilter}
          onPriorityChange={setPriorityFilter}
          onCategoryChange={setCategoryFilter}
        />
      </div>

      <TaskList
        tasks={filteredTasks}
        emptyTitle="No matching tasks"
        emptyDescription="Try adjusting your filters to find tasks."
      />
    </div>
  );
}
