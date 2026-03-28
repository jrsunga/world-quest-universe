import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  letter: string;
  used: boolean;
  onPress: () => void;
  size?: number;
}

export function LetterTile({ letter, used, onPress, size = 56 }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (used) return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.tile,
          { width: size, height: size, borderRadius: size * 0.2 },
          used && styles.used,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={used}
      >
        <Text style={[styles.letter, { fontSize: size * 0.45 }, used && styles.usedText]}>
          {letter}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: Colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: Colors.lavender,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  used: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowOpacity: 0,
    elevation: 0,
  },
  letter: {
    fontWeight: '800',
    color: Colors.deepSpace,
  },
  usedText: {
    color: 'rgba(255,255,255,0.2)',
  },
});
