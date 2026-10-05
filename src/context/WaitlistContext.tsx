import React, { createContext, useContext, useState, useEffect } from 'react';
import { WaitlistEntry, ConsentLogRecord, TierId } from '../types/waitlist';
import { INITIAL_WAITLIST, INITIAL_CONSENT_LOGS, CURRENT_CONSENT_VERSION } from '../data/mockData';

interface WaitlistContextType {
  entries: WaitlistEntry[];
  consentLogs: ConsentLogRecord[];
  activeModal: 'none' | 'double_opt_in' | 'compliance_dashboard' | 'unsubscribe' | 'dns_records' | 'privacy_policy' | 'referral';
  currentVerificationEntry: WaitlistEntry | null;
  activeReferralEntry: WaitlistEntry | null;
  selectedTier: TierId;
  totalSubscribersCount: number;
  openModal: (modal: 'none' | 'double_opt_in' | 'compliance_dashboard' | 'unsubscribe' | 'dns_records' | 'privacy_policy' | 'referral', entry?: WaitlistEntry | null) => void;
  closeModal: () => void;
  setSelectedTier: (tier: TierId) => void;
  submitWaitlist: (data: { name: string; email: string; tierInterest: TierId; consent: boolean; honeypot?: string; source?: string; referralCode?: string }) => { success: boolean; message: string; entry?: WaitlistEntry };
  confirmVerification: (tokenOrId: string) => { success: boolean; message: string };
  unsubscribeEmail: (email: string) => { success: boolean; message: string };
  requestErasure: (email: string) => { success: boolean; message: string };
  exportCsv: () => void;
  resetData: () => void;
  generateReferralCode: (entry: WaitlistEntry) => string;
  getReferralLink: (referralCode: string) => string;
  openReferralModal: (entry?: WaitlistEntry | null) => void;
  simulateReferralSignup: (referralCode: string) => { success: boolean; message: string; newQueuePosition?: number; referralsCount?: number };
  lookupEntryByEmail: (email: string) => WaitlistEntry | undefined;
  incrementLiveCount: () => void;
}

