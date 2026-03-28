import { WorldId } from './worlds';

export interface WordEntry {
  word: string;
  emoji: string;
  phonetic: string;
  trivia: string;
}

export interface Level {
  id: number;
  words: WordEntry[];
  tier: 'easy' | 'medium' | 'hard';
}

// ─── SEA OF WORDS ──────────────────────────────────────────────────────────
const SEA_EASY: WordEntry[] = [
  { word: 'sun', emoji: '☀️', phonetic: 'sun', trivia: "The Sun is so big that one million Earths could fit inside it!" },
  { word: 'sea', emoji: '🌊', phonetic: 'sea', trivia: "The sea covers over 70% of Earth — it's the biggest place on our whole planet!" },
  { word: 'net', emoji: '🕸️', phonetic: 'net', trivia: "Fishing nets can be so large they could hold a jumbo jet inside them!" },
  { word: 'fin', emoji: '🐟', phonetic: 'fin', trivia: "Fish use their fins to steer and balance, just like a plane uses its wings!" },
  { word: 'bay', emoji: '🏖️', phonetic: 'bay', trivia: "A bay is a cozy spot where the ocean curves inward, hugged by land on three sides." },
  { word: 'hen', emoji: '🐔', phonetic: 'hen', trivia: "A hen can lay over 300 eggs in a single year — that's almost one every single day!" },
  { word: 'pig', emoji: '🐷', phonetic: 'pig', trivia: "Pigs are actually very smart and can learn their own names in just two weeks!" },
  { word: 'jar', emoji: '🫙', phonetic: 'jar', trivia: "The first glass jars were made over 3,000 years ago to store food and precious water." },
  { word: 'cat', emoji: '🐱', phonetic: 'cat', trivia: "Cats can make over 100 different sounds — way more than dogs!" },
  { word: 'dog', emoji: '🐶', phonetic: 'dog', trivia: "Dogs can smell about 1,000 times better than humans — they have superpowered noses!" },
  { word: 'hat', emoji: '🎩', phonetic: 'hat', trivia: "The top hat was invented in 1797 and people thought it was so tall it looked scary!" },
  { word: 'cup', emoji: '☕', phonetic: 'cup', trivia: "People drink about 2.5 billion cups of tea and coffee every single day around the world!" },
  { word: 'bug', emoji: '🐛', phonetic: 'bug', trivia: "There are more bugs on Earth than any other type of animal — trillions and trillions of them!" },
  { word: 'fox', emoji: '🦊', phonetic: 'fox', trivia: "Foxes can run up to 30 miles per hour — almost as fast as a car in a neighborhood!" },
  { word: 'bee', emoji: '🐝', phonetic: 'bee', trivia: "A bee visits up to 5,000 flowers in a single day to collect nectar for honey!" },
  { word: 'ant', emoji: '🐜', phonetic: 'ant', trivia: "Ants can carry objects 50 times heavier than their own body weight — super strong!" },
  { word: 'map', emoji: '🗺️', phonetic: 'map', trivia: "The oldest map ever found was drawn on a clay tablet over 4,000 years ago!" },
  { word: 'log', emoji: '🪵', phonetic: 'log', trivia: "A single fallen log can be home to thousands of insects, spiders, and tiny creatures!" },
  { word: 'top', emoji: '🌀', phonetic: 'top', trivia: "A spinning top can balance perfectly on its tiny tip when it spins really fast!" },
  { word: 'jet', emoji: '✈️', phonetic: 'jet', trivia: "A jet plane travels so fast it can cross the whole United States in just 5 hours!" },
];

