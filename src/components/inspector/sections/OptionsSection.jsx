import React from 'react';

export default function OptionsSection({ field, onUpdate, theme }) {
  const isDark = theme === 'dark';
  const options = field.options || [];

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    onUpdate({ ...field, options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOpt = {
      label: `Option ${options.length + 1}`,
      value: `option_${options.length + 1}`,
    };
    onUpdate({ ...field, options: [...options, newOpt] });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    onUpdate({ ...field, options: updatedOptions });
  };

  return (
    <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25 mb-3">
      <h6 className="fw-bold extra-small text-primary mb-2">Options & Layout Settings</h6>

      {/* Options Layout Selector for Checkbox/Radio */}
      {['checkbox', 'radio'].includes(field.type) && (
        <div className="mb-3">
          <label className="form-label extra-small fw-semibold mb-1">Options Layout Position</label>
          <select
            className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            value={field.optionsLayout || 'column'}
            onChange={(e) => onUpdate({ ...field, optionsLayout: e.target.value })}
          >
            <option value="column">Stacked Vertical (Column)</option>
            <option value="row">Inline Horizontal (Row)</option>
          </select>
        </div>
      )}

      {/* Options List */}
      <label className="form-label extra-small fw-semibold mb-1">Choices / Options</label>
      <div className="d-flex flex-column gap-2 mb-2">
        {options.map((opt, i) => (
          <div key={i} className="d-flex gap-1 align-items-center">
            <input
              type="text"
              placeholder="Label"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={opt.label || ''}
              onChange={(e) => handleOptionChange(i, 'label', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={opt.value || ''}
              onChange={(e) => handleOptionChange(i, 'value', e.target.value)}
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-danger px-2 py-0"
              onClick={() => handleRemoveOption(i)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-sm btn-outline-primary w-100 extra-small fw-semibold"
        onClick={handleAddOption}
      >
        + Add New Option
      </button>
    </div>
  );
}