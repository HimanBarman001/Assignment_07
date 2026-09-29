import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import colors from "../../constants/colors";

/**
 * Custom Dropdown — macOS-style select with animated popover menu.
 * Replaces native <select> for a premium look.
 */
export default function Dropdown({
  label,
  value,
  options,
  onChange,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div style={{ marginBottom: "18px" }} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 600,
            color: colors.textSecondary,
            marginBottom: "6px",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {/* Trigger button */}
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%",
            height: "40px",
            padding: "0 36px 0 14px",
            fontSize: "14px",
            fontFamily: "'Inter', -apple-system, sans-serif",
            color: colors.textPrimary,
            backgroundColor: colors.surface,
            border: `1.5px solid ${isOpen ? colors.accent : colors.border}`,
            borderRadius: colors.radiusSm,
            outline: "none",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            boxShadow: isOpen ? "0 0 0 3px rgba(0, 122, 255, 0.12)" : "none",
            letterSpacing: "-0.01em",
          }}
        >
          {/* Color dot for priority options */}
          {selectedOption?.dot && (
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: selectedOption.dot,
              flexShrink: 0,
            }} />
          )}
          <span style={{ flex: 1 }}>{selectedOption?.label || "Select..."}</span>
          <ChevronDown
            size={15}
            color={colors.textMuted}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: `translateY(-50%) rotate(${isOpen ? "180deg" : "0deg"})`,
              transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              backgroundColor: colors.surface,
              border: `0.5px solid ${colors.border}`,
              borderRadius: colors.radiusSm,
              boxShadow: colors.shadowLg,
              zIndex: 50,
              padding: "4px",
              animation: "dropdownFadeIn 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <style>{`
              @keyframes dropdownFadeIn {
                from { opacity: 0; transform: translateY(-4px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
            `}</style>

            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    fontSize: "13px",
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    fontWeight: isSelected ? 500 : 400,
                    color: isSelected ? colors.accent : colors.textPrimary,
                    backgroundColor: isSelected ? colors.accentSoft : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 0.1s ease",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = colors.surfaceSoft;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {/* Color dot */}
                  {option.dot && (
                    <span style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: option.dot,
                      flexShrink: 0,
                    }} />
                  )}
                  <span style={{ flex: 1 }}>{option.label}</span>
                  {isSelected && (
                    <Check size={14} color={colors.accent} strokeWidth={2.5} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
