import React, { useState } from 'react';
import { BuyVsRentResults } from '../types';
import { formatPercentage } from '../lib/formatters';
import { useRegionalConfig } from '../contexts/RegionalContext';
import { NetWorthChart } from './NetWorthChart';

interface BuyVsRentResultsProps {
  results: BuyVsRentResults;
  className?: string;
}

/**
 * Ultra-minimal Buy vs Rent results display
 * Features:
 * - Hero summary with large recommendation
 * - Key stats grid with staggered animations
 * - Side-by-side comparison cards (slideInLeft/Right)
 * - Interactive net worth chart
 * - Expandable year-by-year breakdown table
 */
export const BuyVsRentResultsDisplay: React.FC<BuyVsRentResultsProps> = ({
  results,
  className = '',
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const config = useRegionalConfig();
  const { currency } = config;

  const betterChoice = results.betterChoice;
  const isBuyBetter = betterChoice === 'buy';

  // Key metrics
  const totalDifference = Math.abs(results.difference);
  const percentageDifference =
    ((totalDifference / Math.max(results.finalBuyNetWorth, results.finalRentNetWorth)) * 100);

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Hero Summary */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="inline-block">
          <span className="label text-accent-primary">Recommendation</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary">
          {isBuyBetter ? 'Buying' : 'Renting'} is Better
        </h1>

        <div className="space-y-2">
          <div className={`hero-number text-5xl md:text-7xl ${
            isBuyBetter ? 'text-accent-primary' : 'text-accent-light'
          }`}>
            {currency.format(totalDifference, true)}
          </div>
          <p className="text-text-secondary text-lg">
            {isBuyBetter ? 'more net worth' : 'advantage'} after {results.buyBreakdown.length} years
          </p>
        </div>

        <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
          {results.summary}
        </p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Final Buy Net Worth */}
        <div className="card card-sweep opacity-0 animate-fade-in-up stagger-1">
          <div className="space-y-2">
            <div className="label">Buy Net Worth</div>
            <div className={`font-mono text-2xl font-bold ${
              isBuyBetter ? 'text-accent-primary' : 'text-text-primary'
            }`}>
              {currency.format(results.finalBuyNetWorth, true)}
            </div>
            <div className="text-xs text-text-tertiary">
              After {results.buyBreakdown.length} years
            </div>
          </div>
        </div>

        {/* Stat 2: Final Rent Net Worth */}
        <div className="card card-sweep opacity-0 animate-fade-in-up stagger-2">
          <div className="space-y-2">
            <div className="label">Rent Net Worth</div>
            <div className={`font-mono text-2xl font-bold ${
              !isBuyBetter ? 'text-accent-light' : 'text-text-primary'
            }`}>
              {currency.format(results.finalRentNetWorth, true)}
            </div>
            <div className="text-xs text-text-tertiary">
              After {results.rentBreakdown.length} years
            </div>
          </div>
        </div>

        {/* Stat 3: Difference */}
        <div className="card card-sweep opacity-0 animate-fade-in-up stagger-3">
          <div className="space-y-2">
            <div className="label">Difference</div>
            <div className="font-mono text-2xl font-bold text-success">
              {currency.format(totalDifference, true)}
            </div>
            <div className="text-xs text-text-tertiary">
              {formatPercentage(percentageDifference, 1)} advantage
            </div>
          </div>
        </div>

        {/* Stat 4: Break Even Year */}
        <div className="card card-sweep opacity-0 animate-fade-in-up stagger-4">
          <div className="space-y-2">
            <div className="label">Break Even</div>
            <div className="font-mono text-2xl font-bold text-text-primary">
              {results.breakEvenYear !== null ? `Year ${results.breakEvenYear}` : 'Never'}
            </div>
            <div className="text-xs text-text-tertiary">
              {results.breakEvenYear !== null
                ? 'When net worths cross'
                : 'Within time horizon'}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Buy Scenario Card */}
        <div className="opacity-0 animate-slide-in-left">
          <div className={`card card-sweep h-full ${
            isBuyBetter ? 'border-accent-primary shadow-glow-blue' : ''
          }`}>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-text-primary uppercase tracking-wider">
                  Buy Scenario
                </h3>
                {isBuyBetter && (
                  <span className="badge badge-success">Winner</span>
                )}
              </div>

              {/* Final numbers */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <div className="flex justify-between items-baseline">
                  <span className="label">Final Home Value</span>
                  <span className="font-mono text-lg text-text-primary">
                    {currency.format(
                      results.buyBreakdown[results.buyBreakdown.length - 1].homeValue, false
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="label">Mortgage Balance</span>
                  <span className="font-mono text-lg text-text-primary">
                    {currency.format(
                      results.buyBreakdown[results.buyBreakdown.length - 1].mortgageBalance, false
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="label">Total Equity</span>
                  <span className="font-mono text-lg text-accent-primary font-semibold">
                    {currency.format(
                      results.buyBreakdown[results.buyBreakdown.length - 1].equity, false
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="label">Total Costs Paid</span>
                  <span className="font-mono text-lg text-text-secondary">
                    {currency.format(
                      results.buyBreakdown[results.buyBreakdown.length - 1].cumulativeCosts, false
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-border-accent">
                  <div className="flex justify-between items-baseline">
                    <span className="label text-accent-primary">Final Net Worth</span>
                    <span className={`font-mono text-2xl font-bold ${
                      isBuyBetter ? 'text-accent-primary' : 'text-text-primary'
                    }`}>
                      {currency.format(results.finalBuyNetWorth, false)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rent Scenario Card */}
        <div className="opacity-0 animate-slide-in-right">
          <div className={`card card-sweep h-full ${
            !isBuyBetter ? 'border-accent-light shadow-glow-blue' : ''
          }`}>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-text-primary uppercase tracking-wider">
                  Rent Scenario
                </h3>
                {!isBuyBetter && (
                  <span className="badge badge-success">Winner</span>
                )}
              </div>

              {/* Final numbers */}
              <div className="space-y-4 pt-4 border-t border-border-subtle">
                <div className="flex justify-between items-baseline">
                  <span className="label">Final Monthly Rent</span>
                  <span className="font-mono text-lg text-text-primary">
                    {currency.format(
                      results.rentBreakdown[results.rentBreakdown.length - 1].monthlyRent, false
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="label">Total Rent Paid</span>
                  <span className="font-mono text-lg text-text-secondary">
                    {currency.format(
                      results.rentBreakdown[results.rentBreakdown.length - 1].cumulativeCosts, false
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="label">Investment Balance</span>
                  <span className="font-mono text-lg text-accent-light font-semibold">
                    {currency.format(
                      results.rentBreakdown[results.rentBreakdown.length - 1].investmentBalance, false
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="label">Estimated Growth</span>
                  <span className="font-mono text-lg text-success">
                    {currency.format(
                      results.rentBreakdown[results.rentBreakdown.length - 1].investmentBalance -
                      results.rentBreakdown[results.rentBreakdown.length - 1].cumulativeCosts, false
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-border-accent">
                  <div className="flex justify-between items-baseline">
                    <span className="label text-accent-light">Final Net Worth</span>
                    <span className={`font-mono text-2xl font-bold ${
                      !isBuyBetter ? 'text-accent-light' : 'text-text-primary'
                    }`}>
                      {currency.format(results.finalRentNetWorth, false)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Net Worth Chart */}
      <div className="card">
        <div className="space-y-6">
          <h3 className="font-display text-xl font-semibold text-text-primary uppercase tracking-wider text-center">
            Net Worth Over Time
          </h3>

          <NetWorthChart
            buyBreakdown={results.buyBreakdown}
            rentBreakdown={results.rentBreakdown}
          />
        </div>
      </div>

      {/* Year-by-Year Breakdown Table */}
      <div className="card">
        <div className="space-y-6">
          {/* Header with toggle */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between group"
          >
            <h3 className="font-display text-xl font-semibold text-text-primary uppercase tracking-wider">
              Year-by-Year Breakdown
            </h3>

            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary group-hover:text-accent-primary transition-colors">
                {showBreakdown ? 'Hide Details' : 'Show Details'}
              </span>
              <svg
                className={`w-5 h-5 text-text-secondary group-hover:text-accent-primary transition-all duration-300 ${
                  showBreakdown ? 'rotate-180' : ''
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Table */}
          {showBreakdown && (
            <div className="overflow-x-auto animate-fade-in-up">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="label text-left py-3 px-4">Year</th>
                    <th className="label text-right py-3 px-4">Buy Net Worth</th>
                    <th className="label text-right py-3 px-4">Rent Net Worth</th>
                    <th className="label text-right py-3 px-4">Difference</th>
                    <th className="label text-center py-3 px-4">Better</th>
                  </tr>
                </thead>
                <tbody>
                  {results.buyBreakdown.map((buyYear, index) => {
                    const rentYear = results.rentBreakdown[index];
                    const diff = rentYear.netWorth - buyYear.netWorth;
                    const isBuyBetterThisYear = buyYear.netWorth > rentYear.netWorth;

                    return (
                      <tr
                        key={buyYear.year}
                        className="border-b border-border-subtle hover:bg-bg-secondary transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-text-primary">
                          {buyYear.year}
                        </td>
                        <td className="number-cell py-3 px-4 text-text-primary">
                          {currency.format(buyYear.netWorth, false)}
                        </td>
                        <td className="number-cell py-3 px-4 text-text-primary">
                          {currency.format(rentYear.netWorth, false)}
                        </td>
                        <td className={`number-cell py-3 px-4 font-semibold ${
                          diff > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {currency.format(Math.abs(diff), false)}
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`badge ${
                            isBuyBetterThisYear ? 'badge-primary' : 'border-accent-light text-accent-light'
                          }`}>
                            {isBuyBetterThisYear ? 'Buy' : 'Rent'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
