// import React from "react";
// import { Plus } from "lucide-react";

// export const FormColumn = ({ colWidth, fields, isDark }) => {
//   return (
//     <div className={`col-md-${colWidth}`}>
//       <div
//         className={`p-3 rounded border border-dashed text-center min-vh-10 d-flex flex-column justify-content-center align-items-center ${
//           isDark
//             ? "bg-black bg-opacity-25 border-secondary text-white-50"
//             : "bg-light border-secondary-subtle text-muted"
//         }`}
//         style={{ minHeight: "90px" }}
//       >
//         {fields.length === 0 ? (
//           <div className="extra-small d-flex align-items-center gap-1 opacity-75">
//             <Plus size={14} /> Drop elements here
//           </div>
//         ) : (
//           <div>{/* Future fields drop logic */}</div>
//         )}
//       </div>
//     </div>
//   );
// };


// import React, { useState } from 'react';
// import { Plus } from 'lucide-react';

// export const FormColumn = ({
//   colWidth,
//   fields,
//   selectedFieldId,
//   onSelectField,
//   onDeleteField,
//   isDark,
// }) => {
//   const [hoveredFieldId, setHoveredFieldId] = useState(null);

//   return (
//     <div className={`col-md-${colWidth}`}>
//       <div
//         className={`p-2 rounded border border-dashed min-vh-10 position-relative transition-all ${
//           isDark
//             ? 'bg-black bg-opacity-25 border-secondary text-white-50'
//             : 'bg-light border-secondary-subtle text-muted'
//         }`}
//         style={{ minHeight: '90px' }}
//       >
//         {fields.length === 0 ? (
//           <div className="d-flex align-items-center justify-content-center h-100 py-3 extra-small opacity-75">
//             <Plus size={14} className="me-1" /> Drop elements here
//           </div>
//         ) : (
//           fields.map((field) => {
//             const isSelected = selectedFieldId === field.id;
//             const isHovered = hoveredFieldId === field.id;
//             const isButton = field.type === 'button';
//             const style = field.style || {};
//             const hoverStyle = field.hoverStyle || {};
//             const labelStyle = field.labelStyle || {};
//             const options = field.options || [];

//             const activeStyle = isHovered ? { ...style, ...hoverStyle } : style;

//             const customLabelStyle = {
//               color: isDark ? '#e0e0e0' : labelStyle.color || '#212529',
//               fontSize: labelStyle.fontSize || '13px',
//               fontWeight: labelStyle.fontWeight || '600',
//               marginBottom: labelStyle.marginBottom || '4px',
//               display: 'inline-block',
//             };

//             const customInputStyle = {
//               color: activeStyle.color || (isDark ? '#ffffff' : '#212529'),
//               backgroundColor: activeStyle.backgroundColor || (isDark ? '#2b3035' : '#ffffff'),
//               fontSize: activeStyle.fontSize || '14px',
//               fontWeight: activeStyle.fontWeight || '400',
//               textAlign: activeStyle.textAlign || 'left',
//               textTransform: activeStyle.textTransform || 'none',
//               borderWidth: activeStyle.borderWidth || '1px',
//               borderStyle: activeStyle.borderStyle || 'solid',
//               borderColor: activeStyle.borderColor || (isDark ? '#495057' : '#dee2e6'),
//               borderRadius: activeStyle.borderRadius || '6px',
//               padding: activeStyle.padding || '6px 12px',
//               margin: activeStyle.margin || '0px',
//               width: activeStyle.width || '100%',
//               height: activeStyle.height || 'auto',
//               boxShadow: activeStyle.boxShadow || 'none',
//               opacity: activeStyle.opacity || '1',
//               cursor: activeStyle.cursor || 'default',
//               zIndex: activeStyle.zIndex || '1',
//               transform: activeStyle.transform || 'none',
//               transition: 'all 0.2s ease-in-out',
//             };

//             const isRowLayout = field.optionsLayout === 'row';
//             const optionsContainerStyle = {
//               display: activeStyle.display || 'flex',
//               flexDirection: isRowLayout ? 'row' : activeStyle.flexDirection || 'column',
//               flexWrap: activeStyle.flexWrap || 'wrap',
//               gap: activeStyle.gap || (isRowLayout ? '16px' : '8px'),
//               alignItems: activeStyle.alignItems || 'center',
//               marginTop: '6px',
//             };

//             return (
//               <div
//                 key={field.id}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onSelectField(field.id);
//                 }}
//                 onMouseEnter={() => setHoveredFieldId(field.id)}
//                 onMouseLeave={() => setHoveredFieldId(null)}
//                 className={`position-relative p-2 rounded cursor-pointer w-100 mb-2 ${
//                   isSelected ? 'border border-primary bg-primary bg-opacity-10' : 'border border-transparent'
//                 }`}
//               >
//                 {isButton ? (
//                   <button type={field.buttonType || 'button'} className="btn" style={customInputStyle}>
//                     {field.label || 'Submit'}
//                   </button>
//                 ) : (
//                   <div>
//                     {field.label && (
//                       <label style={customLabelStyle}>
//                         {field.label}
//                         {field.required && <span className="text-danger ms-1">*</span>}
//                       </label>
//                     )}

//                     {field.helpText && (
//                       <small className="d-block text-muted mb-1 extra-small">{field.helpText}</small>
//                     )}

