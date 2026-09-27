import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Scale, Eye, Globe, Orbit, Thermometer, Clock } from 'lucide-react';
import { PLANETS_LIST, PlanetData } from '../data/planets';
import { PlanetPreviewCanvas } from '../scenes/PlanetPreviewCanvas';
import { usePlanetarium } from '../context/PlanetariumContext';
import { sound } from '../utils/audio';

export const Planets: React.FC = () => {
  const { setSelectedPlanetId } = usePlanetarium();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'terrestrial' | 'gas' | 'ice' | 'other'>('all');

  const filteredPlanets = PLANETS_LIST.filter(planet => {
    if (filter === 'all') return true;
    if (filter === 'terrestrial') return planet.type === 'Terrestrial Planet';
    if (filter === 'gas') return planet.type === 'Gas Giant';
    if (filter === 'ice') return planet.type === 'Ice Giant';
    if (filter === 'other') return planet.type === 'Star' || planet.type === 'Natural Satellite';
    return true;
  });

  const handleInspect = (id: string) => {
    sound.playSelect();
    setSelectedPlanetId(id);
    navigate(`/explore?planet=${id}`);
  };

  const handleCompare = (id: string) => {
    sound.playClick();
    navigate(`/compare?p1=${id}`);
  };

  return (
    <div className="min-h-screen theme-page py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-2">
          Astronomical Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
          Worlds of the Solar System
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          From the fiery corona of our central star to the supersonic icy methane winds of Neptune, inspect every celestial body in real-time 3D.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 glass-panel rounded-2xl max-w-lg mx-auto border border-white/10">
          {[
            { id: 'all', label: 'All Bodies' },
            { id: 'terrestrial', label: 'Terrestrial' },
            { id: 'gas', label: 'Gas Giants' },
            { id: 'ice', label: 'Ice Giants' },
            { id: 'other', label: 'Sun & Moon' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter(tab.id as typeof filter);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Planets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlanets.map(planet => (
          <div
            key={planet.id}
            className="group glass-panel rounded-2xl border border-white/10 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div>
              {/* 3D Interactive Canvas Box */}
              <div className="h-52 w-full rounded-xl space-viewport border border-white/5 overflow-hidden mb-4 relative">
                <PlanetPreviewCanvas planetId={planet.id} className="w-full h-full" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-slate-400 border border-white/10">
                  INTERACTIVE 3D
                </span>
              </div>

              {/* Title & Type */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: planet.color }}
                  />
                  <h2 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {planet.name}
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {planet.type}
                </span>
              </div>

              <p className="text-xs italic text-cyan-400/90 mb-2 font-medium">
                &ldquo;{planet.tagline}&rdquo;
              </p>

              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {planet.description}
              </p>

              {/* Stats Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono py-3 border-y border-white/10 mb-4 bg-black/20 rounded-xl px-2.5">
                <div>
                  <span className="text-[10px] text-slate-500 block">DIAMETER</span>
                  <span className="text-slate-200 tabular-nums">{planet.diameter}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">GRAVITY</span>
                  <span className="text-slate-200 tabular-nums">{planet.gravity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ORBITAL YEAR</span>
                  <span className="text-slate-200 tabular-nums">{planet.yearLength}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">AVG TEMP</span>
                  <span className="text-slate-200 tabular-nums">{planet.temperature}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleInspect(planet.id)}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect in 3D</span>
              </button>

              <button
                type="button"
                onClick={() => handleCompare(planet.id)}
                className="p-2.5 rounded-xl text-xs font-mono text-slate-300 glass-panel hover:bg-white/10 border border-white/20 transition-colors cursor-pointer"
                title={`Compare ${planet.name}`}
              >
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
