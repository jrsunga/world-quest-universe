import { WorldId } from './worlds';

export interface WordEntry {
  word: string;
  hint: string;      // emoji or short clue shown as image
  phonetic: string;  // for TTS / voice check
}

export interface Level {
  id: number;
  words: WordEntry[];
}

const SEA_WORDS_BEGINNER: WordEntry[] = [
  { word: 'cat', hint: '🐱', phonetic: 'cat' },
  { word: 'sun', hint: '☀️', phonetic: 'sun' },
  { word: 'dog', hint: '🐶', phonetic: 'dog' },
  { word: 'red', hint: '🔴', phonetic: 'red' },
  { word: 'hat', hint: '🎩', phonetic: 'hat' },
  { word: 'cup', hint: '☕', phonetic: 'cup' },
  { word: 'bee', hint: '🐝', phonetic: 'bee' },
  { word: 'map', hint: '🗺️', phonetic: 'map' },
  { word: 'bug', hint: '🐛', phonetic: 'bug' },
  { word: 'fox', hint: '🦊', phonetic: 'fox' },
  { word: 'hen', hint: '🐔', phonetic: 'hen' },
  { word: 'pig', hint: '🐷', phonetic: 'pig' },
];

const SEA_WORDS_ADVANCED: WordEntry[] = [
  { word: 'ship', hint: '🚢', phonetic: 'ship' },
  { word: 'frog', hint: '🐸', phonetic: 'frog' },
  { word: 'jump', hint: '🦘', phonetic: 'jump' },
  { word: 'blue', hint: '💙', phonetic: 'blue' },
  { word: 'fish', hint: '🐟', phonetic: 'fish' },
  { word: 'bird', hint: '🐦', phonetic: 'bird' },
  { word: 'cake', hint: '🎂', phonetic: 'cake' },
  { word: 'tree', hint: '🌳', phonetic: 'tree' },
  { word: 'star', hint: '⭐', phonetic: 'star' },
  { word: 'rain', hint: '🌧️', phonetic: 'rain' },
  { word: 'moon', hint: '🌙', phonetic: 'moon' },
  { word: 'king', hint: '👑', phonetic: 'king' },
];

const SPELL_REALM_WORDS: WordEntry[] = [
  { word: 'cloud', hint: '☁️', phonetic: 'cloud' },
  { word: 'brave', hint: '🦁', phonetic: 'brave' },
  { word: 'magic', hint: '✨', phonetic: 'magic' },
  { word: 'storm', hint: '⛈️', phonetic: 'storm' },
  { word: 'flame', hint: '🔥', phonetic: 'flame' },
  { word: 'frost', hint: '❄️', phonetic: 'frost' },
  { word: 'prince', hint: '🤴', phonetic: 'prince' },
  { word: 'dragon', hint: '🐉', phonetic: 'dragon' },
  { word: 'castle', hint: '🏰', phonetic: 'castle' },
  { word: 'shield', hint: '🛡️', phonetic: 'shield' },
  { word: 'wand', hint: '🪄', phonetic: 'wand' },
  { word: 'witch', hint: '🧙‍♀️', phonetic: 'witch' },
];

const STAR_READER_WORDS: WordEntry[] = [
  { word: 'journey', hint: '🧭', phonetic: 'journey' },
  { word: 'ancient', hint: '🏛️', phonetic: 'ancient' },
  { word: 'discover', hint: '🔭', phonetic: 'discover' },
  { word: 'galaxy', hint: '🌌', phonetic: 'galaxy' },
  { word: 'planet', hint: '🪐', phonetic: 'planet' },
  { word: 'rocket', hint: '🚀', phonetic: 'rocket' },
  { word: 'mission', hint: '🎯', phonetic: 'mission' },
  { word: 'captain', hint: '👨‍✈️', phonetic: 'captain' },
  { word: 'explore', hint: '🗺️', phonetic: 'explore' },
  { word: 'meteor', hint: '☄️', phonetic: 'meteor' },
  { word: 'nebula', hint: '🌠', phonetic: 'nebula' },
  { word: 'orbit', hint: '🛸', phonetic: 'orbit' },
];

function chunkIntoLevels(words: WordEntry[], wordsPerLevel = 4): Level[] {
  const levels: Level[] = [];
  for (let i = 0; i < words.length; i += wordsPerLevel) {
    levels.push({
      id: levels.length + 1,
      words: words.slice(i, i + wordsPerLevel),
    });
  }
  return levels;
}

export const WORD_DATA: Record<WorldId, Record<string, Level[]>> = {
  sea: {
    beginner: chunkIntoLevels(SEA_WORDS_BEGINNER),   // age 4-5
    advanced: chunkIntoLevels(SEA_WORDS_ADVANCED),    // age 6-7
  },
  spellRealm: {
    default: chunkIntoLevels(SPELL_REALM_WORDS),
  },
  starReader: {
    default: chunkIntoLevels(STAR_READER_WORDS),
  },
};

export function getLevelsForAge(age: number): Level[] {
  if (age <= 5) return WORD_DATA.sea.beginner;
  if (age <= 7) return WORD_DATA.sea.advanced;
  if (age <= 9) return WORD_DATA.spellRealm.default;
  return WORD_DATA.starReader.default;
}

export function shuffleLetters(word: string): string[] {
  const letters = word.toUpperCase().split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  // Make sure it's never in correct order
  if (letters.join('') === word.toUpperCase()) {
    const tmp = letters[0];
    letters[0] = letters[1];
    letters[1] = tmp;
  }
  return letters;
}
