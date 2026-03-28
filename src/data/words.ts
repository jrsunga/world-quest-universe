import { WorldId } from './worlds';

export interface WordEntry {
  word: string;
  hint: string;
  phonetic: string;
}

export interface Level {
  id: number;
  words: WordEntry[];
  tier: 'easy' | 'medium' | 'hard';
}

// ─── SEA OF WORDS ──────────────────────────────────────────────────────────
const SEA_EASY: WordEntry[] = [
  { word: 'sun', hint: '☀️', phonetic: 'sun' },
  { word: 'sea', hint: '🌊', phonetic: 'sea' },
  { word: 'net', hint: '🕸️', phonetic: 'net' },
  { word: 'fin', hint: '🐟', phonetic: 'fin' },
  { word: 'bay', hint: '🏖️', phonetic: 'bay' },
  { word: 'oar', hint: '🚣', phonetic: 'oar' },
  { word: 'cod', hint: '🐠', phonetic: 'cod' },
  { word: 'eel', hint: '🐍', phonetic: 'eel' },
  { word: 'cat', hint: '🐱', phonetic: 'cat' },
  { word: 'dog', hint: '🐶', phonetic: 'dog' },
  { word: 'hat', hint: '🎩', phonetic: 'hat' },
  { word: 'cup', hint: '☕', phonetic: 'cup' },
  { word: 'bug', hint: '🐛', phonetic: 'bug' },
  { word: 'fox', hint: '🦊', phonetic: 'fox' },
  { word: 'bee', hint: '🐝', phonetic: 'bee' },
  { word: 'ant', hint: '🐜', phonetic: 'ant' },
  { word: 'map', hint: '🗺️', phonetic: 'map' },
  { word: 'log', hint: '🪵', phonetic: 'log' },
  { word: 'top', hint: '🌀', phonetic: 'top' },
  { word: 'jet', hint: '✈️', phonetic: 'jet' },
];

const SEA_MEDIUM: WordEntry[] = [
  { word: 'ship', hint: '🚢', phonetic: 'ship' },
  { word: 'fish', hint: '🐟', phonetic: 'fish' },
  { word: 'wave', hint: '🌊', phonetic: 'wave' },
  { word: 'boat', hint: '⛵', phonetic: 'boat' },
  { word: 'reef', hint: '🪸', phonetic: 'reef' },
  { word: 'crab', hint: '🦀', phonetic: 'crab' },
  { word: 'tide', hint: '🌊', phonetic: 'tide' },
  { word: 'sail', hint: '⛵', phonetic: 'sail' },
  { word: 'cove', hint: '🏖️', phonetic: 'cove' },
  { word: 'foam', hint: '🫧', phonetic: 'foam' },
  { word: 'sand', hint: '🏖️', phonetic: 'sand' },
  { word: 'mast', hint: '⛵', phonetic: 'mast' },
  { word: 'blue', hint: '💙', phonetic: 'blue' },
  { word: 'bird', hint: '🐦', phonetic: 'bird' },
  { word: 'frog', hint: '🐸', phonetic: 'frog' },
  { word: 'star', hint: '⭐', phonetic: 'star' },
  { word: 'rain', hint: '🌧️', phonetic: 'rain' },
  { word: 'moon', hint: '🌙', phonetic: 'moon' },
  { word: 'king', hint: '👑', phonetic: 'king' },
  { word: 'gold', hint: '🪙', phonetic: 'gold' },
];

const SEA_HARD: WordEntry[] = [
  { word: 'ocean', hint: '🌊', phonetic: 'ocean' },
  { word: 'coral', hint: '🪸', phonetic: 'coral' },
  { word: 'pearl', hint: '💎', phonetic: 'pearl' },
  { word: 'whale', hint: '🐋', phonetic: 'whale' },
  { word: 'shark', hint: '🦈', phonetic: 'shark' },
  { word: 'shell', hint: '🐚', phonetic: 'shell' },
  { word: 'beach', hint: '🏖️', phonetic: 'beach' },
  { word: 'coast', hint: '🏝️', phonetic: 'coast' },
  { word: 'storm', hint: '⛈️', phonetic: 'storm' },
  { word: 'water', hint: '💧', phonetic: 'water' },
  { word: 'sword', hint: '⚔️', phonetic: 'sword' },
  { word: 'plank', hint: '🪵', phonetic: 'plank' },
  { word: 'fleet', hint: '🚢', phonetic: 'fleet' },
  { word: 'crest', hint: '🌊', phonetic: 'crest' },
  { word: 'spray', hint: '💦', phonetic: 'spray' },
  { word: 'rocks', hint: '🪨', phonetic: 'rocks' },
  { word: 'trout', hint: '🐟', phonetic: 'trout' },
  { word: 'prawn', hint: '🦐', phonetic: 'prawn' },
  { word: 'squid', hint: '🦑', phonetic: 'squid' },
  { word: 'crane', hint: '🏗️', phonetic: 'crane' },
];

