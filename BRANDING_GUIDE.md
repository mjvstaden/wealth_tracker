# True North Wealth Analytics - Ultra-Minimal Design System

## Brand Overview

**Core Identity**: Your trusted compass for navigating complex financial decisions with clarity and confidence

**Visual Direction**: Ultra-minimal, futuristic, sleek with electric blue accents and smooth animations

**Personality Traits**: Approachable Modern, Clear, Sophisticated, Elite yet Accessible, Future-Forward

---

## Design Philosophy

### Ultra-Minimal Futuristic Aesthetic

True North combines maximum contrast minimalism with subtle futuristic accents:
- **Pure black backgrounds** for ultimate contrast and modern appeal
- **Electric blue accents** used sparingly for futuristic energy
- **Sleek animations** that feel smooth and intentional
- **High contrast** for crystal-clear readability
- **Minimal borders** with clean, sharp edges
- **Data-driven visuals** that inform with clarity

### The Experience

Financial tools should feel modern, approachable, and sophisticated. True North delivers powerful analysis through an ultra-minimal interface with just enough futuristic flair to feel innovative without being overwhelming.

---

## Color Palette

### Background System (Pure Black)

```css
/* Pure Black - Maximum Contrast */
--bg-primary: #000000;          /* Main background - pure black */
--bg-secondary: #0a0a0a;        /* Slightly elevated surfaces */
--bg-elevated: #141414;         /* Cards and elevated elements */

/* Borders */
--border-subtle: #1a1a1a;       /* Very subtle borders */
--border-default: #262626;      /* Default borders */
--border-accent: #333333;       /* Slightly stronger borders */
```

### Accent Colors (Electric Blue)

```css
/* Electric Blue - Futuristic Accent */
--accent-primary: #0ea5e9;      /* Primary brand color */
--accent-light: #38bdf8;        /* Hover states, highlights */
--accent-dark: #0284c7;         /* Pressed states, shadows */
--accent-glow: rgba(14, 165, 233, 0.5); /* Glow effects */
```

### Text Colors (High Contrast)

```css
/* Text Hierarchy */
--text-primary: #ffffff;        /* Primary text - pure white */
--text-secondary: #a3a3a3;      /* Secondary text - light gray */
--text-tertiary: #737373;       /* Tertiary text - muted gray */
--text-muted: #525252;          /* Muted text - subtle gray */
```

### Semantic Colors

```css
/* Success - Positive values, growth */
--success: #22c55e;
--success-glow: rgba(34, 197, 94, 0.5);

/* Warning - Caution, attention */
--warning: #f59e0b;
--warning-glow: rgba(245, 158, 11, 0.5);

/* Error - Negative values, losses */
--error: #ef4444;
--error-glow: rgba(239, 68, 68, 0.5);
```

### Gradient System

```css
/* Logo Gradient - White to Blue */
--gradient-logo: linear-gradient(to right, #ffffff, #0ea5e9);

/* Accent Gradient - Blue variations */
--gradient-accent: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);

/* Shimmer Effect - For animations */
--gradient-shimmer: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent);

/* Sweep Effect - For hover animations */
--gradient-sweep: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
```

### Color Usage Guidelines

**Electric Blue Accent**:
- Use sparingly for maximum impact
- Primary buttons and CTAs
- Interactive element hover states
- Key data highlights
- Borders on active/focused elements

**Pure Black Backgrounds**:
- Main application background: #000000
- Elevated cards: #0a0a0a or #141414
- Create subtle depth through minimal shading

