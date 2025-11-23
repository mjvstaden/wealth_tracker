import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BuyVsRentForm } from '../components/BuyVsRentForm';
import { BuyVsRentResultsDisplay } from '../components/BuyVsRentResults';
import { RegionSelector } from '../components/RegionSelector';
import { BuyVsRentInputs, BuyVsRentResults } from '../types';
import { compareBuyVsRent } from '../lib/calculations';
import { useRegional } from '../contexts/RegionalContext';

/**
 * Buy vs Rent comparison page
 * Users input their scenarios and see side-by-side comparison
 */
const BuyVsRent: React.FC = () => {
  const { config } = useRegional();
  const [results, setResults] = useState<BuyVsRentResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (inputs: BuyVsRentInputs) => {
    // Run the comparison calculation
    const calculationResults = compareBuyVsRent(inputs);
    setResults(calculationResults);
    setShowResults(true);

    // Scroll to results
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 opacity-0 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <RegionSelector />
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-3">
          Buy vs Rent Analysis
          <span className="text-accent-primary ml-3">({config.name})</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Compare the financial impact of buying a home versus renting and investing the difference.
          All values in <span className="font-semibold text-text-primary">{config.currency.code}</span>.
        </p>
      </div>

      {/* Input Form */}
      <div className="opacity-0 animate-fade-in-up stagger-1">
        <BuyVsRentForm onSubmit={handleCalculate} />
      </div>

      {/* Results Section */}
      {showResults && results && (
        <div id="results" className="mt-12 opacity-0 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">
              Comparison Results
            </h2>
            <button
              onClick={handleReset}
              className="btn-secondary"
            >
              New Comparison
            </button>
          </div>
          <BuyVsRentResultsDisplay results={results} />
        </div>
      )}

      {/* Empty State - Show when no results yet */}
      {!showResults && (
        <div className="mt-12 text-center opacity-0 animate-fade-in-up stagger-2">
          <div className="bg-bg-secondary border border-border-default rounded-md p-12">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Ready to Compare?
            </h3>
            <p className="text-text-secondary">
              Fill out the form above and click "Compare Scenarios" to see your results.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyVsRent;
