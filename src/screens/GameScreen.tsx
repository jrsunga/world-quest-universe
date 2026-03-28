import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { LetterTile } from '../components/LetterTile';
import { WordSlot } from '../components/WordSlot';
import { FunnyFailAnimation } from '../components/FunnyFailAnimation';
import { useGameState } from '../hooks/useGameState';
import { useVoice } from '../hooks/useVoice';
import { getLevelsForAge } from '../data/words';
import { saveLevelResult } from '../store/gameStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { WORLDS } from '../data/worlds';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

export function GameScreen({ navigation, route }: Props) {
  const { worldId, playerAge, playerName, levelId, voiceEnabled } = route.params;

  const levels = getLevelsForAge(playerAge);
  const level = levels.find((l) => l.id === levelId) ?? levels[0];
  const world = WORLDS.find((w) => w.id === worldId)!;

  const {
    state,
    wordIndex,
    wordCount,
    levelComplete,
    totalMistakes,
    tapLetter,
    clearPlaced,
    nextWord,
    calcLevelStars,
  } = useGameState(level.words);

  const { speakWord } = useVoice();

  const isCorrect = state.phase === 'success' ? true : state.phase === 'fail' ? false : null;

  // Speak word on success if voice enabled
  useEffect(() => {
    if (state.phase === 'success' && voiceEnabled) {
      speakWord(state.word.word);
    }
  }, [state.phase]);

  // Navigate to result when level done
  useEffect(() => {
    if (levelComplete) {
      const stars = calcLevelStars();
      saveLevelResult(worldId, levelId, stars).then(() => {
        navigation.replace('Result', {
          worldId,
          levelId,
          stars,
          playerAge,
          playerName,
          voiceEnabled,
        });
      });
    }
  }, [levelComplete]);

  const handleFailDone = () => {
    clearPlaced();
  };

  const tileSize = state.word.word.length <= 4 ? 64 : state.word.word.length <= 6 ? 56 : 50;

  return (
    <LinearGradient colors={world.bgGradient} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.progressArea}>
            <Text style={styles.progressText}>
              Word {wordIndex + 1} of {wordCount}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((wordIndex + 1) / wordCount) * 100}%` },
                ]}
              />
            </View>
          </View>
          <Text style={styles.worldIcon}>{world.icon}</Text>
        </View>

        {/* Hint / word emoji */}
        <View style={styles.hintArea}>
          <Text style={styles.hintEmoji}>{state.word.hint}</Text>
          <Text style={styles.hintLabel}>Spell this word!</Text>
        </View>

        {/* Word slots */}
        <View style={styles.slotsArea}>
          <WordSlot slots={state.placed} correct={isCorrect} size={tileSize} />
        </View>

        {/* Feedback banner */}
        {state.phase === 'success' && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>⭐ {state.word.word.toUpperCase()}! ⭐</Text>
            <Text style={styles.successSub}>
              {state.mistakes === 0 ? 'Perfect spelling!' : 'Great job!'}
            </Text>
          </View>
        )}

        {/* Letter tiles */}
        <View style={styles.tilesArea}>
          <View style={styles.tilesRow}>
            {state.shuffled.map((slot) => (
              <LetterTile
                key={slot.id}
                letter={slot.letter}
                used={slot.used}
                onPress={() => tapLetter(slot)}
                size={tileSize}
              />
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          {state.phase === 'spelling' && (
            <TouchableOpacity onPress={clearPlaced} style={styles.clearBtn}>
              <Text style={styles.clearText}>🔄 Clear</Text>
            </TouchableOpacity>
          )}
          {state.phase === 'success' && (
            <TouchableOpacity onPress={nextWord} style={styles.nextBtn}>
              <LinearGradient
                colors={[Colors.gold, Colors.orange]}
                style={styles.nextGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextText}>
                  {wordIndex + 1 < wordCount ? 'Next Word →' : 'Level Complete! 🎉'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        {/* Funny fail overlay */}
        <FunnyFailAnimation
          world={worldId}
          visible={state.phase === 'fail'}
          onDone={handleFailDone}
        />

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  progressArea: { flex: 1 },
  progressText: {
    color: Colors.softWhite,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.mint,
    borderRadius: 3,
  },
  worldIcon: { fontSize: 28 },

  hintArea: { alignItems: 'center', paddingVertical: 20 },
  hintEmoji: { fontSize: 80, marginBottom: 8 },
  hintLabel: {
    color: Colors.softWhite,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  slotsArea: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  successBanner: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.4)',
    marginBottom: 8,
  },
  successText: {
    color: Colors.gold,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  successSub: {
    color: Colors.softWhite,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },

  tilesArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  tilesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  actionsRow: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
  },
  clearBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  clearText: { color: Colors.softWhite, fontSize: 15, fontWeight: '700' },
  nextBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  nextText: {
    color: Colors.deepSpace,
    fontSize: 18,
    fontWeight: '900',
  },
});
