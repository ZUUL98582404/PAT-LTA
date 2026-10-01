import React, { useState } from 'react';
import { BUS_STOPS } from '../data/transitData';

interface QuerySidebarProps {
  selectedStopCode: string;
  onSelectStopCode: (code: string) => void;
  selectedServiceNo: string;
  onSelectServiceNo: (serviceNo: string) => void;
  onEstimateArrival: () => void;
  isPinned: boolean;
  onTogglePinStop: () => void;
  onOpenProximityAlert: () => void;
  onOpenFareCalculator: () => void;
  onOpenTimetable: () => void;
}

export const QuerySidebar: React.FC<QuerySidebarProps> = ({
  selectedStopCode,
  onSelectStopCode,
  selectedServiceNo,
  onSelectServiceNo,
  onEstimateArrival,
  isPinned,
  onTogglePinStop,
  onOpenProximityAlert,
  onOpenFareCalculator,
  onOpenTimetable
}) => {
  const [queryMode, setQueryMode] = useState<'stop' | 'service'>('stop');
  const [locatingNearby, setLocatingNearby] = useState(false);
  const [nearbyToast, setNearbyToast] = useState<string | null>(null);

  const activeStop = BUS_STOPS[selectedStopCode] || BUS_STOPS['76081'];
  const quickChips = ['8', '17', '18', '20', '28', '34', '39', '59', '292', '518'];

  const handleNearbyClick = () => {
    setLocatingNearby(true);
    setNearbyToast('Locating nearest bus stop via GPS...');
    setTimeout(() => {
      onSelectStopCode('76081');
      setLocatingNearby(false);
      setNearbyToast('Nearest stop found: 76081 (Opp Holy Trinity, 45m away)');
      setTimeout(() => setNearbyToast(null), 4000);
    }, 800);
  };

  return (
    <aside className="flex flex-col gap-5">
      {/* Search Parameter Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9e7f2] p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#67106A]" />
            <h2 className="text-[20px] font-bold text-[#47004a] tracking-tight">
              Query Journey
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#e9e7f2] text-[#50434e] text-[11px] font-semibold">
            {activeStop.subArea}
          </span>
        </div>

        {/* Dual Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#F1F5F9] rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setQueryMode('stop')}
            className={`py-2 px-3 text-center text-[12px] font-bold rounded-lg transition-all font-space-grotesk ${
              queryMode === 'stop'
                ? 'bg-[#67106A] text-white shadow-sm'
                : 'text-[#50434e] hover:text-[#1b1b23]'
            }`}
          >
            By Stop No.
          </button>
          <button
            type="button"
            onClick={() => setQueryMode('service')}
            className={`py-2 px-3 text-center text-[12px] font-bold rounded-lg transition-all font-space-grotesk ${
              queryMode === 'service'
                ? 'bg-[#67106A] text-white shadow-sm'
                : 'text-[#50434e] hover:text-[#1b1b23]'
            }`}
          >
            By Service No.
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={(e) => { e.preventDefault(); onEstimateArrival(); }} className="space-y-4 pt-1">
          {/* Bus Stop Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bus-stop-select"
                className="text-[12px] text-[#1b1b23] font-semibold flex items-center gap-1 font-space-grotesk"
              >
                <span className="material-symbols-outlined text-[16px] text-[#67106A]">signpost</span>
                Bus Stop Location
              </label>
              <button
                type="button"
                onClick={handleNearbyClick}
                disabled={locatingNearby}
                className="text-[#E65100] text-[11px] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {locatingNearby ? 'progress_activity' : 'near_me'}
                </span>
                <span>{locatingNearby ? 'Locating...' : 'Nearby'}</span>
              </button>
            </div>

            <div className="relative">
              <select
                id="bus-stop-select"
                value={selectedStopCode}
                onChange={(e) => onSelectStopCode(e.target.value)}
                className="w-full bg-[#f5f2fd] text-[#1b1b23] text-[13px] font-medium rounded-xl pl-3 pr-9 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#67106A] focus:bg-white transition-all cursor-pointer border border-[#efecf8]"
              >
                {Object.values(BUS_STOPS).map(st => (
                  <option key={st.code} value={st.code}>
                    {st.code} - {st.name}, {st.roadName}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#50434e] pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Service Selector Dropdown */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bus-service-select"
                className="text-[12px] text-[#1b1b23] font-semibold flex items-center gap-1 font-space-grotesk"
              >
                <span className="material-symbols-outlined text-[16px] text-[#67106A]">directions_bus</span>
                Specific Service <span className="font-normal text-[#82727e]">(optional)</span>
              </label>
              <span className="text-[11px] text-[#82727e] font-medium">11 Routes Available</span>
            </div>

            <div className="relative">
              <select
                id="bus-service-select"
                value={selectedServiceNo}
                onChange={(e) => onSelectServiceNo(e.target.value)}
                className="w-full bg-[#f5f2fd] text-[#1b1b23] text-[13px] font-medium rounded-xl pl-3 pr-9 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#67106A] focus:bg-white transition-all cursor-pointer border border-[#efecf8]"
              >
                <option value="ALL">Show All Passing Services</option>
                <option value="20">Service 20 (Loop to Changi Biz Pk)</option>
                <option value="8">Service 8 (To Toa Payoh Int)</option>
                <option value="17">Service 17 (To Bedok Int)</option>
                <option value="18">Service 18 (To Bedok North)</option>
                <option value="28">Service 28 (To Toa Payoh Int)</option>
                <option value="34">Service 34 (To Changi Airport PTB)</option>
                <option value="39">Service 39 (To Yishun Int)</option>
                <option value="59">Service 59 (To Bishan Int)</option>
                <option value="292">Service 292 (Tampines Feeder)</option>
                <option value="518">Service 518 (Express to Bayfront)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#50434e] pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Quick Service Filter Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-[#50434e] font-semibold">Quick Service Filter:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickChips.map((chip) => {
                const isActive = selectedServiceNo === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => onSelectServiceNo(chip)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-space-grotesk transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#47004a] text-white shadow-sm ring-1 ring-[#67106A]'
                        : 'bg-[#e9e7f2] text-[#1b1b23] hover:bg-[#F3E8F3] hover:text-[#500C52]'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onEstimateArrival}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-[#E65100] hover:bg-[#EA580C] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] cursor-pointer font-space-grotesk tracking-wide"
          >
            <span className="material-symbols-outlined text-[22px]">timer</span>
            <span>ESTIMATE ARRIVAL TIME</span>
          </button>
        </form>

        {/* Nearby Toast Notification */}
        {nearbyToast && (
          <div className="p-2.5 rounded-lg bg-[#ECFDF5] border border-[#16A34A]/20 text-[#16A34A] text-[11px] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{nearbyToast}</span>
          </div>
        )}

        {/* Commuter Quick Actions Bar */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onTogglePinStop}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[11px] font-semibold transition-colors border ${
              isPinned
                ? 'bg-[#FFF4ED] text-[#E65100] border-[#E65100]/30'
                : 'bg-[#F1F5F9] hover:bg-[#e9e7f2] text-[#1b1b23] border-transparent'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${isPinned ? 'text-[#E65100] fill-1' : 'text-[#E65100]'}`}>
              {isPinned ? 'star' : 'star_border'}
            </span>
            <span>{isPinned ? 'Pinned' : 'Pin This Stop'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenProximityAlert}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#F1F5F9] hover:bg-[#e9e7f2] text-[#1b1b23] text-[11px] font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#0284C7]">
              notifications_active
            </span>
            <span>Set Proximity Alert</span>
          </button>
        </div>
      </div>

      {/* Bus Stop Landmark Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9e7f2] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] text-[#47004a] font-bold uppercase tracking-wider flex items-center gap-1.5 font-space-grotesk">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            Stop Landmark Info
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#16A34A] text-[11px] font-semibold">
            {activeStop.sheltered ? 'Sheltered' : 'Standard'}
          </span>
        </div>

        {/* Shelter Image & Overlay */}
        <div className="relative rounded-xl overflow-hidden h-36 bg-[#efecf8] group shadow-inner">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url('${activeStop.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFRpvmN_DVCbOnLVus5T3imDqGeo2JbC7h7o2VWk4TamNTsddiVX-V9tjtr5otyJ0B4sd2ZqaYWF17S3R1oxbWDSr0aq3Kztcy7jlXXq781N6tmmUuYkNbCdj8uPIaYZ4wjqN6JfvW2YwpQCRoO7ihVMCuVII-5uvf_cdcb_13MqaQCphHHY3liS3NvEj2ObRLiTLU6ul2c1VWKknSCAKl360UrSYE_EReUwpQSQSUMXClbMobtWU'}')`
            }}
          />
          <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center justify-between border border-white/40 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#1b1b23] font-space-grotesk">
                {activeStop.roadName}
              </span>
              <span className="text-[10px] text-[#50434e]">
                {activeStop.connectingMrt ? `Connecting to ${activeStop.connectingMrt}` : activeStop.subArea}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#67106A] text-[20px]">
              directions_walk
            </span>
          </div>
        </div>

        {/* Utility Action Links */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={onOpenFareCalculator}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f2fd] transition-colors text-[#1b1b23] text-left group cursor-pointer"
          >
            <span className="flex items-center gap-2 text-[12px] font-medium">
              <span className="material-symbols-outlined text-[17px] text-[#E65100]">payments</span>
              Bus Fare Calculator & Travel Cards
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#82727e] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenTimetable}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#f5f2fd] transition-colors text-[#1b1b23] text-left group cursor-pointer"
          >
            <span className="flex items-center gap-2 text-[12px] font-medium">
              <span className="material-symbols-outlined text-[17px] text-[#4338CA]">schedule</span>
              Full First & Last Bus Timetable
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#82727e] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Official Status & Legend Guide */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9e7f2] p-4 space-y-2.5 text-[11px]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b1b23] font-space-grotesk">
          Crowd Occupancy Legend
        </span>
        <div className="grid grid-cols-1 gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#16A34A] shrink-0" />
            <span className="text-[#1b1b23] font-bold">Seats Available</span>
            <span className="text-[#82727e]">— Many vacant seats onboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D97706] shrink-0" />
            <span className="text-[#1b1b23] font-bold">Standing Available</span>
            <span className="text-[#82727e]">— Standing room, few seats</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#DC2626] shrink-0" />
            <span className="text-[#1b1b23] font-bold">Limited Standing</span>
            <span className="text-[#82727e]">— Packed, boarding may be difficult</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="p-1 rounded bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[14px]">accessible</span>
            </span>
            <span className="text-[#1b1b23] font-bold">WAB</span>
            <span className="text-[#82727e]">— Wheelchair Accessible Bus with ramp</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
