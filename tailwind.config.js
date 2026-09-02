/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'JetBrains Mono',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        ink: '#0B0B0F',
        surface: '#14141A',
        hairline: '#26262E',
        muted: '#8B8B96',
        accent: '#FEDB0B',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          'base-100': '#0B0B0F',
          'base-200': '#14141A',
          'base-300': '#26262E',
          'base-content': '#EDEDED',
          'primary': '#FEDB0B',
          'primary-content': '#0B0B0F',
          'secondary': '#FEDB0B',
          'secondary-content': '#0B0B0F',
          'neutral': '#26262E',
          'neutral-content': '#EDEDED',
          'info': '#7DD3FC',
          'success': '#86EFAC',
          'warning': '#FDE047',
          'error': '#FCA5A5',
        },
      },
    ],
    base: false,
  },
}
