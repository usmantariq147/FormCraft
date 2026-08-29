import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { LAYOUT_OPTIONS } from "./layoutOptions";

export const AddRowSection = ({ onAddRow, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectLayout = (cols) => {
    onAddRow(cols);
    setIsOpen(false);
  };

  return (
    <div className="my-4 text-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`btn rounded-circle p-3 border-2 border-dashed shadow-sm transition-all ${
            isDark
              ? "btn-outline-light border-secondary"
              : "btn-outline-primary border-primary"
          }`}
          title="Add New Row"
        >
          <Plus size={24} />
        </button>
      ) : (
        <div
          className={`p-3 rounded border shadow-sm mx-auto ${
            isDark ? "bg-dark text-white border-secondary" : "bg-white border-light"
          }`}
          style={{ maxWidth: "500px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold small">Select Structure / Layout</span>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm text-secondary p-0 border-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            {LAYOUT_OPTIONS.map(({ id, label, icon: Icon, cols }) => (
              <button
                key={id}
                onClick={() => handleSelectLayout(cols)}
                className={`btn btn-sm flex-fill p-3 border d-flex flex-column align-items-center gap-2 ${
                  isDark ? "btn-outline-secondary text-white" : "btn-light"
                }`}
              >
                <Icon size={24} />
                <span className="extra-small">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};