// import React, { useState } from "react";
// import Header from "../src/components/layout/Header";
// import Sidebar from "../src/components/builder/Sidebar";
// import Canvas from "../src/components/builder/Canvas";
// import Inspector from "../src/components/inspector/Inspector";
// import FullScreenModal from "../src/components/preview/FullScreenModal";
// import CodeView from "../src/components/export/CodeView";

// export default function App() {
//   const [fields, setFields] = useState([]);
//   const [selectedFieldId, setSelectedFieldId] = useState(null);

//   // App Theme State ('light' | 'dark')
//   const [appTheme, setAppTheme] = useState('light');

//   // Modals & Panels Toggles
//   const [showCodeModal, setShowCodeModal] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [showClearModal, setShowClearModal] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [inspectorCollapsed, setInspectorCollapsed] = useState(false);

//   const selectedField = fields.find((f) => f.id === selectedFieldId);

//   const toggleTheme = () => {
//     setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const handleAddField = (fieldType) => {
//     const defaultOptions = ['checkbox', 'radio', 'select'].includes(fieldType)
//       ? [
//           { label: 'Option 1', value: 'option_1' },
//           { label: 'Option 2', value: 'option_2' },
//         ]
//       : [];

//       const newField = {
//         id: `field_${Date.now()}`,
//         type: fieldType,
//         label: fieldType === 'button' ? 'Submit' : `New ${fieldType} Field`,
//         name: `input_${Date.now()}`,
//         customId: `id_${Date.now()}`,
//         customClass: '',
//         helpText: '',
//         placeholder: ['text', 'password', 'email', 'number', 'tel', 'url', 'textarea', 'search'].includes(fieldType) ? 'Enter value...' : '',
//         defaultValue: '',
//         required: false,
//         disabled: false,
//         readOnly: false,
//         autoFocus: false,
//         // Validation & Regex
//         minLength: '',
//         maxLength: '',
//         pattern: '',
//         patternError: '',
//         // Option fields
//         options: defaultOptions,
//         optionsLayout: 'column',
//         // Numeric / Range
//         min: ['number', 'range'].includes(fieldType) ? 0 : '',
//         max: ['number', 'range'].includes(fieldType) ? 100 : '',
//         step: ['number', 'range'].includes(fieldType) ? 1 : '',
//         // File & Textarea
//         accept: fieldType === 'file' ? '' : '',
//         multiple: false,
//         rows: fieldType === 'textarea' ? 4 : undefined,
//         buttonType: fieldType === 'button' ? 'submit' : undefined,
//         style: {
//           backgroundColor: fieldType === 'button' ? '#0d6efd' : '#ffffff',
//           color: fieldType === 'button' ? '#ffffff' : '#212529',
//           fontSize: '14px',
//           fontWeight: '400',
//           textTransform: 'none',
//           textAlign: 'left',
//           borderRadius: '6px',
//           borderWidth: '1px',
//           borderStyle: 'solid',
//           borderColor: '#dee2e6',
//           padding: fieldType === 'button' ? '8px 16px' : '6px 12px',
//           margin: '0px',
//           width: '100%',
//           height: 'auto',
//           boxShadow: 'none',
//           opacity: '1',
//         },
//         hoverStyle: {
//           backgroundColor: fieldType === 'button' ? '#0b5ed7' : '#ffffff',
//           color: fieldType === 'button' ? '#ffffff' : '#212529',
//           borderColor: fieldType === 'button' ? '#0a58ca' : '#ced4da',
//         },
//         labelStyle: {
//           color: '#212529',
//           fontSize: '13px',
//           fontWeight: '600',
//           marginBottom: '4px',
//         },
//       };
//     setFields([...fields, newField]);
//     setSelectedFieldId(newField.id);
//   };

//   const handleUpdateField = (updatedField) => {
//     setFields(fields.map((f) => (f.id === updatedField.id ? updatedField : f)));
//   };

//   const handleDeleteField = (id) => {
//     setFields(fields.filter((f) => f.id !== id));
//     if (selectedFieldId === id) setSelectedFieldId(null);
//   };

//   const handleConfirmClear = () => {
//     setFields([]);
//     setSelectedFieldId(null);
//     setShowClearModal(false);
//   };

