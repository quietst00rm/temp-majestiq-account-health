import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type WizardState = {
  step: number;
  answers: Record<string, any>;
  isAnalyzing: boolean;
  assignedTier: string | null;
};

const questions = [
  { id: 'asins', title: 'How many ASINs are you currently managing?', type: 'select', options: ['1-10', '11-50', '51-100', '101-500', '500+'] },
  { id: 'revenue', title: 'What is your average monthly revenue on Amazon over the past 12 months?', type: 'currency' },
  { id: 'violations', title: 'How many violations do you receive per month on average?', type: 'select', options: ['0', '1-2', '3-5', '6-10', '10+'] },
  { id: 'suspendedBefore', title: 'Have you been suspended before?', type: 'buttons', options: ['Yes', 'No'] },
  { id: 'sellerType', title: 'What type of seller are you?', type: 'buttons', options: ['Private Label', 'Wholesale', 'Hybrid', 'Dropshipping', 'Online/Retail Arbitrage'] },
  { id: 'brandRegistry', title: 'Are you enrolled in Amazon Brand Registry?', type: 'buttons', options: ['Yes', 'No'] },
  { id: 'fulfillment', title: 'How do you fulfill your Amazon orders?', type: 'buttons', options: ['FBA (Fulfilled by Amazon)', 'FBM (Fulfilled by Merchant)', 'Both FBA and FBM'] },
  { id: 'accountAge', title: 'How long has your Amazon seller account been active?', type: 'select', options: ['Less than 6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'] },
  { id: 'ipComplaints', title: 'How many Intellectual Property complaints have you received in the past 6 months?', type: 'select', options: ['None', '1-2', '3-5', '6-10', '10+'] },
  { id: 'violationTypes', title: 'Have you received any common violations (Authenticity, Restricted, Safety, etc.) in the past 3 months?', type: 'buttons', options: ['Yes', 'No'] },
  { id: 'contact', title: 'Contact Information', type: 'contact' }
];

