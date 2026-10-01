import React from 'react';
import { BusServiceItem } from '../types/transit';

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusServiceItem;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  if (!isOpen) return null;

  const { weekday, saturday, sunday } = service.timetable;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e9e7f2] space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#efecf8]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#67106A] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#47004a]">
                Service {service.serviceNo} Timetable
              </h3>
              <p className="text-[11px] text-[#50434e]">
                {service.origin} ➔ {service.destination}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#82727e] hover:text-[#1b1b23] hover:bg-[#efecf8]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Timetable Schedule Grid */}
        <div className="space-y-3">
          {/* Weekday */}
          <div className="p-3.5 rounded-xl bg-[#f5f2fd] border border-[#efecf8] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] text-[#47004a] uppercase font-space-grotesk">
                Mondays to Fridays (Weekdays)
              </span>
              <span className="px-2 py-0.5 rounded bg-white text-[#67106A] text-[10px] font-bold shadow-xs">
                Peak Enhanced
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
              <div>
                <span className="text-[10px] text-[#82727e] block">First Bus</span>
                <span className="font-bold text-[#1b1b23] font-space-grotesk">{weekday.firstBus} SGT</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Last Bus</span>
                <span className="font-bold text-[#1b1b23] font-space-grotesk">{weekday.lastBus} SGT</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Peak Headway</span>
                <span className="font-bold text-[#E65100] font-space-grotesk">{weekday.peakFreq}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Off-Peak</span>
                <span className="font-bold text-[#50434e] font-space-grotesk">{weekday.offPeakFreq}</span>
              </div>
            </div>
          </div>

          {/* Saturday */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e9e7f2] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] text-[#1b1b23] uppercase font-space-grotesk">
                Saturdays
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
              <div>
                <span className="text-[10px] text-[#82727e] block">First Bus</span>
                <span className="font-bold text-[#1b1b23] font-space-grotesk">{saturday.firstBus} SGT</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Last Bus</span>
                <span className="font-bold text-[#1b1b23] font-space-grotesk">{saturday.lastBus} SGT</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Day Frequency</span>
                <span className="font-bold text-[#50434e] font-space-grotesk">{saturday.peakFreq}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Night Frequency</span>
                <span className="font-bold text-[#50434e] font-space-grotesk">{saturday.offPeakFreq}</span>
              </div>
            </div>
          </div>

          {/* Sundays and Public Holidays */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e9e7f2] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] text-[#1b1b23] uppercase font-space-grotesk">
                Sundays & Public Holidays
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
              <div>
                <span className="text-[10px] text-[#82727e] block">First Bus</span>
                <span className="font-bold text-[#1b1b23] font-space-grotesk">{sunday.firstBus} SGT</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Last Bus</span>
                <span className="font-bold text-[#1b1b23] font-space-grotesk">{sunday.lastBus} SGT</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Day Frequency</span>
                <span className="font-bold text-[#50434e] font-space-grotesk">{sunday.peakFreq}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#82727e] block">Night Frequency</span>
                <span className="font-bold text-[#50434e] font-space-grotesk">{sunday.offPeakFreq}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#efecf8] text-[11px] text-[#82727e]">
          <span>Operated by {service.operator}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#67106A] text-white font-bold rounded-xl hover:bg-[#500C52] transition-colors font-space-grotesk"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
