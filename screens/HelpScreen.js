import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import theme from '../theme';

export default function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📘 Help Guide</Text>

      <Text style={styles.sectionHeader}>🏠 Home Screen</Text>
      <Text style={styles.paragraph}>
        View scan statistics and navigate to key features such as camera, history, and map.
      </Text>

      <Text style={styles.sectionHeader}>📷 Camera Screen</Text>
      <Text style={styles.paragraph}>
        Capture an image, simulate fish analysis and classify. Then return
        confidence, time and location.
      </Text>

      <Text style={styles.sectionHeader}>🗂️ History Screen</Text>
      <Text style={styles.paragraph}>
        Review saved scans with metadata and images. You can clear your history when needed.
      </Text>

      <Text style={styles.sectionHeader}>🗺️ Map Screen</Text>
      <Text style={styles.paragraph}>
        View geotagged scans on a map. Tap pins to open details in the history.
      </Text>

      <Text style={styles.sectionHeader}>💾 Data & Permissions</Text>
      <Text style={styles.paragraph}>
        The app requires camera and optionally location access. Data is saved locally using AsyncStorage.
      </Text>

      <Text style={styles.sectionHeader}>🔧 Troubleshooting</Text>
      <Text style={styles.paragraph}>
      • Enable camera/location permissions in settings if features aren't working properly.
        {'\n'}• All data is stored locally; clearing history removes it permanently.
      </Text>

      <Text style={styles.sectionHeader}>📱 System Requirements</Text>
      <Text style={styles.paragraph}>
      • Developed and testing only on Android only camera and GPS support
        {'\n'}• Requires authors home internet router connection for Quantum CNN model backend use
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.xLarge,
    paddingHorizontal: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.header,
    marginBottom: theme.spacing.large,
    marginTop: theme.spacing.large, // Push title down
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.small,
  },
  paragraph: {
    fontSize: 15,
    color: theme.colors.darkText,
    lineHeight: 22,
  },
});
