import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Orbit, 
  Sun, 
  Globe, 
  Compass, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  Zap, 
  Maximize2, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Info,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { COSMIC_FACTS } from '../data/planets';
import { sound } from '../utils/audio';

// High-resolution generated astrophysical assets
import nebulaFormationImg from '../assets/images/nebula_formation_1790503195799.jpg';
import sunDynamoImg from '../assets/images/sun_dynamo_1790503213248.jpg';
import rockyTerrestrialImg from '../assets/images/rocky_terrestrial_1790503231613.jpg';
import giantPlanetsImg from '../assets/images/giant_planets_1790503245084.jpg';
import orbitalMechanicsImg from '../assets/images/orbital_mechanics_1790503258468.jpg';

interface Hotspot {
  x: string;
  y: string;
  title: string;
  desc: string;
}

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface EducationalModule {
  id: string;
  title: string;
  category: 'Formation & Star' | 'Terrestrial Worlds' | 'Gas Giants & Outer' | 'Orbital Physics';
  badge: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
  focusTarget?: string;
  content: string;
  keyPoints: string[];
  hotspots: Hotspot[];
  quiz: QuizItem;
}

const MODULES: EducationalModule[] = [
  {
    id: 'formation',
    title: 'What is the Solar System?',
    category: 'Formation & Star',
    badge: '4.6B Years Ago',
    icon: <Globe className="w-4 h-4 text-cyan-400" />,
    image: nebulaFormationImg,
    alt: 'Nebular hypothesis: Proto-planetary accretion disk collapsing around newborn Sun',
    focusTarget: 'sun',
    content: 'Our solar system formed approximately 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud. It consists of our central G-type main-sequence star (the Sun), eight major planets, hundreds of natural satellites, five recognized dwarf planets, and millions of asteroids and comets.',
    keyPoints: [
      'Triggered by a nearby supernova shockwave collapsing cold gas',
      'Conservation of angular momentum created a flattened spinning accretion disk',
      '99.86% of matter gathered at the center to ignite hydrogen fusion'
    ],
    hotspots: [
      { x: '50%', y: '50%', title: 'Proto-Sun Core', desc: 'Central compression triggered thermonuclear fusion.' },
      { x: '25%', y: '45%', title: 'Accretion Disk', desc: 'Swirling dust rings where planetesimals formed through collisions.' },
      { x: '78%', y: '62%', title: 'Frost Line', desc: 'Boundary where water and volatiles condensed into ice.' }
    ],
    quiz: {
      question: 'What fundamental physical law caused the collapsing nebula to flatten into a spinning disk?',
      options: [
        'Conservation of angular momentum',
        'Universal chemical oxidation',
        'Electromagnetic repulsion of heavy ions',
        'Relativistic time dilation'
      ],
      correctIndex: 0,
      explanation: 'As the large gas cloud contracted under gravity, conservation of angular momentum accelerated its spin rate and forced matter into an equatorial plane disk.'
    }
  },
  {
    id: 'sun-dynamo',
    title: 'The Sun: The Cosmic Dynamo',
    category: 'Formation & Star',
    badge: '15,000,000 K Core',
    icon: <Sun className="w-4 h-4 text-amber-400" />,
    image: sunDynamoImg,
    alt: 'High-detail astronomical view of the Sun with solar flares, plasma prominences, and convection granules',
    focusTarget: 'sun',
    content: 'The Sun accounts for 99.86% of all mass in the solar system. Inside its core, temperatures exceed 15 million Kelvin, driving proton-proton thermonuclear fusion that converts 600 million metric tons of hydrogen into helium every second. Resulting photons take up to 100,000 years to migrate to the surface before streaming into space as sunlight.',
    keyPoints: [
      'Core pressure: 250 billion atmospheres (25.3 TPa)',
      'Solar corona reaches 1 to 3 million Kelvin, hotter than the surface',
      'Solar wind creates the protective bubble of our heliosphere'
    ],
    hotspots: [
      { x: '52%', y: '48%', title: 'Core Fusion Furnace', desc: 'Converts 600 million tons of hydrogen into helium per second.' },
      { x: '82%', y: '25%', title: 'Coronal Flare Ejection', desc: 'Magnetic reconnection launching billions of tons of high-energy plasma.' },
      { x: '35%', y: '70%', title: 'Photospheric Granules', desc: 'Convection cells roughly 1,000 km across transferring internal heat.' }
    ],
    quiz: {
      question: 'How long does a photon born in the Sun\'s core take to migrate to the surface?',
      options: [
        '8 minutes and 20 seconds',
        'Approximately 100,000 years',
        '10 to 12 days',
        'Instantaneously via quantum tunneling'
      ],
      correctIndex: 1,
      explanation: 'Due to dense radiative scattering, photons undergo countless millions of random absorptions and re-emissions taking 10,000 to 100,000+ years to reach the surface. Once at the surface, they reach Earth in 8.3 minutes.'
    }
  },
  {
    id: 'terrestrial',
    title: 'Inner (Terrestrial) Planets',
    category: 'Terrestrial Worlds',
    badge: 'Silicate Crust & Iron Core',
    icon: <Layers className="w-4 h-4 text-emerald-400" />,
    image: rockyTerrestrialImg,
    alt: 'Terrestrial rocky planets Mercury, Venus, Earth, and Mars showing craters and geological crusts',
    focusTarget: 'mars',
    content: 'Mercury, Venus, Earth, and Mars are categorized as terrestrial planets. Characterized by solid rocky silicate crusts, mantle layers, and dense metallic cores of iron and nickel, they formed inside the frost line where temperatures were too high for volatile compounds to condense into ice.',
    keyPoints: [
      'High average densities ranging from 3.9 to 5.5 g/cm³',
      'Shallow volatile inventories and thin or secondary atmospheres',
      'Subjected to the Late Heavy Bombardment ~4 billion years ago'
    ],
    hotspots: [
      { x: '45%', y: '50%', title: 'Silicate Mantle', desc: 'Dense rock compounds that solidified inside the inner thermal boundary.' },
      { x: '75%', y: '38%', title: 'Impact Cratering', desc: 'Ancient primordial craters preserved on airless planetary bodies.' },
      { x: '24%', y: '64%', title: 'Metallic Iron Core', desc: 'Generates Earth\'s protective planetary magnetosphere.' }
    ],
    quiz: {
      question: 'Why are terrestrial planets rocky while outer planets are primarily gas and ice?',
      options: [
        'They formed inside the solar frost line where volatile gases could not freeze',
        'Solar winds stripped all silicates toward the outer rim',
        'Gravitational pull was too high to retain hydrogen',
        'They were captured rogue planetoids from another star'
      ],
      correctIndex: 0,
      explanation: 'Inside the frost line (~2.7 AU), intense heat prevented water, methane, and ammonia from condensing into solids, leaving only dense rock and metals to coalesce.'
    }
  },
  {
    id: 'giants',
    title: 'Outer Planets: Gas & Ice Giants',
    category: 'Gas Giants & Outer',
    badge: 'Slushy Ices & Metallic Hydrogen',
    icon: <Orbit className="w-4 h-4 text-indigo-400" />,
    image: giantPlanetsImg,
    alt: 'Gas and Ice Giants Jupiter with Great Red Spot, Saturn with rings, and deep azure Neptune',
    focusTarget: 'jupiter',
    content: 'Beyond the asteroid belt lie Jupiter, Saturn, Uranus, and Neptune. Jupiter and Saturn are Gas Giants composed mainly of hydrogen and helium wrapped around metallic cores. Uranus and Neptune are Ice Giants containing heavy elements and thick slushy mantles of supercritical water, ammonia, and methane ices.',
    keyPoints: [
      'Jupiter and Saturn contain over 90% of non-solar planetary mass',
      'Uranus and Neptune have supercritical ionic ice mantles',
      'Saturn\'s ring system is 99% pure water ice particles'
    ],
    hotspots: [
      { x: '30%', y: '45%', title: 'Jupiter Atmospheric Jetstreams', desc: 'Counter-rotating zonal bands powered by deep internal heat.' },
      { x: '70%', y: '40%', title: 'Saturn\'s Ring System', desc: 'Particle sizes range from micrometers to several meters.' },
      { x: '85%', y: '75%', title: 'Methane Color Absorption', desc: 'Methane molecules absorb red light, giving Neptune its deep blue color.' }
    ],
    quiz: {
      question: 'What atmospheric compound gives Neptune its striking deep azure blue appearance?',
      options: [
        'Liquid nitrogen lakes',
        'Atmospheric methane (CH₄)',
        'Sulfur dioxide clouds',
        'Dissolved oxygen vapor'
      ],
      correctIndex: 1,
      explanation: 'Methane gas in Neptune\'s upper atmosphere absorbs wavelengths in the red part of the visible spectrum while reflecting blue light back into space.'
    }
  },
  {
    id: 'orbital-mechanics',
    title: 'Orbital Mechanics & Kepler’s Laws',
    category: 'Orbital Physics',
    badge: 'Kepler: P² = a³',
    icon: <Compass className="w-4 h-4 text-purple-400" />,
    image: orbitalMechanicsImg,
    alt: 'Scientific visualization of elliptical orbits, perihelion vectors, and Keplerian equal area sweeps',
    focusTarget: 'earth',
    content: 'Johannes Kepler derived three empirical laws governing orbital physics: 1) Planets travel in ellipses with the Sun at one focus; 2) A radius vector sweeping from Sun to planet sweeps equal areas in equal intervals of time; 3) The square of the orbital period is proportional to the cube of its semi-major axis (P² = a³).',
    keyPoints: [
      'Perihelion is the closest point where orbital velocity peaks',
      'Aphelion is the farthest point where orbital velocity is slowest',
      'Predicts exact satellite velocities and interplanetary transfer orbits'
    ],
    hotspots: [
      { x: '42%', y: '48%', title: 'Gravitational Focus (Sun)', desc: 'Occupies one focal point of the orbital ellipse.' },
      { x: '68%', y: '35%', title: 'Perihelion Velocity Vector', desc: 'Planets accelerate as they drop into the gravitational well.' },
      { x: '22%', y: '68%', title: 'Equal Area Sweep', desc: 'Orbital areas covered in equal time intervals are always identical.' }
    ],
    quiz: {
      question: 'According to Kepler\'s 2nd Law, when does an orbiting planet move fastest?',
      options: [
        'At perihelion (closest distance to the Sun)',
        'At aphelion (farthest distance from the Sun)',
        'At the vernal equinox',
        'Orbital speed never changes'
      ],
      correctIndex: 0,
      explanation: 'Because a planet must sweep out equal areas in equal time intervals, it must travel faster along its orbital path when closer to the Sun (perihelion).'
    }
  },
  {
    id: 'axial-tilt',
    title: 'Rotational Tilt & Planetary Seasons',
    category: 'Orbital Physics',
    badge: '0° to 97.8° Obliquity',
    icon: <Zap className="w-4 h-4 text-cyan-400" />,
    image: orbitalMechanicsImg,
    alt: 'Axial tilt angles and sunlight distribution across planetary hemispheres',
    focusTarget: 'uranus',
    content: 'A planet’s axial tilt (obliquity) dictates how solar irradiance is distributed across its surface throughout its orbit. Earth’s modest 23.4° tilt produces our temperate annual seasons. Mars has a similar 25.2° tilt. In contrast, Uranus boasts an extreme 97.8° tilt, rolling along its orbital plane so that each pole experiences 42 continuous Earth years of sunlight followed by 42 years of darkness.',
    keyPoints: [
      'Mercury has nearly 0° tilt, maintaining permanently shadowed ice craters',
      'Venus has a 177° retro-tilt, rotating backwards very slowly',
      'Seasonal intensity depends directly on obliquity rather than orbital distance'
    ],
    hotspots: [
      { x: '50%', y: '38%', title: 'Earth 23.4° Obliquity', desc: 'Moderates solar irradiance to generate sustainable seasons.' },
      { x: '76%', y: '60%', title: 'Uranus 97.8° Sideways Roll', desc: 'Likely struck by an Earth-sized protoplanet during early solar history.' },
      { x: '26%', y: '32%', title: 'Insolation Angle', desc: 'Steeper solar incidence angles deliver higher thermal energy per m².' }
    ],
    quiz: {
      question: 'Which planet rotates practically sideways with an axial tilt of nearly 98 degrees?',
      options: [
        'Venus',
        'Mars',
        'Uranus',
        'Jupiter'
      ],
      correctIndex: 2,
      explanation: 'Uranus has an extreme axial tilt of 97.8°, meaning its poles point almost directly toward the Sun during solstices.'
    }
  }
];

