import React, { useState } from 'react';
import { BuyVsRentResults, BuyVsRentInputs } from '../types';
import { formatPercentage } from '../lib/formatters';
import { useRegionalConfig } from '../contexts/RegionalContext';
import { NetWorthChart } from './NetWorthChart';

interface BuyVsRentResultsProps {
  results: BuyVsRentResults;
  inputs: BuyVsRentInputs;
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
  inputs,
  className = '',
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const config = useRegionalConfig();
  const { currency } = config;

  const betterChoice = results.betterChoice;
  const isBuyBetter = betterChoice === 'buy';
  const timeHorizon = inputs.timeHorizonYears;

  // Key metrics
  const totalDifference = Math.abs(results.difference);
  const percentageDifference =
    ((totalDifference / Math.max(results.finalBuyNetWorth, results.finalRentNetWorth)) * 100);

  // Calculate one-time costs
  const downPayment = inputs.buyInputs.homePrice * (inputs.buyInputs.downPaymentPercent / 100);
  const closingCosts = inputs.buyInputs.closingCosts;

  // Calculate total ongoing costs for buying (sum across all years)
  const totalMortgagePayments = results.buyBreakdown.reduce((sum, year) => sum + year.yearlyMortgagePayment, 0);
  const totalPropertyTax = results.buyBreakdown.reduce((sum, year) => sum + year.yearlyPropertyTax, 0);
  const totalInsurance = results.buyBreakdown.reduce((sum, year) => sum + year.yearlyInsurance, 0);
  const totalHOA = results.buyBreakdown.reduce((sum, year) => sum + year.yearlyHOA, 0);
  const totalMaintenance = results.buyBreakdown.reduce((sum, year) => sum + year.yearlyMaintenance, 0);
  const totalBuyingCosts = totalMortgagePayments + totalPropertyTax + totalInsurance + totalHOA + totalMaintenance;

  // Calculate next year costs (after mortgage is paid off)
  // Home value in next year with one more year of appreciation
  const finalYearData = results.buyBreakdown[results.buyBreakdown.length - 1];
  const nextYearHomeValue = finalYearData.homeValue * (1 + inputs.buyInputs.appreciationRate / 100);

  // Property tax and maintenance are based on home value (annual)
  const nextYearPropertyTax = nextYearHomeValue * inputs.buyInputs.propertyTaxRate / 100;
  const nextYearMaintenance = nextYearHomeValue * inputs.buyInputs.maintenanceRate / 100;

  // Insurance and HOA (annual values)
  const nextYearInsurance = nextYearHomeValue * inputs.buyInputs.homeInsuranceRate / 100;
  const nextYearHOA = inputs.buyInputs.hoaFees;

  const nextYearTotalAnnual = nextYearPropertyTax + nextYearInsurance + nextYearHOA + nextYearMaintenance;

  // Calculate renter totals
  const totalRentPaid = results.rentBreakdown.reduce((sum, year) => sum + year.annualRent, 0);
  const renterInitialInvestment = downPayment + closingCosts;

  // Calculate total investment contributions (sum of monthly savings over 20 years)
  // For each year: contributions = (buy costs - rent costs) invested
  let totalInvestmentContributions = 0;
  for (let i = 0; i < results.buyBreakdown.length; i++) {
    const buyYear = results.buyBreakdown[i];
    const rentYear = results.rentBreakdown[i];

    if (buyYear.year === 0) {
      // Year 0: no contributions, just initial investment
      continue;
    }

    // Calculate buy costs for comparison (excluding principal payments which build equity)
    let buyCostsForYear = buyYear.yearlyMortgagePayment + buyYear.yearlyPropertyTax +
                          buyYear.yearlyInsurance + buyYear.yearlyHOA + buyYear.yearlyMaintenance;

    // For year 1, the calculation already excluded down payment and closing costs in the loop
    // but we need to match what was actually used in the investment calculation
    if (buyYear.year === 1) {
      // Year 1: buy costs don't include down payment/closing costs (those are in year 0)
      // The costs are already correct from the breakdown
      buyCostsForYear = buyYear.totalYearlyCost - downPayment - closingCosts;
    }

    const rentCostsForYear = rentYear.annualRent + rentYear.yearlyRentersInsurance;
    const yearlyContribution = Math.max(0, buyCostsForYear - rentCostsForYear);
    totalInvestmentContributions += yearlyContribution;
  }

