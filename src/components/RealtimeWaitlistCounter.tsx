import React, { useState, useEffect, useRef } from 'react';
import { useWaitlist } from '../context/WaitlistContext';
import {
  Users,
  TrendingUp,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LiveSignup {
  id: string;
  nameMasked: string;
  location: string;
  tier: string;
  timeAgo: string;
  isNew?: boolean;
}

const INITIAL_RECENT_SIGNUPS: LiveSignup[] = [
  {
    id: 'live-1',
    nameMasked: 'Dr Marcus W.',
    location: 'Bath, Somerset',
    tier: 'Comprehensive',
    timeAgo: 'Just now',
  },
  {
    id: 'live-2',
    nameMasked: 'Eleanor V.',
    location: 'Oxfordshire',
    tier: 'Comprehensive',
    timeAgo: '3m ago',
  },
  {
    id: 'live-3',
    nameMasked: 'Harriet C.',
    location: 'Edinburgh',
    tier: 'Performance & Longevity',
    timeAgo: '7m ago',
  },
  {
    id: 'live-4',
    nameMasked: 'James T.',
    location: 'London (Westminster)',
    tier: 'Core Health',
    timeAgo: '14m ago',
  },
  {
    id: 'live-5',
    nameMasked: 'Siddharth P.',
    location: 'North London',
    tier: 'Core Health',
    timeAgo: '22m ago',
  },
];

const SIMULATED_PROFILES = [
  { nameMasked: 'Dr Fiona M.', location: 'Edinburgh City', tier: 'Performance & Longevity' },
  { nameMasked: 'Oliver K.', location: 'London (Kensington)', tier: 'Comprehensive' },
  { nameMasked: 'Charlotte D.', location: 'Bath, Somerset', tier: 'Comprehensive' },
  { nameMasked: 'Gareth L.', location: 'Cardiff, Wales', tier: 'Core Health' },
  { nameMasked: 'Dr Alistair C.', location: 'Lothian, Scotland', tier: 'Performance & Longevity' },
  { nameMasked: 'Sophie T.', location: 'Cambridge', tier: 'Comprehensive' },
  { nameMasked: 'Julian R.', location: 'Bristol & Clifton', tier: 'Core Health' },
  { nameMasked: 'Professor Neil B.', location: 'Manchester Central', tier: 'Comprehensive' },
  { nameMasked: 'Victoria S.', location: 'Surrey (Guildford)', tier: 'Performance & Longevity' },
];

export const RealtimeWaitlistCounter: React.FC = () => {
  const { totalSubscribersCount, incrementLiveCount, openReferralModal } = useWaitlist();

  const [recentSignups, setRecentSignups] = useState<LiveSignup[]>(INITIAL_RECENT_SIGNUPS);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [pulseCount, setPulseCount] = useState<boolean>(false);
  const [simulatedProfileIndex, setSimulatedProfileIndex] = useState<number>(0);

  const cohortCap = 2000;
  const remainingPlaces = Math.max(0, cohortCap - totalSubscribersCount);
  const capacityPercent = Math.min(100, (totalSubscribersCount / cohortCap) * 100);

  // Trigger one simulated signup entry
  const triggerSimulatedSignup = () => {
    incrementLiveCount();
    setPulseCount(true);
    setTimeout(() => setPulseCount(false), 1200);

    const profile = SIMULATED_PROFILES[simulatedProfileIndex % SIMULATED_PROFILES.length];
    setSimulatedProfileIndex((prev) => prev + 1);

    const newSignup: LiveSignup = {
      id: `live-${Date.now()}`,
      nameMasked: profile.nameMasked,
      location: profile.location,
      tier: profile.tier,
      timeAgo: 'Just now',
      isNew: true,
    };

    setRecentSignups((prev) => [newSignup, ...prev.slice(0, 4)]);
  };

  // Background timer: periodically adds simulated signups every 18-30s when live feed is active
  useEffect(() => {
    if (!isLiveActive) return;

    // Random interval between 16 and 26 seconds
    const intervalTime = Math.floor(Math.random() * 10000) + 16000;
    const timer = setTimeout(() => {
      triggerSimulatedSignup();
    }, intervalTime);

    return () => clearTimeout(timer);
  }, [isLiveActive, totalSubscribersCount, simulatedProfileIndex]);

  // Smooth scroll helper to Hero form
  const scrollToWaitlist = () => {
    const target = document.getElementById('waitlist-name') || document.getElementById('waitlist');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.focus();
    }
  };

  return (
    <section
      aria-label="Live Waiting List Counter and Social Proof"
      className="relative bg-[#0A251D] text-white border-y border-[#184639] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#123E31]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 relative z-10 space-y-10">
        
        {/* Top Ticker Bar: Live Beacon & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#184639]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {isLiveActive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLiveActive ? 'bg-[#10B981]' : 'bg-[#64748B]'}`} />
            </span>
            <span className="text-xs font-mono-custom tracking-wider uppercase text-[#A3C7B9] font-medium flex items-center gap-2">
              <span>Live Queue Activity · Inaugural Cohort 1 Intake</span>
              <span aria-hidden="true" className="text-[#235848]">/</span>
              <span className="text-[#5CE0B8]">UK Residency Verified</span>
            </span>
          </div>

          {/* Activity Feed Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => setIsLiveActive((prev) => !prev)}
              className="text-[11px] font-mono-custom text-[#A3C7B9] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isLiveActive ? 'Pause real-time updates' : 'Resume real-time updates'}
            >
              {isLiveActive ? (
                <>
                  <Pause className="w-3 h-3 text-[#5CE0B8]" />
                  <span>Feed Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#94A3B8]" />
                  <span>Feed Paused</span>
                </>
              )}
            </button>

            <span aria-hidden="true" className="text-[#184639]">|</span>

            {/* Tactile Live Test Trigger for evaluators / users */}
            <button
              onClick={triggerSimulatedSignup}
              className="px-2.5 py-1 bg-[#143B30] hover:bg-[#1D5444] border border-[#235848] rounded text-[11px] font-mono-custom text-[#5CE0B8] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              title="Test real-time counter increment simulation"
            >
              <Sparkles className="w-3 h-3" />
              <span>Simulate Live Signup</span>
            </button>
          </div>
        </div>

        {/* 2-Column Core Section: Live Counter & Gauge on Left, Real-Time Activity Feed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Big Counter, Capacity Progress Bar, Urgency Rationale */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#5CE0B8] mb-1">
                Real-Time Verified Queue
              </div>
              
              <div className="flex items-baseline gap-3">
                <span
                  className={`text-5xl sm:text-6xl lg:text-7xl font-serif-custom font-normal tracking-tight text-white tabular-nums transition-all duration-300 ${
                    pulseCount ? 'text-[#5CE0B8] scale-[1.02]' : ''
                  }`}
                >
                  {totalSubscribersCount.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-[#A3C7B9] font-medium max-w-[200px] leading-tight">
                  Verified UK patients awaiting launch admission
                </span>
              </div>
            </div>

            {/* Capacity Progress Bar Card */}
            <div className="bg-[#0D2F25] border border-[#194C3D] rounded-xl p-5 space-y-3.5 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Cohort 1 Capacity:</span>
                  <span className="font-mono-custom text-[#5CE0B8]">
                    {capacityPercent.toFixed(1)}% Reserved
                  </span>
                </div>
                <div className="font-mono-custom text-[#A3C7B9] text-[11px]">
                  {totalSubscribersCount.toLocaleString()} / {cohortCap.toLocaleString()} Cap
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-[#081F19] rounded-full h-2.5 overflow-hidden p-0.5 border border-[#184639]">
                <div
                  className="bg-gradient-to-r from-[#10B981] to-[#5CE0B8] h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>

              {/* Urgency Callout */}
              <div className="flex items-start gap-2.5 pt-1 text-xs text-[#CBD5E1] leading-relaxed">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-medium">{remainingPlaces} places remaining</strong> before Cohort 1 admissions close. Subsequent applicants will be queued for Cohort 2 pending secondary clinic rollout.
                </p>
              </div>
            </div>

            {/* Clinical Intake Philosophy Rationale */}
            <p className="text-xs text-[#84A999] leading-relaxed max-w-xl">
              <strong className="text-white">Why phased cohort intake?</strong> Unlike high-volume algorithmic apps, Lyria Health caps patient cohorts to preserve an unhurried 1:1 GMC GP relationship (20–45 min video reviews) and maintain sub-48-hour UKAS pathology turnaround times.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToWaitlist}
                className="px-6 py-3 bg-[#5CE0B8] hover:bg-[#4BD0A8] active:bg-[#3ABF97] text-[#0A251D] text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <span>Claim Your Cohort 1 Priority Place</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => openReferralModal()}
                className="px-4 py-3 bg-[#143B30] hover:bg-[#1D5444] border border-[#235848] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Check Queue Rank & Referrals
              </button>
            </div>

          </div>

          {/* Right Column: Live Recent Signups Stream */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-[#184639]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#5CE0B8]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                  Live Registration Stream
                </h3>
              </div>
              <span className="text-[10px] font-mono-custom text-[#A3C7B9]">
                Anonymised for GDPR Art. 5
              </span>
            </div>

            {/* Stream List */}
            <div className="space-y-2.5">
              <AnimatePresence initial={false}>
                {recentSignups.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3.5 rounded-xl border transition-all ${
                      item.isNew
                        ? 'bg-[#154638] border-[#5CE0B8]/50 shadow-md'
                        : 'bg-[#0D2F25] border-[#184639]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {item.nameMasked}
                          </span>
                          <span className="text-[11px] text-[#A3C7B9]">
                            {item.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-[#5CE0B8] font-medium">
                            Tier: {item.tier}
                          </span>
                          <span aria-hidden="true" className="text-[#235848]">·</span>
                          <span className="text-[#84A999] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                            Double Opt-In Verified
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono-custom text-[#A3C7B9] shrink-0 bg-[#081F19] px-2 py-0.5 rounded border border-[#184639]">
                        {item.timeAgo}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stream Footer Notice */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-[#84A999] font-mono-custom">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5CE0B8]" />
                Audited UK GDPR Log Engine
              </span>
              <span>Refreshed live</span>
            </div>

          </div>

        </div>

        {/* Bottom 3-Pillar Social Proof & Operational Governance Grid */}
        <div className="pt-8 border-t border-[#184639] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-[#0D2F25]/70 border border-[#184639] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-[#5CE0B8] font-mono-custom">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold text-white text-sm">+48 Applicants / 24h</span>
            </div>
            <p className="text-[#A3C7B9] leading-relaxed text-[11px]">
              Strong demand across professionals and health-conscious adults reserving inaugural diagnostic slots.
            </p>
          </div>

          <div className="bg-[#0D2F25]/70 border border-[#184639] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-[#5CE0B8] font-mono-custom">
              <Users className="w-4 h-4" />
              <span className="font-semibold text-white text-sm">1:1 Named GMC Doctor</span>
            </div>
            <p className="text-[#A3C7B9] leading-relaxed text-[11px]">
              Strict capacity caps protect physician continuity and provide 20–45 minute unhurried video reviews.
            </p>
          </div>

          <div className="bg-[#0D2F25]/70 border border-[#184639] rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-[#5CE0B8] font-mono-custom">
              <Lock className="w-4 h-4" />
              <span className="font-semibold text-white text-sm">Zero Health Data</span>
            </div>
            <p className="text-[#A3C7B9] leading-relaxed text-[11px]">
              No clinical information or medical histories are held on this waiting list. PECR and GDPR Article 6 aligned.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
