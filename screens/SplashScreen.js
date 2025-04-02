import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace('Onboarding'), 3000);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/splash-underwater.gif')}
      style={styles.container}
    >
      <Text style={styles.logo}>AquaQuantum</Text>
      <Text style={styles.tagline}>Mapping the Deep with Quantum Vision</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 36, color: 'white', fontWeight: 'bold' },
  tagline: { fontSize: 16, color: 'lightblue', marginTop: 10 },
});