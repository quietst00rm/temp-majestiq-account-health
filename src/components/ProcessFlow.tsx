import React, { useState } from 'react';
import { Monitor, FileText, Upload, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  {
    id: '01',
    title: 'Marketplace Intelligence',
    description: 'We monitor your Seller Central daily. Identify risk signals within 24 hours.',
    icon: Monitor,
    details: 'Our team logs into your Seller Central account daily to conduct thorough manual reviews of your account health, performance metrics, notifications, and listings. We identify potential violations and issues within 24 hours, giving you the fastest possible response time to protect your account.'
  },
  {
    id: '02',
    title: 'Structured Appeals & Responses',
    description: 'No templates. Root-cause analysis, corrective actions, and proof—first draft in 24–48 hours.',
    icon: FileText,
    details: "We build approval-ready responses: clear root cause, specific corrective & preventive actions, and an evidence pack tied to your workflows. We don't use templates or risky tactics and we tackle hard cases (related accounts, review abuse, repeats). If ops changes are needed, we tell you exactly what to implement so the issue stays closed."
  },
  {
    id: '03',
    title: 'Enforcement Strategy Execution',
    description: 'Hands-off resolution. We draft, you approve, we submit. Signal management on autopilot.',
    icon: Upload,
    details: 'Unlike competitors who make you handle submissions, we manage the entire process. You receive the POA for review and approval, then we handle all submissions, follow-up, and communication with Amazon. You stay informed via email updates while we do the work.'
  }
];

export default function ProcessFlow() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-white border-b border-brand-silver">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6 font-heading uppercase tracking-tight">
            Platform Strategy, Not Guesswork
          </h2>
          <p className="text-xl text-brand-charcoal max-w-2xl mx-auto font-light">
            Three-step account health management that runs on systems, not guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-brand-silver">
             <div className="absolute top-0 left-0 h-full bg-brand-teal w-1/3 animate-[pulse_3s_ease-in-out_infinite]"></div>
          </div>

          {steps.map((step) => {
            const isExpanded = expandedStep === step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-32 h-32 bg-brand-black text-brand-yellow flex items-center justify-center text-4xl font-bold font-heading shadow-lg mb-8 border-4 border-white transition-transform group-hover:scale-105">
                  {step.id}
                </div>
                
                <div className="w-16 h-16 bg-brand-offwhite flex items-center justify-center mb-6 text-brand-teal border border-brand-silver">
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-brand-black mb-4 font-heading uppercase tracking-wide">{step.title}</h3>
                <p className="text-brand-charcoal mb-6 font-light">{step.description}</p>

                <button 
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                  className="inline-flex items-center gap-2 text-brand-teal font-bold uppercase tracking-wider text-sm hover:text-brand-teal-deep transition-colors"
                >
                  Learn More
                  <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-6 w-full"
                    >
                      <div className="bg-brand-offwhite p-6 border-l-4 border-brand-teal text-left text-sm text-brand-charcoal shadow-sm font-light">
                        {step.details}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
