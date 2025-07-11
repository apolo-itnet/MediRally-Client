module.exports = {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: '#722f75', 
        pink: '#B52572',
        sky: '#0A509F',
        background: '#F8FAFC',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
        },
        success: '#059669',
        danger: '#E11D48',
        infoBg: '#EEF2FF',
        dark: {
          primary: '#1A202C',
          secondary: '#2D3748',
          background: '#1A202C',
          text: '#fff',
        },
      }
    }
  }
}

