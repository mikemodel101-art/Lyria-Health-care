import React, { useState } from 'react';
import { Menu, X, Shield, Share2 } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';

export const Navbar: React.FC = () => {
  const { openModal, openReferralModal } = useWaitlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E5DC] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl font-serif-custom tracking-tight text-[#0A251D] hover:text-[#061813] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A251D] rounded"
        >
          Lyria Health
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A5568]">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#0A251D] transition-colors cursor-pointer py-1"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('biomarkers')}
            className="hover:text-[#0A251D] transition-colors cursor-pointer py-1"
          >
            Biomarkers
          </button>
          <button
            onClick={() => scrollToSection('memberships')}
            className="hover:text-[#0A251D] transition-colors cursor-pointer py-1"
          >
            Memberships
          </button>
          <button
            onClick={() => scrollToSection('referral-progress')}
            className="hover:text-[#0A251D] transition-colors cursor-pointer py-1"
          >
            Priority Queue
          </button>
          <button
            onClick={() => scrollToSection('compliance')}
            className="hover:text-[#0A251D] transition-colors cursor-pointer py-1"
          >
            GDPR & Privacy
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#0A251D] transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={() => openReferralModal()}
            className="px-3 py-1.5 text-xs font-semibold text-[#0A251D] bg-white border border-[#DCD8CC] hover:bg-[#FAF9F5] rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Check queue rank, copy referral link, and view rewards"
          >
            <Share2 className="w-3.5 h-3.5 text-[#059669]" />
            <span>Referrals & Queue</span>
          </button>
          <button
            onClick={() => openModal('compliance_dashboard')}
            className="px-3 py-1.5 text-xs font-medium text-[#0A251D] bg-[#EAE8DD] hover:bg-[#E0DDD0] rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            title="Inspect double opt-in log, consent records, and CSV export"
          >
            <Shield className="w-3.5 h-3.5 text-[#0A251D]" />
            Consent Log
          </button>
          <button
            onClick={() => scrollToSection('waitlist')}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0A251D] hover:bg-[#123B2F] active:bg-[#071D17] rounded-md transition-all shadow-sm hover:shadow whitespace-nowrap cursor-pointer"
          >
            Join Waiting List
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={() => openReferralModal()}
            aria-label="Open Referral Hub"
            className="p-2 text-[#0A251D] bg-white border border-[#DCD8CC] rounded-md text-xs font-medium cursor-pointer"
            title="Referrals & Queue"
          >
            <Share2 className="w-4 h-4 text-[#059669]" />
          </button>
          <button
            onClick={() => openModal('compliance_dashboard')}
            aria-label="Open Compliance Dashboard"
            className="p-2 text-[#0A251D] bg-[#EAE8DD] rounded-md text-xs font-medium cursor-pointer"
          >
            <Shield className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-[#0A251D] hover:bg-[#EFECE3] rounded-md transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#E7E5DC] px-6 py-5 shadow-lg space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#334155]">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('biomarkers')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              Biomarkers
            </button>
            <button
              onClick={() => scrollToSection('perspectives')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              Patient Perspectives
            </button>
            <button
              onClick={() => scrollToSection('memberships')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              Memberships
            </button>
            <button
              onClick={() => scrollToSection('referral-progress')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              Priority Queue & Referrals
            </button>
            <button
              onClick={() => scrollToSection('compliance')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              GDPR & Privacy
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-1 hover:text-[#0A251D]"
            >
              FAQ
            </button>
          </div>
          <div className="pt-3 border-t border-[#E7E5DC] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('waitlist');
              }}
              className="w-full py-3 text-center text-sm font-medium text-white bg-[#0A251D] rounded-md"
            >
              Join Waiting List
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openReferralModal();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#0A251D] bg-white border border-[#DCD8CC] rounded-md flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-[#059669]" />
              Priority Referral Hub & Queue Status
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('compliance_dashboard');
              }}
              className="w-full py-2.5 text-center text-xs font-medium text-[#0A251D] bg-[#EAE8DD] rounded-md flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              Consent Audit Log & CSV Export
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
