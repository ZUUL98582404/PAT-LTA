import React, { useState } from 'react';
import { BUS_SERVICES } from '../data/transitData';

interface FareCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceNo: string;
}

export const FareCalculatorModal: React.FC<FareCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultServiceNo
}) => {
  const [passengerType, setPassengerType] = useState<'adult' | 'student' | 'senior' | 'workfare'>('adult');
  const [distanceKm, setDistanceKm] = useState<number>(4.2);
  const [serviceCategory, setServiceCategory] = useState<'trunk' | 'feeder' | 'express'>('trunk');

  if (!isOpen) return null;

  // Real Singapore LTA Distance-Based Fare formula approximation
  const calculateFare = () => {
    let base = 1.09;
    if (serviceCategory === 'express') {
      base = 2.40;
    } else if (serviceCategory === 'feeder') {
      base = 1.09;
      return { cardFare: 1.09, cashFare: 1.90 };
    }

    if (distanceKm > 3.2) {
      base += Math.min(1.20, (distanceKm - 3.2) * 0.10);
    }

    if (passengerType === 'student') {
      base = Math.max(0.48, base * 0.45);
    } else if (passengerType === 'senior') {
      base = Math.max(0.65, base * 0.55);
    } else if (passengerType === 'workfare') {
      base = Math.max(0.79, base * 0.75);
    }

    const cardFare = Number(base.toFixed(2));
    const cashFare = Number((cardFare + 0.80).toFixed(2));
    return { cardFare, cashFare };
  };

  const { cardFare, cashFare } = calculateFare();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e9e7f2] space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#efecf8]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF4ED] text-[#E65100] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#47004a]">Bus Fare Calculator</h3>
              <p className="text-[11px] text-[#50434e]">Distance-Based Fares (SimplyGo / EZ-Link)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#82727e] hover:text-[#1b1b23] hover:bg-[#efecf8]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Input Parameters */}
        <div className="space-y-4 text-[13px]">
          {/* Passenger Type */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#1b1b23] text-[12px] uppercase tracking-wider font-space-grotesk">
              Passenger Concession Card
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'adult', label: 'Adult Card' },
                { id: 'student', label: 'Primary / Sec' },
                { id: 'senior', label: 'Senior Citizen' },
                { id: 'workfare', label: 'Workfare / PWD' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPassengerType(p.id as any)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-bold font-space-grotesk transition-all cursor-pointer border ${
                    passengerType === p.id
                      ? 'bg-[#67106A] text-white border-[#67106A] shadow-sm'
                      : 'bg-[#F1F5F9] text-[#50434e] border-transparent hover:bg-[#e9e7f2]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Category */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#1b1b23] text-[12px] uppercase tracking-wider font-space-grotesk">
              Bus Service Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'trunk', label: 'Trunk (e.g. 20, 8)' },
                { id: 'feeder', label: 'Feeder (e.g. 292)' },
                { id: 'express', label: 'Express (e.g. 518)' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceCategory(s.id as any)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-bold font-space-grotesk transition-all cursor-pointer border ${
                    serviceCategory === s.id
                      ? 'bg-[#E65100] text-white border-[#E65100] shadow-sm'
                      : 'bg-[#F1F5F9] text-[#50434e] border-transparent hover:bg-[#e9e7f2]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-[#1b1b23] text-[12px] uppercase tracking-wider font-space-grotesk">
                Journey Distance
              </label>
              <span className="font-bold text-[#67106A] text-[13px] font-space-grotesk">
                {distanceKm.toFixed(1)} km
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="25.0"
              step="0.2"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full accent-[#67106A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#82727e]">
              <span>Short Trip (1-2 stops)</span>
              <span>Regional (~8 km)</span>
              <span>Cross-island (25 km)</span>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="bg-[#f5f2fd] p-4 rounded-xl border border-[#efecf8] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#50434e] font-semibold">Contactless Card / SimplyGo</div>
              <div className="text-[26px] font-extrabold text-[#E65100] font-space-grotesk">
                ${cardFare.toFixed(2)} SGD
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-[#82727e]">Cash Payment Fare</div>
              <div className="text-[18px] font-bold text-[#50434e] font-space-grotesk">
                ${cashFare.toFixed(2)} SGD
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e9e7f2] flex items-center gap-1.5 text-[11px] text-[#16A34A] font-semibold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Eligible for 45-minute transfer rebate when connecting to MRT / companion bus.</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#47004a] hover:bg-[#67106A] text-white text-[12px] font-bold rounded-xl transition-colors font-space-grotesk"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
