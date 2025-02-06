/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            lighter: '#E3F2FD',
            light: '#42A5F5',
            main: '#2196F3',
            dark: '#1E88E5',
            darker: '#1565C0',
          },
          secondary: {
            lighter: '#EDE7F6',
            light: '#B39DDB',
            main: '#673AB7',
            dark: '#5E35B1',
            darker: '#4527A0',
          }
        },
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
          'roboto': ['Roboto', 'sans-serif']
        }
      },
    },
    plugins: [],
  };
  