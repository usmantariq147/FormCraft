import React, { useState } from 'react';

export default function DynamicFormButton({ field }) {
  const [isHovered, setIsHovered] = useState(false);
  const style = field.style || {};

  const buttonStyle = {
    display: style.display || 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isHovered ? (style.hoverBgColor || '#0b5ed7') : (style.bgColor || '#0d6efd'),
    color: isHovered ? (style.hoverTextColor || '#ffffff') : (style.textColor || '#ffffff'),
    borderColor: isHovered ? (style.hoverBorderColor || style.hoverBgColor || '#0a58ca') : (style.borderColor || style.bgColor || '#0d6efd'),
    borderWidth: style.borderWidth || '1px',
    borderStyle: style.borderStyle || 'solid',
    borderRadius: style.borderRadius || '6px',
    padding: style.padding || '8px 16px',
    marginTop: style.marginTop || '0px',
    marginBottom: style.marginBottom || '0px',
    marginLeft: style.marginLeft || '0px',
    marginRight: style.marginRight || '0px',
    fontFamily: style.fontFamily || 'system-ui',
    fontSize: style.fontSize || '14px',
    fontWeight: style.fontWeight || '500',
    width: style.width || 'auto',
    boxShadow: style.boxShadow || 'none',
    cursor: field.disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <button
      type={field.buttonActionType || 'submit'}
      style={buttonStyle}
      disabled={field.disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {field.label || 'Button'}
    </button>
  );
}