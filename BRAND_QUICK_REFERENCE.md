# True North Wealth Analytics - Brand Quick Reference

**Quick reference for designers and developers working on the project**

---

## Brand Essence

**Tagline**: Navigate your financial future with clarity and confidence

**Mission**: Empower people to make better financial decisions through clear, analytical comparison tools

**Personality**: Approachable Modern | Sophisticated | Clear | Future-Forward | Elite yet Accessible

---

## Core Colors

### Primary Palette
```
Black:        #000000  (Main background - pure black)
Electric Blue: #0ea5e9  (Accent & primary actions)
White:        #ffffff  (Primary text - maximum contrast)
```

### Semantic Colors
```
Success: #22c55e  (Positive values, growth)
Error:   #ef4444  (Negative values, losses)
Warning: #f59e0b  (Caution, attention)
```

### Grays (Minimal Use)
```
Dark Gray:    #0a0a0a  (Elevated surfaces)
Border Gray:  #262626  (Subtle borders)
Text Gray:    #a3a3a3  (Secondary text)
Muted Gray:   #737373  (Tertiary text)
```

### When to Use Each Color
- **Pure Black (#000000)**: Main backgrounds, maximum contrast
- **Electric Blue (#0ea5e9)**: Primary buttons, highlights, hover states, key data
- **White (#ffffff)**: Primary text, headings, important content
- **Green (#22c55e)**: Positive numbers, growth, success
- **Red (#ef4444)**: Negative numbers, warnings, errors
- **Gray (#a3a3a3)**: Secondary information, labels

---

## Typography

### Fonts
```
Display:  Space Grotesk (headings, hero text)
Body:     Inter (UI, body text)
Numbers:  JetBrains Mono (financial data)
```

### Key Rules
- Body text: 16px minimum
- All numbers: JetBrains Mono, always right-align in tables
- Headings: Space Grotesk, weight 600-700
- Labels: All-caps with 0.05em letter-spacing
- Line-height: 1.6 for body, 1 for hero numbers

---

## Component Quick Guide

### Buttons
```
Primary:   Electric blue bg (#0ea5e9), black text, uppercase
Secondary: Transparent bg, gray border, white text
Hover:     Blue glow, translateY(-2px)
```

### Cards
```
Background: #0a0a0a (dark gray)
Border:     1px solid #262626
Radius:     0.5rem (8px)
Padding:    2rem
Hover:      Blue border, subtle glow
```

### Numbers
```
Positive:  Green (#22c55e), JetBrains Mono, text-shadow glow
Negative:  Red (#ef4444), JetBrains Mono, text-shadow glow
Hero:      3rem (48px), bold, electric blue, glow effect
Standard:  1rem, semibold, monospace, right-aligned
```

### Inputs
```
Background: #000000 (pure black)
Border:     1px solid #262626
Focus:      Electric blue border + glow
Radius:     0.5rem
Padding:    1rem 1.5rem
```

---

## Animations

### Core Keyframes
```
fadeInUp:      0.6s - Sections and content
slideInLeft:   0.6s - Left comparison cards
slideInRight:  0.6s - Right comparison cards
chartGrow:     0.8s - Bar charts from bottom
shimmer:       2s infinite - Progress bars
```

### Staggered Delays
```
Use nth-child delays (0.1s, 0.2s, 0.3s, 0.4s)
For stats grids, chart bars, sequential reveals
```

### Hover Effects
```
Cards:   translateY(-4px), blue border, glow
Buttons: translateY(-2px), blue glow
Charts:  Blue glow on hover
```

---

## Layout Rules

### Spacing (8px System)
```
4px:  --space-xs
8px:  --space-sm
16px: --space-md (default)
24px: --space-lg
32px: --space-xl
48px: --space-2xl
64px: --space-3xl
```

### Border Radius (Minimal)
```
6px:  --radius-sm (subtle)
8px:  --radius-md (default)
12px: --radius-lg (larger elements)
```

### Layout
- Max content width: 1400px
- Generous whitespace (don't crowd data)
- Pure black backgrounds
- High contrast throughout

---

## Writing Style

### Voice
✅ "If you invest instead, you'll have $127,000 more"
❌ "You MUST invest in the market!"

✅ "Assuming 7% annual return (stock market average)"
❌ "Guaranteed 7% returns!"

### Key Principles
- Use "you" and "your"
- Plain English, no jargon
- Show, don't tell
- Empower, don't prescribe
- Be approachable, not intimidating

---

## Icons
- Style: Outlined, minimal, clean
- Library: Lucide React or Heroicons
- Color: White (#ffffff) or electric blue (#0ea5e9)
- Common: TrendingUp, Calculator, Home, Car, DollarSign

---

## Charts

### Style
- Ultra-minimal design
- Clean bars with subtle borders
- Smooth growth animations
- Blue accent for primary data

### Colors
```
Primary:    Electric blue (#0ea5e9)
Comparison: Light blue (#38bdf8)
Background: Dark gray (#1a1a1a)
Grid:       rgba(255, 255, 255, 0.05)
Labels:     Gray (#737373)
```

### Animation
- Use chartGrow animation (0.8s ease-out)
- Stagger delays for sequential bars
- Hover: Blue glow effect

---

## Mobile

### Adaptations
- Touch targets: 48x48px minimum
- Full-width cards and buttons
- Stack comparison cards vertically
- Reduce display sizes by 30-40%
- Maintain 16px minimum for body text
- Increase line-height to 1.7

---

## Accessibility

### Contrast
- White on black: ✓ AAA (21:1)
- Electric blue on black: ✓ AA (4.5:1+)
- Always test color combinations

### Focus States
```
Outline: 2px solid electric blue
Offset:  2px
Shadow:  Blue glow
```

### Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Do's ✓

**Visual Design**:
- Use pure black (#000000) for backgrounds
- Apply electric blue sparingly for impact
- Implement smooth, sleek animations
- Maintain maximum contrast (white on black)
- Keep borders minimal (#262626)

**Color Usage**:
- Electric blue for primary actions only
- Use semantic colors (green = success, red = error)
- Test all colors on pure black background

**Typography**:
- JetBrains Mono for ALL financial data
- Space Grotesk for headings
- All-caps for labels with letter-spacing
- Right-align all numbers in tables

---

## Don'ts ❌

**Visual Design**:
- No multiple bright colors at once
- No overusing blue glow effect
- No prominent borders
- No gray backgrounds (use pure black)
- No unnecessary decorative elements

**Color Usage**:
- No low-contrast combinations
- No colors without semantic meaning
- No relying only on color for information

**Typography**:
- No decorative fonts for data
- No text smaller than 14px
- No center-aligned numbers
- No mixing font families in sections

**Interactions**:
- No unexpected changes
- No unclear error messages
- No tiny touch targets
- No auto-playing heavy animations

---

## Quick Color Reference

```css
/* Copy-paste ready */

/* Backgrounds */
--bg-primary: #000000;      /* Pure black */
--bg-secondary: #0a0a0a;    /* Elevated surfaces */
--bg-elevated: #141414;     /* Cards */

/* Accent */
--accent-primary: #0ea5e9;  /* Electric blue */
--accent-light: #38bdf8;    /* Hover states */
--accent-dark: #0284c7;     /* Pressed states */

/* Text */
--text-primary: #ffffff;    /* White */
--text-secondary: #a3a3a3;  /* Light gray */
--text-tertiary: #737373;   /* Muted gray */

/* Borders */
--border-default: #262626;  /* Subtle borders */
--border-subtle: #1a1a1a;   /* Very subtle */

/* Semantic */
--success: #22c55e;
--error: #ef4444;
--warning: #f59e0b;
```

---

## Quick Typography Reference

```css
/* Headings - Space Grotesk */
.page-title    {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
}

.section-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  color: #ffffff;
  font-family: 'Space Grotesk', sans-serif;
}

/* Labels - Uppercase */
.label {
  font-size: 0.75rem; /* 12px */
  font-weight: 600;
  color: #a3a3a3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Body - Inter */
.body-text {
  font-size: 1rem; /* 16px */
  font-weight: 400;
  color: #ffffff;
  line-height: 1.6;
}

.secondary-text {
  font-size: 0.875rem; /* 14px */
  color: #a3a3a3;
}

/* Numbers - JetBrains Mono */
.hero-number {
  font-size: 3rem; /* 48px */
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: #0ea5e9;
  text-shadow: 0 0 40px rgba(14, 165, 233, 0.5);
}

.data-number {
  font-size: 1rem; /* 16px */
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  text-align: right;
}

.positive {
  color: #22c55e;
  text-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
}

.negative {
  color: #ef4444;
  text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}
```

---

## Quick Animation Reference

```css
/* Core Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes chartGrow {
  from { transform: scaleY(0); transform-origin: bottom; }
  to { transform: scaleY(1); transform-origin: bottom; }
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

/* Usage */
.animate-in {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.chart-bar {
  animation: chartGrow 0.8s ease-out;
  animation-fill-mode: both;
}

/* Stagger with nth-child */
.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.3s; }
.stat-item:nth-child(4) { animation-delay: 0.4s; }
```

---

## Design Principles Summary

1. **Ultra-Minimal Clarity**: Pure black, high contrast, minimal decoration
2. **Sleek Futuristic**: Electric blue accent, smooth animations
3. **Approachable Modern**: Sophisticated but user-friendly
4. **Data First**: Numbers are the hero, charts tell stories
5. **Smooth Motion**: Staggered animations, purposeful movement

---

**For full details, see BRANDING_GUIDE.md**

**Last Updated**: 2025-11-23
