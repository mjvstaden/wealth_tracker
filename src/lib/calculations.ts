/**
 * Financial calculation utilities
 * Core compound interest and scenario comparison logic
 */

import {
  ScenarioDetails,
  YearlyBreakdown,
  CalculationResult,
  BuyScenarioInputs,
  RentScenarioInputs,
  BuyVsRentInputs,
  BuyYearlyBreakdown,
  RentYearlyBreakdown,
  BuyVsRentResults
} from '../types';

/**
 * Calculate future value using compound interest formula
 * FV = P(1+r)^t + PMT × [((1+r)^t - 1) / r]
 *
 * @param principal - Initial amount
 * @param monthlyContribution - Monthly payment/investment
 * @param annualRate - Annual return rate (percentage, e.g., 7 for 7%)
 * @param years - Time horizon in years
 */
export function calculateFutureValue(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  // Future value of principal
  const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);

  // Future value of monthly contributions (annuity)
  const fvContributions = monthlyRate === 0
    ? monthlyContribution * months
    : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return fvPrincipal + fvContributions;
}

/**
 * Generate year-by-year breakdown of scenario
 */
export function generateYearlyBreakdown(
  scenario: ScenarioDetails
): YearlyBreakdown[] {
  const breakdown: YearlyBreakdown[] = [];

  for (let year = 1; year <= scenario.timeHorizon; year++) {
    const totalValue = calculateFutureValue(
      scenario.initialAmount,
      scenario.monthlyAmount,
      scenario.returnRate,
      year
    );

    const totalContributed = scenario.initialAmount + (scenario.monthlyAmount * 12 * year);
    const totalGrowth = totalValue - totalContributed;

    breakdown.push({
      year,
      totalValue: Math.round(totalValue * 100) / 100,
      totalContributed: Math.round(totalContributed * 100) / 100,
      totalGrowth: Math.round(totalGrowth * 100) / 100,
    });
  }

  return breakdown;
}

/**
 * Compare two scenarios and generate results
 */
export function compareScenarios(
  scenarioA: ScenarioDetails,
  scenarioB: ScenarioDetails
): CalculationResult {
  const breakdownA = generateYearlyBreakdown(scenarioA);
  const breakdownB = generateYearlyBreakdown(scenarioB);

  const finalValueA = breakdownA[breakdownA.length - 1].totalValue;
  const finalValueB = breakdownB[breakdownB.length - 1].totalValue;
  const difference = finalValueB - finalValueA;

  // Generate plain English summary
  const betterScenario = difference > 0 ? scenarioB.label : scenarioA.label;
  const worseScenario = difference > 0 ? scenarioA.label : scenarioB.label;
  const absDifference = Math.abs(difference);
  const timeHorizon = scenarioA.timeHorizon;

  const summary = `If you choose "${betterScenario}" instead of "${worseScenario}", you'll have $${absDifference.toLocaleString()} more after ${timeHorizon} years.`;

  return {
    scenarioA: breakdownA,
    scenarioB: breakdownB,
    difference: Math.round(difference * 100) / 100,
    summary,
  };
}

/**
 * ============================================================================
 * BUY VS RENT CALCULATIONS
 * ============================================================================
 */

/**
 * Calculate monthly mortgage payment using standard amortization formula
 * M = P × [r(1+r)^n] / [(1+r)^n - 1]
 *
 * @param principal - Loan amount (not home price, but home price - down payment)
 * @param annualRate - Annual interest rate as percentage (e.g., 6.5 for 6.5%)
 * @param years - Loan term in years
 * @returns Monthly mortgage payment (principal + interest only)
 *
 * Edge cases:
 * - If annualRate is 0, returns principal / total months (no interest)
 * - If principal is 0, returns 0
 *
 * Example: $320,000 loan at 6.5% for 30 years = $2,022.59/month
 */
export function calculateMonthlyMortgage(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal === 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  // Special case: 0% interest rate
  if (monthlyRate === 0) {
    return principal / months;
  }

  // Standard mortgage formula: M = P[r(1+r)^n]/[(1+r)^n - 1]
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const monthlyPayment = principal * (numerator / denominator);

  return Math.round(monthlyPayment * 100) / 100;
}