// ─── SPELL REALM ───────────────────────────────────────────────────────────
const SPELL_EASY: WordEntry[] = [
  { word: 'owl', hint: '🦉', phonetic: 'owl' },
  { word: 'elf', hint: '🧝', phonetic: 'elf' },
  { word: 'orb', hint: '🔮', phonetic: 'orb' },
  { word: 'gem', hint: '💎', phonetic: 'gem' },
  { word: 'fog', hint: '🌫️', phonetic: 'fog' },
  { word: 'ivy', hint: '🌿', phonetic: 'ivy' },
  { word: 'imp', hint: '👿', phonetic: 'imp' },
  { word: 'ash', hint: '🌑', phonetic: 'ash' },
  { word: 'oak', hint: '🌳', phonetic: 'oak' },
  { word: 'bat', hint: '🦇', phonetic: 'bat' },
  { word: 'hex', hint: '✨', phonetic: 'hex' },
  { word: 'yew', hint: '🌲', phonetic: 'yew' },
  { word: 'rod', hint: '🪄', phonetic: 'rod' },
  { word: 'wax', hint: '🕯️', phonetic: 'wax' },
  { word: 'fly', hint: '🪰', phonetic: 'fly' },
  { word: 'sky', hint: '🌌', phonetic: 'sky' },
  { word: 'fey', hint: '🧚', phonetic: 'fey' },
  { word: 'elm', hint: '🌳', phonetic: 'elm' },
  { word: 'cry', hint: '😢', phonetic: 'cry' },
  { word: 'rye', hint: '🌾', phonetic: 'rye' },
];

const SPELL_MEDIUM: WordEntry[] = [
  { word: 'wand', hint: '🪄', phonetic: 'wand' },
  { word: 'rune', hint: '🔣', phonetic: 'rune' },
  { word: 'mage', hint: '🧙', phonetic: 'mage' },
  { word: 'toad', hint: '🐸', phonetic: 'toad' },
  { word: 'brew', hint: '🧪', phonetic: 'brew' },
  { word: 'glow', hint: '✨', phonetic: 'glow' },
  { word: 'dark', hint: '🌑', phonetic: 'dark' },
  { word: 'moon', hint: '🌙', phonetic: 'moon' },
  { word: 'wolf', hint: '🐺', phonetic: 'wolf' },
  { word: 'cave', hint: '🕌', phonetic: 'cave' },
  { word: 'book', hint: '📚', phonetic: 'book' },
  { word: 'fire', hint: '🔥', phonetic: 'fire' },
  { word: 'mist', hint: '🌫️', phonetic: 'mist' },
  { word: 'vine', hint: '🌿', phonetic: 'vine' },
  { word: 'gold', hint: '🪙', phonetic: 'gold' },
  { word: 'bell', hint: '🔔', phonetic: 'bell' },
  { word: 'vale', hint: '🏔️', phonetic: 'vale' },
  { word: 'tome', hint: '📖', phonetic: 'tome' },
  { word: 'dusk', hint: '🌆', phonetic: 'dusk' },
  { word: 'lore', hint: '📜', phonetic: 'lore' },
];

