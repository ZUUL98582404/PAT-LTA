import React from 'react';

interface SkylineBannerProps {
  countdown: number;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const SkylineBanner: React.FC<SkylineBannerProps> = ({
  countdown,
  onRefresh,
  isRefreshing
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-[#47004a] py-6 text-white shadow-md">
      {/* Dynamic Singapore Skyline Scrim Accent Banner */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKZ_T1Xfgin0pMZio6uUaxmhB0TumIjDHFce6mia6XN_N49AdBiRDR-sCxU0JN532PKaWsplO_ID7s6XRQVIpASQTJjBYL4w3YSTEfOwpl4LmM3b7z74bowcilUkBPTAsAZgFNZeK3LLqI8faye478ZiAD0LEA9-JReZu-JW20Qy3xdRGDj11sXeTxSdD5reU0S0myrd_AXpW9SWLW8FIswOjgU2FD0CKFruJuOsPFg3R_rfULBPE')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#47004a] via-[#500C52]/95 to-[#47004a]/85 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Breadcrumb & Headline */}
        <div className="space-y-1">
          <nav className="flex items-center gap-1.5 text-[11px] font-medium text-[#d4c1cf]">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            <a href="#" className="hover:text-white transition-colors">Bus</a>
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
            <span className="text-[#ffdbcf] font-semibold">NextBus Arrival Timings</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
            <h1 className="text-[26px] md:text-[30px] font-extrabold tracking-tight text-white leading-none font-jakarta">
              NextBus Arrival Timings
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[#ffd6f7] text-[11px] font-bold backdrop-blur-md font-space-grotesk tracking-wide border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              LIVE LTA DATAMALL
            </span>
          </div>
        </div>

        {/* Real-time Synchronization HUD */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-sm">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-[#d4c1cf] uppercase tracking-wider font-semibold">Sync Status</span>
            <span className="text-[12px] text-white font-bold flex items-center justify-end gap-1 font-space-grotesk">
              <span className={`material-symbols-outlined text-[15px] text-[#EA580C] ${isRefreshing ? 'animate-spin' : ''}`}>
                sync
              </span>
              Auto-refresh in <span className="text-[#ffdbcf] font-mono text-[13px]">{countdown}</span>s
            </span>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E65100] hover:bg-[#EA580C] text-white rounded-lg text-[11px] font-bold shadow-sm transition-all transform active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[16px] ${isRefreshing ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>Refresh Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
