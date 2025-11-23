import React from 'react';
import { InfoTooltip } from './InfoTooltip';

interface FormSelectProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  options: { value: number; label: string }[];
  tooltip?: string;
  error?: string;
  className?: string;
}

/**
 * Ultra-minimal select dropdown with electric blue focus
 */
export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  tooltip,
  error,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(name, parseInt(e.target.value));
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

      {/* Select dropdown */}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={`input appearance-none cursor-pointer ${
            error ? 'border-error focus:border-error' : ''
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-text-tertiary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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
