import { RegionalConfig } from '../../types/regional';

/**
 * United States regional configuration
 *
 * Defaults based on 2024/2025 US market conditions:
 * - Mortgage rates: ~6.5-7.5%
 * - Property appreciation: ~3-4% historical
 * - S&P 500 returns: ~10% historical
 * - Property tax varies significantly by state
 */
export const unitedStatesConfig: RegionalConfig = {
  region: 'US',
  name: 'United States',

  currency: {
    symbol: '$',
    code: 'USD',
    locale: 'en-US',
    format: (value: number, compact = false) => {
      if (compact && Math.abs(value) >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      }
      if (compact && Math.abs(value) >= 1000) {
        return `$${(value / 1000).toFixed(0)}k`;
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },

  terminology: {
    propertyTax: 'Property Tax',
    propertyTaxRate: 'Property Tax Rate (%)',
    hoaFees: 'HOA Fees',
    closingCosts: 'Closing Costs',
    sellingCosts: 'Realtor Fees & Costs',
    sellingCostsPercent: 'Selling Costs (%)',
    homeInsurance: 'Home Insurance',
    rentersInsurance: 'Renters Insurance',
    downPayment: 'Down Payment',
    mortgage: 'Mortgage',
    rent: 'Rent',
  },

  defaults: {
    buyInputs: {
      homePrice: 400000,            // $400k - median US home price
      downPaymentPercent: 20,       // 20% down payment (ideal)
      interestRate: 6.75,           // ~6.75% mortgage rate Nov 2024
      loanTermYears: 30,            // 30-year mortgage is standard
      propertyTaxRate: 1.2,         // ~1.2% national average
      homeInsuranceRate: 0.35,      // ~0.35% of home value ($1,400/year for $400k)
      hoaFees: 0,                   // $0 default (not all properties have HOA)
      maintenanceRate: 1.0,         // 1% of property value
      appreciationRate: 3.5,        // ~3.5% historical average
      closingCosts: 12000,          // ~3% of $400k = $12k
      sellingCostsPercent: 6,       // 6% realtor commission standard
    },
    rentInputs: {
      monthlyRent: 2000,            // $2,000/month - similar to mortgage payment
      rentIncreaseRate: 3,          // ~3% annual increase
      rentersInsurance: 200,        // $200/year average
    },
    investmentReturnRate: 10,       // S&P 500 historical ~10%
    timeHorizonYears: 30,
  },

  validation: {
    homePrice: {
      min: 10000,                   // $10k minimum
      max: 50000000,                // $50M maximum
    },
    interestRate: {
      min: 0,                       // 0% minimum
      max: 20,                      // 20% maximum
      typical: 6.75,                // Current mortgage rate
      warn: 10,                     // Warn if above 10%
    },
    appreciationRate: {
      min: -20,                     // -20% (housing crash)
      max: 20,                      // 20% (property boom)
      typical: 3.5,                 // Historical average
      warnHigh: 10,                 // Warn if above 10%
      warnLow: -5,                  // Warn if below -5%
    },
    investmentReturnRate: {
      min: -50,                     // -50% (market crash)
      max: 50,                      // 50% (extremely optimistic)
      typical: 10,                  // S&P 500 historical
    },
    propertyTaxRate: {
      min: 0,
      max: 10,                      // 10% maximum (some states are very high)
      typical: 1.2,
    },
    rentIncreaseRate: {
      min: 0,
      max: 20,                      // 20% maximum
      typical: 3,                   // Historical average
    },
  },

  helpText: {
    interestRate: 'Current mortgage rates are ~6.5-7.5% for 30-year fixed. Rates vary by credit score and down payment.',
    propertyTaxRate: 'Property tax varies widely by state: 0.3% (HI) to 2.5% (NJ). Check your local rate.',
    appreciationRate: 'US home prices have appreciated ~3-4% annually on average. Varies significantly by region.',
    investmentReturnRate: 'S&P 500 has returned ~10% historically (including dividends). Consider inflation for real returns.',
    closingCosts: 'Typical closing costs are 2-5% of home price, including loan origination, appraisal, title insurance, and inspections.',
    sellingCosts: 'Realtor commission is typically 5-6% (split between buyer and seller agents), plus closing costs.',
    maintenanceRate: 'Industry standard is 1% of home value per year. Older homes typically require more.',
  },

  features: {
    hasTransferDuty: false,         // US doesn't have transfer duty
    hasBondRegistrationFees: false, // US doesn't have bond registration fees
    hasPMI: true,                   // US has PMI for <20% down
  },
};
