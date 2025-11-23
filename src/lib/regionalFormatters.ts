/**
 * Regional-aware formatting utilities
 * These functions use the regional configuration for currency formatting
 */

import { RegionalConfig } from '../types/regional';

/**
 * Format number as currency using regional config
 */
export function formatRegionalCurrency(amount: number, config: RegionalConfig): string {
  return config.currency.format(amount, false);
}

/**
 * Format number as compact currency (e.g., R2.5M, $1.2M)
 */
export function formatRegionalCurrencyCompact(amount: number, config: RegionalConfig): string {
  return config.currency.format(amount, true);
}

/**
 * Format number as percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date as readable string
 */
export function formatDate(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
