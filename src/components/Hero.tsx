import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Lock, Clock, AlertCircle } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';
import { CONSENT_TEXT, CURRENT_CONSENT_VERSION, MEMBERSHIP_TIERS } from '../data/mockData';
import { TierId } from '../types/waitlist';

export const Hero: React.FC = () => {
  const {
    submitWaitlist,
    selectedTier,
    setSelectedTier,
    totalSubscribersCount,
    openModal,
    openReferralModal,
  } = useWaitlist();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid UK or international email address.');
      return;
    }

    if (!consent) {
      setErrorMsg('Please check the box to confirm your consent under UK GDPR.');
      return;
    }

    setIsSubmitting(true);

    const result = submitWaitlist({
      name,
      email,
      tierInterest: selectedTier,
      consent,
      honeypot,
      source: `lyriahealth.co.uk#hero-form`,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      // Form cleared; Double Opt-In modal is automatically opened by context
      setName('');
      setEmail('');
      setConsent(false);
    }
  };

  return (
    <section id="waitlist" className="relative pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background aesthetic touches */}
      <div className="absolute inset-0 bg-radial from-[#F3F1E7]/70 via-[#FAF9F5] to-[#FAF9F5] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Proposition & Waitlist Form */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Unboxed Metadata Trust Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4A5D54] tracking-wide">
              <span>UK Membership Service</span>
              <span aria-hidden="true">·</span>
              <span>GMC-Registered Remote Doctors</span>
              <span aria-hidden="true">·</span>
              <span>UKAS-Accredited Labs</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif-custom font-normal leading-[1.14] text-[#0A251D] text-balance">
              Proactive clinical care and routine blood biomarker testing, unified.
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-[#3D4F46] leading-relaxed max-w-xl font-normal">
              Direct, unhurried remote GP consultations paired with quarterly laboratory biomarker tracking. One membership designed to identify physiological trends years ahead of symptoms.
            </p>

            {/* Waiting List Queue Counter */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#526359] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-mono-custom tabular-nums font-semibold text-[#0A251D] text-sm">
                  {totalSubscribersCount.toLocaleString()}
                </span>
                <span>verified UK residents in queue</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <button
                type="button"
                onClick={() => openReferralModal()}
                className="text-[#0A251D] font-semibold underline underline-offset-2 hover:text-[#061813] transition-colors cursor-pointer"
              >
                Check queue rank & referral link →
              </button>
            </div>

            {/* Hero Waiting List Capture Card */}
            <div className="bg-white/90 backdrop-blur-sm border border-[#E4E1D5] rounded-xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(10,37,29,0.04)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot Spam Trap (Hidden from legitimate users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_user_website">Leave empty</label>
                  <input
                    id="hp_user_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="waitlist-name" className="block text-xs font-semibold text-[#2D3E35] mb-1.5">
                      Full Name <span className="text-[#0A251D]">*</span>
                    </label>
                    <input
                      id="waitlist-name"
                      type="text"
                      required
                      placeholder="e.g. Dr Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#DCD8CC] rounded-md text-[#17211E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A251D] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="waitlist-email" className="block text-xs font-semibold text-[#2D3E35] mb-1.5">
                      Email Address <span className="text-[#0A251D]">*</span>
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      placeholder="e.g. sarah.jenkins@nhs.net"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#DCD8CC] rounded-md text-[#17211E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A251D] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Optional Tier of Interest */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="tier-select" className="block text-xs font-semibold text-[#2D3E35]">
                      Planned Tier of Interest <span className="font-normal text-[#64748B]">(Optional, for cohort planning)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('memberships');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] text-[#0A251D] hover:underline"
                    >
                      Compare Tiers →
                    </button>
                  </div>
                  <select
                    id="tier-select"
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value as TierId)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#DCD8CC] rounded-md text-[#17211E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A251D] transition-all cursor-pointer"
                  >
                    <option value="core">Core Health — £49/mo (Bi-annual 32 Biomarkers + 20-min GP review)</option>
                    <option value="comprehensive">Comprehensive (Recommended) — £95/mo (Quarterly 64 Biomarkers + 35-min GP)</option>
                    <option value="longevity">Performance & Longevity — £185/mo (Quarterly 92+ Biomarkers + 45-min GP)</option>
                    <option value="undecided">Undecided / General Updates</option>
                  </select>
                </div>

                {/* GDPR Mandatory Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] text-[#0A251D] focus:ring-[#0A251D] cursor-pointer"
                    />
                    <span className="text-[12px] leading-relaxed text-[#475569]">
                      {CONSENT_TEXT}{' '}
                      <button
                        type="button"
                        onClick={() => openModal('privacy_policy')}
                        className="text-[#0A251D] underline underline-offset-2 hover:text-[#061813]"
                      >
                        Privacy Notice
                      </button>
                      {' '}· <span className="font-mono-custom text-[10px] text-[#64748B]">{CURRENT_CONSENT_VERSION}</span>
                    </span>
                  </label>
                </div>

                {/* Error feedback */}
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#0A251D] hover:bg-[#133F33] active:bg-[#061813] rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  <span>Request Priority Waiting List Access</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Micro guarantees */}
                <div className="pt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    Double opt-in verification
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#64748B]" />
                    Zero health data asked
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                    One-click unsubscribe anytime
                  </span>
                </div>

              </form>
            </div>

            {/* Regulatory Disclaimer below form */}
            <p className="text-[11px] text-[#718096] leading-relaxed">
              <strong>Notice:</strong> We are awaiting regulatory registration. The site is a waiting list only: no payments, bookings or clinical claims are made prior to authorization.
            </p>

          </div>

          {/* Right Column: Visual Anchor & Clinical Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Clinical Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E2DFD2] bg-white shadow-[0_12px_40px_rgba(10,37,29,0.08)]">
                <img
                  src="/src/assets/images/hero_lyria_clinical_1791165236764.jpg"
                  alt="Precision laboratory diagnostic phlebotomy vials and clinical equipment for Lyria Health"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 md:h-[400px] object-cover object-center filter saturate-[0.95]"
                  loading="eager"
                />

                {/* Subtle scrim & overlay caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A251D]/90 via-[#0A251D]/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono-custom tracking-wider uppercase text-[#5CE0B8]">
                      Laboratory Protocol
                    </div>
                    <h3 className="text-xl font-serif-custom font-normal text-white">
                      Rigorous UKAS-Accredited Pathology
                    </h3>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      Every panel analysed in registered British clinical laboratories with rigorous internal quality control standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quiet floating badge on desktop: Adjacency evidence */}
              <div className="mt-4 p-4 bg-white/95 backdrop-blur-sm border border-[#E5E2D6] rounded-xl shadow-sm text-xs text-[#334155] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#0A251D]">Patient Privacy Guarantee</span>
                  <span className="text-[10px] font-mono-custom text-[#059669] font-medium">UK GDPR Article 6 & 17 Compliant</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-snug">
                  Waiting list records reside strictly within UK data residency boundaries. Clinical consultations operate in an isolated, DSPT-certified medical network.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
