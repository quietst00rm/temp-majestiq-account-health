import React, { useState } from 'react';
import { Check, Shield, ChevronDown, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const tiers = [
  {
    id: 'guardian',
    name: 'GUARDIAN',
    price: 349,
    desc: 'Essential protection for growing Amazon sellers',
    features: [
      'Daily violation monitoring',
      '72-hour violation response time',
      'Unlimited violation handling',
      'Custom POA drafting & submission',
      'Weekly account health reports'
    ],
    hiddenFeatures: [
      'Email support with 48-hour response',
      'Account health score monitoring',
      '48-hour communication response time'
    ]
  },
  {
    id: 'defender',
    name: 'DEFENDER',
    price: 899,
    desc: 'Everything in GUARDIAN, plus:',
    features: [
      '48-hour violation response (2x faster)',
      'Annual compliance audit',
      'Priority violation queue',
      '24-hour communication response time'
    ],
    hiddenFeatures: []
  },
  {
    id: 'fortress',
    name: 'FORTRESS',
    price: 2199,
    desc: 'Everything in DEFENDER, plus:',
    features: [
      '24-hour violation response (2x faster)',
      '6-hour communication response',
      'Dedicated account manager',
      'Slack channel + email support',
      'Twice-yearly compliance audits'
    ],
    hiddenFeatures: [
      'Quarterly strategy calls',
      'Daily check-ins when at risk',
      'Executive escalation handling'
    ]
  },
  {
    id: 'empire',
    name: 'EMPIRE',
    price: 5999,
    desc: 'Everything in FORTRESS, plus:',
    features: [
      'Same-day violation response',
      '2-hour communication response',
      'Senior dedicated account manager',
      'WhatsApp + Slack + Phone support',
      'Quarterly compliance audits'
    ],
    hiddenFeatures: [
      'Monthly strategy sessions'
    ]
  }
];

export default function TierOverview({ onCalculate }: { onCalculate: () => void }) {
  const [showHow, setShowHow] = useState(false);
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({});

  const toggleTier = (id: string) => {
    setExpandedTiers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 px-6 bg-white border-b border-brand-silver">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4 font-heading uppercase tracking-tight">
            Defensible Growth
          </h2>
          <p className="text-xl text-brand-steel max-w-3xl mx-auto mb-8 font-light">
            We analyze 11 critical risk factors to engineer your exact protection tier.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Account History', 'Risk Indicators', 'Business Profile'].map(pill => (
              <span key={pill} className="px-4 py-2 bg-brand-teal-dark text-brand-teal border border-brand-teal-deep text-xs font-bold uppercase tracking-widest">
                {pill}
              </span>
            ))}
          </div>

          <button 
            onClick={() => setShowHow(!showHow)}
            className="inline-flex items-center gap-2 text-brand-teal font-bold uppercase tracking-wider text-sm hover:text-brand-teal-deep transition-colors"
          >
            How We Determine Your Tier
            <ChevronDown size={20} className={`transition-transform ${showHow ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showHow && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-8 text-left max-w-5xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-brand-offwhite p-8 border border-brand-silver">
                  <div>
                    <h3 className="text-lg font-bold text-brand-black mb-4 font-heading uppercase tracking-wide">11 Factors We Analyze:</h3>
                    <ul className="space-y-2">
                      {[
                        'Monthly revenue (trailing 12-month average)',
                        'Number of ASINs managed',
                        'Account age and maturity',
                        'Previous suspension history',
                        'Monthly violation frequency',
                        'Intellectual property complaints',
                        'Specific violation types received',
                        'Brand Registry enrollment status',
                        'Fulfillment method (FBA/FBM/Both)',
                        'Business model (Private Label/Wholesale/Arbitrage)',
                        'Product category risk levels'
                      ].map((factor, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-brand-charcoal font-light">
                          <Check size={16} className="text-brand-teal shrink-0 mt-0.5" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-black mb-4 font-heading uppercase tracking-wide">Why Comprehensive Assessment Matters:</h3>
                    <p className="text-brand-charcoal mb-6 text-sm leading-relaxed font-light">
                      A 5-year-old private label account with Brand Registry needs completely different protection than a 6-month-old arbitrage account with IP complaints. Our algorithm weighs each factor to calculate your exact risk level and protection needs.
                    </p>
                    <div className="bg-brand-teal/5 border border-brand-teal/20 p-4 flex gap-3">
                      <Info size={20} className="text-brand-teal shrink-0" />
                      <p className="text-sm text-brand-charcoal font-medium">Tiers are validated through Seller Central once service begins.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {tiers.map(tier => {
            const isExpanded = expandedTiers[tier.id];
            return (
              <div key={tier.id} className="bg-brand-offwhite border border-brand-silver p-8 flex flex-col hover:border-brand-black transition-colors relative group">
                {tier.id === 'fortress' && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
                )}
                <h3 className="text-2xl font-bold text-brand-black mb-4 font-heading uppercase tracking-wider">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-brand-black font-heading">${tier.price}</span>
                  <span className="text-brand-steel">/month</span>
                </div>
                <p className="text-sm text-brand-charcoal mb-6 min-h-[40px] font-light">
                  {tier.desc}
                </p>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-charcoal font-light">
                      <Check size={18} className="text-brand-teal shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  
                  <AnimatePresence>
                    {isExpanded && tier.hiddenFeatures.map((f, i) => (
                      <motion.li 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        key={`hidden-${i}`} 
                        className="flex items-start gap-3 text-sm text-brand-charcoal font-light"
                      >
                        <Check size={18} className="text-brand-teal shrink-0" />
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {tier.hiddenFeatures.length > 0 && (
                  <button 
                    onClick={() => toggleTier(tier.id)}
                    className="text-xs font-bold text-brand-teal flex items-center gap-1 mb-8 uppercase tracking-wider hover:text-brand-teal-deep"
                  >
                    {isExpanded ? 'Show less' : 'Show all features'}
                    <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}

                <button 
                  onClick={onCalculate}
                  className={`w-full py-4 font-bold flex items-center justify-center gap-2 transition-all mt-auto uppercase tracking-wider text-sm ${
                    tier.id === 'fortress' 
                      ? 'bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black border border-brand-black' 
                      : 'bg-brand-black hover:bg-brand-midnight text-white'
                  }`}
                >
                  Calculate Tier
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-brand-black border border-brand-charcoal p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 w-20 h-20 bg-brand-midnight flex items-center justify-center border border-brand-charcoal">
            <Shield size={40} className="text-brand-teal" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3 font-heading uppercase tracking-wide">Every Plan Includes Full Suspension Protection</h2>
            <p className="text-brand-silver mb-6 max-w-3xl font-light">
              No matter which tier you're assigned, suspension defense is always included. Our experts write your Plan of Action within 48 hours—no additional fees, no surprises.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {['Expert POA Writing', '24-48 Hour Turnaround', 'Unlimited Revisions'].map(badge => (
                <div key={badge} className="flex items-center gap-2 bg-brand-midnight px-4 py-2 text-xs font-bold uppercase tracking-widest border border-brand-charcoal text-brand-yellow">
                  <Check size={14} className="text-brand-teal" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
