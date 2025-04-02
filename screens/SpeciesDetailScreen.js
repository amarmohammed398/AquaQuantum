import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SpeciesDetailScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/species-placeholder.png')} style={styles.image} />
      <Text style={styles.name}>Clownfish</Text>
      <Text>Scientific Name: Amphiprioninae</Text>
      <Text>Habitat: Coral Reefs</Text>
      <Text>Status: Least Concern</Text>
      <Text>Notes: Bright orange with white stripes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 200, height: 200, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});