**High Contrast Text**:
- Always use pure white (#ffffff) for primary content
- Ensure text is crisp and easily readable
- Use secondary colors (#a3a3a3) for less important information

---

## Typography

### Font Families

```css
/* Display Font - Modern Geometric Sans */
--font-display: 'Space Grotesk', sans-serif;
/* Use for: Headings, hero text, brand elements */

/* Body Font - Professional Sans Serif */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
/* Use for: Body text, UI elements, general content */

/* Monospace Font - Financial Data */
--font-mono: 'JetBrains Mono', 'SF Mono', 'Roboto Mono', monospace;
/* Use for: Numbers, financial data, precise values */
```

**Font Personality**:
- **Space Grotesk**: Modern, geometric, clean - perfect for headings
- **Inter**: Highly legible, professional - ideal for body text
- **JetBrains Mono**: Technical, precise - essential for financial data

### Type Scale

```css
/* Font Sizes - Responsive Scale */
--text-xs: 0.75rem;      /* 12px - Small labels */
--text-sm: 0.875rem;     /* 14px - Secondary text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Emphasized text */
--text-xl: 1.25rem;      /* 20px - Sub-headings */
--text-2xl: 1.5rem;      /* 24px - Section headings */
--text-3xl: 1.875rem;    /* 30px - Page headings */
--text-4xl: 2.25rem;     /* 36px - Hero headings */
--text-5xl: 3rem;        /* 48px - Large display */
--text-6xl: 3.75rem;     /* 60px - Extra large display */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Guidelines

**Headings**:
- Use Space Grotesk, weight 600-700
- Apply gradient for logo text (white to blue)
- All-caps for small labels (e.g., "CURRENT SCENARIO")
- Letter-spacing: 0.05em for all-caps text

**Financial Data**:
- Always use JetBrains Mono for numbers
- Bold weight (700) for primary amounts
- Right-align in tables and data grids
- Add blue glow to highlight key values

**Body Content**:
- Inter for all body text
- Minimum 16px for readability
- Line-height: 1.6 for comfortable reading
- Use text-secondary (#a3a3a3) for less important info

---

## Spacing & Layout

### Spacing Scale

```css
/* 8px Base Unit System */
--space-xs: 0.25rem;    /* 4px - Tight spacing */
--space-sm: 0.5rem;     /* 8px - Small spacing */
--space-md: 1rem;       /* 16px - Default spacing */
--space-lg: 1.5rem;     /* 24px - Medium spacing */
--space-xl: 2rem;       /* 32px - Large spacing */
--space-2xl: 3rem;      /* 48px - XL spacing */
--space-3xl: 4rem;      /* 64px - Section spacing */
```

### Border Radius (Minimal)

```css
/* Subtle Rounded Corners */
--radius-none: 0;           /* 0px - Sharp corners */
--radius-sm: 0.375rem;      /* 6px - Subtle rounding */
--radius-md: 0.5rem;        /* 8px - Default rounding */
--radius-lg: 0.75rem;       /* 12px - Larger elements */
--radius-full: 9999px;      /* Full circle/pill */
```

### Layout Principles

**Maximum Contrast**:
- Pure black backgrounds with pure white text
- Minimal use of intermediary gray tones
- Sharp, clean edges

**Breathing Room**:
- Generous spacing for clarity
- Never crowd financial data
- Let key numbers stand out with space

**Grid System**:
- CSS Grid for modern, flexible layouts
- Max content width: 1400px
- Responsive breakpoints: 320px, 768px, 1024px, 1280px

---

## UI Components

### Cards (Minimal Design)

**Standard Card**
```css
background: #0a0a0a;
border: 1px solid #262626;
border-radius: 0.5rem;
padding: 2rem;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

&:hover {
  border-color: #0ea5e9;
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.15);
}
```

**Card with Sweep Animation**
```css
.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
  transition: left 0.6s;
}

.card:hover::before {
  left: 100%;
}
```

### Buttons

**Primary Button**
```css
background: #0ea5e9;
color: #000000;
padding: 0.75rem 2rem;
border-radius: 0.5rem;
font-weight: 600;
font-size: 0.875rem;
text-transform: uppercase;
letter-spacing: 0.05em;
border: none;
transition: all 0.3s ease;

&:hover {
  background: #38bdf8;
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
  transform: translateY(-2px);
}
```

**Secondary Button (Outlined)**
```css
background: transparent;
border: 1px solid #262626;
color: #ffffff;
padding: 0.75rem 2rem;
border-radius: 0.5rem;
font-weight: 600;

&:hover {
  border-color: #0ea5e9;
  color: #0ea5e9;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.2);
}
```

### Input Fields

**Text Input**
```css
width: 100%;
padding: 1rem 1.5rem;
background: #000000;
border: 1px solid #262626;
border-radius: 0.5rem;
color: #ffffff;
font-size: 1rem;
transition: all 0.3s ease;

&:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

