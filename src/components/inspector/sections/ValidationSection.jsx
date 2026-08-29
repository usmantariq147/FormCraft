import React from 'react';

export default function ValidationSection({ field, onUpdate, theme }) {
  const isDark = theme === 'dark';

  const handleChange = (key, value) => {
    onUpdate({ ...field, [key]: value });
  };

  const handleToggle = (key) => {
    onUpdate({ ...field, [key]: !field[key] });
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Standard Rules */}
      <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
        <h6 className="fw-bold extra-small text-primary mb-2">Rule Toggles</h6>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="reqCheck"
            checked={!!field.required}
            onChange={() => handleToggle('required')}
          />
          <label className="form-check-label extra-small fw-semibold" htmlFor="reqCheck">
            Required Field (`required`)
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="disCheck"
            checked={!!field.disabled}
            onChange={() => handleToggle('disabled')}
          />
          <label className="form-check-label extra-small fw-semibold" htmlFor="disCheck">
            Disabled Field (`disabled`)
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="readCheck"
            checked={!!field.readOnly}
            onChange={() => handleToggle('readOnly')}
          />
          <label className="form-check-label extra-small fw-semibold" htmlFor="readCheck">
            Read Only (`readonly`)
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="autoFocusCheck"
            checked={!!field.autoFocus}
            onChange={() => handleToggle('autoFocus')}
          />
          <label className="form-check-label extra-small fw-semibold" htmlFor="autoFocusCheck">
            Auto Focus (`autofocus`)
          </label>
        </div>

        {field.type === 'file' && (
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="multipleCheck"
              checked={!!field.multiple}
              onChange={() => handleToggle('multiple')}
            />
            <label className="form-check-label extra-small fw-semibold" htmlFor="multipleCheck">
              Allow Multiple Files (`multiple`)
            </label>
          </div>
        )}
      </div>

      {/* Advanced Validation (Regex & String Lengths) */}
      {['text', 'password', 'email', 'tel', 'url', 'textarea', 'search'].includes(field.type) && (
        <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
          <h6 className="fw-bold extra-small text-primary mb-2">Advanced Regex & Length Rules</h6>

          {/* Min & Max Character Length */}
          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Min Length</label>
              <input
                type="number"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={field.minLength || ''}
                onChange={(e) => handleChange('minLength', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Max Length</label>
              <input
                type="number"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={field.maxLength || ''}
                onChange={(e) => handleChange('maxLength', e.target.value)}
              />
            </div>
          </div>

          {/* Regex Pattern */}
          <div className="mb-2">
            <label className="form-label extra-small fw-semibold mb-1">Regex Pattern (`pattern`)</label>
            <input
              type="text"
              placeholder="e.g. [A-Za-z]{3}"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={field.pattern || ''}
              onChange={(e) => handleChange('pattern', e.target.value)}
            />
          </div>

          {/* Custom Pattern Error Message */}
          <div>
            <label className="form-label extra-small fw-semibold mb-1">Validation Failure Message</label>
            <input
              type="text"
              placeholder="e.g. Must contain 3 letters"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={field.patternError || ''}
              onChange={(e) => handleChange('patternError', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}