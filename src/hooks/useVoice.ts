/**
 * useVoice — TTS for reading words and trivia aloud to kids.
 *
 * Voice quality strategy:
 *  1. On first use, scan available voices and pick the most natural-sounding
 *     English voice (neural > enhanced > premium > default).
 *  2. iOS ships excellent neural voices (e.g. "Nicky", "Zoe", "Evan").
 *  3. Android quality varies by device; we still prefer "enhanced" variants.
 *  4. Falls back to the system default if nothing better is found.
 */
import { useCallback, useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';

// Keywords that identify high-quality voices, in priority order.
const QUALITY_KEYWORDS = ['neural', 'enhanced', 'premium', 'natural'];

// Friendly child-appropriate en-US voice names to prefer on iOS.
const PREFERRED_IOS_VOICES = ['nicky', 'zoe', 'evan', 'allison', 'samantha', 'karen', 'daniel'];

function scoreVoice(voice: Speech.Voice): number {
  const id = (voice.identifier ?? '').toLowerCase();
  const name = (voice.name ?? '').toLowerCase();

  // Highest priority: named child-friendly voices
  for (let i = 0; i < PREFERRED_IOS_VOICES.length; i++) {
    if (name.includes(PREFERRED_IOS_VOICES[i]) || id.includes(PREFERRED_IOS_VOICES[i])) {
      return 100 - i;
    }
  }
  // Next: any quality keyword in the identifier
  for (let i = 0; i < QUALITY_KEYWORDS.length; i++) {
    if (id.includes(QUALITY_KEYWORDS[i])) return 50 - i;
  }
  return 0;
}

export function useVoice() {
  const voiceId = useRef<string | undefined>(undefined);

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then((voices) => {
        const enVoices = voices.filter(
          (v) => v.language?.toLowerCase().startsWith('en')
        );
        if (enVoices.length === 0) return;

        const best = enVoices.reduce((a, b) => (scoreVoice(a) >= scoreVoice(b) ? a : b));
        if (scoreVoice(best) > 0) {
          voiceId.current = best.identifier;
        }
      })
      .catch(() => {}); // non-fatal — default voice still works
  }, []);

  const speakWord = useCallback((word: string, onDone?: () => void) => {
    Speech.speak(word, {
      language: 'en-US',
      voice: voiceId.current,
      pitch: 1.05,
      rate: 0.82,
      onDone,
      onError: onDone,
    });
  }, []);

  /** Always speaks trivia aloud — essential for pre-readers. */
  const speakTrivia = useCallback((text: string, onDone?: () => void) => {
    Speech.speak(text, {
      language: 'en-US',
      voice: voiceId.current,
      pitch: 1.0,
      rate: 0.78,
      onDone,
      onError: onDone,
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    Speech.stop();
  }, []);

  return { speakWord, speakTrivia, stopSpeaking };
}
