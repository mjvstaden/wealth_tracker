import React, { useState, useEffect, useRef } from 'react';
import { BuyVsRentInputs, BuyScenarioInputs, RentScenarioInputs } from '../types';
import { validateBuyVsRent, ValidationError } from '../lib/validators';
import { calculateTransferDuty, calculateBondRegistrationFees } from '../lib/calculations';
import { CollapsibleSection } from './shared/CollapsibleSection';
import { FormInput } from './shared/FormInput';
import { FormSelect } from './shared/FormSelect';
import { useRegionalConfig } from '../contexts/RegionalContext';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface BuyVsRentFormProps {
  onSubmit: (inputs: BuyVsRentInputs) => void;
  initialValues?: BuyVsRentInputs;
  className?: string;
}

export const BuyVsRentForm: React.FC<BuyVsRentFormProps> = ({
  onSubmit,
  initialValues,
  className = '',
}) => {
  const config = useRegionalConfig();
  const { defaults, terminology, currency } = config;

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

  const [showAdvanced, setShowAdvanced] = useState(false);

  const isFirstRender = useRef(true);
  const previousHomePrice = useRef(buyInputs.homePrice);

  // Reset form when region changes
  useEffect(() => {
    if (!initialValues) {
      setBuyInputs(defaults.buyInputs);
      setRentInputs(defaults.rentInputs);
      setInvestmentReturnRate(defaults.investmentReturnRate);
      setTimeHorizonYears(defaults.timeHorizonYears);
      setErrors([]);
      setHasValidated(false);
      previousHomePrice.current = defaults.buyInputs.homePrice;
    }
  }, [config.region, defaults, initialValues]);

  // Update derived values when home price changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (buyInputs.homePrice === previousHomePrice.current) {
      return;
    }

    previousHomePrice.current = buyInputs.homePrice;
    const homePrice = buyInputs.homePrice;

    if (homePrice > 0) {
      const bondAmount = homePrice * (1 - buyInputs.downPaymentPercent / 100);
      const transferDuty = calculateTransferDuty(homePrice);
      const bondFees = calculateBondRegistrationFees(bondAmount);
      const legalFees = 20000;
      const closingCosts = transferDuty + bondFees + legalFees;

      const monthlyRent = Math.round(homePrice * 0.0067);

      setBuyInputs(prev => ({
        ...prev,
        closingCosts,
      }));

      setRentInputs(prev => ({
        ...prev,
        monthlyRent,
      }));
    }
  }, [buyInputs.homePrice, buyInputs.downPaymentPercent]);

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [hasValidated, setHasValidated] = useState(false);

  const updateBuyInput = (name: string, value: number) => {
    setBuyInputs((prev) => ({ ...prev, [name]: value }));
    if (hasValidated) validateForm();
  };

  const updateRentInput = (name: string, value: number) => {
    setRentInputs((prev) => ({ ...prev, [name]: value }));
    if (hasValidated) validateForm();
  };

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

  const getError = (field: string): string | undefined => {
    return errors.find((err) => err.field === field)?.message;
  };

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
    <form onSubmit={handleSubmit} className={`space-y-8 overflow-x-hidden ${className}`}>

      {/* ── Hero Inputs ── */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Home Price - Primary Input */}
          <div className="hero-input-card group">
            <div className="hero-input-label">
              <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span>Home Price</span>
            </div>
            <FormInput
              label=""
              name="homePrice"
              value={buyInputs.homePrice}
              onChange={updateBuyInput}
              type="currency"
              placeholder="2,500,000"
              error={getError('homePrice')}
              className="hero-input-field"
            />
            <div className="text-xs text-text-tertiary mt-1 pl-1">
              Estimated bond repayment:{' '}
              <span className="font-mono text-accent-primary">
                {currency.format(monthlyMortgage, false)}/mo
              </span>
            </div>
          </div>

          {/* Monthly Rent - Primary Input */}
          <div className="hero-input-card group">
            <div className="hero-input-label">
              <div className="w-8 h-8 rounded-full bg-accent-light/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span>Monthly Rent</span>
            </div>
            <FormInput
              label=""
              name="monthlyRent"
              value={rentInputs.monthlyRent}
              onChange={updateRentInput}
              type="currency"
              placeholder="12,000"
              error={getError('monthlyRent')}
              className="hero-input-field"
            />
            <div className="text-xs text-text-tertiary mt-1 pl-1">
              For the exact same property
            </div>
          </div>
        </div>

        {/* Time Horizon - Always visible, it's simple and key */}
        <div className="space-y-3">
          <label className="label text-center block">
            Time Horizon
          </label>
          <div className="flex justify-center">
            <div className="inline-grid grid-cols-4 sm:grid-cols-7 gap-2">
              {[10, 15, 20, 25, 30, 35, 40].map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => {
                    setTimeHorizonYears(years);
                    if (hasValidated) validateForm();
                  }}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    timeHorizonYears === years
                      ? 'bg-accent-primary text-bg-primary shadow-glow-blue'
                      : 'bg-bg-elevated text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-border-subtle'
                  }`}
                >
                  {years}y
                </button>
              ))}
            </div>
          </div>
          {getError('timeHorizonYears') && (
            <p className="text-error text-sm mt-1 text-center">{getError('timeHorizonYears')}</p>
          )}
        </div>
      </div>

      {/* ── Advanced Toggle ── */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-subtle" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-primary border border-border-default rounded-full text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300 group"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Assumptions' : 'Customize Assumptions'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Advanced Fields ── */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showAdvanced ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-6 pt-2">

          {/* Buy Assumptions */}
          <CollapsibleSection title="Buy Assumptions" badge={terminology.mortgage} defaultOpen={true}>
            <div className="space-y-6">
              {/* Deposit & Interest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormInput
                    label={`${terminology.downPayment} %`}
                    name="downPaymentPercent"
                    value={buyInputs.downPaymentPercent}
                    onChange={updateBuyInput}
                    type="percentage"
                    placeholder="10"
                    tooltip="Percentage of home price paid upfront"
                    error={getError('downPaymentPercent')}
                  />
                  <div className="text-xs text-text-tertiary">
                    {terminology.downPayment} amount:{' '}
                    <span className="font-mono text-accent-primary">
                      {currency.format(buyInputs.homePrice * buyInputs.downPaymentPercent / 100, false)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <FormInput
                    label="Interest Rate %"
                    name="interestRate"
                    value={buyInputs.interestRate}
                    onChange={updateBuyInput}
                    type="percentage"
                    placeholder="11.75"
                    tooltip={config.helpText.interestRate}
                    error={getError('interestRate')}
                    step={0.1}
                  />
                  <div className="text-xs text-text-tertiary">
                    Monthly {terminology.mortgage.toLowerCase()}:{' '}
                    <span className="font-mono text-accent-primary">
                      {currency.format(monthlyMortgage, false)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Term & Property Tax */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  tooltip="Length of your mortgage"
                  error={getError('loanTermYears')}
                />

                <div className="space-y-2">
                  <FormInput
                    label={terminology.propertyTaxRate}
                    name="propertyTaxRate"
                    value={buyInputs.propertyTaxRate}
                    onChange={updateBuyInput}
                    type="percentage"
                    placeholder="0.8"
                    tooltip={config.helpText.propertyTaxRate}
                    error={getError('propertyTaxRate')}
                    step={0.1}
                  />
                  <div className="text-xs text-text-tertiary">
                    Annual:{' '}
                    <span className="font-mono text-accent-primary">
                      {currency.format(buyInputs.homePrice * buyInputs.propertyTaxRate / 100, false)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insurance & HOA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormInput
                    label={`${terminology.homeInsurance} Rate %`}
                    name="homeInsuranceRate"
                    value={buyInputs.homeInsuranceRate}
                    onChange={updateBuyInput}
                    type="percentage"
                    placeholder="0.5"
                    tooltip="Annual homeowners insurance as % of property value"
                    error={getError('homeInsuranceRate')}
                    step={0.1}
                  />
                  <div className="text-xs text-text-tertiary">
                    Annual:{' '}
                    <span className="font-mono text-accent-primary">
                      {currency.format(buyInputs.homePrice * buyInputs.homeInsuranceRate / 100, false)}
                    </span>
                  </div>
                </div>

                <FormInput
                  label={`${terminology.hoaFees} (Annual)`}
                  name="hoaFees"
                  value={buyInputs.hoaFees}
                  onChange={updateBuyInput}
                  type="currency"
                  placeholder="0"
                  tooltip="Annual levies/body corporate fees (enter 0 if not in a complex)"
                  error={getError('hoaFees')}
                />
              </div>

              {/* Maintenance & Appreciation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
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
                  <div className="text-xs text-text-tertiary">
                    Annual:{' '}
                    <span className="font-mono text-accent-primary">
                      {currency.format(buyInputs.homePrice * buyInputs.maintenanceRate / 100, false)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <FormInput
                    label="Home Appreciation Rate %"
                    name="appreciationRate"
                    value={buyInputs.appreciationRate}
                    onChange={updateBuyInput}
                    type="percentage"
                    placeholder="5.5"
                    tooltip={config.helpText.appreciationRate}
                    error={getError('appreciationRate')}
                    step={0.1}
                  />
                  <div className="text-xs text-text-tertiary">
                    Year 1 gain:{' '}
                    <span className="font-mono text-accent-primary">
                      {currency.format(buyInputs.homePrice * buyInputs.appreciationRate / 100, false)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Closing Costs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label={terminology.closingCosts}
                  name="closingCosts"
                  value={buyInputs.closingCosts}
                  onChange={updateBuyInput}
                  type="currency"
                  placeholder="137,500"
                  tooltip={config.helpText.closingCosts}
                  error={getError('closingCosts')}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Rent Assumptions */}
          <CollapsibleSection title="Rent Assumptions" badge="Renting" defaultOpen={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <FormInput
                  label="Annual Rent Increase %"
                  name="rentIncreaseRate"
                  value={rentInputs.rentIncreaseRate}
                  onChange={updateRentInput}
                  type="percentage"
                  placeholder="6"
                  tooltip="Expected annual rent increase (typically CPI + 1-2%)"
                  error={getError('rentIncreaseRate')}
                  step={0.1}
                />
                <div className="text-xs text-text-tertiary">
                  Next year's rent:{' '}
                  <span className="font-mono text-accent-primary">
                    {currency.format(rentInputs.monthlyRent * (1 + rentInputs.rentIncreaseRate / 100), false)}/mo
                  </span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Investment Settings */}
          <CollapsibleSection title="Investment Settings" badge="Returns" defaultOpen={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <FormInput
                  label="Investment Return Rate %"
                  name="investmentReturnRate"
                  value={investmentReturnRate}
                  onChange={(_, value) => {
                    setInvestmentReturnRate(value);
                    if (hasValidated) validateForm();
                  }}
                  type="percentage"
                  placeholder="12"
                  tooltip={config.helpText.investmentReturnRate}
                  error={getError('investmentReturnRate')}
                  step={0.1}
                />
                <div className="text-xs text-text-tertiary">
                  Year 1 return on saved capital:{' '}
                  <span className="font-mono text-accent-primary">
                    {currency.format(((buyInputs.homePrice * buyInputs.downPaymentPercent / 100) + buyInputs.closingCosts) * investmentReturnRate / 100, false)}
                  </span>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="btn-primary px-8 sm:px-12 py-3.5 sm:py-4 text-sm sm:text-base group relative overflow-hidden w-full sm:w-auto"
        >
          <span className="relative z-10">Compare Scenarios</span>
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
