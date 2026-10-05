import React, { useState } from 'react';
import { useWaitlist } from '../../context/WaitlistContext';
import { DNS_RECORDS } from '../../data/mockData';
import { X, Server, Copy, Check, ShieldCheck } from 'lucide-react';

export const DnsRecordsModal: React.FC = () => {
  const { activeModal, closeModal } = useWaitlist();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (activeModal !== 'dns_records') {
    return null;
  }

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#0A251D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-[#5CE0B8]" />
            <div>
              <h2 className="text-base font-semibold leading-tight">
                DNS & Email Deliverability Configuration
              </h2>
              <span className="text-[11px] font-mono-custom text-[#A3C7B9]">
                lyriahealth.co.uk · SPF, DKIM, DMARC, MX
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
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#334155]">
          <div className="p-4 bg-[#FAF9F5] border border-[#E7E4D8] rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0A251D] shrink-0 mt-0.5" />
            <div className="text-xs text-[#475569] leading-relaxed space-y-1">
              <strong className="text-[#17211E] block">Why DNS Authentication Matters:</strong>
              Proper configuration of SPF, DKIM, and DMARC prevents phishing and spoofing of the <code>lyriahealth.co.uk</code> domain, ensuring double opt-in verification emails bypass spam folders and achieve 99.8%+ inbox placement.
            </div>
          </div>

          {/* Records List */}
          <div className="space-y-4">
            {DNS_RECORDS.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2DFD3] rounded-xl p-4 space-y-2.5 hover:border-[#CBD5E1] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FAF9F5] border border-[#DCD8CC] rounded text-[11px] font-mono-custom font-semibold text-[#0A251D]">
                      {rec.type}
                    </span>
                    <span className="font-mono-custom text-xs font-semibold text-[#17211E]">
                      {rec.name}
                    </span>
                    {rec.priority && (
                      <span className="text-[10px] text-[#64748B]">
                        Priority: {rec.priority}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono-custom text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    TTL: {rec.ttl}s
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EFECE3]">
                  <code className="text-xs font-mono-custom text-[#334155] flex-1 break-all leading-relaxed">
                    {rec.value}
                  </code>
                  <button
                    onClick={() => handleCopy(rec.value, `${rec.type}_${idx}`)}
                    className="p-1.5 px-2 bg-white border border-[#DCD8CC] rounded text-xs text-[#0A251D] hover:bg-[#EAE8DD] flex items-center justify-center gap-1 shrink-0 self-end sm:self-auto transition-colors cursor-pointer"
                    title="Copy record value"
                  >
                    {copiedKey === `${rec.type}_${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="text-[11px]">
                      {copiedKey === `${rec.type}_${idx}` ? 'Copied' : 'Copy'}
                    </span>
                  </button>
                </div>

                <p className="text-[11px] text-[#64748B] leading-normal">
                  {rec.purpose}
                </p>
              </div>
            ))}
          </div>

          {/* Hosting & Nameserver Guidance */}
          <div className="p-4 bg-[#EDEAE0] border border-[#DDD9CD] rounded-xl text-xs space-y-1.5 text-[#334155]">
            <span className="font-semibold text-[#0A251D] block">Hostmaster Instructions for lyriahealth.co.uk:</span>
            <p className="text-[11px] text-[#526359] leading-relaxed">
              Add the above resource records to your authoritative nameserver (e.g. Cloudflare, AWS Route 53, or Nominet registrar). Once propagated (typically 15–30 minutes), verification emails will be signed with 2048-bit RSA keys matching Google Workspace and SendGrid delivery agents.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3.5 border-t border-[#E8E5DA] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#64748B]">RFC 7208 (SPF) · RFC 6376 (DKIM) · RFC 7489 (DMARC)</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-[#0A251D] text-white rounded-md text-xs font-medium hover:bg-[#133F33]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
