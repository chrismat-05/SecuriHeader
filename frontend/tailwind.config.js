import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.blue,
        slate: colors.slate,
        red: colors.red,
        green: colors.green,
        yellow: colors.yellow,
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
