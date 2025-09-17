/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors from branding profile
        'deep-navy': '#1a2332',
        'forest-green': '#2d5a3d',
        'slate-blue': '#3d4c6b',
        
        // Secondary Colors
        'emerald-brand': '#4a9d5f',
        'steel-blue': '#5a7ba3',
        'charcoal': '#2c3340',
        
        // Neutral Colors
        'light-gray': '#f5f6f8',
        'medium-gray': '#8a95a3',
        'dark-gray': '#4a5568',
        
        // Accent Colors
        'success-green': '#22c55e',
        'warning-amber': '#f59e0b',
        'error-red': '#ef4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', { fontWeight: '700', lineHeight: '1.2' }],
        'h2': ['24px', { fontWeight: '600', lineHeight: '1.3' }],
        'h3': ['18px', { fontWeight: '500', lineHeight: '1.4' }],
        'body': ['16px', { fontWeight: '400', lineHeight: '1.5' }],
        'small': ['14px', { fontWeight: '400', lineHeight: '1.5' }],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(26, 35, 50, 0.06)',
        'card-hover': '0 4px 12px rgba(26, 35, 50, 0.1)',
        'sidebar': '2px 0 8px rgba(26, 35, 50, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
