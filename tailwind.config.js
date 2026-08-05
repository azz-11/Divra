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
        brand: 'var(--brand)',
        'brand-2': 'var(--brand-2)',
        'brand-light': 'var(--brand-light)',
        'brand-pale': 'var(--brand-pale)',
        'brand-strong': 'var(--brand-strong)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-dimmer': 'var(--text-dimmer)',
        line: 'var(--line)',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Cairo', 'sans-serif'],
      },
      borderRadius: {
        xl2: '22px',
      },
    },
  },
  plugins: [],
}