const SEA_MEDIUM: WordEntry[] = [
  { word: 'ship', emoji: '🚢', phonetic: 'ship', trivia: "The biggest ships in the world are longer than three football fields put together!" },
  { word: 'fish', emoji: '🐟', phonetic: 'fish', trivia: "There are over 30,000 different species of fish in the world's oceans and rivers!" },
  { word: 'wave', emoji: '🌊', phonetic: 'wave', trivia: "The tallest ocean wave ever recorded was as tall as a 20-story building!" },
  { word: 'boat', emoji: '⛵', phonetic: 'boat', trivia: "People have been using boats to travel on water for at least 40,000 years!" },
  { word: 'reef', emoji: '🪸', phonetic: 'reef', trivia: "Coral reefs are home to over 25% of all ocean life — they're the ocean's rainforest!" },
  { word: 'crab', emoji: '🦀', phonetic: 'crab', trivia: "Crabs can walk sideways and can also swim — they have 10 legs total!" },
  { word: 'tide', emoji: '🌊', phonetic: 'tide', trivia: "Tides are caused by the Moon pulling on Earth's oceans with its gravity!" },
  { word: 'sail', emoji: '⛵', phonetic: 'sail', trivia: "Wind-powered sailboats have been crossing oceans for thousands of years!" },
  { word: 'cove', emoji: '🏖️', phonetic: 'cove', trivia: "A cove is a small sheltered bay — pirates used to hide their ships in coves!" },
  { word: 'foam', emoji: '🫧', phonetic: 'foam', trivia: "Sea foam is made of millions of tiny air bubbles trapped by salty, swirling water!" },
  { word: 'sand', emoji: '🏖️', phonetic: 'sand', trivia: "A single sandcastle can contain over a million individual grains of sand!" },
  { word: 'mast', emoji: '⛵', phonetic: 'mast', trivia: "The mast is the tall pole on a ship that holds the sails up high in the wind." },
  { word: 'blue', emoji: '💙', phonetic: 'blue', trivia: "The ocean looks blue because water absorbs red light and reflects blue light back!" },
  { word: 'bird', emoji: '🐦', phonetic: 'bird', trivia: "Some seabirds can fly over the ocean for years without ever touching land!" },
  { word: 'frog', emoji: '🐸', phonetic: 'frog', trivia: "Frogs have been on Earth for over 250 million years — even before the dinosaurs!" },
  { word: 'star', emoji: '⭐', phonetic: 'star', trivia: "There are more stars in the universe than grains of sand on all of Earth's beaches!" },
  { word: 'rain', emoji: '🌧️', phonetic: 'rain', trivia: "All the rainwater on Earth originally comes from water that evaporated from the ocean!" },
  { word: 'moon', emoji: '🌙', phonetic: 'moon', trivia: "The Moon is so far away it would take about 3 days to fly there by rocket!" },
  { word: 'king', emoji: '👑', phonetic: 'king', trivia: "The anglerfish is called the king of the deep sea — it lives miles underwater with a glowing lure!" },
  { word: 'gold', emoji: '🪙', phonetic: 'gold', trivia: "There is real gold dissolved in the ocean — about 20 million tons of it!" },
];

const SEA_HARD: WordEntry[] = [
  { word: 'ocean', emoji: '🌊', phonetic: 'ocean', trivia: "The Pacific Ocean is so wide that all the world's continents could fit inside it!" },
  { word: 'coral', emoji: '🪸', phonetic: 'coral', trivia: "Coral looks like a plant but it's actually made of millions of tiny living animals!" },
  { word: 'pearl', emoji: '💎', phonetic: 'pearl', trivia: "Pearls form when a tiny grain of sand gets stuck inside an oyster shell and gets coated over time!" },
  { word: 'whale', emoji: '🐋', phonetic: 'whale', trivia: "Blue whales are the largest animals ever on Earth — their hearts are the size of a small car!" },
  { word: 'shark', emoji: '🦈', phonetic: 'shark', trivia: "Sharks have been swimming in the ocean for over 450 million years — older than trees!" },
  { word: 'shell', emoji: '🐚', phonetic: 'shell', trivia: "You can hear the ocean in a seashell because it echoes the sounds around you!" },
  { word: 'beach', emoji: '🏖️', phonetic: 'beach', trivia: "The world's longest beach stretches over 75 miles of sand in Australia!" },
  { word: 'coast', emoji: '🏝️', phonetic: 'coast', trivia: "If you stretched Norway's jagged coastline flat, it would reach halfway around the world!" },
  { word: 'storm', emoji: '⛈️', phonetic: 'storm', trivia: "A hurricane can release as much energy in one day as 10,000 nuclear bombs!" },
  { word: 'water', emoji: '💧', phonetic: 'water', trivia: "About 97% of Earth's water is in the salty oceans — only 3% is fresh drinkable water!" },
  { word: 'sword', emoji: '⚔️', phonetic: 'sword', trivia: "The swordfish can swim at speeds of up to 60 miles per hour — one of the fastest fish!" },
  { word: 'plank', emoji: '🪵', phonetic: 'plank', trivia: "In pirate stories, walking the plank meant being forced to walk off a board into the ocean!" },
  { word: 'fleet', emoji: '🚢', phonetic: 'fleet', trivia: "A fleet is a group of ships sailing together — like a whole family of boats!" },
  { word: 'crest', emoji: '🌊', phonetic: 'crest', trivia: "The crest is the very tip-top of an ocean wave just before it crashes back down!" },
  { word: 'spray', emoji: '💦', phonetic: 'spray', trivia: "Ocean spray is so salty that it can rust metal on ships and nearby buildings!" },
  { word: 'rocks', emoji: '🪨', phonetic: 'rocks', trivia: "Rocks on the ocean floor can be millions of years old — older than the dinosaurs!" },
  { word: 'trout', emoji: '🐟', phonetic: 'trout', trivia: "Trout can change color to blend in with the rocks and gravel on the river bottom!" },
  { word: 'prawn', emoji: '🦐', phonetic: 'prawn', trivia: "Prawns and shrimp look almost the same, but prawns have straighter, longer bodies!" },
  { word: 'squid', emoji: '🦑', phonetic: 'squid', trivia: "A giant squid's eyes can be as big as a dinner plate — the largest eyes on Earth!" },
  { word: 'crane', emoji: '🏗️', phonetic: 'crane', trivia: "Harbor cranes can lift objects as heavy as 100 elephants — and do it all day long!" },
];

