import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { StarRating } from '../components/StarRating';
import { getLevelsForAge } from '../data/words';
import { WORLDS } from '../data/worlds';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Result'>;
  route: RouteProp<RootStackParamList, 'Result'>;
};

const STAR_MESSAGES = [
  '',
  'Keep going, you got this! 💪',
  'Great spelling, hero! 🎉',
  'PERFECT! You\'re a Word Hero! 🌟',
];

const REWARDS: Record<number, { icon: string; label: string }> = {
  1: { icon: '🎩', label: 'Pirate Hat unlocked!' },
  3: { icon: '🐠', label: 'Pet Fish companion!' },
  5: { icon: '⚓', label: 'Anchor Badge earned!' },
};

export function ResultScreen({ navigation, route }: Props) {
  const { worldId, levelId, stars, playerAge, playerName, voiceEnabled } = route.params;

  const levels = getLevelsForAge(playerAge);
  const world = WORLDS.find((w) => w.id === worldId)!;
  const hasNextLevel = levelId < levels.length;
  const reward = REWARDS[levelId];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }).start();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Animated.Value refs are stable — intentionally omitted

  return (
    <LinearGradient colors={[Colors.deepSpace, '#111144']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>

          <Animated.View
            style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            {/* Trophy */}
            <Animated.Text
              style={[styles.trophy, { transform: [{ scale: bounceAnim }] }]}
            >
              {stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉'}
            </Animated.Text>

            <Text style={styles.levelComplete}>Level {levelId} Complete!</Text>
            <Text style={styles.worldName}>{world.icon} {world.name}</Text>

            {/* Stars */}
            <View style={styles.starsContainer}>
              <StarRating stars={stars} size={48} />
            </View>
            <Text style={styles.message}>{STAR_MESSAGES[stars]}</Text>

            {/* Reward */}
            {reward && (
              <View style={styles.rewardBox}>
                <Text style={styles.rewardEmoji}>{reward.icon}</Text>
                <Text style={styles.rewardText}>{reward.label}</Text>
              </View>
            )}

            {/* Stats */}
            <View style={styles.statsBox}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>World</Text>
                <Text style={styles.statValue}>{world.name}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Level</Text>
                <Text style={styles.statValue}>{levelId} / {levels.length}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Stars earned</Text>
                <Text style={styles.statValue}>{stars} ⭐</Text>
              </View>
            </View>

            {/* Action buttons */}
            {hasNextLevel && (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() =>
                  navigation.replace('Game', {
                    worldId,
                    playerAge,
                    playerName,
                    levelId: levelId + 1,
                    voiceEnabled,
                  })
                }
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[Colors.gold, Colors.orange]}
                  style={styles.btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.btnText, { color: Colors.deepSpace }]}>
                    Level {levelId + 1} →
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {stars < 3 && (
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() =>
                  navigation.replace('Game', {
                    worldId,
                    playerAge,
                    playerName,
                    levelId,
                    voiceEnabled,
                  })
                }
                activeOpacity={0.85}
              >
                <Text style={styles.retryText}>🔄 Try Again for 3 Stars</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WorldSelect', { playerAge, playerName })
              }
              style={styles.homeBtn}
            >
              <Text style={styles.homeText}>🗺️ Back to World Map</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: { alignItems: 'center', width: '100%' },

  trophy: { fontSize: 80, marginTop: 32, marginBottom: 12 },
  levelComplete: {
    color: Colors.gold,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  worldName: {
    color: Colors.lavender,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 24,
  },

  starsContainer: { marginBottom: 12 },
  message: {
    color: Colors.softWhite,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },

  rewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,215,0,0.1)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.25)',
  },
  rewardEmoji: { fontSize: 32 },
  rewardText: {
    color: Colors.gold,
    fontSize: 15,
    fontWeight: '800',
  },

  statsBox: {
    width: '100%',
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 28,
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: { color: Colors.dimWhite, fontSize: 14, fontWeight: '600' },
  statValue: { color: Colors.white, fontSize: 15, fontWeight: '800' },

  primaryBtn: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  btnGradient: { paddingVertical: 18, alignItems: 'center' },
  btnText: { fontSize: 18, fontWeight: '900' },

  retryBtn: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  retryText: { color: Colors.softWhite, fontSize: 15, fontWeight: '700' },

  homeBtn: { paddingVertical: 12 },
  homeText: { color: Colors.dimWhite, fontSize: 14, fontWeight: '600' },
});
