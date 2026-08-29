import React, { useState } from 'react';

export default function Canvas({ fields, selectedFieldId, onSelectField, onDeleteField, theme }) {
  const isDark = theme === 'dark';
  const [hoveredFieldId, setHoveredFieldId] = useState(null);

  return (
    <div
      className={`canvas-container p-4 rounded shadow-sm min-vh-100 w-100 transition-all ${
        isDark ? 'bg-dark text-white border border-secondary' : 'bg-white text-dark'
      }`}
    >
      <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-wrap align-items-start w-100">
        {fields.length === 0 ? (
          <div
            className={`text-center w-100 py-5 border border-dashed rounded ${
              isDark ? 'border-secondary text-white-50' : 'border-muted text-muted'
            }`}
          >
            Click or drag elements from the left sidebar to build your form.
          </div>
        ) : (
          fields.map((field) => {
            const isSelected = selectedFieldId === field.id;
            const isHovered = hoveredFieldId === field.id;
            const isButton = field.type === 'button';
            const style = field.style || {};
            const hoverStyle = field.hoverStyle || {};
            const labelStyle = field.labelStyle || {};
            const options = field.options || [];

            const activeStyle = isHovered
              ? { ...style, ...hoverStyle }
              : style;

            const customLabelStyle = {
              color: isDark ? '#e0e0e0' : labelStyle.color || '#212529',
              fontSize: labelStyle.fontSize || '13px',
              fontWeight: labelStyle.fontWeight || '600',
              marginBottom: labelStyle.marginBottom || '4px',
              display: 'inline-block',
            };

            const customInputStyle = {
              color: activeStyle.color || (isDark ? '#ffffff' : '#212529'),
              backgroundColor: activeStyle.backgroundColor || (isDark ? '#2b3035' : '#ffffff'),
              fontSize: activeStyle.fontSize || '14px',
              fontWeight: activeStyle.fontWeight || '400',
              textAlign: activeStyle.textAlign || 'left',
              textTransform: activeStyle.textTransform || 'none',
              borderWidth: activeStyle.borderWidth || '1px',
              borderStyle: activeStyle.borderStyle || 'solid',
              borderColor: activeStyle.borderColor || (isDark ? '#495057' : '#dee2e6'),
              borderRadius: activeStyle.borderRadius || '6px',
              padding: activeStyle.padding || '6px 12px',
              margin: activeStyle.margin || '0px',
              width: activeStyle.width || '100%',
              height: activeStyle.height || 'auto',
              boxShadow: activeStyle.boxShadow || 'none',
              opacity: activeStyle.opacity || '1',
              cursor: activeStyle.cursor || 'default',
              zIndex: activeStyle.zIndex || '1',
              transform: activeStyle.transform || 'none',
              transition: 'all 0.2s ease-in-out',
            };

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

            // Options Dynamic Layout (Row vs Column)
            const isRowLayout = field.optionsLayout === 'row';
            const optionsContainerStyle = {
              display: activeStyle.display || 'flex',
              flexDirection: isRowLayout ? 'row' : (activeStyle.flexDirection || 'column'),
              flexWrap: activeStyle.flexWrap || 'wrap',
              gap: activeStyle.gap || (isRowLayout ? '16px' : '8px'),
              alignItems: activeStyle.alignItems || 'center',
              marginTop: '6px',
            };

            return (
              <div
                key={field.id}
                onClick={() => onSelectField(field.id)}
                onMouseEnter={() => setHoveredFieldId(field.id)}
                onMouseLeave={() => setHoveredFieldId(null)}
                className={`position-relative p-2 rounded cursor-pointer ${wrapperWidth} ${
                  isSelected ? 'border border-primary bg-primary bg-opacity-10' : 'border border-transparent'
                }`}
              >
                {isButton ? (
                  <button type={field.buttonType || 'button'} className="btn" style={customInputStyle}>
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

                    {/* Subtitle / Helper Text */}
                    {field.helpText && (
                      <small className="d-block text-muted mb-1 extra-small">{field.helpText}</small>
                    )}

                    {/* Input Types Rendering */}
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
                      <select className="form-select" style={customInputStyle} disabled={field.disabled}>
                        {options.map((opt, i) => (
                          <option key={i} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' || field.type === 'radio' ? (
                      /* Updated Dynamic Radio & Checkbox Container */
                      <div style={optionsContainerStyle}>
                        {options.map((opt, i) => (
                          <div key={i} className="form-check mb-0 d-flex align-items-center gap-1.5">
                            <input
                              type={field.type}
                              name={field.name || field.id}
                              id={`${field.id}_${i}`}
                              className="form-check-input mt-0"
                              disabled={field.disabled}
                            />
                            <label
                              className="form-check-label extra-small cursor-pointer mb-0"
                              htmlFor={`${field.id}_${i}`}
                              style={{ color: isDark ? '#e0e0e0' : '#212529' }}
                            >
                              {opt.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : field.type === 'range' ? (
                      <input
                        type="range"
                        className="form-range"
                        min={field.min || 0}
                        max={field.max || 100}
                        step={field.step || 1}
                        disabled={field.disabled}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="form-control"
                        style={customInputStyle}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        disabled={field.disabled}
                        readOnly={field.readOnly}
                        accept={field.accept}
                        multiple={field.multiple}
                      />
                    )}
                  </div>
                )}

                {/* Delete Button */}
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-0 px-1"
                  style={{ fontSize: '10px', zIndex: 10 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteField(field.id);
                  }}
                >
                  &times;
                </button>
              </div>
            );
          })
        )}
      </form>
    </div>
  );
}