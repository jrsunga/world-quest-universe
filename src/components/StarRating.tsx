import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  stars: number;  // 0–3
  size?: number;
}

export function StarRating({ stars, size = 36 }: Props) {
  const anims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.sequence([
        Animated.delay(i * 150),
        Animated.spring(anim, {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.parallel(animations).start();
  }, [stars]);

  return (
    <View style={styles.row}>
      {[0, 1, 2].map((i) => (
        <Animated.Text
          key={i}
          style={[
            styles.star,
            { fontSize: size },
            {
              transform: [{ scale: anims[i] }],
              opacity: anims[i],
            },
          ]}
        >
          {i < stars ? '⭐' : '☆'}
        </Animated.Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  star: {
    textShadowColor: 'rgba(255,215,0,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