// ─── SPELL REALM ───────────────────────────────────────────────────────────
const SPELL_EASY: WordEntry[] = [
  { word: 'owl', emoji: '🦉', phonetic: 'owl', trivia: "Owls can turn their heads almost all the way around — a whopping 270 degrees!" },
  { word: 'elf', emoji: '🧝', phonetic: 'elf', trivia: "In Norse mythology, elves were magical beings who lived in forests and enchanted hills." },
  { word: 'orb', emoji: '🔮', phonetic: 'orb', trivia: "Crystal orbs were used by fortune tellers to see magical visions of the future!" },
  { word: 'gem', emoji: '💎', phonetic: 'gem', trivia: "Diamonds — the hardest gemstones — are made of carbon squeezed deep underground for billions of years!" },
  { word: 'fog', emoji: '🌫️', phonetic: 'fog', trivia: "Fog is actually a cloud that forms right at ground level — you can walk right through it!" },
  { word: 'ivy', emoji: '🌿', phonetic: 'ivy', trivia: "Ivy can climb 100 feet tall and some varieties can grow several feet in just one year!" },
  { word: 'imp', emoji: '👿', phonetic: 'imp', trivia: "In old folktales, imps were mischievous little creatures who loved to play tricks on people!" },
  { word: 'ash', emoji: '🌑', phonetic: 'ash', trivia: "When volcanoes erupt, they can shoot ash clouds 12 miles up into the sky!" },
  { word: 'oak', emoji: '🌳', phonetic: 'oak', trivia: "Oak trees can live for over 1,000 years and grow as tall as a 10-story building!" },
  { word: 'bat', emoji: '🦇', phonetic: 'bat', trivia: "Bats are the only mammals that can truly fly, and most eat thousands of bugs each night!" },
  { word: 'hex', emoji: '🔮', phonetic: 'hex', trivia: "In witchcraft stories, a hex is a magic spell cast on someone to bring them bad luck!" },
  { word: 'yew', emoji: '🌲', phonetic: 'yew', trivia: "The yew tree is one of the oldest living things — some are 5,000 years old!" },
  { word: 'rod', emoji: '🪄', phonetic: 'rod', trivia: "Magic wands, or rods, appear in the stories of wizards and heroes in almost every culture!" },
  { word: 'wax', emoji: '🕯️', phonetic: 'wax', trivia: "Candle wax melts when heated and hardens again when cool — that's how candles keep their shape!" },
  { word: 'fly', emoji: '🪰', phonetic: 'fly', trivia: "Flies can taste with their feet — they know if food is good just by landing on it!" },
  { word: 'sky', emoji: '🌌', phonetic: 'sky', trivia: "The sky looks blue because air scatters blue light more than any other color!" },
  { word: 'fey', emoji: '🧚', phonetic: 'fey', trivia: "Fey creatures like fairies are said to live between our world and a secret magic realm!" },
  { word: 'elm', emoji: '🌳', phonetic: 'elm', trivia: "Elm trees have rough bumpy bark and were used to build boats for thousands of years!" },
  { word: 'cry', emoji: '😢', phonetic: 'cry', trivia: "Crying actually helps your body — tears wash away stress chemicals and help you feel better!" },
  { word: 'rye', emoji: '🌾', phonetic: 'rye', trivia: "Rye is a grain used to make dark bread and was one of the very first crops ever grown by humans!" },
];

