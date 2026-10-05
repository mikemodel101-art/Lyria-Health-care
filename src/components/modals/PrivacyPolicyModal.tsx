import React from 'react';
import { useWaitlist } from '../../context/WaitlistContext';
import { X, ShieldCheck, Lock } from 'lucide-react';
import { CURRENT_CONSENT_VERSION } from '../../data/mockData';

export const PrivacyPolicyModal: React.FC = () => {
  const { activeModal, closeModal } = useWaitlist();

  if (activeModal !== 'privacy_policy') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#0A251D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#5CE0B8]" />
            <div>
              <h2 className="text-base font-semibold leading-tight">
                UK GDPR & PECR Privacy Notice
              </h2>
              <span className="text-[11px] font-mono-custom text-[#A3C7B9]">
                Policy Version: {CURRENT_CONSENT_VERSION} · Effective October 2026
              </span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-md text-[#A3C7B9] hover:text-white hover:bg-[#154638] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#334155] leading-relaxed">
          
          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">1. Data Controller Information</h3>
            <p>
              The data controller responsible for your personal data on this waiting list is <strong>Lyria Health Ltd</strong>, a private company registered in England and Wales under Company No. 15893241, with its registered office at 25 Harley Street, London, W1G 9QW, United Kingdom.
            </p>
            <p>
              Information Commissioner's Office (ICO) Data Protection Registration Reference: <strong>ZB894212</strong>.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">2. Strictly Limited Data Collection (Zero Health Data)</h3>
            <p>
              This website functions solely as a pre-launch waiting list. We collect and process <strong>only</strong> the following personal data points:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Full Name:</strong> to personalize correspondence and maintain waiting list order.</li>
              <li><strong>Email Address:</strong> to transmit double opt-in confirmations and official launch updates.</li>
              <li><strong>Planned Membership Tier:</strong> an optional preference to assist our capacity planning.</li>
              <li><strong>Technical Metadata:</strong> masked IP and timestamp for audit verification of your explicit consent.</li>
            </ul>
            <p className="font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
              We do not ask for, collect, store, or process any medical history, symptoms, clinical results, or Special Category data under UK GDPR Article 9 on this waiting list.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">3. Lawful Basis for Processing</h3>
            <p>
              Our lawful basis for collecting your name and email and communicating with you regarding the waiting list is <strong>Consent under UK GDPR Article 6(1)(a)</strong> and Regulation 22 of the Privacy and Electronic Communications Regulations 2003 (PECR).
            </p>
            <p>
              Consent is established via affirmative action (unticked checkbox) and confirmed via our double opt-in verification link.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">4. Data Retention & Deletion</h3>
            <p>
              Your waiting list data is retained until either:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Our UK clinical services officially launch and your priority cohort invitation has been fulfilled; or</li>
              <li>You withdraw your consent via one-click unsubscribe; or</li>
              <li>You exercise your Right to Erasure (Article 17).</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">5. Your Legal Rights as a Data Subject</h3>
            <p>Under the UK General Data Protection Regulation and the Data Protection Act 2018, you possess the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Right of Access (Article 15):</strong> request a copy of the data we hold on you.</li>
              <li><strong>Right to Rectification (Article 16):</strong> request correction of inaccurate data.</li>
              <li><strong>Right to Erasure / "To Be Forgotten" (Article 17):</strong> request permanent deletion of your data at any time.</li>
              <li><strong>Right to Withdraw Consent (Article 7(3)):</strong> instant one-click unsubscribe included in every email.</li>
              <li><strong>Right to Lodge a Complaint:</strong> you have the right to contact the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="underline text-[#0A251D]">ico.org.uk</a>.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">6. Data Security & Sovereignty</h3>
            <p>
              All waiting list records are encrypted at rest using AES-256 and in transit using TLS 1.3. Data resides exclusively on secure servers located in London, United Kingdom. We do not sell, rent, or transfer your personal data to any marketing third parties.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#0A251D]">7. Data Protection Officer Contact</h3>
            <p>
              For any privacy or data rights inquiries: <br />
              Email: <a href="mailto:dpo@lyriahealth.co.uk" className="underline font-semibold text-[#0A251D]">dpo@lyriahealth.co.uk</a><br />
              Postal: Data Protection Officer, Lyria Health Ltd, 25 Harley Street, London, W1G 9QW
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3.5 border-t border-[#E8E5DA] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#64748B]">Last updated: October 2026</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-[#0A251D] text-white rounded-md text-xs font-medium hover:bg-[#133F33]"
          >
            Close Notice
          </button>
        </div>

      </div>
    </div>
  );
};
