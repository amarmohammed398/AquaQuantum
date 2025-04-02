import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function QuantumInsightsScreen() {
  const [showQuantum, setShowQuantum] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantum CNN Insights</Text>
      <Switch value={showQuantum} onValueChange={setShowQuantum} />
      <Text>{showQuantum ? 'Showing Quantum Heatmap' : 'Showing Classic CNN'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
