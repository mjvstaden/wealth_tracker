import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home as HomeIcon, Car, PiggyBank } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* Hero */}
      <div className="text-center pt-16 sm:pt-24 pb-16 sm:pb-20 opacity-0 animate-fade-in-up">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-primary mb-4">
          Wealth Analytics
        </p>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-5 leading-[1.1]">
          See how today's choices<br className="hidden sm:block" /> shape your wealth
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-8">
          Model financial decisions over 20-40 years. No sign-up, no fluff &mdash; just clear numbers.
        </p>
        <Link
          to="/buy-vs-rent"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          Buy vs Rent Calculator
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Calculators */}
      <div className="pb-16 sm:pb-24 opacity-0 animate-fade-in-up stagger-1">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">

          <Link to="/buy-vs-rent" className="card card-sweep group opacity-0 animate-fade-in-up stagger-1">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent-primary/20 transition-colors">
              <HomeIcon className="w-5 h-5 text-accent-primary" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1.5">Buy vs Rent</h3>
            <p className="text-sm text-text-tertiary mb-4 leading-relaxed">
              Same house &mdash; buy or rent? See the 20-year impact.
            </p>
            <span className="text-xs font-semibold text-accent-primary uppercase tracking-wider group-hover:text-accent-light transition-colors">
              Open Calculator
            </span>
          </Link>

          <div className="card opacity-0 animate-fade-in-up stagger-2 cursor-default">
            <div className="w-10 h-10 rounded-lg bg-border-subtle flex items-center justify-center mb-4">
              <Car className="w-5 h-5 text-text-muted" />
            </div>
            <h3 className="text-base font-semibold text-text-secondary mb-1.5">Car vs Invest</h3>
            <p className="text-sm text-text-tertiary mb-4 leading-relaxed">
              What's the true cost of that car over 10 years?
            </p>
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Coming Soon
            </span>
          </div>

          <div className="card opacity-0 animate-fade-in-up stagger-3 cursor-default">
            <div className="w-10 h-10 rounded-lg bg-border-subtle flex items-center justify-center mb-4">
              <PiggyBank className="w-5 h-5 text-text-muted" />
            </div>
            <h3 className="text-base font-semibold text-text-secondary mb-1.5">Contribution Impact</h3>
            <p className="text-sm text-text-tertiary mb-4 leading-relaxed">
              How do monthly contributions compound over time?
            </p>
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div className="border-t border-border-subtle py-6 text-center opacity-0 animate-fade-in-up stagger-4">
        <p className="text-xs text-text-muted">
          Free &middot; No sign-up &middot; Your data stays on your device
        </p>
      </div>
    </div>
  );
};

export default Home;
