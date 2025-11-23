# True North Wealth Analytics - MVP Plan

## Project Overview

**Name**: True North Wealth Analytics
**Purpose**: Help people analyze financial decisions and understand their long-term impact
**Target User**: Individuals making major financial decisions (buy vs rent, car purchases, investment contributions)

---

## Core Problem Statement

"Should I make Decision A or Decision B, and what's the 20-30 year impact on my wealth?"

### Key Questions to Answer:
1. Should I buy or rent?
2. What's the impact of buying a car now vs investing that money over 20-30 years?
3. How much do my monthly contributions affect my net worth?

---

## MVP Features (Version 1.0)

### 1. Scenario Builder (The Heart)
Create and name financial scenarios with:
- **Initial Amount** (one-time investment/cost)
- **Monthly Contribution** (recurring payment/investment)
- **Time Horizon** (years - typically 20-30)
- **Expected Return Rate** (% annual)
- **Scenario Type** (Buy/Rent, Car/Invest, Contribution Analysis, Custom)

### 2. Three Pre-built Templates
Don't make users start from scratch - provide smart defaults:

**Template A: Buy vs Rent**
- Scenario 1: Home purchase (deposit + monthly mortgage)
- Scenario 2: Rent (rent cost) + Invest (deposit as initial + monthly savings difference)

**Template B: Car vs Invest**
- Scenario 1: Buy car (car price + depreciation over time)
- Scenario 2: Invest that money (same initial amount + monthly payment as investment)

**Template C: Contribution Impact**
- Compare different monthly contribution amounts
- Shows: "What if I invest $500/month vs $1000/month over 20 years?"

### 3. Side-by-Side Comparison
Simple, clear comparison showing:
- Year-by-year breakdown (1, 5, 10, 20, 30 years)
- Final values for both scenarios
- **Difference** (the most important number!)
- Basic line chart showing growth over time (one line per scenario)

### 4. Save Scenarios (Local Storage First)
- Save scenarios with a descriptive name
- List of all saved scenarios
- Load and edit saved scenarios later
- Delete scenarios you no longer need
- **No backend/database needed for MVP** - use browser localStorage

### 5. Results Summary
Simple, clear answer in plain English:
> "If you invest the car money instead, you'll have **$127,450 more** after 20 years"

---

## What's NOT in MVP (Save for v2+)

These are important but not critical for validating the core concept:

❌ User authentication (use localStorage instead)
❌ Real estate appreciation calculations
❌ Tax implications and tax optimization
❌ Inflation adjustment
❌ Multiple investment types (stocks, bonds, ETFs)
❌ Sharing scenarios with others
❌ PDF export
❌ Advanced charts and visualizations
❌ Budget tracking
❌ Debt payoff calculators
❌ Net worth dashboard
❌ Multiple currencies
❌ Mobile app
❌ Real-time market data

---

## Tech Stack

### Frontend
- **React 18+** with TypeScript (already set up)
- **Tailwind CSS** (already configured)
- **Recharts** (for simple, beautiful charts)
- **React Router** (for navigation)
- **LocalStorage API** (for saving scenarios)

### Backend (.NET - for v1.1+)
- **Start without it!** Use localStorage for MVP
- Add .NET backend later for:
  - User accounts and authentication
  - Syncing scenarios across devices
  - Sharing scenarios with others
  - Advanced analytics and reporting

---

## MVP User Flow

```
1. Landing Page
   - Brief explanation of what the app does
   - "What are you deciding?" (Pick template or start custom)
   ↓
2. Template Selection (or skip to custom)
   - Buy vs Rent
   - Car vs Invest
   - Contribution Impact
   - Start from Scratch
   ↓
3. Scenario A Setup
   - Fill in details for first option
   - Initial amount, monthly amount, return rate, time horizon
   ↓
4. Scenario B Setup
   - Fill in details for second option
   - Same fields as Scenario A
   ↓
5. Results/Comparison Page
   - Side-by-side table comparison
   - Line chart showing both scenarios
   - Difference highlighted
   - Plain English summary
   ↓
6. Save Scenario
   - Give it a memorable name
   - Saved to browser localStorage
   ↓
7. Saved Scenarios List
   - View all saved scenarios
   - Load to view/edit
   - Delete if no longer needed
```

