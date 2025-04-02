// theme.js
const colors = {
    primary: '#5B86E5',    // Aqua blue
    secondary: '#BC80C2',  // Aqua green
    tertiary: '#7E57C2',   // Purple
    lightBlue: '#90CAF9',
    lightPurple: '#9575CD',
    darkText: '#37474F',   // Dark text
    lightText: '#607D8B',  // Light text
    background: '#F4F9FF', // Background color
  };
  
  const typography = {
    header: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.primary,
    },
    subtext: {
      fontSize: 16,
      color: colors.lightText,
    },
    cardText: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.darkText,
    },
  };
  
  const spacing = {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 40,
  };
  
  export default {
    colors,
    typography,
    spacing,
  };
  