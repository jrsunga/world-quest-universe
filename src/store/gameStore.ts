import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorldId } from '../data/worlds';

const STORAGE_KEY = 'wordquest_save';

export interface LevelProgress {
  stars: number;       // 0–3
  completed: boolean;
}

export interface GameSave {
  playerAge: number;
  playerName: string;
  currentWorld: WorldId;
  voiceEnabled: boolean;
  worlds: {
    [key in WorldId]: {
      unlocked: boolean;
      levels: Record<number, LevelProgress>;
      totalStars: number;
    };
  };
}

const DEFAULT_SAVE: GameSave = {
  playerAge: 6,
  playerName: 'Hero',
  currentWorld: 'sea',
  voiceEnabled: false,
  worlds: {
    sea: { unlocked: true, levels: {}, totalStars: 0 },
    spellRealm: { unlocked: false, levels: {}, totalStars: 0 },
    starReader: { unlocked: false, levels: {}, totalStars: 0 },
  },
};

export async function loadGame(): Promise<GameSave> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SAVE;
    return JSON.parse(raw) as GameSave;
  } catch {
    return DEFAULT_SAVE;
  }
}

export async function saveGame(data: GameSave): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save game:', e);
  }
}

export async function savePlayerSetup(
  age: number,
  name: string,
  world: WorldId,
): Promise<GameSave> {
  const save = await loadGame();
  const updated: GameSave = {
    ...save,
    playerAge: age,
    playerName: name,
    currentWorld: world,
  };
  await saveGame(updated);
  return updated;
}

export async function saveLevelResult(
  world: WorldId,
  levelId: number,
  stars: number,
): Promise<GameSave> {
  const save = await loadGame();
  const prev = save.worlds[world].levels[levelId];
  const bestStars = Math.max(prev?.stars ?? 0, stars);
  save.worlds[world].levels[levelId] = { stars: bestStars, completed: true };
  save.worlds[world].totalStars = Object.values(save.worlds[world].levels).reduce(
    (sum, l) => sum + l.stars,
    0,
  );
  await saveGame(save);
  return save;
}
