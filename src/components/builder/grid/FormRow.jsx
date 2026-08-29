// import React from "react";
// import { Trash2 } from "lucide-react";
// import { FormColumn } from "./FormColumn";

// export const FormRow = ({ row, onDeleteRow, isDark }) => {
//   return (
//     <div className="position-relative mb-3 group-row">
//       <div className="d-flex justify-content-end mb-1">
//         <button
//           onClick={() => onDeleteRow(row.id)}
//           className="btn btn-sm btn-outline-danger border-0 p-1 rounded"
//           title="Delete Row"
//         >
//           <Trash2 size={14} />
//         </button>
//       </div>

//       <div className="row g-2">
//         {row.columns.map((col) => (
//           <FormColumn
//             key={col.id}
//             colWidth={col.width}
//             fields={col.fields}
//             isDark={isDark}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


// import React from 'react';
// import { Trash2 } from 'lucide-react';
// import { FormColumn } from './FormColumn';

// export const FormRow = ({
//   row,
//   onDeleteRow,
//   selectedFieldId,
//   onSelectField,
//   onDeleteField,
//   isDark,
// }) => {
//   return (
//     <div className="position-relative mb-3 group-row">
//       <div className="d-flex justify-content-end mb-1">
//         <button
//           onClick={() => onDeleteRow(row.id)}
//           className="btn btn-sm btn-outline-danger border-0 p-1 rounded"
//           title="Delete Row"
//         >
//           <Trash2 size={14} />
//         </button>
//       </div>

//       <div className="row g-2">
//         {row.columns.map((col) => (
//           <FormColumn
//             key={col.id}
//             colWidth={col.width}
//             fields={col.fields}
//             selectedFieldId={selectedFieldId}
//             onSelectField={onSelectField}
//             onDeleteField={onDeleteField}
//             isDark={isDark}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { Trash2 } from 'lucide-react';
import { FormColumn } from './FormColumn';

export const FormRow = ({
  row,
  onDeleteRow,
  selectedFieldId,
  onSelectField,
  onDeleteField,
  activeColumnId,
  onSelectColumn,
  isDark,
}) => {
  return (
    <div className="position-relative mb-3 group-row">
      <div className="d-flex justify-content-end mb-1">
        <button
          onClick={() => onDeleteRow(row.id)}
          className="btn btn-sm btn-outline-danger border-0 p-1 rounded"
          title="Delete Row"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="row g-2">
        {row.columns.map((col) => (
          <FormColumn
            key={col.id}
            colId={col.id}
            colWidth={col.width}
            fields={col.fields}
            selectedFieldId={selectedFieldId}
            onSelectField={onSelectField}
            onDeleteField={onDeleteField}
            isActive={activeColumnId === col.id}
            onSelectColumn={onSelectColumn}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};