# True North Wealth Analytics

Professional-grade financial scenario comparison tool that helps you make better long-term financial decisions.

## What is this?

True North Wealth Analytics helps you answer critical financial questions:
- **Should I buy or rent?** See the 20-30 year impact of homeownership vs renting and investing
- **Should I buy that car?** Compare buying a car vs investing that money instead
- **How much should I invest monthly?** Understand how different contribution levels affect your wealth

Instead of just showing compound interest calculations, this tool lets you **compare scenarios side-by-side** and save them for future reference.

## Features (MVP)

✅ **Pre-built Templates** - Buy vs Rent, Car vs Invest, Contribution Impact
✅ **Side-by-Side Comparison** - See both scenarios with year-by-year breakdown
✅ **Save Scenarios** - Save and reload your analyses later
✅ **Plain English Results** - Get clear answers, not just numbers
✅ **Mobile Responsive** - Works on phone, tablet, and desktop

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts (planned)
- **Storage**: LocalStorage (v1), .NET backend (v2)

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder organization.

```
src/
├── components/    # React components
├── pages/         # Route pages
├── lib/           # Core logic (calculations, storage, formatting)
├── hooks/         # Custom React hooks
├── types/         # TypeScript types
├── data/          # Templates and static data
└── styles/        # Global styles
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Key Files

- **MVP_PLAN.md** - Complete feature plan and roadmap
- **PROJECT_STRUCTURE.md** - Folder organization guide
- **src/lib/calculations.ts** - Core financial calculations
- **src/lib/storage.ts** - LocalStorage utilities
- **src/types/index.ts** - TypeScript type definitions

## Roadmap

### ✅ Phase 1: Foundation (Current)
- Project setup
- Core calculation logic
- Type definitions
- Storage utilities

### 🚧 Phase 2: Basic UI (Next)
- Home page with template selection
- Scenario setup form
- Results display
- Save/load functionality

### 📋 Phase 3: Enhanced UI
- Charts and visualizations
- Saved scenarios list
- Edit functionality
- Mobile optimization

### 🔮 Phase 4: Polish & Deploy
- About page
- Error handling
- Performance optimization
- Deploy to production

### 🚀 Phase 5: .NET Backend (Future)
- User authentication
- Cloud storage
- Sync across devices
- Advanced features

## Design Principles

- **Simple First** - Only essential features in MVP
- **Clear Results** - Plain English summaries, not just numbers
- **Mobile-First** - Responsive design from day one
- **Type-Safe** - TypeScript everywhere
- **Fast** - Instant calculations, no loading delays

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT

---

**Status**: 🚧 MVP in Development
**Last Updated**: 2025-11-23
