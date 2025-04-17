import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import theme from '../theme'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function MapScreen() {
  const [markers, setMarkers] = React.useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const loadPins = async () => {
        const data = await AsyncStorage.getItem('scanHistory');
        const history = data ? JSON.parse(data) : [];
        const valid = history.filter((entry) => entry.location);
        setMarkers(valid);
      };
      loadPins();
    }, [])
  );

  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: 55.3781,
          longitude: -3.4360,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}        
      >
        {markers.map((entry) => (
          <Marker
            key={entry.id}
            coordinate={entry.location}
            title={entry.species}
            description={`${entry.date} • ${entry.confidence}`}
            onPress={() =>
              navigation.navigate('History', { highlightId: entry.id })
            }
          />
        ))}
      </MapView>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  map: {
    flex: 1,
  },
});
