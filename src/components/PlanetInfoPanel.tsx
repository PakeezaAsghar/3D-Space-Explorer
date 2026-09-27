import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Scale, Info, Atom, Thermometer, Orbit, Clock, Globe } from 'lucide-react';
import { usePlanetarium } from '../context/PlanetariumContext';
import { PLANETS_DATA, PlanetData } from '../data/planets';
import { sound } from '../utils/audio';

export const PlanetInfoPanel: React.FC = () => {
  const {
    selectedPlanetId,
    setSelectedPlanetId,
    nextPlanet,
    prevPlanet,
    scientificMode,
    setScientificMode
  } = usePlanetarium();

  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'atmosphere'>('overview');
  const navigate = useNavigate();

  if (!selectedPlanetId) return null;
  const planet: PlanetData = PLANETS_DATA[selectedPlanetId];
  if (!planet) return null;

  const handleCompare = () => {
    sound.playClick();
    navigate(`/compare?p1=${planet.id}`);
  };

  return (
    <aside
      aria-label="Planet Details HUD"
      className="fixed inset-x-3 bottom-16 sm:bottom-auto sm:inset-x-auto sm:top-20 sm:right-6 w-auto sm:w-96 max-h-[75vh] sm:max-h-[82vh] glass-panel rounded-2xl border border-white/20 shadow-2xl z-30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 sm:slide-in-from-right-6 duration-200"
    >
      {/* Top Header Bar */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/30">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-md"
            style={{ backgroundColor: planet.color }}
          />
          <div>
            <h3 className="text-xl font-bold font-display text-white tracking-tight leading-none">
              {planet.name}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {planet.type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevPlanet}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Previous planet"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextPlanet}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Next planet"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              setSelectedPlanetId(null);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
            title="Return to Solar System view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode / Tabs Bar */}
      <div className="flex items-center px-4 pt-2 border-b border-white/10 gap-2 bg-black/20 text-xs font-mono">
        <button
          type="button"
          onClick={() => { sound.playClick(); setActiveTab('overview'); }}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => { sound.playClick(); setActiveTab('stats'); }}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'stats'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Telemetry
        </button>
        <button
          type="button"
          onClick={() => { sound.playClick(); setActiveTab('atmosphere'); }}
          className={`pb-2 border-b-2 transition-colors ${
            activeTab === 'atmosphere'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Atmosphere
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 overflow-y-auto space-y-4 text-sm text-slate-300 flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-3.5">
            <p className="text-xs italic text-cyan-300 font-medium">
              &ldquo;{planet.tagline}&rdquo;
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              {planet.description}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>Diameter</span>
                </div>
                <span className="text-sm font-bold text-white tabular-nums">
                  {planet.diameter}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
                  <Orbit className="w-3 h-3 text-amber-400" />
                  <span>Distance</span>
                </div>
                <span className="text-xs font-bold text-white tabular-nums line-clamp-1">
                  {planet.distanceFromSun}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Day Length</span>
                </div>
                <span className="text-xs font-bold text-white tabular-nums">
                  {planet.dayLength}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5">
                  <Thermometer className="w-3 h-3 text-rose-400" />
                  <span>Avg Temp</span>
                </div>
                <span className="text-xs font-bold text-white tabular-nums">
                  {planet.temperature}
                </span>
              </div>
            </div>

            {/* Interesting Fact Callout */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Cosmic Highlight</span>
              </div>
              <p className="text-slate-300 leading-normal">
                {planet.interestingFact}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Mass</span>
                <span className="text-white font-medium tabular-nums">{planet.mass}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Surface Gravity</span>
                <span className="text-white font-medium tabular-nums">{planet.gravity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Orbital Year</span>
                <span className="text-white font-medium tabular-nums">{planet.yearLength}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Moons (Satellites)</span>
                <span className="text-white font-medium tabular-nums">{planet.moons}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Axial Tilt</span>
                <span className="text-white font-medium tabular-nums">{planet.tiltDeg}°</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-slate-400">Ratio vs Earth (Size)</span>
                <span className="text-white font-medium tabular-nums">{planet.sizeRatioToEarth}x Earth</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-400 block font-semibold">Surface Features</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">{planet.surfaceFeatures}</p>
            </div>
          </div>
        )}

        {activeTab === 'atmosphere' && (
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-mono uppercase tracking-wider text-[11px] block mb-2">
                Atmospheric Composition
              </span>
              <div className="space-y-1.5">
                {planet.atmosphere.map((gas, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 font-mono">
                    <span className="text-white">{gas}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <span className="text-slate-400 font-mono uppercase tracking-wider text-[11px] block mb-1">
                Internal Structure
              </span>
              <p className="text-slate-300 text-xs leading-relaxed p-2.5 rounded-xl bg-black/40 border border-white/10">
                {planet.composition}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 border-t border-white/10 bg-black/30 flex items-center gap-2">
        <button
          type="button"
          onClick={handleCompare}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Compare Body</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playSelect();
            setSelectedPlanetId(null);
          }}
          className="py-2 px-3 rounded-xl text-xs font-mono font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          Return to Orbit
        </button>
      </div>
    </aside>
  );
};
