/**
 * Form validation utilities
 */

import { ScenarioDetails, BuyScenarioInputs, RentScenarioInputs, BuyVsRentInputs } from '../types';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate scenario details
 */
export function validateScenarioDetails(scenario: ScenarioDetails): ValidationError[] {
  const errors: ValidationError[] = [];

  // Label validation
  if (!scenario.label || scenario.label.trim() === '') {
    errors.push({
      field: 'label',
      message: 'Label is required',
    });
  }

  // Initial amount validation
  if (scenario.initialAmount < 0) {
    errors.push({
      field: 'initialAmount',
      message: 'Initial amount cannot be negative',
    });
  }

  // Monthly amount validation
  if (scenario.monthlyAmount < 0) {
    errors.push({
      field: 'monthlyAmount',
      message: 'Monthly amount cannot be negative',
    });
  }

  // Return rate validation
  if (scenario.returnRate < -100) {
    errors.push({
      field: 'returnRate',
      message: 'Return rate cannot be less than -100%',
    });
  }

  if (scenario.returnRate > 100) {
    errors.push({
      field: 'returnRate',
      message: 'Return rate seems unrealistic (>100%)',
    });
  }

  // Time horizon validation
  if (scenario.timeHorizon < 1) {
    errors.push({
      field: 'timeHorizon',
      message: 'Time horizon must be at least 1 year',
    });
  }

  if (scenario.timeHorizon > 50) {
    errors.push({
      field: 'timeHorizon',
      message: 'Time horizon cannot exceed 50 years',
    });
  }

  return errors;
}

/**
 * Check if scenario name is valid
 */
export function validateScenarioName(name: string): ValidationError | null {
  if (!name || name.trim() === '') {
    return {
      field: 'name',
      message: 'Scenario name is required',
    };
  }

  if (name.length > 100) {
    return {
      field: 'name',
      message: 'Scenario name is too long (max 100 characters)',
    };
  }

  return null;
}

/**
 * ============================================================================
 * BUY VS RENT VALIDATION
 * ============================================================================
 */

/**
 * Validate buy scenario inputs
 *
 * Validation rules:
 * - Home price: $10,000 - $50,000,000
 * - Down payment: 0% - 100%
 * - Interest rate: 0% - 25% (accommodates both US ~7% and SA ~12% rates)
 * - Loan term: 1 - 50 years (common: 15, 30)
 * - Property tax rate: 0% - 10%
 * - Home insurance: $0 - $50,000/year
 * - HOA fees: $0 - $5,000/month
 * - Maintenance rate: 0% - 10%
 * - Appreciation rate: -20% - 20% (warn if outside -5% to 10%)
 * - Closing costs: 0% - 10%
 * - Selling costs: 0% - 15%
 */
export function validateBuyInputs(inputs: BuyScenarioInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Home price validation
  if (inputs.homePrice < 100000) {
    errors.push({
      field: 'homePrice',
      message: 'Home price must be at least R100,000',
    });
  }

  if (inputs.homePrice > 100000000) {
    errors.push({
      field: 'homePrice',
      message: 'Home price cannot exceed R100,000,000',
    });
  }

  // Down payment percentage validation
  if (inputs.downPaymentPercent < 0) {
    errors.push({
      field: 'downPaymentPercent',
      message: 'Down payment percentage cannot be negative',
    });
  }

  if (inputs.downPaymentPercent > 100) {
    errors.push({
      field: 'downPaymentPercent',
      message: 'Down payment percentage cannot exceed 100%',
    });
  }

  // Interest rate validation
  if (inputs.interestRate < 0) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate cannot be negative',
    });
  }

  if (inputs.interestRate > 25) {
    errors.push({
      field: 'interestRate',
      message: 'Interest rate seems unrealistic (>25%)',
    });
  }

  // Loan term validation
  if (inputs.loanTermYears < 1) {
    errors.push({
      field: 'loanTermYears',
      message: 'Loan term must be at least 1 year',
    });
  }

  if (inputs.loanTermYears > 50) {
    errors.push({
      field: 'loanTermYears',
      message: 'Loan term cannot exceed 50 years',
    });
  }

  // Property tax rate validation
  if (inputs.propertyTaxRate < 0) {
    errors.push({
      field: 'propertyTaxRate',
      message: 'Property tax rate cannot be negative',
    });
  }

  if (inputs.propertyTaxRate > 10) {
    errors.push({
      field: 'propertyTaxRate',
      message: 'Property tax rate seems unrealistic (>10%)',
    });
  }

  // Home insurance rate validation
  if (inputs.homeInsuranceRate < 0) {
    errors.push({
      field: 'homeInsuranceRate',
      message: 'Home insurance rate cannot be negative',
    });
  }

  if (inputs.homeInsuranceRate > 5) {
    errors.push({
      field: 'homeInsuranceRate',
      message: 'Home insurance rate seems unrealistic (>5%)',
    });
  }

  // Levies validation (annual)
  if (inputs.hoaFees < 0) {
    errors.push({
      field: 'hoaFees',
      message: 'Levies cannot be negative',
    });
  }

  if (inputs.hoaFees > 120000) {
    errors.push({
      field: 'hoaFees',
      message: 'Levies seem unrealistic (>R120,000/year)',
    });
  }

  // Maintenance rate validation
  if (inputs.maintenanceRate < 0) {
    errors.push({
      field: 'maintenanceRate',
      message: 'Maintenance rate cannot be negative',
    });
  }

  if (inputs.maintenanceRate > 10) {
    errors.push({
      field: 'maintenanceRate',
      message: 'Maintenance rate seems unrealistic (>10%)',
    });
  }

  // Appreciation rate validation
  if (inputs.appreciationRate < -20) {
    errors.push({
      field: 'appreciationRate',
      message: 'Appreciation rate cannot be less than -20%',
    });
  }

  if (inputs.appreciationRate > 20) {
    errors.push({
      field: 'appreciationRate',
      message: 'Appreciation rate seems unrealistic (>20%)',
    });
  } else if (inputs.appreciationRate < -5 || inputs.appreciationRate > 10) {
    errors.push({
      field: 'appreciationRate',
      message: 'Warning: Historical appreciation rates are typically -5% to 10%',
    });
  }

  // Transfer & bond fees validation
  if (inputs.closingCosts < 0) {
    errors.push({
      field: 'closingCosts',
      message: 'Transfer fees cannot be negative',
    });
  }

  if (inputs.closingCosts > inputs.homePrice * 0.15) {
    errors.push({
      field: 'closingCosts',
      message: 'Transfer fees seem unrealistic (>15% of home price)',
    });
  }

  // Selling costs percentage validation
  if (inputs.sellingCostsPercent < 0) {
    errors.push({
      field: 'sellingCostsPercent',
      message: 'Selling costs percentage cannot be negative',
    });
  }

  if (inputs.sellingCostsPercent > 15) {
    errors.push({
      field: 'sellingCostsPercent',
      message: 'Selling costs percentage seems unrealistic (>15%)',
    });
  }

  return errors;
}

