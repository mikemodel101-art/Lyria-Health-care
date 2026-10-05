import React, { useState } from 'react';
import { useWaitlist } from '../../context/WaitlistContext';
import { X, CheckCircle, Mail, ExternalLink, ShieldCheck, Copy, Check } from 'lucide-react';

export const DoubleOptInModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    openModal,
    currentVerificationEntry,
    confirmVerification,
  } = useWaitlist();

  const [copied, setCopied] = useState(false);
  const [confirmedState, setConfirmedState] = useState(
    currentVerificationEntry?.status === 'confirmed'
  );

  if (activeModal !== 'double_opt_in' || !currentVerificationEntry) {
    return null;
  }

  const entry = currentVerificationEntry;
  const verificationLink = `https://lyriahealth.co.uk/confirm?token=${entry.verificationToken}`;

  const handleConfirm = () => {
    confirmVerification(entry.id);
    setConfirmedState(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Email Client Header bar */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#E8E5DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#0A251D]" />
            <span className="text-xs font-semibold text-[#0A251D]">
              Transactional Email Simulation (Double Opt-In Protocol)
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-md text-[#64748B] hover:text-[#0A251D] hover:bg-[#EFECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mail Metadata Header */}
        <div className="px-6 py-3.5 bg-[#FAF9F5]/50 border-b border-[#EFECE3] text-xs space-y-1 font-mono-custom text-[#475569]">
          <div className="flex">
            <span className="w-16 text-[#94A3B8]">From:</span>
            <span className="text-[#17211E] font-medium">Lyria Health &lt;verify@lyriahealth.co.uk&gt;</span>
          </div>
          <div className="flex">
            <span className="w-16 text-[#94A3B8]">To:</span>
            <span className="text-[#17211E] font-medium">{entry.name} &lt;{entry.email}&gt;</span>
          </div>
          <div className="flex">
            <span className="w-16 text-[#94A3B8]">Subject:</span>
            <span className="text-[#17211E] font-semibold">Action Required: Confirm your Lyria Health waiting list registration</span>
          </div>
        </div>

        {/* Email Body Preview */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#334155] text-sm">
          
          {confirmedState ? (
            <div className="space-y-6">
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif-custom font-semibold text-emerald-900">
                  Email Address Confirmed & Verified!
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{entry.name}</strong>. Your waiting list registration for the <strong>{entry.tierInterest.toUpperCase()}</strong> tier has been permanently logged in our UK GDPR audit registry.
                </p>
                <div className="pt-2 text-[11px] font-mono-custom text-emerald-700">
                  Queue Priority: <strong className="text-emerald-900">#{entry.queuePosition || 184}</strong> · Version: {entry.consentWordingVersion}
                </div>
              </div>

              {/* Referral Promotion Card */}
              <div className="p-5 bg-white border-2 border-[#0A251D] rounded-xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#0A251D] uppercase tracking-wider">
                      Move Up The Waiting List
                    </span>
                    <span className="text-[10px] font-mono-custom bg-[#0A251D] text-white px-2 py-0.5 rounded">
                      +15 Spots per Peer
                    </span>
                  </div>
                  <span className="text-xs font-mono-custom text-[#059669] font-bold">
                    Queue #{entry.queuePosition || 184}
                  </span>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">
                  Share your unique referral link with colleagues and family. For every person who verifies their spot, you jump forward 15 places toward Cohort 1 admission.
                </p>

                {/* Referral Link & Copy */}
                <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-lg border border-[#DCD8CC]">
                  <code className="text-[11px] font-mono-custom text-[#0A251D] truncate flex-1 select-all px-1">
                    {`https://lyriahealth.co.uk/?ref=${entry.referralCode || 'LYR-MEMBER-99'}`}
                  </code>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://lyriahealth.co.uk/?ref=${entry.referralCode || 'LYR-MEMBER-99'}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-[#0A251D] hover:bg-[#154638] text-white text-xs font-semibold rounded flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#5CE0B8]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    openModal('referral', entry);
                  }}
                  className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#EAE8DD] border border-[#DCD8CC] text-[#0A251D] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Full Referral Dashboard & Milestones</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              
              <div className="border-b border-[#EFECE3] pb-4">
                <span className="text-xl font-serif-custom text-[#0A251D]">Lyria Health</span>
              </div>

              <div className="space-y-3 text-sm text-[#334155] leading-relaxed">
                <p>Dear {entry.name},</p>
                <p>
                  Thank you for requesting priority access to the <strong>Lyria Health</strong> waiting list. In accordance with UK GDPR and PECR regulations, we require you to verify your email address to confirm your registration.
                </p>
                <p>
                  No health information has been collected. You will only receive official communications regarding waiting list priority and the launch of our UK remote GP consultations and blood biomarker testing.
                </p>
              </div>

              {/* Registration summary card */}
              <div className="p-4 bg-[#FAF9F5] border border-[#E7E4D8] rounded-xl text-xs space-y-1.5 font-mono-custom">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Subscriber:</span>
                  <span className="font-semibold text-[#17211E]">{entry.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Email:</span>
                  <span className="font-semibold text-[#17211E]">{entry.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Tier Preference:</span>
                  <span className="font-semibold text-[#0A251D] capitalize">{entry.tierInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Status:</span>
                  <span className="text-amber-700 font-semibold uppercase">Pending Verification</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="py-2 text-center">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0A251D] hover:bg-[#133F33] text-white text-xs font-semibold rounded-md transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <ShieldCheck className="w-4 h-4 text-[#5CE0B8]" />
                  <span>Confirm My Waiting List Registration</span>
                </button>
                <p className="text-[11px] text-[#94A3B8] mt-2">
                  Clicking this link completes the double opt-in protocol.
                </p>
              </div>

              {/* Raw link copy fallback */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-1">
                <span className="text-[11px] text-[#64748B]">Verification Token Link:</span>
                <div className="flex items-center gap-2">
                  <code className="text-[11px] text-[#334155] truncate flex-1 font-mono-custom">
                    {verificationLink}
                  </code>
                  <button
                    onClick={handleCopyLink}
                    className="p-1.5 text-xs text-[#0A251D] hover:bg-neutral-200 rounded flex items-center gap-1 shrink-0"
                    title="Copy token link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#E8E5DA] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#64748B]">
            Double Opt-In Protocol · UK GDPR Compliant
          </span>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-white border border-[#DCD8CC] rounded-md text-[#17211E] hover:bg-[#EAE8DD] transition-colors"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
