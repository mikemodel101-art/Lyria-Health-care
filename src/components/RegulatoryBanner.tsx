import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';

export const RegulatoryBanner: React.FC = () => {
  const { openModal } = useWaitlist();

  return (
    <div className="bg-[#0D2821] text-[#E7EFEA] text-xs py-2 px-4 border-b border-[#184639]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5CE0B8] shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-white">UK Regulatory Notice:</strong> Lyria Health is currently completing formal UK healthcare registration. This website is strictly an informational waiting list.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px] text-[#A3C7B9]">
          <span>No payments or bookings taken</span>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => openModal('privacy_policy')}
            className="text-white underline underline-offset-2 hover:text-[#5CE0B8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
          >
            Compliance Terms
          </button>
        </div>
      </div>
    </div>
  );
};
