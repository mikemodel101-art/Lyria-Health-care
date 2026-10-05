import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Activity, UserCheck, TrendingUp, Calendar, Clock, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWaitlist } from '../context/WaitlistContext';

interface OnboardingStage {
  id: string;
  stepNumber: string;
  dayBadge: string;
  title: string;
  summary: string;
  details: {
    clinicalAction: string;
    patientRequirement: string;
    deliverable: string;
    complianceNote: string;
  };
  keyStats: string;
}

const ONBOARDING_STAGES: OnboardingStage[] = [
  {
    id: 'stage-1',
    stepNumber: '01',
    dayBadge: 'Day 1',
    title: 'Digital Anamnesis & Named GP Matching',
    summary: 'Complete a structured medical intake and get matched with a consistent, named UK-licenced General Practitioner.',
    details: {
      clinicalAction: 'Clinical review of baseline medical history, familial conditions, and medication profile.',
      patientRequirement: '10-minute digital health history questionnaire via encrypted portal.',
      deliverable: 'Assigned named GMC GP & automated Royal Mail Tracked 24 collection kit dispatch.',
      complianceNote: 'Stored under UK GDPR Special Category Health Data regulations.',
    },
    keyStats: '100% Named GP Continuity',
  },
  {
    id: 'stage-2',
    stepNumber: '02',
    dayBadge: 'Days 2–4',
    title: 'Certified Venous Sample Collection',
    summary: 'Experience a painless, standardized venous blood draw via home phlebotomist visit or partner clinic.',
    details: {
      clinicalAction: 'Venous blood collection into cold-chain stabilized vacuum tubes (EDTA, Serum Gel, Fluoride).',
      patientRequirement: 'Overnight 10-hour fast for accurate lipid and glycaemic readings.',
      deliverable: 'Immediate temperature-monitored courier transit to central London pathology facility.',
      complianceNote: 'Strict cold-chain transit preserving cell integrity and preventing haemolysis.',
    },
    keyStats: 'Venous draw over finger-prick capillary error',
  },
  {
    id: 'stage-3',
    stepNumber: '03',
    dayBadge: 'Days 4–6',
    title: 'UKAS ISO 15189 Pathology Testing',
    summary: 'Automated immunoassay profiling across up to 92+ markers in accredited clinical pathology laboratories.',
    details: {
      clinicalAction: 'Full automated Roche/Abbott electrochemiluminescence assays with dual pathologist sign-off.',
      patientRequirement: 'No patient action required; automated SMS alerts as panels complete.',
      deliverable: 'Quantitative serum concentration data calibrated against age/sex reference intervals.',
      complianceNote: 'UKAS Accreditation to ISO 15189 Medical Laboratories Standard.',
    },
    keyStats: '48-hour analytical turnaround',
  },
  {
    id: 'stage-4',
    stepNumber: '04',
    dayBadge: 'Days 6–7',
    title: 'Longitudinal Synthesis & Clinician Prep',
    summary: 'Biomarkers are synthesized into multi-pillar trajectories while your GP prepares tailored clinical notes.',
    details: {
      clinicalAction: 'Your assigned GP reviews your raw biomarkers against your medical anamnesis before your appointment.',
      patientRequirement: 'Review digital preview report in your secure portal.',
      deliverable: 'Personalized clinical dossier highlighting cardiovascular, metabolic, and hormonal trends.',
      complianceNote: 'Unhurried prep: Doctors review results prior to entering the consultation call.',
    },
    keyStats: 'Pre-consultation clinical case analysis',
  },
  {
    id: 'stage-5',
    stepNumber: '05',
    dayBadge: 'Days 7–10',
    title: '30-Minute Named GP Video Consultation',
    summary: 'Meet your dedicated doctor for an unhurried, plain-English explanation of your health markers and proactive roadmap.',
    details: {
      clinicalAction: 'Comprehensive video consultation reviewing every marker, answering questions without time pressure.',
      patientRequirement: 'Attend 30-minute encrypted video call via desktop or smartphone.',
      deliverable: 'Actionable Preventative Roadmap, private prescriptions if indicated, and optional NHS GP summary letter.',
      complianceNote: 'GMC Good Medical Practice & Caldicott Guardian clinical oversight.',
    },
    keyStats: '30-minute unhurried consultation',
  },
];

