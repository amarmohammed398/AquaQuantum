import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import QuantumLogo from '../components/QuantumLogo';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../theme';

const HomeScreen = ({ navigation }) => {
  const [scanCount, setScanCount] = useState(0);
  const [speciesCount, setSpeciesCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadCounts = async () => {
        const stored = await AsyncStorage.getItem('scanHistory');
        const parsed = stored ? JSON.parse(stored) : [];

        setScanCount(parsed.length);

        const speciesSet = new Set(parsed.map((entry) => entry.species));
        setSpeciesCount(speciesSet.size);
      };

      loadCounts();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <QuantumLogo />

      <Text style={styles.header}>AquaQuantum</Text>
      <Text style={styles.subtext}>Hybrid CNN Quantum Classifier</Text>

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>
          Scans: <Text style={styles.statsNumber}>{scanCount}</Text>
        </Text>
        <Text style={styles.statsText}>
          Species Identified: <Text style={styles.statsNumber}>{speciesCount}</Text>
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Camera')}>
          <FontAwesome5 name="camera" size={26} color={theme.colors.secondary} />
          <Text style={styles.cardText}>Start Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
          <FontAwesome5 name="history" size={26} color={theme.colors.secondary} />
          <Text style={styles.cardText}>View History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Map')}>
          <FontAwesome5 name="map-marked-alt" size={26} color={theme.colors.secondary} />
          <Text style={styles.cardText}>Map View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('QuantumInsights')}>
          <FontAwesome5 name="atom" size={26} color={theme.colors.secondary} />
          <Text style={styles.cardText}>Quantum Insights</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xLarge,
    paddingHorizontal: theme.spacing.medium,
  },
  header: {
    ...theme.typography.header,
  },
  subtext: {
    ...theme.typography.subtext,
    marginBottom: theme.spacing.large,
  },
  statsBox: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statsText: {
    fontSize: 15,
    color: theme.colors.lightText,
    marginBottom: 6,
  },
  statsNumber: {
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  cardContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    marginBottom: theme.spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.darkText,
    textAlign: 'center',
  },
});

export default HomeScreen;