const STORAGE_KEY_ENTRIES = 'lyria_waitlist_entries_v1';
const STORAGE_KEY_LOGS = 'lyria_consent_logs_v1';

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<WaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENTRIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_WAITLIST;
  });

  const [consentLogs, setConsentLogs] = useState<ConsentLogRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CONSENT_LOGS;
  });

  const [activeModal, setActiveModal] = useState<'none' | 'double_opt_in' | 'compliance_dashboard' | 'unsubscribe' | 'dns_records' | 'privacy_policy' | 'referral'>('none');
  const [currentVerificationEntry, setCurrentVerificationEntry] = useState<WaitlistEntry | null>(null);
  const [activeReferralEntry, setActiveReferralEntry] = useState<WaitlistEntry | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierId>('comprehensive');
  const [pendingReferralCode, setPendingReferralCode] = useState<string | null>(null);
  const [simulatedLiveIncrement, setSimulatedLiveIncrement] = useState(0);

  // Check URL params for ?ref=... on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        if (ref) {
          setPendingReferralCode(ref.trim().toUpperCase());
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(entries));
    } catch {
      // ignore quota
    }
  }, [entries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(consentLogs));
    } catch {
      // ignore
    }
  }, [consentLogs]);

  const generateReferralCode = (entry: WaitlistEntry): string => {
    if (entry.referralCode) return entry.referralCode;
    const namePart = entry.name
      .split(' ')
      .pop()
      ?.toUpperCase()
      .replace(/[^A-Z]/g, '') || 'MEMBER';
    const idPart = entry.id.replace('lyr_', '');
    return `LYR-${namePart}-${idPart}`;
  };

  const getReferralLink = (referralCode: string): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://lyriahealth.co.uk';
    return `${origin}/?ref=${referralCode}`;
  };

  const lookupEntryByEmail = (email: string): WaitlistEntry | undefined => {
    const clean = email.trim().toLowerCase();
    return entries.find((e) => e.email.toLowerCase() === clean);
  };

  const openModal = (modal: 'none' | 'double_opt_in' | 'compliance_dashboard' | 'unsubscribe' | 'dns_records' | 'privacy_policy' | 'referral', entry: WaitlistEntry | null = null) => {
    setActiveModal(modal);
    if (entry) {
      setCurrentVerificationEntry(entry);
      if (modal === 'referral') {
        setActiveReferralEntry(entry);
      }
    }
  };

  const openReferralModal = (entry: WaitlistEntry | null = null) => {
    if (entry) {
      setActiveReferralEntry(entry);
    } else if (currentVerificationEntry) {
      setActiveReferralEntry(currentVerificationEntry);
    } else {
      const firstConfirmed = entries.find((e) => e.status === 'confirmed');
      setActiveReferralEntry(firstConfirmed || entries[0] || null);
    }
    setActiveModal('referral');
  };

  const closeModal = () => {
    setActiveModal('none');
  };

  const submitWaitlist = (data: { name: string; email: string; tierInterest: TierId; consent: boolean; honeypot?: string; source?: string; referralCode?: string }) => {
    // 1. Anti-bot honeypot check
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return { success: false, message: 'Submission rejected by spam security filter.' };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();

    if (!cleanName) {
      return { success: false, message: 'Please provide your full name.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, message: 'Please enter a valid UK/international email address.' };
    }

    if (!data.consent) {
      return { success: false, message: 'You must review and accept the explicit consent notice.' };
    }

    // Check if already registered
    const existing = entries.find((e) => e.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.status === 'confirmed') {
        return {
          success: true,
          message: 'You are already confirmed on our waiting list. Thank you for your continued interest!',
          entry: existing,
        };
      }
      // If already pending, show their email verification modal
      setCurrentVerificationEntry(existing);
      setActiveModal('double_opt_in');
      return {
        success: true,
        message: 'Your registration was previously initiated. Please confirm via the verification email.',
        entry: existing,
      };
    }

    const now = new Date().toISOString();
    const newId = `lyr_${Math.floor(1000 + Math.random() * 9000)}`;
    const token = `tok_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
    const sourceString = data.source || 'lyriahealth.co.uk#hero';
    const effectiveReferralCode = data.referralCode || pendingReferralCode || undefined;

    const baseQueuePos = 180 + entries.length * 3;
    const newEntryCode = `LYR-${cleanName.split(' ').pop()?.toUpperCase().replace(/[^A-Z]/g, '') || 'MEMBER'}-${newId.replace('lyr_', '')}`;

    const newEntry: WaitlistEntry = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      tierInterest: data.tierInterest,
      status: 'pending',
      consentGiven: true,
      consentWordingVersion: CURRENT_CONSENT_VERSION,
      consentTimestamp: now,
      source: sourceString,
      ipAddressMasked: '82.165.xx.xx (London, UK)',
      verificationToken: token,
      referralCode: newEntryCode,
      referralsCount: 0,
      referredBy: effectiveReferralCode,
      queuePosition: baseQueuePos,
    };

    const maskedEmail = cleanEmail.replace(/^(.)(.*)(@.*)$/, (_, first, mid, dom) => `${first}***${dom}`);

    const newLogRecord: ConsentLogRecord = {
      id: `log_${Date.now()}`,
      entryId: newId,
      action: 'opt_in_submitted',
      emailMasked: maskedEmail,
      timestamp: now,
      consentWordingVersion: CURRENT_CONSENT_VERSION,
      source: sourceString,
      legalBasis: 'UK GDPR Article 6(1)(a) Explicit Consent',
      notes: effectiveReferralCode
        ? `Opt-in form submitted using referral code ${effectiveReferralCode}. Double opt-in verification link issued.`
        : 'Opt-in form submitted with explicit checkbox. Transactional verification link issued for double opt-in.',
    };

    setEntries((prev) => [newEntry, ...prev]);
    setConsentLogs((prev) => [newLogRecord, ...prev]);
    setCurrentVerificationEntry(newEntry);
    setActiveModal('double_opt_in');

    return {
      success: true,
      message: 'Initial step complete! Please check your email to complete double opt-in verification.',
      entry: newEntry,
    };
  };

  const confirmVerification = (tokenOrId: string) => {
    const entry = entries.find((e) => e.verificationToken === tokenOrId || e.id === tokenOrId);
    if (!entry) {
      return { success: false, message: 'Invalid or expired confirmation link.' };
    }

    if (entry.status === 'confirmed') {
      return { success: true, message: 'This email has already been verified and confirmed.' };
    }

    const now = new Date().toISOString();
    const maskedEmail = entry.email.replace(/^(.)(.*)(@.*)$/, (_, first, mid, dom) => `${first}***${dom}`);

    const updatedEntry: WaitlistEntry = {
      ...entry,
      status: 'confirmed',
      confirmedAt: now,
    };

    const confirmLog: ConsentLogRecord = {
      id: `log_${Date.now()}`,
      entryId: entry.id,
      action: 'double_opt_in_verified',
      emailMasked: maskedEmail,
      timestamp: now,
      consentWordingVersion: entry.consentWordingVersion,
      source: 'email_verification_link',
      legalBasis: 'UK GDPR Article 6(1)(a) & PECR Reg 22',
      notes: 'Double opt-in link clicked and cryptographically verified. Status changed to Confirmed.',
    };

    // If this entry was referred by someone, credit the referrer!
    let updatedEntries = entries.map((e) => (e.id === entry.id ? updatedEntry : e));

    if (entry.referredBy) {
      const referrer = updatedEntries.find(
        (e) => e.referralCode === entry.referredBy || e.id === entry.referredBy
      );
      if (referrer) {
        const newCount = (referrer.referralsCount || 0) + 1;
        const newPos = Math.max(1, (referrer.queuePosition || 100) - 15);
        updatedEntries = updatedEntries.map((e) =>
          e.id === referrer.id
            ? { ...e, referralsCount: newCount, queuePosition: newPos }
            : e
        );

        const referralLog: ConsentLogRecord = {
          id: `log_ref_${Date.now()}`,
          entryId: referrer.id,
          action: 'opt_in_submitted',
          emailMasked: referrer.email.replace(/^(.)(.*)(@.*)$/, (_, first, mid, dom) => `${first}***${dom}`),
          timestamp: now,
          consentWordingVersion: referrer.consentWordingVersion,
          source: 'referral_engine',
          legalBasis: 'UK GDPR Article 6(1)(f) Legitimate Interests',
          notes: `Referral verified for subscriber ${maskedEmail}. Referrer promoted by 15 spots to queue #${newPos}.`,
        };
        setConsentLogs((prev) => [referralLog, confirmLog, ...prev]);
      } else {
        setConsentLogs((prev) => [confirmLog, ...prev]);
      }
    } else {
      setConsentLogs((prev) => [confirmLog, ...prev]);
    }

    setEntries(updatedEntries);
    setCurrentVerificationEntry(updatedEntry);

    return {
      success: true,
      message: 'Thank you! Your spot on the Lyria Health waiting list is officially confirmed.',
    };
  };

  const simulateReferralSignup = (referralCode: string) => {
    const referrer = entries.find(
      (e) => e.referralCode?.toUpperCase() === referralCode.toUpperCase() || e.id === referralCode
    );

    if (!referrer) {
      return { success: false, message: 'Invalid or unknown referral code.' };
    }

    const demoFriends = [
      { name: 'Dr Marcus Ward', email: `m.ward_${Math.floor(100 + Math.random() * 900)}@bathhealth.co.uk` },
      { name: 'Sophie H. Tremblay', email: `sophie.tremblay_${Math.floor(100 + Math.random() * 900)}@cambridge.org.uk` },
      { name: 'Oliver Kensington', email: `oliver.k_${Math.floor(100 + Math.random() * 900)}@kensingtonmed.co.uk` },
      { name: 'Dr Fiona MacLeod', email: `f.macleod_${Math.floor(100 + Math.random() * 900)}@edinburghgp.co.uk` },
    ];
    const pickedFriend = demoFriends[Math.floor(Math.random() * demoFriends.length)];

    const now = new Date().toISOString();
    const newId = `lyr_${Math.floor(1000 + Math.random() * 9000)}`;
    const newCount = (referrer.referralsCount || 0) + 1;
    const newPosition = Math.max(1, (referrer.queuePosition || 100) - 15);

    const newSimulatedEntry: WaitlistEntry = {
      id: newId,
      name: pickedFriend.name,
      email: pickedFriend.email,
      tierInterest: 'comprehensive',
      status: 'confirmed',
      consentGiven: true,
      consentWordingVersion: CURRENT_CONSENT_VERSION,
      consentTimestamp: now,
      confirmedAt: now,
      source: `referral_invite#${referralCode}`,
      ipAddressMasked: '82.165.xx.xx (London, UK)',
      verificationToken: `tok_sim_${Date.now()}`,
      referralCode: `LYR-${pickedFriend.name.split(' ').pop()?.toUpperCase()}-${newId.replace('lyr_', '')}`,
      referralsCount: 0,
      referredBy: referralCode,
      queuePosition: (referrer.queuePosition || 100) + 40,
    };

    const updatedReferrer: WaitlistEntry = {
      ...referrer,
      referralsCount: newCount,
      queuePosition: newPosition,
    };

    const refAuditLog: ConsentLogRecord = {
      id: `log_ref_${Date.now()}`,
      entryId: referrer.id,
      action: 'double_opt_in_verified',
      emailMasked: referrer.email.replace(/^(.)(.*)(@.*)$/, (_, first, mid, dom) => `${first}***${dom}`),
      timestamp: now,
      consentWordingVersion: referrer.consentWordingVersion,
      source: 'referral_system',
      legalBasis: 'UK GDPR Article 6(1)(a) Verified Referral',
      notes: `Verified referral signup simulated for ${pickedFriend.name}. Queue position accelerated 15 spots to #${newPosition}.`,
    };

    setEntries((prev) => [newSimulatedEntry, ...prev.map((e) => (e.id === referrer.id ? updatedReferrer : e))]);
    setConsentLogs((prev) => [refAuditLog, ...prev]);
    setActiveReferralEntry(updatedReferrer);

    return {
      success: true,
      message: `Friend verified (${pickedFriend.name})! You moved up 15 spots to #${newPosition}!`,
      newQueuePosition: newPosition,
      referralsCount: newCount,
    };
  };

  const unsubscribeEmail = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const entry = entries.find((e) => e.email.toLowerCase() === cleanEmail);

    if (!entry) {
      return { success: false, message: 'No waiting list registration found matching that email.' };
    }

    if (entry.status === 'unsubscribed') {
      return { success: true, message: 'This email address is already unsubscribed from all communications.' };
    }

    const now = new Date().toISOString();
    const maskedEmail = cleanEmail.replace(/^(.)(.*)(@.*)$/, (_, first, mid, dom) => `${first}***${dom}`);

    const updated = {
      ...entry,
      status: 'unsubscribed' as const,
      unsubscribedAt: now,
    };

    const unsubLog: ConsentLogRecord = {
      id: `log_${Date.now()}`,
      entryId: entry.id,
      action: 'unsubscribed',
      emailMasked: maskedEmail,
      timestamp: now,
      consentWordingVersion: entry.consentWordingVersion,
      source: 'one_click_unsubscribe_portal',
      legalBasis: 'UK GDPR Article 7(3) Withdrawal of Consent',
      notes: 'User invoked one-click unsubscribe. Consent withdrawn. Future notifications suppressed.',
    };

    setEntries((prev) => prev.map((e) => (e.id === entry.id ? updated : e)));
    setConsentLogs((prev) => [unsubLog, ...prev]);

    return {
      success: true,
      message: 'You have been successfully unsubscribed. You will not receive any further emails.',
    };
  };

  const requestErasure = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const entryIndex = entries.findIndex((e) => e.email.toLowerCase() === cleanEmail);

    if (entryIndex === -1) {
      return { success: false, message: 'No record found matching that email address.' };
    }

    const target = entries[entryIndex];
    const now = new Date().toISOString();
    const maskedEmail = cleanEmail.replace(/^(.)(.*)(@.*)$/, (_, first, mid, dom) => `${first}***${dom}`);

    const erasureLog: ConsentLogRecord = {
      id: `log_${Date.now()}`,
      entryId: target.id,
      action: 'erasure_requested',
      emailMasked: maskedEmail,
      timestamp: now,
      consentWordingVersion: target.consentWordingVersion,
      source: 'gdpr_article_17_erasure_form',
      legalBasis: 'UK GDPR Article 17 Right to Erasure',
      notes: 'Personal data purged upon verified data subject erasure request.',
    };

    setEntries((prev) => prev.filter((_, idx) => idx !== entryIndex));
    setConsentLogs((prev) => [erasureLog, ...prev]);

    return {
      success: true,
      message: 'GDPR Article 17 Request Executed: All personal data associated with your email has been permanently deleted.',
    };
  };

  const exportCsv = () => {
    const headers = [
      'Entry ID',
      'Full Name',
      'Email Address',
      'Tier Preference',
      'Status',
      'Consent Version',
      'Consent Timestamp',
      'Confirmed Timestamp',
      'Source',
      'IP Masked',
    ];

    const rows = entries.map((e) => [
      `"${e.id}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.tierInterest}"`,
      `"${e.status}"`,
      `"${e.consentWordingVersion}"`,
      `"${e.consentTimestamp}"`,
      `"${e.confirmedAt || 'N/A'}"`,
      `"${e.source}"`,
      `"${e.ipAddressMasked}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `lyria_health_waiting_list_audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    setEntries(INITIAL_WAITLIST);
    setConsentLogs(INITIAL_CONSENT_LOGS);
    localStorage.removeItem(STORAGE_KEY_ENTRIES);
    localStorage.removeItem(STORAGE_KEY_LOGS);
  };

  const incrementLiveCount = () => {
    setSimulatedLiveIncrement((prev) => prev + 1);
  };

  const confirmedCount = entries.filter((e) => e.status === 'confirmed').length;
  // Dynamic count showing a realistic waitlist total (base 1,842 + confirmed + live updates)
  const totalSubscribersCount = 1842 + confirmedCount + simulatedLiveIncrement;

  return (
    <WaitlistContext.Provider
      value={{
        entries,
        consentLogs,
        activeModal,
        currentVerificationEntry,
        activeReferralEntry,
        selectedTier,
        totalSubscribersCount,
        openModal,
        closeModal,
        setSelectedTier,
        submitWaitlist,
        confirmVerification,
        unsubscribeEmail,
        requestErasure,
        exportCsv,
        resetData,
        generateReferralCode,
        getReferralLink,
        openReferralModal,
        simulateReferralSignup,
        lookupEntryByEmail,
        incrementLiveCount,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};
