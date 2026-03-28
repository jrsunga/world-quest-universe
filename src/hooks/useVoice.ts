/**
 * useVoice — wraps expo-av Speech for TTS (reading words aloud to kids)
 * and expo-av Audio for recording (voice check mode).
 *
 * NOTE: Web Speech API is browser-only. For React Native we use expo-speech
 * for text-to-speech. Voice recognition on mobile requires a 3rd-party service
 * (e.g. @react-native-voice/voice) — stubbed here for Phase 1 MVP.
 */
import { useCallback } from 'react';
import * as Speech from 'expo-speech';

export function useVoice() {
  const speakWord = useCallback((word: string) => {
    Speech.speak(word, {
      language: 'en-US',
      pitch: 1.1,
      rate: 0.85,
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    Speech.stop();
  }, []);

  return { speakWord, stopSpeaking };
}
