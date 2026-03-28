import { useEffect, useRef, useCallback } from 'react';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';

type SoundName = 'tap' | 'correct' | 'wrong' | 'complete';

/* eslint-disable @typescript-eslint/no-require-imports */
const SOUND_FILES: Record<SoundName, number> = {
  tap: require('../../assets/sounds/tap.wav'),
  correct: require('../../assets/sounds/correct.wav'),
  wrong: require('../../assets/sounds/wrong.wav'),
  complete: require('../../assets/sounds/complete.wav'),
};
/* eslint-enable @typescript-eslint/no-require-imports */

export function useSound() {
  const players = useRef<Partial<Record<SoundName, AudioPlayer>>>({});

  useEffect(() => {
    // Allow sound to play even when the iOS silent switch is on
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});

    const keys = Object.keys(SOUND_FILES) as SoundName[];
    for (const name of keys) {
      try {
        players.current[name] = createAudioPlayer(SOUND_FILES[name]);
      } catch {
        // Non-fatal — sounds are an enhancement, not required
      }
    }

    return () => {
      for (const player of Object.values(players.current)) {
        try { player?.remove(); } catch { /* ignore */ }
      }
      players.current = {};
    };
  }, []);

  const play = useCallback(async (name: SoundName) => {
    try {
      const player = players.current[name];
      if (!player) return;
      await player.seekTo(0);
      player.play();
    } catch {
      // Ignore playback errors
    }
  }, []);

  return { play };
}
