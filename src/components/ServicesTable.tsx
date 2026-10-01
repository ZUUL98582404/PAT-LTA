import React from 'react';
import { BusServiceItem, BusStopItem } from '../types/transit';

interface ServicesTableProps {
  stop: BusStopItem;
  services: BusServiceItem[];
  activeServiceNo: string;
  onSelectService: (serviceNo: string) => void;
  pinnedServices: string[];
  onTogglePinService: (serviceNo: string) => void;
  onOpenReportDiscrepancy: () => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  stop,
  services,
  activeServiceNo,
  onSelectService,
  pinnedServices,
  onTogglePinService,
  onOpenReportDiscrepancy
}) => {
  const getCrowdColor = (crowd: string) => {
    switch (crowd) {
      case 'seats':
        return 'bg-[#16A34A]';
      case 'standing':
        return 'bg-[#D97706]';
      case 'limited':
        return 'bg-[#DC2626]';
      default:
        return 'bg-[#16A34A]';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e9e7f2] p-5 md:p-6 flex flex-col gap-4">
      {/* Table Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div className="space-y-0.5">
          <h3 className="text-[18px] md:text-[20px] text-[#47004a] font-bold">
            All Services Calling At Stop {stop.code}
          </h3>
          <p className="text-[11px] text-[#50434e]">
            Live estimates for companion bus lines along {stop.roadName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#82727e]">
            Filtered by: <span className="font-bold text-[#1b1b23]">Active Direction</span>
          </span>
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="bg-[#f5f2fd] text-[#50434e] text-[11px] font-bold uppercase tracking-wider font-space-grotesk border-b border-[#efecf8]">
              <th className="py-3 px-4 rounded-l-xl">Service</th>
              <th className="py-3 px-4">Destination & Route</th>
              <th className="py-3 px-4 text-center">Next Arrival</th>
              <th className="py-3 px-4 text-center">Subsequent Bus</th>
              <th className="py-3 px-4 text-center">3rd Bus</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Quick Pin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#efecf8]">
            {services.map((svc) => {
              const isActive = svc.serviceNo === activeServiceNo;
              const isPinned = pinnedServices.includes(svc.serviceNo);
              const [b1, b2, b3] = svc.arrivals;

              return (
                <tr
                  key={svc.serviceNo}
                  onClick={() => onSelectService(svc.serviceNo)}
                  className={`transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F3E8F3]/40 hover:bg-[#F3E8F3]/60'
                      : 'hover:bg-[#f5f2fd]'
                  }`}
                >
                  {/* Service Badge */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center justify-center w-11 h-8 rounded-lg text-white font-bold text-[16px] font-space-grotesk shadow-sm ${
                          svc.serviceType === 'Express'
                            ? 'bg-[#a83900]'
                            : isActive
                            ? 'bg-[#47004a] ring-2 ring-[#67106A]'
                            : 'bg-[#67106A]'
                        }`}
                      >
                        {svc.serviceNo}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#E65100] animate-pulse" />
                      )}
                    </div>
                  </td>

                  {/* Destination & Route */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span
                        className={`text-[13px] font-bold ${
                          isActive ? 'text-[#47004a]' : 'text-[#1b1b23]'
                        }`}
                      >
                        To {svc.destination} {svc.isLoop && '(Loop)'}
                      </span>
                      <span className="text-[11px] text-[#82727e]">
                        {isActive
                          ? `Active Selection • ${svc.operator}`
                          : svc.via}
                      </span>
                    </div>
                  </td>

                  {/* Next Arrival */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-space-grotesk text-[18px] font-bold leading-none tabular-nums ${
                          b1.etaMinutes <= 5 ? 'text-[#E65100]' : 'text-[#47004a]'
                        }`}
                      >
                        {b1.etaMinutes <= 1 ? 'Arr' : `${b1.etaMinutes} mins`}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${getCrowdColor(b1.crowd)}`}
                          title={`Occupancy: ${b1.crowd}`}
                        />
                        <span className="text-[10px] text-[#4338CA] font-bold font-space-grotesk">
                          {b1.busType}
                        </span>
                        {b1.wab && (
                          <span
                            className="material-symbols-outlined text-[13px] text-[#0284C7]"
                            title="Wheelchair Accessible"
                          >
                            accessible
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Subsequent Bus */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-space-grotesk text-[15px] font-bold text-[#1b1b23] leading-none tabular-nums">
                        {b2.etaMinutes} mins
                      </span>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${getCrowdColor(b2.crowd)}`}
                          title={`Occupancy: ${b2.crowd}`}
                        />
                        <span className="text-[10px] text-[#82727e] font-semibold font-space-grotesk">
                          {b2.busType}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 3rd Bus */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-space-grotesk text-[14px] font-medium text-[#82727e] tabular-nums">
                      {b3.etaMinutes} mins
                    </span>
                  </td>

                  {/* Quick Pin Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePinService(svc.serviceNo);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white text-[#82727e] hover:text-[#E65100] transition-colors cursor-pointer"
                      title={isPinned ? 'Unpin Service' : 'Pin Service to Favorites'}
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isPinned ? 'text-[#E65100] fill-1' : ''
                        }`}
                      >
                        {isPinned ? 'star' : 'star_border'}
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Micro-Advisory & Official LTA Attribution */}
      <div className="pt-3 border-t border-[#efecf8] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#50434e]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#67106A]">
            verified_user
          </span>
          <span>Bus arrival data provided directly by Land Transport Authority (LTA) Real-time DataMall.</span>
        </div>
        <button
          type="button"
          onClick={onOpenReportDiscrepancy}
          className="text-[#67106A] hover:text-[#E65100] font-semibold underline transition-colors cursor-pointer"
        >
          Report Arrival Discrepancy
        </button>
      </div>
    </div>
  );
};
