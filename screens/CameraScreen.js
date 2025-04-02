import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';
import * as CameraModule from 'expo-camera';

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
      } catch (err) {
        console.error('Error taking photo:', err);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraComponent ref={cameraRef} style={styles.camera} />
      </View>
      <Button title="Capture & Analyze" onPress={handleCapture} />
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
  container: { flex: 1, padding: 10 },
  cameraContainer: {
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  preview: {
    alignItems: 'center',
    padding: 10,
  },
  previewText: {
    fontSize: 16,
    marginVertical: 8,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
