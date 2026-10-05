import React, { useState, useMemo } from 'react';
import { useWaitlist } from '../context/WaitlistContext';
import {
  Share2,
  Copy,
  Check,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  Gift,
  Search,
  MessageCircle,
  Twitter,
  Linkedin,
  Mail,
  TrendingUp,
  CheckCircle2,
  Lock,
  Unlock,
  ShieldCheck,
  ChevronRight,
  Clock,
  UserCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WaitlistEntry } from '../types/waitlist';

export const ReferralProgressDashboard: React.FC = () => {
  const {
    entries,
    activeReferralEntry,
    totalSubscribersCount,
    generateReferralCode,
    getReferralLink,
    simulateReferralSignup,
    lookupEntryByEmail,
  } = useWaitlist();

  // Active selected entry (defaults to activeReferralEntry or first confirmed entry)
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupFeedback, setLookupFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  // Determine active entry
  const currentEntry: WaitlistEntry = useMemo(() => {
    if (selectedEntryId) {
      const found = entries.find((e) => e.id === selectedEntryId);
      if (found) return found;
    }
    if (activeReferralEntry) {
      return activeReferralEntry;
    }
    return entries.find((e) => e.status === 'confirmed') || entries[0];
  }, [selectedEntryId, activeReferralEntry, entries]);

  const referralCode = generateReferralCode(currentEntry);
  const referralLink = getReferralLink(referralCode);
  const referralsCount = currentEntry.referralsCount || 0;
  const currentRank = currentEntry.queuePosition || 140;

  // Relative standing calculations
  const cohortCap = 2000;
  const aheadOfCount = Math.max(0, totalSubscribersCount - currentRank);
  const percentile = Math.min(
    99.9,
    Math.max(0.1, Number(((aheadOfCount / totalSubscribersCount) * 100).toFixed(1)))
  );

  // Milestones structure
  const milestones = [
    {
      target: 1,
      title: 'Cohort 1 Priority Lock',
      perk: 'Advance 15 queue spots and lock in guaranteed Inaugural Launch access.',
      value: 'Priority Admission',
      unlocked: referralsCount >= 1,
    },
    {
      target: 3,
      title: 'Complimentary Phlebotomist Home Visit',
      perk: 'NHS-trained phlebotomist visits your home or office for venous blood collection.',
      value: '£75 Value',
      unlocked: referralsCount >= 3,
    },
    {
      target: 5,
      title: 'Advanced ApoB & Lipid Subfraction Panel',
      perk: 'Complimentary laboratory upgrade analyzing atherogenic particle density & Lp(a).',
      value: '£120 Value',
      unlocked: referralsCount >= 5,
    },
    {
      target: 10,
      title: 'Foundational Year Health Membership',
      perk: 'Twelve months of Core Health bi-annual biomarker panels and GP video consultations.',
      value: '£588 Value',
      unlocked: referralsCount >= 10,
    },
  ];

  const nextMilestone = milestones.find((m) => !m.unlocked) || milestones[milestones.length - 1];
  const referralsToNext = Math.max(0, nextMilestone.target - referralsCount);

  // Copy referral link handler
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Lookup email handler
  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupFeedback(null);

    if (!lookupEmail.trim()) return;

    const found = lookupEntryByEmail(lookupEmail);
    if (found) {
      setSelectedEntryId(found.id);
      setLookupFeedback({
        type: 'success',
        message: `Loaded priority dashboard for ${found.name} (#${found.queuePosition}).`,
      });
      setLookupEmail('');
    } else {
      setLookupFeedback({
        type: 'error',
        message: 'No active registration found matching that email. Register above to join!',
      });
    }
  };

  // Simulate friend verification
  const handleSimulateSignup = () => {
    setIsSimulating(true);
    setSimulationNotice(null);

    const result = simulateReferralSignup(referralCode);
    setIsSimulating(false);

    if (result.success) {
      setSimulationNotice(result.message);
      if (result.newQueuePosition) {
        // Also refresh selection if needed
        setSelectedEntryId(currentEntry.id);
      }
      setTimeout(() => setSimulationNotice(null), 6000);
    }
  };

  // Share URLs
  const shareText = encodeURIComponent(
    `I've reserved my priority spot for Lyria Health — UK preventative blood biomarker profiling paired with dedicated GMC GP reviews. Use my referral link to get priority cohort access:`
  );
  const encodedUrl = encodeURIComponent(referralLink);

  return (
    <section
      id="referral-progress"
      aria-label="My Referral Progress and Priority Queue Dashboard"
      className="py-20 md:py-28 bg-[#FAF9F5] border-b border-[#E7E5DC] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
              <Users className="w-4 h-4 text-[#059669]" />
              <span>Priority Referral Engine & Queue Status</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-custom font-normal text-[#0A251D] text-balance">
              My Referral Progress & Queue Standing.
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Every peer who completes double opt-in verification using your link advances you <strong className="text-[#0A251D]">15 positions</strong> up the priority queue and unlocks clinical testing upgrades.
            </p>
          </div>

          {/* Persona Switcher for demonstration & quick testing */}
          <div className="bg-white border border-[#DCD8CC] rounded-xl p-3 shadow-2xs self-start md:self-auto space-y-2">
            <div className="text-[11px] font-mono-custom text-[#64748B] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>Demo Persona / Switch Record:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {entries.slice(0, 4).map((e) => (
                <button
                  key={e.id}
                  onClick={() => {
                    setSelectedEntryId(e.id);
                    setLookupFeedback(null);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-mono-custom transition-all cursor-pointer ${
                    currentEntry.id === e.id
                      ? 'bg-[#0A251D] text-white font-semibold shadow-2xs'
                      : 'bg-[#FAF9F5] hover:bg-[#F2EFE6] text-[#334155] border border-[#E5E2D6]'
                  }`}
                >
                  {e.name.split(' ')[0]} (#{e.queuePosition})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Email Lookup Strip */}
        <div className="bg-white border border-[#E2DFD3] rounded-2xl p-4 sm:p-5 shadow-xs">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={lookupEmail}
                onChange={(e) => setLookupEmail(e.target.value)}
                placeholder="Enter your registered waiting list email to load your standing..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F5] border border-[#DCD8CC] rounded-xl text-[#0A251D] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0A251D]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0A251D] hover:bg-[#154638] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Look Up My Progress
            </button>
          </form>

          {lookupFeedback && (
            <div
              className={`mt-3 text-xs flex items-center gap-2 ${
                lookupFeedback.type === 'success' ? 'text-[#059669]' : 'text-[#DC2626]'
              }`}
            >
              {lookupFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 shrink-0" />
              )}
              <span>{lookupFeedback.message}</span>
            </div>
          )}
        </div>

        {/* Dynamic Simulation Notification Banner */}
        <AnimatePresence>
          {simulationNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#10B981]/15 border border-[#10B981]/40 rounded-xl p-4 flex items-center justify-between gap-4 text-xs text-[#065F46] font-medium shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#059669] shrink-0" />
                <span>{simulationNotice}</span>
              </div>
              <span className="font-mono-custom text-[11px] text-[#047857] shrink-0">
                Live Audit Log Recorded
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4 Core KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Queue Rank */}
          <div className="bg-white border border-[#E5E2D6] rounded-2xl p-6 space-y-2 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-[#64748B] text-xs">
              <span className="font-medium">Queue Standing</span>
              <span className="font-mono-custom text-[11px] bg-[#FAF9F5] border border-[#E2DFD3] px-2 py-0.5 rounded text-[#0A251D]">
                Cohort 1 Active
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-serif-custom text-[#0A251D] font-normal tabular-nums">
                #{currentRank}
              </span>
              <span className="text-xs text-[#64748B] font-mono-custom">
                of {totalSubscribersCount.toLocaleString()}
              </span>
            </div>

            <div className="text-xs text-[#059669] font-medium flex items-center gap-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Ahead of {aheadOfCount.toLocaleString()} applicants (Top {percentile}%)</span>
            </div>
          </div>

          {/* Card 2: Verified Referrals */}
          <div className="bg-white border border-[#E5E2D6] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748B] text-xs">
              <span className="font-medium">Verified Referrals</span>
              <span className="font-mono-custom text-[11px] text-[#059669] font-semibold">
                +15 spots / each
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-serif-custom text-[#0A251D] font-normal tabular-nums">
                {referralsCount}
              </span>
              <span className="text-xs text-[#64748B]">
                {referralsCount === 1 ? 'Colleague' : 'Colleagues'} Joined
              </span>
            </div>

            <div className="text-xs text-[#0A251D] font-mono-custom pt-1">
              <span>+{referralsCount * 15} queue positions accelerated</span>
            </div>
          </div>

          {/* Card 3: Admission Window */}
          <div className="bg-white border border-[#E5E2D6] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748B] text-xs">
              <span className="font-medium">Target Admission</span>
              <span className="font-mono-custom text-[11px] text-[#059669]">
                Day 1 Allocation
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif-custom text-[#0A251D] font-normal pt-1 block">
                Inaugural Cohort 1
              </span>
            </div>

            <div className="text-xs text-[#64748B] flex items-center gap-1 pt-1">
              <Clock className="w-3.5 h-3.5 text-[#059669]" />
              <span>Phased regulatory rollout</span>
            </div>
          </div>

          {/* Card 4: Next Perk Milestone */}
          <div className="bg-white border border-[#E5E2D6] rounded-2xl p-6 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[#64748B] text-xs">
              <span className="font-medium">Next Perk Unlock</span>
              <span className="font-mono-custom text-[11px] text-[#D97706] font-semibold">
                {nextMilestone.value}
              </span>
            </div>

            <div className="text-sm font-semibold text-[#0A251D] line-clamp-1 pt-1">
              {nextMilestone.title}
            </div>

            <div className="text-xs text-[#64748B] pt-1">
              {referralsToNext === 0 ? (
                <span className="text-[#059669] font-medium">All current tier rewards unlocked!</span>
              ) : (
                <span>
                  <strong className="text-[#0A251D] font-semibold">{referralsToNext}</strong> more {referralsToNext === 1 ? 'referral' : 'referrals'} needed
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Visual Queue Standing Position Gauge */}
        <div className="bg-white border border-[#E5E2D6] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-[#0A251D]">
                Queue Progression & Cohort 1 Boundary
              </h3>
              <p className="text-xs text-[#64748B]">
                Position relative to total active registrations across the United Kingdom.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-custom">
              <span className="px-2.5 py-1 bg-[#059669]/10 text-[#059669] rounded-md font-semibold border border-[#059669]/20">
                Position #{currentRank}
              </span>
              <span className="text-[#64748B]">/</span>
              <span className="text-[#64748B]">Cap #{cohortCap}</span>
            </div>
          </div>

          {/* Visual Bar Track */}
          <div className="space-y-3">
            <div className="relative w-full bg-[#EAE7DC] h-3.5 rounded-full overflow-hidden p-0.5">
              {/* Progress fill towards front (inverse representation: rank 1 is 100% front) */}
              <div
                className="bg-gradient-to-r from-[#059669] via-[#10B981] to-[#34D399] h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.max(5, Math.min(100, ((cohortCap - currentRank) / cohortCap) * 100))}%`,
                }}
              />
            </div>

            {/* Scale Markers */}
            <div className="flex items-center justify-between text-[11px] font-mono-custom text-[#64748B]">
              <div className="flex items-center gap-1 text-[#059669] font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Front of Queue (#1)</span>
              </div>
              <div className="hidden sm:block text-[#0A251D] font-medium">
                Your Spot: #{currentRank}
              </div>
              <div className="text-[#94A3B8]">
                Cohort 1 Cap (#{cohortCap})
              </div>
            </div>
          </div>

          <p className="text-xs text-[#475569] leading-relaxed">
            <strong className="text-[#0A251D]">Registration Status:</strong> You are registered under <span className="font-semibold text-[#0A251D]">{currentEntry.name}</span> (<code className="font-mono-custom text-[11px] bg-[#FAF9F5] px-1.5 py-0.5 rounded border border-[#E2DFD3]">{currentEntry.email}</code>). Priority positions are locked upon double opt-in completion.
          </p>
        </div>

        {/* 2-Column Section: Milestones on Left, Referral Sharing Tools on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Reward Milestones Progression Ladder (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E2D6] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-semibold text-[#0A251D] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D97706]" />
                  <span>Clinical Milestone Rewards</span>
                </h3>
                <span className="text-xs font-mono-custom text-[#059669]">
                  {referralsCount} Verified
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Unlock complimentary pathology upgrades and home phlebotomy visits as you refer colleagues.
              </p>
            </div>

            {/* Milestones List */}
            <div className="space-y-4">
              {milestones.map((m) => {
                const isComplete = referralsCount >= m.target;
                const progressPct = Math.min(100, (referralsCount / m.target) * 100);

                return (
                  <div
                    key={m.target}
                    className={`p-4 rounded-xl border transition-all ${
                      isComplete
                        ? 'bg-[#FAFDFB] border-[#A7F3D0] shadow-2xs'
                        : 'bg-[#FAF9F5] border-[#E5E2D6]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isComplete
                                ? 'bg-[#059669] text-white'
                                : 'bg-[#E2DFD3] text-[#64748B]'
                            }`}
                          >
                            {isComplete ? <Check className="w-3.5 h-3.5" /> : m.target}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#0A251D]">
                            {m.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#64748B] leading-relaxed pl-8">
                          {m.perk}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-[10px] font-mono-custom px-2 py-0.5 rounded font-semibold uppercase tracking-wider block mb-1 ${
                            isComplete
                              ? 'bg-[#10B981]/15 text-[#065F46] border border-[#10B981]/30'
                              : 'bg-white text-[#94A3B8] border border-[#DCD8CC]'
                          }`}
                        >
                          {isComplete ? 'Unlocked' : `${referralsCount}/${m.target}`}
                        </span>
                        <span className="text-[11px] font-mono-custom text-[#4A5D54] font-semibold">
                          {m.value}
                        </span>
                      </div>
                    </div>

                    {/* Milestone Mini Progress Bar if not unlocked */}
                    {!isComplete && (
                      <div className="pl-8 pt-3">
                        <div className="w-full bg-[#E5E2D6] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0A251D] h-full rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>Rewards will be automatically credited to your membership profile on launch invitation.</span>
            </div>
          </div>

          {/* Right Column: Personal Referral Link & Direct Share Tools (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Referral Link Box */}
            <div className="bg-white border border-[#E5E2D6] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#059669]" />
                  <h3 className="text-base font-semibold text-[#0A251D]">
                    Your Unique Referral Link
                  </h3>
                </div>
                <p className="text-xs text-[#64748B]">
                  Share with colleagues or family interested in preventative health.
                </p>
              </div>

              {/* Code Box */}
              <div className="p-3 bg-[#FAF9F5] border border-[#DCD8CC] rounded-xl flex items-center justify-between gap-2">
                <div className="truncate">
                  <div className="text-[10px] text-[#64748B] font-mono-custom uppercase tracking-wider">
                    Personal Code
                  </div>
                  <div className="text-xs font-mono-custom font-bold text-[#0A251D] truncate">
                    {referralCode}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-[#0A251D] hover:bg-[#154638] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#5CE0B8]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* One-Click Share Buttons */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-custom text-[#64748B]">
                  Fast 1-Click Share:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#FAF9F5] hover:bg-[#EFECE3] border border-[#DCD8CC] rounded-xl text-xs font-semibold text-[#0A251D] flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#FAF9F5] hover:bg-[#EFECE3] border border-[#DCD8CC] rounded-xl text-xs font-semibold text-[#0A251D] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#FAF9F5] hover:bg-[#EFECE3] border border-[#DCD8CC] rounded-xl text-xs font-semibold text-[#0A251D] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5 text-[#1DA1F2]" />
                    <span>X (Twitter)</span>
                  </a>

                  <a
                    href={`mailto:?subject=Priority%20Waiting%20List%20for%20Lyria%20Health&body=${shareText}%20${encodedUrl}`}
                    className="p-2.5 bg-[#FAF9F5] hover:bg-[#EFECE3] border border-[#DCD8CC] rounded-xl text-xs font-semibold text-[#0A251D] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Interactive Simulation Sandbox Trigger */}
              <div className="pt-4 border-t border-[#F2EFE8] space-y-2">
                <div className="text-[11px] font-mono-custom text-[#64748B] flex items-center justify-between">
                  <span>Interactive Test Tool:</span>
                  <span className="text-[#059669]">+15 Places</span>
                </div>
                <button
                  type="button"
                  onClick={handleSimulateSignup}
                  disabled={isSimulating}
                  className="w-full py-2.5 px-4 bg-[#0A251D]/5 hover:bg-[#0A251D]/10 border border-[#0A251D]/20 text-[#0A251D] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Simulate Friend Verification</span>
                </button>
                <p className="text-[10px] text-[#718096] text-center">
                  Simulates a colleague confirming their double opt-in email, accelerating your queue rank.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
