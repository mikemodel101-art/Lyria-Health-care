import React, { useState } from 'react';
import { useWaitlist } from '../context/WaitlistContext';
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openModal, openReferralModal, submitWaitlist } = useWaitlist();

  // Newsletter form state
  const [nlName, setNlName] = useState('');
  const [nlEmail, setNlEmail] = useState('');
  const [nlConsent, setNlConsent] = useState(false);
  const [nlHoneypot, setNlHoneypot] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!nlName.trim()) {
      setFeedback({ type: 'error', message: 'Please provide your name.' });
      return;
    }

    if (!nlEmail.trim()) {
      setFeedback({ type: 'error', message: 'Please provide your email address.' });
      return;
    }

    if (!nlConsent) {
      setFeedback({ type: 'error', message: 'Please accept the consent notice to receive health updates.' });
      return;
    }

    setIsSubmitting(true);

    const result = submitWaitlist({
      name: nlName,
      email: nlEmail,
      tierInterest: 'core',
      consent: nlConsent,
      honeypot: nlHoneypot,
      source: 'lyriahealth.co.uk#footer-health-intelligence',
    });

    setIsSubmitting(false);

    if (result.success) {
      setFeedback({
        type: 'success',
        message: 'Thank you for subscribing! Please confirm via the double opt-in email.',
      });
      setNlName('');
      setNlEmail('');
      setNlConsent(false);
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  return (
    <footer className="bg-[#FAF9F5] border-t border-[#E7E5DC] pt-16 pb-12 text-[#4A5568]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Health Intelligence Newsletter Signup Section */}
        <div className="mb-16 bg-white border border-[#E5E2D6] rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(10,37,29,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
                <Mail className="w-3.5 h-3.5 text-[#0A251D]" />
                <span>Health Intelligence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-custom text-[#0A251D] font-normal text-balance">
                Preventative clinical briefings, delivered once monthly.
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Concise clinical reviews on emerging biomarker science, longevity metrics, and preventative medicine. Zero health queries, double opt-in verified, and one-click unsubscribe anytime.
              </p>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleNewsletterSubmit} className="space-y-3.5">
                {/* Honeypot field for anti-bot spam protection */}
                <input
                  type="text"
                  name="hp_nl_website"
                  value={nlHoneypot}
                  onChange={(e) => setNlHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="nl-name" className="block text-[11px] font-medium text-[#475569] mb-1">
                      Full Name
                    </label>
                    <input
                      id="nl-name"
                      type="text"
                      required
                      value={nlName}
                      onChange={(e) => setNlName(e.target.value)}
                      placeholder="e.g. Dr Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#DCD8CC] rounded-lg text-sm text-[#0A251D] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A251D] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="nl-email" className="block text-[11px] font-medium text-[#475569] mb-1">
                      Email Address
                    </label>
                    <input
                      id="nl-email"
                      type="email"
                      required
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      placeholder="e.g. sarah.jenkins@example.co.uk"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#DCD8CC] rounded-lg text-sm text-[#0A251D] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A251D] transition-all"
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={nlConsent}
                    onChange={(e) => setNlConsent(e.target.checked)}
                    required
                    className="mt-0.5 rounded border-[#CBD5E1] text-[#0A251D] focus:ring-[#0A251D] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] text-[#526359] leading-tight">
                    I agree to receive the monthly Health Intelligence newsletter from Lyria Health under UK GDPR Art. 6(1)(a). I can withdraw consent at any time via the one-click unsubscribe portal.
                  </span>
                </label>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A251D] hover:bg-[#123B2F] text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow cursor-pointer disabled:opacity-50"
                  >
                    <span>Subscribe to Health Intelligence</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] text-[#64748B]">
                    Double opt-in verification required · No marketing tracking cookies
                  </span>
                </div>

                {/* Feedback Notification */}
                {feedback && (
                  <div
                    className={`p-3 rounded-lg flex items-center gap-2 text-xs transition-all ${
                      feedback.type === 'success'
                        ? 'bg-[#EBF7F2] text-[#0A4A32] border border-[#A7DEC7]'
                        : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
                    }`}
                  >
                    {feedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
                    )}
                    <span>{feedback.message}</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>

        {/* Main Footer Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7E4D8]">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-serif-custom tracking-tight text-[#0A251D] hover:text-[#061813] transition-colors"
            >
              Lyria Health
            </a>
            <p className="text-xs text-[#526359] leading-relaxed max-w-sm">
              A private UK preventative healthcare membership unifying routine blood biomarker testing with dedicated remote GMC GP consultations.
            </p>
            <div className="text-[11px] text-[#64748B] space-y-1">
              <p>Lyria Health Ltd · Registered in England & Wales</p>
              <p>Registered Office: 25 Harley Street, London, W1G 9QW</p>
              <p className="font-mono-custom text-[10px]">ICO Registration: ZB894212 · Domain: lyriahealth.co.uk</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="block text-xs font-semibold text-[#0A251D] uppercase tracking-wider">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-[#0A251D] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#biomarkers"
                  className="hover:text-[#0A251D] transition-colors"
                >
                  Biomarker Panels
                </a>
              </li>
              <li>
                <a
                  href="#perspectives"
                  className="hover:text-[#0A251D] transition-colors"
                >
                  Patient Perspectives
                </a>
              </li>
              <li>
                <a
                  href="#memberships"
                  className="hover:text-[#0A251D] transition-colors"
                >
                  Planned Memberships
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-[#0A251D] transition-colors"
                >
                  Frequently Answered Questions
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="hover:text-[#0A251D] font-medium transition-colors"
                >
                  Join Waiting List
                </a>
              </li>
            </ul>
          </div>

          {/* GDPR & Compliance Tools */}
          <div className="md:col-span-4 space-y-3">
            <span className="block text-xs font-semibold text-[#0A251D] uppercase tracking-wider">
              Privacy & Compliance
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openReferralModal()}
                  className="hover:text-[#0A251D] transition-colors text-left font-medium text-[#0A251D] cursor-pointer"
                >
                  Priority Referral Hub & Queue Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('privacy_policy')}
                  className="hover:text-[#0A251D] transition-colors text-left"
                >
                  UK GDPR & Privacy Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('unsubscribe')}
                  className="hover:text-[#0A251D] transition-colors text-left"
                >
                  One-Click Unsubscribe & Erasure Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('compliance_dashboard')}
                  className="hover:text-[#0A251D] transition-colors text-left"
                >
                  Live Consent Log & CSV Export
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('dns_records')}
                  className="hover:text-[#0A251D] transition-colors text-left"
                >
                  DNS & Email Security Configuration (SPF/DKIM/DMARC)
                </button>
              </li>
              <li>
                <a
                  href="mailto:dpo@lyriahealth.co.uk"
                  className="hover:text-[#0A251D] transition-colors"
                >
                  Contact Data Protection Officer (dpo@lyriahealth.co.uk)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#718096]">
          <p>© 2026 Lyria Health Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Awaiting UK Regulatory Registration</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tracking Cookies</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.2 AA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
