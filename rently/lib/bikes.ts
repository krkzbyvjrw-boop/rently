export const BIKE_TAGS = ['City bike', 'Mountain bike', 'Electric', 'Kids', 'Cargo'] as const

export const TAG_EMOJI: Record<string, string> = {
  'City bike': '🚲',
  'Mountain bike': '🚵',
  Electric: '⚡',
  Kids: '🛵',
  Cargo: '📦',
}

const EMOJI_PRIORITY = ['Electric', 'Kids', 'Cargo', 'Mountain bike', 'City bike']

export function bikeEmoji(tags?: string[], legacyType?: string): string {
  const list = tags?.length ? tags : legacyType ? [legacyType] : []
  for (const tag of EMOJI_PRIORITY) {
    if (list.includes(tag)) return TAG_EMOJI[tag]
  }
  return '🚲'
}

export function normalizeTags(bike: { tags?: string[]; type?: string }): string[] {
  if (bike.tags?.length) return bike.tags
  if (bike.type) return [bike.type]
  return []
}

export const defaultBikes = [
  {
    id: 1,
    name: 'Trek FX3 City Cruiser',
    owner: 'Tomas K.',
    initials: 'TK',
    city: 'Vilnius',
    location: 'Old Town',
    price: 8,
    tags: ['City bike'],
    desc: 'Lightweight aluminium frame, 7-speed Shimano gears. Helmet and lock included. Pick up in person.',
    features: ['Helmet included', 'Lock included', '7-speed'],
  },
  {
    id: 2,
    name: 'Giant Talon Mountain',
    owner: 'Rasa M.',
    initials: 'RM',
    city: 'Vilnius',
    location: 'Žirmūnai',
    price: 12,
    tags: ['Mountain bike'],
    desc: 'Full suspension mountain bike, great for trails and forest paths. Gloves included.',
    features: ['Gloves included', 'Full suspension', '21-speed'],
  },
  {
    id: 3,
    name: 'Cube Kathmandu E-bike',
    owner: 'Jonas D.',
    initials: 'JD',
    city: 'Panevėžys',
    location: 'Centre',
    price: 18,
    tags: ['Electric', 'City bike'],
    desc: 'Electric bike with 70km range per charge. Perfect for longer rides around the city.',
    features: ['70km range', 'Charger included'],
  },
  {
    id: 4,
    name: 'Puky Kids Bike',
    owner: 'Aistė V.',
    initials: 'AV',
    city: 'Vilnius',
    location: 'Antakalnis',
    price: 5,
    tags: ['Kids'],
    desc: 'Perfect kids bike for ages 4-7. Very safe, with stabilisers available on request.',
    features: ['Ages 4-7', 'Stabilisers available', 'Helmet included'],
  },
  {
    id: 5,
    name: 'Specialized Sirrus',
    owner: 'Mantas P.',
    initials: 'MP',
    city: 'Kaunas',
    location: 'Centre',
    price: 10,
    tags: ['City bike'],
    desc: 'Fast and light city bike. Great for commuting or exploring the city.',
    features: ['Lightweight', 'Lock included', '8-speed'],
  },
  {
    id: 6,
    name: 'Scott Aspect Mountain',
    owner: 'Eglė S.',
    initials: 'ES',
    city: 'Šiauliai',
    location: 'Centre',
    price: 14,
    tags: ['Mountain bike'],
    desc: 'Sturdy mountain bike for off-road adventures. Front suspension, disc brakes.',
    features: ['Disc brakes', 'Front suspension', '24-speed'],
  },
  {
    id: 7,
    name: 'Cannondale Quick City',
    owner: 'Lukas B.',
    initials: 'LB',
    city: 'Kaunas',
    location: 'Aleksotas',
    price: 9,
    tags: ['City bike'],
    desc: 'Lightweight city bike, perfect for daily commuting.',
    features: ['Lightweight', '7-speed', 'Lock included'],
  },
  {
    id: 8,
    name: 'Bosch E-bike Pro',
    owner: 'Indrė T.',
    initials: 'IT',
    city: 'Vilnius',
    location: 'Lazdynai',
    price: 20,
    tags: ['Electric', 'City bike'],
    desc: 'Premium e-bike with Bosch motor. Range up to 100km. Very comfortable.',
    features: ['100km range', 'Bosch motor', 'Charger included'],
  },
  {
    id: 9,
    name: 'Trek Marlin Mountain',
    owner: 'Artūras K.',
    initials: 'AK',
    city: 'Klaipėda',
    location: 'Centre',
    price: 13,
    tags: ['Mountain bike'],
    desc: 'Great entry level mountain bike. Good for forest trails and gravel paths.',
    features: ['21-speed', 'Front suspension', 'Lock included'],
  },
  {
    id: 10,
    name: 'Cargo Family Bike',
    owner: 'Simona R.',
    initials: 'SR',
    city: 'Vilnius',
    location: 'Naujamiestis',
    price: 15,
    tags: ['Cargo'],
    desc: 'Large cargo bike perfect for carrying kids or shopping. Very stable.',
    features: ['Kids seats available', 'Large cargo', 'Easy to ride'],
  },
  {
    id: 11,
    name: 'Kids Balance Bike',
    owner: 'Paulius M.',
    initials: 'PM',
    city: 'Kaunas',
    location: 'Šilainiai',
    price: 4,
    tags: ['Kids'],
    desc: 'Balance bike for toddlers age 2-4. Lightweight and easy to handle.',
    features: ['Ages 2-4', 'Lightweight', 'No pedals'],
  },
  {
    id: 12,
    name: 'Giant Escape City',
    owner: 'Viktorija L.',
    initials: 'VL',
    city: 'Klaipėda',
    location: 'Smiltynė',
    price: 11,
    tags: ['City bike'],
    desc: 'Perfect city bike for coastal rides. Comfortable and fast.',
    features: ['8-speed', 'Lightweight', 'Helmet included'],
  },
  {
    id: 13,
    name: 'Specialized Turbo E-bike',
    owner: 'Darius N.',
    initials: 'DN',
    city: 'Panevėžys',
    location: 'Senvagė',
    price: 22,
    tags: ['Electric', 'City bike'],
    desc: 'High-end e-bike with turbo mode. Great for longer commutes.',
    features: ['Turbo mode', '80km range', 'Charger included'],
  },
  {
    id: 14,
    name: 'Scott Scale Mountain',
    owner: 'Gabija P.',
    initials: 'GP',
    city: 'Šiauliai',
    location: 'Gubernija',
    price: 16,
    tags: ['Mountain bike'],
    desc: 'Lightweight mountain bike for serious trail riding.',
    features: ['Disc brakes', '24-speed', 'Lightweight'],
  },
  {
    id: 15,
    name: 'Urban Arrow Cargo',
    owner: 'Tadas V.',
    initials: 'TV',
    city: 'Vilnius',
    location: 'Užupis',
    price: 17,
    tags: ['Cargo', 'Electric'],
    desc: 'Electric cargo bike. Carries up to 100kg. Great for deliveries or family trips.',
    features: ['Electric assist', '100kg capacity', 'Weatherproof box'],
  },
]

export function getBike(
  id: number,
  userListings: { id: number; description?: string; features?: string[]; tags?: string[]; type?: string }[] = []
) {
  const fromDefaults = defaultBikes.find(b => b.id === id)
  if (fromDefaults) return fromDefaults
  const userBike = userListings.find(b => b.id === id)
  if (!userBike) return undefined
  return {
    ...userBike,
    tags: normalizeTags(userBike),
    desc: userBike.description || 'No description.',
    features: userBike.features || [],
  }
}

export function matchesTagFilter(bikeTags: string[], selected: string[]) {
  if (selected.length === 0) return true
  return selected.some(tag => bikeTags.includes(tag))
}