  // Calculate renter investment totals
  const totalInvestmentBalance = results.rentBreakdown[results.rentBreakdown.length - 1].investmentBalance;
  const totalMoneyInvested = renterInitialInvestment + totalInvestmentContributions;
  const totalInvestmentGrowth = totalInvestmentBalance - totalMoneyInvested;

  // Calculate buyer's investment contributions (when rent > buy costs)
  // Use interest-only costs (excluding principal) since principal builds equity
  let buyerTotalContributions = 0;
  for (let i = 0; i < results.buyBreakdown.length; i++) {
    const buyYear = results.buyBreakdown[i];
    const rentYear = results.rentBreakdown[i];

    if (buyYear.year === 0) continue;

    // Use interest-only (not full mortgage) since principal builds equity
    // This matches the core calculation logic in calculations.ts
    const buyCostsForYear = buyYear.yearlyInterest + buyYear.yearlyPropertyTax +
                            buyYear.yearlyInsurance + buyYear.yearlyHOA + buyYear.yearlyMaintenance;

    const rentCostsForYear = rentYear.annualRent + rentYear.yearlyRentersInsurance;

    // Buyer invests when their costs are less than renter's
    const buyerYearlyContribution = Math.max(0, rentCostsForYear - buyCostsForYear);
    buyerTotalContributions += buyerYearlyContribution;
  }

  // Calculate buyer investment totals
  const buyerInvestmentBalance = results.buyBreakdown[results.buyBreakdown.length - 1].investmentBalance;
  const buyerInvestmentGrowth = buyerInvestmentBalance - buyerTotalContributions;

  // Calculate next year rent (after time horizon years of increases)
  const finalMonthlyRent = results.rentBreakdown[results.rentBreakdown.length - 1].monthlyRent;
  const nextYearMonthlyRent = finalMonthlyRent * (1 + inputs.rentInputs.rentIncreaseRate / 100);
  const nextYearAnnualRent = nextYearMonthlyRent * 12;