const SPELL_MEDIUM: WordEntry[] = [
  { word: 'wand', emoji: '🪄', phonetic: 'wand', trivia: "In wizarding stories, each magic wand chooses its own owner — not the other way around!" },
  { word: 'rune', emoji: '🔣', phonetic: 'rune', trivia: "Runes are ancient letters carved into rocks by Viking warriors as powerful magical symbols!" },
  { word: 'mage', emoji: '🧙', phonetic: 'mage', trivia: "A mage is a powerful magic user who has studied spells for many, many years!" },
  { word: 'toad', emoji: '🐸', phonetic: 'toad', trivia: "Toads have bumpy skin that looks like warts — but don't worry, they can't give you warts!" },
  { word: 'brew', emoji: '🧪', phonetic: 'brew', trivia: "A magic brew is a potion made by mixing magical ingredients in a big bubbling cauldron!" },
  { word: 'glow', emoji: '✨', phonetic: 'glow', trivia: "Fireflies make their own light using a chemical reaction — they're nature's tiny flashlights!" },
  { word: 'dark', emoji: '🌑', phonetic: 'dark', trivia: "In outer space, it's completely dark because there's nothing for sunlight to bounce off!" },
  { word: 'moon', emoji: '🌙', phonetic: 'moon', trivia: "The Moon has no air or wind, so footprints left by astronauts will last millions of years!" },
  { word: 'wolf', emoji: '🐺', phonetic: 'wolf', trivia: "Wolves live in family groups called packs and howl to communicate across miles of forest!" },
  { word: 'cave', emoji: '🕌', phonetic: 'cave', trivia: "Some caves have underground lakes so deep and dark no sunlight has ever reached them!" },
  { word: 'book', emoji: '📚', phonetic: 'book', trivia: "The oldest printed book was made in China over 1,150 years ago using carved wooden blocks!" },
  { word: 'fire', emoji: '🔥', phonetic: 'fire', trivia: "Ancient humans first learned to control fire about 1 million years ago!" },
  { word: 'mist', emoji: '🌫️', phonetic: 'mist', trivia: "Morning mist disappears when the sun warms the air — the tiny water droplets evaporate!" },
  { word: 'vine', emoji: '🌿', phonetic: 'vine', trivia: "Some magical-looking vine plants can grow a whole foot in a single day!" },
  { word: 'gold', emoji: '🪙', phonetic: 'gold', trivia: "In ancient alchemy, wizards tried to turn ordinary metals into pure gold using secret magic!" },
  { word: 'bell', emoji: '🔔', phonetic: 'bell', trivia: "In medieval times, church bells were rung to warn villagers of danger or call them together!" },
  { word: 'vale', emoji: '🏔️', phonetic: 'vale', trivia: "A vale is a valley between hills — old stories say fairies dance in vales at night!" },
  { word: 'tome', emoji: '📖', phonetic: 'tome', trivia: "A tome is a very large, ancient book filled with rare knowledge and mysterious spells!" },
  { word: 'dusk', emoji: '🌆', phonetic: 'dusk', trivia: "Dusk is the magical time between day and night when the sky turns orange and purple!" },
  { word: 'lore', emoji: '📜', phonetic: 'lore', trivia: "Lore is a collection of old stories and knowledge passed down through many generations!" },
];

