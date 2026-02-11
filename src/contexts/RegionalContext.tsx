import React, { createContext, useContext, ReactNode } from 'react';
import { RegionalConfig } from '../types/regional';
import { getRegionalConfig } from '../config/regional';

interface RegionalContextType {
  region: 'ZA';
  config: RegionalConfig;
}

const RegionalContext = createContext<RegionalContextType | undefined>(undefined);

interface RegionalProviderProps {
  children: ReactNode;
}

export const RegionalProvider: React.FC<RegionalProviderProps> = ({ children }) => {
  const value: RegionalContextType = {
    region: 'ZA',
    config: getRegionalConfig('ZA'),
  };

  return (
    <RegionalContext.Provider value={value}>
      {children}
    </RegionalContext.Provider>
  );
};

export const useRegional = (): RegionalContextType => {
  const context = useContext(RegionalContext);
  if (!context) {
    throw new Error('useRegional must be used within RegionalProvider');
  }
  return context;
};

export const useRegionalConfig = (): RegionalConfig => {
  const { config } = useRegional();
  return config;
};
