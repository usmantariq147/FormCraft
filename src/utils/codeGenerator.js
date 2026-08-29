// Style Object ko Inline CSS me convert karne k liye helper
const styleToCssString = (styleObj) => {
  if (!styleObj || typeof styleObj !== 'object') return '';
  try {
    return Object.entries(styleObj)
      .filter(([_, val]) => val !== '' && val !== null && val !== undefined)
      .map(([key, val]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${val}`;
      })
      .join('; ');
  } catch (err) {
    return '';
  }
};

export function generateBootstrapHTML(fields) {
  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return `<!-- FormCraft: Add elements on canvas to generate code -->`;
  }

  try {
    const fieldsHTML = fields
      .map((field) => {
        if (!field) return '';

        const fieldId = field.customId || field.id || `field_${Math.random().toString(36).substr(2, 6)}`;
        const customClass = field.customClass || '';
        const baseCss = styleToCssString(field.style);
        const labelCss = styleToCssString(field.labelStyle);

        const requiredAttr = field.required ? ' required' : '';
        const disabledAttr = field.disabled ? ' disabled' : '';
        const readOnlyAttr = field.readOnly ? ' readonly' : '';
        const autoFocusAttr = field.autoFocus ? ' autofocus' : '';
        const minLengthAttr = field.minLength ? ` minlength="${field.minLength}"` : '';
        const maxLengthAttr = field.maxLength ? ` maxlength="${field.maxLength}"` : '';
        const patternAttr = field.pattern ? ` pattern="${field.pattern}"` : '';
        const patternTitleAttr = field.patternError ? ` title="${field.patternError}"` : '';
        const defaultValueAttr = field.defaultValue ? ` value="${field.defaultValue}"` : '';
        const nameAttr = field.name ? ` name="${field.name}"` : '';

        const requiredMark = field.required ? ' <span class="text-danger">*</span>' : '';
        const helpTextHtml = field.helpText ? `\n    <div class="form-text extra-small text-muted mt-1">${field.helpText}</div>` : '';

        switch (field.type) {
          case 'textarea':
            return `  <!-- Textarea Input -->
  <div class="mb-3">
    <label for="${fieldId}" class="form-label" style="${labelCss}">${field.label || 'Label'}${requiredMark}</label>
    <textarea class="form-control ${customClass}" id="${fieldId}"${nameAttr} rows="${field.rows || 3}" placeholder="${field.placeholder || ''}" style="${baseCss}"${requiredAttr}${disabledAttr}${readOnlyAttr}${autoFocusAttr}${minLengthAttr}${maxLengthAttr}>${field.defaultValue || ''}</textarea>${helpTextHtml}
  </div>`;

          case 'select':
            const optionsHTML = (field.options || [])
              .map((opt) => {
                if (typeof opt === 'object' && opt !== null) {
                  return `      <option value="${opt.value}">${opt.label}</option>`;
                }
                return `      <option value="${String(opt).toLowerCase().replace(/\s+/g, '_')}">${opt}</option>`;
              })
              .join('\n');

            return `  <!-- Select Dropdown -->
  <div class="mb-3">
    <label for="${fieldId}" class="form-label" style="${labelCss}">${field.label || 'Label'}${requiredMark}</label>
    <select class="form-select ${customClass}" id="${fieldId}"${nameAttr} style="${baseCss}"${requiredAttr}${disabledAttr}${autoFocusAttr}>
      <option value="" selected disabled>Select an option...</option>
${optionsHTML}
    </select>${helpTextHtml}
  </div>`;

          case 'checkbox':
          case 'radio':
            const isRow = field.optionsLayout === 'row';
            const choicesHtml = (field.options || [])
              .map((opt, idx) => {
                const optVal = typeof opt === 'object' ? opt.value : opt;
                const optLbl = typeof opt === 'object' ? opt.label : opt;
                return `    <div class="form-check ${isRow ? 'form-check-inline' : 'mb-2'}">
      <input class="form-check-input" type="${field.type}" name="${field.name || fieldId}" id="${fieldId}_opt_${idx}" value="${optVal}"${requiredAttr}${disabledAttr}>
      <label class="form-check-label" for="${fieldId}_opt_${idx}">${optLbl}</label>
    </div>`;
              })
              .join('\n');

            return `  <!-- ${field.type.toUpperCase()} Field -->
  <div class="mb-3">
    <label class="form-label d-block" style="${labelCss}">${field.label || 'Label'}${requiredMark}</label>
${choicesHtml}${helpTextHtml}
  </div>`;

          case 'button':
            return `  <!-- Custom Button -->
  <div class="mb-3">
    <button type="${field.buttonType || 'submit'}" class="btn ${customClass || 'btn-primary'}" id="${fieldId}" style="${baseCss}"${disabledAttr}>
      ${field.label || 'Button'}
    </button>
  </div>`;

          case 'file':
            const acceptAttr = field.accept ? ` accept="${field.accept}"` : '';
            const multipleAttr = field.multiple ? ' multiple' : '';
            return `  <!-- File Upload Input -->
  <div class="mb-3">
    <label for="${fieldId}" class="form-label" style="${labelCss}">${field.label || 'Label'}${requiredMark}</label>
    <input class="form-control ${customClass}" type="file" id="${fieldId}"${nameAttr}${acceptAttr}${multipleAttr} style="${baseCss}"${requiredAttr}${disabledAttr}${autoFocusAttr}>${helpTextHtml}
  </div>`;

          case 'number':
          case 'range':
            const minAttr = field.min !== '' && field.min !== undefined ? ` min="${field.min}"` : '';
            const maxAttr = field.max !== '' && field.max !== undefined ? ` max="${field.max}"` : '';
            const stepAttr = field.step !== '' && field.step !== undefined ? ` step="${field.step}"` : '';
            return `  <!-- ${field.type.toUpperCase()} Input -->
  <div class="mb-3">
    <label for="${fieldId}" class="form-label" style="${labelCss}">${field.label || 'Label'}${requiredMark}</label>
    <input type="${field.type}" class="${field.type === 'range' ? 'form-range' : 'form-control'} ${customClass}" id="${fieldId}"${nameAttr}${minAttr}${maxAttr}${stepAttr}${defaultValueAttr} placeholder="${field.placeholder || ''}" style="${baseCss}"${requiredAttr}${disabledAttr}${readOnlyAttr}${autoFocusAttr}>${helpTextHtml}
  </div>`;

          default:
            // Handles text, email, password, tel, url, date, color etc.
            return `  <!-- Input (${field.type || 'text'}) -->
  <div class="mb-3">
    <label for="${fieldId}" class="form-label" style="${labelCss}">${field.label || 'Label'}${requiredMark}</label>
    <input type="${field.type || 'text'}" class="form-control ${customClass}" id="${fieldId}"${nameAttr}${defaultValueAttr} placeholder="${field.placeholder || ''}" style="${baseCss}"${requiredAttr}${disabledAttr}${readOnlyAttr}${autoFocusAttr}${minLengthAttr}${maxLengthAttr}${patternAttr}${patternTitleAttr}>${helpTextHtml}
  </div>`;
        }
      })
      .filter(Boolean)
      .join('\n\n');

    // Hover Styles Rules
    const hoverStylesCss = fields
      .filter((f) => f && f.hoverStyle && Object.keys(f.hoverStyle).length > 0)
      .map((f) => {
        const idSelector = `#${f.customId || f.id}`;
        const hoverCss = styleToCssString(f.hoverStyle);
        return hoverCss ? `${idSelector}:hover { ${hoverCss}; }` : '';
      })
      .filter(Boolean)
      .join('\n    ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Form - FormCraft</title>
  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    /* Hover CSS Rules */
    ${hoverStylesCss}
  </style>
</head>
<body class="bg-light py-5">
  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-sm border-0 p-4">
          <h3 class="mb-4 text-center text-primary">Form Title</h3>
          
          <form class="needs-validation" novalidate>
${fieldsHTML}
          </form>

        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return `<!-- Error generating HTML code -->`;
  }
}