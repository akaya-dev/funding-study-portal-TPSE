import React from 'react';
import { Clock, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';


export default function RequestPendingView({ submission, onBackToForm }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs p-6 sm:p-10 space-y-6">
      <div className="flex flex-col items-center text-center space-y-3 border-b border-slate-200 pb-6">
        <div className="w-12 h-12 rounded-full border bg-amber-50 text-amber-600 border-amber-200 flex items-center justify-center">
          <Clock className="w-6 h-6" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border bg-amber-50 border-amber-200 text-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Status: Pending
        </span>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Request Pending
        </h2>
        <p className="text-xs text-slate-500 max-w-md leading-relaxed">
          Your study funding application has been submitted and is currently pending review.
        </p>
        {submission.savedTo && (
          <p className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#0D6E5B]/30 bg-[#E6F4F1] text-[11px] font-semibold text-[#0D6E5B] break-all">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Saved to txt file: <span className="font-mono font-normal">{submission.savedTo}</span>
          </p>
        )}
      </div>

      <div className="bg-[#F8FAFC] border border-slate-200 rounded-md p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              STUDENT APPLICANT
            </span>
            <span className="text-sm font-bold text-slate-900">
              {submission.studentFullName}
            </span>
            <span className="text-xs text-slate-500 ml-2">
              ({submission.studentEmail})
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D6E5B] block">
              TOTAL REQUESTED FUNDS
            </span>
            <span className="text-lg font-extrabold text-slate-900 font-mono">
              €{Number(submission.totalRequestedFunds || 0).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              SHORT STUDY DETAILS
            </span>
            <p className="text-slate-700 leading-relaxed">
              {submission.studyDescription}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              EXPLANATION FOR REQUESTED FUNDS
            </span>
            <p className="text-slate-700 leading-relaxed">
              {submission.fundsExplanation}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              NON-FUNDING DECLARATION
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D6E5B]">
              <FileText className="w-3.5 h-3.5" />
              {submission.declarationFileName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onBackToForm}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Application Form
        </button>
      </div>
    </div>
  );
}
