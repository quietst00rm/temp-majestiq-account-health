import React from 'react';
import { Shield, Award, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

export default function TrustAuthority() {
  return (
    <section className="relative py-24 px-6 bg-brand-black overflow-hidden border-b border-brand-charcoal">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-brand-teal-dark opacity-30 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-midnight text-brand-yellow px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-brand-charcoal">
            <Shield size={14} />
            Permission. Protection. Precision.
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-heading uppercase tracking-tight">
            Commerce Without Chaos
          </h1>
          <p className="text-xl md:text-2xl text-brand-silver max-w-3xl mx-auto font-light">
            MajestIQ Commerce delivers structured strategy and enforcement defense for serious Amazon operators.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-charcoal border border-brand-charcoal mb-20">
          {[
            { value: '50+', label: 'Combined Years Experience', desc: 'Amazon platform expertise', icon: Award },
            { value: '98.7%', label: 'Success Rate', desc: 'Violations caught before suspension', icon: ShieldCheck },
            { value: '<24 hrs', label: 'Response Time', desc: 'Emergency escalation', icon: Clock },
            { value: '8,500+', label: 'Cases Resolved', desc: 'Successful interventions', icon: CheckCircle },
          ].map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div key={i} className="bg-brand-midnight p-8 text-center hover:bg-brand-black transition-colors flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-brand-teal-dark flex items-center justify-center mb-6 text-brand-teal border border-brand-teal-deep">
                  <Icon size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-heading">{metric.value}</div>
                <div className="text-sm font-bold text-brand-silver mb-2 uppercase tracking-wider">{metric.label}</div>
                <div className="text-xs text-brand-steel">{metric.desc}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-brand-midnight border border-brand-charcoal p-10 md:p-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12 font-heading uppercase tracking-wide">
            Why Sellers Trust Us With Their Livelihood
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Proprietary violation tracking and analysis technology',
              'Direct escalation channels for urgent account issues',
              '24/7 Account Monitoring Infrastructure',
              'White-glove onboarding with dedicated account strategist'
            ].map((cred, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-brand-black border border-brand-charcoal hover:border-brand-teal transition-colors">
                <CheckCircle className="text-brand-teal shrink-0 mt-0.5" size={20} />
                <span className="text-brand-silver font-medium">{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