//   return (
//     <div className={`d-flex flex-column vh-100 w-100 overflow-hidden ${appTheme === 'dark' ? 'bg-black text-white' : 'bg-light text-dark'}`}>
//       <Header
//         onClearForm={() => setShowClearModal(true)}
//         onOpenCodeModal={() => setShowCodeModal(true)}
//         onPreview={() => setShowPreviewModal(true)}
//         theme={appTheme}
//         onToggleTheme={toggleTheme}
//       />

//       <div className="d-flex flex-grow-1 overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>
//         {/* Sidebar */}
//         <div
//           className="flex-shrink-0 h-100"
//           style={{
//             width: sidebarCollapsed ? '50px' : '280px',
//             transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//             overflow: 'hidden',
//           }}
//         >
//           <Sidebar
//             onAddField={handleAddField}
//             isCollapsed={sidebarCollapsed}
//             onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
//             theme={appTheme}
//           />
//         </div>

//         {/* Canvas */}
//         <div className={`flex-grow-1 overflow-y-auto p-4 h-100 ${appTheme === 'dark' ? 'bg-dark bg-opacity-50' : 'bg-light'}`}>
//           <div className="container-fluid max-w-lg mx-auto">
//             <Canvas
//               fields={fields}
//               selectedFieldId={selectedFieldId}
//               onSelectField={setSelectedFieldId}
//               onDeleteField={handleDeleteField}
//               theme={appTheme}
//             />
//           </div>
//         </div>

//         {/* Inspector */}
//         <div
//           className="flex-shrink-0 h-100"
//           style={{
//             width: inspectorCollapsed ? '50px' : '320px',
//             transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//             overflow: 'hidden',
//           }}
//         >
//           <Inspector
//             selectedField={selectedField}
//             onUpdateField={handleUpdateField}
//             isCollapsed={inspectorCollapsed}
//             onToggle={() => setInspectorCollapsed(!inspectorCollapsed)}
//             theme={appTheme}
//           />
//         </div>
//       </div>

//       {/* Export Code Modal */}
//       {showCodeModal && (
//         <CodeView
//           fields={fields}
//           onClose={() => setShowCodeModal(false)}
//           theme={appTheme}
//         />
//       )}

//       {/* Live Preview Modal */}
//       <FullScreenModal
//         show={showPreviewModal}
//         onClose={() => setShowPreviewModal(false)}
//         fields={fields}
//         theme={appTheme}
//         onToggleTheme={toggleTheme}
//       />

//       {/* Clear Confirmation Modal */}
//       {showClearModal && (
//         <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1060 }}>
//           <div className="modal-dialog modal-dialog-centered modal-sm">
//             <div className="modal-content text-center p-3">
//               <h6 className="fw-bold mb-3">Clear Entire Form?</h6>
//               <div className="d-flex justify-content-center gap-2">
//                 <button className="btn btn-light btn-sm" onClick={() => setShowClearModal(false)}>Cancel</button>
//                 <button className="btn btn-danger btn-sm" onClick={handleConfirmClear}>Yes, Clear</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import Sidebar from './components/builder/Sidebar';
// import Canvas from './components/builder/Canvas';
// import Inspector from './components/inspector/Inspector';

// export default function App() {
//   const [theme, setTheme] = useState('light');
//   const [selectedField, setSelectedField] = useState(null);
//   const [newFieldToAdd, setNewFieldToAdd] = useState(null);

//   // Sidebar se jab bhi koi element (Textarea, Input, Button) click hoga
//   const handleAddField = (type) => {
//     const fieldObj = {
//       id: `field_${Date.now()}`,
//       type: type,
//       label: type === 'button' ? 'Submit Button' : `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
//       placeholder: `Enter ${type}...`,
//       required: false,
//       helpText: '',
//       disabled: false,
//       readOnly: false,
//       style: {
//         width: '100%',
//         color: theme === 'dark' ? '#ffffff' : '#212529',
//         backgroundColor: theme === 'dark' ? '#2b3035' : '#ffffff',
//         fontSize: '14px',
//         borderRadius: '6px',
//         padding: '6px 12px',
//       },
//       labelStyle: {
//         color: theme === 'dark' ? '#e0e0e0' : '#212529',
//         fontSize: '13px',
//         fontWeight: '600',
//       },
//       options: type === 'select' || type === 'radio' || type === 'checkbox' ? [
//         { label: 'Option 1', value: 'opt_1' },
//         { label: 'Option 2', value: 'opt_2' },
//       ] : [],
//     };