export default function ProtectionWizard() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    answers: {},
    isAnalyzing: false,
    assignedTier: null
  });

  const currentQ = questions[state.step - 1];
  const totalSteps = questions.length;

  const handleAnswer = (id: string, value: any) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [id]: value }
    }));
    
    if (currentQ.type !== 'currency' && currentQ.type !== 'contact') {
      setTimeout(nextStep, 300);
    }
  };

  const nextStep = () => {
    if (state.step < totalSteps) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
    } else if (state.step === totalSteps) {
      analyze();
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const analyze = () => {
    setState(prev => ({ ...prev, isAnalyzing: true }));
    setTimeout(() => {
      const revStr = state.answers.revenue || '0';
      const rev = parseFloat(revStr.replace(/[^0-9.-]+/g,""));
      const annual = rev * 12;
      let tier = 'NOT_ELIGIBLE';
      if (annual >= 100000 && annual < 1000000) tier = 'GUARDIAN';
      else if (annual >= 1000000 && annual < 5000000) tier = 'DEFENDER';
      else if (annual >= 5000000 && annual < 20000000) tier = 'FORTRESS';
      else if (annual >= 20000000) tier = 'EMPIRE';

      setState(prev => ({ ...prev, isAnalyzing: false, assignedTier: tier, step: totalSteps + 1 }));
    }, 3000);
  };

  const renderInput = () => {
    if (!currentQ) return null;
    const val = state.answers[currentQ.id] || '';

    switch (currentQ.type) {
      case 'select':
        return (
          <select 
            className="w-full p-4 text-lg border border-brand-silver focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none bg-white appearance-none"
            value={val}
            onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
          >
            <option value="" disabled>Select an option</option>
            {currentQ.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'currency':
        return (
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-brand-steel">$</span>
              <input 
                type="text"
                className="w-full p-4 pl-8 text-lg border border-brand-silver focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                placeholder="50,000"
                value={val}
                onChange={(e) => {
                  const num = e.target.value.replace(/[^0-9]/g, '');
                  const formatted = num ? parseInt(num).toLocaleString() : '';
                  handleAnswer(currentQ.id, formatted);
                }}
              />
            </div>
            <button 
              onClick={nextStep}
              disabled={!val}
              className="w-full bg-brand-black text-white font-bold py-4 disabled:opacity-50 hover:bg-brand-midnight transition-colors uppercase tracking-wider text-sm"
            >
              Continue
            </button>
          </div>
        );
      case 'buttons':
        return (
          <div className={`grid gap-3 ${currentQ.options?.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {currentQ.options?.map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(currentQ.id, opt)}
                className={`p-4 text-left font-semibold border transition-all ${
                  val === opt 
                    ? 'border-brand-teal bg-brand-teal/5 text-brand-teal-deep' 
                    : 'border-brand-silver hover:border-brand-teal hover:bg-brand-offwhite text-brand-charcoal'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-bold text-brand-charcoal mb-2 uppercase tracking-wider">Business Email <span className="text-red-500">*</span></label>
              <input 
                type="email"
                className="w-full p-4 border border-brand-silver focus:border-brand-teal outline-none"
                placeholder="you@company.com"
                value={state.answers.email || ''}
                onChange={(e) => handleAnswer('email', e.target.value)}
              />
            </div>
            <button 
              onClick={nextStep}
              disabled={!state.answers.email || !state.answers.email.includes('@')}
              className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold py-4 disabled:opacity-50 transition-colors uppercase tracking-wider text-sm border border-brand-black"
            >
              Complete Assessment
            </button>
          </div>
        );
    }
  };

  if (state.isAnalyzing) {
    return (
      <section className="py-24 px-6 bg-white min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-brand-black mb-8 font-heading uppercase tracking-wide">Analyzing Your Business Profile</h3>
          <div className="w-16 h-16 border-4 border-brand-silver border-t-brand-teal rounded-full animate-spin mx-auto mb-8"></div>
          <div className="space-y-3 text-brand-charcoal font-medium font-mono text-sm">
            <p className="animate-pulse">Evaluating business metrics...</p>
            <p className="animate-pulse delay-100">Analyzing risk profile...</p>
            <p className="animate-pulse delay-200">Matching optimal protection tier...</p>
          </div>
        </div>
      </section>
    );
  }

  if (state.assignedTier) {
    if (state.assignedTier === 'NOT_ELIGIBLE') {
      return (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-2xl mx-auto bg-brand-offwhite p-12 border border-brand-silver text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4 font-heading uppercase tracking-wide">Minimum Revenue Not Met</h3>
            <p className="text-brand-charcoal mb-8 font-light">Our structured protection plans start at $100,000 annual revenue. Please contact us for custom options tailored to your business needs.</p>
            <button onClick={() => setState({ step: 1, answers: {}, isAnalyzing: false, assignedTier: null })} className="bg-brand-black text-white px-8 py-4 font-bold uppercase tracking-wider text-sm">Start Over</button>
          </div>
        </section>
      );
    }

    const tierPrices: Record<string, number> = { GUARDIAN: 349, DEFENDER: 899, FORTRESS: 2199, EMPIRE: 5999 };
    const price = tierPrices[state.assignedTier];
    const rev = parseFloat((state.answers.revenue || '0').replace(/[^0-9.-]+/g,""));
    const dailyLoss = rev / 30;

    return (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-brand-offwhite border border-brand-silver p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-teal"></div>
            
            <div className="text-xs font-bold text-brand-steel uppercase tracking-[0.2em] mb-4">Your Recommended Plan</div>
            <h2 className="text-5xl md:text-6xl font-black text-brand-black mb-4 font-heading uppercase tracking-tight">{state.assignedTier}</h2>
            <div className="text-4xl font-bold text-brand-black mb-12">${price}<span className="text-xl text-brand-steel font-medium">/month</span></div>

            <div className="bg-white border border-red-200 p-6 md:p-8 text-left mb-12">
              <div className="flex items-center gap-3 text-red-800 font-bold text-xl mb-6 font-heading uppercase tracking-wide">
                <ShieldAlert size={24} />
                Suspension Cost Without Protection
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-6 text-center border border-red-100">
                  <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2">Daily Loss</div>
                  <div className="text-3xl font-black text-red-900 font-heading">${Math.round(dailyLoss).toLocaleString()}</div>
                </div>
                <div className="bg-red-50 p-6 text-center border border-red-100">
                  <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2">Weekly Loss</div>
                  <div className="text-3xl font-black text-red-900 font-heading">${Math.round(dailyLoss * 7).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black text-lg font-bold py-5 transition-all flex items-center justify-center gap-3 group uppercase tracking-wider border border-brand-black">
              Secure My Account
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-black mb-4 font-heading uppercase tracking-tight">Structured Protection</h2>
          <p className="text-brand-steel font-light">Answer a few questions to receive your personalized recommendation.</p>
        </div>

        <div className="bg-brand-offwhite border border-brand-silver p-8 md:p-12">
          <div className="mb-10">
            <div className="flex justify-between text-xs font-bold text-brand-steel mb-3 uppercase tracking-widest">
              <span>Step {state.step} of {totalSteps}</span>
            </div>
            <div className="h-1 bg-brand-silver overflow-hidden">
              <div 
                className="h-full bg-brand-teal transition-all duration-300"
                style={{ width: `${(state.step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {state.step > 1 && (
            <button onClick={prevStep} className="flex items-center gap-2 text-brand-steel hover:text-brand-black font-bold text-sm uppercase tracking-wider mb-8 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-brand-black mb-8 font-heading leading-snug">
                {currentQ.title}
              </h3>
              {renderInput()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
