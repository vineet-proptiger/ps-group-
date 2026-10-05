/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: 'var(--color-gold)',       /* #433E6C */
          light: 'var(--color-gold-light)', /* #5a5590 */
          dark: 'var(--color-gold-dark)',  /* #332f54 */
          bg: 'var(--color-gold-bg)',    /* #eeedf4 */
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        dark: {
          DEFAULT: 'var(--color-dark)',
          mid: 'var(--color-dark-mid)',
        },
        light: {
          DEFAULT: 'var(--color-bg-light)',
          muted: 'var(--color-bg-muted)',
        },
        'text-mid': 'var(--color-text-mid)',
        'text-light': 'var(--color-text-light)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Open Sans', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        jost: ['var(--font-jost)', 'Montserrat', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'brand-sm': '0 2px 8px rgba(67,62,108,0.08)',
        'brand-md': '0 8px 24px rgba(67,62,108,0.14)',
        'brand-lg': '0 20px 48px rgba(67,62,108,0.18)',
        'card': '0 4px 20px rgba(0,0,0,0.07)',
      },
      keyframes: {
        priceBtn: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        blinkPrice: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0   rgba(67,62,108,0.45)' },
          '50%': { boxShadow: '0 0 0 12px rgba(67,62,108,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        priceBtn: 'priceBtn 4s ease infinite',
        blinkPrice: 'blinkPrice 0.9s step-end infinite',
        fadeUp: 'fadeUp 0.7s ease forwards',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
