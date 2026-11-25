import React, { useRef } from 'react';
import { Download, FileText, CheckCircle2, X } from 'lucide-react';
import { PORTAL_CONFIG } from '../config/portalConfig';

export default function NonFundingDeclarationSection({
  uploadedFile,
  onFileSelect,
  onClearFile,
}) {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2.5">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 shrink-0">
          5
        </span>
        <h2 className="text-sm font-bold text-slate-900">
          Non-Funding Declaration
        </h2>
      </div>

      <div className="bg-[#F8FAFC] border border-slate-200 rounded-md p-5 space-y-5">
        {/* STEP A */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1 max-w-md">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
              STEP A: DOWNLOAD STANDARD DECLARATION
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Download the official Faculty Ethics &amp; Non-Double-Funding declaration
              template. This form must be reviewed and signed by your supervisor.
            </p>
          </div>

          <a
            href={PORTAL_CONFIG.declarationTemplateUrl}
            download={PORTAL_CONFIG.declarationTemplateFileName}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-white hover:bg-[#E6F4F1]/50 text-[#0D6E5B] border border-[#0D6E5B] rounded text-xs font-semibold transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Download Declaration Template (.PDF)
          </a>
        </div>

        {/* STEP B */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
            STEP B: UPLOAD SIGNED DECLARATION (PDF){' '}
            <span className="text-red-500">*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
            className="hidden"
          />

          {!uploadedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border border-dashed border-slate-300 hover:border-[#0D6E5B] bg-white rounded-md py-7 px-4 text-center cursor-pointer transition-colors"
            >
              <FileText className="w-6 h-6 text-slate-400 mx-auto mb-2 stroke-[1.5]" />
              <p className="text-xs text-slate-700">
                <span className="font-bold text-[#0D6E5B] underline">
                  Click to upload
                </span>{' '}
                or drag and drop signed PDF
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Official PDF format only (max 10MB)
              </p>
            </div>
          ) : (
            <div className="border border-[#0D6E5B]/40 bg-[#E6F4F1]/40 rounded-md p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-[#0D6E5B] shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {(uploadedFile.size / 1024).toFixed(1)} KB • Signed PDF Attached
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClearFile}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