//     // Naya field Canvas ko trigger ke tor par bhejo
//     setNewFieldToAdd(fieldObj);
//   };

//   return (
//     <div className={`d-flex vh-100 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
//       {/* Sidebar - Passing handleAddField */}
//       <Sidebar onAddField={handleAddField} theme={theme} />

//       {/* Main Canvas Area */}
//       <Canvas
//         newFieldToAdd={newFieldToAdd}
//         selectedFieldId={selectedField?.id}
//         onSelectField={(fieldId) => setSelectedField({ id: fieldId })}
//         onDeleteField={(fieldId) => {
//           /* Canvas state internal update karega */
//         }}
//         theme={theme}
//       />

//       {/* Right Side Inspector */}
//       {/* <Inspector selectedField={selectedField} theme={theme} /> */}
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import Sidebar from './components/builder/Sidebar';
// import Canvas from './components/builder/Canvas';

// export default function App() {
//   const [theme, setTheme] = useState('light');
//   const [rows, setRows] = useState([]);
//   const [activeColumnId, setActiveColumnId] = useState(null);
//   const [selectedFieldId, setSelectedFieldId] = useState(null);

//   // 1. New Row Add Logic
//   const handleAddRow = (columnWidths) => {
//     const timestamp = Date.now();
//     const newColumns = columnWidths.map((width, idx) => ({
//       id: `col_${timestamp}_${idx}`,
//       width: width,
//       fields: [],
//     }));

//     const newRow = {
//       id: `row_${timestamp}`,
//       columns: newColumns,
//     };

//     setRows((prev) => [...prev, newRow]);
//     setActiveColumnId(newColumns[0].id); // Auto-active first column
//   };

//   // 2. Delete Row Logic
//   const handleDeleteRow = (rowId) => {
//     setRows((prev) => prev.filter((row) => row.id !== rowId));
//     setActiveColumnId(null);
//   };

//   // 3. Delete Field Logic
//   const handleDeleteField = (fieldId) => {
//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         columns: row.columns.map((col) => ({
//           ...col,
//           fields: col.fields.filter((f) => f.id !== fieldId),
//         })),
//       }))
//     );
//   };

//   // 4. Sidebar Element Click Logic (Direct Active Column Insertion)
//   const handleAddField = (type) => {
//     if (rows.length === 0) {
//       alert("Pehle '+' button par click karke kam az kam aik Row add karein!");
//       return;
//     }

//     // Target Column choose karo
//     let targetColId = activeColumnId;
//     if (!targetColId && rows.length > 0) {
//       targetColId = rows[0].columns[0].id;
//       setActiveColumnId(targetColId);
//     }

//     const newField = {
//       id: `field_${Date.now()}`,
//       type: type,
//       label: type === 'button' ? 'Submit Button' : `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
//       placeholder: `Enter ${type}...`,
//       required: false,
//       helpText: '',
//       disabled: false,
//       readOnly: false,
//       style: {
//         width: '100%',
//         color: theme === 'dark' ? '#ffffff' : '#212529',
//         backgroundColor: theme === 'dark' ? '#2b3035' : '#ffffff',
//         fontSize: '14px',
//         borderRadius: '6px',
//         padding: '6px 12px',
//       },
//       labelStyle: {
//         color: theme === 'dark' ? '#e0e0e0' : '#212529',
//         fontSize: '13px',
//         fontWeight: '600',
//       },
//       options: ['select', 'radio', 'checkbox'].includes(type) ? [
//         { label: 'Option 1', value: 'opt_1' },
//         { label: 'Option 2', value: 'opt_2' },
//       ] : [],
//     };

//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         columns: row.columns.map((col) => {
//           if (col.id === targetColId) {
//             return {
//               ...col,
//               fields: [...col.fields, newField],
//             };
//           }
//           return col;
//         }),
//       }))
//     );
//   };

