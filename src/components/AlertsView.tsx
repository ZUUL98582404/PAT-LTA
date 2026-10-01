import React from 'react';
import { SERVICE_ADVISORIES } from '../data/transitData';

export const AlertsView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e9e7f2] space-y-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#E65100] text-[28px]">
            warning
          </span>
          <h2 className="text-[24px] font-extrabold text-[#47004a]">
            Alerts & Travel Advisory
          </h2>
        </div>
        <p className="text-[13px] text-[#50434e]">
          Real-time service updates, route adjustments, and scheduled maintenance notices across bus and rail networks.
        </p>
      </div>

      <div className="space-y-4">
        {SERVICE_ADVISORIES.map((adv) => (
          <div
            key={adv.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#e9e7f2] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF4ED] text-[#E65100] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[22px]">campaign</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold text-[#1b1b23]">{adv.title}</h3>
                  {adv.serviceNo && (
                    <span className="px-2 py-0.5 rounded bg-[#f5f2fd] text-[#67106A] text-[11px] font-bold font-space-grotesk">
                      {adv.serviceNo}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#50434e] leading-relaxed">{adv.message}</p>
              </div>
            </div>
            <div className="text-[11px] text-[#82727e] font-medium shrink-0 self-end md:self-auto font-space-grotesk">
              {adv.time}
            </div>
          </div>
        ))}

        {/* Regular Maintenance Schedule Notice */}
        <div className="bg-[#f5f2fd] rounded-2xl p-5 border border-[#efecf8] space-y-2">
          <div className="flex items-center gap-2 text-[#47004a] font-bold text-[14px]">
            <span className="material-symbols-outlined text-[18px]">build</span>
            <span>Preventative Rail & Fleet Maintenance</span>
          </div>
          <p className="text-[12px] text-[#50434e]">
            Routine night engineering works on the Downtown Line track circuits are carried out between 01:00 and 04:30 daily. Passenger services remain completely unaffected during standard operating hours.
          </p>
        </div>
      </div>
    </div>
  );
};