export const HowItWorks: React.FC = () => {
  const { openModal } = useWaitlist();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = ONBOARDING_STAGES[activeStageIndex];

  const steps = [
    {
      step: '01',
      title: 'Precision Blood Sample Collection',
      description:
        'Choose between a certified home phlebotomy kit, a home visit from an NHS-trained phlebotomist, or an appointment at our verified UK clinic partners.',
      highlights: 'Painless venous draw · Cold-chain transit packaging',
      icon: Activity,
    },
    {
      step: '02',
      title: 'UKAS-Accredited Laboratory Profiling',
      description:
        'Your blood sample is processed in UKAS-accredited medical pathology laboratories adhering to ISO 15189 clinical standards. Results are finalized within 48 hours.',
      highlights: 'High-precision automated immunoassays · Internal QA audits',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Unhurried Remote GMC GP Consultation',
      description:
        'Meet your dedicated UK General Practitioner via encrypted video call. Review your biomarker panel in depth with clear, jargon-free clinical explanations.',
      highlights: '20 to 45-minute consultations · Consistent named doctor',
      icon: UserCheck,
    },
    {
      step: '04',
      title: 'Longitudinal Preventative Roadmap',
      description:
        'Receive an actionable preventative health plan. Track biological trends across quarters, establishing baseline stability and identifying early health shifts.',
      highlights: 'Longitudinal trend graphs · NHS summary report integration',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F4F2E9]/60 border-y border-[#E6E3D6]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
            Clinical Protocol & Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-normal text-[#0A251D] text-balance">
            A preventative healthcare loop built on clinical precision and unhurried time.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Traditional healthcare is designed for reactive crisis management. Lyria Health introduces a continuous diagnostic model that identifies physiological shifts years in advance.
          </p>
        </div>

        {/* Vertical Interactive Onboarding Timeline Banner */}
        <div className="mb-20 bg-white border border-[#E5E2D6] rounded-2xl p-4 sm:p-7 md:p-10 shadow-[0_4px_24px_rgba(10,37,29,0.03)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-[#EFECE3]">
            <div className="space-y-2">
              <span className="text-xs font-mono-custom uppercase tracking-wider text-[#059669] font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Interactive Patient Onboarding Timeline
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-custom text-[#0A251D] font-normal">
                From initial registration to your first GP consultation.
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-xl">
                Explore the five key clinical milestones of your onboarding journey. Click any step to inspect clinical protocols, lab workflows, and patient deliverables.
              </p>
            </div>

            {/* Quick Step Indicators */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeStageIndex === 0}
                className="px-3 py-1.5 rounded-lg border border-[#DCD8CC] text-xs font-medium text-[#0A251D] hover:bg-[#FAF9F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous Stage
              </button>
              <button
                onClick={() => setActiveStageIndex((prev) => Math.min(ONBOARDING_STAGES.length - 1, prev + 1))}
                disabled={activeStageIndex === ONBOARDING_STAGES.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#0A251D] text-white text-xs font-medium hover:bg-[#123B2F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next Stage
              </button>
            </div>
          </div>

          {/* Interactive Timeline Body: Left Spine + Right Deep Dive Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 sm:pt-8">
            
            {/* Left Vertical Spine with Interactive Nodes */}
            <div className="lg:col-span-5 relative pl-6 space-y-6 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E5E2D6]">
              {ONBOARDING_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                const isPast = activeStageIndex > idx;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`w-full text-left relative pl-6 py-2.5 transition-all cursor-pointer rounded-xl group ${
                      isActive
                        ? 'bg-[#FAF9F5] shadow-xs'
                        : 'hover:bg-[#FAF9F5]/70'
                    }`}
                  >
                    {/* Node on the Spine */}
                    <div
                      className={`absolute -left-[19px] top-4 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'border-[#0A251D] bg-[#0A251D] ring-4 ring-[#0A251D]/15'
                          : isPast
                          ? 'border-[#059669] bg-[#059669]'
                          : 'border-[#CBD5E1] bg-white group-hover:border-[#0A251D]'
                      }`}
                    >
                      {isPast && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>

                    {/* Stage Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] font-mono-custom font-semibold px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#0A251D] text-white' : 'bg-[#EAE7DC] text-[#4A5D54]'
                      }`}>
                        {stage.dayBadge}
                      </span>
                      <span className="text-xs font-mono-custom text-[#64748B]">
                        Stage {stage.stepNumber}
                      </span>
                    </div>

                    <div className={`text-sm font-semibold transition-colors ${
                      isActive ? 'text-[#0A251D]' : 'text-[#334155] group-hover:text-[#0A251D]'
                    }`}>
                      {stage.title}
                    </div>

                    <div className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                      {stage.summary}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Stage Showcase */}
            <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#E7E4D8] rounded-xl p-4 sm:p-6 md:p-8 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Top Stage Overview */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#EBE7DC]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono-custom font-semibold text-[#059669]">
                          Stage {activeStage.stepNumber} of 05
                        </span>
                        <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                        <span className="text-xs font-medium text-[#4A5D54]">
                          {activeStage.dayBadge}
                        </span>
                      </div>
                      <h4 className="text-xl font-serif-custom text-[#0A251D] font-normal">
                        {activeStage.title}
                      </h4>
                    </div>

                    <div className="px-3 py-1.5 bg-white border border-[#DCD8CC] rounded-lg text-xs font-medium text-[#0A251D] shrink-0 self-start sm:self-auto">
                      {activeStage.keyStats}
                    </div>
                  </div>

                  <p className="text-sm text-[#334155] leading-relaxed">
                    {activeStage.summary}
                  </p>

                  {/* 2x2 Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    
                    <div className="bg-white p-4 rounded-lg border border-[#E7E4D8] space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#0A251D] uppercase tracking-wider block">
                        Clinical Action
                      </span>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {activeStage.details.clinicalAction}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-[#E7E4D8] space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#0A251D] uppercase tracking-wider block">
                        Patient Requirement
                      </span>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {activeStage.details.patientRequirement}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-[#E7E4D8] space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider block">
                        Key Deliverable
                      </span>
                      <p className="text-xs text-[#334155] font-medium leading-relaxed">
                        {activeStage.details.deliverable}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-[#E7E4D8] space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                        Clinical Governance
                      </span>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {activeStage.details.complianceNote}
                      </p>
                    </div>

                  </div>

                  {/* Bottom Navigation Hint */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748B]">
                    <span>
                      Sequential milestone tracking ensures zero diagnostic oversights.
                    </span>
                    <button
                      onClick={() => {
                        const el = document.getElementById('waitlist');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-semibold text-[#0A251D] hover:underline flex items-center gap-1 self-start sm:self-auto"
                    >
                      Join Onboarding Waitlist <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* 2-Column: Left 4-Pillar Steps + Right Telemedicine Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Steps List */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-serif-custom font-normal text-[#0A251D] mb-4">
              Core Preventative Care Architecture
            </h3>
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white/80 border border-[#E2DFD3] rounded-xl p-6 transition-all hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono-custom text-sm font-semibold text-[#0A251D] pt-0.5">
                      {item.step}.
                    </span>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-[#17211E]">
                          {item.title}
                        </h4>
                        <IconComponent className="w-4 h-4 text-[#4A5D54] shrink-0" aria-hidden="true" />
                      </div>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        {item.description}
                      </p>
                      {/* Unboxed metadata highlights */}
                      <div className="pt-1 text-xs text-[#0A251D] font-medium flex items-center gap-2">
                        <span>{item.highlights}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Visual Anchor & Telemedicine Showcase */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2DFD2] bg-white shadow-[0_8px_30px_rgba(10,37,29,0.06)]">
              <img
                src="/src/assets/images/remote_gp_consultation_1791165271753.jpg"
                alt="UK GMC-registered General Practitioner conducting a remote video consultation reviewing biomarker trends"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] object-cover object-top"
                loading="lazy"
              />
              <div className="p-6 bg-white space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-semibold text-[#0A251D]">GMC-Registered Clinicians</span>
                  <span className="font-mono-custom text-[#059669]">Strictly UK Licenced</span>
                </div>
                <h4 className="text-base font-semibold text-[#17211E]">
                  Consistent, Dedicated General Practitioners
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Unlike on-demand telemedicine services that cycle through random locums, Lyria matches you with a named GP who learns your medical history and interprets your longitudinal biomarker trajectory over time.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#EFECE1]">
                  <span className="text-xs text-[#64748B]">Registration in progress</span>
                  <button
                    onClick={() => {
                      const el = document.getElementById('waitlist');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-[#0A251D] hover:underline flex items-center gap-1"
                  >
                    Reserve Priority Spot <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Regulatory Notice Card */}
            <div className="p-4 bg-[#EDEAE0] border border-[#DDD9CD] rounded-xl text-xs text-[#334155] space-y-1">
              <span className="font-semibold text-[#0A251D]">UK Clinical Governance Note</span>
              <p className="text-[11px] text-[#526359] leading-normal">
                Clinical consultations and prescribing will open strictly upon completion of formal regulatory authorization. Consultations will take place on our dedicated medical portal.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

