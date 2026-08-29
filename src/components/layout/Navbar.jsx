import React from 'react';
import { Wrench, Code2, Layout, Trash2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onClearAll, fieldsCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary px-3 py-2">
      <div className="container-fluid">
        {/* Brand & Logo */}
        <span className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4">
          <Wrench className="text-primary" size={24} />
          FormCraft
          <span className="badge bg-primary fs-6 fw-normal ms-2">v1.0 MVP</span>
        </span>

        {/* View Switcher Tabs */}
        <div className="btn-group mx-auto" role="group">
          <button
            type="button"
            className={`btn btn-sm d-flex align-items-center gap-2 ${
              activeTab === 'canvas' ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveTab('canvas')}
          >
            <Layout size={16} /> Visual Canvas
          </button>
          <button
            type="button"
            className={`btn btn-sm d-flex align-items-center gap-2 ${
              activeTab === 'code' ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveTab('code')}
          >
            <Code2 size={16} /> HTML5 Markup Code
          </button>
        </div>

        {/* Action Controls */}
        <div className="d-flex align-items-center gap-2">
          {fieldsCount > 0 && (
            <button
              onClick={onClearAll}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
              title="Clear All Fields"
            >
              <Trash2 size={15} /> Clear All
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}