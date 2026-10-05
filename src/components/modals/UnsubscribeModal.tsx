import React, { useState } from 'react';
import { useWaitlist } from '../../context/WaitlistContext';
import { X, UserX, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const UnsubscribeModal: React.FC = () => {
  const { activeModal, closeModal, unsubscribeEmail, requestErasure } = useWaitlist();
  const [email, setEmail] = useState('');
  const [actionType, setActionType] = useState<'unsubscribe' | 'erase'>('unsubscribe');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (activeModal !== 'unsubscribe') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    if (actionType === 'unsubscribe') {
      const res = unsubscribeEmail(email);
      setMessage({ text: res.message, type: res.success ? 'success' : 'error' });
      if (res.success) setEmail('');
    } else {
      if (window.confirm('Are you sure you want to permanently delete all data under GDPR Article 17? This action cannot be undone.')) {
        const res = requestErasure(email);
        setMessage({ text: res.message, type: res.success ? 'success' : 'error' });
        if (res.success) setEmail('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#E8E5DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserX className="w-4 h-4 text-[#0A251D]" />
            <h2 className="text-sm font-semibold text-[#0A251D]">
              One-Click Unsubscribe & Right to Erasure
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-md text-[#64748B] hover:text-[#0A251D] hover:bg-[#EFECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-[#334155]">
          <p className="text-xs text-[#526359] leading-relaxed">
            Under UK GDPR & PECR, you maintain total control over your information. You may withdraw consent to stop emails, or exercise your Right to Erasure (Article 17) to purge your record completely.
          </p>

          {/* Action Choice Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF9F5] border border-[#E7E4D8] rounded-lg">
            <button
              type="button"
              onClick={() => {
                setActionType('unsubscribe');
                setMessage(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-colors ${
                actionType === 'unsubscribe'
                  ? 'bg-white text-[#0A251D] shadow-xs'
                  : 'text-[#64748B] hover:text-[#17211E]'
              }`}
            >
              1-Click Unsubscribe
            </button>
            <button
              type="button"
              onClick={() => {
                setActionType('erase');
                setMessage(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-colors ${
                actionType === 'erase'
                  ? 'bg-white text-red-700 shadow-xs'
                  : 'text-[#64748B] hover:text-red-700'
              }`}
            >
              Permanent Erasure (Art. 17)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="unsub-email" className="block text-xs font-semibold text-[#2D3E35] mb-1.5">
                Registered Email Address:
              </label>
              <input
                id="unsub-email"
                type="email"
                required
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#DCD8CC] rounded-md text-[#17211E] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A251D]"
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-md text-xs flex items-start gap-2 ${
                  message.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2.5 px-4 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                actionType === 'unsubscribe'
                  ? 'bg-[#0A251D] text-white hover:bg-[#133F33]'
                  : 'bg-red-700 text-white hover:bg-red-800'
              }`}
            >
              {actionType === 'unsubscribe' ? (
                <>
                  <UserX className="w-4 h-4" />
                  <span>Withdraw Consent & Unsubscribe</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Execute Permanent Data Erasure</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-[11px] text-[#718096] border-t border-[#EFECE3] space-y-1">
            <p>
              Withdrawal of consent takes effect immediately across all automated mail services.
            </p>
            <p>
              For urgent data protection queries: <a href="mailto:dpo@lyriahealth.co.uk" className="underline text-[#0A251D]">dpo@lyriahealth.co.uk</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3 border-t border-[#E8E5DA] text-right">
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-white border border-[#DCD8CC] rounded-md text-xs text-[#17211E] hover:bg-[#EAE8DD]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