//   return (
//     <div className={`d-flex vh-100 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
//       <Sidebar onAddField={handleAddField} theme={theme} />
      
//       <Canvas
//         rows={rows}
//         onAddRow={handleAddRow}
//         onDeleteRow={handleDeleteRow}
//         activeColumnId={activeColumnId}
//         onSelectColumn={setActiveColumnId}
//         selectedFieldId={selectedFieldId}
//         onSelectField={setSelectedFieldId}
//         onDeleteField={handleDeleteField}
//         theme={theme}
//       />
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import Sidebar from './components/builder/Sidebar';
// import Canvas from './components/builder/Canvas';
// import Inspector from './components/inspector/Inspector';
// import Header from './components/layout/Header';

// export default function App() {
//   const [theme, setTheme] = useState('light');
//   const [rows, setRows] = useState([]);
//   const [activeColumnId, setActiveColumnId] = useState(null);
//   const [selectedFieldId, setSelectedFieldId] = useState(null);
//   const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false);

//   // 1. Add New Row Logic
//   const handleAddRow = (columnWidths) => {
//     const timestamp = Date.now();
//     const newColumns = columnWidths.map((width, idx) => ({
//       id: `col_${timestamp}_${idx}`,
//       width: width,
//       fields: [],
//     }));

//     const newRow = {
//       id: `row_${timestamp}`,
//       columns: newColumns,
//     };

//     setRows((prev) => [...prev, newRow]);
//     setActiveColumnId(newColumns[0].id);
//   };

//   // 2. Delete Row Logic
//   const handleDeleteRow = (rowId) => {
//     setRows((prev) => prev.filter((row) => row.id !== rowId));
//     if (selectedFieldId) setSelectedFieldId(null);
//   };

//   // 3. Delete Field Logic
//   const handleDeleteField = (fieldId) => {
//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         columns: row.columns.map((col) => ({
//           ...col,
//           fields: col.fields.filter((f) => f.id !== fieldId),
//         })),
//       }))
//     );
//     if (selectedFieldId === fieldId) setSelectedFieldId(null);
//   };

//   // 4. Add Field to Active Column Logic
//   const handleAddField = (type) => {
//     if (rows.length === 0) {
//       alert("Pehle '+' button par click karke kam az kam aik Row add karein!");
//       return;
//     }

//     let targetColId = activeColumnId;
//     if (!targetColId && rows.length > 0) {
//       targetColId = rows[0].columns[0].id;
//       setActiveColumnId(targetColId);
//     }

//     const newFieldId = `field_${Date.now()}`;
//     const newField = {
//       id: newFieldId,
//       type: type,
//       label: type === 'button' ? 'Submit Button' : `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
//       placeholder: `Enter ${type}...`,
//       required: false,
//       helpText: '',
//       disabled: false,
//       readOnly: false,
//       style: {
//         width: '100%',
//         color: theme === 'dark' ? '#ffffff' : '#212529',
//         backgroundColor: theme === 'dark' ? '#2b3035' : '#ffffff',
//         fontSize: '14px',
//         borderRadius: '6px',
//         padding: '6px 12px',
//       },
//       labelStyle: {
//         color: theme === 'dark' ? '#e0e0e0' : '#212529',
//         fontSize: '13px',
//         fontWeight: '600',
//       },
//       options: ['select', 'radio', 'checkbox'].includes(type)
//         ? [
//             { label: 'Option 1', value: 'opt_1' },
//             { label: 'Option 2', value: 'opt_2' },
//           ]
//         : [],
//     };

//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         columns: row.columns.map((col) => {
//           if (col.id === targetColId) {
//             return {
//               ...col,
//               fields: [...col.fields, newField],
//             };
//           }
//           return col;
//         }),
//       }))
//     );

//     // Auto-select newly created field in Inspector
//     setSelectedFieldId(newFieldId);
//   };

//   // 5. Inspector update function (Live sync updates across nested columns)
//   const handleUpdateField = (updatedField) => {
//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         columns: row.columns.map((col) => ({
//           ...col,
//           fields: col.fields.map((f) => (f.id === updatedField.id ? updatedField : f)),
//         })),
//       }))
//     );
//   };

