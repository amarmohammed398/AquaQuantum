import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import theme from '../theme'; 

export default function QuantumInsightsScreen() {
  const [showQuantum, setShowQuantum] = React.useState(true);

  return (
    <View style={insightStyles.container}>
      <Text style={insightStyles.title}>Quantum CNN Insights</Text>
      <Switch value={showQuantum} onValueChange={setShowQuantum} />
      <Text style={insightStyles.modeText}>
        {showQuantum ? 'Showing Quantum Heatmap' : 'Showing Classic CNN'}
      </Text>
    </View>
  );
}

const insightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  title: {
    ...theme.typography.header,
    marginBottom: theme.spacing.medium,
  },
  modeText: {
    ...theme.typography.subtext,
    marginTop: theme.spacing.small,
  },
});