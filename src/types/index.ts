export interface BuyScenarioInputs {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  homeInsuranceRate: number;
  hoaFees: number;
  maintenanceRate: number;
  appreciationRate: number;
  closingCosts: number;
  sellingCostsPercent: number;
}

export interface RentScenarioInputs {
  monthlyRent: number;
  rentIncreaseRate: number;
  rentersInsurance: number;
}

export interface BuyVsRentInputs {
  buyInputs: BuyScenarioInputs;
  rentInputs: RentScenarioInputs;
  investmentReturnRate: number;
  timeHorizonYears: number;
}

export interface BuyYearlyBreakdown {
  year: number;
  homeValue: number;
  mortgageBalance: number;
  equity: number;
  yearlyMortgagePayment: number;
  yearlyPrincipal: number;
  yearlyInterest: number;
  yearlyPropertyTax: number;
  yearlyInsurance: number;
  yearlyHOA: number;
  yearlyMaintenance: number;
  totalYearlyCost: number;
  cumulativeCosts: number;
  investmentBalance: number;
  netWorth: number;
}

export interface RentYearlyBreakdown {
  year: number;
  monthlyRent: number;
  annualRent: number;
  yearlyRentersInsurance: number;
  totalYearlyCost: number;
  cumulativeCosts: number;
  investmentBalance: number;
  netWorth: number;
}

export interface BuyVsRentResults {
  buyBreakdown: BuyYearlyBreakdown[];
  rentBreakdown: RentYearlyBreakdown[];
  breakEvenYear: number | null;
  finalBuyNetWorth: number;
  finalRentNetWorth: number;
  difference: number;
  betterChoice: 'buy' | 'rent';
  summary: string;
}
