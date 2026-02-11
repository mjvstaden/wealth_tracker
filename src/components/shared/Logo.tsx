import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * True North compass star logo.
 * 4-pointed compass rose with the north point emphasized.
 * Works at any size - optimized for 16px+ rendering.
 */
export const LogoMark: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* North - full opacity, the "True North" */}
    <path d="M12 0L15 9L12 12L9 9Z" />
    {/* East */}
    <path d="M24 12L15 9L12 12L15 15Z" opacity="0.35" />
    {/* South */}
    <path d="M12 24L15 15L12 12L9 15Z" opacity="0.35" />
    {/* West */}
    <path d="M0 12L9 15L12 12L9 9Z" opacity="0.35" />
  </svg>
);
