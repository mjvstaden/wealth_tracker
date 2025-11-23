import React, { useState, useEffect } from 'react';
import { BuyVsRentInputs, BuyScenarioInputs, RentScenarioInputs } from '../types';
import { validateBuyVsRent, ValidationError } from '../lib/validators';
import { CollapsibleSection } from './shared/CollapsibleSection';
import { FormInput } from './shared/FormInput';
import { FormSelect } from './shared/FormSelect';
import { useRegionalConfig } from '../contexts/RegionalContext';

interface BuyVsRentFormProps {
  onSubmit: (inputs: BuyVsRentInputs) => void;
  initialValues?: BuyVsRentInputs;
  className?: string;
}

/**
 * Ultra-minimal Buy vs Rent comparison form
 * Features:
 * - Collapsible sections for Buy, Rent, and Settings
 * - Electric blue accent colors
 * - Validation with helpful error messages
 * - Smart defaults and tooltips
 */
export const BuyVsRentForm: React.FC<BuyVsRentFormProps> = ({
  onSubmit,
  initialValues,
  className = '',
}) => {
  // Get regional configuration
  const config = useRegionalConfig();
  const { defaults, terminology, currency } = config;

  // Use regional defaults
  const [buyInputs, setBuyInputs] = useState<BuyScenarioInputs>(
    initialValues?.buyInputs || defaults.buyInputs
  );
  const [rentInputs, setRentInputs] = useState<RentScenarioInputs>(
    initialValues?.rentInputs || defaults.rentInputs
  );
  const [investmentReturnRate, setInvestmentReturnRate] = useState(
    initialValues?.investmentReturnRate || defaults.investmentReturnRate
  );
  const [timeHorizonYears, setTimeHorizonYears] = useState(
    initialValues?.timeHorizonYears || defaults.timeHorizonYears
  );

  // Reset form when region changes (unless there are initial values)
  useEffect(() => {
    if (!initialValues) {
      setBuyInputs(defaults.buyInputs);
      setRentInputs(defaults.rentInputs);
      setInvestmentReturnRate(defaults.investmentReturnRate);
      setTimeHorizonYears(defaults.timeHorizonYears);
      setErrors([]);
      setHasValidated(false);
    }
  }, [config.region, defaults, initialValues]);

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [hasValidated, setHasValidated] = useState(false);

  // Update buy input
  const updateBuyInput = (name: string, value: number) => {
    setBuyInputs((prev) => ({ ...prev, [name]: value }));
    if (hasValidated) validateForm();
  };

  // Update rent input
  const updateRentInput = (name: string, value: number) => {
    setRentInputs((prev) => ({ ...prev, [name]: value }));
    if (hasValidated) validateForm();
  };

  // Validate form
  const validateForm = (): boolean => {
    const formData: BuyVsRentInputs = {
      buyInputs,
      rentInputs,
      investmentReturnRate,
      timeHorizonYears,
    };

    const validationErrors = validateBuyVsRent(formData);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasValidated(true);

    if (validateForm()) {
      onSubmit({
        buyInputs,
        rentInputs,
        investmentReturnRate,
        timeHorizonYears,
      });
    }
  };

  // Get error for field
  const getError = (field: string): string | undefined => {
    return errors.find((err) => err.field === field)?.message;
  };

  // Calculate estimated monthly mortgage payment for live display
  const calculateMonthlyMortgage = (): number => {
    const principal = buyInputs.homePrice * (1 - buyInputs.downPaymentPercent / 100);
    const monthlyRate = buyInputs.interestRate / 100 / 12;
    const numPayments = buyInputs.loanTermYears * 12;

    if (monthlyRate === 0) return principal / numPayments;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    return monthlyPayment;
  };

  const monthlyMortgage = calculateMonthlyMortgage();

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Buy Scenario Section */}
      <CollapsibleSection title="Buy Scenario" badge="Home Purchase" defaultOpen={true}>
        <div className="space-y-6">
          {/* Row 1: Home Price and Down Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Home Price"
              name="homePrice"
              value={buyInputs.homePrice}
              onChange={updateBuyInput}
              type="currency"
              placeholder="400,000"
              tooltip="The total purchase price of the home you're considering"
              error={getError('homePrice')}
            />

            <FormInput
              label={`${terminology.downPayment} %`}
              name="downPaymentPercent"
              value={buyInputs.downPaymentPercent}
              onChange={updateBuyInput}
              type="percentage"
              placeholder="20"
              tooltip="Percentage of home price paid upfront (typically 20% avoids PMI)"
              error={getError('downPaymentPercent')}
            />
          </div>

          {/* Row 2: Interest Rate and Loan Term */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormInput
                label="Interest Rate %"
                name="interestRate"
                value={buyInputs.interestRate}
                onChange={updateBuyInput}
                type="percentage"
                placeholder="6.5"
                tooltip={config.helpText.interestRate}
                error={getError('interestRate')}
                step={0.1}
              />
              {/* Live mortgage estimate */}
              <div className="text-xs text-text-tertiary">
                Estimated monthly {terminology.mortgage.toLowerCase()}:{' '}
                <span className="font-mono text-accent-primary">
                  {currency.format(monthlyMortgage, false)}
                </span>
              </div>
            </div>

            <FormSelect
              label="Loan Term (Years)"
              name="loanTermYears"
              value={buyInputs.loanTermYears}
              onChange={updateBuyInput}
              options={[
                { value: 15, label: '15 Years' },
                { value: 20, label: '20 Years' },
                { value: 30, label: '30 Years' },
              ]}
              tooltip="Length of your mortgage (15 or 30 years most common)"
              error={getError('loanTermYears')}
            />
          </div>

          {/* Row 3: Property Tax and Insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label={terminology.propertyTaxRate}
              name="propertyTaxRate"
              value={buyInputs.propertyTaxRate}
              onChange={updateBuyInput}
              type="percentage"
              placeholder="1.2"
              tooltip={config.helpText.propertyTaxRate}
              error={getError('propertyTaxRate')}
              step={0.1}
            />

            <FormInput
              label={terminology.homeInsurance}
              name="homeInsurance"
              value={buyInputs.homeInsurance}
              onChange={updateBuyInput}
              type="currency"
              placeholder="1,200"
              tooltip="Yearly cost of homeowners insurance"
              error={getError('homeInsurance')}
            />
          </div>

          {/* Row 4: HOA and Maintenance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label={terminology.hoaFees}
              name="hoaFees"
              value={buyInputs.hoaFees}
              onChange={updateBuyInput}
              type="currency"
              placeholder="0"
              tooltip="Monthly homeowners association fees (enter 0 if none)"
              error={getError('hoaFees')}
            />

            <FormInput
              label="Maintenance Rate %"
              name="maintenanceRate"
              value={buyInputs.maintenanceRate}
              onChange={updateBuyInput}
              type="percentage"
              placeholder="1"
              tooltip={config.helpText.maintenanceRate}
              error={getError('maintenanceRate')}
              step={0.1}
            />
          </div>

          {/* Row 5: Appreciation Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Home Appreciation Rate %"
              name="appreciationRate"
              value={buyInputs.appreciationRate}
              onChange={updateBuyInput}
              type="percentage"
              placeholder="3"
              tooltip={config.helpText.appreciationRate}
              error={getError('appreciationRate')}
              step={0.1}
            />

            <FormInput
              label={terminology.closingCostsPercent}
              name="closingCostsPercent"
              value={buyInputs.closingCostsPercent}
              onChange={updateBuyInput}
              type="percentage"
              placeholder="3"
              tooltip={config.helpText.closingCosts}
              error={getError('closingCostsPercent')}
              step={0.1}
            />
          </div>

          {/* Row 6: Selling Costs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label={terminology.sellingCostsPercent}
              name="sellingCostsPercent"
              value={buyInputs.sellingCostsPercent}
              onChange={updateBuyInput}
              type="percentage"
              placeholder="6"
              tooltip={config.helpText.sellingCosts}
              error={getError('sellingCostsPercent')}
              step={0.1}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Rent Scenario Section */}
      <CollapsibleSection title="Rent Scenario" badge="Renting" defaultOpen={true}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Monthly Rent"
              name="monthlyRent"
              value={rentInputs.monthlyRent}
              onChange={updateRentInput}
              type="currency"
              placeholder="2,000"
              tooltip="Current monthly rent payment"
              error={getError('monthlyRent')}
            />

            <FormInput
              label="Annual Rent Increase %"
              name="rentIncreaseRate"
              value={rentInputs.rentIncreaseRate}
              onChange={updateRentInput}
              type="percentage"
              placeholder="3"
              tooltip="Expected annual rent increase (historical average is ~3%)"
              error={getError('rentIncreaseRate')}
              step={0.1}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label={terminology.rentersInsurance}
              name="rentersInsurance"
              value={rentInputs.rentersInsurance}
              onChange={updateRentInput}
              type="currency"
              placeholder="200"
              tooltip="Yearly cost of renters insurance"
              error={getError('rentersInsurance')}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Settings Section */}
      <CollapsibleSection title="Settings" badge="Analysis Parameters" defaultOpen={true}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Investment Return Rate %"
              name="investmentReturnRate"
              value={investmentReturnRate}
              onChange={(_, value) => {
                setInvestmentReturnRate(value);
                if (hasValidated) validateForm();
              }}
              type="percentage"
              placeholder="7"
              tooltip={config.helpText.investmentReturnRate}
              error={getError('investmentReturnRate')}
              step={0.1}
            />

            {/* Time Horizon Selector */}
            <div className="space-y-2">
              <label className="label">
                Time Horizon
                <span className="text-text-tertiary text-xs ml-2">
                  (How many years to compare)
                </span>
              </label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {[10, 15, 20, 25, 30, 35, 40].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => {
                      setTimeHorizonYears(years);
                      if (hasValidated) validateForm();
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeHorizonYears === years
                        ? 'bg-accent-primary text-bg-primary shadow-glow-blue'
                        : 'bg-bg-elevated text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                    }`}
                  >
                    {years}y
                  </button>
                ))}
              </div>
              {getError('timeHorizonYears') && (
                <p className="text-error text-sm mt-1">{getError('timeHorizonYears')}</p>
              )}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="btn-primary px-12 py-4 text-base group relative overflow-hidden"
        >
          <span className="relative z-10">Compare Scenarios</span>

          {/* Animated background sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      </div>

      {/* Error Summary */}
      {hasValidated && errors.length > 0 && (
        <div className="mt-6 p-4 bg-bg-secondary border border-error rounded-md animate-fade-in-up">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-error mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-error">
                Please fix the following errors:
              </p>
              <ul className="text-xs text-text-secondary space-y-1 list-disc list-inside">
                {errors.slice(0, 5).map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
                {errors.length > 5 && (
                  <li className="text-text-tertiary">+ {errors.length - 5} more errors</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