export const Learn: React.FC = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalModule, setActiveModalModule] = useState<EducationalModule | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  
  // Interactive quiz state keyed by module ID
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [activeQuizCard, setActiveQuizCard] = useState<string | null>(null);

  const currentFact = COSMIC_FACTS[factIndex];

  const handleNextFact = () => {
    sound.playClick();
    setFactIndex(prev => (prev + 1) % COSMIC_FACTS.length);
  };

  const handlePrevFact = () => {
    sound.playClick();
    setFactIndex(prev => (prev - 1 + COSMIC_FACTS.length) % COSMIC_FACTS.length);
  };

  const categories = ['All', 'Formation & Star', 'Terrestrial Worlds', 'Gas Giants & Outer', 'Orbital Physics'];

  const filteredModules = selectedCategory === 'All'
    ? MODULES
    : MODULES.filter(m => m.category === selectedCategory);

  const openInspector = (mod: EducationalModule) => {
    sound.playClick();
    setActiveModalModule(mod);
    setActiveHotspot(mod.hotspots[0] || null);
  };

  const closeInspector = () => {
    sound.playClick();
    setActiveModalModule(null);
    setActiveHotspot(null);
  };

  const selectAnswer = (moduleId: string, optionIndex: number) => {
    sound.playClick();
    setQuizAnswers(prev => ({ ...prev, [moduleId]: optionIndex }));
  };

  const toggleCardQuiz = (moduleId: string) => {
    sound.playClick();
    setActiveQuizCard(prev => (prev === moduleId ? null : moduleId));
  };

  return (
    <div className="min-h-screen theme-page py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4 shadow-sm">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ASTROPHYSICS CURRICULUM & INTERACTIVE MEDIA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
          Astrophysics & Solar Dynamics
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Explore the formation, planetary interiors, magnetospheres, and orbital mechanics of our solar system through interactive visual telemetry and real-time simulations.
        </p>
      </div>

      {/* Interactive Cosmic Fact Card */}
      <div className="mb-12 glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 bg-gradient-to-br from-slate-950/90 via-slate-900/60 to-cyan-950/30 shadow-2xl transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE COSMIC FACT #{currentFact.id} OF {COSMIC_FACTS.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevFact}
              className="p-1.5 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
              aria-label="Previous fact"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={handleNextFact}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next Fact</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
          {currentFact.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
          {currentFact.fact}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
            Field: {currentFact.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>Verified by {currentFact.source}</span>
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <span>Interactive Astrophysical Modules</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click on any image to open the high-res scientific inspection viewer with annotations.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Educational Modules Grid with Interactive Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredModules.map((mod, i) => {
          const isQuizOpen = activeQuizCard === mod.id;
          const selectedAnswer = quizAnswers[mod.id] ?? null;
          const isAnswered = selectedAnswer !== null;
          const isCorrect = selectedAnswer === mod.quiz.correctIndex;

          return (
            <div
              key={mod.id}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group shadow-lg"
            >
              {/* Interactive Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer group">
                <img
                  src={mod.image}
                  alt={mod.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onClick={() => openInspector(mod)}
                />

                {/* Subtle gradient vignette */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Floating Telemetry Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-white/15 shadow-md">
                    {mod.badge}
                  </span>
                </div>

                {/* Hover Inspect CTA Overlay */}
                <button
                  type="button"
                  onClick={() => openInspector(mod)}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 backdrop-blur-md transition-colors shadow-md cursor-pointer"
                  title="Inspect visual telemetry"
                >
                  <Maximize2 className="w-3 h-3 text-cyan-400" />
                  <span>Inspect Image</span>
                </button>

                {/* Category Indicator */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  {mod.icon}
                  <span>{mod.category}</span>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {mod.content}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5 mb-4">
                    {mod.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <span className="text-cyan-400 font-bold mt-0.5">·</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Quiz Toggle Box */}
                <div className="pt-3 border-t border-white/10 mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={() => toggleCardQuiz(mod.id)}
                      className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{isQuizOpen ? 'Hide Knowledge Check' : 'Test Your Knowledge'}</span>
                    </button>

                    {mod.focusTarget && (
                      <Link
                        to={`/explore?focus=${mod.focusTarget}`}
                        onClick={() => sound.playClick()}
                        className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        <span>View 3D Body</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {/* Expandable Quiz Panel */}
                  {isQuizOpen && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-900/90 border border-white/15 space-y-3">
                      <p className="text-xs font-medium text-slate-200">
                        {mod.quiz.question}
                      </p>

                      <div className="space-y-1.5">
                        {mod.quiz.options.map((option, optIdx) => {
                          const isOptionSelected = selectedAnswer === optIdx;
                          const isOptionCorrect = optIdx === mod.quiz.correctIndex;
                          let btnStyle = 'border-white/10 hover:border-cyan-500/40 text-slate-300 bg-white/5';
                          
                          if (isAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-semibold';
                            } else if (isOptionSelected) {
                              btnStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-200';
                            } else {
                              btnStyle = 'border-white/5 opacity-50 text-slate-500';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => selectAnswer(mod.id, optIdx)}
                              className={`w-full text-left text-[11px] p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {isAnswered && isOptionCorrect && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              )}
                              {isAnswered && isOptionSelected && !isOptionCorrect && (
                                <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback */}
                      {isAnswered && (
                        <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed border ${
                          isCorrect 
                            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                            : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                        }`}>
                          <p className="font-semibold mb-1">
                            {isCorrect ? 'Correct!' : 'Scientific Insight:'}
                          </p>
                          <p className="text-slate-300">{mod.quiz.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Image Inspector Modal */}
      {activeModalModule && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeInspector}
        >
          <div 
            className="glass-panel w-full max-w-4xl rounded-3xl border border-white/20 bg-slate-950/95 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  {activeModalModule.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white">
                    {activeModalModule.title}
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-400">
                    ASTROPHYSICAL VISUAL TELEMETRY INSPECTOR
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHotspots(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    showHotspots 
                      ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{showHotspots ? 'Hotspots Active' : 'Hide Hotspots'}</span>
                </button>
                <button
                  type="button"
                  onClick={closeInspector}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close inspection modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* High-Resolution Interactive Image with Hotspots */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-inner">
                <img
                  src={activeModalModule.image}
                  alt={activeModalModule.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Interactive Hotspot Pins */}
                {showHotspots && activeModalModule.hotspots.map((spot, idx) => {
                  const isSelected = activeHotspot?.title === spot.title;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveHotspot(spot);
                      }}
                      style={{ left: spot.x, top: spot.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all cursor-pointer group shadow-xl z-20 ${
                        isSelected 
                          ? 'ring-4 ring-cyan-400/50 bg-cyan-400 scale-125' 
                          : 'bg-slate-900/90 border border-cyan-400 text-cyan-300 hover:scale-110 hover:bg-cyan-500 hover:text-slate-950'
                      }`}
                      title={spot.title}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping absolute inset-1 opacity-75 pointer-events-none" />
                      <span className="sr-only">{spot.title}</span>
                      <span className="text-[10px] font-mono font-bold px-1 select-none">
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Hotspot Detailed Callout */}
              {activeHotspot && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-cyan-400/20 text-cyan-300 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold">
                    i
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {activeHotspot.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeHotspot.desc}
                    </p>
                  </div>
                </div>
              )}

              {/* Deep Dive Scientific Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                    Core Physics Principles
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModalModule.content}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                      Key Observational Metrics
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeModalModule.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">·</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeModalModule.focusTarget && (
                    <div className="pt-4 mt-4 border-t border-white/10">
                      <Link
                        to={`/explore?focus=${activeModalModule.focusTarget}`}
                        onClick={() => sound.playClick()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                      >
                        <Orbit className="w-4 h-4 text-slate-950" />
                        <span>Inspect in 3D Solar Simulation</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deep-Dive Interactive Experience CTA */}
      <div className="glass-panel rounded-3xl border border-white/15 p-8 text-center max-w-3xl mx-auto shadow-2xl">
        <h2 className="text-2xl font-bold font-display text-white mb-2">
          Observe These Physical Laws in Real Time
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-xl mx-auto">
          In our 3D Planetarium, watch orbital speeds decrease with distance according to Kepler’s Third Law, inspect axial tilts, and test simulation velocities.
        </p>
        <Link
          to="/explore"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Orbit className="w-4 h-4 text-slate-950" />
          <span>Launch 3D Orbit Simulation</span>
        </Link>
      </div>
    </div>
  );
};