---

## Screens/Pages (5 total)

### 1. Home/Landing
- Hero section explaining the app
- "What are you deciding?" section with template cards
- Quick stats/benefits
- Link to saved scenarios

### 2. Scenario Setup
- Form to enter details for both scenarios
- Template pre-fills if coming from template selection
- Can customize labels for each scenario
- Validation for required fields
- "Calculate" button

### 3. Results/Comparison
- Hero number showing the difference
- Side-by-side table (Year 1, 5, 10, 20, 30)
- Line chart visualization
- Plain English summary
- "Save This Scenario" button
- "Edit Scenario" button

### 4. Saved Scenarios
- List/grid of all saved scenarios
- Each card shows:
  - Scenario name
  - Date created
  - Quick preview of difference
  - Load/Delete actions
- "Create New Scenario" button

### 5. About/How It Works
- Quick explanation of calculations
- Assumptions made
- Disclaimer about estimates
- Contact/feedback option

---

## Data Structure

```typescript
interface Scenario {
  id: string; // UUID
  name: string; // "Buy car vs invest - Jan 2025"
  type: 'buy-vs-rent' | 'car-vs-invest' | 'contribution' | 'custom';
  scenarioA: ScenarioDetails;
  scenarioB: ScenarioDetails;
  createdAt: Date;
  updatedAt: Date;
}

interface ScenarioDetails {
  label: string; // "Buy Car" or "Invest Instead"
  initialAmount: number; // One-time amount (e.g., car price, house deposit)
  monthlyAmount: number; // Recurring monthly (e.g., car payment, investment)
  returnRate: number; // Annual percentage (e.g., 7% for stock market)
  timeHorizon: number; // Years to analyze (e.g., 20, 30)
}

interface CalculationResult {
  scenarioA: YearlyBreakdown[];
  scenarioB: YearlyBreakdown[];
  difference: number; // Final difference between scenarios
  summary: string; // Plain English explanation
}

interface YearlyBreakdown {
  year: number;
  totalValue: number;
  totalContributed: number;
  totalGrowth: number;
}
```

---

## MVP Calculation Logic

### Compound Interest Formula
```
FV = P(1+r)^t + PMT × [((1+r)^t - 1) / r]

Where:
- FV = Future Value
- P = Initial amount (principal)
- r = Monthly return rate (annual rate / 12)
- t = Number of months
- PMT = Monthly contribution
```

### Implementation Notes:
- Convert annual rate to monthly: `monthlyRate = annualRate / 12 / 100`
- Calculate monthly for accuracy, then aggregate to yearly for display
- For depreciation (like cars): use negative return rate
- Round all currency to 2 decimal places for display

---

## Project Structure

