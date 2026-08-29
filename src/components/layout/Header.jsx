// import React from "react";
// import { FormInput, Eye, Code, Trash2, Sun, Moon } from "lucide-react";

// export default function Header({
//   onClearForm,
//   onOpenCodeModal,
//   onPreview,
//   theme,
//   onToggleTheme,
// }) {
//   const isDark = theme === "dark";

//   return (
//     <header
//       className={`px-4 py-2.5 d-flex align-items-center justify-content-between border-bottom shadow-sm flex-shrink-0 transition-all ${
//         isDark
//           ? "bg-dark text-white border-secondary"
//           : "bg-white text-dark border-light"
//       }`}
//       style={{ height: "60px" }}
//     >
//       {/* Logo & Title */}
//       <div className="d-flex align-items-center gap-2">
//         <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center">
//           <FormInput size={20} />
//         </div>
//         <div>
//           <h6 className={`fw-bold mb-0 ${isDark ? "text-white" : "text-dark"}`}>
//             Form Builder Pro{" "}
//             <span
//               className="badge bg-primary-subtle text-primary ms-1"
//               style={{ fontSize: "10px" }}
//             >
//               v1.0
//             </span>
//           </h6>
//           <span
//             className={`extra-small ${
//               isDark ? "text-light opacity-75" : "text-muted"
//             }`}
//           >
//             Drag, Style & Customize Forms
//           </span>
//         </div>
//       </div>