const SPELL_HARD: WordEntry[] = [
  { word: 'magic', emoji: '✨', phonetic: 'magic', trivia: "The word 'magic' comes from ancient Persia, where wise men called 'magi' performed amazing feats!" },
  { word: 'spell', emoji: '🪄', phonetic: 'spell', trivia: "In old English, 'spell' meant a spoken word — which is why we still spell out words today!" },
  { word: 'witch', emoji: '🧙‍♀️', phonetic: 'witch', trivia: "In many folktales, witches were actually healers and herbalists who knew plant medicine!" },
  { word: 'raven', emoji: '🐦‍⬛', phonetic: 'raven', trivia: "Ravens are one of the smartest birds — they can solve puzzles and recognize human faces!" },
  { word: 'flame', emoji: '🔥', phonetic: 'flame', trivia: "A candle flame burns at about 1,800 degrees Fahrenheit — hot enough to melt many metals!" },
  { word: 'frost', emoji: '❄️', phonetic: 'frost', trivia: "Frost forms when water vapor freezes directly on cold surfaces — with no liquid water in between!" },
  { word: 'storm', emoji: '⛈️', phonetic: 'storm', trivia: "A single thunderstorm can drop 125 million gallons of water in just 20 minutes!" },
  { word: 'brave', emoji: '🦁', phonetic: 'brave', trivia: "Lions represent bravery in stories from nearly every culture all around the world!" },
  { word: 'beast', emoji: '🐉', phonetic: 'beast', trivia: "Dragons appear in legends from China, Europe, and South America — every corner of the world!" },
  { word: 'charm', emoji: '💫', phonetic: 'charm', trivia: "Lucky charms have been worn as jewelry for over 75,000 years — they're the world's oldest accessories!" },
  { word: 'grace', emoji: '🌸', phonetic: 'grace', trivia: "Cherry blossoms symbolize grace and beauty in Japan, falling like soft pink snow each spring!" },
  { word: 'dwarf', emoji: '⛏️', phonetic: 'dwarf', trivia: "In Norse legends, dwarves were master craftsmen who forged magical weapons deep underground!" },
  { word: 'pixie', emoji: '🧚', phonetic: 'pixie', trivia: "Pixies from English folklore were said to lead travelers astray with magical glowing lights at night!" },
  { word: 'druid', emoji: '🌿', phonetic: 'druid', trivia: "Druids were ancient Celtic priests who worshipped in forests and knew the secrets of nature!" },
  { word: 'broom', emoji: '🧹', phonetic: 'broom', trivia: "Brooms have been symbols of witchcraft for over 600 years in European folktales!" },
  { word: 'gnome', emoji: '🍄', phonetic: 'gnome', trivia: "Gnomes are said to live underground guarding buried treasure and the roots of magical trees!" },
  { word: 'thorn', emoji: '🌹', phonetic: 'thorn', trivia: "Rosebushes use thorns as armor to protect their beautiful blooms from being eaten!" },
  { word: 'cloak', emoji: '🧥', phonetic: 'cloak', trivia: "Cloaks have been worn since ancient Rome to keep warm and show a person's rank or power!" },
  { word: 'stone', emoji: '🪨', phonetic: 'stone', trivia: "Some stones called lodestones are naturally magnetic — ancient people thought they were alive!" },
  { word: 'cloud', emoji: '☁️', phonetic: 'cloud', trivia: "A fluffy cloud weighs about 1 million pounds because it holds so many tiny water droplets!" },
];

