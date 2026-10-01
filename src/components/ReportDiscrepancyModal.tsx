import React, { useState } from 'react';
import { BusStopItem } from '../types/transit';

interface ReportDiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  stop: BusStopItem;
  serviceNo: string;
}

export const ReportDiscrepancyModal: React.FC<ReportDiscrepancyModalProps> = ({
  isOpen,
  onClose,
  stop,
  serviceNo
}) => {
  const [issueType, setIssueType] = useState('late');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e9e7f2] space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#efecf8]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF4ED] text-[#E65100] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">flag</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#47004a]">Report Discrepancy</h3>
              <p className="text-[11px] text-[#50434e]">LTA Real-Time Data Calibration</p>
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

        {submitted ? (
          <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#16A34A]/30 text-[#16A34A] text-[13px] font-bold flex flex-col items-center text-center space-y-2 py-6">
            <span className="material-symbols-outlined text-[36px]">task_alt</span>
            <span>Thank you! Your feedback has been transmitted to LTA DataMall dispatch control.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
            <div className="p-2.5 rounded-lg bg-[#f5f2fd] text-[12px] text-[#50434e]">
              Reporting for <span className="font-bold text-[#67106A]">Service {serviceNo}</span> at Stop{' '}
              <span className="font-bold text-[#67106A]">{stop.code} ({stop.name})</span>.
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#1b1b23] text-[12px] uppercase tracking-wider font-space-grotesk">
                Observed Issue
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#F1F5F9] text-[#1b1b23] rounded-xl p-2.5 border border-[#e9e7f2] focus:outline-none focus:ring-2 focus:ring-[#67106A]"
              >
                <option value="late">Bus arrived significantly later than ETA (&gt; 5 mins)</option>
                <option value="early">Bus arrived earlier than displayed ETA</option>
                <option value="crowd_mismatch">Crowd occupancy level was inaccurate</option>
                <option value="full_pass">Bus was packed and did not stop</option>
                <option value="ghost_bus">Bus disappeared from tracker without arriving</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#1b1b23] text-[12px] uppercase tracking-wider font-space-grotesk">
                Additional Comments (Optional)
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g., Heavy rain along Tampines Ave 2 or traffic junction congestion..."
                className="w-full bg-[#F1F5F9] text-[#1b1b23] rounded-xl p-2.5 border border-[#e9e7f2] focus:outline-none focus:ring-2 focus:ring-[#67106A] text-[12px]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#efecf8]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[#50434e] hover:bg-[#efecf8] text-[12px] font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#E65100] hover:bg-[#EA580C] text-white text-[12px] font-bold rounded-xl transition-all shadow-md font-space-grotesk"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