/**
 * Calculate mortgage amortization schedule
 *
 * @param principal - Loan amount
 * @param annualRate - Annual interest rate as percentage
 * @param years - Loan term in years
 * @returns Array of monthly payment breakdowns with principal/interest split and remaining balance
 *
 * Each entry contains:
 * - month: Month number (1-360 for 30-year mortgage)
 * - payment: Total payment amount
 * - principalPaid: Portion going to principal
 * - interestPaid: Portion going to interest
 * - remainingBalance: Remaining loan balance after payment
 *
 * Example output for month 1 of $320k at 6.5%:
 * { month: 1, payment: 2022.59, principalPaid: 289.26, interestPaid: 1733.33, remainingBalance: 319710.74 }
 */
export function calculateMortgageAmortization(
  principal: number,
  annualRate: number,
  years: number
): Array<{
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}> {
  const monthlyPayment = calculateMonthlyMortgage(principal, annualRate, years);
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const schedule: Array<{
    month: number;
    payment: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }> = [];

  let remainingBalance = principal;

  for (let month = 1; month <= months; month++) {
    const interestPaid = remainingBalance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    remainingBalance = remainingBalance - principalPaid;

    // Round to avoid floating point errors
    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principalPaid: Math.round(principalPaid * 100) / 100,
      interestPaid: Math.round(interestPaid * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100),
    });
  }

  return schedule;
}

/**
 * Calculate South African transfer duty using progressive brackets
 *
 * Transfer duty brackets (2024):
 * - R0 - R1,210,000: 0%
 * - R1,210,001 - R1,663,800: 3% of value above R1,210,000
 * - R1,663,801 - R2,329,300: R13,614 + 6% of value above R1,663,800
 * - R2,329,301 - R2,994,800: R53,544 + 8% of value above R2,329,300
 * - R2,994,801 - R13,310,000: R106,784 + 11% of value above R2,994,800
 * - R13,310,001+: R1,241,456 + 13% of value above R13,310,000
 *
 * @param propertyValue - Property value in Rands
 * @returns Transfer duty amount
 */
export function calculateSATransferDuty(propertyValue: number): number {
  if (propertyValue <= 1210000) {
    return 0;
  } else if (propertyValue <= 1663800) {
    return (propertyValue - 1210000) * 0.03;
  } else if (propertyValue <= 2329300) {
    return 13614 + (propertyValue - 1663800) * 0.06;
  } else if (propertyValue <= 2994800) {
    return 53544 + (propertyValue - 2329300) * 0.08;
  } else if (propertyValue <= 13310000) {
    return 106784 + (propertyValue - 2994800) * 0.11;
  } else {
    return 1241456 + (propertyValue - 13310000) * 0.13;
  }
}

/**
 * Calculate total costs for buying scenario in a given year
 *
 * Includes:
 * - Mortgage payment (principal + interest)
 * - Property tax (based on current home value with appreciation)
 * - Home insurance
 * - HOA fees
 * - Maintenance costs (based on current home value)
 *
 * Note: Year 0 includes down payment and closing costs
 *
 * @param inputs - Buy scenario inputs
 * @param year - Year number (0 = purchase year, 1 = first full year, etc.)
 * @param currentHomeValue - Current home value (with appreciation applied)
 * @returns Object with breakdown of all costs for the year
 */
