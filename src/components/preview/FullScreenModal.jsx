import React, { useState } from 'react';

export default function FullScreenModal({ show, onClose, fields = [], theme, onToggleTheme }) {
  if (!show) return null;

  const [localDark, setLocalDark] = useState(theme === 'dark');
  const isDark = onToggleTheme ? theme === 'dark' : localDark;

  const handleThemeToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      setLocalDark(!localDark);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-fullscreen">
        <div className={`modal-content ${isDark ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
          {/* Modal Header */}
          <div
            className={`modal-header p-3 d-flex align-items-center justify-content-between ${
              isDark ? 'border-secondary bg-secondary bg-opacity-25' : 'bg-light border-bottom'
            }`}
          >
            <h5 className="modal-title fw-bold fs-6 mb-0">Live Form Preview</h5>

            <div className="d-flex align-items-center gap-2">
              {/* Dark / Light Mode Toggle Button */}
              <button
                type="button"
                className={`btn btn-sm ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`}
                onClick={handleThemeToggle}
              >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>

              {/* Close Button */}
              <button
                type="button"
                className={`btn-close ${isDark ? 'btn-close-white' : ''}`}
                onClick={onClose}
              ></button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4 overflow-y-auto">
            <div className="container" style={{ maxWidth: '900px' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Form Submitted Successfully!');
                }}
                className="d-flex flex-wrap align-items-start w-100"
              >
                {fields.length === 0 ? (
                  <div className="text-center w-100 py-5 text-muted">
                    No form elements added to preview.
                  </div>
                ) : (
                  fields.map((field) => {
                    const isButton = field.type === 'button';
                    const style = field.style || {};
                    const labelStyle = field.labelStyle || {};
                    const options = field.options || [];

                    // Dynamic Label Style
                    const customLabelStyle = {
                      color: labelStyle.color || (isDark ? '#e0e0e0' : '#212529'),
                      fontSize: labelStyle.fontSize || '13px',
                      fontWeight: labelStyle.fontWeight || '600',
                      marginBottom: labelStyle.marginBottom || '4px',
                      display: 'inline-block',
                    };

                    // Dynamic Input Style
                    const customInputStyle = {
                      color: style.color || (isDark ? '#ffffff' : '#212529'),
                      backgroundColor: style.backgroundColor || (isDark ? '#2b3035' : '#ffffff'),
                      fontSize: style.fontSize || '14px',
                      fontWeight: style.fontWeight || '400',
                      textAlign: style.textAlign || 'left',
                      textTransform: style.textTransform || 'none',
                      borderWidth: style.borderWidth || '1px',
                      borderStyle: style.borderStyle || 'solid',
                      borderColor: style.borderColor || (isDark ? '#495057' : '#dee2e6'),
                      borderRadius: style.borderRadius || '6px',
                      padding: style.padding || '6px 12px',
                      margin: style.margin || '0px',
                      width: style.width || '100%',
                      height: style.height || 'auto',
                      boxShadow: style.boxShadow || 'none',
                      opacity: style.opacity || '1',
                      cursor: style.cursor || 'default',
                      zIndex: style.zIndex || '1',
                      transform: style.transform || 'none',
                    };

                    // Wrapper Width
                    const wrapperWidth =
                      style.width === '50%'
                        ? 'w-50'
                        : style.width === '75%'
                        ? 'w-75'
                        : style.width === '25%'
                        ? 'w-25'
                        : style.width === 'auto'
                        ? 'w-auto'
                        : 'w-100';

                    // Dynamic Options Layout
                    const isRowLayout = field.optionsLayout === 'row';
                    const optionsContainerStyle = {
                      display: style.display || 'flex',
                      flexDirection: isRowLayout ? 'row' : style.flexDirection || 'column',
                      flexWrap: style.flexWrap || 'wrap',
                      gap: style.gap || (isRowLayout ? '16px' : '8px'),
                      alignItems: style.alignItems || 'flex-start',
                      marginTop: '6px',
                    };

                    return (
                      <div key={field.id} className={`p-2 ${wrapperWidth}`}>
                        {isButton ? (
                          <button type={field.buttonType || 'submit'} className="btn" style={customInputStyle}>
                            {field.label || 'Submit'}
                          </button>
                        ) : (
                          <div>
                            {field.label && (
                              <label style={customLabelStyle}>
                                {field.label}
                                {field.required && <span className="text-danger ms-1">*</span>}
                              </label>
                            )}

                            {field.helpText && (
                              <small className="d-block text-muted mb-1 extra-small">{field.helpText}</small>
                            )}

                            {/* Textarea */}
                            {field.type === 'textarea' ? (
                              <textarea
                                className="form-control"
                                style={customInputStyle}
                                rows="3"
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue}
                                disabled={field.disabled}
                                readOnly={field.readOnly}
                              />
                            ) : field.type === 'select' ? (
                              /* Select Dropdown with Background Style Fix */
                              <select className="form-select" style={customInputStyle} disabled={field.disabled}>
                                {options.map((opt, i) => (
                                  <option key={i} value={opt.value}>
                                    {opt.label || opt.value || `Option ${i + 1}`}
                                  </option>
                                ))}
                              </select>
                            ) : field.type === 'checkbox' || field.type === 'radio' ? (
                              /* Radio & Checkbox Fix */
                              <div style={optionsContainerStyle}>
                                {options.map((opt, i) => (
                                  <label
                                    key={i}
                                    className="d-inline-flex align-items-center gap-2 cursor-pointer mb-0"
                                    style={{
                                      color: isDark ? '#e0e0e0' : '#212529',
                                      fontSize: '14px',
                                    }}
                                  >
                                    <input
                                      type={field.type}
                                      name={field.name || field.id}
                                      value={opt.value}
                                      disabled={field.disabled}
                                      style={{
                                        cursor: 'pointer',
                                        width: '16px',
                                        height: '16px',
                                        accentColor: '#0d6efd',
                                      }}
                                    />
                                    <span>{opt.label || opt.value || `Option ${i + 1}`}</span>
                                  </label>
                                ))}
                              </div>
                            ) : field.type === 'range' ? (
                              /* Range Input */
                              <input
                                type="range"
                                className="form-range"
                                min={field.min || 0}
                                max={field.max || 100}
                                step={field.step || 1}
                                disabled={field.disabled}
                              />
                            ) : (
                              /* Normal Inputs */
                              <input
                                type={field.type}
                                className="form-control"
                                style={customInputStyle}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue}
                                disabled={field.disabled}
                                readOnly={field.readOnly}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </form>
            </div>
          </div>

          {/* Modal Footer */}
          <div className={`modal-footer p-2 ${isDark ? 'border-secondary' : ''}`}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}