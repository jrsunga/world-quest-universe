import { useState, useCallback } from 'react';
import { WordEntry, shuffleLetters } from '../data/words';

export type GamePhase = 'idle' | 'spelling' | 'success' | 'fail' | 'complete';

export interface LetterSlot {
  letter: string;
  id: string;  // unique key for animations
  used: boolean;
}

export interface GameState {
  word: WordEntry;
  shuffled: LetterSlot[];
  placed: (LetterSlot | null)[];
  phase: GamePhase;
  mistakes: number;
  score: number;
}

export function useGameState(words: WordEntry[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [state, setState] = useState<GameState>(() => initState(words[0]));
  const [levelComplete, setLevelComplete] = useState(false);
  const [totalMistakes, setTotalMistakes] = useState(0);

  function initState(word: WordEntry): GameState {
    const letters = shuffleLetters(word.word);
    return {
      word,
      shuffled: letters.map((l, i) => ({ letter: l, id: `${l}-${i}`, used: false })),
      placed: Array(word.word.length).fill(null),
      phase: 'spelling',
      mistakes: 0,
      score: 0,
    };
  }

  const tapLetter = useCallback(
    (slot: LetterSlot) => {
      setState((prev) => {
        if (prev.phase !== 'spelling' || slot.used) return prev;

        const nextPlaced = [...prev.placed];
        const emptyIdx = nextPlaced.findIndex((p) => p === null);
        if (emptyIdx === -1) return prev;

        nextPlaced[emptyIdx] = slot;
        const nextShuffled = prev.shuffled.map((s) =>
          s.id === slot.id ? { ...s, used: true } : s,
        );

        // Check if all slots filled
        const allFilled = nextPlaced.every((p) => p !== null);
        if (!allFilled) {
          return { ...prev, shuffled: nextShuffled, placed: nextPlaced };
        }

        // Check correctness
        const spelled = nextPlaced.map((p) => p!.letter).join('').toLowerCase();
        const correct = spelled === prev.word.word.toLowerCase();

        if (correct) {
          const stars = prev.mistakes === 0 ? 3 : prev.mistakes <= 1 ? 2 : 1;
          return { ...prev, shuffled: nextShuffled, placed: nextPlaced, phase: 'success', score: stars };
        } else {
          return {
            ...prev,
            shuffled: nextShuffled,
            placed: nextPlaced,
            phase: 'fail',
            mistakes: prev.mistakes + 1,
          };
        }
      });
    },
    [],
  );

  const clearPlaced = useCallback(() => {
    setState((prev) => ({
      ...prev,
      placed: Array(prev.word.word.length).fill(null),
      shuffled: prev.shuffled.map((s) => ({ ...s, used: false })),
      phase: 'spelling',
    }));
    setTotalMistakes((m) => m + 1);
  }, []);

  const nextWord = useCallback(() => {
    const next = wordIndex + 1;
    if (next >= words.length) {
      setLevelComplete(true);
    } else {
      setWordIndex(next);
      setState(initState(words[next]));
    }
  }, [wordIndex, words]);

  const calcLevelStars = useCallback((): number => {
    if (totalMistakes === 0) return 3;
    if (totalMistakes <= words.length) return 2;
    return 1;
  }, [totalMistakes, words.length]);

  return {
    state,
    wordIndex,
    wordCount: words.length,
    levelComplete,
    totalMistakes,
    tapLetter,
    clearPlaced,
    nextWord,
    calcLevelStars,
  };
}
