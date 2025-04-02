import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🌊 AquaQuantum Dashboard</Text>
      <Text style={styles.subtext}>Scans: 12 | Species Identified: 9</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Camera')}>
          <FontAwesome5 name="camera" size={28} color="#00bcd4" />
          <Text style={styles.cardText}>Start Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
          <MaterialIcons name="history" size={28} color="#4caf50" />
          <Text style={styles.cardText}>View History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Map')}>
          <FontAwesome5 name="map-marked-alt" size={28} color="#ff9800" />
          <Text style={styles.cardText}>Map View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('QuantumInsights')}>
          <FontAwesome5 name="atom" size={28} color="#9c27b0" />
          <Text style={styles.cardText}>Quantum Insights</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#e0f7fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