  return (
    <div className={`space-y-8 sm:space-y-12 overflow-x-hidden ${className}`}>
      {/* Hero Summary */}
      <div className="text-center space-y-4 sm:space-y-6 animate-fade-in-up">
        <div className="inline-block">
          <span className="label text-accent-primary text-xs sm:text-sm">Recommendation</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-text-primary">
          {isBuyBetter ? 'Buying' : 'Renting'} is Better
        </h1>

        <div className="space-y-2">
          <div className={`hero-number text-3xl sm:text-5xl md:text-7xl ${
            isBuyBetter ? 'text-accent-primary' : 'text-accent-light'
          }`}>
            {currency.format(totalDifference, true)}
          </div>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg">
            {isBuyBetter ? 'more net worth' : 'advantage'} after {results.buyBreakdown.length} years
          </p>
        </div>

        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
          {results.summary}
        </p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Stat 1: Final Buy Net Worth */}
        <div className="card card-sweep opacity-0 animate-fade-in-up stagger-1">
          <div className="space-y-1 sm:space-y-2">
            <div className="label text-xs">Buy Net Worth</div>
            <div className={`font-mono text-lg sm:text-xl lg:text-2xl font-bold ${
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
          <div className="space-y-1 sm:space-y-2">
            <div className="label text-xs">Rent Net Worth</div>
            <div className={`font-mono text-lg sm:text-xl lg:text-2xl font-bold ${
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
          <div className="space-y-1 sm:space-y-2">
            <div className="label text-xs">Difference</div>
            <div className="font-mono text-lg sm:text-xl lg:text-2xl font-bold text-success">
              {currency.format(totalDifference, true)}
            </div>
            <div className="text-xs text-text-tertiary">
              {formatPercentage(percentageDifference, 1)} advantage
            </div>
          </div>
        </div>

        {/* Stat 4: Break Even Year */}
        <div className="card card-sweep opacity-0 animate-fade-in-up stagger-4">
          <div className="space-y-1 sm:space-y-2">
            <div className="label text-xs">Break Even</div>
            <div className="font-mono text-lg sm:text-xl lg:text-2xl font-bold text-text-primary">
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

      {/* Side-by-Side Comparison - Single Card */}
      <div className="card opacity-0 animate-fade-in-up stagger-2 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-border-default">

          {/* BUY SCENARIO */}
          <div className="space-y-4 sm:space-y-6 pt-6 lg:pt-0">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-text-primary uppercase tracking-wider">
                Buying
              </h3>
              {isBuyBetter && (
                <span className="badge badge-success text-xs">Winner</span>
              )}
            </div>

            {/* One-Time Costs */}
            <div className="space-y-2 sm:space-y-3">
              <div className="label text-accent-primary uppercase tracking-wider text-xs">One-Time Costs</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Down Payment</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(downPayment, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Closing Costs</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(closingCosts, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Annual Costs After Mortgage Paid Off */}
            <div className="space-y-2 sm:space-y-3">
              <div className="label text-accent-primary uppercase tracking-wider text-xs">Annual Costs (After Paid Off)</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Bond Payment</span>
                  <span className="font-mono text-success">
                    {currency.format(0, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Property Tax</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(nextYearPropertyTax, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Insurance</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(nextYearInsurance, false)}
                  </span>
                </div>
                {nextYearHOA > 0 && (
                  <div className="flex justify-between items-baseline text-xs sm:text-sm">
                    <span className="text-text-secondary">Levies</span>
                    <span className="font-mono text-text-primary">
                      {currency.format(nextYearHOA, false)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Maintenance</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(nextYearMaintenance, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm pt-2 border-t border-border-subtle font-semibold">
                  <span className="text-text-primary">Total Annual</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(nextYearTotalAnnual, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Costs Over Time Horizon */}
            <div className="space-y-2 sm:space-y-3">
              <div className="label text-accent-primary uppercase tracking-wider text-xs">Total Costs ({timeHorizon} Years)</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Mortgage Payments</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalMortgagePayments, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Property Tax</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalPropertyTax, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Insurance</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalInsurance, false)}
                  </span>
                </div>
                {totalHOA > 0 && (
                  <div className="flex justify-between items-baseline text-xs sm:text-sm">
                    <span className="text-text-secondary">HOA/Levies</span>
                    <span className="font-mono text-text-primary">
                      {currency.format(totalHOA, false)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Maintenance</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalMaintenance, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm pt-2 border-t border-border-subtle font-semibold">
                  <span className="text-text-primary">Total Paid</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalBuyingCosts, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Final Position */}
            <div className="space-y-2 sm:space-y-3 pt-4 border-t border-border-accent">
              <div className="label text-accent-primary uppercase tracking-wider text-xs">Final Position</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Home Value</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(results.buyBreakdown[results.buyBreakdown.length - 1].homeValue, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Mortgage Balance</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(results.buyBreakdown[results.buyBreakdown.length - 1].mortgageBalance, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Home Equity</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(results.buyBreakdown[results.buyBreakdown.length - 1].equity, false)}
                  </span>
                </div>
                {buyerInvestmentBalance > 0 && (
                  <>
                    <div className="flex justify-between items-baseline text-xs sm:text-sm pt-2 border-t border-border-subtle">
                      <span className="text-text-secondary">Monthly Contributions</span>
                      <span className="font-mono text-text-primary">
                        {currency.format(buyerTotalContributions, false)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
                      <span className="text-text-secondary">Investment Growth</span>
                      <span className="font-mono text-success">
                        {currency.format(buyerInvestmentGrowth, false)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
                      <span className="text-text-secondary">Total Investment Value</span>
                      <span className="font-mono text-text-primary">
                        {currency.format(buyerInvestmentBalance, false)}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-baseline text-xs sm:text-sm pt-2 border-t border-border-subtle font-semibold">
                  <span className="text-accent-primary">NET WORTH</span>
                  <span className={`font-mono text-lg sm:text-2xl font-bold ${
                    isBuyBetter ? 'text-accent-primary' : 'text-text-primary'
                  }`}>
                    {currency.format(results.finalBuyNetWorth, true)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RENT SCENARIO */}
          <div className="space-y-4 sm:space-y-6 pt-6 lg:pt-0 lg:pl-6 xl:pl-12">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-text-primary uppercase tracking-wider">
                Renting
              </h3>
              {!isBuyBetter && (
                <span className="badge badge-success text-xs">Winner</span>
              )}
            </div>

            {/* One-Time Costs */}
            <div className="space-y-2 sm:space-y-3">
              <div className="label text-accent-light uppercase tracking-wider text-xs">Initial Investment</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Once Off Cost Saved</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(renterInitialInvestment, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm text-text-tertiary">
                  <span className="text-xs italic">Invested immediately instead of buying - Down Payment + Closing Cost</span>
                </div>
              </div>
            </div>

            {/* Monthly Rent After Time Horizon */}
            <div className="space-y-2 sm:space-y-3">
              <div className="label text-accent-light uppercase tracking-wider text-xs">Monthly Rent (Year {timeHorizon + 1})</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Monthly Rent</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(nextYearMonthlyRent, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm pt-2 border-t border-border-subtle font-semibold">
                  <span className="text-text-primary">Annual Total</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(nextYearAnnualRent, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Rent Paid */}
            <div className="space-y-2 sm:space-y-3">
              <div className="label text-accent-light uppercase tracking-wider text-xs">Total Rent ({timeHorizon} Years)</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Total Rent Paid</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalRentPaid, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Final Position */}
            <div className="space-y-2 sm:space-y-3 pt-4 border-t border-border-accent">
              <div className="label text-accent-light uppercase tracking-wider text-xs">Final Position</div>
              <div className="bg-bg-elevated rounded-md p-3 sm:p-4 space-y-2">
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Initial Investment</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(renterInitialInvestment, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Monthly Contributions</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalInvestmentContributions, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Investment Growth</span>
                  <span className="font-mono text-success">
                    {currency.format(totalInvestmentGrowth, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm">
                  <span className="text-text-secondary">Total Investment Value</span>
                  <span className="font-mono text-text-primary">
                    {currency.format(totalInvestmentBalance, false)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs sm:text-sm pt-2 border-t border-border-subtle font-semibold">
                  <span className="text-accent-light">NET WORTH</span>
                  <span className={`font-mono text-lg sm:text-2xl font-bold ${
                    !isBuyBetter ? 'text-accent-light' : 'text-text-primary'
                  }`}>
                    {currency.format(results.finalRentNetWorth, true)}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Net Worth Chart */}
      <div className="card">
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-text-primary uppercase tracking-wider text-center px-4">
            Net Worth Over Time
          </h3>

          <div className="w-full overflow-x-auto">
            <div className="min-w-full px-4">
              <NetWorthChart
                buyBreakdown={results.buyBreakdown}
                rentBreakdown={results.rentBreakdown}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-Year Breakdown Table */}
      <div className="bg-bg-secondary border border-border-default rounded-md overflow-hidden">
        {/* Header with toggle */}
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full flex items-center justify-between group p-6"
        >
          <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-text-primary uppercase tracking-wider">
            Year-by-Year Breakdown
          </h3>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-text-secondary group-hover:text-accent-primary transition-colors">
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

        {/* Table - Outside padding context */}
        {showBreakdown && (
          <div className="w-full overflow-x-auto animate-fade-in-up border-t border-border-subtle">
            <table className="w-full text-xs">
              <thead>
                  <tr className="border-b border-border-default">
                    <th className="label text-left py-2 px-1 sm:px-4">Yr</th>
                    <th className="label text-right py-2 px-1 sm:px-4">Buy</th>
                    <th className="label text-right py-2 px-1 sm:px-4">Rent</th>
                    <th className="label text-right py-2 px-1 sm:px-4">Diff</th>
                    <th className="label text-center py-2 px-1 sm:px-4">Winner</th>
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
                        <td className="py-2 px-1 sm:px-4 font-mono text-text-primary">
                          {buyYear.year}
                        </td>
                        <td className="number-cell py-2 px-1 sm:px-4 text-text-primary text-xs">
                          {currency.format(buyYear.netWorth, true)}
                        </td>
                        <td className="number-cell py-2 px-1 sm:px-4 text-text-primary text-xs">
                          {currency.format(rentYear.netWorth, true)}
                        </td>
                        <td className={`number-cell py-2 px-1 sm:px-4 font-semibold text-xs ${
                          diff > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {currency.format(Math.abs(diff), true)}
                        </td>
                        <td className="text-center py-2 px-1 sm:px-4">
                          <span className={`text-xs font-medium ${
                            isBuyBetterThisYear ? 'text-accent-primary' : 'text-accent-light'
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
  );
};
