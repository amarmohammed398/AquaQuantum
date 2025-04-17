import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
  Dimensions,
} from 'react-native';
import * as CameraModule from 'expo-camera';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';

const CameraComponent = CameraModule.CameraView;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const dummySpeciesList = ['Trout', 'Bass', 'Pike', 'Salmon', 'Perch'];

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);
  const [resultPhotoUri, setResultPhotoUri] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [liveTimer, setLiveTimer] = useState('0.00');
  const cameraRef = useRef(null);
  const scrollRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await CameraModule.Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isSyncing);
    return () => backHandler.remove();
  }, [isSyncing]);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = ((now - startTimeRef.current) / 1000).toFixed(2);
      setLiveTimer(elapsed);
    }, 100);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    const endTime = Date.now();
    const duration = ((endTime - startTimeRef.current) / 1000).toFixed(2);
    setLiveTimer(duration);
    return duration; // ✅ Return accurate duration
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      setIsSyncing(true);
      setCapturedPhotoUri('FREEZE');
      setResultPhotoUri(null);
      setLiveTimer('0.00');
      const randomSpecies = dummySpeciesList[Math.floor(Math.random() * dummySpeciesList.length)];

      try {
        const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });

        setCapturedPhotoUri(null);
        setResultPhotoUri(photo.uri);

        startTimer(); // Start the timer

        // Simulate classification delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Get location
        let coords = null;
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocationData(coords);
        }

        const duration = stopTimer(); // ✅ Get final duration
        const timestampStr = new Date().toLocaleString();
        setTimestamp(timestampStr);

        const newEntry = {
          id: Date.now().toString(),
          species: randomSpecies,
          confidence: '95%',
          date: timestampStr,
          duration: `${parseFloat(duration).toFixed(2)}s`,
          location: coords,
          imageUri: photo.uri, // ✅ Add this line
        };        

        const existing = await AsyncStorage.getItem('scanHistory');
        const updated = existing ? [...JSON.parse(existing), newEntry] : [newEntry];
        await AsyncStorage.setItem('scanHistory', JSON.stringify(updated));

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            y: SCREEN_HEIGHT,
            animated: true,
          });
        }, 300);
      } catch (err) {
        console.error('❌ Error during capture:', err);
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
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      snapToInterval={SCREEN_HEIGHT}
      decelerationRate="fast"
    >
      {/* CAMERA VIEW */}
      <View style={styles.cameraContainer}>
        <CameraComponent ref={cameraRef} style={styles.camera} />

        {capturedPhotoUri === 'FREEZE' && <View style={styles.freezeOverlay} />}

        {isSyncing && (
          <View style={styles.overlayLoader}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Analysing...</Text>
            <Text style={styles.speedText}> {liveTimer}s</Text>
          </View>
        )}

        <View style={styles.captureButtonWrapper}>
          <TouchableOpacity
            style={[styles.captureButton, isSyncing && { opacity: 0.5 }]}
            onPress={handleCapture}
            disabled={isSyncing}
          >
            <Text style={styles.captureText}>Capture & Analyse</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RESULTS SECTION */}
      <View style={styles.resultContainer}>
        {resultPhotoUri ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Analysis Result</Text>
            <Image source={{ uri: resultPhotoUri }} style={styles.resultImage} />
            <Text style={styles.timestamp}>{timestamp}</Text>
            <Text style={styles.resultItem}>🐟 Classification: <Text style={styles.bold}>Dummy Fish</Text></Text>
            <Text style={styles.resultItem}>🎯 Accuracy: <Text style={styles.bold}>95%</Text></Text>
            <Text style={styles.resultItem}>⏱️ Speed: <Text style={styles.bold}>{liveTimer}s</Text></Text>
            {locationData && (
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <Text style={styles.mapLink}>📍 View on Map</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.waitingBox}>
            <Text style={styles.waitingText}>Take a capture to see analysis here</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: SCREEN_HEIGHT * 2,
    backgroundColor: theme.colors.background,
  },
  cameraContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  freezeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  overlayLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  speedText: {
    marginTop: 6,
    color: '#fff',
    fontSize: 14,
  },
  captureButtonWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  resultBox: {
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 60,
    color: theme.colors.darkText,
  },
  resultImage: {
    width: SCREEN_WIDTH - 40,
    height: 280,
    borderRadius: 12,
    marginBottom: 16,
  },
  timestamp: {
    fontSize: 14,
    color: theme.colors.lightText,
    marginBottom: 12,
  },
  resultItem: {
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
    fontSize: 16,
    marginTop: 12,
  },
  waitingBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  waitingText: {
    textAlign: 'center',
    color: theme.colors.lightText,
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
});