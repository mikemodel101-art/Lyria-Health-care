import React, { useState, useMemo } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { FAQCategory } from '../types/waitlist';
import {
  ChevronDown,
  Search,
  X,
  HelpCircle,
  CreditCard,
  Activity,
  UserCheck,
  Layers,
  Sparkles,
} from 'lucide-react';

type FilterCategory = 'all' | FAQCategory;

interface CategoryConfig {
  key: FilterCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'all',
    label: 'All Questions',
    icon: Layers,
    description: 'Comprehensive regulatory, laboratory, and clinical oversight FAQs.',
  },
  {
    key: 'membership',
    label: 'Membership',
    icon: CreditCard,
    description: 'Pricing tiers, priority queue rules, regulatory waiting list terms, and cancellations.',
  },
  {
    key: 'biomarkers',
    label: 'Biomarker Testing',
    icon: Activity,
    description: 'Venous draws, UKAS ISO 15189 pathology laboratories, cold-chain courier transit.',
  },
  {
    key: 'gp_consultations',
    label: 'GP Consultations',
    icon: UserCheck,
    description: 'Unhurried remote video calls, GMC-registered named doctors, and NHS GP coordination.',
  },
];

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggle = (id: string) => {
    setOpenQuestionId((prev) => (prev === id ? null : id));
  };

  // Category count badges
  const categoryCounts = useMemo(() => {
    return {
      all: FAQ_ITEMS.length,
      membership: FAQ_ITEMS.filter((i) => i.category === 'membership').length,
      biomarkers: FAQ_ITEMS.filter((i) => i.category === 'biomarkers').length,
      gp_consultations: FAQ_ITEMS.filter((i) => i.category === 'gp_consultations').length,
    };
  }, []);

  // Filtered by category + search query
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCategoryConfig = CATEGORIES.find((c) => c.key === selectedCategory) || CATEGORIES[0];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF9F5] border-b border-[#E7E5DC]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
            Frequently Answered Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-normal text-[#0A251D] text-balance">
            Regulatory, clinical, and data protection clarity.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Everything you need to know about our waiting list, upcoming launch, and patient rights.
          </p>
        </div>

        {/* Category Filter Navigation Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#EAE7DC]/60 border border-[#DCD8CC] rounded-2xl">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.key;
              const count = categoryCounts[cat.key];

              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    // auto-open first item in category if not searching
                    const firstInCat = FAQ_ITEMS.find(
                      (i) => cat.key === 'all' || i.category === cat.key
                    );
                    if (firstInCat && !searchQuery) {
                      setOpenQuestionId(firstInCat.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A251D] text-white shadow-sm'
                      : 'text-[#334155] hover:text-[#0A251D] hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#5CE0B8]' : 'text-[#4A5D54]'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono-custom px-1.5 py-0.2 rounded-full tabular-nums ${
                      isSelected
                        ? 'bg-[#154638] text-[#5CE0B8]'
                        : 'bg-[#DCD8CC] text-[#475569]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-[#64748B] mt-2.5">
            {activeCategoryConfig.description}
          </p>
        </div>

        {/* Local Search Input */}
        <div className="mb-8 space-y-3">
          <div className="relative">
            <label htmlFor="faq-search" className="sr-only">
              Search frequently asked questions
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
              <Search className="w-4 h-4 text-[#0A251D]" />
            </div>
            <input
              id="faq-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${activeCategoryConfig.label} (e.g. ApoB, NHS GP, tiers, privacy)...`}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#DCD8CC] rounded-xl text-sm text-[#0A251D] placeholder-[#94A3B8] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0A251D] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#0A251D] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
            <span>
              Category: <strong className="text-[#0A251D]">{activeCategoryConfig.label}</strong>
              {searchQuery && ` · Matching "${searchQuery}"`}
            </span>
            <span className="font-mono-custom">
              {filteredItems.length} {filteredItems.length === 1 ? 'question' : 'questions'}
            </span>
          </div>
        </div>

        {/* Accordion List */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3.5">
            {filteredItems.map((item) => {
              const isOpen = openQuestionId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E5E2D6] rounded-xl overflow-hidden transition-all shadow-xs hover:border-[#CBD5E1]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-[#FAF9F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A251D]"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono-custom font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                          item.category === 'membership'
                            ? 'bg-[#0A251D]/10 text-[#0A251D]'
                            : item.category === 'biomarkers'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {item.categoryLabel}
                        </span>
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#17211E] block">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0A251D] shrink-0 mt-1 sm:mt-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F2EFE8] space-y-2">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search & Category Filter State */
          <div className="bg-white border border-[#E5E2D6] rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FAF9F5] border border-[#E5E2D6] flex items-center justify-center mx-auto text-[#0A251D]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[#0A251D]">
                No matching questions found in {activeCategoryConfig.label}
              </h3>
              <p className="text-xs text-[#64748B] max-w-md mx-auto">
                {searchQuery
                  ? `We couldn't find any questions matching "${searchQuery}" under ${activeCategoryConfig.label}.`
                  : `No questions available for this filter.`}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3.5 py-1.5 bg-[#FAF9F5] border border-[#DCD8CC] rounded-lg text-xs font-semibold text-[#0A251D] hover:bg-[#EFECE3] transition-colors cursor-pointer"
                >
                  Clear search query
                </button>
              )}
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-3.5 py-1.5 bg-[#0A251D] text-white rounded-lg text-xs font-semibold hover:bg-[#133F33] transition-colors cursor-pointer"
                >
                  View in All Questions ({categoryCounts.all})
                </button>
              )}
            </div>
          </div>
        )}

        {/* Adjacency Regulatory Support Link */}
        <div className="mt-14 text-center space-y-3">
          <p className="text-xs text-[#64748B]">Have an inquiry regarding UK healthcare regulation or data rights?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <a
              href="mailto:regulatory@lyriahealth.co.uk"
              className="text-[#0A251D] underline underline-offset-2 hover:text-[#061813]"
            >
              regulatory@lyriahealth.co.uk
            </a>
            <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
            <a
              href="mailto:privacy@lyriahealth.co.uk"
              className="text-[#0A251D] underline underline-offset-2 hover:text-[#061813]"
            >
              privacy@lyriahealth.co.uk
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};


