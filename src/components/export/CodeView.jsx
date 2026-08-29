import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, X } from 'lucide-react';
import { generateBootstrapHTML } from '../../utils/codeGenerator';

export default function CodeView({ fields, onClose }) {
  const [copied, setCopied] = useState(false);
  const generatedCode = generateBootstrapHTML(fields);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([generatedCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'formcraft-custom-form.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Close / Back Action Handler
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      window.history.back();
    }
  };

  return (
    <main className="flex-grow-1 bg-dark p-4 overflow-auto d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between bg-black bg-opacity-50 p-3 rounded-top border-bottom border-secondary">
        <div className="d-flex align-items-center gap-2 text-light">
          <FileCode className="text-primary" size={20} />
          <span className="font-monospace small">generated-form.html</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Copy Code Button */}
          <button
            onClick={handleCopyCode}
            className={`btn btn-sm d-flex align-items-center gap-2 ${
              copied ? 'btn-success' : 'btn-outline-light'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Code'}
          </button>

          {/* Download HTML Button */}
          <button
            onClick={handleDownloadHTML}
            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
          >
            <Download size={16} /> Download .html File
          </button>

          {/* ❌ Close Cross Icon Button */}
          <button
            onClick={handleClose}
            className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center p-1 ms-2"
            title="Close Code View"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-grow-1 bg-black p-3 rounded-bottom overflow-auto">
        <pre className="text-success font-monospace mb-0" style={{ fontSize: '13px', lineHeight: '1.6' }}>
          <code>{generatedCode}</code>
        </pre>
      </div>
    </main>
  );
}