export function calculateBuyingCosts(
  inputs: BuyScenarioInputs,
  year: number,
  currentHomeValue: number
): {
  downPayment: number;
  closingCosts: number;
  mortgagePayment: number;
  principalPaid: number;
  interestPaid: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  maintenance: number;
  totalCost: number;
  totalCostExcludingPrincipal: number;
} {
  const downPayment = year === 0 ? (inputs.homePrice * inputs.downPaymentPercent / 100) : 0;
  const closingCosts = year === 0 ? (inputs.homePrice * inputs.closingCostsPercent / 100) : 0;

  const loanAmount = inputs.homePrice - (inputs.homePrice * inputs.downPaymentPercent / 100);
  const monthlyMortgage = calculateMonthlyMortgage(loanAmount, inputs.interestRate, inputs.loanTermYears);
  const yearlyMortgage = monthlyMortgage * 12;

  // Calculate principal and interest breakdown for this year
  const amortization = calculateMortgageAmortization(loanAmount, inputs.interestRate, inputs.loanTermYears);
  const startMonth = year * 12;
  const endMonth = Math.min((year + 1) * 12, amortization.length);

  let yearlyPrincipal = 0;
  let yearlyInterest = 0;

  for (let month = startMonth; month < endMonth; month++) {
    if (month < amortization.length) {
      yearlyPrincipal += amortization[month].principalPaid;
      yearlyInterest += amortization[month].interestPaid;
    }
  }

  const propertyTax = currentHomeValue * inputs.propertyTaxRate / 100;
  const insurance = inputs.homeInsurance;
  const hoa = inputs.hoaFees * 12;
  const maintenance = currentHomeValue * inputs.maintenanceRate / 100;

  const totalCost = downPayment + closingCosts + yearlyMortgage + propertyTax + insurance + hoa + maintenance;

  // For net worth calculation, exclude principal payments (they increase equity)
  const totalCostExcludingPrincipal = downPayment + closingCosts + yearlyInterest + propertyTax + insurance + hoa + maintenance;

  return {
    downPayment: Math.round(downPayment * 100) / 100,
    closingCosts: Math.round(closingCosts * 100) / 100,
    mortgagePayment: Math.round(yearlyMortgage * 100) / 100,
    principalPaid: Math.round(yearlyPrincipal * 100) / 100,
    interestPaid: Math.round(yearlyInterest * 100) / 100,
    propertyTax: Math.round(propertyTax * 100) / 100,
    insurance: Math.round(insurance * 100) / 100,
    hoa: Math.round(hoa * 100) / 100,
    maintenance: Math.round(maintenance * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalCostExcludingPrincipal: Math.round(totalCostExcludingPrincipal * 100) / 100,
  };
}

/**
 * Calculate home equity at end of a given year
 *
 * Equity = Current Home Value - Remaining Mortgage Balance
 *
 * @param inputs - Buy scenario inputs
 * @param year - Year number (0 = purchase year)
 * @param currentHomeValue - Current home value with appreciation
 * @returns Equity amount
 */
export function calculateHomeEquity(
  inputs: BuyScenarioInputs,
  year: number,
  currentHomeValue: number
): number {
  const loanAmount = inputs.homePrice - (inputs.homePrice * inputs.downPaymentPercent / 100);
  const amortization = calculateMortgageAmortization(loanAmount, inputs.interestRate, inputs.loanTermYears);

  // Calculate which month we're at
  const monthsElapsed = (year + 1) * 12; // +1 because year 0 = first year

  // Get remaining balance from amortization schedule
  // If we've paid off the mortgage, balance is 0
  const remainingBalance = monthsElapsed >= amortization.length
    ? 0
    : amortization[Math.min(monthsElapsed - 1, amortization.length - 1)].remainingBalance;

  const equity = currentHomeValue - remainingBalance;
  return Math.round(equity * 100) / 100;
}

/**
 * Calculate total costs for renting scenario in a given year
 *
 * Includes:
 * - Monthly rent (with annual increases)
 * - Renters insurance
 *
 * @param inputs - Rent scenario inputs
 * @param year - Year number (0 = first year)
 * @returns Object with breakdown of renting costs
 */
export function calculateRentingCosts(
  inputs: RentScenarioInputs,
  year: number
): {
  monthlyRent: number;
  yearlyRent: number;
  rentersInsurance: number;
  totalCost: number;
} {
  // Calculate rent for this year (increases each year)
  const monthlyRent = inputs.monthlyRent * Math.pow(1 + inputs.rentIncreaseRate / 100, year);
  const yearlyRent = monthlyRent * 12;
  const rentersInsurance = inputs.rentersInsurance;
  const totalCost = yearlyRent + rentersInsurance;

  return {
    monthlyRent: Math.round(monthlyRent * 100) / 100,
    yearlyRent: Math.round(yearlyRent * 100) / 100,
    rentersInsurance: Math.round(rentersInsurance * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
}

/**
 * Calculate investment growth for renting scenario
 *
 * When renting, the renter invests:
 * 1. The down payment they would have made (invested at start)
 * 2. Monthly savings (difference between total buy costs and rent costs)
 *
 * Formula: Use compound interest with monthly contributions
 * FV = P(1+r)^t + PMT × [((1+r)^t - 1) / r]
 *
 * @param initialInvestment - Down payment + closing costs that would have been paid
 * @param monthlyInvestment - Monthly savings to invest
 * @param returnRate - Annual return rate as percentage (e.g., 7 for 7%)
 * @param years - Number of years
 * @returns Total investment value
 */
export function calculateInvestmentGrowth(
  initialInvestment: number,
  monthlyInvestment: number,
  returnRate: number,
  years: number
): number {
  return calculateFutureValue(initialInvestment, monthlyInvestment, returnRate, years);
}

/**
 * Main Buy vs Rent comparison function
 *
 * Calculates year-by-year breakdown for both scenarios and determines which is better.
 *
 * Assumptions:
 * - Monthly compounding for investments
 * - Annual compounding for home appreciation and rent increases
 * - Mortgage payments include principal and interest only (taxes/insurance separate)
 * - Property tax and maintenance based on current home value (with appreciation)
 * - Renter invests down payment at start, then monthly difference
 * - Final year includes selling costs for buyer
 *
 * @param inputs - Complete buy vs rent inputs
 * @returns Full comparison results with breakdowns and summary
 */
export function compareBuyVsRent(inputs: BuyVsRentInputs): BuyVsRentResults {
  const buyBreakdown: BuyYearlyBreakdown[] = [];
  const rentBreakdown: RentYearlyBreakdown[] = [];

  // Calculate initial values
  const downPayment = inputs.buyInputs.homePrice * inputs.buyInputs.downPaymentPercent / 100;
  const closingCosts = inputs.buyInputs.homePrice * inputs.buyInputs.closingCostsPercent / 100;

  // IMPORTANT: Renters only invest the down payment they saved by not buying
  // They don't pay closing costs (transfer duty, bond fees, lawyer fees)
  const renterInitialInvestment = downPayment;

  let buyCumulativeCosts = 0;
  let rentCumulativeCosts = 0;
  let previousBuyMonthlyCost = 0;
  let previousRentMonthlyCost = 0;

  // Year-by-year breakdown
  for (let year = 0; year < inputs.timeHorizonYears; year++) {
    // Calculate current home value with appreciation
    const currentHomeValue = inputs.buyInputs.homePrice * Math.pow(1 + inputs.buyInputs.appreciationRate / 100, year);

    // BUY SCENARIO
    const buyCosts = calculateBuyingCosts(inputs.buyInputs, year, currentHomeValue);

    // Track cumulative costs for display purposes
    buyCumulativeCosts += buyCosts.totalCostExcludingPrincipal;

    const equity = calculateHomeEquity(inputs.buyInputs, year, currentHomeValue);

    // Net Worth = Assets - Liabilities
    // For buyer: Assets = Equity (Home Value - Mortgage Balance), Liabilities = 0
    const buyNetWorth = equity;

    buyBreakdown.push({
      year: year + 1,
      homeValue: Math.round(currentHomeValue * 100) / 100,
      mortgageBalance: Math.round((currentHomeValue - equity) * 100) / 100,
      equity: Math.round(equity * 100) / 100,
      yearlyMortgagePayment: buyCosts.mortgagePayment,
      yearlyPropertyTax: buyCosts.propertyTax,
      yearlyInsurance: buyCosts.insurance,
      yearlyHOA: buyCosts.hoa,
      yearlyMaintenance: buyCosts.maintenance,
      totalYearlyCost: buyCosts.totalCost,
      cumulativeCosts: Math.round(buyCumulativeCosts * 100) / 100,
      netWorth: Math.round(buyNetWorth * 100) / 100,
    });

    // RENT SCENARIO
    const rentCosts = calculateRentingCosts(inputs.rentInputs, year);
    rentCumulativeCosts += rentCosts.totalCost;

    // Calculate monthly investment
    // First year: invest down payment upfront, then monthly difference
    // Subsequent years: invest monthly difference
    let investmentBalance: number;

    if (year === 0) {
      // First year: down payment invested at start + monthly savings throughout year
      // Note: Renters invest the down payment they saved, NOT closing costs
      // IMPORTANT: Compare actual monthly costs (excluding principal, which builds equity)
      const buyMonthlyCost = buyCosts.totalCostExcludingPrincipal / 12;
      const rentMonthlyCost = rentCosts.totalCost / 12;
      const monthlySavings = Math.max(0, buyMonthlyCost - rentMonthlyCost);

      investmentBalance = calculateInvestmentGrowth(
        renterInitialInvestment,
        monthlySavings,
        inputs.investmentReturnRate,
        1
      );

      previousBuyMonthlyCost = buyMonthlyCost;
      previousRentMonthlyCost = rentMonthlyCost;
    } else {
      // Subsequent years: continue investing monthly difference
      // IMPORTANT: Compare actual monthly costs (excluding principal, which builds equity)
      const buyMonthlyCost = buyCosts.totalCostExcludingPrincipal / 12;
      const rentMonthlyCost = rentCosts.totalCost / 12;
      const monthlySavings = Math.max(0, buyMonthlyCost - rentMonthlyCost);

      // Get previous investment balance
      const previousBalance = rentBreakdown[year - 1].investmentBalance;

      // Grow previous balance for one year + new monthly contributions
      investmentBalance = calculateInvestmentGrowth(
        previousBalance,
        monthlySavings,
        inputs.investmentReturnRate,
        1
      );
    }

    // Net Worth = Assets - Liabilities
    // For renter: Assets = Investment Balance, Liabilities = 0
    const rentNetWorth = investmentBalance;

    rentBreakdown.push({
      year: year + 1,
      monthlyRent: rentCosts.monthlyRent,
      yearlyRent: rentCosts.yearlyRent,
      yearlyRentersInsurance: rentCosts.rentersInsurance,
      totalYearlyCost: rentCosts.totalCost,
      cumulativeCosts: Math.round(rentCumulativeCosts * 100) / 100,
      investmentBalance: Math.round(investmentBalance * 100) / 100,
      netWorth: Math.round(rentNetWorth * 100) / 100,
    });
  }

  // Find break-even year (when net worths cross over)
  let breakEvenYear: number | null = null;
  for (let i = 1; i < buyBreakdown.length; i++) {
    const prevBuyNW = buyBreakdown[i - 1].netWorth;
    const currBuyNW = buyBreakdown[i].netWorth;
    const prevRentNW = rentBreakdown[i - 1].netWorth;
    const currRentNW = rentBreakdown[i].netWorth;

    // Check if lines crossed
    if ((prevBuyNW <= prevRentNW && currBuyNW >= currRentNW) ||
        (prevBuyNW >= prevRentNW && currBuyNW <= currRentNW)) {
      breakEvenYear = i + 1;
      break;
    }
  }

  // Final results
  const finalBuyNetWorth = buyBreakdown[buyBreakdown.length - 1].netWorth;
  const finalRentNetWorth = rentBreakdown[rentBreakdown.length - 1].netWorth;
  const difference = finalRentNetWorth - finalBuyNetWorth;
  const betterChoice: 'buy' | 'rent' = difference > 0 ? 'rent' : 'buy';

  // Generate summary
  const absDifference = Math.abs(difference);
  const summary = betterChoice === 'rent'
    ? `After ${inputs.timeHorizonYears} years, renting and investing the difference would leave you $${absDifference.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} better off than buying.`
    : `After ${inputs.timeHorizonYears} years, buying would leave you $${absDifference.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} better off than renting.`;

  return {
    buyBreakdown,
    rentBreakdown,
    breakEvenYear,
    finalBuyNetWorth: Math.round(finalBuyNetWorth * 100) / 100,
    finalRentNetWorth: Math.round(finalRentNetWorth * 100) / 100,
    difference: Math.round(difference * 100) / 100,
    betterChoice,
    summary,
  };
}

/**
 * ============================================================================
 * SOUTH AFRICAN PROPERTY FEE CALCULATIONS
 * ============================================================================
 */

/**
 * Calculate South African transfer duty (property transfer tax)
 * Progressive tax rates based on property value as of 2024
 *
 * Tax brackets:
 * - R 0 - R 1,100,000: 0%
 * - R 1,100,001 - R 1,512,500: 3% on amount above R 1,100,000
 * - R 1,512,501 - R 2,117,500: R 12,375 + 6% on amount above R 1,512,500
 * - R 2,117,501 - R 2,722,500: R 48,675 + 8% on amount above R 2,117,500
 * - R 2,722,501 - R 12,100,000: R 97,075 + 11% on amount above R 2,722,500
 * - Above R 12,100,000: R 1,128,625 + 13% on amount above R 12,100,000
 *
 * Edge cases:
 * - Properties under R 1,100,000 pay no transfer duty
 * - Negative or zero property values return 0
 *
 * @param propertyValue - Value of the property in ZAR
 * @returns Transfer duty amount in ZAR (rounded to nearest Rand)
 *
 * @example
 * // R 1,000,000 property - below threshold
 * calculateTransferDuty(1_000_000); // Returns 0
 *
 * @example
 * // R 1,200,000 property - in first bracket
 * calculateTransferDuty(1_200_000); // Returns R 3,000 (3% of R 100,000 excess)
 *
 * @example
 * // R 2,500,000 property - in third bracket
 * calculateTransferDuty(2_500_000); // Returns R 79,275
 */
export function calculateTransferDuty(propertyValue: number): number {
  // Handle edge cases
  if (propertyValue <= 0) return 0;
  if (propertyValue <= 1_100_000) return 0;

  let duty = 0;

  // Bracket 1: R 1,100,001 - R 1,512,500 (3%)
  if (propertyValue > 1_100_000) {
    const bracket1Amount = Math.min(propertyValue - 1_100_000, 1_512_500 - 1_100_000);
    duty += bracket1Amount * 0.03;
  }

  // Bracket 2: R 1,512,501 - R 2,117,500 (6%)
  if (propertyValue > 1_512_500) {
    const bracket2Amount = Math.min(propertyValue - 1_512_500, 2_117_500 - 1_512_500);
    duty += bracket2Amount * 0.06;
  }

  // Bracket 3: R 2,117,501 - R 2,722,500 (8%)
  if (propertyValue > 2_117_500) {
    const bracket3Amount = Math.min(propertyValue - 2_117_500, 2_722_500 - 2_117_500);
    duty += bracket3Amount * 0.08;
  }

  // Bracket 4: R 2,722,501 - R 12,100,000 (11%)
  if (propertyValue > 2_722_500) {
    const bracket4Amount = Math.min(propertyValue - 2_722_500, 12_100_000 - 2_722_500);
    duty += bracket4Amount * 0.11;
  }

  // Bracket 5: Above R 12,100,000 (13%)
  if (propertyValue > 12_100_000) {
    const bracket5Amount = propertyValue - 12_100_000;
    duty += bracket5Amount * 0.13;
  }

  // Round to nearest Rand (no cents for fees)
  return Math.round(duty);
}

/**
 * Calculate South African bond registration fees
 * Based on the mortgage bond amount using attorney fee scale
 *
 * Fee scale:
 * - Up to R 600,000: 1.5% of bond amount
 * - R 600,001 - R 1,500,000: R 9,000 + 0.8% of amount above R 600,000
 * - Above R 1,500,000: R 16,200 + 0.4% of amount above R 1,500,000
 *
 * Edge cases:
 * - Zero bond amount (cash purchase) returns 0
 * - Negative bond amounts return 0
 *
 * @param bondAmount - Mortgage bond amount in ZAR
 * @returns Bond registration fee in ZAR (rounded to nearest Rand)
 *
 * @example
 * // R 500,000 bond
 * calculateBondRegistrationFees(500_000); // Returns R 7,500 (1.5% of R 500,000)
 *
 * @example
 * // R 1,000,000 bond
 * calculateBondRegistrationFees(1_000_000); // Returns R 12,200
 *
 * @example
 * // Cash purchase (no bond)
 * calculateBondRegistrationFees(0); // Returns 0
 */
export function calculateBondRegistrationFees(bondAmount: number): number {
  // Handle edge cases
  if (bondAmount <= 0) return 0;

  let fee = 0;

  // Up to R 600,000: 1.5%
  if (bondAmount <= 600_000) {
    fee = bondAmount * 0.015;
  }
  // R 600,001 - R 1,500,000: R 9,000 + 0.8% above R 600,000
  else if (bondAmount <= 1_500_000) {
    fee = 9_000 + (bondAmount - 600_000) * 0.008;
  }
  // Above R 1,500,000: R 16,200 + 0.4% above R 1,500,000
  else {
    fee = 16_200 + (bondAmount - 1_500_000) * 0.004;
  }

  // Round to nearest Rand
  return Math.round(fee);
}

/**
 * Calculate South African deeds office fees
 * Based on the property value
 *
 * This is an approximation of deeds office fees, which follow a similar
 * progressive scale to bond registration fees. Actual fees vary by province
 * and may include additional administrative costs.
 *
 * Fee scale (approximate):
 * - Up to R 600,000: 1% of property value
 * - R 600,001 - R 1,500,000: R 6,000 + 0.5% of amount above R 600,000
 * - Above R 1,500,000: R 10,500 + 0.25% of amount above R 1,500,000
 *
 * Edge cases:
 * - Zero or negative property value returns 0
 *
 * @param propertyValue - Property value in ZAR
 * @returns Deeds office fee in ZAR (rounded to nearest Rand)
 *
 * @example
 * // R 500,000 property
 * calculateDeedsOfficeFees(500_000); // Returns R 5,000 (1% of R 500,000)
 *
 * @example
 * // R 2,000,000 property
 * calculateDeedsOfficeFees(2_000_000); // Returns R 11,750
 */
export function calculateDeedsOfficeFees(propertyValue: number): number {
  // Handle edge cases
  if (propertyValue <= 0) return 0;

  let fee = 0;

  // Up to R 600,000: 1%
  if (propertyValue <= 600_000) {
    fee = propertyValue * 0.01;
  }
  // R 600,001 - R 1,500,000: R 6,000 + 0.5% above R 600,000
  else if (propertyValue <= 1_500_000) {
    fee = 6_000 + (propertyValue - 600_000) * 0.005;
  }
  // Above R 1,500,000: R 10,500 + 0.25% above R 1,500,000
  else {
    fee = 10_500 + (propertyValue - 1_500_000) * 0.0025;
  }

  // Round to nearest Rand
  return Math.round(fee);
}

/**
 * Calculate total South African property purchase fees
 * Includes all costs when purchasing property in South Africa
 *
 * Components:
 * - Transfer duty: Progressive tax on property value (only if applicable)
 * - Bond registration fee: Cost to register the mortgage bond (0 if cash purchase)
 * - Deeds office fee: Cost to transfer property ownership
 *
 * Note: Transfer duty is NOT paid if purchasing with a bond from a bank
 * (bank purchases are VAT-exempt but don't pay transfer duty on new builds)
 * This function calculates transfer duty for non-VAT properties only.
 *
 * Assumptions:
 * - Property is existing (not new build subject to VAT)
 * - Fees are based on 2024 rates
 * - Does not include conveyancing attorney fees (variable)
 * - Does not include bank initiation fees (variable)
 *
 * @param propertyValue - Property value in ZAR
 * @param bondAmount - Mortgage bond amount in ZAR (0 if cash purchase)
 * @returns Object with breakdown of all fees
 *
 * @example
 * // R 2,000,000 property with R 1,600,000 bond (20% down payment)
 * calculateSouthAfricanPurchaseFees(2_000_000, 1_600_000);
 * // Returns {
 * //   transferDuty: 38_775,
 * //   bondRegistrationFee: 16_600,
 * //   deedsOfficeFee: 11_750,
 * //   totalFees: 67_125
 * // }
 *
 * @example
 * // R 1,000,000 cash purchase (no bond)
 * calculateSouthAfricanPurchaseFees(1_000_000, 0);
 * // Returns {
 * //   transferDuty: 0,
 * //   bondRegistrationFee: 0,
 * //   deedsOfficeFee: 10_000,
 * //   totalFees: 10_000
 * // }
 */
export function calculateSouthAfricanPurchaseFees(
  propertyValue: number,
  bondAmount: number
): {
  transferDuty: number;
  bondRegistrationFee: number;
  deedsOfficeFee: number;
  totalFees: number;
} {
  // Handle edge cases
  if (propertyValue <= 0) {
    return {
      transferDuty: 0,
      bondRegistrationFee: 0,
      deedsOfficeFee: 0,
      totalFees: 0,
    };
  }

  const transferDuty = calculateTransferDuty(propertyValue);
  const bondRegistrationFee = calculateBondRegistrationFees(bondAmount);
  const deedsOfficeFee = calculateDeedsOfficeFees(propertyValue);
  const totalFees = transferDuty + bondRegistrationFee + deedsOfficeFee;

  return {
    transferDuty,
    bondRegistrationFee,
    deedsOfficeFee,
    totalFees,
  };
}