```
wealth_tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Select.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── scenario/              # Scenario-specific components
│   │   │   ├── ScenarioForm.tsx
│   │   │   ├── ScenarioCard.tsx
│   │   │   └── TemplateCard.tsx
│   │   ├── results/               # Results display components
│   │   │   ├── ComparisonTable.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   └── ResultsSummary.tsx
│   │   └── common/                # Shared components
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorMessage.tsx
│   ├── pages/                     # Route pages
│   │   ├── Home.tsx
│   │   ├── ScenarioSetup.tsx
│   │   ├── Results.tsx
│   │   ├── SavedScenarios.tsx
│   │   └── About.tsx
│   ├── lib/                       # Utilities and helpers
│   │   ├── calculations.ts        # Compound interest logic
│   │   ├── storage.ts             # localStorage helpers
│   │   ├── formatters.ts          # Currency, number formatting
│   │   └── validators.ts          # Form validation
│   ├── hooks/                     # Custom React hooks
│   │   ├── useScenarios.ts        # Manage scenarios (CRUD)
│   │   ├── useCalculator.ts       # Calculation logic
│   │   └── useLocalStorage.ts     # localStorage wrapper
│   ├── types/                     # TypeScript types
│   │   └── index.ts               # All type definitions
│   ├── data/                      # Static data
│   │   └── templates.ts           # Pre-built scenario templates
│   ├── styles/                    # Global styles
│   │   └── globals.css
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx                 # Route configuration
├── MVP_PLAN.md                    # This file
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Success Metrics (How we know MVP works)

### Technical
- App loads in < 2 seconds
- Calculations are accurate (manually verify)
- Works on mobile and desktop
- No crashes or console errors
- Scenarios save/load reliably from localStorage

### User Experience
- User can complete a scenario comparison in < 3 minutes
- Results are immediately understandable
- Can save and reload scenarios successfully
- Mobile-friendly (responsive design)

### Personal Goals
- Answers your three key questions accurately
- Simple enough to share with friends/family
- Demonstrates your full-stack skills
- Features well on your personal website

---

## Development Phases

### Phase 1: Core Calculation Engine ✅ (Next Step)
- Build calculation logic (calculations.ts)
- Unit tests for accuracy
- TypeScript types defined

### Phase 2: Basic UI (Week 1)
- Home page with template selection
- Scenario setup form
- Results display (table only, no chart)
- localStorage integration

### Phase 3: Enhanced UI (Week 2)
- Add charts (Recharts)
- Saved scenarios list
- Edit functionality
- Responsive design polish

### Phase 4: Polish & Deploy (Week 3)
- About page
- Error handling
- Loading states
- Deploy to Vercel/Netlify
- Add to personal website

### Phase 5: .NET Backend (Future)
- User authentication
- Database (PostgreSQL)
- API for scenarios
- Sync across devices

---

## Design Principles

### Visual Design
- Clean, modern, professional
- Can match your personal website aesthetic (dark mode, blue-green cyberpunk)
- OR: Light, financial/professional look (blue/green trust colors)
- Mobile-first responsive design

### User Experience
- Simple, clear, no jargon
- Instant feedback
- Minimize form fields (only what's needed)
- Results in plain English, not just numbers
- Fast performance

### Development
- Type-safe (TypeScript everywhere)
- Component-based architecture
- Reusable utilities
- Test critical calculations
- Clean, documented code

---

## Future Enhancements (v2.0+)

### Short-term
- Inflation adjustment toggle
- Tax implications calculator
- Real estate appreciation modeling
- Multiple scenarios (compare 3+ options)
- PDF export of results
- Share scenario via link

### Long-term
- User accounts (.NET backend)
- Net worth tracking dashboard
- Budget integration
- Debt payoff planning
- Investment portfolio analysis
- Retirement planning calculator
- Real-time market data integration
- AI-powered recommendations

---

## Key Decisions & Assumptions

### Assumptions
- Average stock market return: ~7-10% annually
- Car depreciation: ~15-20% per year (simplify to negative return)
- No transaction fees or taxes in calculations
- Contributions made at start of each month
- Returns compound monthly

### Decisions
- Start with localStorage (no backend) to validate concept
- Simple, clear UI over complex features
- Focus on comparison, not absolute accuracy
- Templates guide users instead of blank forms
- Plain English summaries, not just numbers

---

## Questions to Validate

Before building, confirm:
1. ✅ Are these the right questions to answer? (Buy vs Rent, Car vs Invest, Contributions)
2. ✅ Is side-by-side comparison the right format?
3. ✅ Is localStorage sufficient for MVP, or do you need backend from day 1?
4. ✅ Should this match your personal website aesthetic, or have its own look?
5. ✅ Is 5 pages the right scope, or too much?

---

## Notes

- Reference this plan when scope creep happens
- Don't add features until MVP is complete and validated
- Test with real scenarios (your own decisions)
- Get feedback from 3-5 people before adding more features
- Keep it simple - the goal is to ship, not perfect

---

*Last Updated: 2025-11-23*
*This is a living document - update as you learn and build*
