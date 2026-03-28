/**
 * FunnyFailAnimation — plays a Lottie fail animation per world.
 *
 * Phase 1: Uses emoji fallback with bounce animation.
 * When Lottie JSON assets are added to assets/animations/, swap to LottieView.
 *
 * World fail characters:
 *   sea         → pirate slipping 🏴‍☠️💦
 *   spellRealm  → wizard turning into frog 🧙➡️🐸
 *   starReader  → rocket spinning 🚀💫
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WorldId } from '../data/worlds';

// Uncomment when Lottie JSON assets are ready:
// import LottieView from 'lottie-react-native';
// const LOTTIE_ASSETS: Record<WorldId, any> = {
//   sea: require('../../assets/animations/pirate_fail.json'),
//   spellRealm: require('../../assets/animations/wizard_fail.json'),
//   starReader: require('../../assets/animations/rocket_fail.json'),
// };

const FAIL_EMOJI: Record<WorldId, string[]> = {
  sea: ['🏴‍☠️', '💦', '😅'],
  spellRealm: ['🧙', '🐸', '✨'],
  starReader: ['🚀', '💫', '😵'],
};

const FAIL_TEXT: Record<WorldId, string> = {
  sea: 'Splash! Try again, captain!',
  spellRealm: 'Ribbit! The spell went wrong!',
  starReader: 'Houston, we have a problem!',
};

interface Props {
  world: WorldId;
  visible: boolean;
  onDone?: () => void;
}

export function FunnyFailAnimation({ world, visible, onDone }: Props) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    opacityAnim.setValue(1);
    bounceAnim.setValue(0);
    rotateAnim.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 3,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.delay(800),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => onDone?.());
  }, [visible]);

  if (!visible) return null;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  const emojis = FAIL_EMOJI[world];

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      <Animated.Text
        style={[
          styles.emoji,
          {
            transform: [
              { scale: bounceAnim },
              { rotate: spin },
            ],
          },
        ]}
      >
        {emojis[0]}
      </Animated.Text>
      <Text style={styles.text}>{FAIL_TEXT[world]}</Text>
      <Text style={styles.subEmoji}>{emojis[1]} {emojis[2]}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    top: '30%',
    alignSelf: 'center',
    backgroundColor: 'rgba(13,13,43,0.92)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.4)',
    minWidth: 240,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  text: {
    color: '#FF6B6B',
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  subEmoji: {
    fontSize: 28,
  },
});
