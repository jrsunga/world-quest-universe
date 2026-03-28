import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { WorldCard } from '../components/WorldCard';
import { WORLDS, WorldId, getWorldForAge } from '../data/worlds';
import { loadGame, GameSave } from '../store/gameStore';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WorldSelect'>;
  route: RouteProp<RootStackParamList, 'WorldSelect'>;
};

export function WorldSelectScreen({ navigation, route }: Props) {
  const { playerAge, playerName } = route.params;
  const recommended = getWorldForAge(playerAge);

  const [selectedWorld, setSelectedWorld] = useState<WorldId>(recommended);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [save, setSave] = useState<GameSave | null>(null);

  // Reload stats every time this screen comes into focus (e.g. after finishing a level)
  useFocusEffect(
    useCallback(() => {
      loadGame().then(setSave);
    }, []),
  );

  const totalStars = save
    ? Object.values(save.worlds).reduce((sum, w) => sum + w.totalStars, 0)
    : 0;

  const totalBadges = save
    ? Object.values(save.worlds).reduce(
        (sum, w) => sum + Object.values(w.levels).filter((l) => l.completed).length,
        0,
      )
    : 0;

  const handlePlay = () => {
    navigation.navigate('Game', {
      worldId: selectedWorld,
      playerAge,
      playerName,
      levelId: 1,
      voiceEnabled,
    });
  };

  return (
    <LinearGradient colors={[Colors.deepSpace, '#111144']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Welcome, {playerName}! 🎉</Text>
            <Text style={styles.subtitle}>Age {playerAge} · Choose your world</Text>
          </View>

          {/* Villain intro */}
          <View style={styles.villainBox}>
            <Text style={styles.villainEmoji}>😈</Text>
            <View style={styles.villainText}>
              <Text style={styles.villainTitle}>The Blank is attacking!</Text>
              <Text style={styles.villainDesc}>
                Words are disappearing from the universe. Only you can spell them back!
              </Text>
            </View>
          </View>

          {/* World cards — all unlocked, age sets difficulty within each world */}
          <Text style={styles.sectionLabel}>🌍 Choose Your World</Text>
          <Text style={styles.sectionHint}>
            Words are matched to your age — explore any world!
          </Text>
          {WORLDS.map((world) => (
            <WorldCard
              key={world.id}
              world={world}
              isSelected={selectedWorld === world.id}
              isRecommended={world.id === recommended}
              onPress={() => setSelectedWorld(world.id)}
            />
          ))}

          {/* Voice toggle */}
          <View style={styles.voiceRow}>
            <View style={styles.voiceInfo}>
              <Text style={styles.voiceLabel}>🎤 Read Aloud Mode</Text>
              <Text style={styles.voiceDesc}>Say each word out loud after spelling it!</Text>
            </View>
            <Switch
              value={voiceEnabled}
              onValueChange={setVoiceEnabled}
              trackColor={{ false: 'rgba(255,255,255,0.1)', true: Colors.mint }}
              thumbColor={voiceEnabled ? Colors.deepSpace : Colors.dimWhite}
            />
          </View>
        </ScrollView>

        {/* Sticky footer */}
        <View style={styles.footer}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⭐</Text>
              <Text style={styles.statValue}>{totalStars}</Text>
              <Text style={styles.statLabel}>Stars</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🏅</Text>
              <Text style={styles.statValue}>{totalBadges}</Text>
              <Text style={styles.statLabel}>Levels Done</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🐾</Text>
              <Text style={styles.statValue}>{Math.floor(totalStars / 5)}</Text>
              <Text style={styles.statLabel}>Companions</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handlePlay} activeOpacity={0.85} style={styles.startBtn}>
            <LinearGradient
              colors={[Colors.gold, Colors.orange]}
              style={styles.startGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.startText}>
                {WORLDS.find((w) => w.id === selectedWorld)?.icon} Begin Level 1!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 12 },

  header: { alignItems: 'center', paddingVertical: 20 },
  greeting: { color: Colors.gold, fontSize: 26, fontWeight: '900', marginBottom: 4 },
  subtitle: { color: Colors.dimWhite, fontSize: 14, fontWeight: '600' },

  villainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,82,82,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,82,82,0.25)',
    gap: 14,
  },
  villainEmoji: { fontSize: 36 },
  villainText: { flex: 1 },
  villainTitle: { color: Colors.coral, fontWeight: '800', fontSize: 15, marginBottom: 4 },
  villainDesc: { color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 18 },

  sectionLabel: {
    color: Colors.softWhite,
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionHint: {
    color: Colors.mint,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
    fontStyle: 'italic',
  },

  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 12,
  },
  voiceInfo: { flex: 1 },
  voiceLabel: { color: Colors.white, fontWeight: '800', fontSize: 15, marginBottom: 2 },
  voiceDesc: { color: Colors.dimWhite, fontSize: 12 },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(13,13,43,0.95)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  statItem: { alignItems: 'center' },
  statIcon: { fontSize: 20, marginBottom: 2 },
  statValue: { color: Colors.gold, fontSize: 17, fontWeight: '900' },
  statLabel: { color: Colors.dimWhite, fontSize: 10, fontWeight: '600' },

  startBtn: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  startGradient: { paddingVertical: 18, alignItems: 'center' },
  startText: {
    color: Colors.deepSpace,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
