import React, { useState, useRef } from 'react';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  MapPin,
  TrendingDown,
  TrendingUp,
  Activity,
  ArrowRight,
  X,
  Stethoscope,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// High-fidelity portrait imports
import nicholasWardImg from '../assets/images/nicholas_ward_portrait_1791174605879.jpg';
import helenaSterlingImg from '../assets/images/helena_sterling_portrait_1791174623486.jpg';
import marcusThorneImg from '../assets/images/marcus_thorne_portrait_1791174639434.jpg';
import victoriaPritchardImg from '../assets/images/victoria_pritchard_portrait_1791174654923.jpg';
import eleanorVanceImg from '../assets/images/eleanor_vance_portrait_1791174680788.jpg';
import alistairCampbellImg from '../assets/images/alistair_campbell_portrait_1791174699212.jpg';

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  image: string;
  category: 'cardiovascular' | 'energy' | 'metabolic' | 'longevity';
  categoryLabel: string;
  quote: string;
  focusArea: string;
  keyOutcome: string;
  metricDelta: {
    label: string;
    before: string;
    after: string;
    changeText: string;
    isImprovement: boolean;
  };
  duration: string;
  detailedCase: {
    background: string;
    clinicalFinding: string;
    gpIntervention: string;
    longTermImpact: string;
  };
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr Nicholas Ward, MA (Cantab)',
    title: 'Biochemical Engineer & Health Technologist',
    location: 'Cambridge',
    image: nicholasWardImg,
    category: 'cardiovascular',
    categoryLabel: 'Cardiovascular Risk & ApoB',
    quote:
      'Standard annual checkups only told me my cholesterol was "normal". An advanced ApoB and lipid subfraction panel revealed atherogenic particle density years before symptoms could arise. Having a dedicated doctor review that trajectory changed how I safeguard my cardiovascular health.',
    focusArea: 'ApoB, Lp(a) & Lipid Subfractions',
    keyOutcome: 'Identified asymptomatic atherogenic particle risk early',
    metricDelta: {
      label: 'ApoB Particle Density',
      before: '1.26 g/L',
      after: '0.74 g/L',
      changeText: '-41% optimal risk trajectory',
      isImprovement: true,
    },
    duration: '14-month member · Comprehensive Tier',
    detailedCase: {
      background:
        'Dr Ward had routine NHS checkups reporting total cholesterol within normal limits. However, family history of early arterial events prompted him to seek deeper particle profiling.',
      clinicalFinding:
        'Quarterly venous panels showed high ApoB (1.26 g/L) and elevated sdLDL particles despite standard LDL readings remaining borderline normal.',
      gpIntervention:
        'His dedicated GMC GP initiated an evidence-based lifestyle recalibration targeting saturated fat sources, soluble fibre supplementation, and prescribed periodic vascular ultrasound monitoring.',
      longTermImpact:
        'ApoB decreased to 0.74 g/L within 9 months, placing him in the lowest cardiovascular risk decile for his age cohort.',
    },
  },
  {
    id: 'test-2',
    name: 'Helena Sterling',
    title: 'Legal Director & Marathon Runner',
    location: 'Surrey',
    image: helenaSterlingImg,
    category: 'energy',
    categoryLabel: 'Energy & Iron Kinetics',
    quote:
      'I spent eighteen months suffering from unexplained fatigue while standard baseline tests came back unremarkable. Tracking active B12, ferritin saturation, and thyroid antibodies over consecutive cycles finally pinpointed subclinical micronutrient depletion. Proactive data completely replaced guesswork.',
    focusArea: 'Ferritin, Holo-TC & Thyroid Axis',
    keyOutcome: 'Resolved chronic fatigue through longitudinal tracking',
    metricDelta: {
      label: 'Transferrin Saturation',
      before: '11%',
      after: '29%',
      changeText: 'Normal physiological band restored',
      isImprovement: true,
    },
    duration: '18-month member · Core Health Tier',
    detailedCase: {
      background:
        'A competitive runner training 50km weekly, Helena suffered from brain fog and persistent afternoon fatigue that standard GP blood tests could not explain.',
      clinicalFinding:
        'Serial testing revealed severe iron depletion (ferritin 14 µg/L, saturation 11%) alongside marginal active B12 (holo-transcobalamin), compounded by endurance exercise clearance.',
      gpIntervention:
        'Her Lyria GP structured a phased high-absorption liposomal iron protocol and synchronized training load around quarterly blood draws to prevent exercise-induced haemolysis.',
      longTermImpact:
        'Energy levels fully normalised; marathon recovery time halved, and ferritin saturation stabilised above 28% without gastrointestinal side effects.',
    },
  },
  {
    id: 'test-3',
    name: 'Marcus Thorne',
    title: 'Technology Founder & Investor',
    location: 'London (Kensington)',
    image: marcusThorneImg,
    category: 'metabolic',
    categoryLabel: 'Metabolic & Glycaemic Health',
    quote:
      'Healthcare shouldn’t begin when symptoms become emergencies. Tracking HbA1c, fasting insulin, and hepatic enzymes quarterly gives me verifiable metrics to extend my healthspan. Unhurried 30-minute GP consultations are what contemporary medicine ought to look like.',
    focusArea: 'Fasting Insulin & HOMA-IR Index',
    keyOutcome: 'Reversed insidious pre-diabetic insulin resistance',
    metricDelta: {
      label: 'Fasting Serum Insulin',
      before: '17.8 mIU/L',
      after: '6.9 mIU/L',
      changeText: '-61% reduction in insulin resistance',
      isImprovement: true,
    },
    duration: '12-month member · Comprehensive Tier',
    detailedCase: {
      background:
        'As a startup founder with demanding international travel schedules, Marcus wanted a preventative baseline before metabolic fatigue began degrading focus.',
      clinicalFinding:
        'While fasting glucose appeared normal (5.2 mmol/L), his fasting insulin was severely elevated at 17.8 mIU/L with a HOMA-IR score of 4.1, indicating early silent insulin resistance.',
      gpIntervention:
        'His dedicated GP implemented a targeted chrononutrition framework, optimized resistance training timing, and monitored hepatic enzymes (ALT/GGT) quarterly.',
      longTermImpact:
        'Fasting insulin dropped to 6.9 mIU/L within 9 months, avoiding future pharmacotherapy and eliminating post-lunch energy crashes entirely.',
    },
  },
  {
    id: 'test-4',
    name: 'Victoria Lin-Pritchard',
    title: 'Retired Clinical Specialist Nurse',
    location: 'Edinburgh',
    image: victoriaPritchardImg,
    category: 'longevity',
    categoryLabel: 'Longevity & Chronic Vigilance',
    quote:
      'Having worked inside British acute care for thirty years, I know our healthcare system excels at reactive emergencies but lacks the bandwidth for preventative vigilance. Systematic biomarker tracking paired with consistent GP reviews is the most rational path to chronic illness prevention.',
    focusArea: 'High-Sensitivity CRP & Renal Trajectory',
    keyOutcome: 'Proactive surveillance over reactive crisis care',
    metricDelta: {
      label: 'High-Sensitivity CRP',
      before: '2.8 mg/L',
      after: '0.6 mg/L',
      changeText: 'Subclinical systemic inflammation extinguished',
      isImprovement: true,
    },
    duration: '2-year member · Longevity Tier',
    detailedCase: {
      background:
        'With decades of NHS clinical experience, Victoria recognized the vital gap between routine primary care and preventative systemic monitoring in post-menopausal health.',
      clinicalFinding:
        'Subtle chronic low-grade inflammation (hs-CRP 2.8 mg/L) alongside mild eGFR fluctuations that went unnoticed in standard episodic reviews.',
      gpIntervention:
        'Her Lyria doctor introduced an anti-inflammatory dietary regimen enriched in polyphenol bioactives, adjusted bone density micronutrients, and scheduled bi-annual renal reviews.',
      longTermImpact:
        'hs-CRP reduced to 0.6 mg/L, bone resorption markers stabilised, and eGFR improved by 8 mL/min/1.73m².',
    },
  },
  {
    id: 'test-5',
    name: 'Dr Eleanor Vance',
    title: 'Senior Academic Researcher & Biochemist',
    location: 'Oxford',
    image: eleanorVanceImg,
    category: 'metabolic',
    categoryLabel: 'Metabolic & Hepatic Health',
    quote:
      'The clinical depth of 64 quarterly biomarkers accompanied by an unhurried, dedicated GMC doctor review gave me clarity I simply couldn’t find in standard primary care. It transformed vague preventative aspirations into an empirical, structured strategy.',
    focusArea: 'Hepatic Enzymes (ALT/GGT) & Omega-3 Index',
    keyOutcome: 'Empirical biomarker roadmap over generic wellness advice',
    metricDelta: {
      label: 'GGT Hepatic Marker',
      before: '48 U/L',
      after: '19 U/L',
      changeText: '-60% hepatic detox optimisation',
      isImprovement: true,
    },
    duration: '10-month member · Comprehensive Tier',
    detailedCase: {
      background:
        'An Oxford biochemist seeking precision health insights, Eleanor wanted longitudinal data on hepatic metabolic health and cellular inflammation.',
      clinicalFinding:
        'Elevated GGT and lower-than-optimal erythrocyte omega-3 index (4.2%), indicating subclinical oxidative strain from intense academic work.',
      gpIntervention:
        'Her doctor formulated a calibrated pharmaceutical-grade EPA/DHA protocol paired with targeted antioxidant support and quarterly liver profile verification.',
      longTermImpact:
        'GGT plunged to 19 U/L and omega-3 index exceeded 8.8%, accompanied by enhanced cognitive clarity and sustained afternoon mental endurance.',
    },
  },
  {
    id: 'test-6',
    name: 'Dr Alistair Campbell',
    title: 'Healthcare Executive & Master Cyclist',
    location: 'Edinburgh City',
    image: alistairCampbellImg,
    category: 'longevity',
    categoryLabel: 'Endocrine Axis & Cardiac Stress',
    quote:
      'As an endurance cyclist in my fifties, understanding overtraining syndrome through hormonal and inflammatory markers like hs-CRP and free testosterone was a revelation. It enabled me to train with scientific precision while avoiding cardiac strain.',
    focusArea: 'Free Testosterone & Cardiac Troponin',
    keyOutcome: 'Trained with scientific precision while avoiding overtraining',
    metricDelta: {
      label: 'Free Testosterone / Cortisol',
      before: '0.024',
      after: '0.038',
      changeText: '+58% anabolism recovery index',
      isImprovement: true,
    },
    duration: '16-month member · Longevity Tier',
    detailedCase: {
      background:
        'Alistair competes in Scottish road cycling events. Heavy training blocks frequently led to prolonged immune dips and plateaued athletic output.',
      clinicalFinding:
        'Severe cortisol spikes post-block paired with suppressed free testosterone and elevated high-sensitivity troponin traces, signifying chronic exercise strain.',
      gpIntervention:
        'His dedicated GP established blood-guided rest windows, tailored adaptogenic support, and mandated micro-cycle recovery testing.',
      longTermImpact:
        'Restored hormonal equilibrium, maintained healthy cardiac recovery parameters, and achieved personal record times in subsequent endurance events.',
    },
  },
];

