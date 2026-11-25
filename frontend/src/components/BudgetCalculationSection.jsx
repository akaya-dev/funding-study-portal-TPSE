import React from 'react';

export default function BudgetCalculationSection({
  formData,
  onChange,
  totalRequestedFunds,
}) {
  const participantCount = Number(formData.participantCount) || 0;
  const moneyPerParticipant = Number(formData.moneyPerParticipant) || 0;
  const extraCosts = Number(formData.extraCosts) || 0;

  return (
    <section className="bg-[#F8FAFC] border border-slate-200 rounded-md p-5 space-y-4">
      <div className="flex items-start gap-2.5">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#E6F4F1] border border-[#0D6E5B]/20 text-[11px] font-bold text-[#0D6E5B] mt-0.5 shrink-0">
          3
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Budget Calculation
          </h2>
          <p className="text-[11px] text-slate-500">
            Specify participant count, compensation per participant, and extra costs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div>
          <label
            htmlFor="participantCount"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            PARTICIPANT COUNT <span className="text-red-500">*</span>
          </label>
          <input
            id="participantCount"
            name="participantCount"
            type="number"
            min="1"
            step="1"
            required
            value={formData.participantCount}
            onChange={onChange}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B]"
          />
        </div>

        <div>
          <label
            htmlFor="moneyPerParticipant"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            MONEY PER PARTICIPANT (€) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              €
            </span>
            <input
              id="moneyPerParticipant"
              name="moneyPerParticipant"
              type="number"
              min="0"
              step="0.5"
              required
              value={formData.moneyPerParticipant}
              onChange={onChange}
              className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="extraCosts"
            className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            EXTRA COSTS (€)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              €
            </span>
            <input
              id="extraCosts"
              name="extraCosts"
              type="number"
              min="0"
              step="0.5"
              value={formData.extraCosts}
              onChange={onChange}
              className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D6E5B] focus:ring-1 focus:ring-[#0D6E5B]"
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] italic text-slate-500">
        Formula: ({participantCount} participants × €{moneyPerParticipant.toFixed(2)}) + €
        {extraCosts.toFixed(2)} extra.
      </p>

      <div className="bg-white border border-slate-200 rounded px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            CALCULATED SUMMARY
          </div>
          <div className="text-[11px] text-slate-500">
            Includes {participantCount} participant fees + €{extraCosts.toFixed(2)} extra lab costs
          </div>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D6E5B]">
            TOTAL REQUESTED FUNDS:
          </span>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            €{totalRequestedFunds.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
}
