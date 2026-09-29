import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import colors from "../../constants/colors";

/**
 * TaskForm component — uses custom Dropdown for priority and category.
 */

const priorityOptions = [
  { value: "high", label: "High", dot: colors.error },
  { value: "medium", label: "Medium", dot: colors.warning },
  { value: "low", label: "Low", dot: colors.success },
];

const categoryOptions = [
  { value: "Academic", label: "Academic" },
  { value: "Project", label: "Project" },
  { value: "Learning", label: "Learning" },
  { value: "Personal", label: "Personal" },
];

export default function TaskForm({ onAddTask }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "Academic",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Task title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTask({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      id: Date.now(),
      status: "pending",
    });

    navigate("/tasks");
  }

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: colors.textSecondary,
    marginBottom: "6px",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        id="title"
        name="title"
        label="Task Title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        error={errors.title}
      />

      {/* Description textarea */}
      <div style={{ marginBottom: "18px" }}>
        <label htmlFor="description" style={labelStyle}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "10px 14px",
            fontSize: "14px",
            fontFamily: "'Inter', -apple-system, sans-serif",
            color: colors.textPrimary,
            backgroundColor: colors.surface,
            border: `1.5px solid ${errors.description ? colors.error : colors.border}`,
            borderRadius: colors.radiusSm,
            outline: "none",
            resize: "vertical",
            transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            letterSpacing: "-0.01em",
            lineHeight: "1.5",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = colors.accent;
            e.target.style.boxShadow = "0 0 0 3px rgba(0, 122, 255, 0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.description ? colors.error : colors.border;
            e.target.style.boxShadow = "none";
          }}
        />
        {errors.description && (
          <p style={{ fontSize: "12px", color: colors.error, marginTop: "6px", fontWeight: 500 }}>
            {errors.description}
          </p>
        )}
      </div>

      {/* Priority & Category dropdowns in a row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <Dropdown
          id="priority"
          label="Priority"
          value={formData.priority}
          options={priorityOptions}
          onChange={(val) => handleChange("priority", val)}
        />

        <Dropdown
          id="category"
          label="Category"
          value={formData.category}
          options={categoryOptions}
          onChange={(val) => handleChange("category", val)}
        />
      </div>

      <Input
        id="dueDate"
        name="dueDate"
        label="Due Date"
        type="date"
        value={formData.dueDate}
        onChange={(e) => handleChange("dueDate", e.target.value)}
        error={errors.dueDate}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Button type="submit">Add Task</Button>
        <Button variant="secondary" onClick={() => navigate("/tasks")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