const SPELL_HARD: WordEntry[] = [
  { word: 'magic', hint: '✨', phonetic: 'magic' },
  { word: 'spell', hint: '🪄', phonetic: 'spell' },
  { word: 'witch', hint: '🧙‍♀️', phonetic: 'witch' },
  { word: 'raven', hint: '🐦‍⬛', phonetic: 'raven' },
  { word: 'flame', hint: '🔥', phonetic: 'flame' },
  { word: 'frost', hint: '❄️', phonetic: 'frost' },
  { word: 'storm', hint: '⛈️', phonetic: 'storm' },
  { word: 'brave', hint: '🦁', phonetic: 'brave' },
  { word: 'beast', hint: '🐉', phonetic: 'beast' },
  { word: 'charm', hint: '💫', phonetic: 'charm' },
  { word: 'grace', hint: '🌸', phonetic: 'grace' },
  { word: 'dwarf', hint: '⛏️', phonetic: 'dwarf' },
  { word: 'pixie', hint: '🧚', phonetic: 'pixie' },
  { word: 'druid', hint: '🌿', phonetic: 'druid' },
  { word: 'broom', hint: '🧹', phonetic: 'broom' },
  { word: 'gnome', hint: '🍄', phonetic: 'gnome' },
  { word: 'thorn', hint: '🌹', phonetic: 'thorn' },
  { word: 'cloak', hint: '🧥', phonetic: 'cloak' },
  { word: 'stone', hint: '🪨', phonetic: 'stone' },
  { word: 'cloud', hint: '☁️', phonetic: 'cloud' },
];

// ─── STAR READER ───────────────────────────────────────────────────────────
const STAR_EASY: WordEntry[] = [
  { word: 'sun', hint: '☀️', phonetic: 'sun' },
  { word: 'sky', hint: '🌌', phonetic: 'sky' },
  { word: 'orb', hint: '🔵', phonetic: 'orb' },
  { word: 'ray', hint: '✨', phonetic: 'ray' },
  { word: 'arc', hint: '🌈', phonetic: 'arc' },
  { word: 'pod', hint: '🚀', phonetic: 'pod' },
  { word: 'hub', hint: '🛸', phonetic: 'hub' },
  { word: 'gas', hint: '💨', phonetic: 'gas' },
  { word: 'ion', hint: '⚡', phonetic: 'ion' },
  { word: 'jet', hint: '✈️', phonetic: 'jet' },
  { word: 'dim', hint: '💡', phonetic: 'dim' },
  { word: 'lit', hint: '🔦', phonetic: 'lit' },
  { word: 'red', hint: '🔴', phonetic: 'red' },
  { word: 'hot', hint: '🌡️', phonetic: 'hot' },
  { word: 'icy', hint: '🧊', phonetic: 'icy' },
  { word: 'far', hint: '🔭', phonetic: 'far' },
  { word: 'low', hint: '📉', phonetic: 'low' },
  { word: 'big', hint: '🌟', phonetic: 'big' },
  { word: 'old', hint: '⏳', phonetic: 'old' },
  { word: 'fly', hint: '🛸', phonetic: 'fly' },
];

const STAR_MEDIUM: WordEntry[] = [
  { word: 'star', hint: '⭐', phonetic: 'star' },
  { word: 'moon', hint: '🌙', phonetic: 'moon' },
  { word: 'mars', hint: '🔴', phonetic: 'mars' },
  { word: 'nova', hint: '💥', phonetic: 'nova' },
  { word: 'dust', hint: '✨', phonetic: 'dust' },
  { word: 'core', hint: '🌑', phonetic: 'core' },
  { word: 'ring', hint: '🪐', phonetic: 'ring' },
  { word: 'belt', hint: '🌌', phonetic: 'belt' },
  { word: 'beam', hint: '🔦', phonetic: 'beam' },
  { word: 'void', hint: '🌑', phonetic: 'void' },
  { word: 'dark', hint: '🌑', phonetic: 'dark' },
  { word: 'glow', hint: '✨', phonetic: 'glow' },
  { word: 'halo', hint: '💫', phonetic: 'halo' },
  { word: 'warp', hint: '🌀', phonetic: 'warp' },
  { word: 'iron', hint: '⚙️', phonetic: 'iron' },
  { word: 'fire', hint: '🔥', phonetic: 'fire' },
  { word: 'rock', hint: '🪨', phonetic: 'rock' },
  { word: 'blue', hint: '💙', phonetic: 'blue' },
  { word: 'zoom', hint: '🚀', phonetic: 'zoom' },
  { word: 'spin', hint: '🌀', phonetic: 'spin' },
];

