import React from 'react';
import { ShieldCheck, Lock, FileSpreadsheet, MailCheck, UserX, Database, Server, CheckCircle2 } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';
import { CURRENT_CONSENT_VERSION } from '../data/mockData';

export const ComplianceSection: React.FC = () => {
  const { openModal, exportCsv, entries, consentLogs } = useWaitlist();

  const confirmedEntries = entries.filter((e) => e.status === 'confirmed').length;
  const pendingEntries = entries.filter((e) => e.status === 'pending').length;

  return (
    <section id="compliance" className="py-20 md:py-28 bg-[#FAF9F5] border-b border-[#E7E5DC]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
            UK Data Protection & Privacy Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-normal text-[#0A251D] text-balance">
            GDPR & PECR compliance built into every interaction from day one.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            We treat privacy with the same clinical discipline as medical pathology. Strictly zero health metrics on the waiting list, complete double opt-in verification, and full data subject sovereignty.
          </p>
        </div>

        {/* 4 Compliance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white border border-[#E7E4D8] rounded-xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#E5E2D6] flex items-center justify-center text-[#0A251D]">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#17211E]">Zero Health Data</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              We collect Name, Email, and Optional Tier of Interest only. No medical questionnaires, symptoms, or special-category data are solicited or held on this site.
            </p>
            <div className="text-[11px] font-mono-custom text-[#059669]">UK GDPR Article 9 Compliant</div>
          </div>

          <div className="bg-white border border-[#E7E4D8] rounded-xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#E5E2D6] flex items-center justify-center text-[#0A251D]">
              <MailCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#17211E]">Double Opt-In Protocol</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              Submissions remain in "Pending Verification" until the recipient clicks a cryptographically signed verification link, preventing malicious signups and email abuse.
            </p>
            <div className="text-[11px] font-mono-custom text-[#059669]">PECR Reg 22 Aligned</div>
          </div>

          <div className="bg-white border border-[#E7E4D8] rounded-xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#E5E2D6] flex items-center justify-center text-[#0A251D]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#17211E]">Immutable Consent Log</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              Every consent transaction logs an exact timestamp, policy version ({CURRENT_CONSENT_VERSION}), source route, and double opt-in completion state for audit readiness.
            </p>
            <div className="text-[11px] font-mono-custom text-[#059669]">ICO Audit Trace Ready</div>
          </div>

          <div className="bg-white border border-[#E7E4D8] rounded-xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#E5E2D6] flex items-center justify-center text-[#0A251D]">
              <UserX className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#17211E]">Right to Erasure</h3>
            <p className="text-xs text-[#526359] leading-relaxed">
              Subscribers can withdraw consent at any time in a single click, or trigger a self-service GDPR Article 17 "Forget Me" purge that wipes their records immediately.
            </p>
            <div className="text-[11px] font-mono-custom text-[#059669]">1-Click Unsubscribe</div>
          </div>

        </div>

        {/* Live Compliance & Admin Workbench */}
        <div className="bg-[#0A251D] text-white rounded-2xl p-7 sm:p-9 shadow-lg space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#184639] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono-custom text-[#5CE0B8]">
                <Server className="w-3.5 h-3.5" />
                <span>LYRIA HEALTH COMPLIANCE WORKBENCH · LYRIAHEALTH.CO.UK</span>
              </div>
              <h3 className="text-2xl font-serif-custom font-normal text-white">
                Live Waiting List & Privacy Audit Inspector
              </h3>
              <p className="text-xs text-[#A3C7B9] max-w-xl">
                Inspect live double opt-in statuses, review recorded consent log entries, verify DNS email security headers (SPF/DKIM/DMARC), or export real compliance CSVs.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-[#0D2F25] border border-[#194C3D] p-3 rounded-lg text-xs font-mono-custom">
              <div>
                <span className="text-[#84A999] block text-[10px]">CONFIRMED</span>
                <span className="text-lg font-bold text-white tabular-nums">{confirmedEntries}</span>
              </div>
              <div className="w-px h-8 bg-[#194C3D]" />
              <div>
                <span className="text-[#84A999] block text-[10px]">PENDING OPT-IN</span>
                <span className="text-lg font-bold text-[#EAB308] tabular-nums">{pendingEntries}</span>
              </div>
              <div className="w-px h-8 bg-[#194C3D]" />
              <div>
                <span className="text-[#84A999] block text-[10px]">CONSENT LOGS</span>
                <span className="text-lg font-bold text-[#5CE0B8] tabular-nums">{consentLogs.length}</span>
              </div>
            </div>
          </div>

          {/* Action Tools Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => openModal('compliance_dashboard')}
              className="p-4 bg-[#0F352A] hover:bg-[#154638] border border-[#1D5443] rounded-xl text-left transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Database className="w-4 h-4 text-[#5CE0B8]" />
                <span className="text-[10px] font-mono-custom text-[#A3C7B9]">AUDIT</span>
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-[#5CE0B8] transition-colors">
                View Consent Log
              </div>
              <p className="text-[11px] text-[#A3C7B9]">
                View timestamps, legal basis, and status records for each entry.
              </p>
            </button>

            <button
              onClick={() => openModal('double_opt_in')}
              className="p-4 bg-[#0F352A] hover:bg-[#154638] border border-[#1D5443] rounded-xl text-left transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <MailCheck className="w-4 h-4 text-[#5CE0B8]" />
                <span className="text-[10px] font-mono-custom text-[#A3C7B9]">SIMULATOR</span>
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-[#5CE0B8] transition-colors">
                Test Double Opt-In Email
              </div>
              <p className="text-[11px] text-[#A3C7B9]">
                Preview and interact with the transactional verification email.
              </p>
            </button>

            <button
              onClick={() => openModal('dns_records')}
              className="p-4 bg-[#0F352A] hover:bg-[#154638] border border-[#1D5443] rounded-xl text-left transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Server className="w-4 h-4 text-[#5CE0B8]" />
                <span className="text-[10px] font-mono-custom text-[#A3C7B9]">DNS / MAIL</span>
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-[#5CE0B8] transition-colors">
                DNS & Email Records
              </div>
              <p className="text-[11px] text-[#A3C7B9]">
                Check SPF, DKIM, DMARC, and MX records for lyriahealth.co.uk.
              </p>
            </button>

            <button
              onClick={exportCsv}
              className="p-4 bg-[#0F352A] hover:bg-[#154638] border border-[#1D5443] rounded-xl text-left transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <FileSpreadsheet className="w-4 h-4 text-[#5CE0B8]" />
                <span className="text-[10px] font-mono-custom text-[#A3C7B9]">CSV EXPORT</span>
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-[#5CE0B8] transition-colors">
                Download Audit CSV
              </div>
              <p className="text-[11px] text-[#A3C7B9]">
                Export all waiting list records and consent metadata for ICO compliance.
              </p>
            </button>

          </div>

          {/* Privacy-Friendly Cookieless Guarantee */}
          <div className="pt-4 border-t border-[#184639] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3C7B9] gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5CE0B8]" />
              <span>100% Cookieless Analytics: Zero personal identifiers, zero tracking pixels, WCAG 2.2 AA compliant.</span>
            </div>
            <button
              onClick={() => openModal('unsubscribe')}
              className="text-white hover:text-[#5CE0B8] underline underline-offset-2 transition-colors whitespace-nowrap"
            >
              One-Click Unsubscribe & Erasure Portal →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
