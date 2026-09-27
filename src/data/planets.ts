export interface PlanetData {
  id: string;
  name: string;
  type: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Natural Satellite';
  tagline: string;
  description: string;
  distanceFromSun: string;
  distanceFromSunKm: number; // in million km
  diameter: string;
  diameterKm: number;
  mass: string;
  massKg: string;
  gravity: string;
  gravityVal: number; // m/s²
  dayLength: string;
  yearLength: string;
  yearLengthDays: number;
  temperature: string;
  avgTempC: number;
  moons: number;
  atmosphere: string[];
  composition: string;
  color: string;
  secondaryColor?: string;
  emissiveColor?: string;
  interestingFact: string;
  educationalFacts: string[];
  sizeRatioToEarth: number;
  gravityRatioToEarth: number;
  orbitRadius: number; // 3D visualization units
  visualRadius: number; // 3D sphere radius
  orbitSpeed: number; // visual angular speed factor
  rotationSpeed: number; // visual spin factor
  tiltDeg: number; // axial tilt
  hasRings?: boolean;
  hasClouds?: boolean;
  parentBodyId?: string; // e.g. for moon, 'earth'
  imageUrl?: string;
  orbitalPeriodText: string;
  surfaceFeatures: string;
}

export const PLANETS_DATA: Record<string, PlanetData> = {
  sun: {
    id: 'sun',
    name: 'Sun',
    type: 'Star',
    tagline: 'The glowing nuclear heart of our planetary system',
    description: 'The Sun contains 99.86% of the mass in the solar system. A yellow dwarf star (G2V), it produces immense energy through nuclear fusion of hydrogen into helium at its 15 million Kelvin core.',
    distanceFromSun: '0 km (Center)',
    distanceFromSunKm: 0,
    diameter: '1,392,700 km',
    diameterKm: 1392700,
    mass: '1.989 × 10³⁰ kg',
    massKg: '1.989 × 10³⁰ kg',
    gravity: '274.0 m/s²',
    gravityVal: 274.0,
    dayLength: '27 Earth days (differential)',
    yearLength: '230 million years (Galactic orbit)',
    yearLengthDays: 84000000000,
    temperature: '5,500°C (Surface) / 15M°C (Core)',
    avgTempC: 5500,
    moons: 0,
    atmosphere: ['Hydrogen 73.4%', 'Helium 24.8%', 'Oxygen 0.77%', 'Carbon 0.29%'],
    composition: 'Plasma undergoing thermonuclear fusion in the core, surrounded by radiative and convective zones.',
    color: '#ffaa00',
    secondaryColor: '#ff4500',
    emissiveColor: '#ffdd44',
    interestingFact: 'About 1.3 million Earths could fit inside the Sun, and light from its surface takes approximately 8 minutes and 20 seconds to reach Earth.',
    educationalFacts: [
      'The Sun converts roughly 600 million tons of hydrogen into helium every second.',
      'Solar wind from coronal holes generates auroras in the atmospheres of planets with magnetic fields.',
      'The solar atmosphere consists of the photosphere, chromosphere, transition region, and corona.'
    ],
    sizeRatioToEarth: 109.2,
    gravityRatioToEarth: 27.9,
    orbitRadius: 0,
    visualRadius: 5.5,
    orbitSpeed: 0,
    rotationSpeed: 0.002,
    tiltDeg: 7.25,
    orbitalPeriodText: 'Stationary barycenter of planetary orbits',
    surfaceFeatures: 'Dynamic granulation cells, solar flares, prominences, and sunspots.'
  },
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    type: 'Terrestrial Planet',
    tagline: 'The sun-scorched, cratered sentinel of the inner system',
    description: 'Mercury is the smallest planet and closest to the Sun. With almost no atmosphere to trap heat, it endures the most extreme temperature swings in the solar system, from scorching daytime heat to frigid nighttime frost.',
    distanceFromSun: '57.9 million km (0.39 AU)',
    distanceFromSunKm: 57.9,
    diameter: '4,879 km',
    diameterKm: 4879,
    mass: '3.301 × 10²³ kg',
    massKg: '3.301 × 10²³ kg',
    gravity: '3.7 m/s²',
    gravityVal: 3.7,
    dayLength: '58.6 Earth days',
    yearLength: '88 Earth days',
    yearLengthDays: 88,
    temperature: '-180°C to 430°C',
    avgTempC: 167,
    moons: 0,
    atmosphere: ['Oxygen 42%', 'Sodium 29%', 'Hydrogen 22%', 'Helium 6% (Exosphere)'],
    composition: 'Disproportionately large metallic iron-nickel core occupying ~85% of planetary radius, with silicate crust.',
    color: '#9e9fa5',
    secondaryColor: '#6c6d73',
    interestingFact: 'Despite being closest to the Sun, water ice exists permanently inside deep craters at Mercury’s shadowed poles.',
    educationalFacts: [
      'Mercury has a 3:2 spin-orbit resonance, rotating three times for every two orbits around the Sun.',
      'It has no active atmosphere, only a fragile exosphere stripped by intense solar winds.',
      'Its immense iron core generates a global magnetic field roughly 1% as strong as Earth’s.'
    ],
    sizeRatioToEarth: 0.383,
    gravityRatioToEarth: 0.38,
    orbitRadius: 10,
    visualRadius: 0.8,
    orbitSpeed: 0.04,
    rotationSpeed: 0.004,
    tiltDeg: 0.034,
    orbitalPeriodText: '88 Earth days (fastest orbit)',
    surfaceFeatures: 'Caloris Basin impact crater, wrinkle ridges (rupes), and impact melt plains.'
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    type: 'Terrestrial Planet',
    tagline: 'A toxic, volcanic inferno shrouded in sulfuric clouds',
    description: 'Venus is Earth’s "evil twin," similar in size and rocky density but suffocated by a crushing runaway greenhouse atmosphere of carbon dioxide and clouds of sulfuric acid, making it hotter even than Mercury.',
    distanceFromSun: '108.2 million km (0.72 AU)',
    distanceFromSunKm: 108.2,
    diameter: '12,104 km',
    diameterKm: 12104,
    mass: '4.867 × 10²⁴ kg',
    massKg: '4.867 × 10²⁴ kg',
    gravity: '8.87 m/s²',
    gravityVal: 8.87,
    dayLength: '243 Earth days (Retrograde)',
    yearLength: '224.7 Earth days',
    yearLengthDays: 224.7,
    temperature: '464°C (uniform)',
    avgTempC: 464,
    moons: 0,
    atmosphere: ['Carbon Dioxide 96.5%', 'Nitrogen 3.5%', 'Sulfur Dioxide 0.015%'],
    composition: 'Central metallic core, rocky silicate mantle, and basaltic crust reshaped by thousands of volcanoes.',
    color: '#e3bb76',
    secondaryColor: '#c48f43',
    interestingFact: 'Venus rotates backwards compared to most planets, and its day (243 Earth days) is actually longer than its year (225 Earth days)!',
    educationalFacts: [
      'Surface atmospheric pressure on Venus is 92 times greater than Earth’s, equivalent to 900 meters underwater.',
      'Upper atmosphere super-rotates around the planet every four Earth days, driven by gale-force winds exceeding 360 km/h.',
      'Radar mapping by Magellan revealed vast volcanic plains and bizarre pancake-shaped volcanic domes.'
    ],
    sizeRatioToEarth: 0.949,
    gravityRatioToEarth: 0.90,
    orbitRadius: 15,
    visualRadius: 1.35,
    orbitSpeed: 0.025,
    rotationSpeed: -0.002, // retrograde
    tiltDeg: 177.3,
    orbitalPeriodText: '224.7 Earth days',
    surfaceFeatures: 'Maxwell Montes mountain range, Aphrodite Terra highland, and volcanic corona structures.'
  },
  earth: {
    id: 'earth',
    name: 'Earth',
    type: 'Terrestrial Planet',
    tagline: 'The vibrant blue marble of liquid oceans and living biosphere',
    description: 'Earth is our home oasis—the only world known to harbor liquid water on its surface and sustain carbon-based life. It features active plate tectonics, a protective magnetosphere, and a dynamic oxygen-nitrogen atmosphere.',
    distanceFromSun: '149.6 million km (1.00 AU)',
    distanceFromSunKm: 149.6,
    diameter: '12,742 km',
    diameterKm: 12742,
    mass: '5.972 × 10²⁴ kg',
    massKg: '5.972 × 10²⁴ kg',
    gravity: '9.807 m/s²',
    gravityVal: 9.807,
    dayLength: '23 hours 56 minutes',
    yearLength: '365.25 days',
    yearLengthDays: 365.25,
    temperature: '15°C (average)',
    avgTempC: 15,
    moons: 1,
    atmosphere: ['Nitrogen 78.08%', 'Oxygen 20.95%', 'Argon 0.93%', 'Carbon Dioxide 0.04%'],
    composition: 'Dense inner solid iron core, outer molten iron core generating magnetic dynamo, silicate mantle, oceanic/continental crust.',
    color: '#2b82c9',
    secondaryColor: '#3a9d5d',
    interestingFact: 'Earth is the densest major body in the solar system (5.51 g/cm³) and the only planet where water coexists in solid, liquid, and gas phases.',
    educationalFacts: [
      'The protective ozone layer absorbs hazardous ultraviolet radiation from the Sun.',
      'Earth’s axial tilt of 23.4° produces our annual cycle of temperate seasons.',
      'Liquid iron convection in the outer core generates the geomagnetosphere, shielding us from cosmic rays.'
    ],
    sizeRatioToEarth: 1.0,
    gravityRatioToEarth: 1.0,
    orbitRadius: 21,
    visualRadius: 1.45,
    orbitSpeed: 0.018,
    rotationSpeed: 0.015,
    tiltDeg: 23.44,
    hasClouds: true,
    imageUrl: '/src/assets/images/planet_earth_space_view_1790425438880.jpg',
    orbitalPeriodText: '365.25 Earth days (1 Astronomical Year)',
    surfaceFeatures: '71% liquid hydrosphere oceans, seven major tectonic continents, ice caps, and mountain ranges.'
  },
  moon: {
    id: 'moon',
    name: 'Moon',
    type: 'Natural Satellite',
    tagline: 'Earth’s tidal companion and human spaceflight stepping stone',
    description: 'Earth’s Moon is the fifth-largest natural satellite in the solar system. Formed roughly 4.5 billion years ago likely from a giant impact between proto-Earth and a Mars-sized body (Theia), it stabilizes Earth’s axial wobble.',
    distanceFromSun: '149.6 million km (384,400 km from Earth)',
    distanceFromSunKm: 149.6,
    diameter: '3,474 km',
    diameterKm: 3474,
    mass: '7.342 × 10²² kg',
    massKg: '7.342 × 10²² kg',
    gravity: '1.62 m/s²',
    gravityVal: 1.62,
    dayLength: '27.3 Earth days (Tidally locked)',
    yearLength: '27.3 days (Earth orbit)',
    yearLengthDays: 27.3,
    temperature: '-130°C to 120°C',
    avgTempC: -20,
    moons: 0,
    atmosphere: ['Trace exosphere (Helium, Neon, Hydrogen)'],
    composition: 'Silicate crust rich in anorthosite and basalt, rigid lithospheric mantle, and small metallic iron core.',
    color: '#b0b3b8',
    secondaryColor: '#787a7f',
    interestingFact: 'The Moon is tidally locked to Earth, meaning it rotates once on its axis in the exact same time it takes to orbit Earth, keeping the same face permanently toward us.',
    educationalFacts: [
      'The gravitational pull of the Moon creates ocean tides and slows Earth’s rotation by ~1.7 milliseconds per century.',
      'Dark lunar plains called "maria" were formed by ancient volcanic basalt flooding huge impact basins.',
      'Twelve humans walked on the Moon during the NASA Apollo program between 1969 and 1972.'
    ],
    sizeRatioToEarth: 0.272,
    gravityRatioToEarth: 0.165,
    orbitRadius: 2.8, // relative to Earth
    visualRadius: 0.42,
    orbitSpeed: 0.06,
    rotationSpeed: 0.005,
    tiltDeg: 6.68,
    parentBodyId: 'earth',
    orbitalPeriodText: '27.3 Earth days (around Earth)',
    surfaceFeatures: 'Tycho crater ray system, Sea of Tranquility, lunar highlands, and regolith dust layer.'
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    type: 'Terrestrial Planet',
    tagline: 'The rusty desert frontier of towering volcanoes and ancient riverbeds',
    description: 'Mars is the Red Planet, colored by pervasive iron oxide (rust) across its arid crust. It hosts the tallest volcano and deepest canyon system in the solar system, with water ice locked in its polar caps and sub-surface glaciers.',
    distanceFromSun: '227.9 million km (1.52 AU)',
    distanceFromSunKm: 227.9,
    diameter: '6,779 km',
    diameterKm: 6779,
    mass: '6.417 × 10²³ kg',
    massKg: '6.417 × 10²³ kg',
    gravity: '3.72 m/s²',
    gravityVal: 3.72,
    dayLength: '24 hours 37 minutes',
    yearLength: '687 Earth days',
    yearLengthDays: 687,
    temperature: '-65°C (average), -140°C to 20°C',
    avgTempC: -65,
    moons: 2, // Phobos & Deimos
    atmosphere: ['Carbon Dioxide 95.3%', 'Nitrogen 2.6%', 'Argon 1.9%', 'Oxygen 0.16%'],
    composition: 'Sulfur-rich iron core, silicate mantle, and basaltic crust enriched with iron oxide dust.',
    color: '#d6603a',
    secondaryColor: '#8a3418',
    interestingFact: 'Olympus Mons on Mars is the largest shield volcano in the solar system, standing 22 km (72,000 ft) high—nearly three times taller than Mount Everest!',
    educationalFacts: [
      'Valles Marineris is a colossal canyon system stretching over 4,000 km, ten times longer than the Grand Canyon.',
      'Rovers like Curiosity and Perseverance have found definitive evidence of ancient freshwater lakes and river deltas.',
      'Mars has two tiny captured asteroid moons named Phobos (fear) and Deimos (dread).'
    ],
    sizeRatioToEarth: 0.532,
    gravityRatioToEarth: 0.38,
    orbitRadius: 28,
    visualRadius: 1.05,
    orbitSpeed: 0.012,
    rotationSpeed: 0.014,
    tiltDeg: 25.19,
    orbitalPeriodText: '687 Earth days (1.88 Earth years)',
    surfaceFeatures: 'Olympus Mons, Valles Marineris canyon, polar carbon dioxide/water ice caps, and dried river networks.'
  },
  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Gas Giant',
    tagline: 'The colossal king of planets with ancient swirling storms',
    description: 'Jupiter is the undisputed giant of our solar system, with more than twice the mass of all other planets combined. Made primarily of hydrogen and helium, its mesmerizing colorful belts and the centuries-old Great Red Spot dominate its atmosphere.',
    distanceFromSun: '778.5 million km (5.20 AU)',
    distanceFromSunKm: 778.5,
    diameter: '139,820 km',
    diameterKm: 139820,
    mass: '1.898 × 10²⁷ kg',
    massKg: '1.898 × 10²⁷ kg',
    gravity: '24.79 m/s²',
    gravityVal: 24.79,
    dayLength: '9 hours 55 minutes',
    yearLength: '11.86 Earth years',
    yearLengthDays: 4333,
    temperature: '-110°C (cloud tops)',
    avgTempC: -110,
    moons: 95,
    atmosphere: ['Hydrogen 89.8%', 'Helium 10.2%', 'Methane 0.3%', 'Ammonia 0.026%'],
    composition: 'Dense diffuse rocky/metallic core, wrapped in liquid metallic hydrogen mantle conducting massive magnetic fields.',
    color: '#c99065',
    secondaryColor: '#a66738',
    interestingFact: 'The Great Red Spot is a persistent anticyclonic storm larger than the entire Earth, raging for at least 350 years.',
    educationalFacts: [
      'Jupiter rotates faster than any other planet, completing a full axial day in under 10 hours.',
      'Its four large Galilean moons (Io, Europa, Ganymede, and Callisto) were discovered by Galileo Galilei in 1610.',
      'Europa harbors a deep sub-surface liquid saltwater ocean beneath its icy crust that may hold twice Earth’s water.'
    ],
    sizeRatioToEarth: 10.97,
    gravityRatioToEarth: 2.53,
    orbitRadius: 38,
    visualRadius: 3.2,
    orbitSpeed: 0.007,
    rotationSpeed: 0.03,
    tiltDeg: 3.13,
    imageUrl: '/src/assets/images/planet_jupiter_red_spot_1790425456552.jpg',
    orbitalPeriodText: '11.86 Earth years',
    surfaceFeatures: 'Alternating light zones and dark belts, Great Red Spot anticyclone, and polar cyclonic clusters.'
  },
  saturn: {
    id: 'saturn',
    name: 'Saturn',
    type: 'Gas Giant',
    tagline: 'The magnificent jewel of breathtaking cosmic ring arcs',
    description: 'Saturn is world-renowned for its dazzling, intricate ring system made of billions of chunks of water ice and rock. Like Jupiter, it is a vast gas giant, but possesses the lowest average density of any planet—low enough to float on water.',
    distanceFromSun: '1.434 billion km (9.58 AU)',
    distanceFromSunKm: 1434,
    diameter: '116,460 km',
    diameterKm: 116460,
    mass: '5.683 × 10²⁶ kg',
    massKg: '5.683 × 10²⁶ kg',
    gravity: '10.44 m/s²',
    gravityVal: 10.44,
    dayLength: '10 hours 33 minutes',
    yearLength: '29.45 Earth years',
    yearLengthDays: 10759,
    temperature: '-140°C (cloud tops)',
    avgTempC: -140,
    moons: 146,
    atmosphere: ['Hydrogen 96.3%', 'Helium 3.25%', 'Methane 0.45%', 'Ammonia 0.01%'],
    composition: 'Dense core of rock and volatile ice, surrounded by metallic hydrogen and molecular hydrogen atmosphere.',
    color: '#e2bf7d',
    secondaryColor: '#c8a45e',
    hasRings: true,
    interestingFact: 'Saturn’s rings span up to 282,000 km across, yet are astonishingly razor-thin—averaging merely 10 to 30 meters thick!',
    educationalFacts: [
      'Saturn is the only planet in the solar system whose average density (0.687 g/cm³) is less than liquid water.',
      'Its moon Titan possesses a dense nitrogen atmosphere and liquid methane/ethane lakes on its surface.',
      'A mysterious hexagonal jet stream pattern circulates continuously around Saturn’s north pole.'
    ],
    sizeRatioToEarth: 9.14,
    gravityRatioToEarth: 1.06,
    orbitRadius: 49,
    visualRadius: 2.7,
    orbitSpeed: 0.005,
    rotationSpeed: 0.026,
    tiltDeg: 26.73,
    imageUrl: '/src/assets/images/planet_saturn_rings_majestic_1790425471728.jpg',
    orbitalPeriodText: '29.45 Earth years',
    surfaceFeatures: 'Spectacular A, B, and C ring systems with Cassini division, and polar atmospheric hexagon.'
  },
  uranus: {
    id: 'uranus',
    name: 'Uranus',
    type: 'Ice Giant',
    tagline: 'The tilted cyan world of icy mantles and retrograde rolling orbit',
    description: 'Uranus is an ice giant tipped on its side with an extreme 97.8° axial tilt, likely caused by a titanic collision long ago. Its pale aquamarine color comes from atmospheric methane absorbing red light.',
    distanceFromSun: '2.871 billion km (19.22 AU)',
    distanceFromSunKm: 2871,
    diameter: '50,724 km',
    diameterKm: 50724,
    mass: '8.681 × 10²⁵ kg',
    massKg: '8.681 × 10²⁵ kg',
    gravity: '8.69 m/s²',
    gravityVal: 8.69,
    dayLength: '17 hours 14 minutes (Retrograde)',
    yearLength: '84.01 Earth years',
    yearLengthDays: 30685,
    temperature: '-195°C (coldest planetary atmosphere: -224°C)',
    avgTempC: -195,
    moons: 28,
    atmosphere: ['Hydrogen 82.5%', 'Helium 15.2%', 'Methane 2.3%'],
    composition: 'Small silicate core beneath a deep mantle of supercritical water, ammonia, and methane "ices", surrounded by gas envelope.',
    color: '#82d3e5',
    secondaryColor: '#4ea8bd',
    interestingFact: 'Because Uranus rotates on its side, its north and south poles each experience 42 years of continuous sunlight followed by 42 years of dark winter.',
    educationalFacts: [
      'Uranus was the first planet discovered using an astronomical telescope, by William Herschel in 1781.',
      'It has 13 faint, dark planetary rings made of organic-coated water ice particles.',
      'Unlike other planets, Uranus radiates almost no excess heat from its interior into space.'
    ],
    sizeRatioToEarth: 3.98,
    gravityRatioToEarth: 0.89,
    orbitRadius: 59,
    visualRadius: 1.9,
    orbitSpeed: 0.003,
    rotationSpeed: -0.015,
    tiltDeg: 97.77,
    orbitalPeriodText: '84.01 Earth years',
    surfaceFeatures: 'Subtle pale cyan banded clouds, faint dark ring arclets, and tilted magnetic dipole.'
  },
  neptune: {
    id: 'neptune',
    name: 'Neptune',
    type: 'Ice Giant',
    tagline: 'The remote supersonic wind world of deep azure blue',
    description: 'Neptune is the most distant major planet from the Sun. A vivid deep blue ice giant, it hosts the most violent supersonic winds in the solar system, reaching over 2,100 km/h, and dynamic transient dark storm systems.',
    distanceFromSun: '4.495 billion km (30.05 AU)',
    distanceFromSunKm: 4495,
    diameter: '49,244 km',
    diameterKm: 49244,
    mass: '1.024 × 10²⁶ kg',
    massKg: '1.024 × 10²⁶ kg',
    gravity: '11.15 m/s²',
    gravityVal: 11.15,
    dayLength: '16 hours 6 minutes',
    yearLength: '164.8 Earth years',
    yearLengthDays: 60190,
    temperature: '-201°C',
    avgTempC: -201,
    moons: 16,
    atmosphere: ['Hydrogen 80%', 'Helium 19%', 'Methane 1.5%'],
    composition: 'Rocky core surrounded by thick slushy mantle of water, methane, and ammonia ices, capped by hydrogen-helium atmosphere.',
    color: '#3457db',
    secondaryColor: '#1d3299',
    interestingFact: 'Neptune was discovered through mathematical calculation rather than direct observation, after anomalies were noted in Uranus’s orbit.',
    educationalFacts: [
      'Winds on Neptune whip through the atmosphere at supersonic speeds exceeding 2,100 km/h (1,300 mph).',
      'Its largest moon Triton orbits backwards (retrograde) and features active cryogeysers erupting liquid nitrogen.',
      'Neptune has completed only one full orbit around the Sun since its discovery in 1846.'
    ],
    sizeRatioToEarth: 3.86,
    gravityRatioToEarth: 1.14,
    orbitRadius: 69,
    visualRadius: 1.85,
    orbitSpeed: 0.002,
    rotationSpeed: 0.016,
    tiltDeg: 28.32,
    orbitalPeriodText: '164.8 Earth years',
    surfaceFeatures: 'Great Dark Spot cyclonic storms, high-altitude white cirrus methane clouds (Scooter), and cryo-volcanic moons.'
  }
};

