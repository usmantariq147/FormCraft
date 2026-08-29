import React from "react";
import { FormInput, Eye, Code, Trash2, Sun, Moon } from "lucide-react";

export default function Header({
  onClearForm,
  onOpenCodeModal,
  onPreview,
  theme,
  onToggleTheme,
}) {
  const isDark = theme === "dark";

  return (
    <header
      className={`px-4 py-2.5 d-flex align-items-center justify-content-between border-bottom shadow-sm flex-shrink-0 transition-all ${
        isDark
          ? "bg-dark text-white border-secondary"
          : "bg-white text-dark border-light"
      }`}
      style={{ height: "60px" }}
    >
      {/* Logo & Title */}
      <div className="d-flex align-items-center gap-2">
        <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center">
          <FormInput size={20} />
        </div>
        <div>
          <h6 className={`fw-bold mb-0 ${isDark ? "text-white" : "text-dark"}`}>
            Form Builder Pro{" "}
            <span
              className="badge bg-primary-subtle text-primary ms-1"
              style={{ fontSize: "10px" }}
            >
              v1.0
            </span>
          </h6>
          <span
            className={`extra-small ${
              isDark ? "text-light opacity-75" : "text-muted"
            }`}
          >
            Drag, Style & Customize Forms
          </span>
        </div>
      </div>

      {/* Actions & Theme Toggle Switch */}
      <div className="d-flex align-items-center gap-2">
        {/* App Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="btn btn-sm d-flex align-items-center gap-1.5 me-2"
          style={{
            backgroundColor: isDark ? "#ffc107" : "transparent",
            color: isDark ? "#000000" : "#212529",
            borderColor: isDark ? "#ffc107" : "#212529",
            fontWeight: "600",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            if (isDark) {
              e.currentTarget.style.backgroundColor = "#e0a800";
              e.currentTarget.style.color = "#000000";
            } else {
              e.currentTarget.style.backgroundColor = "#212529";
              e.currentTarget.style.color = "#ffffff";
            }
          }}
          onMouseLeave={(e) => {
            if (isDark) {
              e.currentTarget.style.backgroundColor = "#ffc107";
              e.currentTarget.style.color = "#000000";
            } else {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#212529";
            }
          }}
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
        >
          {isDark ? <Sun size={16} color="#000000" /> : <Moon size={16} />}
          <span className="d-none d-md-inline">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <button
          type="button"
          onClick={onClearForm}
          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1.5"
        >
          <Trash2 size={16} />
          <span>Clear All</span>
        </button>

        <button
          type="button"
          onClick={onPreview}
          className={`btn btn-sm d-flex align-items-center gap-1.5 ${
            isDark ? "btn-outline-light" : "btn-outline-secondary"
          }`}
        >
          <Eye size={16} />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={onOpenCodeModal}
          className="btn btn-primary btn-sm d-flex align-items-center gap-1.5"
        >
          <Code size={16} />
          <span>View / Export Code</span>
        </button>
      </div>
    </header>
  );
}