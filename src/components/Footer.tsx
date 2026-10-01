import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-8 pb-6 border-t border-[#e9e7f2] mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 pb-8 border-b border-[#efecf8]">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#67106A]" />
              <span className="text-[18px] font-bold text-[#47004a]">
                SBS Transit Ltd
              </span>
            </div>
            <p className="text-[13px] text-[#50434e] leading-relaxed">
              Singapore's premier public transport operator, committed to delivering safe, reliable, and delightful transit journeys across bus and rail networks.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#16A34A] text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Transit Planning */}
          <div className="space-y-2.5">
            <h3 className="text-[12px] font-bold text-[#1b1b23] uppercase tracking-wider font-space-grotesk">
              Transit Planning
            </h3>
            <ul className="space-y-1.5 text-[13px] text-[#50434e]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('nextbus-timings')}
                  className="hover:text-[#E65100] transition-colors text-left"
                >
                  NextBus Live Feed
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('rail-network')}
                  className="hover:text-[#E65100] transition-colors text-left"
                >
                  Downtown & NEL Rail Maps
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('bus-services')}
                  className="hover:text-[#E65100] transition-colors text-left"
                >
                  First & Last Train Timings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('bus-services')}
                  className="hover:text-[#E65100] transition-colors text-left"
                >
                  Interchange Hub Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Commuter Support */}
          <div className="space-y-2.5">
            <h3 className="text-[12px] font-bold text-[#1b1b23] uppercase tracking-wider font-space-grotesk">
              Commuter Support
            </h3>
            <ul className="space-y-1.5 text-[13px] text-[#50434e]">
              <li>
                <a href="#" className="hover:text-[#E65100] transition-colors">
                  Lost & Found Inquiry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E65100] transition-colors">
                  Wheelchair Accessibility Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E65100] transition-colors">
                  Feedback & Commendations
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('fares-and-concessions')}
                  className="hover:text-[#E65100] transition-colors text-left"
                >
                  Concession Card Claims
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile & Open Data */}
          <div className="space-y-2.5">
            <h3 className="text-[12px] font-bold text-[#1b1b23] uppercase tracking-wider font-space-grotesk">
              Mobile & Open Data
            </h3>
            <p className="text-[12px] text-[#50434e]">
              Download the SBS Transit app for live arrival notifications and step-free navigation.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F1F5F9] hover:bg-[#e9e7f2] text-[#1b1b23] text-[11px] font-semibold transition-colors text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Download on App Store</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F1F5F9] hover:bg-[#e9e7f2] text-[#1b1b23] text-[11px] font-semibold transition-colors text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">android</span>
                <span>Get it on Google Play</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#50434e]">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-center md:text-left">
            <span>© 2025 SBS Transit Ltd. All rights reserved. Co. Reg. No.: 199206653M</span>
            <span className="hidden md:inline">•</span>
            <span>Powered by LTA DataMall Real-Time APIs</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#1b1b23] transition-colors">Privacy Statement</a>
            <a href="#" className="hover:text-[#1b1b23] transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-[#1b1b23] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
