// import React from 'react';
// import { 
//   Type, Lock, AlignLeft, Hash, CheckSquare, 
//   Circle, ChevronDown, Calendar, Upload, 
//   Palette, Sliders, MousePointerClick, ChevronLeft
// } from 'lucide-react';

// export default function Sidebar({ onAddField, theme, isCollapsed, onToggle }) {
//   const isDark = theme === 'dark';

//   const sidebarBg = isDark 
//     ? 'bg-dark text-white border-secondary' 
//     : 'bg-white text-dark border-secondary-subtle';

//   const headingColor = isDark ? 'text-white' : 'text-slate-800 fw-bold';
  
//   const btnClass = `btn text-start d-flex align-items-center gap-2 p-2 rounded border w-100 ${
//     isDark 
//       ? 'bg-secondary bg-opacity-25 text-white border-secondary hover-dark' 
//       : 'bg-white text-dark border-slate-200 shadow-sm'
//   }`;

//   const groupContainerBg = isDark 
//     ? 'bg-secondary bg-opacity-10 border-secondary' 
//     : 'bg-slate-50 border-slate-200';

//   const iconColor = isDark ? 'text-info' : 'text-primary';

//   // Collapsed Sidebar View
//   if (isCollapsed) {
//     return (
//       <div className={`d-flex flex-column align-items-center py-3 h-100 border-end ${sidebarBg}`} style={{ width: '50px' }}>
//         <button className={`btn btn-sm mb-3 border ${isDark ? 'btn-outline-light' : 'btn-light'}`} onClick={onToggle} title="Expand Sidebar">
//           <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
//         </button>
//         <div className={`extra-small text-uppercase fw-bold ${isDark ? 'text-white' : 'text-muted'}`} style={{ writingMode: 'vertical-rl' }}>
//           Form Elements
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`sidebar border-end h-100 p-3 overflow-y-auto ${sidebarBg}`} style={{ width: '260px' }}>
//       {/* Header with Collapse Button */}
//       <div className="d-flex align-items-center justify-content-between mb-3">
//         <h6 className={`fs-7 text-uppercase tracking-wider mb-0 ${headingColor}`}>Form Elements</h6>
//         <button className={`btn btn-sm border p-1 ${isDark ? 'btn-outline-light' : 'btn-light'}`} onClick={onToggle} title="Collapse Sidebar">
//           <ChevronLeft size={18} />
//         </button>
//       </div>

//       <div className="d-flex flex-column gap-2">
//         <button onClick={() => onAddField('text')} className={btnClass}>
//           <Type size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Text Input</span>
//         </button>

//         <button onClick={() => onAddField('password')} className={btnClass}>
//           <Lock size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Password Input</span>
//         </button>

//         <button onClick={() => onAddField('textarea')} className={btnClass}>
//           <AlignLeft size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Textarea (Multiline)</span>
//         </button>

//         <button onClick={() => onAddField('number')} className={btnClass}>
//           <Hash size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Number Input</span>
//         </button>

//         {/* Group Section */}
//         <div className={`p-2 rounded border my-1 ${groupContainerBg}`}>
//           <button onClick={() => onAddField('checkbox')} className={`btn text-start d-flex align-items-center gap-2 p-1.5 w-100 mb-1 ${isDark ? 'text-white' : 'text-dark'}`}>
//             <CheckSquare size={16} className={iconColor} />
//             <span className="extra-small fw-medium">Checkbox Group</span>
//           </button>
//           <button onClick={() => onAddField('radio')} className={`btn text-start d-flex align-items-center gap-2 p-1.5 w-100 mb-1 ${isDark ? 'text-white' : 'text-dark'}`}>
//             <Circle size={16} className={iconColor} />
//             <span className="extra-small fw-medium">Radio Button Group</span>
//           </button>
//           <button onClick={() => onAddField('select')} className={`btn text-start d-flex align-items-center gap-2 p-1.5 w-100 ${isDark ? 'text-white' : 'text-dark'}`}>
//             <ChevronDown size={16} className={iconColor} />
//             <span className="extra-small fw-medium">Dropdown Select</span>
//           </button>
//         </div>

//         <button onClick={() => onAddField('date')} className={btnClass}>
//           <Calendar size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Date / Time Picker</span>
//         </button>

//         <button onClick={() => onAddField('file')} className={btnClass}>
//           <Upload size={16} className={iconColor} />
//           <span className="extra-small fw-medium">File Upload</span>
//         </button>

//         <button onClick={() => onAddField('color')} className={btnClass}>
//           <Palette size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Color Picker</span>
//         </button>

//         <button onClick={() => onAddField('range')} className={btnClass}>
//           <Sliders size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Range Slider</span>
//         </button>

//         <button onClick={() => onAddField('button')} className={`mt-2 ${btnClass}`}>
//           <MousePointerClick size={16} className={iconColor} />
//           <span className="extra-small fw-medium">Action Button</span>
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import {
  Type,
  AlignLeft,
  CheckSquare,
  Radio,
  List,
  Sliders,
  Calendar,
  Clock,
  Upload,
  Square,
  MousePointerClick
} from 'lucide-react';

export default function Sidebar({ onAddField, theme }) {
  const isDark = theme === 'dark';

  const formElements = [
    { type: 'text', label: 'Text Field', icon: Type },
    { type: 'textarea', label: 'Text Area', icon: AlignLeft },
    { type: 'select', label: 'Select Dropdown', icon: List },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'radio', label: 'Radio Buttons', icon: Radio },
    { type: 'range', label: 'Range Slider', icon: Sliders },
    { type: 'date', label: 'Date Picker', icon: Calendar },
    { type: 'time', label: 'Time Picker', icon: Clock },
    { type: 'file', label: 'File Upload', icon: Upload },
    { type: 'button', label: 'Button', icon: MousePointerClick },
  ];

  return (
    <div
      className={`sidebar-container p-3 border-end transition-all overflow-auto ${
        isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'
      }`}
      style={{ width: '260px', minWidth: '260px', height: '100vh' }}
    >
      <h6 className="fw-bold mb-3 px-1 opacity-75">Form Elements</h6>
      <div className="d-flex flex-column gap-2">
        {formElements.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onAddField(item.type)}
              className={`btn btn-sm text-start d-flex align-items-center gap-2 p-2.5 rounded border transition-all ${
                isDark
                  ? 'btn-outline-light border-secondary hover-bg-secondary'
                  : 'btn-light border-light-subtle shadow-sm'
              }`}
            >
              <IconComponent size={16} className="text-primary" />
              <span className="small font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}