// ─── STAR READER ───────────────────────────────────────────────────────────
const STAR_EASY: WordEntry[] = [
  { word: 'sun', emoji: '☀️', phonetic: 'sun', trivia: "The Sun is the closest star to Earth — its light reaches us in just 8 minutes!" },
  { word: 'sky', emoji: '🌌', phonetic: 'sky', trivia: "On a clear night far from city lights, you can see about 2,000 stars with just your eyes!" },
  { word: 'orb', emoji: '🔵', phonetic: 'orb', trivia: "All planets are shaped like orbs — spheres — because gravity pulls everything into a ball!" },
  { word: 'ray', emoji: '✨', phonetic: 'ray', trivia: "Sunrays travel 93 million miles through space to reach Earth and warm your face!" },
  { word: 'arc', emoji: '🌈', phonetic: 'arc', trivia: "A rainbow is an arc of colors formed when sunlight bends through water droplets in the air!" },
  { word: 'pod', emoji: '🚀', phonetic: 'pod', trivia: "Space pods are small vehicles used by astronauts to travel short distances in space!" },
  { word: 'hub', emoji: '🛸', phonetic: 'hub', trivia: "A space hub is the central part of a station where astronauts meet and supplies are kept!" },
  { word: 'gas', emoji: '💨', phonetic: 'gas', trivia: "Jupiter and Saturn are gas giants — enormous planets made almost entirely of swirling gas!" },
  { word: 'ion', emoji: '⚡', phonetic: 'ion', trivia: "Ion engines use electrically charged particles to push spacecraft through space very efficiently!" },
  { word: 'jet', emoji: '✈️', phonetic: 'jet', trivia: "A jet of hot gas from a rocket engine is what blasts a spacecraft into orbit!" },
  { word: 'dim', emoji: '💡', phonetic: 'dim', trivia: "The dimmest stars we can see are actually billions of miles farther away than bright ones!" },
  { word: 'lit', emoji: '🔦', phonetic: 'lit', trivia: "Stars are lit by nuclear reactions in their cores — burning for billions and billions of years!" },
  { word: 'red', emoji: '🔴', phonetic: 'red', trivia: "Red stars are cooler than blue stars — a star's color tells us exactly how hot it is!" },
  { word: 'hot', emoji: '🌡️', phonetic: 'hot', trivia: "The surface of the Sun is about 10,000°F — way hotter than the hottest oven at home!" },
  { word: 'icy', emoji: '🧊', phonetic: 'icy', trivia: "Some moons of Jupiter and Saturn have icy surfaces covering liquid water oceans underneath!" },
  { word: 'far', emoji: '🔭', phonetic: 'far', trivia: "The farthest galaxy ever seen is so far away, its light has been traveling for 13 billion years!" },
  { word: 'low', emoji: '📡', phonetic: 'low', trivia: "Low orbit is where the International Space Station flies — just 250 miles above Earth!" },
  { word: 'big', emoji: '🌟', phonetic: 'big', trivia: "The biggest star ever found is so large that 5 billion of our Suns could fit inside it!" },
  { word: 'old', emoji: '⏳', phonetic: 'old', trivia: "The oldest stars in the universe are about 13 billion years old — almost as old as the Big Bang!" },
  { word: 'fly', emoji: '🛸', phonetic: 'fly', trivia: "Spacecraft fly through space at over 17,000 miles per hour — much faster than any airplane!" },
];

const STAR_MEDIUM: WordEntry[] = [
  { word: 'star', emoji: '⭐', phonetic: 'star', trivia: "There are more stars in the universe than grains of sand on ALL of Earth's beaches combined!" },
  { word: 'moon', emoji: '🌙', phonetic: 'moon', trivia: "Earth's Moon is slowly moving away from us — about 1.5 inches farther every single year!" },
  { word: 'mars', emoji: '🔴', phonetic: 'mars', trivia: "Mars has the tallest volcano in our solar system — Olympus Mons is 3 times taller than Mount Everest!" },
  { word: 'nova', emoji: '💥', phonetic: 'nova', trivia: "When a star explodes, it creates a nova — a blast brighter than billions of suns put together!" },
  { word: 'dust', emoji: '✨', phonetic: 'dust', trivia: "Space is full of cosmic dust — tiny particles left over from stars that exploded long ago!" },
  { word: 'core', emoji: '⚙️', phonetic: 'core', trivia: "The core of the Earth is a ball of iron so hot it glows — about 10,800 degrees Fahrenheit!" },
  { word: 'ring', emoji: '🪐', phonetic: 'ring', trivia: "Saturn's rings are made of ice and rocks — 100,000 miles wide but only as thick as a building!" },
  { word: 'belt', emoji: '🌌', phonetic: 'belt', trivia: "The asteroid belt between Mars and Jupiter contains millions of space rocks orbiting the Sun!" },
  { word: 'beam', emoji: '🔦', phonetic: 'beam', trivia: "Light beams travel at 186,000 miles per second — the fastest thing in the entire universe!" },
  { word: 'void', emoji: '🌑', phonetic: 'void', trivia: "The void of space between stars is nearly perfectly empty — a billion times emptier than air!" },
  { word: 'dark', emoji: '🌑', phonetic: 'dark', trivia: "Dark matter makes up about 27% of the universe but is completely invisible to us!" },
  { word: 'glow', emoji: '🌟', phonetic: 'glow', trivia: "Nebulas glow with colorful light from gas heated by nearby stars — space's own fireworks!" },
  { word: 'halo', emoji: '💫', phonetic: 'halo', trivia: "Our galaxy has a halo of invisible dark matter surrounding it that holds everything together!" },
  { word: 'warp', emoji: '🌀', phonetic: 'warp', trivia: "Einstein showed that massive objects warp the fabric of space, bending light around them!" },
  { word: 'iron', emoji: '⚙️', phonetic: 'iron', trivia: "Iron is created deep in the hearts of massive stars before they explode as supernovas!" },
  { word: 'fire', emoji: '🔥', phonetic: 'fire', trivia: "The Sun burns not with fire but with nuclear fusion — smashing hydrogen atoms together!" },
  { word: 'rock', emoji: '🪨', phonetic: 'rock', trivia: "Rocky planets like Earth formed from dust and rocks that slowly clumped together over millions of years!" },
  { word: 'blue', emoji: '💙', phonetic: 'blue', trivia: "Blue stars are the hottest and most massive stars — they burn bright but have shorter lives!" },
  { word: 'zoom', emoji: '🚀', phonetic: 'zoom', trivia: "The New Horizons spacecraft zoomed past Pluto at over 30,000 miles per hour!" },
  { word: 'spin', emoji: '🌀', phonetic: 'spin', trivia: "Earth spins once every 24 hours — at the equator you're moving at 1,000 miles per hour!" },
];

