import React, { useState } from 'react';
import { RAIL_LINES } from '../data/transitData';

export const RailNetworkView: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState(RAIL_LINES[0].code);

  const currentLine = RAIL_LINES.find(l => l.code === selectedLine) || RAIL_LINES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e9e7f2] space-y-3">
        <h2 className="text-[24px] font-extrabold text-[#47004a]">
          Rail Network Operations & Station Tracker
        </h2>
        <p className="text-[13px] text-[#50434e]">
          SBS Transit operates the Downtown Line (DTL), North East Line (NEL), and Sengkang & Punggol Light Rail Transit (LRT) systems in Singapore.
        </p>

        {/* Lines Switcher */}
        <div className="flex flex-wrap gap-2.5 pt-3 border-t border-[#efecf8]">
          {RAIL_LINES.map((line) => (
            <button
              key={line.code}
              type="button"
              onClick={() => setSelectedLine(line.code)}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold font-space-grotesk transition-all cursor-pointer flex items-center gap-2 border ${
                selectedLine === line.code
                  ? 'bg-[#47004a] text-white border-[#47004a] shadow-sm'
                  : 'bg-[#F1F5F9] text-[#1b1b23] border-transparent hover:bg-[#e9e7f2]'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: line.color }}
              />
              <span>{line.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Line Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e9e7f2] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#efecf8] gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl text-white font-extrabold text-[16px] flex items-center justify-center font-space-grotesk shadow-sm"
              style={{ backgroundColor: currentLine.color }}
            >
              {currentLine.code}
            </div>
            <div>
              <h3 className="text-[18px] font-extrabold text-[#1b1b23]">{currentLine.name}</h3>
              <p className="text-[12px] text-[#50434e]">Full Singapore Mass Rapid Transit Transit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#16A34A] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              {currentLine.status}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[#50434e] text-[11px] font-bold font-space-grotesk">
              Headway: {currentLine.headway}
            </span>
          </div>
        </div>

        {/* Stations Timeline */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-bold text-[#1b1b23] uppercase tracking-wider font-space-grotesk">
            Key Interchanges & Selected Corridor Stations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentLine.stations.map((st, i) => (
              <div
                key={st}
                className="p-3.5 rounded-xl bg-[#f5f2fd] border border-[#efecf8] hover:border-[#67106A] transition-all flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-white text-[#67106A] font-bold text-[12px] flex items-center justify-center font-space-grotesk shadow-xs shrink-0">
                  {i + 1}
                </div>
                <div className="text-[12px]">
                  <div className="font-bold text-[#1b1b23]">{st}</div>
                  <div className="text-[10px] text-[#16A34A] font-semibold">Step-Free / WAB</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
