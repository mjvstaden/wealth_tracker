import React, { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}

/**
 * Ultra-minimal collapsible section with smooth animations
 * Electric blue accent on hover
 */
export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  defaultOpen = true,
  children,
  badge,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-border-default rounded-md overflow-x-hidden transition-all duration-300 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-bg-secondary hover:bg-bg-elevated hover:border-accent-primary transition-all duration-300 group"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="font-display font-semibold text-sm sm:text-base text-text-primary uppercase tracking-wider">
            {title}
          </h3>
          {badge && (
            <span className="badge badge-primary text-xs">
              {badge}
            </span>
          )}
        </div>

        {/* Chevron icon */}
        <svg
          className={`w-5 h-5 text-text-secondary group-hover:text-accent-primary transition-all duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 sm:p-6 bg-bg-primary border-t border-border-subtle">
          {children}
        </div>
      </div>
    </div>
  );
};
