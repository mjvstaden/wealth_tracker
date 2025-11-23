/**
 * LocalStorage utilities for persisting scenarios
 */

import { Scenario } from '../types';

const STORAGE_KEY = 'wealth_tracker_scenarios';

/**
 * Get all saved scenarios from localStorage
 */
export function getScenarios(): Scenario[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const scenarios = JSON.parse(data);
    // Convert date strings back to Date objects
    return scenarios.map((s: any) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
    }));
  } catch (error) {
    console.error('Error loading scenarios from localStorage:', error);
    return [];
  }
}

/**
 * Save a new scenario to localStorage
 */
export function saveScenario(scenario: Scenario): void {
  try {
    const scenarios = getScenarios();
    scenarios.push(scenario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error('Error saving scenario to localStorage:', error);
    throw new Error('Failed to save scenario');
  }
}

/**
 * Update an existing scenario
 */
export function updateScenario(scenario: Scenario): void {
  try {
    const scenarios = getScenarios();
    const index = scenarios.findIndex(s => s.id === scenario.id);

    if (index === -1) {
      throw new Error('Scenario not found');
    }

    scenarios[index] = {
      ...scenario,
      updatedAt: new Date(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error('Error updating scenario:', error);
    throw new Error('Failed to update scenario');
  }
}

/**
 * Delete a scenario by ID
 */
export function deleteScenario(id: string): void {
  try {
    const scenarios = getScenarios();
    const filtered = scenarios.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting scenario:', error);
    throw new Error('Failed to delete scenario');
  }
}

/**
 * Get a single scenario by ID
 */
export function getScenarioById(id: string): Scenario | null {
  const scenarios = getScenarios();
  return scenarios.find(s => s.id === id) || null;
}

/**
 * Clear all scenarios (useful for testing)
 */
export function clearAllScenarios(): void {
  localStorage.removeItem(STORAGE_KEY);
}
