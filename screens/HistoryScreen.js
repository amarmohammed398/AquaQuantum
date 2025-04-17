import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../theme';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [highlightId, setHighlightId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const load = async () => {
        const stored = await AsyncStorage.getItem('scanHistory');
        setHistory(stored ? JSON.parse(stored) : []);
        if (route.params?.highlightId) {
          setHighlightId(route.params.highlightId);
        } else {
          setHighlightId(null);
        }
      };
      load();
    }, [route.params])
  );

  const clearHistory = async () => {
    await AsyncStorage.removeItem('scanHistory');
    setHistory([]);
  };

  const renderItem = ({ item }) => {
    const isHighlighted = item.id === highlightId;

    return (
      <View style={[styles.itemBox, isHighlighted && styles.highlight]}>
        <Text style={styles.itemText}>
          🗓️ {item.date}{"\n"}
          🐟 Classification: {item.species}{"\n"}
          🎯 Accuracy: ({item.confidence}){"\n"}
          ⏱️ Speed: {item.duration || '—'}
        </Text>
        {item.location && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.link}>📍 View on Map</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  itemBox: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  highlight: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  link: {
    color: theme.colors.secondary,
    marginTop: 4,
  },  
});
