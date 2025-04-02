import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SpeciesDetailScreen from '../screens/SpeciesDetailScreen';
import MapScreen from '../screens/MapScreen';
import QuantumInsightsScreen from '../screens/QuantumInsightsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="SpeciesDetail" component={SpeciesDetailScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="QuantumInsights" component={QuantumInsightsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}