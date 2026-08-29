import React, { useState } from "react";
import Header from "../src/components/layout/Header";
import Sidebar from "../src/components/builder/Sidebar";
import Canvas from "../src/components/builder/Canvas";
import Inspector from "../src/components/inspector/Inspector";
import FullScreenModal from "../src/components/preview/FullScreenModal";
import CodeView from "../src/components/export/CodeView";

export default function App() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  // App Theme State ('light' | 'dark')
  const [appTheme, setAppTheme] = useState('light');

  // Modals & Panels Toggles
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inspectorCollapsed, setInspectorCollapsed] = useState(false);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const toggleTheme = () => {
    setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleAddField = (fieldType) => {
    const defaultOptions = ['checkbox', 'radio', 'select'].includes(fieldType)
      ? [
          { label: 'Option 1', value: 'option_1' },
          { label: 'Option 2', value: 'option_2' },
        ]
      : [];

      const newField = {
        id: `field_${Date.now()}`,
        type: fieldType,
        label: fieldType === 'button' ? 'Submit' : `New ${fieldType} Field`,
        name: `input_${Date.now()}`,
        customId: `id_${Date.now()}`,
        customClass: '',
        helpText: '',
        placeholder: ['text', 'password', 'email', 'number', 'tel', 'url', 'textarea', 'search'].includes(fieldType) ? 'Enter value...' : '',
        defaultValue: '',
        required: false,
        disabled: false,
        readOnly: false,
        autoFocus: false,
        // Validation & Regex
        minLength: '',
        maxLength: '',
        pattern: '',
        patternError: '',
        // Option fields
        options: defaultOptions,
        optionsLayout: 'column',
        // Numeric / Range
        min: ['number', 'range'].includes(fieldType) ? 0 : '',
        max: ['number', 'range'].includes(fieldType) ? 100 : '',
        step: ['number', 'range'].includes(fieldType) ? 1 : '',
        // File & Textarea
        accept: fieldType === 'file' ? '' : '',
        multiple: false,
        rows: fieldType === 'textarea' ? 4 : undefined,
        buttonType: fieldType === 'button' ? 'submit' : undefined,
        style: {
          backgroundColor: fieldType === 'button' ? '#0d6efd' : '#ffffff',
          color: fieldType === 'button' ? '#ffffff' : '#212529',
          fontSize: '14px',
          fontWeight: '400',
          textTransform: 'none',
          textAlign: 'left',
          borderRadius: '6px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#dee2e6',
          padding: fieldType === 'button' ? '8px 16px' : '6px 12px',
          margin: '0px',
          width: '100%',
          height: 'auto',
          boxShadow: 'none',
          opacity: '1',
        },
        hoverStyle: {
          backgroundColor: fieldType === 'button' ? '#0b5ed7' : '#ffffff',
          color: fieldType === 'button' ? '#ffffff' : '#212529',
          borderColor: fieldType === 'button' ? '#0a58ca' : '#ced4da',
        },
        labelStyle: {
          color: '#212529',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '4px',
        },
      };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const handleUpdateField = (updatedField) => {
    setFields(fields.map((f) => (f.id === updatedField.id ? updatedField : f)));
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const handleConfirmClear = () => {
    setFields([]);
    setSelectedFieldId(null);
    setShowClearModal(false);
  };

  return (
    <div className={`d-flex flex-column vh-100 w-100 overflow-hidden ${appTheme === 'dark' ? 'bg-black text-white' : 'bg-light text-dark'}`}>
      <Header
        onClearForm={() => setShowClearModal(true)}
        onOpenCodeModal={() => setShowCodeModal(true)}
        onPreview={() => setShowPreviewModal(true)}
        theme={appTheme}
        onToggleTheme={toggleTheme}
      />

      <div className="d-flex flex-grow-1 overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>
        {/* Sidebar */}
        <div
          className="flex-shrink-0 h-100"
          style={{
            width: sidebarCollapsed ? '50px' : '280px',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
        >
          <Sidebar
            onAddField={handleAddField}
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            theme={appTheme}
          />
        </div>

        {/* Canvas */}
        <div className={`flex-grow-1 overflow-y-auto p-4 h-100 ${appTheme === 'dark' ? 'bg-dark bg-opacity-50' : 'bg-light'}`}>
          <div className="container-fluid max-w-lg mx-auto">
            <Canvas
              fields={fields}
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
              onDeleteField={handleDeleteField}
              theme={appTheme}
            />
          </div>
        </div>

        {/* Inspector */}
        <div
          className="flex-shrink-0 h-100"
          style={{
            width: inspectorCollapsed ? '50px' : '320px',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
        >
          <Inspector
            selectedField={selectedField}
            onUpdateField={handleUpdateField}
            isCollapsed={inspectorCollapsed}
            onToggle={() => setInspectorCollapsed(!inspectorCollapsed)}
            theme={appTheme}
          />
        </div>
      </div>

      {/* Export Code Modal */}
      {showCodeModal && (
        <CodeView
          fields={fields}
          onClose={() => setShowCodeModal(false)}
          theme={appTheme}
        />
      )}

      {/* Live Preview Modal */}
      <FullScreenModal
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        fields={fields}
        theme={appTheme}
        onToggleTheme={toggleTheme}
      />

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content text-center p-3">
              <h6 className="fw-bold mb-3">Clear Entire Form?</h6>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-light btn-sm" onClick={() => setShowClearModal(false)}>Cancel</button>
                <button className="btn btn-danger btn-sm" onClick={handleConfirmClear}>Yes, Clear</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}