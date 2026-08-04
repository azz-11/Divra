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
        sky: 'var(--sky)',
        cyan: 'var(--cyan)',
        'brand-pale': 'var(--brand-pale)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-dimmer': 'var(--text-dimmer)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        display: ['Sora', 'Cairo', 'sans-serif'],
      },
      borderRadius: {
        xl2: '22px',
        xl3: '32px',
      },
    },
  },
  plugins: [],
}
