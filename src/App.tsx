/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WaitlistProvider } from './context/WaitlistContext';
import { RegulatoryBanner } from './components/RegulatoryBanner';
import { Navbar } from './components/Navbar';
import { ClinicalInsightsMarquee } from './components/ClinicalInsightsMarquee';
import { Hero } from './components/Hero';
import { RealtimeWaitlistCounter } from './components/RealtimeWaitlistCounter';
import { HowItWorks } from './components/HowItWorks';
import { BiomarkerPanels } from './components/BiomarkerPanels';
import { PatientPerspective } from './components/PatientPerspective';
import { MembershipTiers } from './components/MembershipTiers';
import { ReferralProgressDashboard } from './components/ReferralProgressDashboard';
import { ComplianceSection } from './components/ComplianceSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ScrollSection } from './components/common/ScrollSection';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { DoubleOptInModal } from './components/modals/DoubleOptInModal';
import { ComplianceDashboardModal } from './components/modals/ComplianceDashboardModal';
import { UnsubscribeModal } from './components/modals/UnsubscribeModal';
import { DnsRecordsModal } from './components/modals/DnsRecordsModal';
import { PrivacyPolicyModal } from './components/modals/PrivacyPolicyModal';
import { ReferralModal } from './components/modals/ReferralModal';

export default function App() {
  return (
    <WaitlistProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E293B] antialiased selection:bg-[#0A251D] selection:text-white">
        {/* Subtle, slim scroll progress bar */}
        <ScrollProgressBar />

        {/* Top Regulatory Notice Banner */}
        <RegulatoryBanner />

        {/* 3-Zone Top Navigation Bar */}
        <Navbar />

        {/* Subtle Slow-Moving Clinical Insights Marquee */}
        <ClinicalInsightsMarquee />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          {/* Hero Section with Waiting List capture */}
          <ScrollSection delay={0.05}>
            <Hero />
          </ScrollSection>

          {/* Real-time Waitlist Counter & Social Proof */}
          <ScrollSection delay={0.08}>
            <RealtimeWaitlistCounter />
          </ScrollSection>

          {/* Clinical Journey & Methodology */}
          <ScrollSection delay={0.1}>
            <HowItWorks />
          </ScrollSection>

          {/* Biomarker Diagnostic Panels */}
          <ScrollSection delay={0.1}>
            <BiomarkerPanels />
          </ScrollSection>

          {/* Patient Perspectives & Advocacy */}
          <ScrollSection delay={0.1}>
            <PatientPerspective />
          </ScrollSection>

          {/* Planned Membership Tiers */}
          <ScrollSection delay={0.1}>
            <MembershipTiers />
          </ScrollSection>

          {/* My Referral Progress & Queue Standing Dashboard */}
          <ScrollSection delay={0.1}>
            <ReferralProgressDashboard />
          </ScrollSection>

          {/* GDPR, PECR, Double Opt-In, and Consent Engine */}
          <ScrollSection delay={0.1}>
            <ComplianceSection />
          </ScrollSection>

          {/* Frequently Answered Questions */}
          <ScrollSection delay={0.1}>
            <FAQSection />
          </ScrollSection>
        </main>

        {/* Quiet Footer */}
        <ScrollSection delay={0.05}>
          <Footer />
        </ScrollSection>

        {/* Interactive Compliance, Simulation & Data Subject Modals */}
        <DoubleOptInModal />
        <ComplianceDashboardModal />
        <UnsubscribeModal />
        <DnsRecordsModal />
        <PrivacyPolicyModal />
        <ReferralModal />
      </div>
    </WaitlistProvider>
  );
}
