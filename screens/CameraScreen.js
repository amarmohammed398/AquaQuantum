import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import * as CameraModule from 'expo-camera';
import theme from '../theme';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraComponent = CameraModule.CameraView;

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        console.log('🛠 Requesting camera permission...');
        const { status } = await CameraModule.Camera.requestCameraPermissionsAsync();
        console.log('✅ Permission result:', status);
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('❌ Error requesting permission:', error);
      }
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
        setCapturedPhoto(photo.uri);
        console.log('📷 Captured photo URI:', photo.uri);
  
        const start = Date.now();
  
        // Simulate classification delay
        await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 sec delay
  
        const durationMs = Date.now() - start;
  
        const newEntry = {
          id: Date.now().toString(),
          species: 'Dummy Fish',
          confidence: '95%',
          date: new Date().toLocaleString(),
          duration: (durationMs / 1000).toFixed(2) + 's', // e.g., "1.52s"
        };
  
        const existing = await AsyncStorage.getItem('scanHistory');
        const updated = existing ? [...JSON.parse(existing), newEntry] : [newEntry];
        await AsyncStorage.setItem('scanHistory', JSON.stringify(updated));
      } catch (err) {
        console.error('Error taking photo:', err);
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
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraComponent ref={cameraRef} style={styles.camera} />
      </View>
      <View style={styles.captureButton}>
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>Capture & Analyze</Text>
        </TouchableOpacity>
      </View>
      {capturedPhoto && (
        <View style={styles.preview}>
          <Text style={styles.previewText}>Captured Photo:</Text>
          <Image source={{ uri: capturedPhoto }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
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
});