//   // Currently Selected Field Find Karne Ka Logic
//   let selectedField = null;
//   if (selectedFieldId) {
//     for (const row of rows) {
//       for (const col of row.columns) {
//         const found = col.fields.find((f) => f.id === selectedFieldId);
//         if (found) {
//           selectedField = found;
//           break;
//         }
//       }
//       if (selectedField) break;
//     }
//   }

  // return (
  //   <div className={`d-flex vh-100 overflow-hidden ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
  //     {/* Left Sidebar */}
  //     <Sidebar onAddField={handleAddField} theme={theme} />
      
  //     {/* Canvas Area */}
  //     <Canvas
  //       rows={rows}
  //       onAddRow={handleAddRow}
  //       onDeleteRow={handleDeleteRow}
  //       activeColumnId={activeColumnId}
  //       onSelectColumn={setActiveColumnId}
  //       selectedFieldId={selectedFieldId}
  //       onSelectField={setSelectedFieldId}
  //       onDeleteField={handleDeleteField}
  //       theme={theme}
  //     />

  //     {/* Right Inspector Panel */}
  //     <Inspector
  //       selectedField={selectedField}
  //       onUpdateField={handleUpdateField}
  //       isCollapsed={isInspectorCollapsed}
  //       onToggle={() => setIsInspectorCollapsed(!isInspectorCollapsed)}
  //       theme={theme}
  //     />
  //   </div>
  // );
  
  // return (
  //   <div className={`d-flex flex-column vh-100 overflow-hidden ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
  //     {/* Top Header Controls */}
  //     <Header rows={rows} theme={theme} setTheme={setTheme} />
  
  //     {/* Main Builder Body */}
  //     <div className="d-flex flex-grow-1 overflow-hidden">
  //       <Sidebar onAddField={handleAddField} theme={theme} />
        
  //       <Canvas
  //         rows={rows}
  //         onAddRow={handleAddRow}
  //         onDeleteRow={handleDeleteRow}
  //         activeColumnId={activeColumnId}
  //         onSelectColumn={setActiveColumnId}
  //         selectedFieldId={selectedFieldId}
  //         onSelectField={setSelectedFieldId}
  //         onDeleteField={handleDeleteField}
  //         theme={theme}
  //       />
  
  //       <Inspector
  //         selectedField={selectedField}
  //         onUpdateField={handleUpdateField}
  //         isCollapsed={isInspectorCollapsed}
  //         onToggle={() => setIsInspectorCollapsed(!isInspectorCollapsed)}
  //         theme={theme}
  //       />
  //     </div>
  //   </div>
  // );
// }
import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/builder/Sidebar';
import Canvas from './components/builder/Canvas';
import Inspector from './components/inspector/Inspector';