//                     {field.type === 'textarea' ? (
//                       <textarea
//                         className="form-control"
//                         style={customInputStyle}
//                         rows="3"
//                         placeholder={field.placeholder}
//                         defaultValue={field.defaultValue}
//                         disabled={field.disabled}
//                         readOnly={field.readOnly}
//                       />
//                     ) : field.type === 'select' ? (
//                       <select className="form-select" style={customInputStyle} disabled={field.disabled}>
//                         {options.map((opt, i) => (
//                           <option key={i} value={opt.value}>
//                             {opt.label}
//                           </option>
//                         ))}
//                       </select>
//                     ) : field.type === 'checkbox' || field.type === 'radio' ? (
//                       <div style={optionsContainerStyle}>
//                         {options.map((opt, i) => (
//                           <div key={i} className="form-check mb-0 d-flex align-items-center gap-1.5">
//                             <input
//                               type={field.type}
//                               name={field.name || field.id}
//                               id={`${field.id}_${i}`}
//                               className="form-check-input mt-0"
//                               disabled={field.disabled}
//                             />
//                             <label
//                               className="form-check-label extra-small cursor-pointer mb-0"
//                               htmlFor={`${field.id}_${i}`}
//                               style={{ color: isDark ? '#e0e0e0' : '#212529' }}
//                             >
//                               {opt.label}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     ) : field.type === 'range' ? (
//                       <input
//                         type="range"
//                         className="form-range"
//                         min={field.min || 0}
//                         max={field.max || 100}
//                         step={field.step || 1}
//                         disabled={field.disabled}
//                       />
//                     ) : (
//                       <input
//                         type={field.type}
//                         className="form-control"
//                         style={customInputStyle}
//                         placeholder={field.placeholder}
//                         defaultValue={field.defaultValue}
//                         disabled={field.disabled}
//                         readOnly={field.readOnly}
//                         accept={field.accept}
//                         multiple={field.multiple}
//                       />
//                     )}
//                   </div>
//                 )}

//                 {/* Delete Button */}
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-0 px-1"
//                   style={{ fontSize: '10px', zIndex: 10 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDeleteField(field.id);
//                   }}
//                 >
//                   &times;
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const FormColumn = ({
  colId,
  colWidth,
  fields = [],
  selectedFieldId,
  onSelectField,
  onDeleteField,
  isActive,
  onSelectColumn,
  isDark,
}) => {
  const [hoveredFieldId, setHoveredFieldId] = useState(null);

  return (
    <div className={`col-md-${colWidth}`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelectColumn(colId);
        }}
        className={`p-2 rounded transition-all position-relative ${
          isActive
            ? 'border border-primary border-2 shadow-sm'
            : 'border border-dashed ' +
              (isDark ? 'border-secondary text-white-50' : 'border-secondary-subtle text-muted')
        } ${isDark ? 'bg-black bg-opacity-25' : 'bg-light'}`}
        style={{ minHeight: '100px', cursor: 'pointer' }}
      >
        {fields.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center h-100 py-4 extra-small opacity-75 select-none">
            <Plus size={14} className="me-1" />
            {isActive ? 'Active Zone (Click element from Sidebar)' : 'Click to select zone'}
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

            const activeStyle = isHovered ? { ...style, ...hoverStyle } : style;

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
              borderWidth: activeStyle.borderWidth || '1px',
              borderStyle: activeStyle.borderStyle || 'solid',
              borderColor: activeStyle.borderColor || (isDark ? '#495057' : '#dee2e6'),
              borderRadius: activeStyle.borderRadius || '6px',
              padding: activeStyle.padding || '6px 12px',
              width: '100%',
              transition: 'all 0.2s ease-in-out',
            };

            return (
              <div
                key={field.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectField) onSelectField(field.id);
                }}
                onMouseEnter={() => setHoveredFieldId(field.id)}
                onMouseLeave={() => setHoveredFieldId(null)}
                className={`position-relative p-2 rounded mb-2 transition-all ${
                  isSelected
                    ? 'border border-primary bg-primary bg-opacity-10'
                    : 'border border-transparent hover-bg-light'
                }`}
              >
                {isButton ? (
                  <button type="button" className="btn w-100" style={customInputStyle}>
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

                    {field.type === 'textarea' ? (
                      <textarea className="form-control" style={customInputStyle} rows="3" placeholder={field.placeholder} />
                    ) : field.type === 'select' ? (
                      <select className="form-select" style={customInputStyle}>
                        {options.map((opt, i) => (
                          <option key={i} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' || field.type === 'radio' ? (
                      <div className="d-flex flex-column gap-1 mt-1">
                        {options.map((opt, i) => (
                          <div key={i} className="form-check mb-0 d-flex align-items-center gap-2">
                            <input type={field.type} name={field.id} id={`${field.id}_${i}`} className="form-check-input mt-0" />
                            <label className="form-check-label extra-small mb-0" htmlFor={`${field.id}_${i}`} style={{ color: isDark ? '#e0e0e0' : '#212529' }}>
                              {opt.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input type={field.type} className="form-control" style={customInputStyle} placeholder={field.placeholder} />
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
                    if (onDeleteField) onDeleteField(field.id);
                  }}
                >
                  &times;
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};