const STAR_HARD: WordEntry[] = [
  { word: 'comet', hint: '☄️', phonetic: 'comet' },
  { word: 'orbit', hint: '🛸', phonetic: 'orbit' },
  { word: 'lunar', hint: '🌙', phonetic: 'lunar' },
  { word: 'solar', hint: '☀️', phonetic: 'solar' },
  { word: 'probe', hint: '🔭', phonetic: 'probe' },
  { word: 'laser', hint: '⚡', phonetic: 'laser' },
  { word: 'radar', hint: '📡', phonetic: 'radar' },
  { word: 'titan', hint: '🪐', phonetic: 'titan' },
  { word: 'venus', hint: '🔴', phonetic: 'venus' },
  { word: 'pluto', hint: '🌑', phonetic: 'pluto' },
  { word: 'alien', hint: '👽', phonetic: 'alien' },
  { word: 'black', hint: '🌑', phonetic: 'black' },
  { word: 'globe', hint: '🌍', phonetic: 'globe' },
  { word: 'rings', hint: '🪐', phonetic: 'rings' },
  { word: 'stars', hint: '🌟', phonetic: 'stars' },
  { word: 'moons', hint: '🌙', phonetic: 'moons' },
  { word: 'rocky', hint: '🪨', phonetic: 'rocky' },
  { word: 'light', hint: '💡', phonetic: 'light' },
  { word: 'space', hint: '🚀', phonetic: 'space' },
  { word: 'ozone', hint: '🌎', phonetic: 'ozone' },
];

// ─── Word bank per world ────────────────────────────────────────────────────
const WORLD_WORDS: Record<WorldId, { easy: WordEntry[]; medium: WordEntry[]; hard: WordEntry[] }> = {
  sea: { easy: SEA_EASY, medium: SEA_MEDIUM, hard: SEA_HARD },
  spellRealm: { easy: SPELL_EASY, medium: SPELL_MEDIUM, hard: SPELL_HARD },
  starReader: { easy: STAR_EASY, medium: STAR_MEDIUM, hard: STAR_HARD },
};

function chunkIntoLevels(words: WordEntry[], tier: Level['tier'], startId: number, wordsPerLevel = 4): Level[] {
  const levels: Level[] = [];
  for (let i = 0; i < words.length; i += wordsPerLevel) {
    levels.push({ id: startId + levels.length, words: words.slice(i, i + wordsPerLevel), tier });
  }
  return levels;
}

/**
 * Returns levels for a player based on age + chosen world.
 * All worlds are available; age determines the difficulty tier mix.
 *
 * age 4–5 : easy (3-letter) → medium (4-letter)           [10 levels]
 * age 6–7 : easy → medium → hard                          [15 levels]
 * age 8–9 : medium → hard                                 [10 levels]
 * age 10+ : hard only                                     [5 levels]
 */
export function getLevelsForAgeAndWorld(age: number, worldId: WorldId): Level[] {
  const words = WORLD_WORDS[worldId];

  const raw: Level[] =
    age <= 5
      ? [
          ...chunkIntoLevels(words.easy, 'easy', 1),
          ...chunkIntoLevels(words.medium, 'medium', words.easy.length / 4 + 1),
        ]
      : age <= 7
        ? [
            ...chunkIntoLevels(words.easy, 'easy', 1),
            ...chunkIntoLevels(words.medium, 'medium', words.easy.length / 4 + 1),
            ...chunkIntoLevels(words.hard, 'hard', words.easy.length / 4 + words.medium.length / 4 + 1),
          ]
        : age <= 9
          ? [
              ...chunkIntoLevels(words.medium, 'medium', 1),
              ...chunkIntoLevels(words.hard, 'hard', words.medium.length / 4 + 1),
            ]
          : chunkIntoLevels(words.hard, 'hard', 1);

  // Re-index so IDs are sequential from 1
  return raw.map((l, i) => ({ ...l, id: i + 1 }));
}

/** @deprecated use getLevelsForAgeAndWorld */
export function getLevelsForAge(age: number) {
  return getLevelsForAgeAndWorld(age, 'sea');
}

export function shuffleLetters(word: string): string[] {
  const letters = word.toUpperCase().split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  if (letters.join('') === word.toUpperCase()) {
    [letters[0], letters[1]] = [letters[1], letters[0]];
  }
  return letters;
}
