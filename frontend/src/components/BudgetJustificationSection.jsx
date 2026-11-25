import React from 'react';

export default function BudgetJustificationSection({ formData, onChange }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2.5">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 shrink-0">
          4
        </span>
        <h2 className="text-sm font-bold text-slate-900">
          Budget Justification &amp; Protocol Explanation
        </h2>
      </div>

      <div>
        <label
          htmlFor="fundsExplanation"
          className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          EXPLANATION FOR REQUESTED FUNDS (INCLUDING EXTRA COSTS IF APPLICABLE){' '}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="fundsExplanation"
          name="fundsExplanation"
          rows={3}
          required
          value={formData.fundsExplanation}
          onChange={onChange}
          placeholder="Provide detailed breakdown of the time commitment expected from participants, reason for variable amounts if applicable, and purpose of extra expenses (e.g., lab consumables, hardware tokens)..."
          className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B] transition-colors resize-y"
        />
      </div>
    </section>
  );
}
