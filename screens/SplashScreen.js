import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../theme'; // Import the theme for consistent styles


export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Navigate to the Home screen after 3 seconds
    setTimeout(() => navigation.replace('Home'), 3000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Icon placed above the title */}
      <Image source={require('../assets/icon.png')} style={styles.icon} />

      {/* Title with the specified color */}
      <Text style={styles.header}>AquaQuantum</Text>
      <Text style={styles.subtext}>Hybrid CNN Quantum Classifier</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to take up the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  icon: {
    width: 80,  // Adjust the icon size to your preference
    height: 80, // Adjust the icon size to your preference
    marginBottom: 20, // Space between the icon and the title
  },
  logo: {
    fontSize: 36,
    color: '#BC80C2', // Title color set to #BC80C2
    fontWeight: 'bold',
    zIndex: 1, // Ensure the text is in front
  },
  tagline: {
    fontSize: 16,
    color: 'lightblue',
    marginTop: 10,
    zIndex: 1, // Ensure the tagline is in front
  },
  header: {
    ...theme.typography.header,
  },
  subtext: {
    ...theme.typography.subtext,
    marginBottom: theme.spacing.large,
  },
});
