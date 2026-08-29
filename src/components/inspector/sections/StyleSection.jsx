import React, { useState } from 'react';

export default function StyleSection({ field, onUpdate, theme }) {
  const isDark = theme === 'dark';
  const style = field.style || {};
  const labelStyle = field.labelStyle || {};
  const hoverStyle = field.hoverStyle || {};

  const [styleMode, setStyleMode] = useState('normal'); // 'normal' | 'hover'

  const handleStyleChange = (key, value) => {
    if (styleMode === 'hover') {
      onUpdate({
        ...field,
        hoverStyle: { ...hoverStyle, [key]: value },
      });
    } else {
      onUpdate({
        ...field,
        style: { ...style, [key]: value },
      });
    }
  };

  const handleLabelStyleChange = (key, value) => {
    onUpdate({
      ...field,
      labelStyle: { ...labelStyle, [key]: value },
    });
  };

  const activeStyle = styleMode === 'hover' ? hoverStyle : style;

  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Normal vs Hover Switcher */}
      <div className="btn-group w-100 mb-1" role="group">
        <button
          type="button"
          className={`btn btn-sm ${styleMode === 'normal' ? 'btn-primary' : isDark ? 'btn-outline-light' : 'btn-outline-secondary'}`}
          onClick={() => setStyleMode('normal')}
        >
          Normal State
        </button>
        <button
          type="button"
          className={`btn btn-sm ${styleMode === 'hover' ? 'btn-primary' : isDark ? 'btn-outline-light' : 'btn-outline-secondary'}`}
          onClick={() => setStyleMode('hover')}
        >
          Hover State
        </button>
      </div>

      {/* 2. Label Styling (Normal Mode) */}
      {styleMode === 'normal' && (
        <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
          <h6 className="fw-bold extra-small text-primary mb-2">Label Typography & Layout</h6>
          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Color</label>
              <input
                type="color"
                className="form-control form-control-sm form-control-color w-100"
                value={labelStyle.color || '#212529'}
                onChange={(e) => handleLabelStyleChange('color', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Font Size</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={labelStyle.fontSize || '13px'}
                onChange={(e) => handleLabelStyleChange('fontSize', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Font Weight</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={labelStyle.fontWeight || '600'}
                onChange={(e) => handleLabelStyleChange('fontWeight', e.target.value)}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi-Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Bottom Margin</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={labelStyle.marginBottom || '4px'}
                onChange={(e) => handleLabelStyleChange('marginBottom', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Letter Spacing</label>
              <input
                type="text"
                placeholder="e.g. 0.5px"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={labelStyle.letterSpacing || 'normal'}
                onChange={(e) => handleLabelStyleChange('letterSpacing', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Text Transform</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={labelStyle.textTransform || 'none'}
                onChange={(e) => handleLabelStyleChange('textTransform', e.target.value)}
              >
                <option value="none">None</option>
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">lowercase</option>
                <option value="capitalize">Capitalize</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. Input Text Typography & Colors */}
      <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
        <h6 className="fw-bold extra-small text-primary mb-2">
          {styleMode === 'hover' ? 'Hover Colors & Text' : 'Input Typography & Colors'}
        </h6>
        <div className="row g-2 mb-2">
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Text Color</label>
            <input
              type="color"
              className="form-control form-control-sm form-control-color w-100"
              value={activeStyle.color || '#212529'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Background Color</label>
            <input
              type="color"
              className="form-control form-control-sm form-control-color w-100"
              value={activeStyle.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            />
          </div>
        </div>

        {styleMode === 'normal' && (
          <>
            <div className="row g-2 mb-2">
              <div className="col-6">
                <label className="form-label extra-small fw-semibold mb-1">Font Size</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                  value={activeStyle.fontSize || '14px'}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label extra-small fw-semibold mb-1">Font Weight</label>
                <select
                  className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                  value={activeStyle.fontWeight || '400'}
                  onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                >
                  <option value="300">Light (300)</option>
                  <option value="400">Normal (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi-Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            <div className="row g-2 mb-2">
              <div className="col-6">
                <label className="form-label extra-small fw-semibold mb-1">Text Align</label>
                <select
                  className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                  value={activeStyle.textAlign || 'left'}
                  onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
              <div className="col-6">
                <label className="form-label extra-small fw-semibold mb-1">Text Transform</label>
                <select
                  className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                  value={activeStyle.textTransform || 'none'}
                  onChange={(e) => handleStyleChange('textTransform', e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="uppercase">UPPERCASE</option>
                  <option value="lowercase">lowercase</option>
                  <option value="capitalize">Capitalize</option>
                </select>
              </div>
            </div>

            <div className="row g-2">
              <div className="col-6">
                <label className="form-label extra-small fw-semibold mb-1">Line Height</label>
                <input
                  type="text"
                  placeholder="e.g. 1.5"
                  className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                  value={activeStyle.lineHeight || 'normal'}
                  onChange={(e) => handleStyleChange('lineHeight', e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label extra-small fw-semibold mb-1">Letter Spacing</label>
                <input
                  type="text"
                  placeholder="e.g. 0.5px"
                  className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                  value={activeStyle.letterSpacing || 'normal'}
                  onChange={(e) => handleStyleChange('letterSpacing', e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 4. Borders & Outline */}
      <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
        <h6 className="fw-bold extra-small text-primary mb-2">Borders & Focus Outline</h6>
        <div className="row g-2 mb-2">
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Border Color</label>
            <input
              type="color"
              className="form-control form-control-sm form-control-color w-100"
              value={activeStyle.borderColor || '#dee2e6'}
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Border Style</label>
            <select
              className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.borderStyle || 'solid'}
              onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="row g-2 mb-2">
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Border Width</label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.borderWidth || '1px'}
              onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Border Radius</label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.borderRadius || '6px'}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            />
          </div>
        </div>

        {styleMode === 'normal' && (
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Outline</label>
              <input
                type="text"
                placeholder="e.g. 2px solid #0d6efd"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.outline || 'none'}
                onChange={(e) => handleStyleChange('outline', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Outline Offset</label>
              <input
                type="text"
                placeholder="e.g. 2px"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.outlineOffset || '0px'}
                onChange={(e) => handleStyleChange('outlineOffset', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Flexbox Controls (Container & Alignment) */}
      {styleMode === 'normal' && (
        <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
          <h6 className="fw-bold extra-small text-primary mb-2">Flexbox Layout Properties</h6>
          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Display</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.display || 'block'}
                onChange={(e) => handleStyleChange('display', e.target.value)}
              >
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="inline-flex">Inline Flex</option>
                <option value="inline-block">Inline Block</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Flex Direction</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.flexDirection || 'row'}
                onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
              >
                <option value="row">Row</option>
                <option value="row-reverse">Row Reverse</option>
                <option value="column">Column</option>
                <option value="column-reverse">Column Reverse</option>
              </select>
            </div>
          </div>

          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Justify Content</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.justifyContent || 'flex-start'}
                onChange={(e) => handleStyleChange('justifyContent', e.target.value)}
              >
                <option value="flex-start">Flex Start</option>
                <option value="center">Center</option>
                <option value="flex-end">Flex End</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Align Items</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.alignItems || 'stretch'}
                onChange={(e) => handleStyleChange('alignItems', e.target.value)}
              >
                <option value="stretch">Stretch</option>
                <option value="flex-start">Flex Start</option>
                <option value="center">Center</option>
                <option value="flex-end">Flex End</option>
                <option value="baseline">Baseline</option>
              </select>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Flex Gap</label>
              <input
                type="text"
                placeholder="e.g. 10px"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.gap || '0px'}
                onChange={(e) => handleStyleChange('gap', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Flex Wrap</label>
              <select
                className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.flexWrap || 'nowrap'}
                onChange={(e) => handleStyleChange('flexWrap', e.target.value)}
              >
                <option value="nowrap">No Wrap</option>
                <option value="wrap">Wrap</option>
                <option value="wrap-reverse">Wrap Reverse</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 6. Dimensions & Sizing */}
      {styleMode === 'normal' && (
        <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
          <h6 className="fw-bold extra-small text-primary mb-2">Dimensions & Sizing</h6>
          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Width</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.width || '100%'}
                onChange={(e) => handleStyleChange('width', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Height</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.height || 'auto'}
                onChange={(e) => handleStyleChange('height', e.target.value)}
              />
            </div>
          </div>

          <div className="row g-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Min Width</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.minWidth || '0px'}
                onChange={(e) => handleStyleChange('minWidth', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Max Width</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.maxWidth || 'none'}
                onChange={(e) => handleStyleChange('maxWidth', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. Spacing (Padding & Margin) */}
      {styleMode === 'normal' && (
        <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
          <h6 className="fw-bold extra-small text-primary mb-2">Margins & Padding</h6>
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Padding</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.padding || '6px 12px'}
                onChange={(e) => handleStyleChange('padding', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label extra-small fw-semibold mb-1">Margin</label>
              <input
                type="text"
                className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
                value={activeStyle.margin || '0px'}
                onChange={(e) => handleStyleChange('margin', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 8. Advanced Effects: Shadow, Transition, Transform, Opacity */}
      <div className="card card-body p-2 bg-transparent border border-secondary border-opacity-25">
        <h6 className="fw-bold extra-small text-primary mb-2">Shadow, Transitions & Effects</h6>
        
        <div className="mb-2">
          <label className="form-label extra-small fw-semibold mb-1">Box Shadow</label>
          <input
            type="text"
            placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)"
            className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
            value={activeStyle.boxShadow || 'none'}
            onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
          />
        </div>

        <div className="row g-2 mb-2">
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Opacity</label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.opacity || '1'}
              onChange={(e) => handleStyleChange('opacity', e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Cursor</label>
            <select
              className={`form-select form-select-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.cursor || 'default'}
              onChange={(e) => handleStyleChange('cursor', e.target.value)}
            >
              <option value="default">Default</option>
              <option value="pointer">Pointer</option>
              <option value="text">Text</option>
              <option value="not-allowed">Not Allowed</option>
              <option value="grab">Grab</option>
            </select>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Transform</label>
            <input
              type="text"
              placeholder="e.g. scale(1.05)"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.transform || 'none'}
              onChange={(e) => handleStyleChange('transform', e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label extra-small fw-semibold mb-1">Transition</label>
            <input
              type="text"
              placeholder="e.g. all 0.3s ease"
              className={`form-control form-control-sm ${isDark ? 'bg-dark text-white border-secondary' : ''}`}
              value={activeStyle.transition || 'none'}
              onChange={(e) => handleStyleChange('transition', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}