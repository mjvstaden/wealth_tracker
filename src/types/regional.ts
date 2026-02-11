export type Region = 'ZA';

export interface CurrencyConfig {
  symbol: string;
  code: string;
  locale: string;
  format: (value: number, compact?: boolean) => string;
}

export interface RegionalTerminology {
  propertyTax: string;
  propertyTaxRate: string;
  hoaFees: string;
  closingCosts: string;
  sellingCosts: string;
  sellingCostsPercent: string;
  homeInsurance: string;
  rentersInsurance: string;
  downPayment: string;
  mortgage: string;
  rent: string;
}

export interface RegionalDefaults {
  buyInputs: {
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
  };
  rentInputs: {
    monthlyRent: number;
    rentIncreaseRate: number;
    rentersInsurance: number;
  };
  investmentReturnRate: number;
  timeHorizonYears: number;
}

export interface RegionalValidation {
  homePrice: { min: number; max: number };
  interestRate: { min: number; max: number; typical: number; warn: number };
  appreciationRate: { min: number; max: number; typical: number; warnHigh: number; warnLow: number };
  investmentReturnRate: { min: number; max: number; typical: number };
  propertyTaxRate: { min: number; max: number; typical: number };
  rentIncreaseRate: { min: number; max: number; typical: number };
}

export interface RegionalHelpText {
  interestRate: string;
  propertyTaxRate: string;
  appreciationRate: string;
  investmentReturnRate: string;
  closingCosts: string;
  sellingCosts: string;
  maintenanceRate: string;
}

export interface RegionalConfig {
  region: Region;
  name: string;
  currency: CurrencyConfig;
  terminology: RegionalTerminology;
  defaults: RegionalDefaults;
  validation: RegionalValidation;
  helpText: RegionalHelpText;
  features: {
    hasTransferDuty: boolean;
    hasBondRegistrationFees: boolean;
    hasPMI: boolean;
  };
}
