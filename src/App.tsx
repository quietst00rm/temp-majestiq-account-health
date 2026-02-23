import React from 'react';
import ProcessFlow from './components/ProcessFlow';
import TierOverview from './components/TierOverview';
import TierComparison from './components/TierComparison';
import ProtectionWizard from './components/ProtectionWizard';
import TrustAuthority from './components/TrustAuthority';
import PersonaTabs from './components/PersonaTabs';
import { Shield } from 'lucide-react';

export default function App() {
  const scrollToWizard = () => {
    const wizard = document.getElementById('protection-wizard');
    if (wizard) {
      wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-black flex flex-col">
      {/* Header */}
      <header className="bg-brand-black text-white py-6 px-6 border-b border-brand-charcoal sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-brand-yellow" size={32} />
            <span className="font-heading font-bold text-2xl uppercase tracking-widest text-white">MajestIQ</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-brand-silver">
            <a href="#" className="hover:text-brand-yellow transition-colors">Services</a>
            <a href="#" className="hover:text-brand-yellow transition-colors">Methodology</a>
            <a href="#" className="hover:text-brand-yellow transition-colors">Case Studies</a>
            <button onClick={scrollToWizard} className="bg-brand-yellow text-brand-black px-6 py-2 hover:bg-brand-yellow-dark transition-colors">
              Get Protected
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero / Trust Section */}
        <TrustAuthority />
        
        {/* Process Flow */}
        <ProcessFlow />
        
        {/* Personas */}
        <PersonaTabs onCalculate={scrollToWizard} />
        
        {/* Tiers Overview */}
        <TierOverview onCalculate={scrollToWizard} />
        
        {/* Tier Comparison */}
        <TierComparison onCalculate={scrollToWizard} />
        
        {/* Wizard */}
        <div id="protection-wizard">
          <ProtectionWizard />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-silver py-12 px-6 border-t border-brand-charcoal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-brand-yellow" size={24} />
              <span className="font-heading font-bold text-xl uppercase tracking-widest text-white">MajestIQ Commerce</span>
            </div>
            <p className="text-sm font-light max-w-md leading-relaxed">
              Delivering structured strategy and enforcement defense for serious Amazon operators. Permission. Protection. Precision.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Solutions</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Account Health</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Risk Management</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Compliance Audits</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Enforcement Strategy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm font-light">
              <li><a href="#" className="hover:text-brand-yellow transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-charcoal text-xs font-light text-center md:text-left">
          &copy; {new Date().getFullYear()} MajestIQ Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
