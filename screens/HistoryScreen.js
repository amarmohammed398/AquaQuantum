import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
        const parsed = stored ? JSON.parse(stored) : [];
        const sorted = parsed.sort((a, b) => parseInt(b.id) - parseInt(a.id)); // newest first
        setHistory(sorted);
  
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
    const duration = item.duration?.toString().replace('s', '') ?? '—';

    return (
      <View style={[styles.itemBox, isHighlighted && styles.highlight]}>
        <View style={styles.rowContainer}>
          {/* Thumbnail */}
          {item.imageUri && (
            <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
          )}

          {/* Metadata */}
          <View style={styles.details}>
            <Text style={styles.label}>🗓️ {item.date}</Text>
            <Text style={styles.label}>🐟 {item.species}</Text>
            <Text style={styles.label}>🎯 {item.confidence}</Text>
            <Text style={styles.label}>⏱️ {duration}s</Text>
            {item.location && (
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <Text style={styles.link}>📍 View on Map</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
        contentContainerStyle={{ paddingBottom: theme.spacing.large }}
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
    marginTop: theme.spacing.large,
    marginBottom: theme.spacing.medium,
  },
  itemBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: theme.spacing.medium,
    backgroundColor: '#eee',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    color: theme.colors.darkText,
    marginBottom: 2,
  },
  link: {
    color: theme.colors.secondary,
    marginTop: 4,
    fontSize: 15,
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
  highlight: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
});