const STAR_HARD: WordEntry[] = [
  { word: 'comet', emoji: '☄️', phonetic: 'comet', trivia: "Comets are dirty snowballs of ice and rock that glow with a bright tail when they fly near the Sun!" },
  { word: 'orbit', emoji: '🪐', phonetic: 'orbit', trivia: "Every planet, moon, and asteroid travels in an orbit — a curved path around a larger object!" },
  { word: 'lunar', emoji: '🌙', phonetic: 'lunar', trivia: "Lunar means anything to do with the Moon — a lunar eclipse is when Earth's shadow covers the Moon!" },
  { word: 'solar', emoji: '☀️', phonetic: 'solar', trivia: "Our solar system formed about 4.6 billion years ago from a giant spinning cloud of gas and dust!" },
  { word: 'probe', emoji: '🔭', phonetic: 'probe', trivia: "Space probes are robot spacecraft sent to explore planets, moons, and asteroids for us!" },
  { word: 'laser', emoji: '⚡', phonetic: 'laser', trivia: "Scientists use lasers to measure the exact distance to the Moon — accurate to within one inch!" },
  { word: 'radar', emoji: '📡', phonetic: 'radar', trivia: "Radar uses radio waves to detect distant objects and can even map entire planets from space!" },
  { word: 'titan', emoji: '🪐', phonetic: 'titan', trivia: "Titan is Saturn's largest moon and has lakes of liquid methane instead of water!" },
  { word: 'venus', emoji: '🌟', phonetic: 'venus', trivia: "Venus is the hottest planet at 900°F — even hotter than Mercury, which is closer to the Sun!" },
  { word: 'pluto', emoji: '🌑', phonetic: 'pluto', trivia: "Pluto was considered a planet until 2006 when scientists reclassified it as a dwarf planet!" },
  { word: 'alien', emoji: '👽', phonetic: 'alien', trivia: "Scientists think there could be simple life on other planets — we just haven't found it yet!" },
  { word: 'black', emoji: '🌑', phonetic: 'black', trivia: "A black hole is so incredibly dense that not even light can escape its powerful gravity!" },
  { word: 'globe', emoji: '🌍', phonetic: 'globe', trivia: "Earth is the only globe in our solar system known to have liquid water on its surface!" },
  { word: 'rings', emoji: '🪐', phonetic: 'rings', trivia: "All four giant planets have rings — Saturn has the most spectacular and beautiful ones!" },
  { word: 'stars', emoji: '⭐', phonetic: 'stars', trivia: "When you look at stars at night, you're seeing light that left them thousands of years ago!" },
  { word: 'moons', emoji: '🌙', phonetic: 'moons', trivia: "Jupiter has 95 known moons — more than any other planet in our entire solar system!" },
  { word: 'rocky', emoji: '🪨', phonetic: 'rocky', trivia: "Rocky planets like Earth have a solid surface, an iron core, and a thin outer crust!" },
  { word: 'light', emoji: '💡', phonetic: 'light', trivia: "Light from the Sun takes 8 minutes to reach Earth, but 4 years to reach the next nearest star!" },
  { word: 'space', emoji: '🚀', phonetic: 'space', trivia: "Space officially begins 62 miles above Earth's surface — a boundary called the Kármán line!" },
  { word: 'ozone', emoji: '🌎', phonetic: 'ozone', trivia: "The ozone layer protects all life on Earth by absorbing harmful ultraviolet rays from the Sun!" },
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
