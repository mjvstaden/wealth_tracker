import React, { useState } from 'react';

interface InfoTooltipProps {
  content: string;
  className?: string;
}

/**
 * Ultra-minimal info tooltip with electric blue accent
 * Shows helpful explanations on hover
 */
export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border-default text-text-tertiary hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="More information"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 z-50 animate-fade-in-up">
          <div className="bg-bg-elevated border border-border-default rounded-md p-3 shadow-glow-blue">
            <p className="text-xs text-text-secondary leading-relaxed">{content}</p>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-bg-elevated" />
          </div>
        </div>
      )}
    </div>
  );
};
