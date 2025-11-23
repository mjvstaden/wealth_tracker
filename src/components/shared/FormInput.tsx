import React, { useState, useEffect } from 'react';
import { InfoTooltip } from './InfoTooltip';
import { useRegionalConfig } from '../../contexts/RegionalContext';

interface FormInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  type?: 'currency' | 'percentage' | 'number';
  placeholder?: string;
  tooltip?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

/**
 * Ultra-minimal form input with electric blue focus state
 * Supports currency, percentage, and number formatting
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'number',
  placeholder,
  tooltip,
  error,
  min,
  max,
  step = 1,
  className = '',
}) => {
  const config = useRegionalConfig();
  const { currency } = config;

  // Local state to track the raw input string while user is typing
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Update local input value when prop value changes (only when not focused)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(getDisplayValue());
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.-]/g, '');
    setInputValue(rawValue);

    const numValue = rawValue === '' ? 0 : parseFloat(rawValue);
    if (!isNaN(numValue)) {
      onChange(name, numValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // When focused, show the raw numeric value without formatting
    setInputValue(value === 0 ? '' : value.toString());
  };

  const handleBlur = () => {
    setIsFocused(false);
    // When blurred, format the value
    setInputValue(getDisplayValue());
  };

  const getDisplayValue = () => {
    if (value === 0) return '';

    // Format with thousands separators for currency and large numbers
    if (type === 'currency' || (type === 'number' && value >= 1000)) {
      return value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        useGrouping: true,
      });
    }

    // For percentages and small numbers, show with appropriate decimals
    if (type === 'percentage') {
      return value.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        useGrouping: false,
      });
    }

    return value.toString();
  };

  const getPrefix = () => {
    if (type === 'currency') return currency.symbol;
    return '';
  };

  const getSuffix = () => {
    if (type === 'percentage') return '%';
    return '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label with optional tooltip */}
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="label">
          {label}
        </label>
        {tooltip && <InfoTooltip content={tooltip} />}
      </div>

      {/* Input field */}
      <div className="relative">
        {getPrefix() && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-tertiary font-mono">
            {getPrefix()}
          </span>
        )}

        <input
          type="text"
          id={name}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`input font-mono text-right ${
            getPrefix() ? 'pl-8' : ''
          } ${
            getSuffix() ? 'pr-8' : ''
          } ${
            error ? 'border-error focus:border-error' : ''
          }`}
          min={min}
          max={max}
          step={step}
        />

        {getSuffix() && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-tertiary font-mono">
            {getSuffix()}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-error text-xs animate-fade-in-up">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
