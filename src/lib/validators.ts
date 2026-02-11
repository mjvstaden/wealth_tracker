import { BuyScenarioInputs, RentScenarioInputs, BuyVsRentInputs } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

function validateBuyInputs(inputs: BuyScenarioInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  if (inputs.homePrice < 100000) {
    errors.push({ field: 'homePrice', message: 'Home price must be at least R100,000' });
  }
  if (inputs.homePrice > 100000000) {
    errors.push({ field: 'homePrice', message: 'Home price cannot exceed R100,000,000' });
  }
  if (inputs.downPaymentPercent < 0) {
    errors.push({ field: 'downPaymentPercent', message: 'Down payment percentage cannot be negative' });
  }
  if (inputs.downPaymentPercent > 100) {
    errors.push({ field: 'downPaymentPercent', message: 'Down payment percentage cannot exceed 100%' });
  }
  if (inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot be negative' });
  }
  if (inputs.interestRate > 25) {
    errors.push({ field: 'interestRate', message: 'Interest rate seems unrealistic (>25%)' });
  }
  if (inputs.loanTermYears < 1) {
    errors.push({ field: 'loanTermYears', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTermYears > 50) {
    errors.push({ field: 'loanTermYears', message: 'Loan term cannot exceed 50 years' });
  }
  if (inputs.propertyTaxRate < 0) {
    errors.push({ field: 'propertyTaxRate', message: 'Property tax rate cannot be negative' });
  }
  if (inputs.propertyTaxRate > 10) {
    errors.push({ field: 'propertyTaxRate', message: 'Property tax rate seems unrealistic (>10%)' });
  }
  if (inputs.homeInsuranceRate < 0) {
    errors.push({ field: 'homeInsuranceRate', message: 'Home insurance rate cannot be negative' });
  }
  if (inputs.homeInsuranceRate > 5) {
    errors.push({ field: 'homeInsuranceRate', message: 'Home insurance rate seems unrealistic (>5%)' });
  }
  if (inputs.hoaFees < 0) {
    errors.push({ field: 'hoaFees', message: 'Levies cannot be negative' });
  }
  if (inputs.hoaFees > 120000) {
    errors.push({ field: 'hoaFees', message: 'Levies seem unrealistic (>R120,000/year)' });
  }
  if (inputs.maintenanceRate < 0) {
    errors.push({ field: 'maintenanceRate', message: 'Maintenance rate cannot be negative' });
  }
  if (inputs.maintenanceRate > 10) {
    errors.push({ field: 'maintenanceRate', message: 'Maintenance rate seems unrealistic (>10%)' });
  }
  if (inputs.appreciationRate < -20) {
    errors.push({ field: 'appreciationRate', message: 'Appreciation rate cannot be less than -20%' });
  }
  if (inputs.appreciationRate > 20) {
    errors.push({ field: 'appreciationRate', message: 'Appreciation rate seems unrealistic (>20%)' });
  } else if (inputs.appreciationRate < -5 || inputs.appreciationRate > 10) {
    errors.push({ field: 'appreciationRate', message: 'Warning: Historical appreciation rates are typically -5% to 10%' });
  }
  if (inputs.closingCosts < 0) {
    errors.push({ field: 'closingCosts', message: 'Transfer fees cannot be negative' });
  }
  if (inputs.closingCosts > inputs.homePrice * 0.15) {
    errors.push({ field: 'closingCosts', message: 'Transfer fees seem unrealistic (>15% of home price)' });
  }
  if (inputs.sellingCostsPercent < 0) {
    errors.push({ field: 'sellingCostsPercent', message: 'Selling costs percentage cannot be negative' });
  }
  if (inputs.sellingCostsPercent > 15) {
    errors.push({ field: 'sellingCostsPercent', message: 'Selling costs percentage seems unrealistic (>15%)' });
  }

  return errors;
}

function validateRentInputs(inputs: RentScenarioInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  if (inputs.monthlyRent < 100) {
    errors.push({ field: 'monthlyRent', message: 'Monthly rent must be at least R100' });
  }
  if (inputs.monthlyRent > 100000) {
    errors.push({ field: 'monthlyRent', message: 'Monthly rent cannot exceed R100,000' });
  }
  if (inputs.rentIncreaseRate < 0) {
    errors.push({ field: 'rentIncreaseRate', message: 'Rent increase rate cannot be negative' });
  }
  if (inputs.rentIncreaseRate > 20) {
    errors.push({ field: 'rentIncreaseRate', message: 'Rent increase rate seems unrealistic (>20%)' });
  } else if (inputs.rentIncreaseRate > 10) {
    errors.push({ field: 'rentIncreaseRate', message: 'Warning: Rent increase rate above 10% is unusually high' });
  }
  if (inputs.rentersInsurance < 0) {
    errors.push({ field: 'rentersInsurance', message: 'Renters insurance cannot be negative' });
  }
  if (inputs.rentersInsurance > 50000) {
    errors.push({ field: 'rentersInsurance', message: 'Renters insurance seems unrealistic (>R50,000/year)' });
  }

  return errors;
}

export function validateBuyVsRent(inputs: BuyVsRentInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  errors.push(...validateBuyInputs(inputs.buyInputs));
  errors.push(...validateRentInputs(inputs.rentInputs));

  if (inputs.investmentReturnRate < -50) {
    errors.push({ field: 'investmentReturnRate', message: 'Investment return rate cannot be less than -50%' });
  }
  if (inputs.investmentReturnRate > 50) {
    errors.push({ field: 'investmentReturnRate', message: 'Investment return rate seems unrealistic (>50%)' });
  } else if (inputs.investmentReturnRate < 0 || inputs.investmentReturnRate > 15) {
    errors.push({ field: 'investmentReturnRate', message: 'Warning: Historical stock market returns are typically 0% to 15%' });
  }
  if (inputs.timeHorizonYears < 1) {
    errors.push({ field: 'timeHorizonYears', message: 'Time horizon must be at least 1 year' });
  }
  if (inputs.timeHorizonYears > 50) {
    errors.push({ field: 'timeHorizonYears', message: 'Time horizon cannot exceed 50 years' });
  }

  return errors;
}
