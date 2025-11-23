import React from 'react';
import { Globe } from 'lucide-react';
import { useRegional } from '../contexts/RegionalContext';
import { Region } from '../types/regional';

/**
 * Region Selector Component
 * Allows users to switch between South Africa and United States
 */
export const RegionSelector: React.FC = () => {
  const { region, setRegion, config } = useRegional();

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
    // Scroll to top when changing region to show updated form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center gap-3 bg-bg-secondary border border-border-default rounded-md p-2">
      <Globe className="w-4 h-4 text-text-secondary flex-shrink-0" />

      <div className="flex gap-1">
        <button
          onClick={() => handleRegionChange('ZA')}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            region === 'ZA'
              ? 'bg-accent-primary text-bg-primary'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
          }`}
          aria-label="Switch to South Africa"
        >
          🇿🇦 ZA
        </button>

        <button
          onClick={() => handleRegionChange('US')}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            region === 'US'
              ? 'bg-accent-primary text-bg-primary'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
          }`}
          aria-label="Switch to United States"
        >
          🇺🇸 US
        </button>
      </div>

      <span className="text-sm text-text-tertiary ml-2 hidden md:inline">
        {config.name}
      </span>
    </div>
  );
};
