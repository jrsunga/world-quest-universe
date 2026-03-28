import { useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';

type SoundName = 'tap' | 'correct' | 'wrong' | 'complete';

const SOUND_FILES: Record<SoundName, number> = {
  /* eslint-disable @typescript-eslint/no-require-imports */
  tap: require('../../assets/sounds/tap.wav'),
  correct: require('../../assets/sounds/correct.wav'),
  wrong: require('../../assets/sounds/wrong.wav'),
  complete: require('../../assets/sounds/complete.wav'),
  /* eslint-enable @typescript-eslint/no-require-imports */
};

export function useSound() {
  const sounds = useRef<Partial<Record<SoundName, Audio.Sound>>>({});

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    let mounted = true;
    const keys = Object.keys(SOUND_FILES) as SoundName[];

    (async () => {
      for (const name of keys) {
        try {
          const { sound } = await Audio.Sound.createAsync(SOUND_FILES[name], {
            shouldPlay: false,
          });
          if (mounted) sounds.current[name] = sound;
        } catch {
          // Sound loading failure is non-fatal
        }
      }
    })();

    return () => {
      mounted = false;
      for (const sound of Object.values(sounds.current)) {
        sound?.unloadAsync();
      }
      sounds.current = {};
    };
  }, []);

  const play = useCallback(async (name: SoundName) => {
    try {
      const sound = sounds.current[name];
      if (!sound) return;
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch {
      // Ignore playback errors (e.g. sound not loaded yet)
    }
  }, []);

  return { play };
}
