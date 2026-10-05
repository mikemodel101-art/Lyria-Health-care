import React, { useState } from 'react';
import { useWaitlist } from '../../context/WaitlistContext';
import {
  X,
  Share2,
  Copy,
  Check,
  Users,
  Award,
  ArrowUpRight,
  Sparkles,
  Gift,
  Search,
  MessageCircle,
  Twitter,
  Linkedin,
  Mail,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReferralModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    activeReferralEntry,
    openReferralModal,
    generateReferralCode,
    getReferralLink,
    simulateReferralSignup,
    lookupEntryByEmail,
    entries,
  } = useWaitlist();

  const [copied, setCopied] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [simulationFeedback, setSimulationFeedback] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  if (activeModal !== 'referral') {
    return null;
  }

  // Fallback to activeReferralEntry or first confirmed entry
  const entry = activeReferralEntry || entries.find((e) => e.status === 'confirmed') || entries[0];
  const refCode = entry ? generateReferralCode(entry) : 'LYR-HEALTH-DEMO';
  const referralLink = getReferralLink(refCode);
  const referralsCount = entry?.referralsCount || 0;
  const currentRank = entry?.queuePosition || 140;

  // Milestones
  const milestones = [
    { count: 1, title: 'Cohort 1 Priority Access', perk: 'Skip 15 spots into inaugural launch cohort', unlocked: referralsCount >= 1 },
    { count: 3, title: 'Complimentary Home Phlebotomy', perk: 'Free NHS-trained phlebotomist home visit (£75 value)', unlocked: referralsCount >= 3 },
    { count: 5, title: 'Advanced ApoB & Lipid Subpanel', perk: 'Free laboratory biomarker upgrade (£120 value)', unlocked: referralsCount >= 5 },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    if (!lookupEmail.trim()) return;

    const found = lookupEntryByEmail(lookupEmail);
    if (found) {
      openReferralModal(found);
      setLookupEmail('');
    } else {
      setLookupError('No waiting list registration found matching that email address.');
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationFeedback(null);

    const result = simulateReferralSignup(refCode);
    setIsSimulating(false);

    if (result.success) {
      setSimulationFeedback(result.message);
      setTimeout(() => setSimulationFeedback(null), 5000);
    }
  };

  const shareText = encodeURIComponent(
    `I just joined the priority waiting list for Lyria Health — preventative blood biomarker profiling paired with dedicated GMC GP video reviews. Join via my referral link to get priority cohort access:`
  );
  const encodedUrl = encodeURIComponent(referralLink);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-[#0A251D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#143B30] border border-[#235848] flex items-center justify-center text-[#5CE0B8]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight flex items-center gap-2">
                <span>Priority Referral Hub</span>
                <span className="text-[10px] font-mono-custom bg-[#1C4638] text-[#5CE0B8] px-2 py-0.5 rounded">
                  Cohort Advancement
                </span>
              </h2>
              <span className="text-[11px] font-mono-custom text-[#A3C7B9]">
                Move up 15 queue spots for every verified peer invitation
              </span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-md text-[#A3C7B9] hover:text-white hover:bg-[#154638] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#334155] text-sm">

          {/* Current Subscriber Queue Card */}
          {entry ? (
            <div className="bg-gradient-to-br from-[#FAF9F5] to-[#F3F0E6] border border-[#E4E0D2] rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E4D6]">
                <div>
                  <span className="text-xs text-[#64748B]">Subscriber Queue Profile</span>
                  <div className="text-base font-semibold text-[#0A251D]">{entry.name}</div>
                  <div className="text-[11px] text-[#64748B] font-mono-custom">{entry.email}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono-custom text-[#64748B] uppercase block">Current Rank</span>
                    <span className="text-2xl font-serif-custom font-bold text-[#0A251D] tabular-nums">
                      #{currentRank}
                    </span>
                  </div>
                  <div className="text-right pl-3 border-l border-[#DCD8CC]">
                    <span className="text-[10px] font-mono-custom text-[#059669] uppercase block">Invites</span>
                    <span className="text-2xl font-serif-custom font-bold text-[#059669] tabular-nums">
                      {referralsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Toward Next Tier */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#0A251D] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#059669]" />
                    {referralsCount >= 5 ? 'VIP Founding Cohort Unlocked' : referralsCount >= 3 ? 'Cohort 1 Phlebotomy Unlocked' : 'Priority Queue Advancement'}
                  </span>
                  <span className="font-mono-custom text-[11px] text-[#64748B]">
                    {referralsCount} / 5 Milestones
                  </span>
                </div>
                <div className="w-full bg-[#E5E2D6] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#0A251D] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (referralsCount / 5) * 100)}%` }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              Please enter your registered email below to look up your personal queue rank and referral link.
            </div>
          )}

          {/* Unique Referral Link Card */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="ref-link" className="text-xs font-semibold text-[#0A251D] uppercase tracking-wider">
                Your Personal Referral Link
              </label>
              <span className="text-[11px] font-mono-custom text-[#059669]">Code: {refCode}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-[#DCD8CC]">
              <input
                id="ref-link"
                type="text"
                readOnly
                value={referralLink}
                className="w-full bg-transparent px-2 text-xs font-mono-custom text-[#0A251D] focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#0A251D] hover:bg-[#133F33] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#5CE0B8]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-[#64748B] mr-1">Share via:</span>
              
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-[#1DA1F2]/10 text-[#0c7abf] hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-[#0077B5]/10 text-[#005582] hover:bg-[#0077B5]/20 border border-[#0077B5]/30 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:?subject=Priority%20Access%20to%20Lyria%20Health&body=${shareText}%0A%0A${encodedUrl}`}
                className="px-2.5 py-1.5 bg-[#FAF9F5] hover:bg-[#EAE8DD] border border-[#DCD8CC] text-[#334155] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Referral Milestones Grid */}
          <div className="space-y-3">
            <span className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Referral Rewards & Queue Perks
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {milestones.map((m) => (
                <div
                  key={m.count}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    m.unlocked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-[#FAF9F5] border-[#E7E4D8] text-[#475569]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-mono-custom text-xs font-bold ${
                        m.unlocked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E5E2D6] text-[#64748B]'
                      }`}
                    >
                      {m.count}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#17211E] flex items-center gap-1.5">
                        <span>{m.title}</span>
                        {m.unlocked && (
                          <span className="text-[10px] font-mono-custom text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748B]">{m.perk}</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono-custom font-semibold shrink-0 text-[#0A251D]">
                    {m.unlocked ? 'Active' : `${m.count - referralsCount} more needed`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Simulator Test Box */}
          <div className="p-4 bg-[#FAF9F5] border border-[#E2DFD3] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A251D]">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Test Referral Live Simulation</span>
              </div>
              <span className="text-[10px] font-mono-custom text-[#64748B]">Audited State Engine</span>
            </div>
            <p className="text-xs text-[#526359] leading-relaxed">
              Test what happens when a friend signs up and verifies using your referral code. Watch your queue position advance by 15 spots in real time.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="px-4 py-2 bg-[#0A251D] hover:bg-[#154638] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5CE0B8]" />
                <span>Simulate Friend Signup via Link</span>
              </button>
            </div>

            {simulationFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium"
              >
                {simulationFeedback}
              </motion.div>
            )}
          </div>

          {/* Lookup By Email Form */}
          <div className="pt-3 border-t border-[#EFECE3] space-y-2">
            <span className="block text-xs font-semibold text-[#64748B]">
              Looking for a different waiting list email?
            </span>
            <form onSubmit={handleLookup} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter registered email (e.g. e.vance@oxfordalumni.org.uk)"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF9F5] border border-[#DCD8CC] rounded-lg text-xs text-[#0A251D] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A251D]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-white border border-[#0A251D] text-[#0A251D] hover:bg-[#F2EFE6] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Look Up
              </button>
            </form>
            {lookupError && (
              <p className="text-[11px] text-red-600">{lookupError}</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3.5 border-t border-[#E8E5DA] flex items-center justify-between text-xs text-[#64748B]">
          <span className="text-[11px]">Fair-use queuing rules · Cryptographically verified referrals</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-[#0A251D] text-white rounded-md text-xs font-medium hover:bg-[#133F33] transition-colors cursor-pointer"
          >
            Close Hub
          </button>
        </div>

      </div>
    </div>
  );
};
