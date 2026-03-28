import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../theme/colors';
import { LetterSlot } from '../hooks/useGameState';

interface Props {
  slots: (LetterSlot | null)[];
  correct: boolean | null;  // null = pending, true = correct, false = wrong
  size?: number;
}

export function WordSlot({ slots, correct, size = 52 }: Props) {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (correct === false) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }, [correct]);

  return (
    <Animated.View
      style={[styles.row, { transform: [{ translateX: shakeAnim }] }]}
    >
      {slots.map((slot, i) => (
        <View
          key={i}
          style={[
            styles.slot,
            { width: size, height: size + 4, borderRadius: 10 },
            slot && styles.filled,
            correct === true && styles.correctSlot,
            correct === false && styles.wrongSlot,
          ]}
        >
          <Text style={[styles.slotLetter, { fontSize: size * 0.45 }]}>
            {slot?.letter ?? ''}
          </Text>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  slot: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  filled: {
    borderStyle: 'solid',
    borderColor: Colors.mint,
    backgroundColor: 'rgba(78,205,196,0.15)',
  },
  correctSlot: {
    borderColor: Colors.successGreen,
    backgroundColor: 'rgba(76,175,80,0.2)',
  },
  wrongSlot: {
    borderColor: Colors.errorRed,
    backgroundColor: 'rgba(255,82,82,0.2)',
  },
  slotLetter: {
    fontWeight: '800',
    color: Colors.white,
  },
});