export const PatientPerspective: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<Testimonial | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials =
    selectedCategory === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === selectedCategory);

  // Smooth manual scroll helpers
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="perspectives"
      aria-label="Patient Perspectives and Clinical Testimonials"
      className="py-20 md:py-28 bg-[#FAF9F5] border-b border-[#E7E5DC] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
              <Activity className="w-4 h-4 text-[#059669]" />
              <span>Real Clinical Impact · Verified Member Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-custom font-normal text-[#0A251D] text-balance">
              The difference unhurried clinical foresight makes.
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Real accounts of how quarterly blood biomarker surveillance and named GMC GP continuity replace clinical ambiguity with life-changing preventative vigilance.
            </p>
          </div>

          {/* Interactive Rail Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="px-3.5 py-2 bg-white border border-[#DCD8CC] rounded-full text-xs font-mono-custom text-[#0A251D] hover:bg-[#F2EFE6] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title={isPaused ? 'Resume railing slide' : 'Pause railing slide'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Resume Rail</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Pause Slide</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                aria-label="Scroll testimonials left"
                className="w-10 h-10 rounded-full border border-[#DCD8CC] bg-white hover:bg-[#F2EFE6] text-[#0A251D] flex items-center justify-center transition-colors cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="Scroll testimonials right"
                className="w-10 h-10 rounded-full border border-[#DCD8CC] bg-white hover:bg-[#F2EFE6] text-[#0A251D] flex items-center justify-center transition-colors cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Segmented Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 border-b border-[#EAE7DC]">
          <span className="text-xs text-[#64748B] mr-2">Filter clinical focus:</span>
          {[
            { key: 'all', label: 'All Testimonials (6)' },
            { key: 'cardiovascular', label: 'Cardiovascular & ApoB' },
            { key: 'energy', label: 'Iron & Micronutrients' },
            { key: 'metabolic', label: 'Metabolic & Insulin' },
            { key: 'longevity', label: 'Longevity & Endocrine' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                selectedCategory === cat.key
                  ? 'bg-[#0A251D] text-white shadow-xs'
                  : 'bg-white border border-[#DCD8CC] text-[#475569] hover:text-[#0A251D] hover:bg-[#F4F2E9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Railing Slide Track Container with Fade Masks */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Shadows for seamless luxury feel */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAF9F5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAF9F5] to-transparent z-10" />

        {/* Sliding Rail Track */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-6 overflow-x-auto scrollbar-none px-6 sm:px-12 select-none ${
            selectedCategory === 'all'
              ? isPaused
                ? 'rail-paused'
                : 'animate-rail-slide'
              : 'justify-start overflow-x-auto'
          }`}
          style={{
            scrollSnapType: 'x proximity',
          }}
        >
          {/* Double track rendering for seamless infinite loop when 'all' is selected */}
          {(selectedCategory === 'all'
            ? [...filteredTestimonials, ...filteredTestimonials]
            : filteredTestimonials
          ).map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedCase(item)}
              className="w-[340px] sm:w-[410px] shrink-0 bg-white border border-[#E2DFD3] hover:border-[#0A251D] rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(10,37,29,0.03)] hover:shadow-[0_12px_32px_rgba(10,37,29,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 relative"
            >
              {/* Top Accent Bar & Category Tag */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-custom uppercase tracking-wider font-semibold text-[#0A251D] bg-[#FAF9F5] border border-[#E5E2D6] px-2.5 py-1 rounded-md">
                    {item.categoryLabel}
                  </span>
                  
                  <span className="text-[11px] font-mono-custom text-[#059669] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Patient
                  </span>
                </div>

                {/* Key Metric Delta Callout Card */}
                <div className="bg-[#FAF9F5] border border-[#EAE7DC] group-hover:border-[#D6D2C4] rounded-xl p-3 space-y-1.5 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#17211E]">
                    <span className="text-[#64748B] text-[11px] uppercase tracking-wider">
                      Biomarker Trajectory
                    </span>
                    <span className="font-mono-custom text-[#059669] text-[11px] flex items-center gap-1 font-bold">
                      {item.metricDelta.isImprovement ? (
                        <TrendingDown className="w-3 h-3 text-[#059669]" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-[#059669]" />
                      )}
                      {item.metricDelta.changeText}
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-mono-custom text-xs">
                    <span className="text-[#475569]">{item.metricDelta.label}</span>
                    <span className="text-[#0A251D] font-bold">
                      <span className="text-[#94A3B8] line-through mr-1 font-normal">
                        {item.metricDelta.before}
                      </span>
                      → {item.metricDelta.after}
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-sm sm:text-base font-serif-custom italic font-normal text-[#17211E] leading-relaxed line-clamp-4">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Author Attribution with Portrait Photo */}
              <div className="pt-5 mt-5 border-t border-[#F2EFE8] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-[#DCD8CC] group-hover:ring-[#0A251D] transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-[#059669] text-white rounded-full p-0.5 shadow-2xs">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#0A251D] group-hover:text-[#061813] transition-colors leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#64748B] line-clamp-1">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-mono-custom text-[#718096] mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-[#0A251D]" />
                      <span>{item.location}, UK</span>
                    </div>
                  </div>
                </div>

                {/* Inspect Arrow */}
                <div className="w-8 h-8 rounded-full bg-[#FAF9F5] group-hover:bg-[#0A251D] group-hover:text-white text-[#0A251D] flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Bottom Quiet Assurance */}
      <div className="max-w-5xl mx-auto px-6 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#718096] border-t border-[#EAE7DC] pt-4 gap-2">
        <span className="flex items-center gap-1.5 font-mono-custom text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
          UK clinical protocol compliance · Verified patient longitudinal panels
        </span>
        <span className="text-[11px]">
          Click any case card to inspect detailed laboratory metrics & GP consultation notes
        </span>
      </div>

      {/* Case Study Detail Inspection Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-2xl w-full border border-[#DEDACD] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#0A251D] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#5CE0B8]/40"
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-tight">
                      {selectedCase.name}
                    </h3>
                    <p className="text-xs text-[#A3C7B9] font-mono-custom">
                      {selectedCase.title} · {selectedCase.location}, UK
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1 rounded-md text-[#A3C7B9] hover:text-white hover:bg-[#154638] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-[#334155] text-sm">
                
                {/* Clinical Focus Header & Trajectory */}
                <div className="bg-[#FAF9F5] border border-[#E7E4D8] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0A251D]">
                      Clinical Case Report
                    </span>
                    <span className="text-xs font-mono-custom text-[#059669] font-bold">
                      {selectedCase.duration}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-[#DCD8CC] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#64748B]">Primary Biomarker Monitored</div>
                      <div className="text-sm font-semibold text-[#0A251D]">
                        {selectedCase.metricDelta.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#64748B]">12-Month Result</div>
                      <div className="text-sm font-mono-custom font-bold text-[#059669]">
                        {selectedCase.metricDelta.before} → {selectedCase.metricDelta.after}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote in full */}
                <blockquote className="text-base sm:text-lg font-serif-custom italic text-[#17211E] leading-relaxed border-l-3 border-[#0A251D] pl-4">
                  "{selectedCase.quote}"
                </blockquote>

                {/* 3-Step Clinical Breakdown */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A251D] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Baseline Presentation</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed bg-[#FAF9F5] p-3 rounded-lg border border-[#EFECE3]">
                      {selectedCase.detailedCase.background}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A251D] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Pathology Panel Discovery</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed bg-[#FAF9F5] p-3 rounded-lg border border-[#EFECE3]">
                      {selectedCase.detailedCase.clinicalFinding}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A251D] flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-[#059669]" />
                      <span>GMC GP Intervention & Outcome</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed bg-[#FAF9F5] p-3 rounded-lg border border-[#EFECE3]">
                      {selectedCase.detailedCase.gpIntervention} {selectedCase.detailedCase.longTermImpact}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#E8E5DA] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B]">
                  Illustrative UK clinical service case study · Confidentiality protected
                </span>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 bg-[#0A251D] hover:bg-[#133F33] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Close Case Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
