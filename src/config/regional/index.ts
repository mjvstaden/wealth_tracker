import { Region, RegionalConfig } from '../../types/regional';
import { southAfricaConfig } from './south-africa';
import { unitedStatesConfig } from './united-states';

export const regionalConfigs: Record<Region, RegionalConfig> = {
  ZA: southAfricaConfig,
  US: unitedStatesConfig,
};

export function getRegionalConfig(region: Region): RegionalConfig {
  return regionalConfigs[region];
}

export { southAfricaConfig, unitedStatesConfig };