/**
 * Validate rent scenario inputs
 *
 * Validation rules:
 * - Monthly rent: R100 - R100,000
 * - Rent increase rate: 0% - 20% (warn if > 10%)
 * - Renters insurance: R0 - R50,000/year
 */
export function validateRentInputs(inputs: RentScenarioInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Monthly rent validation
  if (inputs.monthlyRent < 100) {
    errors.push({
      field: 'monthlyRent',
      message: 'Monthly rent must be at least R100',
    });
  }

  if (inputs.monthlyRent > 100000) {
    errors.push({
      field: 'monthlyRent',
      message: 'Monthly rent cannot exceed R100,000',
    });
  }

  // Rent increase rate validation
  if (inputs.rentIncreaseRate < 0) {
    errors.push({
      field: 'rentIncreaseRate',
      message: 'Rent increase rate cannot be negative',
    });
  }

  if (inputs.rentIncreaseRate > 20) {
    errors.push({
      field: 'rentIncreaseRate',
      message: 'Rent increase rate seems unrealistic (>20%)',
    });
  } else if (inputs.rentIncreaseRate > 10) {
    errors.push({
      field: 'rentIncreaseRate',
      message: 'Warning: Rent increase rate above 10% is unusually high',
    });
  }

  // Renters insurance validation
  if (inputs.rentersInsurance < 0) {
    errors.push({
      field: 'rentersInsurance',
      message: 'Renters insurance cannot be negative',
    });
  }

  if (inputs.rentersInsurance > 50000) {
    errors.push({
      field: 'rentersInsurance',
      message: 'Renters insurance seems unrealistic (>R50,000/year)',
    });
  }

  return errors;
}

/**
 * Validate complete buy vs rent inputs
 *
 * Validates:
 * - Buy scenario inputs
 * - Rent scenario inputs
 * - Investment return rate: -50% to 50% (warn if outside 0% to 15%)
 * - Time horizon: 1 - 50 years
 */
export function validateBuyVsRent(inputs: BuyVsRentInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate buy inputs
  const buyErrors = validateBuyInputs(inputs.buyInputs);
  errors.push(...buyErrors);

  // Validate rent inputs
  const rentErrors = validateRentInputs(inputs.rentInputs);
  errors.push(...rentErrors);

  // Investment return rate validation
  if (inputs.investmentReturnRate < -50) {
    errors.push({
      field: 'investmentReturnRate',
      message: 'Investment return rate cannot be less than -50%',
    });
  }

  if (inputs.investmentReturnRate > 50) {
    errors.push({
      field: 'investmentReturnRate',
      message: 'Investment return rate seems unrealistic (>50%)',
    });
  } else if (inputs.investmentReturnRate < 0 || inputs.investmentReturnRate > 15) {
    errors.push({
      field: 'investmentReturnRate',
      message: 'Warning: Historical stock market returns are typically 0% to 15%',
    });
  }

  // Time horizon validation
  if (inputs.timeHorizonYears < 1) {
    errors.push({
      field: 'timeHorizonYears',
      message: 'Time horizon must be at least 1 year',
    });
  }

  if (inputs.timeHorizonYears > 50) {
    errors.push({
      field: 'timeHorizonYears',
      message: 'Time horizon cannot exceed 50 years',
    });
  }

  return errors;
}
