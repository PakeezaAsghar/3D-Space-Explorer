import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Orbit, 
  Globe, 
  Eye, 
  Zap, 
  Layers, 
  RefreshCw,
  Play,
  Pause,
  ChevronRight,
  Sliders,
  Scale,
  BookOpen,
  Volume2
} from 'lucide-react';
import { SolarSystemCanvas } from '../scenes/SolarSystemCanvas';
import { PlanetPreviewCanvas } from '../scenes/PlanetPreviewCanvas';
import { usePlanetarium } from '../context/PlanetariumContext';
import { COSMIC_FACTS, PLANETS_DATA, PlanetData } from '../data/planets';
import { sound } from '../utils/audio';

// High-resolution generated space assets
import nebulaFormationImg from '../assets/images/nebula_formation_1790503195799.jpg';
import giantPlanetsImg from '../assets/images/giant_planets_1790503245084.jpg';
import orbitalMechanicsImg from '../assets/images/orbital_mechanics_1790503258468.jpg';

type PlanetCategory = 'featured' | 'terrestrial' | 'giants' | 'all';

export const Home: React.FC = () => {
  const { setSelectedPlanetId } = usePlanetarium();
  const navigate = useNavigate();
  const [factIndex, setFactIndex] = useState(0);

  // Live Hero 3D Simulation Controls
  const [heroSpeed, setHeroSpeed] = useState<number>(1);
  const [isHeroSimRunning, setIsHeroSimRunning] = useState<boolean>(true);

  // Planet Filter Category
  const [activeCategory, setActiveCategory] = useState<PlanetCategory>('featured');

  const currentFact = COSMIC_FACTS[factIndex];

  const handleNextFact = () => {
    sound.playClick();
    setFactIndex(prev => (prev + 1) % COSMIC_FACTS.length);
  };

  const handleInspectPlanet = (id: string) => {
    sound.playSelect();
    setSelectedPlanetId(id);
    navigate('/explore');
  };

  const allPlanetsList: PlanetData[] = [
    PLANETS_DATA.mercury,
    PLANETS_DATA.venus,
    PLANETS_DATA.earth,
    PLANETS_DATA.mars,
    PLANETS_DATA.jupiter,
    PLANETS_DATA.saturn,
    PLANETS_DATA.uranus,
    PLANETS_DATA.neptune
  ];

  const filteredPlanets = () => {
    switch (activeCategory) {
      case 'featured':
        return [PLANETS_DATA.earth, PLANETS_DATA.mars, PLANETS_DATA.jupiter, PLANETS_DATA.saturn];
      case 'terrestrial':
        return [PLANETS_DATA.mercury, PLANETS_DATA.venus, PLANETS_DATA.earth, PLANETS_DATA.mars];
      case 'giants':
        return [PLANETS_DATA.jupiter, PLANETS_DATA.saturn, PLANETS_DATA.uranus, PLANETS_DATA.neptune];
      case 'all':
      default:
        return allPlanetsList;
    }
  };

  return (
    <div className="min-h-screen theme-page overflow-x-clip">
      {/* =========================================================================
          HERO SECTION: Live Interactive 3D Solar System Cockpit
      ========================================================================== */}
      <section className="relative w-full h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Live 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <SolarSystemCanvas
            selectedPlanetId={null}
            onSelectPlanet={(id) => {
              if (id) handleInspectPlanet(id);
            }}
            simulationRunning={isHeroSimRunning}
            simulationSpeed={heroSpeed}
            showOrbits={true}
            showLabels={false}
            showStars={true}
            isCompact={true}
          />
        </div>

        {/* Ambient Gradient Overlays for high contrast */}
        <div className="absolute inset-x-0 top-0 h-36 hero-fade-top pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 hero-fade-bottom pointer-events-none z-10" />

        {/* Floating Hero Simulation HUD Controller (Top Right) */}
        <div className="absolute top-6 right-6 z-30 hidden sm:flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-white/15 backdrop-blur-md shadow-2xl">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsHeroSimRunning(prev => !prev);
            }}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isHeroSimRunning 
                ? 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30' 
                : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
            }`}
            title={isHeroSimRunning ? 'Pause 3D orbit simulation' : 'Resume simulation'}
          >
            {isHeroSimRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <div className="h-4 w-px bg-white/15" />

          {/* Speed Presets */}
          <div className="flex items-center gap-1">
            {[0.5, 1, 3].map(speed => (
              <button
                key={speed}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setHeroSpeed(speed);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  heroSpeed === speed 
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Floating Hero Content Overlay */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center pointer-events-none">
          {/* Scientific Status Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 backdrop-blur-md pointer-events-auto shadow-2xl shadow-cyan-950/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>8 PLANETS</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>1 STAR</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>290+ MOONS</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>KEPLERIAN PHYSICS</span>
          </div>

          {/* Main Cinematic Heading */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight hero-title-white !text-white mb-6 uppercase text-balance drop-shadow-2xl"
            style={{ color: '#ffffff' }}
          >
            EXPLORE <br className="hidden sm:inline" />
            <span className="!text-white" style={{ color: '#ffffff' }}>
              THE SOLAR SYSTEM
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            className="text-base sm:text-lg hero-subtitle-white !text-white/95 max-w-2xl mx-auto mb-8 font-sans leading-relaxed text-balance"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            Enter an interactive digital planetarium and discover the worlds orbiting our Sun with real-time 3D planetary physics, procedural surface shaders, and NASA ephemeris data.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto mb-8">
            <Link
              to="/explore"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer group uppercase"
            >
              <Compass className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform" />
              <span>Explore planets</span>
            </Link>

            <Link
              to="/planets"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white glass-panel hover:bg-white/10 border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md uppercase"
            >
              <span>View planets</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: Solar System Planetary Orbit Strip
      ========================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
              <Orbit className="w-3.5 h-3.5" />
              <span>Heliocentric Orbital Distance Spectrum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Solar System Transit Corridor
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Ordered from Central Sun to Outer Kuiper Rim
          </span>
        </div>

        {/* Horizontal Planetary Transit Map */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {allPlanetsList.map(planet => (
            <div
              key={planet.id}
              onClick={() => handleInspectPlanet(planet.id)}
              className="p-3.5 rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-800/60 hover:border-cyan-400/50 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="w-3 h-3 rounded-full shrink-0 group-hover:scale-125 transition-transform" 
                    style={{ backgroundColor: planet.color }}
                  />
                  <span className="text-[10px] font-mono text-slate-500">
                    {planet.distanceFromSunKm < 1000 
                      ? `${(planet.distanceFromSunKm / 149.6).toFixed(2)} AU`
                      : `${(planet.distanceFromSunKm / 149.6).toFixed(1)} AU`}
                  </span>
                </div>
                <h4 className="text-sm font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {planet.name}
                </h4>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                  {planet.type.replace(' Planet', '')}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{planet.avgTempC}°C</span>
                <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  3D →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: Filterable "Meet the Worlds" 3D Showcases
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
              High-Fidelity 3D Planetary Geometries
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Meet the Planets
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/15">
            {[
              { id: 'featured', label: 'Featured' },
              { id: 'terrestrial', label: 'Terrestrial' },
              { id: 'giants', label: 'Gas & Ice Giants' },
              { id: 'all', label: 'All 8 Worlds' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(tab.id as PlanetCategory);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Planet 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlanets().map(planet => (
            <div
              key={planet.id}
              className="group glass-panel rounded-2xl border border-white/10 hover:border-cyan-500/50 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/15"
            >
              <div>
                {/* 3D Interactive Mini Preview */}
                <div className="h-48 w-full rounded-xl space-viewport border border-white/10 overflow-hidden mb-4 relative bg-slate-950 shadow-inner">
                  <PlanetPreviewCanvas planetId={planet.id} className="w-full h-full" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                    LIVE 3D
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: planet.color }}
                  />
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {planet.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 ml-auto font-mono">{planet.type}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {planet.tagline || planet.description}
                </p>

                {/* Key stats row */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2.5 border-t border-white/10 mb-4 bg-white/[0.02] px-2 rounded-lg">
                  <div>
                    <span className="text-[10px] text-slate-500 block">DIAMETER</span>
                    <span className="text-slate-300 tabular-nums">{planet.diameter}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">ORBIT YEAR</span>
                    <span className="text-slate-300 tabular-nums">{planet.yearLength}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">MOONS</span>
                    <span className="text-cyan-300 tabular-nums">{planet.moons}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">GRAVITY</span>
                    <span className="text-slate-300 tabular-nums">{planet.gravity}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleInspectPlanet(planet.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-950" />
                  <span>Inspect in 3D</span>
                </button>
                <Link
                  to={`/compare?planet1=earth&planet2=${planet.id}`}
                  onClick={() => sound.playClick()}
                  className="py-2.5 px-3 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  title="Compare with Earth"
                >
                  <Scale className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Cinematic Feature Bento Grid
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>DIGITAL OBSERVATORY CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-3">
            Engineered for Astrophysics & Discovery
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Move seamlessly between real-time 3D orbital simulations, deep curriculum telemetry, and side-by-side gravitational comparisons.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3D Celestial Cockpit (Spans 2 cols) */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-8 sm:p-10 flex flex-col justify-between group shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-2">
                01 · Simulation Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                Full-Scale 3D Planetary Cockpit
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Adjust orbital speeds from 0.25x to 10x, trace Keplerian elliptical trajectories, examine axial tilts, and inspect magnetic poles with full 360° spherical camera control.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/explore"
                  onClick={() => sound.playClick()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Launch 3D Cockpit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-xs font-mono text-slate-400">
                  WebGL 2.0 · 60 FPS Engine
                </span>
              </div>
            </div>

            {/* Thumbnail preview badge */}
            <div className="mt-6 md:mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Orbit className="w-4 h-4 text-cyan-400" />
                <span>Real-Time Raycaster & Ephemeris Tracking</span>
              </span>
              <span className="text-cyan-400">Keplerian Model</span>
            </div>
          </div>

          {/* Card 2: Planet Comparison Lab (1 col) */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 p-8 flex flex-col justify-between group shadow-2xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                02 · Laboratory
              </span>
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Planet Comparison Matrix
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Benchmark gravity ratios, atmospheric pressures, day lengths, and scale differences side-by-side with interactive visual bars.
              </p>
            </div>

            <Link
              to="/compare"
              onClick={() => sound.playClick()}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white glass-panel hover:bg-white/10 border border-white/20 flex items-center justify-between transition-all cursor-pointer"
            >
              <span>Launch Comparison Matrix</span>
              <Scale className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Card 3: Interactive Curriculum (1 col) */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950 p-6 flex flex-col justify-between group shadow-2xl">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/10">
              <img
                src={nebulaFormationImg}
                alt="Solar nebula formation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-cyan-300">
                CURRICULUM
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold font-display text-white mb-1">
                Astrophysics Curriculum
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Explore solar dynamo physics, accretion disks, and Kepler’s laws with annotated telemetry.
              </p>
            </div>

            <Link
              to="/learn"
              onClick={() => sound.playClick()}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Curriculum Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Jovian Deep Space (Spans 2 cols) */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 group shadow-2xl">
            <div className="w-full sm:w-1/2 aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-white/10 shrink-0">
              <img
                src={giantPlanetsImg}
                alt="Gas and ice giants deep space view"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                04 · Deep Space Exploration
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Gas Giants & Ring Systems
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover Jupiter’s Great Red Spot storm, Saturn’s trillion ice ring fragments, and the deep blue methane atmospheres of Uranus and Neptune.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleInspectPlanet('saturn')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
                >
                  <Orbit className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Saturn’s Rings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Astronomical Telemetry By the Numbers
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
            Astronomical Telemetry
          </span>
          <h2 className="text-3xl font-bold font-display text-white">
            By the Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-cyan-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-cyan-400 mb-1 tabular-nums">
              8
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Major Planets
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              4 Terrestrial worlds + 4 Jovian gas/ice giants
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-amber-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-amber-400 mb-1 tabular-nums">
              1
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Central Star
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Yellow dwarf containing 99.86% of total system mass
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-indigo-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-indigo-400 mb-1 tabular-nums">
              290+
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Known Moons
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Saturn leads with 146 confirmed satellites
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-emerald-500/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold font-display text-emerald-400 mb-1 tabular-nums">
              4.6 B
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Years of History
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Since the collapse of the primordial nebula
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Interactive Cosmic Fact Generator
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl border border-white/15 p-8 sm:p-10 relative overflow-hidden bg-gradient-to-br from-slate-950/90 via-slate-900/60 to-cyan-950/30 shadow-2xl">
          <div className="max-w-3xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cosmic Knowledge · Fact #{currentFact.id} of {COSMIC_FACTS.length}</span>
              </span>
              <button
                type="button"
                onClick={handleNextFact}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next Fact</span>
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
              {currentFact.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {currentFact.fact}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                Field: {currentFact.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>Verified by {currentFact.source}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: Call To Action
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-b from-slate-950 to-cyan-950/30 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Ready to Chart the Stars?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
            Switch camera angles, inspect individual rings, compare gravities, and discover planetary dynamics in our real-time 3D planetarium.
          </p>
          <Link
            to="/explore"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>ENTER PLANETARIUM</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
