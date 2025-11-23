/**
 * Pre-built scenario templates
 */

import { ScenarioDetails, ScenarioType } from '../types';

export interface Template {
  id: ScenarioType;
  name: string;
  description: string;
  icon: string;
  scenarioA: Partial<ScenarioDetails>;
  scenarioB: Partial<ScenarioDetails>;
}

export const templates: Template[] = [
  {
    id: 'buy-vs-rent',
    name: 'Buy vs Rent',
    description: 'Should you buy a home or rent and invest the difference?',
    icon: '🏠',
    scenarioA: {
      label: 'Buy Home',
      initialAmount: 50000, // Down payment
      monthlyAmount: 2000, // Mortgage payment
      returnRate: 3, // Home appreciation
      timeHorizon: 30,
    },
    scenarioB: {
      label: 'Rent & Invest',
      initialAmount: 50000, // Same down payment invested
      monthlyAmount: 500, // Rent is $1500, invest $500 difference
      returnRate: 7, // Stock market return
      timeHorizon: 30,
    },
  },
  {
    id: 'car-vs-invest',
    name: 'Car vs Invest',
    description: 'Buy a car now or invest that money instead?',
    icon: '🚗',
    scenarioA: {
      label: 'Buy Car',
      initialAmount: 30000, // Car price
      monthlyAmount: 0, // No ongoing investment
      returnRate: -15, // Car depreciation
      timeHorizon: 20,
    },
    scenarioB: {
      label: 'Invest Instead',
      initialAmount: 30000, // Invest car price
      monthlyAmount: 0, // No additional investment
      returnRate: 7, // Stock market return
      timeHorizon: 20,
    },
  },
  {
    id: 'contribution',
    name: 'Contribution Impact',
    description: 'See how different monthly contributions affect your wealth',
    icon: '💰',
    scenarioA: {
      label: '$500/month',
      initialAmount: 0,
      monthlyAmount: 500,
      returnRate: 7,
      timeHorizon: 30,
    },
    scenarioB: {
      label: '$1000/month',
      initialAmount: 0,
      monthlyAmount: 1000,
      returnRate: 7,
      timeHorizon: 30,
    },
  },
];

/**
 * Get template by ID
 */
export function getTemplateById(id: ScenarioType): Template | undefined {
  return templates.find(t => t.id === id);
}
