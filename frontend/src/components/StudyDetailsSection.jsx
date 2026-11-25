import React from 'react';
import { PORTAL_CONFIG } from '../config/portalConfig';

export default function StudyDetailsSection({ formData, onChange, wordCount }) {
  const isOverWordLimit = wordCount > PORTAL_CONFIG.maxDescriptionWords;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2.5">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 shrink-0">
          2
        </span>
        <h2 className="text-sm font-bold text-slate-900">Study Details</h2>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="studyDescription"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700"
          >
            SHORT STUDY DESCRIPTION <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-[10px] font-medium ${
              isOverWordLimit ? 'text-red-600 font-bold' : 'text-slate-400'
            }`}
          >
            Max {PORTAL_CONFIG.maxDescriptionWords} words ({wordCount}/
            {PORTAL_CONFIG.maxDescriptionWords})
          </span>
        </div>

        <textarea
          id="studyDescription"
          name="studyDescription"
          rows={3}
          required
          value={formData.studyDescription}
          onChange={onChange}
          placeholder="Outline the user study protocol, intended participant cohort, and relevance to urban interaction research..."
          className={`w-full px-3 py-2.5 bg-white border rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors resize-y ${
            isOverWordLimit
              ? 'border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600'
              : 'border-slate-300 focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B]'
          }`}
        />
      </div>
    </section>
  );
}
