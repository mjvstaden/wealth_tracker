# Project Structure

This document explains the folder structure and organization of the True North Wealth Analytics project.

## Directory Overview

```
wealth_tracker/
├── public/                     # Static assets
├── src/                        # Source code
│   ├── components/            # React components
│   ├── pages/                 # Page components (routes)
│   ├── lib/                   # Core utilities and logic
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── data/                  # Static data and templates
│   └── styles/                # Global styles
├── MVP_PLAN.md               # MVP feature plan and roadmap
├── PROJECT_STRUCTURE.md      # This file
└── README.md                 # Project overview
```

## Component Organization

### `/src/components/ui/`
Reusable, generic UI components that can be used throughout the app:
- `Button.tsx` - Custom button component
- `Card.tsx` - Card container component
- `Input.tsx` - Form input component
- `Select.tsx` - Dropdown select component

### `/src/components/layout/`
Layout and navigation components:
- `Header.tsx` - Top navigation bar
- `Footer.tsx` - Footer with links
- `Navigation.tsx` - Main navigation menu

### `/src/components/scenario/`
Scenario-specific components:
- `ScenarioForm.tsx` - Form for entering scenario details
- `ScenarioCard.tsx` - Card displaying saved scenario
- `TemplateCard.tsx` - Card for selecting a template

### `/src/components/results/`
Components for displaying calculation results:
- `ComparisonTable.tsx` - Side-by-side comparison table
- `ComparisonChart.tsx` - Line chart visualization
- `ResultsSummary.tsx` - Plain English summary of results

### `/src/components/common/`
Shared utility components:
- `LoadingSpinner.tsx` - Loading state indicator
- `ErrorMessage.tsx` - Error display component

## Pages (Routes)

### `/src/pages/`
Top-level page components mapped to routes:
- `Home.tsx` - Landing page with template selection
- `ScenarioSetup.tsx` - Form for creating/editing scenarios
- `Results.tsx` - Results comparison page
- `SavedScenarios.tsx` - List of saved scenarios
- `About.tsx` - About page explaining how it works

## Core Logic

### `/src/lib/`
Pure utility functions and business logic:

#### `calculations.ts`
Core financial calculations:
- `calculateFutureValue()` - Compound interest calculation
- `generateYearlyBreakdown()` - Year-by-year breakdown
- `compareScenarios()` - Compare two scenarios

#### `storage.ts`
LocalStorage operations:
- `getScenarios()` - Load all scenarios
- `saveScenario()` - Save new scenario
- `updateScenario()` - Update existing scenario
- `deleteScenario()` - Delete scenario
- `getScenarioById()` - Get single scenario

#### `formatters.ts`
Display formatting utilities:
- `formatCurrency()` - Format as currency
- `formatPercentage()` - Format as percentage
- `formatDate()` - Format dates
- `formatRelativeTime()` - "2 days ago" style

#### `validators.ts`
Form validation:
- `validateScenarioDetails()` - Validate scenario inputs
- `validateScenarioName()` - Validate scenario name

## Custom Hooks

### `/src/hooks/`
React hooks for state management and logic:
- `useScenarios.ts` - CRUD operations for scenarios
- `useCalculator.ts` - Calculation logic and results
- `useLocalStorage.ts` - localStorage wrapper

## Type Definitions

### `/src/types/index.ts`
All TypeScript interfaces and types:
- `Scenario` - Main scenario interface
- `ScenarioDetails` - Individual scenario data
- `CalculationResult` - Comparison results
- `YearlyBreakdown` - Year-by-year data
- `ScenarioType` - Scenario type enum

## Static Data

### `/src/data/`
Pre-configured data:
- `templates.ts` - Pre-built scenario templates (Buy vs Rent, Car vs Invest, etc.)

## Styles

### `/src/styles/`
Global CSS:
- `globals.css` - Global styles and Tailwind directives

## File Naming Conventions

- **Components**: PascalCase (`ScenarioForm.tsx`)
- **Utilities**: camelCase (`calculations.ts`)
- **Hooks**: camelCase with `use` prefix (`useScenarios.ts`)
- **Types**: PascalCase interfaces in `index.ts`
- **Pages**: PascalCase (`Home.tsx`)

## Import Conventions

Use absolute imports from `src/`:

```typescript
// ✅ Good
import { Scenario } from '../types';
import { calculateFutureValue } from '../lib/calculations';

// ❌ Avoid deep relative paths
import { Scenario } from '../../../types';
```

## Component Structure Template

Each component should follow this structure:

```typescript
/**
 * Brief description of component
 */

import React from 'react';
// Other imports...

interface ComponentNameProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic

  return (
    // JSX
  );
}
```

## Next Steps

1. Build out the core calculation logic in `/src/lib/calculations.ts`
2. Create the basic page structure in `/src/pages/`
3. Build reusable UI components in `/src/components/ui/`
4. Wire up routing and navigation
5. Implement localStorage persistence

Refer to `MVP_PLAN.md` for the full feature roadmap.
