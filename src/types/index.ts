/**
 * Type definitions for True North Wealth Analytics
 */

export interface Scenario {
  id: string;
  name: string;
  type: 'buy-vs-rent' | 'car-vs-invest' | 'contribution' | 'custom';
  scenarioA: ScenarioDetails;
  scenarioB: ScenarioDetails;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScenarioDetails {
  label: string;
  initialAmount: number;
  monthlyAmount: number;
  returnRate: number;
  timeHorizon: number;
}

export interface CalculationResult {
  scenarioA: YearlyBreakdown[];
  scenarioB: YearlyBreakdown[];
  difference: number;
  summary: string;
}

export interface YearlyBreakdown {
  year: number;
  totalValue: number;
  totalContributed: number;
  totalGrowth: number;
}

export type ScenarioType = 'buy-vs-rent' | 'car-vs-invest' | 'contribution' | 'custom';

/**
 * Buy vs Rent Calculation Types
 */

export interface BuyScenarioInputs {
  homePrice: number;                // Total home price
  downPaymentPercent: number;       // Down payment as percentage (e.g., 20 for 20%)
  interestRate: number;             // Annual mortgage interest rate (e.g., 6.5 for 6.5%)
  loanTermYears: number;            // Mortgage term in years (typically 15 or 30)
  propertyTaxRate: number;          // Annual property tax as percentage of home value (e.g., 1.2 for 1.2%)
  homeInsurance: number;            // Annual home insurance cost in dollars
  hoaFees: number;                  // Monthly HOA fees in dollars
  maintenanceRate: number;          // Annual maintenance as percentage of home value (e.g., 1 for 1%)
  appreciationRate: number;         // Annual home appreciation rate (e.g., 3 for 3%)
  closingCostsPercent: number;      // Closing costs as percentage of home price (e.g., 3 for 3%)
  sellingCostsPercent: number;      // Selling costs as percentage of sale price (e.g., 6 for 6%)
}

export interface RentScenarioInputs {
  monthlyRent: number;              // Initial monthly rent
  rentIncreaseRate: number;         // Annual rent increase rate (e.g., 3 for 3%)
  rentersInsurance: number;         // Annual renters insurance cost in dollars
}

export interface BuyVsRentInputs {
  buyInputs: BuyScenarioInputs;
  rentInputs: RentScenarioInputs;
  investmentReturnRate: number;    // Annual return rate for invested savings (e.g., 7 for 7%)
  timeHorizonYears: number;         // Analysis period in years
}

export interface BuyYearlyBreakdown {
  year: number;
  homeValue: number;                // Current home value with appreciation
  mortgageBalance: number;          // Remaining mortgage balance
  equity: number;                   // Home equity (value - balance)
  yearlyMortgagePayment: number;    // Total mortgage payments for the year
  yearlyPropertyTax: number;        // Property tax for the year
  yearlyInsurance: number;          // Home insurance for the year
  yearlyHOA: number;                // HOA fees for the year
  yearlyMaintenance: number;        // Maintenance costs for the year
  totalYearlyCost: number;          // Sum of all costs for the year
  cumulativeCosts: number;          // Total costs paid from year 0 to this year
  investmentBalance: number;        // Investment balance (grows after mortgage is paid off)
  netWorth: number;                 // Equity + investment balance
}

export interface RentYearlyBreakdown {
  year: number;
  monthlyRent: number;              // Monthly rent for this year
  yearlyRent: number;               // Total rent for the year
  yearlyRentersInsurance: number;   // Renters insurance for the year
  totalYearlyCost: number;          // Total renting costs for the year
  cumulativeCosts: number;          // Total rent paid from year 0 to this year
  investmentBalance: number;        // Value of invested savings
  netWorth: number;                 // Investment balance - cumulative costs
}

export interface BuyVsRentResults {
  buyBreakdown: BuyYearlyBreakdown[];
  rentBreakdown: RentYearlyBreakdown[];
  breakEvenYear: number | null;    // Year when net worths are equal (null if never)
  finalBuyNetWorth: number;         // Final net worth if buying
  finalRentNetWorth: number;        // Final net worth if renting
  difference: number;               // Rent net worth - Buy net worth (positive means renting is better)
  betterChoice: 'buy' | 'rent';
  summary: string;                  // Plain English explanation
}
