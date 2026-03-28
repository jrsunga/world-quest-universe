import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { World } from '../data/worlds';
import { Colors } from '../theme/colors';

interface Props {
  world: World;
  isSelected: boolean;
  isRecommended: boolean;
  onPress: () => void;
}

export function WorldCard({ world, isSelected, isRecommended, onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.02, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 14 }}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <LinearGradient
          colors={world.bgGradient}
          style={[styles.card, isSelected && styles.selected]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {isRecommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>✨ Recommended for you</Text>
            </View>
          )}

          <View style={styles.row}>
            <Text style={styles.icon}>{world.icon}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{world.name}</Text>
              <Text style={styles.subtitle}>{world.subtitle}</Text>
              <Text style={styles.desc} numberOfLines={2}>{world.description}</Text>
            </View>
          </View>

          {isSelected && (
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  selected: {
    borderColor: Colors.mint,
    borderWidth: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  icon: { fontSize: 44 },
  info: { flex: 1 },
  name: { color: Colors.white, fontWeight: '800', fontSize: 18, marginBottom: 2 },
  subtitle: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  desc: { color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 18 },
  recommendedBadge: {
    backgroundColor: 'rgba(78,205,196,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.3)',
  },
  recommendedText: { color: Colors.mint, fontSize: 11, fontWeight: '700' },
  checkBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: Colors.mint,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: { color: Colors.deepSpace, fontWeight: '900', fontSize: 15 },
});
