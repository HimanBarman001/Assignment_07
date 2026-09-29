import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import CompletedTasks from "./pages/CompletedTasks";
import initialTasks from "./data/tasks";

/**
 * App component — root of the application.
 * Sets up routing architecture with:
 * - Public route: /login
 * - Protected routes: /dashboard, /tasks, /tasks/add, /tasks/:taskId, /completed
 * - Nested routes under /tasks with Outlet
 * - Dynamic routes via /tasks/:taskId
 * - Unknown route fallback
 */
export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  // Task management functions (Assignment 6 functionality)
  function handleAddTask(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  function handleUpdateTask(taskId, updates) {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public route — Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes — wrapped in AppLayout for Header + Sidebar + Outlet */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />

            {/* Nested routes under /tasks */}
            <Route
              path="/tasks"
              element={
                <Tasks
                  tasks={tasks}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              }
            >
              {/* /tasks/add — nested route */}
              <Route path="add" element={<AddTask onAddTask={handleAddTask} />} />

              {/* /tasks/:taskId — dynamic route using URL parameters */}
              <Route
                path=":taskId"
                element={
                  <TaskDetails
                    tasks={tasks}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                  />
                }
              />
            </Route>

            <Route path="/completed" element={<CompletedTasks tasks={tasks} />} />
          </Route>

          {/* Default route — redirect to dashboard (ProtectedRoute handles auth check) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Unknown routes — redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
