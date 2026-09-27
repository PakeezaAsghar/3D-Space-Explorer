import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowDown, Compass, Sparkles, Orbit, Globe, Eye, Zap, Layers, RefreshCw } from 'lucide-react';
import { SolarSystemCanvas } from '../scenes/SolarSystemCanvas';
import { PlanetPreviewCanvas } from '../scenes/PlanetPreviewCanvas';
import { usePlanetarium } from '../context/PlanetariumContext';
import { COSMIC_FACTS, PLANETS_DATA } from '../data/planets';
import { sound } from '../utils/audio';

export const Home: React.FC = () => {
  const { setSelectedPlanetId } = usePlanetarium();
  const navigate = useNavigate();
  const [factIndex, setFactIndex] = useState(0);

  const featuredPlanets = [
    PLANETS_DATA.earth,
    PLANETS_DATA.mars,
    PLANETS_DATA.jupiter,
    PLANETS_DATA.saturn
  ];

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

  return (
    <div className="min-h-screen theme-page overflow-hidden">
      {/* Hero Section with Live 3D Solar System Scene */}
      <section className="relative w-full h-[88vh] min-h-[580px] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Live 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <SolarSystemCanvas
            selectedPlanetId={null}
            onSelectPlanet={(id) => {
              if (id) handleInspectPlanet(id);
            }}
            simulationRunning={true}
            simulationSpeed={1}
            showOrbits={true}
            showLabels={true}
            showStars={true}
            isCompact={true}
          />
        </div>

        {/* Ambient Gradient Overlays (top & bottom fade) */}
        <div className="absolute inset-x-0 top-0 h-28 hero-fade-top pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 hero-fade-bottom pointer-events-none z-10" />

        {/* Floating Hero Content Overlay (Left-aligned as in reference image) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center min-h-[calc(88vh-4rem)] pointer-events-none py-12">
          <div className="max-w-xl text-left pointer-events-none">
            {/* Scientific Status Tagline */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-cyan-400 mb-4 tracking-wider drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
              <span>8 PLANETS</span>
              <span aria-hidden="true" className="text-cyan-400/50">·</span>
              <span>1 STAR</span>
              <span aria-hidden="true" className="text-cyan-400/50">·</span>
              <span>1 MOON</span>
              <span aria-hidden="true" className="text-cyan-400/50">·</span>
              <span>COUNTLESS DISCOVERIES</span>
            </div>

            {/* Main Cinematic Heading (Left-aligned, crisp white with cyan gradient on SYSTEM) */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight hero-title-white !text-white mb-6 uppercase leading-[1.06] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] text-balance"
              style={{ color: '#ffffff' }}
            >
              EXPLORE <br />
              <span>THE SOLAR </span>
              <span
                className="hero-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]"
              >
                SYSTEM
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              className="text-base sm:text-lg hero-subtitle-white !text-white/95 max-w-lg mb-8 font-sans leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
              style={{ color: 'rgba(255, 255, 255, 0.95)' }}
            >
              Enter an interactive digital planetarium <br className="hidden sm:inline" />
              and discover the worlds orbiting our Sun.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pointer-events-auto">
              <Link
                to="/explore"
                onClick={() => sound.playClick()}
                className="px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2.5 transition-all cursor-pointer group hover:scale-[1.02]"
              >
                <span>START EXPLORING</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/planets"
                onClick={() => sound.playClick()}
                className="px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-slate-900/60 hover:bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer group hover:scale-[1.02]"
              >
                <span>VIEW PLANETS</span>
                <Orbit className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>

            <div className="mt-8 text-xs text-slate-300/80 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Interactive 3D Canvas · Click any planet or drag to orbit</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator (bottom right, like in reference image) */}
        <div className="absolute bottom-6 right-6 sm:right-10 z-20 pointer-events-auto">
          <button
            onClick={() => {
              sound.playClick();
              document.getElementById('meet-the-planets')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/15 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400/40 backdrop-blur-md transition-all shadow-lg group cursor-pointer"
            aria-label="Scroll down to planets"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
              <ArrowDown className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-medium tracking-wide">Scroll Down</span>
          </button>
        </div>
      </section>

      {/* SECTION 1: MEET THE PLANETS */}
      <section id="meet-the-planets" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
              Curated Worlds
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Meet the Planets
            </h2>
          </div>
          <Link
            to="/planets"
            onClick={() => sound.playClick()}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>View All Celestial Bodies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlanets.map(planet => (
            <div
              key={planet.id}
              className="group glass-panel rounded-2xl border border-white/10 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div>
                {/* 3D Interactive Mini Preview */}
                <div className="h-44 w-full rounded-xl space-viewport border border-white/5 overflow-hidden mb-4 relative">
                  <PlanetPreviewCanvas planetId={planet.id} className="w-full h-full" />
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-mono text-slate-400 border border-white/10">
                    3D PREVIEW
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
                  <span className="text-xs text-slate-400 ml-auto font-mono">{planet.type}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {planet.description}
                </p>

                {/* Key stats row */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2 border-t border-white/10 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block">DIAMETER</span>
                    <span className="text-slate-300 tabular-nums">{planet.diameter}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">YEAR</span>
                    <span className="text-slate-300 tabular-nums">{planet.yearLength}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleInspectPlanet(planet.id)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect in 3D</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: EXPLORE THE SOLAR SYSTEM HIGHLIGHT BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/70 p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-2">
              Full Simulation Mode
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Step Into the Cockpit of the Digital Planetarium
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Take full control over planetary orbital speeds from 0.25x to 10x, toggle orbital paths, track planetary axial tilts, and inspect atmospheric and geological telemetry in real time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/explore"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Interactive Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/compare"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-white glass-panel hover:bg-white/10 border border-white/20 transition-all cursor-pointer"
              >
                <span>Compare Two Planets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BY THE NUMBERS */}
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
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
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

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-bold font-display text-cyan-400 mb-1 tabular-nums">
              1
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Central Star
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Containing 99.86% of total solar system mass
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-bold font-display text-cyan-400 mb-1 tabular-nums">
              290+
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Known Moons
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Saturn leads with 146 confirmed satellites
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-3xl sm:text-4xl font-bold font-display text-cyan-400 mb-1 tabular-nums">
              4.6 B
            </div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Years of History
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Since the collapse of the solar nebula
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: LEARN SOMETHING NEW (Interactive Fact) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl border border-white/15 p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Cosmic Knowledge · Fact #{currentFact.id} of {COSMIC_FACTS.length}
              </span>
              <button
                type="button"
                onClick={handleNextFact}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors cursor-pointer"
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

            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <span>Category: {currentFact.category}</span>
              <span aria-hidden="true">·</span>
              <span>Source: {currentFact.source}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: READY TO EXPLORE CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
          Ready to Chart the Stars?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
          Switch camera angles, inspect individual rings, compare gravities, and discover planetary dynamics in our 3D planetarium.
        </p>
        <Link
          to="/explore"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4 text-slate-950" />
          <span>ENTER PLANETARIUM</span>
        </Link>
      </section>
    </div>
  );
};
