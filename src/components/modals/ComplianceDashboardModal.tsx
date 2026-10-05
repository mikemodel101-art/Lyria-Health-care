import React, { useState } from 'react';
import { useWaitlist } from '../../context/WaitlistContext';
import { X, FileSpreadsheet, Shield, RefreshCw, CheckCircle2, Clock, UserX, Database, Search, ArrowUpDown } from 'lucide-react';
import { WaitlistEntry } from '../../types/waitlist';

export const ComplianceDashboardModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    entries,
    consentLogs,
    exportCsv,
    resetData,
    confirmVerification,
    openModal,
  } = useWaitlist();

  const [activeTab, setActiveTab] = useState<'entries' | 'logs'>('entries');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'unsubscribed'>('all');

  if (activeModal !== 'compliance_dashboard') {
    return null;
  }

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredLogs = consentLogs.filter((l) =>
    l.emailMasked.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.entryId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-5xl w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-[#0A251D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#5CE0B8]" />
            <div>
              <h2 className="text-base font-semibold leading-tight">
                UK GDPR Consent Log & Waiting List Registry
              </h2>
              <span className="text-[11px] font-mono-custom text-[#A3C7B9]">
                Lyria Health Ltd · Data Protection & Audit Portal
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

        {/* Action Controls & Tabs */}
        <div className="bg-[#FAF9F5] px-4 sm:px-6 py-3 border-b border-[#E7E4D8] flex flex-wrap items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('entries')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'entries'
                  ? 'bg-[#0A251D] text-white shadow-xs'
                  : 'bg-white border border-[#DCD8CC] text-[#334155] hover:bg-[#EAE8DD]'
              }`}
            >
              Subscribers ({entries.length})
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'logs'
                  ? 'bg-[#0A251D] text-white shadow-xs'
                  : 'bg-white border border-[#DCD8CC] text-[#334155] hover:bg-[#EAE8DD]'
              }`}
            >
              Consent Log ({consentLogs.length})
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="px-3 py-1.5 bg-white border border-[#0A251D] text-[#0A251D] hover:bg-[#F2EFE6] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset local demo entries to default initial state?')) {
                  resetData();
                }
              }}
              className="px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#EAE8DD] border border-[#DCD8CC] text-[#64748B] rounded-md text-xs flex items-center gap-1 transition-colors"
              title="Reset data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Filter Bar */}
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-[#EFECE3] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or token ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF9F5] border border-[#DCD8CC] rounded-md text-[#17211E] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0A251D]"
            />
          </div>

          {activeTab === 'entries' && (
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-[#64748B]">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-2.5 py-1 bg-[#FAF9F5] border border-[#DCD8CC] rounded-md text-[#17211E] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed Only</option>
                <option value="pending">Pending Double Opt-In</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          )}
        </div>

        {/* Responsive Table Scroll Hint for mobile & small screens */}
        <div className="px-4 sm:px-6 pt-2 sm:hidden text-[10px] text-[#64748B] flex items-center justify-between bg-[#FAF9F5] border-b border-[#EBE7DC]">
          <span>Tip: Swipe table horizontally to see all columns</span>
          <span className="font-mono-custom text-[#0A251D]">Scroll →</span>
        </div>

        {/* Tab 1: Entries Table */}
        <div className="flex-1 overflow-auto p-3 sm:p-6">
          {activeTab === 'entries' ? (
            <div className="border border-[#E5E2D6] rounded-xl overflow-x-auto shadow-xs">
              <table className="w-full min-w-[640px] text-left text-xs text-[#334155]">
                <thead className="bg-[#FAF9F5] border-b border-[#E5E2D6] font-mono-custom text-[11px] text-[#64748B] uppercase">
                  <tr>
                    <th className="py-3 px-4">Subscriber</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Double Opt-In Status</th>
                    <th className="py-3 px-4">Timestamp (UTC)</th>
                    <th className="py-3 px-4">Consent Ref</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE3] bg-white">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#17211E]">{entry.name}</div>
                        <div className="text-[11px] text-[#64748B] font-mono-custom">{entry.email}</div>
                      </td>
                      <td className="py-3 px-4 capitalize font-medium text-[#0A251D]">
                        {entry.tierInterest}
                      </td>
                      <td className="py-3 px-4">
                        {entry.status === 'confirmed' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                          </span>
                        ) : entry.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3" /> Pending Opt-In
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                            <UserX className="w-3 h-3" /> Unsubscribed
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono-custom text-[11px] text-[#64748B] whitespace-nowrap">
                        {new Date(entry.consentTimestamp).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4 font-mono-custom text-[11px] text-[#64748B] whitespace-nowrap">
                        {entry.consentWordingVersion}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        {entry.status === 'pending' && (
                          <button
                            onClick={() => confirmVerification(entry.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Verify Double Opt-In
                          </button>
                        )}
                        <button
                          onClick={() => openModal('referral', entry)}
                          className="px-2 py-1 bg-white border border-[#DCD8CC] text-[#059669] rounded text-[11px] font-medium hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                          title="View queue position and referral link"
                        >
                          Referral Hub
                        </button>
                        <button
                          onClick={() => openModal('double_opt_in', entry)}
                          className="px-2 py-1 bg-[#FAF9F5] border border-[#DCD8CC] text-[#0A251D] rounded text-[11px] font-medium hover:bg-[#EAE8DD] transition-colors cursor-pointer"
                        >
                          View Email
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-[#94A3B8]">
                        No waiting list entries match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* Tab 2: Immutable Consent Log */
            <div className="border border-[#E5E2D6] rounded-xl overflow-x-auto shadow-xs">
              <table className="w-full min-w-[720px] text-left text-xs text-[#334155]">
                <thead className="bg-[#FAF9F5] border-b border-[#E5E2D6] font-mono-custom text-[11px] text-[#64748B] uppercase">
                  <tr>
                    <th className="py-3 px-4">Timestamp (UTC)</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Masked Subject</th>
                    <th className="py-3 px-4">Legal Basis</th>
                    <th className="py-3 px-4">Wording Version</th>
                    <th className="py-3 px-4">Audit Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE3] bg-white font-mono-custom text-[11px]">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                      <td className="py-3 px-4 text-[#64748B] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#0A251D] whitespace-nowrap">
                        {log.action}
                      </td>
                      <td className="py-3 px-4 text-[#17211E] whitespace-nowrap">
                        {log.emailMasked}
                      </td>
                      <td className="py-3 px-4 text-[#475569] whitespace-nowrap">
                        {log.legalBasis}
                      </td>
                      <td className="py-3 px-4 text-[#059669] whitespace-nowrap">
                        {log.consentWordingVersion}
                      </td>
                      <td className="py-3 px-4 text-[#64748B] font-sans text-xs min-w-[220px]">
                        {log.notes}
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-[#94A3B8]">
                        No consent logs recorded matching search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3.5 border-t border-[#E8E5DA] flex items-center justify-between text-xs text-[#64748B]">
          <span>UK GDPR Article 30 Records of Processing Activities Compliant</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-[#0A251D] text-white rounded-md text-xs font-medium hover:bg-[#133F33] transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
