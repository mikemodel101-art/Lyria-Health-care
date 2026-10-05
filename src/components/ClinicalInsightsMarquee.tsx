import React from 'react';
import { Activity } from 'lucide-react';

const CLINICAL_FACTS = [
  'ApoB particle concentration offers superior predictive accuracy for atherogenic cardiovascular risk compared to standard LDL-C alone.',
  'Elevated fasting insulin and HbA1c reveal declining metabolic sensitivity up to a decade before diagnostic diabetes thresholds appear.',
  'Routine full thyroid panels (TSH, Free T3, Free T4, TPO Antibodies) uncover subclinical dysregulation frequently missed by basic screens.',
  'Tissue-level ferritin and active B12 saturation decline months prior to visible changes on a standard full blood count.',
  'High-sensitivity CRP (hs-CRP) provides a reliable barometer of persistent low-grade vascular inflammation before symptoms manifest.',
  'Early hepatic enzyme monitoring (ALT, AST, GGT) detects reversible metabolic stress at the earliest preventable stage.',
];

export const ClinicalInsightsMarquee: React.FC = () => {
  // Duplicate array to ensure seamless infinite looping
  const duplicatedFacts = [...CLINICAL_FACTS, ...CLINICAL_FACTS];

  return (
    <div
      className="bg-[#F3F0E6] border-b border-[#E6E2D4] py-2 relative overflow-hidden select-none"
      aria-label="Clinical insights ticker"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        
        {/* Fixed Title Label with Subtle Indicator */}
        <div className="shrink-0 flex items-center gap-2 pr-4 bg-[#F3F0E6] z-10 border-r border-[#DEDACD]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono-custom uppercase tracking-wider font-semibold text-[#0A251D] flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
            <Activity className="w-3 h-3 text-[#0A251D]" />
            <span className="hidden xs:inline">Clinical </span>Insights
          </span>
        </div>

        {/* Marquee Track Container with Vignette Gradient Edges */}
        <div className="relative flex-1 overflow-hidden ml-3">
          {/* Subtle Left & Right Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F3F0E6] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F3F0E6] to-transparent z-10 pointer-events-none" />

          {/* Continuous Loop Track */}
          <div
            className="animate-marquee whitespace-nowrap py-0.5 cursor-default"
            title="Hover to pause ticker"
          >
            {duplicatedFacts.map((fact, index) => (
              <div key={index} className="inline-flex items-center text-xs text-[#3D4F46] font-medium shrink-0">
                <span className="hover:text-[#0A251D] transition-colors">{fact}</span>
                <span aria-hidden="true" className="mx-6 text-[#94A3B8] font-serif">
                  ·
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