//       {/* Actions & Theme Toggle Switch */}
//       <div className="d-flex align-items-center gap-2">
//         {/* App Theme Toggle Button */}
//         <button
//           type="button"
//           onClick={onToggleTheme}
//           className="btn btn-sm d-flex align-items-center gap-1.5 me-2"
//           style={{
//             backgroundColor: isDark ? "#ffc107" : "transparent",
//             color: isDark ? "#000000" : "#212529",
//             borderColor: isDark ? "#ffc107" : "#212529",
//             fontWeight: "600",
//             transition: "all 0.2s ease-in-out",
//           }}
//           onMouseEnter={(e) => {
//             if (isDark) {
//               e.currentTarget.style.backgroundColor = "#e0a800";
//               e.currentTarget.style.color = "#000000";
//             } else {
//               e.currentTarget.style.backgroundColor = "#212529";
//               e.currentTarget.style.color = "#ffffff";
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (isDark) {
//               e.currentTarget.style.backgroundColor = "#ffc107";
//               e.currentTarget.style.color = "#000000";
//             } else {
//               e.currentTarget.style.backgroundColor = "transparent";
//               e.currentTarget.style.color = "#212529";
//             }
//           }}
//           title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
//         >
//           {isDark ? <Sun size={16} color="#000000" /> : <Moon size={16} />}
//           <span className="d-none d-md-inline">
//             {isDark ? "Light Mode" : "Dark Mode"}
//           </span>
//         </button>

//         <button
//           type="button"
//           onClick={onClearForm}
//           className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1.5"
//         >
//           <Trash2 size={16} />
//           <span>Clear All</span>
//         </button>

//         <button
//           type="button"
//           onClick={onPreview}
//           className={`btn btn-sm d-flex align-items-center gap-1.5 ${
//             isDark ? "btn-outline-light" : "btn-outline-secondary"
//           }`}
//         >
//           <Eye size={16} />
//           <span>Preview</span>
//         </button>

//         <button
//           type="button"
//           onClick={onOpenCodeModal}
//           className="btn btn-primary btn-sm d-flex align-items-center gap-1.5"
//         >
//           <Code size={16} />
//           <span>View / Export Code</span>
//         </button>
//       </div>
//     </header>
//   );
// }


// import React, { useState } from 'react';
// import { Sun, Moon, Eye, Download, Copy, Check } from 'lucide-react';

// export default function Header({ rows, theme, setTheme }) {
//   const [copied, setCopied] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);

//   // Pure Form ka Bootstrap HTML Generator
//   const generateHTMLCode = () => {
//     let html = `<form class="container py-3">\n`;

//     rows.forEach((row) => {
//       html += `  <div class="row g-3 mb-3">\n`;
//       row.columns.forEach((col) => {
//         html += `    <div class="col-md-${col.width}">\n`;

//         col.fields.forEach((field) => {
//           if (field.type === 'button') {
//             html += `      <button type="button" class="btn btn-primary w-100">${field.label || 'Submit'}</button>\n`;
//           } else {
//             if (field.label) {
//               html += `      <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>\n`;
//             }

//             if (field.type === 'textarea') {
//               html += `      <textarea class="form-control" placeholder="${field.placeholder || ''}" rows="3"></textarea>\n`;
//             } else if (field.type === 'select') {
//               html += `      <select class="form-select">\n`;
//               (field.options || []).forEach((opt) => {
//                 html += `        <option value="${opt.value}">${opt.label}</option>\n`;
//               });
//               html += `      </select>\n`;
//             } else if (field.type === 'checkbox' || field.type === 'radio') {
//               (field.options || []).forEach((opt, idx) => {
//                 html += `      <div class="form-check">\n`;
//                 html += `        <input class="form-check-input" type="${field.type}" name="${field.id}" id="${field.id}_${idx}">\n`;
//                 html += `        <label class="form-check-label" for="${field.id}_${idx}">${opt.label}</label>\n`;
//                 html += `      </div>\n`;
//               });
//             } else {
//               html += `      <input type="${field.type}" class="form-control" placeholder="${field.placeholder || ''}" />\n`;
//             }
//           }
//         });

//         html += `    </div>\n`;
//       });
//       html += `  </div>\n`;
//     });

//     html += `</form>`;
//     return html;
//   };

//   // 1. Copy Code Handler
//   const handleCopyCode = () => {
//     const code = generateHTMLCode();
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // 2. Download .html File Handler
//   const handleDownloadHTML = () => {
//     const code = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Exported Form</title>
//   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
// </head>
// <body class="p-4 bg-light">
//   ${generateHTMLCode()}
// </body>
// </html>`;

//     const blob = new Blob([code], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'form-builder-output.html';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <header
//         className={`d-flex align-items-center justify-content-between px-3 py-2 border-bottom ${
//           theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'
//         }`}
//         style={{ height: '60px' }}
//       >
//         <div className="fw-bold fs-5">Form Builder</div>

//         <div className="d-flex align-items-center gap-2">
//           {/* Theme Toggle Button */}
//           <button
//             type="button"
//             className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
//             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//           >
//             {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
//           </button>

//           {/* Preview Button */}
//           <button
//             type="button"
//             className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
//             onClick={() => setShowPreview(true)}
//           >
//             <Eye size={16} /> Preview
//           </button>

//           {/* Copy Code Button */}
//           <button
//             type="button"
//             className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
//             onClick={handleCopyCode}
//           >
//             {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
//             {copied ? 'Copied!' : 'Copy Code'}
//           </button>

//           {/* Download HTML Button */}
//           <button
//             type="button"
//             className="btn btn-sm btn-success d-flex align-items-center gap-1"
//             onClick={handleDownloadHTML}
//           >
//             <Download size={16} /> Export HTML
//           </button>
//         </div>
//       </header>

//       {/* Live Preview Modal */}
//       {showPreview && (
//         <div className="modal show d-block tab-modal" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Form Live Preview</h5>
//                 <button
//                   type="button"
//                   className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`}
//                   onClick={() => setShowPreview(false)}
//                 ></button>
//               </div>
//               <div className="modal-body p-4">
//                 <div dangerouslySetInnerHTML={{ __html: generateHTMLCode() }} />
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary btn-sm"
//                   onClick={() => setShowPreview(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import React, { useState } from 'react';
// import { Sun, Moon, Eye, Download, Copy, Check } from 'lucide-react';

// export default function Header({ rows, theme, setTheme }) {
//   const [copied, setCopied] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);

//   // Inspector Style Object ko CSS String mein convert karne ka helper
//   const objectToStyleString = (styleObj = {}) => {
//     return Object.entries(styleObj)
//       .filter(([_, val]) => val !== undefined && val !== null && val !== '')
//       .map(([key, val]) => {
//         // CamelCase (fontSize) ko Kebab-case (font-size) mein convert karein
//         const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
//         return `${kebabKey}: ${val};`;
//       })
//       .join(' ');
//   };

//   // Dynamic Form Code Generator (With Inline Styles)
//   const generateHTMLCode = () => {
//     let html = `<form class="container py-3">\n`;

//     rows.forEach((row) => {
//       html += `  <div class="row g-3 mb-3">\n`;
//       row.columns.forEach((col) => {
//         html += `    <div class="col-md-${col.width}">\n`;

//         col.fields.forEach((field) => {
//           const fieldStyleStr = objectToStyleString(field.style);
//           const labelStyleStr = objectToStyleString(field.labelStyle);

//           if (field.type === 'button') {
//             html += `      <button type="button" class="btn btn-primary w-100" style="${fieldStyleStr}">${field.label || 'Submit'}</button>\n`;
//           } else {
//             if (field.label) {
//               html += `      <label class="form-label" style="${labelStyleStr}">${field.label}${field.required ? ' *' : ''}</label>\n`;
//             }

//             if (field.type === 'textarea') {
//               html += `      <textarea class="form-control" style="${fieldStyleStr}" placeholder="${field.placeholder || ''}" rows="3"></textarea>\n`;
//             } else if (field.type === 'select') {
//               html += `      <select class="form-select" style="${fieldStyleStr}">\n`;
//               (field.options || []).forEach((opt) => {
//                 html += `        <option value="${opt.value}">${opt.label}</option>\n`;
//               });
//               html += `      </select>\n`;
//             } else if (field.type === 'checkbox' || field.type === 'radio') {
//               html += `      <div class="d-flex flex-column gap-1">\n`;
//               (field.options || []).forEach((opt, idx) => {
//                 html += `        <div class="form-check mb-0">\n`;
//                 html += `          <input class="form-check-input" type="${field.type}" name="${field.id}" id="${field.id}_${idx}">\n`;
//                 html += `          <label class="form-check-label" style="${labelStyleStr}" for="${field.id}_${idx}">${opt.label}</label>\n`;
//                 html += `        </div>\n`;
//               });
//               html += `      </div>\n`;
//             } else {
//               html += `      <input type="${field.type}" class="form-control" style="${fieldStyleStr}" placeholder="${field.placeholder || ''}" />\n`;
//             }
//           }
//         });

//         html += `    </div>\n`;
//       });
//       html += `  </div>\n`;
//     });

//     html += `</form>`;
//     return html;
//   };

//   // Copy Code Handler
//   const handleCopyCode = () => {
//     const code = generateHTMLCode();
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Download .html File Handler
//   const handleDownloadHTML = () => {
//     const code = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Exported Form</title>
//   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
// </head>
// <body class="p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}">
//   ${generateHTMLCode()}
// </body>
// </html>`;

//     const blob = new Blob([code], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'form-builder-output.html';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <header
//         className={`d-flex align-items-center justify-content-between px-3 py-2 border-bottom ${
//           theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'
//         }`}
//         style={{ height: '60px' }}
//       >
//         <div className="fw-bold fs-5">Form Builder</div>

//         <div className="d-flex align-items-center gap-2">
//           {/* Theme Toggle Button */}
//           <button
//             type="button"
//             className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
//             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//           >
//             {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
//           </button>

//           {/* Preview Button */}
//           <button
//             type="button"
//             className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
//             onClick={() => setShowPreview(true)}
//           >
//             <Eye size={16} /> Preview
//           </button>

//           {/* Copy Code Button */}
//           <button
//             type="button"
//             className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
//             onClick={handleCopyCode}
//           >
//             {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
//             {copied ? 'Copied!' : 'Copy Code'}
//           </button>

//           {/* Download HTML Button */}
//           <button
//             type="button"
//             className="btn btn-sm btn-success d-flex align-items-center gap-1"
//             onClick={handleDownloadHTML}
//           >
//             <Download size={16} /> Export HTML
//           </button>
//         </div>
//       </header>

//       {/* Live Preview Modal */}
//       {showPreview && (
//         <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}`}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Form Live Preview</h5>
//                 <button
//                   type="button"
//                   className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`}
//                   onClick={() => setShowPreview(false)}
//                 ></button>
//               </div>
//               <div className="modal-body p-4">
//                 <div dangerouslySetInnerHTML={{ __html: generateHTMLCode() }} />
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary btn-sm"
//                   onClick={() => setShowPreview(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import React, { useState } from 'react';
import { Sun, Moon, Eye, Download, Copy, Check, Edit2 } from 'lucide-react';

export default function Header({ rows, theme, setTheme, formTitle, setFormTitle }) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Inspector Style Object ko Inline CSS String (font-size: 14px;) mein convert karne ka helper
  const objectToStyleString = (styleObj = {}) => {
    return Object.entries(styleObj)
      .filter(([_, val]) => val !== undefined && val !== null && val !== '')
      .map(([key, val]) => {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${kebabKey}: ${val};`;
      })
      .join(' ');
  };

  // Full Dynamic Bootstrap HTML Generator
  const generateHTMLCode = () => {
    let html = `<form class="container py-3">\n`;
    html += `  <h3 class="mb-4">${formTitle || 'Form'}</h3>\n`;

    rows.forEach((row) => {
      html += `  <div class="row g-3 mb-3">\n`;
      row.columns.forEach((col) => {
        html += `    <div class="col-md-${col.width}">\n`;

        col.fields.forEach((field) => {
          const fieldStyleStr = objectToStyleString(field.style);
          const labelStyleStr = objectToStyleString(field.labelStyle);

          if (field.type === 'button') {
            html += `      <button type="button" class="btn btn-primary w-100" style="${fieldStyleStr}">${field.label || 'Submit'}</button>\n`;
          } else {
            if (field.label) {
              html += `      <label class="form-label" style="${labelStyleStr}">${field.label}${field.required ? ' *' : ''}</label>\n`;
            }

            if (field.type === 'textarea') {
              html += `      <textarea class="form-control" style="${fieldStyleStr}" placeholder="${field.placeholder || ''}" rows="3"></textarea>\n`;
            } else if (field.type === 'select') {
              html += `      <select class="form-select" style="${fieldStyleStr}">\n`;
              (field.options || []).forEach((opt) => {
                html += `        <option value="${opt.value}">${opt.label}</option>\n`;
              });
              html += `      </select>\n`;
            } else if (field.type === 'checkbox' || field.type === 'radio') {
              html += `      <div class="d-flex flex-column gap-1">\n`;
              (field.options || []).forEach((opt, idx) => {
                html += `        <div class="form-check mb-0">\n`;
                html += `          <input class="form-check-input" type="${field.type}" name="${field.id}" id="${field.id}_${idx}">\n`;
                html += `          <label class="form-check-label" style="${labelStyleStr}" for="${field.id}_${idx}">${opt.label}</label>\n`;
                html += `        </div>\n`;
              });
              html += `      </div>\n`;
            } else {
              html += `      <input type="${field.type}" class="form-control" style="${fieldStyleStr}" placeholder="${field.placeholder || ''}" />\n`;
            }
          }
        });

        html += `    </div>\n`;
      });
      html += `  </div>\n`;
    });

    html += `</form>`;
    return html;
  };

  // Copy Code Handler
  const handleCopyCode = () => {
    const code = generateHTMLCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download .html File Handler
  const handleDownloadHTML = () => {
    const fileName = (formTitle || 'exported-form').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTitle || 'Exported Form'}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}">
  ${generateHTMLCode()}
</body>
</html>`;

    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <header
        className={`d-flex align-items-center justify-content-between px-3 py-2 border-bottom ${
          theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'
        }`}
        style={{ height: '60px' }}
      >
        {/* Form Title (Click to Edit) */}
        <div className="d-flex align-items-center gap-2">
          {isEditingTitle ? (
            <input
              type="text"
              className={`form-control form-control-sm ${theme === 'dark' ? 'bg-secondary text-white border-0' : ''}`}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <div
              className="fw-bold fs-5 cursor-pointer text-truncate d-flex align-items-center gap-2"
              onClick={() => setIsEditingTitle(true)}
              title="Click to rename form"
              style={{ cursor: 'pointer', maxWidth: '300px' }}
            >
              <span>{formTitle || 'Untitled Form'}</span>
              <Edit2 size={14} className="text-muted" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-2">
          {/* Theme Switcher */}
          <button
            type="button"
            className={`btn btn-sm ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Live Preview Modal Button */}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
            onClick={() => setShowPreview(true)}
          >
            <Eye size={16} /> Preview
          </button>

          {/* Copy Code Button */}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
            onClick={handleCopyCode}
          >
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>

          {/* Download HTML File Button */}
          <button
            type="button"
            className="btn btn-sm btn-success d-flex align-items-center gap-1"
            onClick={handleDownloadHTML}
          >
            <Download size={16} /> Export HTML
          </button>
        </div>
      </header>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}`}>
              <div className="modal-header">
                <h5 className="modal-title">Live Form Preview</h5>
                <button
                  type="button"
                  className={`btn-close ${theme === 'dark' ? 'btn-close-white' : ''}`}
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div dangerouslySetInnerHTML={{ __html: generateHTMLCode() }} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}