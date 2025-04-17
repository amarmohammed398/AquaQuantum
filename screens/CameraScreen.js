import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, BackHandler, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import * as CameraModule from 'expo-camera';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const CameraComponent = CameraModule.CameraView;

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await CameraModule.Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('❌ Error requesting permission:', error);
      }
    })();
  }, []);

  // Disable back button during sync
  useEffect(() => {
    const backAction = () => {
      if (isSyncing) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isSyncing]);

  const handleCapture = async () => {
    if (cameraRef.current) {
      setIsSyncing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });

        const start = Date.now();
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate classification delay
        const durationMs = Date.now() - start;

        const { status } = await Location.requestForegroundPermissionsAsync();
        let coords = null;
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocationData(coords);
        }

        const now = new Date().toLocaleString();

        const newEntry = {
          id: Date.now().toString(),
          species: 'Dummy Fish',
          confidence: '95%',
          date: now,
          duration: (durationMs / 1000).toFixed(2) + 's',
          location: coords,
        };

        const existing = await AsyncStorage.getItem('scanHistory');
        const updated = existing ? [...JSON.parse(existing), newEntry] : [newEntry];
        await AsyncStorage.setItem('scanHistory', JSON.stringify(updated));

        setCapturedPhoto(photo.uri);
        setTimestamp(now);
      } catch (err) {
        console.error('Error taking photo:', err);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>No access to camera.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <CameraComponent ref={cameraRef} style={styles.camera} />
        </View>

        <View style={styles.captureButton}>
          <TouchableOpacity
            style={[styles.button, isSyncing && { opacity: 0.6 }]}
            onPress={handleCapture}
            disabled={isSyncing}
          >
            <Text style={styles.buttonText}>Capture & Analyze</Text>
          </TouchableOpacity>
        </View>

        {isSyncing && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Syncing scan data...</Text>
          </View>
        )}

        {!isSyncing && capturedPhoto && (
          <View style={styles.preview}>
            <Text style={styles.previewText}>Captured Photo:</Text>
            <Image source={{ uri: capturedPhoto }} style={styles.image} />

            {timestamp && (
              <Text style={styles.timestamp}>🗓️ {timestamp}</Text>
            )}

            <View style={styles.resultBox}>
              <Text style={styles.resultText}>🧬 Classification: <Text style={styles.bold}>Dummy Fish</Text></Text>
              <Text style={styles.resultText}>🎯 Accuracy: <Text style={styles.bold}>95%</Text></Text>
              <Text style={styles.resultText}>⏱️ Speed: <Text style={styles.bold}>1.5s</Text></Text>
            </View>

            {locationData && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Map')}
              >
                <Text style={styles.mapLink}>📍 View on Map</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  container: {
    flex: 1,
  },
  cameraContainer: {
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: theme.spacing.large,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    marginBottom: theme.spacing.large,
  },
  preview: {
    alignItems: 'center',
    padding: theme.spacing.medium,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  previewText: {
    ...theme.typography.cardText,
    marginBottom: theme.spacing.small,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 12,
    marginBottom: theme.spacing.medium,
  },
  timestamp: {
    fontSize: 14,
    color: theme.colors.lightText,
    marginBottom: theme.spacing.medium,
  },
  resultBox: {
    width: '100%',
    marginBottom: theme.spacing.medium,
  },
  resultText: {
    fontSize: 16,
    color: theme.colors.darkText,
    marginBottom: 6,
  },
  bold: {
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  mapLink: {
    color: theme.colors.secondary,
    marginTop: 10,
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  infoText: {
    ...theme.typography.subtext,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingBox: {
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  loadingText: {
    ...theme.typography.subtext,
    marginTop: theme.spacing.small,
    color: theme.colors.primary,
  },
});