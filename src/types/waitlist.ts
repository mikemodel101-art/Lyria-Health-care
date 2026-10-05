export type TierId = 'core' | 'comprehensive' | 'longevity' | 'undecided';

export interface MembershipTier {
  id: TierId;
  name: string;
  tagline: string;
  frequency: string;
  indicativePrice: string;
  biomarkersCount: string;
  gpReviewTime: string;
  highlighted?: boolean;
  features: string[];
  idealFor: string;
}

export type WaitlistStatus = 'pending' | 'confirmed' | 'unsubscribed';

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  tierInterest: TierId;
  status: WaitlistStatus;
  consentGiven: boolean;
  consentWordingVersion: string;
  consentTimestamp: string;
  source: string;
  ipAddressMasked: string;
  confirmedAt?: string;
  unsubscribedAt?: string;
  deletedAt?: string;
  verificationToken: string;
  referralCode?: string;
  referralsCount?: number;
  referredBy?: string;
  queuePosition?: number;
}

export interface ConsentLogRecord {
  id: string;
  entryId: string;
  action: 'opt_in_submitted' | 'confirmation_sent' | 'double_opt_in_verified' | 'unsubscribed' | 'erasure_requested';
  emailMasked: string;
  timestamp: string;
  consentWordingVersion: string;
  source: string;
  legalBasis: string;
  notes: string;
}

export interface DnsRecordItem {
  type: 'TXT' | 'MX' | 'CNAME' | 'A';
  name: string;
  value: string;
  ttl: string;
  priority?: number;
  purpose: string;
  status: 'configured' | 'pending';
}

export interface BiomarkerGroup {
  name: string;
  description: string;
  sampleMarkers: string[];
  clinicalFocus: string;
}

export type FAQCategory = 'membership' | 'biomarkers' | 'gp_consultations';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  categoryLabel: string;
  question: string;
  answer: string;
}
