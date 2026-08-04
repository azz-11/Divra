/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        gold: 'var(--gold)',
        'gold-2': 'var(--gold-2)',
        'gold-deep': 'var(--gold-deep)',
        'gold-pale': 'var(--gold-pale)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-dimmer': 'var(--text-dimmer)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        display: ['Playfair Display', 'Cairo', 'serif'],
      },
      borderRadius: {
        xl2: '22px',
      },
      letterSpacing: {
        luxe: '0.18em',
      },
    },
  },
  plugins: [],
}