export default function App() {
  // Main Builder States
  const [rows, setRows] = useState([]);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');

  // Form Initial Setup States
  const [formTitle, setFormTitle] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [isFormCreated, setIsFormCreated] = useState(false);

  // Form Creation Submit Handler
  const handleCreateForm = (e) => {
    e.preventDefault();
    if (!tempTitle.trim()) return;
    setFormTitle(tempTitle.trim());
    setIsFormCreated(true);
  };

  // Robust Row Addition Handler (Handles all layout types safely)
  const handleAddRow = (layoutType) => {
    let columnsConfig = [12]; // Default 1 full column

    const typeStr = String(layoutType).toLowerCase();

    if (typeStr === '1' || typeStr === '12' || typeStr === 'full' || typeStr === '1-col') {
      columnsConfig = [12];
    } else if (typeStr === '2' || typeStr === '6-6' || typeStr === '50-50' || typeStr === '2-col') {
      columnsConfig = [6, 6];
    } else if (typeStr === '3' || typeStr === '4-4-4' || typeStr === '3-col') {
      columnsConfig = [4, 4, 4];
    } else if (typeStr === '4' || typeStr === '3-3-3-3' || typeStr === '4-col') {
      columnsConfig = [3, 3, 3, 3];
    } else if (typeStr === '2-1' || typeStr === '8-4') {
      columnsConfig = [8, 4];
    } else if (typeStr === '1-2' || typeStr === '4-8') {
      columnsConfig = [4, 8];
    } else if (Array.isArray(layoutType)) {
      columnsConfig = layoutType;
    }

    const newCols = columnsConfig.map((width, idx) => ({
      id: `col-${Date.now()}-${idx}`,
      width,
      fields: [],
    }));

    const newRow = {
      id: `row-${Date.now()}`,
      layout: layoutType,
      columns: newCols,
    };

    setRows((prev) => [...prev, newRow]);

    // Automatically highlight/select the first column of the new row
    if (newCols.length > 0) {
      setActiveColumnId(newCols[0].id);
    }
  };

  const handleDeleteRow = (rowId) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId));
    setActiveColumnId(null);
    setSelectedFieldId(null);
  };

  // Field operations
  const handleAddField = (fieldType) => {
    if (!activeColumnId) {
      alert('Pehle canvas se kisi Column ko click karke select karein!');
      return;
    }

    const newField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: fieldType === 'button' ? 'Submit' : `New ${fieldType}`,
      placeholder: fieldType === 'button' ? '' : 'Enter text...',
      required: false,
      style: {
        fontSize: '16px',
        color: '#000000',
        backgroundColor: fieldType === 'button' ? '#0d6efd' : '#ffffff',
        borderRadius: '4px',
        padding: '6px',
      },
      labelStyle: {
        fontSize: '14px',
        color: '#000000',
        fontWeight: 'normal',
      },
      options:
        fieldType === 'select' || fieldType === 'checkbox' || fieldType === 'radio'
          ? [
              { label: 'Option 1', value: 'opt1' },
              { label: 'Option 2', value: 'opt2' },
            ]
          : [],
    };

    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        columns: row.columns.map((col) => {
          if (col.id === activeColumnId) {
            return { ...col, fields: [...col.fields, newField] };
          }
          return col;
        }),
      }))
    );

    setSelectedFieldId(newField.id);
  };

  const handleDeleteField = (fieldId) => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        columns: row.columns.map((col) => ({
          ...col,
          fields: col.fields.filter((f) => f.id !== fieldId),
        })),
      }))
    );
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
  };

  const handleUpdateField = (updatedField) => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        columns: row.columns.map((col) => ({
          ...col,
          fields: col.fields.map((f) => (f.id === updatedField.id ? updatedField : f)),
        })),
      }))
    );
  };

  // Selected Field Finder
  let selectedField = null;
  if (selectedFieldId) {
    for (const row of rows) {
      for (const col of row.columns) {
        const found = col.fields.find((f) => f.id === selectedFieldId);
        if (found) {
          selectedField = found;
          break;
        }
      }
    }
  }

  return (
    <div className={`vh-100 overflow-hidden ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      
      {/* 1. Initial Form Creation Modal */}
      {!isFormCreated && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content shadow-lg ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}>
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title fw-bold">Create New Form</h4>
              </div>
              <form onSubmit={handleCreateForm}>
                <div className="modal-body py-4">
                  <p className="text-muted small mb-3">
                    Apne form ka name likhein taake builder tools activate ho sakein.
                  </p>
                  <label className="form-label fw-bold">Form Name / Title *</label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${theme === 'dark' ? 'bg-secondary text-white border-0' : ''}`}
                    placeholder="e.g. Contact Us Form, User Registration..."
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold">
                    Start Building &rarr;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Builder Interface */}
      {isFormCreated && (
        <div className="d-flex flex-column h-100">
          <Header
            rows={rows}
            theme={theme}
            setTheme={setTheme}
            formTitle={formTitle}
            setFormTitle={setFormTitle}
          />

          <div className="d-flex flex-grow-1 overflow-hidden">
            <Sidebar onAddField={handleAddField} theme={theme} />

            <Canvas
              rows={rows}
              onAddRow={handleAddRow}
              onDeleteRow={handleDeleteRow}
              activeColumnId={activeColumnId}
              onSelectColumn={setActiveColumnId}
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
              onDeleteField={handleDeleteField}
              theme={theme}
            />

            <Inspector
              selectedField={selectedField}
              onUpdateField={handleUpdateField}
              isCollapsed={isInspectorCollapsed}
              onToggle={() => setIsInspectorCollapsed(!isInspectorCollapsed)}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
}