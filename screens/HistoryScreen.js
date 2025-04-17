import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadHistory = async () => {
        const stored = await AsyncStorage.getItem('scanHistory');
        setHistory(stored ? JSON.parse(stored) : []);
      };
      loadHistory();
    }, [])
  );
  

  const clearHistory = async () => {
    await AsyncStorage.removeItem('scanHistory');
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.date}: {item.species} ({item.confidence}) - {item.duration || '—'}
          </Text>
        )}
      />
      {history.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  header: {
    ...theme.typography.header,
    marginBottom: theme.spacing.small,
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.darkText,
    marginBottom: theme.spacing.small,
  },
  clearButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
