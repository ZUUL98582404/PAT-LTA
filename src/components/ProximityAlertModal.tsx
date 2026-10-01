import React, { useState } from 'react';
import { BusServiceItem, BusStopItem } from '../types/transit';

interface ProximityAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: BusServiceItem;
  stop: BusStopItem;
}

export const ProximityAlertModal: React.FC<ProximityAlertModalProps> = ({
  isOpen,
  onClose,
  service,
  stop
}) => {
  const [alertThreshold, setAlertThreshold] = useState<number>(5);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isArming, setIsArming] = useState(false);
  const [armedSuccess, setArmedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleArmAlert = () => {
    setIsArming(true);
    setTimeout(() => {
      setIsArming(false);
      setArmedSuccess(true);
      setTimeout(() => {
        setArmedSuccess(false);
        onClose();
      }, 1500);
    }, 600);
  };

  const playTestChime = () => {
    // Web Audio API beep simulation
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 587.33; // D5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // Audio fallback
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e9e7f2] space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#efecf8]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#47004a]">Set Proximity Alert</h3>
              <p className="text-[11px] text-[#50434e]">
                Service {service.serviceNo} @ Stop {stop.code}
              </p>
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

        {/* Form Controls */}
        <div className="space-y-4 text-[13px]">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#1b1b23] text-[12px] uppercase tracking-wider font-space-grotesk">
              Notify Me When Bus Is:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 5, 10].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setAlertThreshold(mins)}
                  className={`py-2.5 px-3 rounded-xl font-bold font-space-grotesk text-center transition-all cursor-pointer border ${
                    alertThreshold === mins
                      ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-sm'
                      : 'bg-[#F1F5F9] text-[#50434e] border-transparent hover:bg-[#e9e7f2]'
                  }`}
                >
                  {mins} MINS AWAY
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f5f2fd] border border-[#efecf8] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1b1b23] text-[12px] block">
                  Audio Alert Chime
                </span>
                <span className="text-[11px] text-[#82727e]">
                  Plays distinct SBS Transit arrival tone
                </span>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#67106A] cursor-pointer"
              />
            </div>
            {soundEnabled && (
              <button
                type="button"
                onClick={playTestChime}
                className="text-[11px] text-[#67106A] font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                <span className="material-symbols-outlined text-[15px]">volume_up</span>
                Test Sound Chime
              </button>
            )}
          </div>

          {armedSuccess && (
            <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#16A34A]/30 text-[#16A34A] text-[12px] font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Proximity alert armed! You will be notified when Service {service.serviceNo} is {alertThreshold} mins away.</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#efecf8]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[#50434e] hover:bg-[#efecf8] text-[12px] font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleArmAlert}
            disabled={isArming}
            className="px-5 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-[12px] font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 font-space-grotesk cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            <span>{isArming ? 'Arming...' : 'Arm Alert'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
