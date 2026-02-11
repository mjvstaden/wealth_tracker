import React, { useState } from 'react';
import { BuyVsRentForm } from '../components/BuyVsRentForm';
import { BuyVsRentResultsDisplay } from '../components/BuyVsRentResults';
import { BuyVsRentInputs, BuyVsRentResults } from '../types';
import { compareBuyVsRent } from '../lib/calculations';

const BuyVsRent: React.FC = () => {
  const [results, setResults] = useState<BuyVsRentResults | null>(null);
  const [inputs, setInputs] = useState<BuyVsRentInputs | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (calculationInputs: BuyVsRentInputs) => {
    const calculationResults = compareBuyVsRent(calculationInputs);
    setResults(calculationResults);
    setInputs(calculationInputs);
    setShowResults(true);

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleReset = () => {
    setShowResults(false);
    setResults(null);
    setInputs(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Form Section - narrower for focus */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        <div className="text-center mb-8 sm:mb-10 opacity-0 animate-fade-in-up">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-3">
            Same house. <span className="text-accent-primary">Buy</span> or <span className="text-accent-light">Rent</span>?
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto">
            Enter the price and rent for the same property. We'll show you the long-term financial impact.
          </p>
        </div>

        <div className="opacity-0 animate-fade-in-up stagger-1">
          <BuyVsRentForm onSubmit={handleCalculate} />
        </div>
      </div>

      {/* Results Section - wider for side-by-side */}
      {showResults && results && inputs && (
        <div id="results" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 opacity-0 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-6 pt-6 border-t border-border-subtle">
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
              Results
            </h2>
            <button
              onClick={handleReset}
              className="btn-secondary text-xs sm:text-sm py-2 px-4"
            >
              New Comparison
            </button>
          </div>
          <BuyVsRentResultsDisplay results={results} inputs={inputs} />
        </div>
      )}
    </div>
  );
};

export default BuyVsRent;
