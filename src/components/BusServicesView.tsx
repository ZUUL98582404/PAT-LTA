import React, { useState } from 'react';
import { BUS_SERVICES } from '../data/transitData';
import { ServiceType } from '../types/transit';

interface BusServicesViewProps {
  onSelectServiceAndGo: (serviceNo: string) => void;
}

export const BusServicesView: React.FC<BusServicesViewProps> = ({
  onSelectServiceAndGo
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterSearch, setFilterSearch] = useState<string>('');

  const servicesList = Object.values(BUS_SERVICES);

  const filteredServices = servicesList.filter((s) => {
    const matchesType = filterType === 'ALL' || s.serviceType.toUpperCase() === filterType;
    const matchesSearch =
      s.serviceNo.toLowerCase().includes(filterSearch.toLowerCase()) ||
      s.origin.toLowerCase().includes(filterSearch.toLowerCase()) ||
      s.destination.toLowerCase().includes(filterSearch.toLowerCase()) ||
      s.via.toLowerCase().includes(filterSearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Title & Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e9e7f2] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-[24px] font-extrabold text-[#47004a]">
              SBS Transit & Singapore Bus Services Directory
            </h2>
            <p className="text-[13px] text-[#50434e]">
              Explore trunk routes, feeder circuits, and express links across the public transport network.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#82727e] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search service, road, destination..."
              className="w-full pl-9 pr-4 py-2 bg-[#F1F5F9] rounded-xl text-[13px] text-[#1b1b23] focus:outline-none focus:ring-2 focus:ring-[#67106A]"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#efecf8]">
          {['ALL', 'TRUNK', 'FEEDER', 'EXPRESS'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterType(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold font-space-grotesk transition-colors cursor-pointer ${
                filterType === cat
                  ? 'bg-[#67106A] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#50434e] hover:bg-[#e9e7f2]'
              }`}
            >
              {cat === 'ALL' ? 'All Services' : `${cat.charAt(0) + cat.slice(1).toLowerCase()} Lines`}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((svc) => (
          <div
            key={svc.serviceNo}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#e9e7f2] hover:shadow-md hover:border-[#67106A]/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-12 h-10 rounded-xl text-white font-extrabold text-[18px] font-space-grotesk flex items-center justify-center shadow-sm ${
                      svc.serviceType === 'Express' ? 'bg-[#a83900]' : 'bg-[#67106A]'
                    }`}
                  >
                    {svc.serviceNo}
                  </span>
                  <div>
                    <span className="text-[14px] font-bold text-[#1b1b23] block leading-tight">
                      Service {svc.serviceNo}
                    </span>
                    <span className="text-[11px] text-[#82727e]">{svc.operator}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-space-grotesk ${
                    svc.serviceType === 'Express'
                      ? 'bg-[#ffdbcf] text-[#a83900]'
                      : 'bg-[#FFF4ED] text-[#E65100]'
                  }`}
                >
                  {svc.serviceType}
                </span>
              </div>

              <div className="text-[12px] text-[#50434e] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1b1b23]">
                  <span>{svc.origin}</span>
                  <span className="material-symbols-outlined text-[14px] text-[#E65100]">
                    arrow_forward
                  </span>
                  <span>{svc.destination}</span>
                  {svc.isLoop && <span className="text-[10px] text-[#82727e] font-normal">(Loop)</span>}
                </div>
                <p className="text-[11px] text-[#82727e] line-clamp-2">
                  Via: {svc.via}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#efecf8] text-[11px]">
                <span className="text-[#50434e]">
                  Peak Headway: <strong className="text-[#E65100] font-space-grotesk">{svc.timetable.weekday.peakFreq}</strong>
                </span>
                <span className="text-[#16A34A] font-semibold">
                  {svc.fleetCapacity.onTimeRate}% On-Time
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectServiceAndGo(svc.serviceNo)}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#f5f2fd] group-hover:bg-[#67106A] group-hover:text-white text-[#67106A] text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 font-space-grotesk cursor-pointer"
            >
              <span>Track Live NextBus</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
