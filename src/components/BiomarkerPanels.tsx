import React, { useState } from 'react';
import { BIOMARKER_GROUPS } from '../data/mockData';
import { Heart, Activity, Flame, Shield, Droplets, Sparkles, ChevronRight, Info } from 'lucide-react';

const BIOMARKER_DEFINITIONS: Record<string, { fullName: string; definition: string; clinicalUtility: string }> = {
  'ApoB': {
    fullName: 'Apolipoprotein B',
    definition: 'Directly quantifies the exact concentration of all atherogenic lipoprotein particles in circulation.',
    clinicalUtility: 'Superior cardiovascular risk predictor compared to standard LDL cholesterol.',
  },
  'Lp(a)': {
    fullName: 'Lipoprotein(a)',
    definition: 'An independent, genetically inherited particle that accelerates arterial calcification and thrombosis.',
    clinicalUtility: 'Identifies inherited cardiac risk unresponsive to routine lifestyle changes.',
  },
  'LDL-C / HDL-C': {
    fullName: 'Cholesterol Ratio',
    definition: 'The balance between low-density atherogenic cholesterol and protective high-density lipoproteins.',
    clinicalUtility: 'Evaluates baseline lipid clearance efficiency and relative vascular strain.',
  },
  'Triglycerides': {
    fullName: 'Serum Triglycerides',
    definition: 'Circulating blood fats representing immediate caloric surplus and lipid storage metabolism.',
    clinicalUtility: 'Early surrogate indicator for metabolic syndrome and hepatic fat accumulation.',
  },
  'Total Cholesterol ratio': {
    fullName: 'Cholesterol Risk Index',
    definition: 'Mathematical ratio dividing total blood cholesterol by protective HDL fraction.',
    clinicalUtility: 'Provides standard epidemiological cardiovascular stratification.',
  },
  'HbA1c': {
    fullName: 'Glycated Haemoglobin',
    definition: 'Measures the percentage of glucose-bound haemoglobin, reflecting average blood sugar over 90 days.',
    clinicalUtility: 'Detects pre-diabetes and insulin dysregulation years before acute symptom onset.',
  },
  'Fasting Blood Glucose': {
    fullName: 'Fasting Plasma Glucose',
    definition: 'Concentration of free glucose in the bloodstream following an overnight 10-hour fasting period.',
    clinicalUtility: 'Assesses acute pancreatic beta-cell insulin response and hepatic gluconeogenesis.',
  },
  'HOMA-IR': {
    fullName: 'Homeostatic Model Assessment',
    definition: 'Algorithm calculating the ratio between fasting insulin and glucose to assess cellular resistance.',
    clinicalUtility: 'Detects declining insulin sensitivity up to a decade before diagnostic diabetes.',
  },
  'Uric Acid': {
    fullName: 'Serum Urate',
    definition: 'Purine breakdown end-product associated with renal filtration, fructose load, and endothelial stress.',
    clinicalUtility: 'Identifies systemic metabolic strain and monitors risk of gout and hypertension.',
  },
  'TSH': {
    fullName: 'Thyroid Stimulating Hormone',
    definition: 'Pituitary gland signalling hormone commanding the thyroid to synthesise thyroxine.',
    clinicalUtility: 'Primary feedback sentinel for underactive or overactive thyroid states.',
  },
  'Free T3': {
    fullName: 'Free Triiodothyronine',
    definition: 'Unbound, biologically active thyroid hormone responsible for cellular respiration and metabolic rate.',
    clinicalUtility: 'Evaluates true tissue-level thyroid hormone availability and conversion.',
  },
  'Free T4': {
    fullName: 'Free Thyroxine',
    definition: 'Circulating prohormone converted peripherally into active T3 across target organs.',
    clinicalUtility: 'Crucial for distinguishing primary thyroid failure from pituitary signalling issues.',
  },
  'Thyroid Antibodies (TPO)': {
    fullName: 'Thyroid Peroxidase Antibodies',
    definition: 'Autoantibodies targeting the key enzyme responsible for thyroid hormone synthesis.',
    clinicalUtility: 'Identifies early autoimmune Hashimoto’s thyroiditis before clinical hypothyroidism.',
  },
  'Cortisol': {
    fullName: 'Serum Cortisol',
    definition: 'Primary steroid stress hormone regulating circadian wakefulness, immune response, and glucose.',
    clinicalUtility: 'Screens for adrenal exhaustion, diurnal rhythm disturbances, and chronic HPA axis stress.',
  },
  'Active B12': {
    fullName: 'Holotranscobalamin',
    definition: 'The specific fraction of Vitamin B12 bound to transcobalamin and available for cellular uptake.',
    clinicalUtility: 'Detects neurological and haematological B12 deficiency far earlier than total serum B12.',
  },
  'Serum Ferritin': {
    fullName: 'Ferritin Iron Storage',
    definition: 'Intracellular protein storage pool reflecting total bodily iron reserves in the liver and spleen.',
    clinicalUtility: 'The definitive clinical marker for subclinical iron deficiency fatigue and overload.',
  },
  'Vitamin D (25-OH)': {
    fullName: '25-Hydroxyvitamin D',
    definition: 'Major circulating pre-hormone essential for calcium homeostasis, bone density, and immunity.',
    clinicalUtility: 'Assesses seasonal depletion common across UK latitudes for immune resilience.',
  },
  'Folate': {
    fullName: 'Serum Folate (Vitamin B9)',
    definition: 'Water-soluble B vitamin critical for cellular division, methylation, and homocysteine recycling.',
    clinicalUtility: 'Ensures optimal red blood cell synthesis and neurological methylation capacity.',
  },
  'Magnesium': {
    fullName: 'Serum Magnesium',
    definition: 'Vital intracellular cation cofactor in over 300 enzymatic reactions and muscle relaxation.',
    clinicalUtility: 'Monitors neuromuscular equilibrium, sleep architecture, and cardiac rhythm stability.',
  },
  'hs-CRP (High-Sensitivity)': {
    fullName: 'High-Sensitivity C-Reactive Protein',
    definition: 'Acute-phase hepatic protein that surges in response to systemic vascular cytokine signalling.',
    clinicalUtility: 'Monitors low-grade chronic inflammation driving atheroma formation.',
  },
  'ESR': {
    fullName: 'Erythrocyte Sedimentation Rate',
    definition: 'Measures the rate at which red blood cells settle, altered by plasma fibrinogen concentration.',
    clinicalUtility: 'Screens for non-specific systemic inflammatory and autoimmune diseases.',
  },
  'Full Blood Count (FBC)': {
    fullName: 'Complete Blood Profiling',
    definition: 'Exhaustive quantitative analysis of erythrocytes, leukocytes, haemoglobin, and thrombocytes.',
    clinicalUtility: 'Foundational baseline evaluating oxygen transport, chronic infection, and marrow function.',
  },
  'Neutrophil ratio': {
    fullName: 'Neutrophil / Lymphocyte Ratio',
    definition: 'Relative distribution of innate first-responder granulocytes versus adaptive lymphocytes.',
    clinicalUtility: 'Emerging index of physiological stress and subclinical immune activation.',
  },
  'ALT': {
    fullName: 'Alanine Aminotransferase',
    definition: 'Enzyme concentrated inside hepatocytes that spills into serum when liver cells experience stress.',
    clinicalUtility: 'Sensitive sentinel for non-alcoholic fatty liver disease (NAFLD) and toxic insults.',
  },
  'AST': {
    fullName: 'Aspartate Aminotransferase',
    definition: 'Enzyme found across hepatocytes, cardiac muscle, and skeletal fibres.',
    clinicalUtility: 'Paired with ALT to determine AST/ALT ratio indicating hepatic tissue health.',
  },
  'GGT': {
    fullName: 'Gamma-Glutamyl Transferase',
    definition: 'Biliary epithelial enzyme highly sensitive to oxidative hepatic stress and bile duct flow.',
    clinicalUtility: 'Early marker for hepatic oxidative burden and alcohol-induced metabolic stress.',
  },
  'eGFR': {
    fullName: 'Estimated Glomerular Filtration Rate',
    definition: 'Formula calculating the filtration volume of renal nephrons in millilitres per minute.',
    clinicalUtility: 'Gold standard index for monitoring chronic kidney function and metabolic clearance.',
  },
  'Serum Creatinine': {
    fullName: 'Creatinine Waste Clearance',
    definition: 'Constant muscle breakdown byproduct excreted exclusively through glomerular filtration.',
    clinicalUtility: 'Used alongside eGFR to identify subtle decreases in renal excretory capacity.',
  },
  'Bilirubin': {
    fullName: 'Total Serum Bilirubin',
    definition: 'Orange-yellow breakdown pigment produced during normal erythrocyte haemoglobin recycling.',
    clinicalUtility: 'Monitors liver conjugation capacity, biliary excretion, and Gilbert’s syndrome.',
  },
};

