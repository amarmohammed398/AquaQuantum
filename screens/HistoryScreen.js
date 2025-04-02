import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyData = [
  { id: '1', species: 'Clownfish', confidence: '98%', date: '2025-03-20' },
  { id: '2', species: 'Blue Tang', confidence: '94%', date: '2025-03-19' },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan History</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.date}: {item.species} ({item.confidence})</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});