import React from 'react';
import { Check, ArrowRight, Clock, Shield } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/mockData';
import { useWaitlist } from '../context/WaitlistContext';
import { TierId } from '../types/waitlist';

export const MembershipTiers: React.FC = () => {
  const { setSelectedTier } = useWaitlist();

  const handlePreselect = (tierId: TierId) => {
    setSelectedTier(tierId);
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="memberships" className="py-20 md:py-28 bg-[#F4F2E9]/60 border-b border-[#E6E3D6]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
            Planned Membership Tiers
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-normal text-[#0A251D] text-balance">
            Designed for long-term healthspan. Transparent, ongoing clinical oversight.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Choose the diagnostic depth matching your personal health goals. Pre-select your tier below to register interest for our inaugural launch cohorts.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map((tier) => {
            const isHighlighted = tier.highlighted;
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all ${
                  isHighlighted
                    ? 'bg-white border-2 border-[#0A251D] shadow-[0_12px_40px_rgba(10,37,29,0.09)]'
                    : 'bg-white/85 border border-[#E2DFD3] hover:bg-white hover:shadow-sm'
                }`}
              >
                {/* Visual anchor label if highlighted (unboxed text or subtle tag) */}
                {isHighlighted && (
                  <div className="absolute -top-3 left-7 bg-[#0A251D] text-white text-[10px] font-mono-custom uppercase tracking-widest px-3 py-1 rounded">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl font-serif-custom text-[#0A251D] font-normal">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">{tier.tagline}</p>
                  </div>

                  {/* Indicative Price & Frequency */}
                  <div className="pt-2 border-t border-[#EFECE1]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-serif-custom text-[#0A251D]">
                        {tier.indicativePrice.split(' ')[0]}
                      </span>
                      <span className="text-xs text-[#64748B]">/ month indicative</span>
                    </div>
                    <div className="text-xs text-[#4A5D54] font-medium mt-1">
                      {tier.frequency}
                    </div>
                  </div>

                  {/* Key Stats Bar */}
                  <div className="p-3 bg-[#FAF9F5] border border-[#EBE7DC] rounded-lg space-y-1.5 text-xs text-[#334155]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">Laboratory Assays:</span>
                      <span className="font-semibold text-[#0A251D]">{tier.biomarkersCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B]">GMC GP Consultation:</span>
                      <span className="font-semibold text-[#0A251D]">{tier.gpReviewTime}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                      Includes:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#475569] leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-[#0A251D] mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-8 mt-8 border-t border-[#EFECE1]">
                  <button
                    onClick={() => handlePreselect(tier.id)}
                    className={`w-full py-3 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#0A251D] text-white hover:bg-[#133F33] shadow-sm'
                        : 'bg-[#FAF9F5] border border-[#DCD8CC] text-[#0A251D] hover:bg-[#EAE8DD]'
                    }`}
                  >
                    <span>Pre-select for Waiting List</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-[#94A3B8] mt-2">
                    Zero commitment. No billing details taken.
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Responsive Detailed Tier Comparison Table */}
        <div className="mt-16 bg-white border border-[#E5E2D6] rounded-2xl overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 border-b border-[#EFECE3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono-custom text-[#059669] font-semibold uppercase tracking-wider">
                Full Specification Matrix
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-custom text-[#0A251D] font-normal mt-1">
                Side-by-side diagnostic capability comparison
              </h3>
            </div>
            <div className="text-xs text-[#64748B] flex items-center gap-1.5 self-start sm:self-auto">
              <span className="sm:hidden font-mono-custom text-[#0A251D]">Scroll horizontally on mobile →</span>
            </div>
          </div>

          {/* Horizontally Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-xs text-[#334155]">
              <thead className="bg-[#FAF9F5] border-b border-[#E5E2D6] font-mono-custom text-[11px] text-[#64748B] uppercase">
                <tr>
                  <th className="py-3.5 px-5 sticky left-0 bg-[#FAF9F5] z-10 shadow-xs sm:shadow-none min-w-[180px]">
                    Clinical Feature
                  </th>
                  <th className="py-3.5 px-4 text-center">Core Health (£49/mo)</th>
                  <th className="py-3.5 px-4 text-center bg-[#FAF9F5]/70 text-[#0A251D] font-bold">
                    Comprehensive (£95/mo)
                  </th>
                  <th className="py-3.5 px-4 text-center">Longevity (£185/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE3] bg-white text-xs">
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Biomarker Assays
                  </td>
                  <td className="py-3 px-4 text-center font-mono-custom">32 Markers</td>
                  <td className="py-3 px-4 text-center font-mono-custom font-semibold text-[#0A251D] bg-[#FAF9F5]/40">
                    64 Markers
                  </td>
                  <td className="py-3 px-4 text-center font-mono-custom">92+ Markers</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Venous Testing Frequency
                  </td>
                  <td className="py-3 px-4 text-center">Bi-annual (2x / year)</td>
                  <td className="py-3 px-4 text-center font-semibold text-[#0A251D] bg-[#FAF9F5]/40">
                    Quarterly (4x / year)
                  </td>
                  <td className="py-3 px-4 text-center">Quarterly (4x / year)</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Named GMC GP Video Review
                  </td>
                  <td className="py-3 px-4 text-center font-mono-custom">20 minutes</td>
                  <td className="py-3 px-4 text-center font-mono-custom font-semibold text-[#0A251D] bg-[#FAF9F5]/40">
                    35 minutes
                  </td>
                  <td className="py-3 px-4 text-center font-mono-custom">45 minutes</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Advanced ApoB & Particle Lipids
                  </td>
                  <td className="py-3 px-4 text-center text-[#94A3B8]">Basic Lipids only</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium bg-[#FAF9F5]/40">
                    Full ApoB Included
                  </td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">
                    ApoB + Lp(a) Subfractions
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Metabolic & HOMA-IR Testing
                  </td>
                  <td className="py-3 px-4 text-center text-[#94A3B8]">Fasting Glucose</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium bg-[#FAF9F5]/40">
                    HbA1c + Fasting Glucose
                  </td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">
                    HOMA-IR + C-Peptide + HbA1c
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Thyroid & Hormone Complete
                  </td>
                  <td className="py-3 px-4 text-center text-[#94A3B8]">TSH Screen</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium bg-[#FAF9F5]/40">
                    TSH + Free T3 + Free T4
                  </td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">
                    Full Hormones + TPO Antibodies
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    Longitudinal Trajectory Dashboard
                  </td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">Included</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium bg-[#FAF9F5]/40">Included</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">Included</td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-[#17211E] sticky left-0 bg-white z-10 shadow-xs sm:shadow-none">
                    NHS GP Transfer Letter
                  </td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">On request</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium bg-[#FAF9F5]/40">On request</td>
                  <td className="py-3 px-4 text-center text-[#059669] font-medium">Automated sync</td>
                </tr>
                <tr className="bg-[#FAF9F5]">
                  <td className="py-3 px-5 sticky left-0 bg-[#FAF9F5] z-10 shadow-xs sm:shadow-none font-semibold text-[#0A251D]">
                    Pre-select Tier
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handlePreselect('core')}
                      className="px-3 py-1.5 bg-white border border-[#DCD8CC] rounded text-[11px] font-semibold text-[#0A251D] hover:bg-[#F2EFE6] transition-colors"
                    >
                      Pre-select Core
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center bg-[#FAF9F5]">
                    <button
                      onClick={() => handlePreselect('comprehensive')}
                      className="px-3 py-1.5 bg-[#0A251D] text-white rounded text-[11px] font-semibold hover:bg-[#154638] transition-colors shadow-2xs"
                    >
                      Pre-select Comprehensive
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handlePreselect('longevity')}
                      className="px-3 py-1.5 bg-white border border-[#DCD8CC] rounded text-[11px] font-semibold text-[#0A251D] hover:bg-[#F2EFE6] transition-colors"
                    >
                      Pre-select Longevity
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory Note below cards */}
        <div className="mt-12 p-5 bg-white border border-[#E4E0D2] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526359]">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#0A251D] shrink-0" />
            <span>
              <strong>Regulatory Guardrail:</strong> Pricing displayed is indicative for cohort planning. No contracts, payments, or clinical liabilities exist prior to UK healthcare regulator authorization.
            </span>
          </div>
          <button
            onClick={() => handlePreselect('comprehensive')}
            className="text-[#0A251D] font-semibold underline whitespace-nowrap hover:text-[#061813]"
          >
            Register Interest Now
          </button>
        </div>

      </div>
    </section>
  );
};
