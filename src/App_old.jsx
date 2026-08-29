import React, { useState } from "react";
import Header from "../src/components/layout/Header";
import Sidebar from "../src/components/builder/Sidebar";
import Canvas from "../src/components/builder/Canvas";
import Inspector from "../src/components/inspector/Inspector";
import FullScreenModal from "../src/components/preview/FullScreenModal";

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
      helpText: '',
      placeholder: ['text', 'password', 'textarea', 'number'].includes(fieldType) ? 'Enter value...' : '',
      defaultValue: '',
      required: false,
      disabled: false,
      readOnly: false,
      autoFocus: false,
      options: defaultOptions,
      optionsLayout: 'column', // 'column' | 'row'
      min: fieldType === 'range' ? 0 : '',
      max: fieldType === 'range' ? 100 : '',
      step: fieldType === 'range' ? 1 : '',
      accept: fieldType === 'file' ? '' : '',
      multiple: false,
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
        cursor: 'default',
        zIndex: '1',
      },
      hoverStyle: {
        backgroundColor: fieldType === 'button' ? '#0b5ed7' : '#ffffff',
        color: fieldType === 'button' ? '#ffffff' : '#212529',
        borderColor: fieldType === 'button' ? '#0a58ca' : '#ced4da',
        transform: 'none',
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

  const generateFullHTMLCode = () => {
    const formContentHTML = fields
      .map((f) => {
        const isButton = f.type === 'button';
        const style = f.style || {};
        const labelStyle = f.labelStyle || {};
        const options = f.options || [];

        const inlineInputCss = `color: ${style.color || '#212529'}; background-color: ${style.backgroundColor || '#ffffff'}; font-size: ${style.fontSize || '14px'}; font-weight: ${style.fontWeight || '400'}; text-align: ${style.textAlign || 'left'}; text-transform: ${style.textTransform || 'none'}; border: ${style.borderWidth || '1px'} ${style.borderStyle || 'solid'} ${style.borderColor || '#dee2e6'}; border-radius: ${style.borderRadius || '6px'}; padding: ${style.padding || '6px 12px'}; margin: ${style.margin || '0px'}; width: ${style.width || '100%'}; box-shadow: ${style.boxShadow || 'none'}; opacity: ${style.opacity || '1'}; cursor: ${style.cursor || 'default'};`;

        const inlineLabelCss = `color: ${labelStyle.color || '#212529'}; font-size: ${labelStyle.fontSize || '13px'}; font-weight: ${labelStyle.fontWeight || '600'}; margin-bottom: ${labelStyle.marginBottom || '4px'}; display: inline-block;`;

        if (isButton) {
          return `      <div class="mb-3">
        <button type="${f.buttonType || 'submit'}" class="btn" style="${inlineInputCss}">
          ${f.label || 'Submit'}
        </button>
      </div>`;
        }

        if (['checkbox', 'radio'].includes(f.type)) {
          const isRow = f.optionsLayout === 'row';
          const layoutCss = `display: flex; flex-direction: ${isRow ? 'row' : 'column'}; gap: ${isRow ? '16px' : '8px'}; align-items: flex-start; margin-top: 6px;`;
          
          const optionsHtml = options.map((opt, i) => `
          <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 0;">
            <input type="${f.type}" name="${f.name || f.id}" value="${opt.value}" ${f.disabled ? 'disabled' : ''}>
            <span>${opt.label || opt.value || `Option ${i + 1}`}</span>
          </label>`).join('');

          return `      <div class="mb-3">
        <label style="${inlineLabelCss}">${f.label || ''}${f.required ? ' <span class="text-danger">*</span>' : ''}</label>
        <div style="${layoutCss}">
          ${optionsHtml}
        </div>
      </div>`;
        }

        if (f.type === 'select') {
          const optionsHtml = options.map((opt) => `<option value="${opt.value}">${opt.label || opt.value}</option>`).join('\n          ');
          return `      <div class="mb-3">
        <label style="${inlineLabelCss}">${f.label || ''}${f.required ? ' <span class="text-danger">*</span>' : ''}</label>
        <select class="form-select" style="${inlineInputCss}" ${f.disabled ? 'disabled' : ''}>
          ${optionsHtml}
        </select>
      </div>`;
        }

        return `      <div class="mb-3">
        <label style="${inlineLabelCss}">
          ${f.label || ''}${f.required ? ' <span class="text-danger">*</span>' : ''}
        </label>
        ${f.helpText ? `<small class="d-block text-muted mb-1">${f.helpText}</small>` : ''}
        <input 
          type="${f.type}" 
          class="form-control" 
          name="${f.name || ''}"
          id="${f.customId || ''}"
          placeholder="${f.placeholder || ''}" 
          value="${f.defaultValue || ''}"
          style="${inlineInputCss}"
          ${f.required ? 'required' : ''}
          ${f.disabled ? 'disabled' : ''}
          ${f.readOnly ? 'readonly' : ''}
          ${f.autoFocus ? 'autofocus' : ''}
        />
      </div>`;
      })
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Form</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center min-vh-100 py-4">
  <div class="container" style="max-width: 650px;">
    <div class="card shadow border-0 p-4 rounded-3 bg-white">
      <h4 class="fw-bold mb-3">Custom Built Form</h4>
      <form onsubmit="event.preventDefault(); alert('Form Submitted!');">
${formContentHTML}
      </form>
    </div>
  </div>
</body>
</html>`;
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

      {/* Standalone Code Export Modal */}
      {showCodeModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-dark text-white">
                <h6 className="modal-title fw-bold">Standalone HTML Code Export</h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowCodeModal(false)}></button>
              </div>
              <div className="modal-body p-3 bg-dark">
                <textarea
                  className="form-control font-monospace text-success bg-black border-secondary p-3"
                  rows="14"
                  readOnly
                  style={{ fontSize: '12px' }}
                  value={generateFullHTMLCode()}
                ></textarea>
              </div>
              <div className="modal-footer bg-light">
                <button className="btn btn-secondary btn-sm" onClick={() => setShowCodeModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actual FullScreen Live Preview Modal */}
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