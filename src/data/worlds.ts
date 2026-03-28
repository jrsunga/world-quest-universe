export type WorldId = 'sea' | 'spellRealm' | 'starReader';

export interface World {
  id: WorldId;
  name: string;
  subtitle: string;
  icon: string;
  ageRange: string;
  description: string;
  bgGradient: [string, string];
  totalLevels: number;
}

export const WORLDS: World[] = [
  {
    id: 'sea',
    name: 'Sea of Words',
    subtitle: 'Pirate Adventure',
    icon: '🌊',
    ageRange: 'Ages 4–7',
    description:
      'Captain a pirate ship across magical seas. Spell words to unlock hidden islands and sunken treasure!',
    bgGradient: ['#1E3C78', '#007BA0'],
    totalLevels: 15,
  },
  {
    id: 'spellRealm',
    name: 'Spell Realm',
    subtitle: 'Magic Academy',
    icon: '🧙',
    ageRange: 'Ages 8–9',
    description:
      'Attend a magic academy where spelling words correctly casts powerful spells and defeats friendly dragons!',
    bgGradient: ['#501E78', '#963CC8'],
    totalLevels: 15,
  },
  {
    id: 'starReader',
    name: 'Star Reader',
    subtitle: 'Space Explorer',
    icon: '🚀',
    ageRange: 'Ages 10–12',
    description:
      'Pilot a rocket through galaxies. Spell words to unlock new planets and collect alien crew members!',
    bgGradient: ['#14143C', '#3C288C'],
    totalLevels: 15,
  },
];

export function getWorldForAge(age: number): WorldId {
  if (age <= 7) return 'sea';
  if (age <= 9) return 'spellRealm';
  return 'starReader';
}
