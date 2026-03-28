import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { LetterTile } from '../components/LetterTile';
import { WordSlot } from '../components/WordSlot';
import { FunnyFailAnimation } from '../components/FunnyFailAnimation';
import { WordHintImage } from '../components/WordHintImage';
import { useGameState } from '../hooks/useGameState';
import { useVoice } from '../hooks/useVoice';
import { useSound } from '../hooks/useSound';
import { getLevelsForAgeAndWorld } from '../data/words';
import { saveLevelResult } from '../store/gameStore';
import { RootStackParamList } from '../navigation/AppNavigator';
import { WORLDS } from '../data/worlds';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

const TIER_LABEL: Record<string, string> = {
  easy: '3-letter words',
  medium: '4-letter words',
  hard: '5-letter words',
};

export function GameScreen({ navigation, route }: Props) {
  const { worldId, playerAge, playerName, levelId, voiceEnabled } = route.params;

  const levels = getLevelsForAgeAndWorld(playerAge, worldId);
  const level = levels.find((l) => l.id === levelId) ?? levels[0];
  const world = WORLDS.find((w) => w.id === worldId)!;

  const {
    state,
    wordIndex,
    wordCount,
    levelComplete,
    tapLetter,
    clearPlaced,
    nextWord,
    calcLevelStars,
  } = useGameState(level.words);

  const { speakWord, speakTrivia, stopSpeaking } = useVoice();
  const { play } = useSound();

  const [triviaReady, setTriviaReady] = useState(false);

  const isCorrect = state.phase === 'success' ? true : state.phase === 'fail' ? false : null;
  const tileSize = state.word.word.length <= 3 ? 68 : state.word.word.length <= 4 ? 62 : 54;

  // On success: play sound, speak word (if voiceEnabled), then always read trivia aloud.
  // Next button unlocks only after trivia finishes — essential for pre-readers.
  useEffect(() => {
    if (state.phase !== 'success') {
      setTriviaReady(false);
      return;
    }

    play('correct');

    const readTrivia = () => {
      if (!state.word.trivia) {
        setTriviaReady(true);
        return;
      }
      speakTrivia(state.word.trivia, () => setTriviaReady(true));
    };

    if (voiceEnabled) {
      speakWord(state.word.word, readTrivia);
    } else {
      readTrivia();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // Play tap sound via callback passed down
  const handleTap = (slot: Parameters<typeof tapLetter>[0]) => {
    play('tap');
    tapLetter(slot);
  };

  // Navigate to result when level done
  useEffect(() => {
    if (levelComplete) {
      play('complete');
      const stars = calcLevelStars();
      saveLevelResult(worldId, levelId, stars).then(() => {
        navigation.replace('Result', {
          worldId,
          levelId,
          totalLevels: levels.length,
          stars,
          playerAge,
          playerName,
          voiceEnabled,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelComplete]);

  const handleFailDone = () => {
    clearPlaced();
  };

  return (
    <LinearGradient colors={world.bgGradient} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.progressArea}>
            <View style={styles.progressTopRow}>
              <Text style={styles.progressText}>Word {wordIndex + 1}/{wordCount}</Text>
              <Text style={styles.tierLabel}>{TIER_LABEL[level.tier] ?? ''}</Text>
              <Text style={styles.levelText}>Lvl {levelId}/{levels.length}</Text>
            </View>
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

        {/* Hint */}
        <View style={styles.hintArea}>
          <WordHintImage emoji={state.word.emoji} size={100} />
          <Text style={styles.hintLabel}>Spell this word!</Text>
        </View>

        {/* Word slots */}
        <View style={styles.slotsArea}>
          <WordSlot slots={state.placed} correct={isCorrect} size={tileSize} />
        </View>

        {/* Success banner */}
        {state.phase === 'success' && (
          <ScrollView
            style={styles.successBanner}
            contentContainerStyle={styles.successBannerContent}
            scrollEnabled={false}
          >
            <Text style={styles.successText}>⭐ {state.word.word.toUpperCase()}! ⭐</Text>
            <Text style={styles.successSub}>
              {state.mistakes === 0 ? 'Perfect spelling!' : 'Great job!'}
            </Text>
            {state.word.trivia ? (
              <Text style={styles.triviaText}>💡 {state.word.trivia}</Text>
            ) : null}
          </ScrollView>
        )}

        {/* Letter tiles */}
        <View style={styles.tilesArea}>
          <View style={styles.tilesRow}>
            {state.shuffled.map((slot) => (
              <LetterTile
                key={slot.id}
                letter={slot.letter}
                used={slot.used}
                onPress={() => handleTap(slot)}
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
            triviaReady ? (
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
            ) : (
              <View style={styles.speakingRow}>
                <Text style={styles.speakingText}>🔊 Listening...</Text>
                <TouchableOpacity
                  onPress={() => { stopSpeaking(); setTriviaReady(true); }}
                  style={styles.skipBtn}
                >
                  <Text style={styles.skipText}>Skip →</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>

        {/* Fail animation */}
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
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: { color: Colors.softWhite, fontSize: 11, fontWeight: '700' },
  tierLabel: { color: Colors.mint, fontSize: 11, fontWeight: '700' },
  levelText: { color: Colors.gold, fontSize: 11, fontWeight: '700' },
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

  hintArea: { alignItems: 'center', paddingVertical: 16 },
  hintLabel: {
    color: Colors.softWhite,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  slotsArea: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },

  successBanner: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    borderRadius: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.4)',
    marginBottom: 8,
    maxHeight: 120,
  },
  successBannerContent: {
    padding: 14,
    alignItems: 'center',
  },
  successText: { color: Colors.gold, fontSize: 20, fontWeight: '900', letterSpacing: 2 },
  successSub: { color: Colors.softWhite, fontSize: 13, fontWeight: '600', marginTop: 4 },
  triviaText: {
    color: Colors.lavender,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 17,
  },

  tilesArea: { flex: 1, justifyContent: 'center', paddingHorizontal: 16 },
  tilesRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },

  actionsRow: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8, minHeight: 68 },
  clearBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  clearText: { color: Colors.softWhite, fontSize: 15, fontWeight: '700' },
  nextBtn: { borderRadius: 16, overflow: 'hidden' },
  nextGradient: { paddingVertical: 18, alignItems: 'center' },
  nextText: { color: Colors.deepSpace, fontSize: 18, fontWeight: '900' },

  speakingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  speakingText: { color: Colors.softWhite, fontSize: 15, fontWeight: '700' },
  skipBtn: { paddingVertical: 4, paddingHorizontal: 12 },
  skipText: { color: Colors.dimWhite, fontSize: 14, fontWeight: '600' },
});
