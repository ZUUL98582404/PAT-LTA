import React, { useState, useRef, useEffect } from 'react';
import { BUS_SERVICES, BUS_STOPS, SERVICE_ADVISORIES } from '../data/transitData';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onSelectService: (serviceNo: string) => void;
  onSelectStop: (stopCode: string) => void;
  textSize: 'sm' | 'md' | 'lg';
  onChangeTextSize: (size: 'sm' | 'md' | 'lg') => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
  pinnedStops: string[];
  pinnedServices: string[];
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onSelectService,
  onSelectStop,
  textSize,
  onChangeTextSize,
  highContrast,
  onToggleHighContrast,
  language,
  onChangeLanguage,
  pinnedStops,
  pinnedServices
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter bus services and stops matching query
  const matchingServices = Object.values(BUS_SERVICES).filter(s =>
    s.serviceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const matchingStops = Object.values(BUS_STOPS).filter(st =>
    st.code.includes(searchQuery) ||
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.roadName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = matchingServices.length > 0 || matchingStops.length > 0;

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbf8ff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#e9e7f2]">
      {/* Top Advisory Strip */}
      <div className="bg-[#f5f2fd] px-4 md:px-8 py-1.5 border-b border-[#efecf8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium text-[#50434e]">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="flex items-center gap-1.5 truncate">
              <span className="material-symbols-outlined text-[16px] text-[#E65100] shrink-0">campaign</span>
              <span className="font-bold text-[#1b1b23] shrink-0">Service Advisory:</span>
              <span className="truncate">Service 20 operating normally with enhanced frequencies during evening peak.</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            {/* Text Size Control */}
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline text-[#50434e]">Text Size</span>
              <button
                type="button"
                onClick={() => onChangeTextSize('sm')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  textSize === 'sm' ? 'bg-[#67106A] text-white' : 'hover:bg-[#e9e7f2] text-[#1b1b23]'
                }`}
                title="Smaller text"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onChangeTextSize('md')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  textSize === 'md' ? 'bg-[#67106A] text-white' : 'hover:bg-[#e9e7f2] text-[#1b1b23]'
                }`}
                title="Default text"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onChangeTextSize('lg')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  textSize === 'lg' ? 'bg-[#67106A] text-white' : 'hover:bg-[#e9e7f2] text-[#1b1b23]'
                }`}
                title="Larger text"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                highContrast ? 'bg-[#1b1b23] text-white' : 'hover:bg-[#e9e7f2] text-[#1b1b23]'
              }`}
              title="Toggle High Contrast mode"
            >
              <span className="material-symbols-outlined text-[15px]">contrast</span>
              <span className="hidden sm:inline">High Contrast</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#50434e]">translate</span>
              <select
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value)}
                className="bg-transparent text-[#1b1b23] font-semibold text-[11px] cursor-pointer focus:outline-none"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ms">Melayu</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-18 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4 md:gap-6">
        {/* Logo and Brand */}
        <div 
          onClick={() => onSelectTab('nextbus-timings')}
          className="flex items-center gap-3.5 shrink-0 cursor-pointer group"
        >
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1UuHVA_axSBgdBPEHlHtaOKtF-AS1ApMKr13oUcGlLnOjY6jWzAlHuMc5kksEAQv3xyUjm0AK9W9oFq0AVEZaayk4CDMfkxapDUBZsm4-T-t_TpCNM1159e_4sIMDj_NAR3xq7vwFCdzkGzigHyjvMqxRTClx_vWOhu9raQKN_jw_dGuYXWFVlURSifq3q0dHCFoymflp3bxO0DaY79HkPcJWdNwCJp4LFmo4_tliRozeO3QUBJEElUlQ"
            alt="SBS Transit Logo"
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-[20px] md:text-[22px] font-extrabold tracking-tight text-[#47004a] leading-none">
              SBS Transit
            </span>
            <span className="text-[10px] md:text-[11px] text-[#E65100] font-bold tracking-wider uppercase mt-0.5">
              Moving Journeys
            </span>
          </div>
        </div>

        {/* Global Transit Search Bar */}
        <div className="relative flex-1 max-w-xs md:max-w-sm" ref={searchRef}>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#50434e] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Bus service, stop code, or station..."
            className="w-full pl-9 pr-8 py-2 bg-[#F1F5F9] rounded-xl text-[13px] text-[#1b1b23] placeholder:text-[#82727e] focus:outline-none focus:ring-2 focus:ring-[#67106A] focus:bg-white transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#82727e] hover:text-[#1b1b23]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {showSearchResults && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-[#e9e7f2] overflow-hidden z-50 max-h-80 overflow-y-auto">
              {hasResults ? (
                <div className="p-2 space-y-2">
                  {matchingServices.length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-[10px] font-bold text-[#82727e] uppercase tracking-wider">
                        Bus Services
                      </div>
                      <div className="space-y-1">
                        {matchingServices.map(svc => (
                          <div
                            key={svc.serviceNo}
                            onClick={() => {
                              onSelectService(svc.serviceNo);
                              onSelectTab('nextbus-timings');
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F3E8F3] cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-8 h-7 bg-[#67106A] text-white font-bold text-[13px] rounded flex items-center justify-center font-space-grotesk">
                                {svc.serviceNo}
                              </span>
                              <div className="text-[12px]">
                                <span className="font-semibold text-[#1b1b23]">{svc.origin}</span>
                                <span className="text-[#82727e]"> → </span>
                                <span className="font-semibold text-[#1b1b23]">{svc.destination}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#FFF4ED] text-[#E65100]">
                              {svc.serviceType}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingStops.length > 0 && (
                    <div className="border-t border-[#efecf8] pt-2">
                      <div className="px-2 py-1 text-[10px] font-bold text-[#82727e] uppercase tracking-wider">
                        Bus Stops
                      </div>
                      <div className="space-y-1">
                        {matchingStops.map(st => (
                          <div
                            key={st.code}
                            onClick={() => {
                              onSelectStop(st.code);
                              onSelectTab('nextbus-timings');
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F1F5F9] cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px] text-[#67106A]">
                                signpost
                              </span>
                              <div className="text-[12px]">
                                <div className="font-bold text-[#1b1b23]">{st.name}</div>
                                <div className="text-[11px] text-[#82727e]">{st.code} • {st.roadName}</div>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#67106A] font-semibold">Select</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-[12px] text-[#82727e]">
                  No matching services or stops found for "{searchQuery}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-[#50434e]">
          <button
            type="button"
            onClick={() => onSelectTab('nextbus-timings')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-bold whitespace-nowrap ${
              currentTab === 'nextbus-timings'
                ? 'bg-[#67106A] text-white shadow-sm'
                : 'hover:text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            NextBus Timings
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('bus-services')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              currentTab === 'bus-services'
                ? 'bg-[#67106A] text-white shadow-sm font-bold'
                : 'hover:text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Bus Services
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('rail-network')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              currentTab === 'rail-network'
                ? 'bg-[#67106A] text-white shadow-sm font-bold'
                : 'hover:text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Rail Network
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('fares-and-concessions')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              currentTab === 'fares-and-concessions'
                ? 'bg-[#67106A] text-white shadow-sm font-bold'
                : 'hover:text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Fares & Concessions
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('alerts-and-advisory')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
              currentTab === 'alerts-and-advisory'
                ? 'bg-[#67106A] text-white shadow-sm font-bold'
                : 'hover:text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Alerts & Advisory
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Notification Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#50434e] hover:text-[#1b1b23] hover:bg-[#efecf8] rounded-full transition-colors relative"
              title="Notifications & Alerts"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E65100] ring-2 ring-white"></span>
            </button>

            {/* Notification Drawer Popover */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#e9e7f2] p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#efecf8]">
                  <span className="font-bold text-[13px] text-[#1b1b23]">Transit Notifications</span>
                  <span className="text-[10px] text-[#67106A] font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="divide-y divide-[#efecf8] max-h-64 overflow-y-auto pt-1">
                  {SERVICE_ADVISORIES.map(adv => (
                    <div key={adv.id} className="py-2.5 text-[12px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#67106A]">{adv.title}</span>
                        <span className="text-[10px] text-[#82727e]">{adv.time}</span>
                      </div>
                      <p className="text-[#50434e] text-[11px] leading-snug">{adv.message}</p>
                    </div>
                  ))}
                  {pinnedServices.length > 0 && (
                    <div className="py-2 text-[11px] text-[#16A34A] flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      <span>Monitoring {pinnedServices.length} pinned line(s)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Commuter Profile Avatar */}
          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="w-9 h-9 rounded-full bg-[#47004a] hover:bg-[#67106A] text-white flex items-center justify-center transition-all shadow-sm focus:ring-2 focus:ring-[#E65100]"
            title="Commuter Account & Favorites"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#50434e] hover:text-[#1b1b23] hover:bg-[#efecf8] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#efecf8] bg-[#fbf8ff] px-4 py-3 space-y-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onSelectTab('nextbus-timings');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-bold ${
              currentTab === 'nextbus-timings' ? 'bg-[#67106A] text-white' : 'text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            NextBus Timings
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectTab('bus-services');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium ${
              currentTab === 'bus-services' ? 'bg-[#67106A] text-white font-bold' : 'text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Bus Services
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectTab('rail-network');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium ${
              currentTab === 'rail-network' ? 'bg-[#67106A] text-white font-bold' : 'text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Rail Network
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectTab('fares-and-concessions');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium ${
              currentTab === 'fares-and-concessions' ? 'bg-[#67106A] text-white font-bold' : 'text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Fares & Concessions
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectTab('alerts-and-advisory');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium ${
              currentTab === 'alerts-and-advisory' ? 'bg-[#67106A] text-white font-bold' : 'text-[#1b1b23] hover:bg-[#efecf8]'
            }`}
          >
            Alerts & Advisory
          </button>
        </div>
      )}

      {/* Commuter Profile / Pinned Items Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e9e7f2] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#efecf8]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#67106A] text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#1b1b23]">Commuter Profile</h3>
                  <p className="text-[11px] text-[#82727e]">Personalized Transit Hub</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="text-[#82727e] hover:text-[#1b1b23] p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-[12px] font-bold text-[#1b1b23] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#E65100]">star</span>
                  Pinned Bus Stops ({pinnedStops.length})
                </h4>
                {pinnedStops.length > 0 ? (
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {pinnedStops.map(code => {
                      const stop = BUS_STOPS[code];
                      return (
                        <div
                          key={code}
                          onClick={() => {
                            onSelectStop(code);
                            setShowProfileModal(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#f5f2fd] hover:bg-[#F3E8F3] cursor-pointer text-[12px]"
                        >
                          <span className="font-bold text-[#67106A]">{code} - {stop?.name || 'Bus Stop'}</span>
                          <span className="text-[11px] text-[#82727e]">{stop?.roadName}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] text-[#82727e] italic">No bus stops pinned yet. Click "Pin This Stop" to save frequent stops.</p>
                )}
              </div>

              <div className="pt-2 border-t border-[#efecf8]">
                <h4 className="text-[12px] font-bold text-[#1b1b23] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#0284C7]">accessible</span>
                  Accessibility Options
                </h4>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#E0F2FE]/40 text-[12px]">
                  <div>
                    <div className="font-bold text-[#0284C7]">Wheelchair Accessible Filter</div>
                    <div className="text-[11px] text-[#50434e]">Highlight WAB ramps on all arrivals</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#0284C7] text-white font-bold text-[10px]">ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#efecf8] flex justify-end">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 bg-[#67106A] text-white text-[12px] font-bold rounded-xl hover:bg-[#500C52] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