export const BiomarkerPanels: React.FC = () => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const activeGroup = BIOMARKER_GROUPS[selectedGroupIndex];

  const groupIcons = [Heart, Activity, Sparkles, Droplets, Flame, Shield];

  return (
    <section id="biomarkers" className="py-20 md:py-28 bg-[#FAF9F5] border-b border-[#E7E5DC]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5D54]">
            Diagnostic Depth & Accuracy
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-normal text-[#0A251D] text-balance">
            Comprehensive blood profiling designed around systemic longevity.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Standard NHS checkups test a reactive fraction of biological markers. Lyria profiles up to 92+ markers spanning six interconnected physiological pillars.
          </p>
        </div>

        {/* Interactive Interactive Category Selector + Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Navigation Buttons */}
          <div className="lg:col-span-4 space-y-2">
            <span className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 px-1">
              Biomarker Pillars
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {BIOMARKER_GROUPS.map((group, index) => {
                const Icon = groupIcons[index % groupIcons.length];
                const isSelected = selectedGroupIndex === index;
                return (
                  <button
                    key={group.name}
                    onClick={() => setSelectedGroupIndex(index)}
                    className={`w-full text-left px-3.5 py-3 rounded-lg transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A251D] text-white shadow-md scale-[1.01]'
                        : 'bg-white border border-[#E7E4D8] text-[#1E293B] hover:bg-white hover:border-[#0A251D]/30 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#5CE0B8]' : 'text-[#4A5D54]'}`} />
                      <span className="text-xs sm:text-sm font-semibold truncate">{group.name}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 hidden sm:block transition-transform duration-200 ${isSelected ? 'rotate-90 text-white' : 'text-[#94A3B8]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Category Deep-Dive + Visual Anchor */}
          <div className="lg:col-span-8 bg-white border border-[#E5E2D6] rounded-2xl p-5 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6 sm:space-y-7">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-[#EFECE3]">
              <div>
                <span className="text-xs font-mono-custom text-[#0A251D] font-medium tracking-wide">
                  Pillar 0{selectedGroupIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-custom text-[#0A251D] font-normal mt-0.5">
                  {activeGroup.name}
                </h3>
              </div>
              <div className="text-xs text-[#526359] max-w-sm">
                {activeGroup.description}
              </div>
            </div>

            {/* Clinical Focus Card */}
            <div className="bg-[#FAF9F5] border border-[#EBE7DC] rounded-xl p-4 sm:p-5 space-y-1.5 transition-all duration-200 hover:bg-white hover:border-[#0A251D]/25 hover:shadow-sm hover:-translate-y-0.5">
              <span className="text-xs font-semibold text-[#0A251D] uppercase tracking-wider">
                Clinical Significance
              </span>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                {activeGroup.clinicalFocus}
              </p>
            </div>

            {/* Sample Markers Grid */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Key Biomarkers in this Panel
                </span>
                <span className="text-[11px] sm:text-xs text-[#0A251D]">Accredited UK Laboratory Assays</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                {activeGroup.sampleMarkers.map((marker) => {
                  const info = BIOMARKER_DEFINITIONS[marker];
                  return (
                    <div
                      key={marker}
                      tabIndex={0}
                      className="relative p-3.5 sm:p-4 bg-[#FAF9F5] border border-[#E7E4D8] rounded-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:bg-white hover:border-[#0A251D]/40 hover:shadow-md cursor-help group focus:outline-none focus:ring-2 focus:ring-[#0A251D]"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="text-xs sm:text-sm font-semibold text-[#0A251D] group-hover:text-[#061813] transition-colors">
                          {marker}
                        </div>
                        <Info className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#0A251D] transition-colors shrink-0 mt-0.5" />
                      </div>
                      
                      <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-1 group-hover:text-[#475569] transition-colors">
                        Quantitative Serum Assay
                      </div>

                      {/* Informative Hover Tooltip */}
                      {info && (
                        <div
                          role="tooltip"
                          className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-60 sm:w-64 max-w-[85vw] p-3 bg-[#0A251D] text-white rounded-lg shadow-xl text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-all duration-200 z-30 space-y-1.5"
                        >
                          <div className="flex items-center justify-between border-b border-[#1C4638] pb-1">
                            <span className="font-semibold text-white">{marker}</span>
                            <span className="text-[10px] text-[#5CE0B8] font-mono-custom truncate max-w-[120px]">
                              {info.fullName}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                            {info.definition}
                          </p>
                          <div className="pt-1 border-t border-[#1C4638] text-[10px] text-[#A3C7B9] leading-tight">
                            <strong className="text-white">Clinical Utility:</strong> {info.clinicalUtility}
                          </div>
                          {/* Triangle Arrow */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A251D] rotate-45" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Proof Line with Lab Image integration */}
            <div className="pt-4 border-t border-[#EFECE3] flex flex-col sm:flex-row items-center gap-4">
              <img
                src="/src/assets/images/biomarker_lab_vials_1791165257590.jpg"
                alt="Certified laboratory diagnostic vials for biomarker profiling"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover border border-[#E2DFD3] shrink-0"
              />
              <div className="text-xs text-[#475569] leading-relaxed">
                <strong className="text-[#17211E]">Zero diagnostic assumptions:</strong> All tests follow standardized venous blood draw protocols analysed under UKAS ISO 15189 accreditation.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
