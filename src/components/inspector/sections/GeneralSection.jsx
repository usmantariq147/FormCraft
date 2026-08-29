import React from 'react';

export default function GeneralSection({ field, onUpdate, theme }) {
  const isDark = theme === 'dark';

  const handleChange = (key, value) => {
    onUpdate({ ...field, [key]: value });
  };

  return (
    <div className="d-flex flex-column gap-3 mb-3">
      {/* Basic Attributes */}
      <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
        <h6 className="fw-bold extra-small text-primary mb-2">Basic Attributes</h6>

        {/* Label */}
        <div className="mb-2">
          <label className="form-label extra-small fw-semibold mb-1">Field Label</label>
          <input
            type="text"
            className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            value={field.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
          />
        </div>

        {/* Name Attribute */}
        <div className="mb-2">
          <label className="form-label extra-small fw-semibold mb-1">Name Attribute (`name`)</label>
          <input
            type="text"
            className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            value={field.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        {/* Custom HTML ID */}
        <div className="mb-2">
          <label className="form-label extra-small fw-semibold mb-1">Custom ID (`id`)</label>
          <input
            type="text"
            className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder="e.g. user-email-input"
            value={field.customId || ''}
            onChange={(e) => handleChange('customId', e.target.value)}
          />
        </div>

        {/* Custom CSS Classes */}
        <div className="mb-2">
          <label className="form-label extra-small fw-semibold mb-1">Custom CSS Class (`class`)</label>
          <input
            type="text"
            className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder="e.g. form-control my-custom-class"
            value={field.customClass || ''}
            onChange={(e) => handleChange('customClass', e.target.value)}
          />
        </div>

        {/* Placeholder */}
        {['text', 'password', 'email', 'number', 'tel', 'url', 'textarea', 'search'].includes(field.type) && (
          <div className="mb-2">
            <label className="form-label extra-small fw-semibold mb-1">Placeholder Text</label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={field.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
            />
          </div>
        )}

        {/* Default Value */}
        {['text', 'password', 'email', 'number', 'tel', 'url', 'textarea', 'date', 'color'].includes(field.type) && (
          <div className="mb-2">
            <label className="form-label extra-small fw-semibold mb-1">Default Value</label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={field.defaultValue || ''}
              onChange={(e) => handleChange('defaultValue', e.target.value)}
            />
          </div>
        )}

        {/* Helper / Subtitle Text */}
        <div>
          <label className="form-label extra-small fw-semibold mb-1">Helper / Subtitle Text</label>
          <input
            type="text"
            className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            value={field.helpText || ''}
            onChange={(e) => handleChange('helpText', e.target.value)}
          />
        </div>
      </div>

      {/* Field-Specific Attributes */}
      <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
        <h6 className="fw-bold extra-small text-primary mb-2">Input Specific Controls</h6>

        {/* Number / Range Specific */}
        {['number', 'range'].includes(field.type) && (
          <div className="row g-2">
            <div className="col-4">
              <label className="form-label extra-small fw-semibold mb-1">Min Value</label>
              <input
                type="number"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={field.min ?? ''}
                onChange={(e) => handleChange('min', e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label extra-small fw-semibold mb-1">Max Value</label>
              <input
                type="number"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={field.max ?? ''}
                onChange={(e) => handleChange('max', e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label extra-small fw-semibold mb-1">Step</label>
              <input
                type="number"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={field.step ?? ''}
                onChange={(e) => handleChange('step', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Textarea Specific */}
        {field.type === 'textarea' && (
          <div className="mb-2">
            <label className="form-label extra-small fw-semibold mb-1">Rows Count</label>
            <input
              type="number"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={field.rows || 4}
              onChange={(e) => handleChange('rows', e.target.value)}
            />
          </div>
        )}

        {/* File Specific */}
        {field.type === 'file' && (
          <div className="mb-2">
            <label className="form-label extra-small fw-semibold mb-1">Accept Types (`accept`)</label>
            <input
              type="text"
              placeholder="e.g. image/*,.pdf"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={field.accept || ''}
              onChange={(e) => handleChange('accept', e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}