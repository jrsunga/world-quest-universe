import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorldId } from '../data/worlds';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { WorldSelectScreen } from '../screens/WorldSelectScreen';
import { GameScreen } from '../screens/GameScreen';
import { ResultScreen } from '../screens/ResultScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  WorldSelect: {
    playerAge: number;
    playerName: string;
  };
  Game: {
    worldId: WorldId;
    playerAge: number;
    playerName: string;
    levelId: number;
    voiceEnabled: boolean;
  };
  Result: {
    worldId: WorldId;
    levelId: number;
    totalLevels: number;
    stars: number;
    playerAge: number;
    playerName: string;
    voiceEnabled: boolean;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="WorldSelect" component={WorldSelectScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
