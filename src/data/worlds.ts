export type WorldId = 'sea' | 'spellRealm' | 'starReader';

export interface World {
  id: WorldId;
  name: string;
  subtitle: string;
  icon: string;
  ageRange: string;
  ageMin: number;
  ageMax: number;
  description: string;
  bgGradient: [string, string];
  totalLevels: number;
  locked: boolean;
}

export const WORLDS: World[] = [
  {
    id: 'sea',
    name: 'Sea of Words',
    subtitle: 'Beginner',
    icon: '🌊',
    ageRange: 'Ages 4–7',
    ageMin: 4,
    ageMax: 7,
    description:
      'Captain a pirate ship across magical seas. Simple 3–4 letter words unlock hidden islands and sunken treasure.',
    bgGradient: ['#1E3C78', '#007BA0'],
    totalLevels: 10,
    locked: false,
  },
  {
    id: 'spellRealm',
    name: 'Spell Realm',
    subtitle: 'Intermediate',
    icon: '🧙',
    ageRange: 'Ages 8–9',
    ageMin: 8,
    ageMax: 9,
    description:
      'Attend a magic academy where reading words correctly casts powerful spells and defeats friendly word-dragons.',
    bgGradient: ['#501E78', '#963CC8'],
    totalLevels: 15,
    locked: true,
  },
  {
    id: 'starReader',
    name: 'Star Reader',
    subtitle: 'Advanced',
    icon: '🚀',
    ageRange: 'Ages 10–12',
    ageMin: 10,
    ageMax: 12,
    description:
      'Pilot a rocket through galaxies. Complex multi-syllable words unlock new planets and alien crew members.',
    bgGradient: ['#14143C', '#3C288C'],
    totalLevels: 20,
    locked: true,
  },
];

export function getWorldForAge(age: number): WorldId {
  if (age <= 7) return 'sea';
  if (age <= 9) return 'spellRealm';
  return 'starReader';
}
