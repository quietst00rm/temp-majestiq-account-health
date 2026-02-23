import React, { useState } from 'react';
import { RefreshCcw, TrendingUp, Award, AlertTriangle, Quote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const personas = [
  {
    id: 'reinstated',
    label: 'Just Reinstated',
    icon: RefreshCcw,
    theme: { primary: 'text-brand-teal', bg: 'bg-brand-teal/10', border: 'border-brand-teal' },
    headline: 'Just Got Your Account Back?',
    description: 'The 90 days after reinstatement are the highest-risk period. Amazon is watching closely. Any new violation is more likely to trigger re-suspension - and the second suspension is harder to overturn. Monitoring ensures you never go through that nightmare again.',
    stat: '90 days',
    statLabel: 'Critical watch period',
    recommendedTier: 'GUARDIAN or DEFENDER',
    quote: "After my reinstatement, monitoring gave me peace of mind. I couldn't risk going through another suspension.",
    quoteAuthor: 'Sarah M.',
    quoteRole: 'Private Label Seller'
  },
  {
    id: 'high-volume',
    label: 'High Volume',
    icon: TrendingUp,
    theme: { primary: 'text-brand-yellow-dark', bg: 'bg-brand-yellow/10', border: 'border-brand-yellow' },
    headline: 'Managing 50+ SKUs and Getting Constant IP Challenges?',
    description: 'Wholesale operations face relentless violation volume - IP complaints, authenticity challenges, invoice requests. DEFENDER and FORTRESS tiers are designed specifically for high-volume catalogs with 35-60 violations/month capacity.',
    stat: '35-60',
    statLabel: 'Violations/month capacity',
    recommendedTier: 'DEFENDER or FORTRESS',
    quote: 'We were drowning in IP complaints. Complete Coverage handles them all so we can focus on growing.',
    quoteAuthor: 'Michael T.',
    quoteRole: 'Wholesale Distributor'
  },
  {
    id: 'seven-figure',
    label: '7-Figure Brand',
    icon: Award,
    theme: { primary: 'text-brand-black', bg: 'bg-brand-silver', border: 'border-brand-black' },
    headline: 'Protecting a 7-Figure Brand?',
    description: 'When each ASIN suspension costs $10K-$20K+ in daily revenue, $2,199/month for FORTRESS Protection is a rounding error. Bi-annual compliance audits prevent violations before they happen. Direct access to account managers during crises. This is white-glove protection for high-stakes sellers.',
    stat: '$10K+',
    statLabel: 'Daily revenue per ASIN',
    recommendedTier: 'FORTRESS or EMPIRE',
    quote: 'The proactive audits alone have saved us hundreds of thousands. This is essential infrastructure for serious brands.',
    quoteAuthor: 'Jennifer K.',
    quoteRole: '7-Figure Brand Owner'
  },
  {
    id: 'high-risk',
    label: 'Complex Cases',
    icon: AlertTriangle,
    theme: { primary: 'text-red-600', bg: 'bg-red-50', border: 'border-red-600' },
    headline: 'Dealing With Compliance-Heavy Categories?',
    description: "High-regulation categories face constant scrutiny. Safety complaints, documentation requirements, and complex policy challenges. Our team knows exactly what Amazon's looking for in these complex cases and helps you stay ahead.",
    stat: '3x',
    statLabel: 'Higher violation rate',
    recommendedTier: 'DEFENDER or FORTRESS',
    quote: 'Their expertise with complex documentation requirements has been invaluable for our business.',
    quoteAuthor: 'David R.',
    quoteRole: 'Specialty Products Seller'
  }
];

export default function PersonaTabs({ onCalculate }: { onCalculate: () => void }) {
  const [activeTab, setActiveTab] = useState(0);

  const activePersona = personas[activeTab];
  const Icon = activePersona.icon;

  return (
    <section className="py-24 px-6 bg-brand-offwhite border-b border-brand-silver">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4 font-heading uppercase tracking-tight">
            Control the Platform
          </h2>
          <p className="text-xl text-brand-steel font-light">Choose your situation</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-col sm:flex-row bg-white p-1 border border-brand-silver gap-1">
            {personas.map((persona, idx) => {
              const TabIcon = persona.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={persona.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-brand-black text-brand-yellow' 
                      : 'text-brand-steel hover:text-brand-black hover:bg-brand-offwhite'
                  }`}
                >
                  <TabIcon size={18} />
                  <span>{persona.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center shrink-0 border ${activePersona.theme.bg} ${activePersona.theme.border} ${activePersona.theme.primary}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-black font-heading leading-tight">
                  {activePersona.headline}
                </h3>
              </div>
              
              <p className="text-lg text-brand-charcoal leading-relaxed font-light">
                {activePersona.description}
              </p>

              <div className={`bg-white p-6 border border-brand-silver border-l-4 ${activePersona.theme.border}`}>
                <div className="text-4xl font-bold text-brand-black mb-2 font-heading">{activePersona.stat}</div>
                <div className="flex items-center gap-2 text-sm text-brand-steel font-bold uppercase tracking-wider">
                  <TrendingUp size={16} className={activePersona.theme.primary} />
                  {activePersona.statLabel}
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm text-brand-steel mb-2 font-bold uppercase tracking-wider">Recommended tier:</div>
                <div className="text-xl font-bold text-brand-black mb-6 font-heading">{activePersona.recommendedTier}</div>
                <button 
                  onClick={onCalculate}
                  className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold py-4 px-8 uppercase tracking-wider transition-colors border border-brand-black"
                >
                  Calculate My Tier
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`bg-white p-8 border border-brand-silver border-t-4 ${activePersona.theme.border} relative`}>
                <Quote className={`absolute top-6 right-6 w-12 h-12 opacity-10 ${activePersona.theme.primary}`} />
                
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-5 h-5 ${activePersona.theme.primary}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg text-brand-black mb-6 italic font-light">
                  "{activePersona.quote}"
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center text-white font-bold font-heading ${activePersona.theme.primary.replace('text-', 'bg-')}`}>
                    {activePersona.quoteAuthor.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-brand-black">{activePersona.quoteAuthor}</div>
                    <div className="text-sm text-brand-steel">{activePersona.quoteRole}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-silver flex items-center gap-2 text-sm text-brand-steel font-bold uppercase tracking-wider">
                  <CheckCircle2 size={16} className={activePersona.theme.primary} />
                  Verified Customer
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
