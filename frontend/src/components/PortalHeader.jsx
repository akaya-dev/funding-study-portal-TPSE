import React from 'react';
import { PORTAL_CONFIG } from '../config/portalConfig';
import urbanLogo from '../assets/urban_logo-cropped-1.png';

export default function PortalHeader() {
  return (
    <header className="w-full max-w-3xl mx-auto pt-8 pb-5 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/90 pb-4">
        <div>
          <div className="my-0.5">
            <img
              src={urbanLogo}
              alt={PORTAL_CONFIG.labTitle}
              className="h-12 sm:h-14 w-auto object-contain select-none"
            />
          </div>

          <p className="text-xs text-slate-500 mt-1.5">
            {PORTAL_CONFIG.facultySubtitle}
          </p>
        </div>

        <div className="text-left sm:text-right text-[11px] text-slate-500 leading-relaxed shrink-0">
          <div>
            Grant Cycle:{' '}
            <span className="font-semibold text-slate-700">
              {PORTAL_CONFIG.grantCycle}
            </span>
          </div>
          <div>
            Deadline:{' '}
            <span className="font-semibold text-slate-700">
              {PORTAL_CONFIG.deadlineType}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
