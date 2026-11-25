import React from 'react';

export default function StudentSupervisorSection({ formData, onChange }) {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-2.5 border-b border-slate-200 pb-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 mt-0.5 shrink-0">
          1
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Student &amp; Supervisor Information
          </h2>
          <p className="text-[11px] text-slate-500">
            Institutional contact information for academic auditing and grant disbursement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div>
          <label
            htmlFor="studentFullName"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            STUDENT FULL NAME <span className="text-red-500">*</span>
          </label>
          <input
            id="studentFullName"
            name="studentFullName"
            type="text"
            required
            value={formData.studentFullName}
            onChange={onChange}
            placeholder="e.g., Elena Vance"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="studentEmail"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            STUDENT INSTITUTIONAL EMAIL <span className="text-red-500">*</span>
          </label>
          <input
            id="studentEmail"
            name="studentEmail"
            type="email"
            required
            value={formData.studentEmail}
            onChange={onChange}
            placeholder="e.vance@university.edu"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="supervisorName"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            FACULTY SUPERVISOR NAME <span className="text-red-500">*</span>
          </label>
          <input
            id="supervisorName"
            name="supervisorName"
            type="text"
            required
            value={formData.supervisorName}
            onChange={onChange}
            placeholder="e.g., Prof. Dr. Henrik Müller"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="supervisorEmail"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            SUPERVISOR EMAIL <span className="text-red-500">*</span>
          </label>
          <input
            id="supervisorEmail"
            name="supervisorEmail"
            type="email"
            required
            value={formData.supervisorEmail}
            onChange={onChange}
            placeholder="h.muller@university.edu"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B] transition-colors"
          />
        </div>
      </div>
    </section>
  );
}
