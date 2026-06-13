/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 0.25rem)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 0.25rem)',
        xl: 'calc(var(--radius) + 0.5rem)',
        '2xl': 'calc(var(--radius) + 1rem)',
        '3xl': 'calc(var(--radius) + 2rem)',
        '4xl': 'calc(var(--radius) + 3rem)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Fraunces', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay-2': 'float 6s ease-in-out 4s infinite',
        'shimmer': 'badge-shine 3s linear infinite',
        'scroll-pulse': 'scroll-pulse 2s ease-in-out infinite',
        'heart-pop': 'heart-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
      },
      backgroundImage: {
        'rose-gold': 'linear-gradient(135deg, #C98C84 0%, #F7E7E6 40%, #D4A09A 70%, #C98C84 100%)',
        'hero-gradient': 'linear-gradient(160deg, #FFF9F5 0%, #F7E7E6 40%, #EDD5D3 100%)',
        'warm-overlay': 'linear-gradient(180deg, rgba(255,249,245,0) 0%, rgba(255,249,245,0.8) 60%, #FFF9F5 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};