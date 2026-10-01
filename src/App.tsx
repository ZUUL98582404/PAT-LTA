import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SkylineBanner } from './components/SkylineBanner';
import { QuerySidebar } from './components/QuerySidebar';
import { SpotlightServiceCard } from './components/SpotlightServiceCard';
import { RouteProgression } from './components/RouteProgression';
import { ServicesTable } from './components/ServicesTable';
import { FareCalculatorModal } from './components/FareCalculatorModal';
import { TimetableModal } from './components/TimetableModal';
import { ProximityAlertModal } from './components/ProximityAlertModal';
import { ReportDiscrepancyModal } from './components/ReportDiscrepancyModal';
import { BusServicesView } from './components/BusServicesView';
import { RailNetworkView } from './components/RailNetworkView';
import { AlertsView } from './components/AlertsView';
import { Footer } from './components/Footer';
import { BUS_SERVICES, BUS_STOPS } from './data/transitData';
import { BusServiceItem } from './types/transit';
import { parseLtaService, LtaResponse } from './utils/ltaParser';

export default function App() {
  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<string>('nextbus-timings');
  const [selectedStopCode, setSelectedStopCode] = useState<string>('76081');
  const [selectedServiceNo, setSelectedServiceNo] = useState<string>('20');
  
  // Real-time synchronization timer
  const [countdown, setCountdown] = useState<number>(20);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  const [apiSource, setApiSource] = useState<'live' | 'fallback'>('fallback');

  // Dynamic services dictionary for live arrival updates
  const [servicesData, setServicesData] = useState<Record<string, BusServiceItem>>(BUS_SERVICES);

  // Accessibility & UI preferences
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');

  // Pinned items
  const [pinnedStops, setPinnedStops] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sbs_pinned_stops');
      return saved ? JSON.parse(saved) : ['76081'];
    } catch {
      return ['76081'];
    }
  });

  const [pinnedServices, setPinnedServices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sbs_pinned_services');
      return saved ? JSON.parse(saved) : ['20'];
    } catch {
      return ['20'];
    }
  });

  // Modal dialog states
  const [showFareModal, setShowFareModal] = useState<boolean>(false);
  const [showTimetableModal, setShowTimetableModal] = useState<boolean>(false);
  const [showProximityModal, setShowProximityModal] = useState<boolean>(false);
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mainDeckRef = useRef<HTMLDivElement>(null);

  // Persist pinned items
  useEffect(() => {
    try {
      localStorage.setItem('sbs_pinned_stops', JSON.stringify(pinnedStops));
    } catch {}
  }, [pinnedStops]);

  useEffect(() => {
    try {
      localStorage.setItem('sbs_pinned_services', JSON.stringify(pinnedServices));
    } catch {}
  }, [pinnedServices]);

  // Live countdown timer loop (20-second refresh per LTA DataMall v3 specifications)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          triggerLiveSync();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedStopCode, selectedServiceNo]);

  // Sync / refresh logic: calls /api/bus-arrival and updates servicesData
  const triggerLiveSync = async (stopCode = selectedStopCode, serviceNo = selectedServiceNo) => {
    setIsRefreshing(true);
    try {
      const url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(stopCode)}${
        serviceNo && serviceNo !== 'ALL' ? `&ServiceNo=${encodeURIComponent(serviceNo)}` : ''
      }`;
      const res = await fetch(url);
      if (res.ok) {
        const data: LtaResponse = await res.json();
        if (data && data.Services && Array.isArray(data.Services) && data.Services.length > 0) {
          setServicesData((prev) => {
            const next = { ...prev };
            data.Services.forEach((raw) => {
              next[raw.ServiceNo] = parseLtaService(raw, prev[raw.ServiceNo] || BUS_SERVICES[raw.ServiceNo]);
            });
            return next;
          });
          if (data._meta?.source === 'lta_datamall_live') {
            setApiSource('live');
          } else {
            setApiSource('fallback');
          }
        }
      }
    } catch (err) {
      console.warn('[Sync] Fetch from /api/bus-arrival failed, retaining local state:', err);
    } finally {
      setLastRefreshedAt(new Date());
      setIsRefreshing(false);
    }
  };

  // Re-sync when stop changes
  useEffect(() => {
    triggerLiveSync(selectedStopCode, selectedServiceNo);
    setCountdown(20);
  }, [selectedStopCode]);

  const handleManualRefresh = () => {
    setCountdown(20);
    triggerLiveSync(selectedStopCode, selectedServiceNo);
    showToast('Arrival estimates synchronized with LTA DataMall.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePinStop = () => {
    setPinnedStops((prev) => {
      const exists = prev.includes(selectedStopCode);
      const next = exists ? prev.filter((c) => c !== selectedStopCode) : [...prev, selectedStopCode];
      showToast(exists ? `Unpinned stop ${selectedStopCode}` : `Pinned stop ${selectedStopCode} to favorites`);
      return next;
    });
  };

  const handleTogglePinService = (serviceNo: string) => {
    setPinnedServices((prev) => {
      const exists = prev.includes(serviceNo);
      const next = exists ? prev.filter((s) => s !== serviceNo) : [...prev, serviceNo];
      showToast(exists ? `Unpinned Service ${serviceNo}` : `Pinned Service ${serviceNo}`);
      return next;
    });
  };

  const handleEstimateArrival = () => {
    triggerLiveSync();
    if (mainDeckRef.current) {
      mainDeckRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    showToast(`Calculated fastest arrival for Service ${selectedServiceNo === 'ALL' ? '20' : selectedServiceNo}`);
  };

  const currentStop = BUS_STOPS[selectedStopCode] || BUS_STOPS['76081'];
  const activeServiceKey = selectedServiceNo === 'ALL' ? '20' : selectedServiceNo;
  const currentService = servicesData[activeServiceKey] || servicesData['20'];

  // All services passing through active bus stop
  const passingServiceKeys = currentStop.passingServices || ['20', '8', '18', '28', '34', '518'];
  const passingServices = passingServiceKeys
    .map((k) => servicesData[k])
    .filter(Boolean) as BusServiceItem[];

  // Font scale class
  const getTextSizeClass = () => {
    if (textSize === 'sm') return 'text-[92%]';
    if (textSize === 'lg') return 'text-[108%]';
    return '';
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F8FAFC] transition-colors duration-200 ${getTextSizeClass()} ${
        highContrast ? 'contrast-125 dark:bg-black font-semibold' : ''
      }`}
    >
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b1b23] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-[12px] font-bold font-space-grotesk animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#E65100]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onSelectService={(s) => {
          setSelectedServiceNo(s);
          setCurrentTab('nextbus-timings');
        }}
        onSelectStop={(st) => {
          setSelectedStopCode(st);
          setCurrentTab('nextbus-timings');
        }}
        textSize={textSize}
        onChangeTextSize={setTextSize}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        language={language}
        onChangeLanguage={setLanguage}
        pinnedStops={pinnedStops}
        pinnedServices={pinnedServices}
      />

      {/* Main Content Viewport */}
      <main className="w-full pt-24 min-h-screen flex-1">
        {currentTab === 'nextbus-timings' && (
          <div className="flex flex-col w-full">
            {/* Skyline Accent Scrim Banner */}
            <SkylineBanner
              countdown={countdown}
              onRefresh={handleManualRefresh}
              isRefreshing={isRefreshing}
            />

            {/* Main Content Workbench Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* LEFT SIDEBAR: Search & Filters Deck (4 cols) */}
                <div className="lg:col-span-4">
                  <QuerySidebar
                    selectedStopCode={selectedStopCode}
                    onSelectStopCode={setSelectedStopCode}
                    selectedServiceNo={selectedServiceNo}
                    onSelectServiceNo={setSelectedServiceNo}
                    onEstimateArrival={handleEstimateArrival}
                    isPinned={pinnedStops.includes(selectedStopCode)}
                    onTogglePinStop={handleTogglePinStop}
                    onOpenProximityAlert={() => setShowProximityModal(true)}
                    onOpenFareCalculator={() => setShowFareModal(true)}
                    onOpenTimetable={() => setShowTimetableModal(true)}
                  />
                </div>

                {/* RIGHT MAIN DECK: Live Arrival Deck & Route Timeline (8 cols) */}
                <section className="lg:col-span-8 flex flex-col gap-6" ref={mainDeckRef}>
                  {/* ACTIVE TARGET SERVICE SPOTLIGHT CARD */}
                  <SpotlightServiceCard
                    service={currentService}
                    stop={currentStop}
                  />

                  {/* ROUTE PROGRESSION TIMELINE */}
                  <RouteProgression
                    service={currentService}
                    onSelectStopCode={(code) => {
                      if (BUS_STOPS[code]) {
                        setSelectedStopCode(code);
                        showToast(`Switched stop to ${code} - ${BUS_STOPS[code].name}`);
                      }
                    }}
                  />

                  {/* MULTI-SERVICE OVERVIEW AT ACTIVE BUS STOP */}
                  <ServicesTable
                    stop={currentStop}
                    services={passingServices}
                    activeServiceNo={activeServiceKey}
                    onSelectService={(s) => setSelectedServiceNo(s)}
                    pinnedServices={pinnedServices}
                    onTogglePinService={handleTogglePinService}
                    onOpenReportDiscrepancy={() => setShowDiscrepancyModal(true)}
                  />
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Alternate Tab Views */}
        {currentTab === 'bus-services' && (
          <BusServicesView
            onSelectServiceAndGo={(serviceNo) => {
              setSelectedServiceNo(serviceNo);
              setCurrentTab('nextbus-timings');
            }}
          />
        )}

        {currentTab === 'rail-network' && <RailNetworkView />}

        {currentTab === 'fares-and-concessions' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e9e7f2] space-y-3">
              <h2 className="text-[24px] font-extrabold text-[#47004a]">
                Fares, Concession Cards & Ticketing Guide
              </h2>
              <p className="text-[13px] text-[#50434e]">
                Singapore uses distance-based fare charging under the Land Transport Authority (LTA) Fare Structure. Fares are calculated seamlessly across bus and rail transfers within a 45-minute window.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowFareModal(true)}
                  className="px-5 py-2.5 bg-[#E65100] hover:bg-[#EA580C] text-white text-[13px] font-bold rounded-xl shadow-md font-space-grotesk flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <span>Launch Distance Fare Calculator</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'alerts-and-advisory' && <AlertsView />}
      </main>

      {/* Global Modals */}
      <FareCalculatorModal
        isOpen={showFareModal}
        onClose={() => setShowFareModal(false)}
        defaultServiceNo={currentService.serviceNo}
      />

      <TimetableModal
        isOpen={showTimetableModal}
        onClose={() => setShowTimetableModal(false)}
        service={currentService}
      />

      <ProximityAlertModal
        isOpen={showProximityModal}
        onClose={() => setShowProximityModal(false)}
        service={currentService}
        stop={currentStop}
      />

      <ReportDiscrepancyModal
        isOpen={showDiscrepancyModal}
        onClose={() => setShowDiscrepancyModal(false)}
        stop={currentStop}
        serviceNo={currentService.serviceNo}
      />

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}