&::placeholder {
  color: #737373;
}
```

**Number Input (Financial)**
```css
font-family: 'JetBrains Mono', monospace;
font-weight: 600;
text-align: right;
```

### Data Display

**Hero Number**
```css
font-family: 'JetBrains Mono', monospace;
font-size: 3rem;
font-weight: 700;
color: #0ea5e9;
text-shadow: 0 0 40px rgba(14, 165, 233, 0.5);
line-height: 1;
```

**Positive Value**
```css
color: #22c55e;
text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
```

**Negative Value**
```css
color: #ef4444;
text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
```

### Progress Bars

```css
/* Container */
.progress-container {
  width: 100%;
  height: 8px;
  background: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
}

/* Fill with shimmer */
.progress-fill {
  height: 100%;
  background: #0ea5e9;
  position: relative;
  border-radius: 4px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

### Badges

```css
display: inline-flex;
align-items: center;
gap: 0.5rem;
padding: 0.375rem 0.75rem;
border-radius: 0.375rem;
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
background: #0a0a0a;
border: 1px solid #262626;

/* Blue Badge */
&.badge-primary {
  border-color: #0ea5e9;
  color: #0ea5e9;
}

/* Success Badge */
&.badge-success {
  border-color: #22c55e;
  color: #22c55e;
}
```

---

## Animation & Interactions

### Core Animations

**Fade In Up**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Usage */
.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}
```

**Slide In Left**
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Slide In Right**
```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Chart Growth**
```css
@keyframes chartGrow {
  from {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

/* Apply to chart bars */
.chart-bar {
  animation: chartGrow 0.8s ease-out;
  animation-fill-mode: both;
}

/* Stagger animation delays */
.chart-bar:nth-child(1) { animation-delay: 0.1s; }
.chart-bar:nth-child(2) { animation-delay: 0.2s; }
.chart-bar:nth-child(3) { animation-delay: 0.3s; }
.chart-bar:nth-child(4) { animation-delay: 0.4s; }
.chart-bar:nth-child(5) { animation-delay: 0.5s; }
```

**Shimmer Effect**
```css
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

### Staggered Animations

**Stats Grid**
```css
.stat-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.3s; }
.stat-item:nth-child(4) { animation-delay: 0.4s; }
```

### Transition Timing

```css
/* Speed */
--transition-quick: 150ms;
--transition-standard: 300ms;
--transition-slow: 600ms;

/* Easing Functions */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Hover Effects

**Card Hover**
```css
transform: translateY(-4px);
border-color: #0ea5e9;
box-shadow: 0 0 30px rgba(14, 165, 233, 0.15);
transition: all 0.3s ease;
```

**Button Hover**
```css
transform: translateY(-2px);
box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
```

**Interactive Element Glow**
```css
&:hover {
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
}
```

---

## Charts & Data Visualization

### Chart Style

**Ultra-Minimal Approach**:
- Clean bars with subtle borders
- Minimal grid lines (very low opacity)
- High contrast data presentation
- Blue accent for primary data
- Smooth growth animations on load

### Chart Colors

