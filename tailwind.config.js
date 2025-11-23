/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ultra-Minimal Design System
        // Backgrounds
        bg: {
          primary: '#000000',      // Pure black
          secondary: '#0a0a0a',    // Elevated surfaces
          elevated: '#141414',     // Cards
        },

        // Accent - Electric Blue
        accent: {
          primary: '#0ea5e9',      // Electric blue
          light: '#38bdf8',        // Hover states
          dark: '#0284c7',         // Pressed states
        },

        // Text
        text: {
          primary: '#ffffff',      // White
          secondary: '#a3a3a3',    // Light gray
          tertiary: '#737373',     // Muted gray
          muted: '#525252',        // Very muted
        },

        // Borders
        border: {
          subtle: '#1a1a1a',       // Very subtle
          default: '#262626',      // Default borders
          accent: '#333333',       // Slightly stronger
        },

        // Semantic Colors
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },

      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Courier New', 'monospace'],
      },

      boxShadow: {
        'glow-blue': '0 0 30px rgba(14, 165, 233, 0.15)',
        'glow-blue-strong': '0 0 30px rgba(14, 165, 233, 0.5)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.5)',
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

      borderRadius: {
        'sm': '0.375rem',  // 6px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
      },
    },
  },
  plugins: [],
}
