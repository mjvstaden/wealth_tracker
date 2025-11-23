import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Region, RegionalConfig } from '../types/regional';
import { getRegionalConfig } from '../config/regional';

interface RegionalContextType {
  region: Region;
  config: RegionalConfig;
  setRegion: (region: Region) => void;
}

const RegionalContext = createContext<RegionalContextType | undefined>(undefined);

interface RegionalProviderProps {
  children: ReactNode;
  defaultRegion?: Region;
}

/**
 * Regional Context Provider
 * Manages the selected region (ZA or US) and provides regional configuration
 */
export const RegionalProvider: React.FC<RegionalProviderProps> = ({
  children,
  defaultRegion = 'ZA', // Default to South Africa
}) => {
  // Initialize from localStorage or default
  const [region, setRegionState] = useState<Region>(() => {
    const stored = localStorage.getItem('true-north-region');
    return (stored === 'ZA' || stored === 'US') ? stored : defaultRegion;
  });

  const [config, setConfig] = useState<RegionalConfig>(() => getRegionalConfig(region));

  // Update config when region changes
  useEffect(() => {
    setConfig(getRegionalConfig(region));
    localStorage.setItem('true-north-region', region);
  }, [region]);

  const value: RegionalContextType = {
    region,
    config,
    setRegion: setRegionState,
  };

  return (
    <RegionalContext.Provider value={value}>
      {children}
    </RegionalContext.Provider>
  );
};

/**
 * Hook to access regional context
 * @throws Error if used outside RegionalProvider
 */
export const useRegional = (): RegionalContextType => {
  const context = useContext(RegionalContext);
  if (!context) {
    throw new Error('useRegional must be used within RegionalProvider');
  }
  return context;
};

/**
 * Hook to get regional config directly
 */
export const useRegionalConfig = (): RegionalConfig => {
  const { config } = useRegional();
  return config;
};

/**
 * Hook to get currency formatter
 */
export const useCurrency = () => {
  const { config } = useRegional();
  return {
    format: config.currency.format,
    symbol: config.currency.symbol,
    code: config.currency.code,
  };
};

/**
 * Hook to get regional terminology
 */
export const useTerminology = () => {
  const { config } = useRegional();
  return config.terminology;
};
