import colors from "../../constants/colors";

/**
 * TaskFilters — compact inline segmented controls for priority and category.
 * Designed to sit on the same row as the page heading.
 */

const priorities = ["all", "high", "medium", "low"];
const categories = ["all", "Academic", "Project", "Learning", "Personal"];

export default function TaskFilters({ priorityFilter, categoryFilter, onPriorityChange, onCategoryChange }) {
  const chipStyle = (active) => ({
    padding: "5px 12px",
    fontSize: "12px",
    fontWeight: active ? 600 : 500,
    borderRadius: "6px",
    border: "none",
    backgroundColor: active ? colors.surface : "transparent",
    color: active ? colors.textPrimary : colors.textMuted,
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fontFamily: "'Inter', -apple-system, sans-serif",
    textTransform: "capitalize",
    boxShadow: active ? colors.shadowSm : "none",
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
  });

  const groupStyle = {
    display: "inline-flex",
    gap: "2px",
    padding: "2px",
    backgroundColor: colors.surfaceSoft,
    borderRadius: "8px",
    border: `0.5px solid ${colors.borderLight}`,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <div style={groupStyle}>
        {priorities.map((p) => (
          <button
            key={p}
            onClick={() => onPriorityChange(p)}
            style={chipStyle(priorityFilter === p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Divider dot */}
      <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: colors.borderLight, flexShrink: 0 }} />

      <div style={groupStyle}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            style={chipStyle(categoryFilter === c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