**Primary Data**:
- Main series: Electric Blue (#0ea5e9)
- Comparison: Lighter Blue (#38bdf8)
- Background bars: Dark gray (#1a1a1a)

**Chart Elements**:
- Grid lines: rgba(255, 255, 255, 0.05)
- Axis labels: #737373
- Data labels: #ffffff
- Hover highlights: Blue glow

### Chart Types

**Bar Charts**:
```css
.chart-bar {
  background: #0ea5e9;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  animation: chartGrow 0.8s ease-out;

  &:hover {
    background: #38bdf8;
    box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
  }
}
```

**Progress Visualization**:
- Use horizontal bars with blue fill
- Add shimmer animation for active progress
- Show percentage in JetBrains Mono

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-mobile: 320px;   /* Small phones */
--breakpoint-tablet: 768px;   /* Tablets */
--breakpoint-desktop: 1024px; /* Desktop */
--breakpoint-wide: 1280px;    /* Wide screens */
```

### Mobile Adaptations

**Typography**:
- Reduce display sizes by 30-40%
- Maintain 16px minimum for body text
- Increase line-height on mobile (1.7)

**Spacing**:
- Reduce padding by 25% on mobile
- Maintain touch targets (48x48px minimum)

**Cards**:
- Full-width on mobile
- Stack comparison cards vertically
- Reduce animations on low-end devices

---

## Accessibility

### Color Contrast

**WCAG 2.1 AAA Compliance**:
- White on black: ✓ AAA (21:1)
- Electric blue on black: ✓ AA (4.5:1+)
- Secondary text on black: ✓ AA (4.5:1+)

### Focus States

```css
&:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.2);
}
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Design Principles

### 1. Ultra-Minimal Clarity

**Less is more**:
- Pure black backgrounds for maximum contrast
- Minimal borders and decorations
- White text stands out clearly
- Electric blue used sparingly for impact

### 2. Sleek Futuristic Feel

**Modern without being flashy**:
- Smooth animations that feel intentional
- Electric blue accent for futuristic energy
- Clean, sharp edges
- High-tech aesthetic that's approachable

### 3. Approachable Modern

**Elite yet accessible**:
- Not intimidating or exclusive
- Clean and easy to understand
- Sophisticated but user-friendly
- Professional without being cold

### 4. Data First, Always

**Every element serves the data**:
- Numbers are the hero
- Charts tell clear stories
- High contrast ensures readability
- Animations guide attention smoothly

### 5. Smooth Animations

**Movement with purpose**:
- Staggered animations for sequential reveals
- Growth animations for charts
- Hover effects provide feedback
- Shimmer effects add subtle energy

---

## Implementation

### CSS Variables Setup

```css
:root {
  /* Backgrounds */
  --bg-primary: #000000;
  --bg-secondary: #0a0a0a;
  --bg-elevated: #141414;

  /* Borders */
  --border-subtle: #1a1a1a;
  --border-default: #262626;
  --border-accent: #333333;

  /* Accent */
  --accent-primary: #0ea5e9;
  --accent-light: #38bdf8;
  --accent-dark: #0284c7;

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-tertiary: #737373;
  --text-muted: #525252;

  /* Semantic */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  /* Transitions */
  --transition-quick: 150ms;
  --transition-standard: 300ms;
  --transition-slow: 600ms;
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
        },
        bg: {
          primary: '#000000',
          secondary: '#0a0a0a',
          elevated: '#141414',
        },
        border: {
          subtle: '#1a1a1a',
          default: '#262626',
          accent: '#333333',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'chart-grow': 'chartGrow 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        chartGrow: {
          from: { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          to: { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
}
```

---

## Do's and Don'ts

### ✓ Do's

**Visual Design**:
- Use pure black (#000000) for main backgrounds
- Apply electric blue accent sparingly
- Implement smooth, sleek animations
- Maintain high contrast (white on black)
- Keep borders minimal and subtle

**Color Usage**:
- Electric blue for primary actions and highlights
- Use semantic colors (green = success, red = error)
- Ensure maximum contrast for readability
- Test all colors on pure black background

**Typography**:
- Monospace (JetBrains Mono) for all financial data
- Space Grotesk for headings
- All-caps with letter-spacing for labels
- Right-align numbers in tables

### ✗ Don'ts

**Visual Design**:
- Don't use multiple bright colors at once
- Don't overuse the blue glow effect
- Don't make borders too prominent
- Don't add unnecessary decorative elements
- Don't create visual noise with too many effects

**Color Usage**:
- Don't use low-contrast color combinations
- Don't rely only on color for information
- Don't use gray backgrounds (use pure black)
- Don't add colors without semantic meaning

**Typography**:
- Don't use decorative fonts for data
- Don't make text smaller than 14px
- Don't center-align financial numbers
- Don't mix multiple font families in one section

---

## Performance Considerations

### Animation Performance

- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `margin`
- Implement staggered delays thoughtfully
- Respect `prefers-reduced-motion`

### Asset Optimization

- Use SVG for icons and graphics
- Optimize font loading (only required weights)
- Lazy load below-fold content
- Minimize CSS bundle size

---

## Quick Reference

### Primary Colors
- Pure Black: `#000000` - Main background
- Electric Blue: `#0ea5e9` - Accent color
- White: `#ffffff` - Primary text

### Typography
- Display: Space Grotesk
- Body: Inter
- Data: JetBrains Mono

### Key Values
- Background: `#000000`
- Elevated: `#0a0a0a`
- Border: `#262626`
- Accent: `#0ea5e9`
- Border Radius: `0.5rem` (8px)
- Spacing Unit: `1rem` (16px)

### Animations
- fadeInUp: 0.6s for sections
- slideInLeft/Right: 0.6s for cards
- chartGrow: 0.8s for data visualization
- shimmer: 2s infinite for progress

---

*This ultra-minimal design system positions True North as a modern, approachable, and sophisticated financial analysis tool that combines futuristic aesthetics with crystal-clear data presentation.*

**Last Updated**: 2025-11-23
