import React, { useState } from 'react';
import { Check, X, Info, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const categories = [
  {
    name: 'Monitoring & Detection',
    features: [
      { name: 'Daily Violation Monitoring', values: [true, true, true, true] },
      { name: 'Account Health Score Monitoring', values: [true, true, true, true] }
    ]
  },
  {
    name: 'Response Times',
    features: [
      { name: 'Violation Response Time', values: ['72 hours', '48 hours', '24 hours', 'Same day'] },
      { name: 'Communication Response Time', values: ['48 hours', '24 hours', '6 hours', '2 hours'] }
    ]
  },
  {
    name: 'Violation Handling',
    features: [
      { name: 'Unlimited Violation Handling', values: [true, true, true, true] },
      { name: 'Custom POA Drafting & Submission', values: [true, true, true, true] },
      { name: 'Priority Violation Queue', values: [false, true, true, true] },
      { name: 'Daily Check-ins When at Risk', values: [false, false, true, true] },
      { name: 'Executive Escalation Handling', values: [false, false, true, true] }
    ]
  },
  {
    name: 'Reporting & Audits',
    features: [
      { name: 'Weekly Account Health Reports', values: [true, true, true, true] },
      { name: 'Compliance Audits', values: [false, 'Annual', 'Twice yearly', 'Quarterly'] }
    ]
  },
  {
    name: 'Support & Account Management',
    features: [
      { name: 'Support Channels', values: ['Email', 'Email', 'Email + Slack', 'Email + Slack + WhatsApp + Phone'] },
      { name: 'Dedicated Account Manager', values: [false, false, 'Standard', 'Senior'] },
      { name: 'Strategy Sessions', values: [false, false, 'Quarterly', 'Monthly'] }
    ]
  }
];

const tiers = [
  { id: 'guardian', name: 'GUARDIAN', price: '$349/mo' },
  { id: 'defender', name: 'DEFENDER', price: '$899/mo' },
  { id: 'fortress', name: 'FORTRESS', price: '$2,199/mo' },
  { id: 'empire', name: 'EMPIRE', price: '$5,999/mo' }
];

export default function TierComparison({ onCalculate }: { onCalculate: () => void }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const renderValue = (val: any) => {
    if (val === true) return <Check className="text-brand-teal mx-auto" size={20} />;
    if (val === false) return <X className="text-brand-silver mx-auto" size={20} />;
    return <span className="text-sm font-semibold text-brand-black">{val}</span>;
  };

  return (
    <section className="py-24 px-6 bg-brand-offwhite border-b border-brand-silver">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-black mb-4 font-heading uppercase tracking-tight">Precision for Amazon Sellers</h2>
          <p className="text-xl text-brand-steel mb-6 font-light">See exactly what's included in each protection tier</p>
          <div className="flex items-center justify-center gap-2 text-sm text-brand-charcoal bg-white border border-brand-silver inline-flex px-4 py-2 mx-auto">
            <Info size={16} className="text-brand-teal" />
            <span>Your tier is determined by our 11-factor risk assessment.</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block border border-brand-silver bg-white">
          <div className="grid grid-cols-5 bg-brand-black text-white">
            <div className="p-6 font-bold text-lg font-heading uppercase tracking-wider">Feature</div>
            {tiers.map(t => (
              <div key={t.id} className="p-6 text-center border-l border-brand-charcoal">
                <div className="font-bold text-lg font-heading uppercase tracking-wider">{t.name}</div>
                <div className="text-sm text-brand-silver font-medium">{t.price}</div>
              </div>
            ))}
          </div>

          {categories.map((cat, cIdx) => (
            <React.Fragment key={cIdx}>
              <div className="bg-brand-offwhite p-4 border-t border-brand-silver">
                <h3 className="font-bold text-brand-black uppercase tracking-widest text-xs">{cat.name}</h3>
              </div>
              {cat.features.map((feat, fIdx) => (
                <div key={fIdx} className="grid grid-cols-5 border-t border-brand-silver hover:bg-brand-offwhite/50 transition-colors">
                  <div className="p-5 flex items-center font-medium text-brand-charcoal text-sm">
                    {feat.name}
                  </div>
                  {feat.values.map((val, vIdx) => (
                    <div key={vIdx} className="p-5 flex items-center justify-center border-l border-brand-silver">
                      {renderValue(val)}
                    </div>
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
          <div className="bg-brand-offwhite p-8 border-t border-brand-silver text-center">
            <button onClick={onCalculate} className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold py-4 px-8 transition-colors inline-flex items-center gap-2 uppercase tracking-wider border border-brand-black">
              Calculate My Tier
            </button>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          {tiers.map((tier, tIdx) => {
            const isOpen = openAccordion === tier.id;
            return (
              <div key={tier.id} className="border border-brand-silver bg-white">
                <button 
                  onClick={() => setOpenAccordion(isOpen ? null : tier.id)}
                  className="w-full p-6 bg-brand-black text-white flex items-center justify-between"
                >
                  <div className="text-left">
                    <div className="font-bold text-xl font-heading uppercase tracking-wider">{tier.name}</div>
                    <div className="text-brand-silver text-sm">{tier.price}</div>
                  </div>
                  <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-8">
                        {categories.map((cat, cIdx) => (
                          <div key={cIdx}>
                            <h4 className="font-bold text-brand-black uppercase tracking-widest text-xs mb-4">{cat.name}</h4>
                            <ul className="space-y-3">
                              {cat.features.map((feat, fIdx) => {
                                const val = feat.values[tIdx];
                                return (
                                  <li key={fIdx} className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0">
                                      {val === true ? <Check size={16} className="text-brand-teal" /> : 
                                       val === false ? <X size={16} className="text-brand-silver" /> : 
                                       <Check size={16} className="text-brand-teal" />}
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-brand-charcoal">{feat.name}</span>
                                      {typeof val === 'string' && <span className="text-brand-steel ml-1">({val})</span>}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                        <button onClick={onCalculate} className="w-full bg-brand-yellow text-brand-black font-bold py-4 mt-4 uppercase tracking-wider border border-brand-black">
                          Calculate My Tier
                        </button>
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
