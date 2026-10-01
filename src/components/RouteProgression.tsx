import React from 'react';
import { BusServiceItem } from '../types/transit';

interface RouteProgressionProps {
  service: BusServiceItem;
  onSelectStopCode?: (stopCode: string) => void;
}

export const RouteProgression: React.FC<RouteProgressionProps> = ({
  service,
  onSelectStopCode
}) => {
  const stops = service.routeStops;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e9e7f2] p-5 md:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#67106A] text-[22px]">
            timeline
          </span>
          <h3 className="text-[18px] md:text-[20px] text-[#47004a] font-bold">
            Route Progression
          </h3>
        </div>
        <span className="text-[11px] text-[#50434e] font-semibold font-space-grotesk">
          Service {service.serviceNo} • Direction {service.direction}
        </span>
      </div>

      {/* Stepped Progression Strip */}
      <div className="relative py-2 overflow-x-auto">
        <div className="min-w-[620px] flex items-center justify-between relative px-6">
          {/* Background connecting bar */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-[#e9e7f2] rounded-full z-0" />

          {/* Active progress fill */}
          <div className="absolute left-8 w-[28%] top-1/2 -translate-y-1/2 h-1 bg-[#E65100] rounded-full z-0" />

          {stops.map((node, idx) => {
            // Bus moving beacon
            if (node.status === 'current_bus') {
              return (
                <div key={`beacon-${idx}`} className="relative z-20 flex flex-col items-center">
                  <div className="px-2 py-0.5 rounded-full bg-[#EA580C] text-white text-[10px] font-bold uppercase shadow-sm animate-bounce font-space-grotesk">
                    Bus Location
                  </div>
                  <span className="material-symbols-outlined text-[#EA580C] text-[18px]">
                    directions_bus
                  </span>
                </div>
              );
            }

            // Departed Stop
            if (node.status === 'departed') {
              return (
                <div
                  key={node.stopCode}
                  onClick={() => onSelectStopCode && onSelectStopCode(node.stopCode)}
                  className="relative z-10 flex flex-col items-center text-center max-w-[90px] cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#e9e7f2] group-hover:bg-[#d4c1cf] text-[#50434e] flex items-center justify-center text-[11px] font-bold shadow-sm font-space-grotesk transition-colors">
                    ✓
                  </div>
                  <span className="text-[11px] font-bold text-[#1b1b23] mt-2 truncate w-full font-space-grotesk">
                    {node.stopCode}
                  </span>
                  <span className="text-[10px] text-[#82727e] truncate w-full">
                    {node.stopName}
                  </span>
                  <span className="text-[9px] text-[#82727e]">
                    {node.subText}
                  </span>
                </div>
              );
            }

            // Active Target Stop (Star)
            if (node.status === 'active_target') {
              return (
                <div
                  key={node.stopCode}
                  onClick={() => onSelectStopCode && onSelectStopCode(node.stopCode)}
                  className="relative z-10 flex flex-col items-center text-center max-w-[110px] cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-[#67106A] text-white ring-4 ring-[#F3E8F3] flex items-center justify-center text-[13px] font-bold shadow-md font-space-grotesk">
                    ★
                  </div>
                  <span className="text-[12px] font-extrabold text-[#47004a] mt-1.5 truncate w-full font-space-grotesk">
                    {node.stopCode}
                  </span>
                  <span className="text-[11px] font-bold text-[#E65100] truncate w-full">
                    {node.stopName}
                  </span>
                  <span className="text-[10px] font-bold text-[#16A34A] font-space-grotesk">
                    {node.subText}
                  </span>
                </div>
              );
            }

            // MRT Interchange Stop
            if (node.status === 'mrt_interchange') {
              return (
                <div
                  key={node.stopCode}
                  onClick={() => onSelectStopCode && onSelectStopCode(node.stopCode)}
                  className="relative z-10 flex flex-col items-center text-center max-w-[90px] cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-full bg-white border border-[#e9e7f2] group-hover:border-[#67106A] text-[#50434e] flex items-center justify-center shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-[13px] text-[#4338CA]">
                      train
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1b1b23] mt-2 truncate w-full font-space-grotesk">
                    {node.stopCode}
                  </span>
                  <span className="text-[10px] text-[#50434e] truncate w-full">
                    {node.stopName}
                  </span>
                  <span className="text-[9px] text-[#82727e]">
                    {node.subText}
                  </span>
                </div>
              );
            }

            // Terminal Stop
            if (node.status === 'terminal') {
              return (
                <div
                  key={node.stopCode}
                  onClick={() => onSelectStopCode && onSelectStopCode(node.stopCode)}
                  className="relative z-10 flex flex-col items-center text-center max-w-[95px] cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#e9e7f2] group-hover:bg-[#67106A] group-hover:text-white text-[#47004a] flex items-center justify-center text-[12px] font-bold shadow-sm font-space-grotesk transition-colors">
                    ◎
                  </div>
                  <span className="text-[11px] font-bold text-[#1b1b23] mt-2 truncate w-full font-space-grotesk">
                    {node.stopCode}
                  </span>
                  <span className="text-[10px] text-[#50434e] truncate w-full">
                    {node.stopName}
                  </span>
                  <span className="text-[9px] text-[#67106A] font-bold">
                    {node.subText}
                  </span>
                </div>
              );
            }

            // Standard Upcoming Stop
            return (
              <div
                key={node.stopCode}
                onClick={() => onSelectStopCode && onSelectStopCode(node.stopCode)}
                className="relative z-10 flex flex-col items-center text-center max-w-[90px] cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-white border border-[#e9e7f2] group-hover:border-[#67106A] text-[#50434e] flex items-center justify-center text-[11px] font-semibold shadow-sm font-space-grotesk transition-colors">
                  {idx}
                </div>
                <span className="text-[11px] font-semibold text-[#1b1b23] mt-2 truncate w-full font-space-grotesk">
                  {node.stopCode}
                </span>
                <span className="text-[10px] text-[#50434e] truncate w-full">
                  {node.stopName}
                </span>
                <span className="text-[9px] text-[#82727e]">
                  {node.subText}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
