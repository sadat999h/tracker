/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#131315',
        surface: '#201F21',
        'surface-low': '#1C1B1D',
        'surface-high': '#2A2A2C',
        'surface-highest': '#353437',
        ink: '#E5E1E4',
        muted: '#919096',
        signal: '#FF5352',
        'signal-soft': '#FFB3AE',
        border: '#2A2A2C',
      },
      borderRadius: {
        control: '8px',
        card: '16px',
        sheet: '24px',
      },
      fontFamily: {
        geist: ['Geist'],
        inter: ['Inter'],
      },
    },
  },
  plugins: [],
};
