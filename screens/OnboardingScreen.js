import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AquaQuantum</Text>
      <Text style={styles.subtitle}>Discover and classify underwater species with quantum-enhanced vision.</Text>
      <Button title="Get Started" onPress={() => navigation.replace('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
});
