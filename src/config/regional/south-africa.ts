import { RegionalConfig } from '../../types/regional';

/**
 * South African regional configuration
 *
 * Defaults based on 2024/2025 South African market conditions:
 * - Prime interest rate: ~11.5-12%
 * - Property appreciation: ~5-6% (varies by region)
 * - JSE All Share Index returns: ~12% historical
 * - Municipal rates vary significantly by municipality
 */
export const southAfricaConfig: RegionalConfig = {
  region: 'ZA',
  name: 'South Africa',

  currency: {
    symbol: 'R',
    code: 'ZAR',
    locale: 'en-ZA',
    format: (value: number, compact = false) => {
      if (compact && Math.abs(value) >= 1000000) {
        return `R${(value / 1000000).toFixed(1)}M`;
      }
      if (compact && Math.abs(value) >= 1000) {
        return `R${(value / 1000).toFixed(0)}k`;
      }
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },

  terminology: {
    propertyTax: 'Municipal Rates',
    propertyTaxRate: 'Municipal Rates (%)',
    hoaFees: 'Levies (Body Corporate)',
    closingCosts: 'Transfer & Bond Fees',
    sellingCosts: 'Estate Agent Commission',
    sellingCostsPercent: 'Agent Commission (%)',
    homeInsurance: 'Home Insurance',
    rentersInsurance: 'Renters Insurance',
    downPayment: 'Deposit',
    mortgage: 'Bond',
    rent: 'Rent',
  },

  defaults: {
    buyInputs: {
      homePrice: 2500000,           // R2.5M - median home price in major metros
      downPaymentPercent: 10,       // 10% deposit is common in SA
      interestRate: 11.75,          // Prime lending rate Nov 2024
      loanTermYears: 20,            // 20 years is common, 30 available
      propertyTaxRate: 0.8,         // ~0.8% varies by municipality
      homeInsuranceRate: 0.5,       // ~0.5% of home value
      hoaFees: 0,                   // Annual levies (0 if not in complex)
      maintenanceRate: 1.0,         // 1% of property value
      appreciationRate: 5.5,        // ~5-6% historical average
      closingCosts: 137500,         // Transfer duty (~R67k) + bond registration (~R50k) + legal fees (~R20k)
      sellingCostsPercent: 7.5,     // 7.5% estate agent + VAT
    },
    rentInputs: {
      monthlyRent: 16500,           // ~8% rental yield
      rentIncreaseRate: 6,          // CPI + 1-2% typically
      rentersInsurance: 0,          // Not common in SA
    },
    investmentReturnRate: 12,       // JSE All Share historical ~12%
    timeHorizonYears: 20,
  },

  validation: {
    homePrice: {
      min: 100000,                  // R100k minimum
      max: 100000000,               // R100M maximum
    },
    interestRate: {
      min: 5,                       // 5% minimum (very low)
      max: 20,                      // 20% maximum (very high)
      typical: 11.75,               // Current prime rate
      warn: 15,                     // Warn if above 15%
    },
    appreciationRate: {
      min: -20,                     // -20% (severe crash)
      max: 20,                      // 20% (property boom)
      typical: 5.5,                 // Historical average
      warnHigh: 10,                 // Warn if above 10%
      warnLow: 0,                   // Warn if below 0%
    },
    investmentReturnRate: {
      min: -50,                     // -50% (market crash)
      max: 50,                      // 50% (extremely optimistic)
      typical: 12,                  // JSE historical
    },
    propertyTaxRate: {
      min: 0,
      max: 3,                       // 3% maximum municipal rates
      typical: 0.8,
    },
    rentIncreaseRate: {
      min: 0,
      max: 20,                      // 20% maximum
      typical: 6,                   // CPI-linked
    },
  },

  helpText: {
    interestRate: 'Current prime lending rate in SA is ~11.75%. Banks typically offer prime or prime + 0.5-2%.',
    propertyTaxRate: 'Municipal rates vary by municipality. Typically 0.5-1.5% of property value annually. Check your municipal valuation.',
    appreciationRate: 'Historical property appreciation in SA averages 5-6%, but varies significantly by region (Western Cape, Gauteng, etc.).',
    investmentReturnRate: 'JSE All Share Index has returned ~12% historically. Consider inflation (~5%) for real returns of ~7%.',
    closingCosts: 'Transfer duty brackets: R0-R1.21M = 0%, R1.21M-R1.66M = 3%, R1.66M-R2.33M = 6%, R2.33M-R2.99M = 8%, R2.99M-R13.31M = 11%, above = 13%. Plus bond registration (~R50k) and legal fees (~R20k).',
    sellingCosts: 'Estate agent commission is typically 7.5% (6.5% + VAT) in South Africa, plus bond cancellation fees.',
    maintenanceRate: 'Industry standard is 1% of property value per year for maintenance. Older homes may require more.',
  },

  features: {
    hasTransferDuty: true,          // SA has progressive transfer duty
    hasBondRegistrationFees: true,  // SA has bond registration fees
    hasPMI: false,                  // SA doesn't have PMI
  },
};