export const PLANETS_LIST: PlanetData[] = [
  PLANETS_DATA.sun,
  PLANETS_DATA.mercury,
  PLANETS_DATA.venus,
  PLANETS_DATA.earth,
  PLANETS_DATA.moon,
  PLANETS_DATA.mars,
  PLANETS_DATA.jupiter,
  PLANETS_DATA.saturn,
  PLANETS_DATA.uranus,
  PLANETS_DATA.neptune
];

export const MAJOR_PLANETS_LIST: PlanetData[] = [
  PLANETS_DATA.mercury,
  PLANETS_DATA.venus,
  PLANETS_DATA.earth,
  PLANETS_DATA.mars,
  PLANETS_DATA.jupiter,
  PLANETS_DATA.saturn,
  PLANETS_DATA.uranus,
  PLANETS_DATA.neptune
];

export interface CosmicFact {
  id: number;
  title: string;
  fact: string;
  category: string;
  source: string;
}

export const COSMIC_FACTS: CosmicFact[] = [
  {
    id: 1,
    title: 'The Great Red Spot',
    fact: 'Jupiter’s iconic Great Red Spot is a high-pressure storm larger than planet Earth that has been continually observed spinning for over 350 years.',
    category: 'Storms & Weather',
    source: 'NASA Juno Mission'
  },
  {
    id: 2,
    title: 'Supersonic Neptune Winds',
    fact: 'Neptune experiences the most violent atmospheric wind speeds in the entire solar system, clocking in at supersonic speeds over 2,100 km/h (1,300 mph).',
    category: 'Planetary Atmospheres',
    source: 'Voyager 2 Telemetry'
  },
  {
    id: 3,
    title: 'Razor-Thin Saturnian Rings',
    fact: 'While Saturn’s rings span an awe-inspiring 282,000 kilometers across, they are remarkably paper-thin—typically measuring only 10 to 30 meters in vertical thickness.',
    category: 'Orbital Mechanics',
    source: 'Cassini-Huygens Mission'
  },
  {
    id: 4,
    title: 'A Mountain Three Times Everest',
    fact: 'Olympus Mons on Mars is a massive shield volcano standing 22 kilometers (72,000 feet) high, dwarfing Earth’s Mount Everest by nearly three to one.',
    category: 'Geology',
    source: 'Mars Global Surveyor'
  },
  {
    id: 5,
    title: 'The Backward Rolling Giant',
    fact: 'Uranus is unique with an axial tilt of 97.8 degrees, meaning it rotates almost completely on its side, rolling like a giant cosmic bowling ball around the Sun.',
    category: 'Rotational Dynamics',
    source: 'Hubble Space Telescope'
  },
  {
    id: 6,
    title: 'Day Longer Than a Year',
    fact: 'Venus rotates so sluggishly on its axis that one single Venusian day (243 Earth days) lasts longer than an entire Venusian orbital year (225 Earth days).',
    category: 'Chronology',
    source: 'Magellan Radar Mapping'
  },
  {
    id: 7,
    title: 'Water Ice on Sun-Scorched Mercury',
    fact: 'Even though Mercury is the closest planet to the fiery Sun, deep craters at its polar regions sit in permanent freezing shadow, preserving billions of tons of water ice.',
    category: 'Planetary Water',
    source: 'MESSENGER Mission'
  },
  {
    id: 8,
    title: 'Earth’s Deep Liquid Ocean Moon',
    fact: 'Jupiter’s icy moon Europa is believed to conceal a vast liquid saltwater ocean beneath its outer ice shell containing roughly double all the water in Earth’s oceans combined.',
    category: 'Astrobiology',
    source: 'Galileo Orbiter'
  }
];
