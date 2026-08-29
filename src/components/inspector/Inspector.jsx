import React, { useState } from "react";
import GeneralSection from "./sections/GeneralSection";
import OptionsSection from "./sections/OptionsSection";
import StyleSection from "./sections/StyleSection";
import ValidationSection from "./sections/ValidationSection";
import {
  AlertCircle,
  Sparkles,
  ChevronLeft,
  Sliders,
} from "lucide-react";

export default function Inspector({
  selectedField,
  onUpdateField,
  isCollapsed,
  onToggle,
  theme,
}) {
  const [activeTab, setActiveTab] = useState("general");
  const isDark = theme === "dark";

  if (isCollapsed) {
    return (
      <div
        className={`h-100 border-start d-flex flex-column align-items-center py-2 ${
          isDark ? "bg-dark border-secondary" : "bg-light border-light-subtle"
        }`}
      >
        <button
          className="btn btn-sm btn-outline-secondary p-1"
          onClick={onToggle}
          title="Expand Inspector"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    );
  }

  if (!selectedField) {
    return (
      <div
        className={`h-100 border-start d-flex flex-column ${
          isDark ? "bg-dark text-white border-secondary" : "bg-white text-dark"
        }`}
      >
        <div
          className={`p-3 border-bottom d-flex align-items-center justify-content-between ${
            isDark ? "border-secondary bg-black bg-opacity-40" : "bg-light"
          }`}
        >
          <h6 className={`fw-bold mb-0 ${isDark ? "text-white" : "text-dark"}`}>
            Inspector
          </h6>
          <button
            className="btn btn-sm btn-outline-secondary p-1"
            onClick={onToggle}
            title="Collapse Inspector"
          >
            <ChevronLeft size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
        <div
          className={`p-3 flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center ${
            isDark ? "text-white-50" : "text-muted"
          }`}
        >
          <p className="small mb-0">
            Select an element on the canvas to inspect and edit its properties.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-100 border-start d-flex flex-column ${
        isDark ? "bg-dark text-white border-secondary" : "bg-white text-dark"
      }`}
    >
      {/* Header - Fixed Text Contrast for Dark Mode */}
      <div
        className={`p-3 border-bottom d-flex align-items-center justify-content-between ${
          isDark ? "border-secondary bg-black bg-opacity-40" : "bg-light"
        }`}
      >
        <div>
          <h6
            className={`fw-bold mb-0 text-capitalize ${
              isDark ? "text-white" : "text-dark"
            }`}
          >
            {selectedField.type} Inspector
          </h6>
          <small
            className={`extra-small fw-semibold ${
              isDark ? "text-info" : "text-secondary"
            }`}
          >
            ID: <span className="user-select-all">{selectedField.id}</span>
          </small>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary p-1"
          onClick={onToggle}
        >
          <ChevronLeft size={18} style={{ transform: "rotate(180deg)" }} />
        </button>
      </div>

      {/* Tabs */}
      <div
        className={`d-flex border-bottom ${
          isDark ? "border-secondary bg-black bg-opacity-25" : "bg-light"
        }`}
      >
        {[
          {
            id: "general",
            label: "Elements",
            Icon: Sliders,
            iconClass: activeTab === "general" ? "text-white" : "text-primary",
          },
          {
            id: "style",
            label: "Styling",
            Icon: Sparkles,
            iconClass: "text-warning",
          },
          {
            id: "validation",
            label: "Validation",
            Icon: AlertCircle,
            iconClass: "text-danger",
          },
        ].map(({ id, label, Icon, iconClass }) => (
          <button
            key={id}
            className={`flex-fill btn btn-sm rounded-0 border-0 py-2 fw-semibold extra-small d-flex align-items-center justify-content-center gap-1 ${
              activeTab === id
                ? "btn-primary text-white"
                : isDark
                ? "text-white-50"
                : "text-secondary"
            }`}
            onClick={() => setActiveTab(id)}
          >
            <Icon className={iconClass} size={18} /> {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-3 overflow-y-auto flex-grow-1">
        {activeTab === "general" && (
          <>
            <GeneralSection
              field={selectedField}
              onUpdate={onUpdateField}
              theme={theme}
            />
            {["select", "radio", "checkbox"].includes(selectedField.type) && (
              <OptionsSection
                field={selectedField}
                onUpdate={onUpdateField}
                theme={theme}
              />
            )}
          </>
        )}

        {activeTab === "style" && (
          <StyleSection
            field={selectedField}
            onUpdate={onUpdateField}
            theme={theme}
          />
        )}

        {activeTab === "validation" && (
          <ValidationSection
            field={selectedField}
            onUpdate={onUpdateField}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}
