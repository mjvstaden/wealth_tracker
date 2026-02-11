import { Region, RegionalConfig } from '../../types/regional';
import { southAfricaConfig } from './south-africa';

export const regionalConfigs: Record<Region, RegionalConfig> = {
  ZA: southAfricaConfig,
};

export function getRegionalConfig(region: Region): RegionalConfig {
  return regionalConfigs[region] || southAfricaConfig;
}
