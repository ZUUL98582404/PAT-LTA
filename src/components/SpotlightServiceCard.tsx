import React from 'react';
import { BusServiceItem, BusStopItem } from '../types/transit';

interface SpotlightServiceCardProps {
  service: BusServiceItem;
  stop: BusStopItem;
}

export const SpotlightServiceCard: React.FC<SpotlightServiceCardProps> = ({
  service,
  stop
}) => {
  const [nextBus, secondBus, thirdBus] = service.arrivals;

  const renderCrowdBadge = (crowd: 'seats' | 'standing' | 'limited', note?: string) => {
    if (crowd === 'seats') {
      return (
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#ECFDF5] text-[#16A34A]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span className="text-[12px] font-bold font-space-grotesk">Seats Available</span>
          </div>
          <span className="text-[11px] font-semibold">{note || 'Available'}</span>
        </div>
      );
    }
    if (crowd === 'standing') {
      return (
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#FFFBEB] text-[#D97706]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span className="text-[12px] font-bold font-space-grotesk">Standing Available</span>
          </div>
          <span className="text-[11px] font-semibold">{note || 'Moderate'}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-between p-2 rounded-xl bg-[#FEF2F2] text-[#DC2626]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          <span className="text-[12px] font-bold font-space-grotesk">Limited Standing</span>
        </div>
        <span className="text-[11px] font-semibold">{note || 'Packed'}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e9e7f2] p-5 md:p-6 flex flex-col gap-6">
      {/* Card Header & Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-3 bg-[#f5f2fd] -mx-5 md:-mx-6 -mt-5 md:-mt-6 p-5 md:p-6 rounded-t-2xl border-b border-[#efecf8]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#67106A] text-white flex items-center justify-center shadow-md shrink-0">
            <span className="text-[32px] font-bold tracking-tight font-space-grotesk">
              {service.serviceNo}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[20px] font-extrabold text-[#47004a]">
                Service {service.serviceNo}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white text-[#1b1b23] text-[11px] font-semibold shadow-sm border border-[#efecf8] font-space-grotesk">
                {service.operator}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                service.serviceType === 'Express'
                  ? 'bg-[#ffdbcf] text-[#a83900]'
                  : 'bg-[#FFF4ED] text-[#E65100]'
              }`}>
                {service.serviceType} Service
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[13px] text-[#50434e] mt-1 flex-wrap">
              <span className="font-bold text-[#1b1b23]">{service.origin}</span>
              <span className="material-symbols-outlined text-[16px] text-[#E65100]">
                arrow_forward
              </span>
              <span className="font-bold text-[#1b1b23]">{service.destination}</span>
              {service.isLoop && (
                <span className="text-[11px] text-[#82727e] font-medium">(Loop)</span>
              )}
            </div>
          </div>
        </div>

        {/* Focus Stop Badge */}
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-[#efecf8] flex items-center gap-2 self-start md:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
          <div className="flex flex-col text-left md:text-right">
            <span className="text-[10px] text-[#50434e] font-semibold">Selected Bus Stop</span>
            <span className="text-[12px] text-[#47004a] font-bold font-space-grotesk">
              {stop.code} • {stop.roadName}
            </span>
          </div>
        </div>
      </div>

      {/* Sequential 3-Arrival ETA Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* NEXT BUS */}
        <div className="relative bg-gradient-to-br from-[#FFF4ED] via-white to-white rounded-2xl p-4 shadow-sm border border-[#E65100]/25 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-[#E65100] text-white text-[11px] font-bold tracking-wide uppercase font-space-grotesk">
              Next Bus
            </span>
            <span className="flex items-center gap-1 text-[#EA580C] text-[11px] font-bold font-space-grotesk">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
              {nextBus.status}
            </span>
          </div>

          {/* Big Bold ETA */}
          <div className="my-3 text-center py-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[44px] text-[#E65100] leading-none font-extrabold tracking-tight font-space-grotesk tabular-nums">
                {nextBus.etaMinutes <= 1 ? 'Arr' : nextBus.etaMinutes}
              </span>
              {nextBus.etaMinutes > 1 && (
                <span className="text-[18px] text-[#E65100] font-bold font-space-grotesk">
                  MINS
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#50434e] mt-1">
              Est. Arrival at {nextBus.estimatedTimeStr}
            </p>
          </div>

          {/* Micro-Features & Capacity Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#4338CA]/10 text-[#4338CA] text-[11px] font-bold font-space-grotesk">
                <span className="material-symbols-outlined text-[15px]">directions_bus</span>
                {nextBus.busType === 'DD' ? 'Double Deck (DD)' : 'Single Deck (SD)'}
              </span>
              {nextBus.wab && (
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold font-space-grotesk"
                  title="Wheelchair Accessible Bus"
                >
                  <span className="material-symbols-outlined text-[15px]">accessible</span>
                  WAB
                </span>
              )}
            </div>

            {renderCrowdBadge(nextBus.crowd, nextBus.seatsLeftNote)}
          </div>
        </div>

        {/* SUBSEQUENT BUS (2ND BUS) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e9e7f2] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-[#e9e7f2] text-[#1b1b23] text-[11px] font-bold tracking-wide uppercase font-space-grotesk">
              2nd Bus
            </span>
            <span className="text-[#82727e] text-[11px] font-medium">
              {secondBus.status}
            </span>
          </div>

          {/* ETA */}
          <div className="my-3 text-center py-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[40px] text-[#47004a] leading-none font-bold tracking-tight font-space-grotesk tabular-nums">
                {secondBus.etaMinutes}
              </span>
              <span className="text-[18px] text-[#47004a] font-bold font-space-grotesk">
                MINS
              </span>
            </div>
            <p className="text-[11px] text-[#50434e] mt-1">
              Est. Arrival at {secondBus.estimatedTimeStr}
            </p>
          </div>

          {/* Micro-Features & Capacity Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#e9e7f2] text-[#1b1b23] text-[11px] font-bold font-space-grotesk">
                <span className="material-symbols-outlined text-[15px]">directions_bus</span>
                {secondBus.busType === 'DD' ? 'Double Deck (DD)' : 'Single Deck (SD)'}
              </span>
              {secondBus.wab && (
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold font-space-grotesk"
                  title="Wheelchair Accessible Bus"
                >
                  <span className="material-symbols-outlined text-[15px]">accessible</span>
                  WAB
                </span>
              )}
            </div>

            {renderCrowdBadge(secondBus.crowd, secondBus.seatsLeftNote)}
          </div>
        </div>

        {/* THIRD BUS (3RD BUS) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e9e7f2] flex flex-col justify-between opacity-95">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-[#e9e7f2] text-[#1b1b23] text-[11px] font-bold tracking-wide uppercase font-space-grotesk">
              3rd Bus
            </span>
            <span className="text-[#82727e] text-[11px] font-medium">
              {thirdBus.status}
            </span>
          </div>

          {/* ETA */}
          <div className="my-3 text-center py-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[40px] text-[#50434e] leading-none font-bold tracking-tight font-space-grotesk tabular-nums">
                {thirdBus.etaMinutes}
              </span>
              <span className="text-[18px] text-[#50434e] font-bold font-space-grotesk">
                MINS
              </span>
            </div>
            <p className="text-[11px] text-[#50434e] mt-1">
              Est. Arrival at {thirdBus.estimatedTimeStr}
            </p>
          </div>

          {/* Micro-Features & Capacity Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#4338CA]/10 text-[#4338CA] text-[11px] font-bold font-space-grotesk">
                <span className="material-symbols-outlined text-[15px]">directions_bus</span>
                {thirdBus.busType === 'DD' ? 'Double Deck (DD)' : 'Single Deck (SD)'}
              </span>
              {thirdBus.wab && (
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-1 rounded bg-[#E0F2FE] text-[#0284C7] text-[11px] font-bold font-space-grotesk"
                  title="Wheelchair Accessible Bus"
                >
                  <span className="material-symbols-outlined text-[15px]">accessible</span>
                  WAB
                </span>
              )}
            </div>

            {renderCrowdBadge(thirdBus.crowd, thirdBus.seatsLeftNote)}
          </div>
        </div>
      </div>

      {/* Capacity Bar Data Visualization */}
      <div className="bg-[#f5f2fd] p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 border border-[#efecf8]">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#16A34A] shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              airline_seat_recline_normal
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-[#1b1b23] font-bold font-space-grotesk">
              Active Fleet Fleet Capacity
            </span>
            <span className="text-[11px] text-[#50434e]">
              Optimal commuter dispatch along {service.origin} - {service.destination} Corridor
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-72">
          <div className="w-full bg-[#e9e7f2] h-2.5 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="bg-[#16A34A] h-full transition-all"
              style={{ width: `${service.fleetCapacity.seatsPercent}%` }}
              title={`${service.fleetCapacity.seatsPercent}% Seats Available`}
            />
            <div
              className="bg-[#D97706] h-full transition-all"
              style={{ width: `${service.fleetCapacity.standingPercent}%` }}
              title={`${service.fleetCapacity.standingPercent}% Standing Space`}
            />
            <div
              className="bg-[#DC2626] h-full transition-all"
              style={{ width: `${service.fleetCapacity.limitedPercent}%` }}
              title={`${service.fleetCapacity.limitedPercent}% Limited Standing`}
            />
          </div>
          <span className="text-[11px] text-[#1b1b23] font-bold shrink-0 font-space-grotesk whitespace-nowrap">
            {service.fleetCapacity.onTimeRate}% On-Time
          </span>
        </div>
      </div>
    </div>
  );
};
