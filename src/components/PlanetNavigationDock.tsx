import React from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { usePlanetarium } from '../context/PlanetariumContext';
import { PLANETS_LIST } from '../data/planets';
import { sound } from '../utils/audio';

export const PlanetNavigationDock: React.FC = () => {
  const { selectedPlanetId, setSelectedPlanetId, nextPlanet, prevPlanet } = usePlanetarium();

  return (
    <div className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 glass-panel rounded-full border border-white/15 shadow-xl max-w-full overflow-x-auto">
      {/* Prev button */}
      <button
        type="button"
        onClick={prevPlanet}
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        title="Previous body"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Solar System Overview reset */}
      <button
        type="button"
        onClick={() => {
          sound.playSelect();
          setSelectedPlanetId(null);
        }}
        className={`px-2.5 py-1 rounded-full text-xs font-medium font-mono shrink-0 transition-all ${
          selectedPlanetId === null
            ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        Overview
      </button>

      {/* Planet Items */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
        {PLANETS_LIST.map(planet => {
          const isSelected = selectedPlanetId === planet.id;
          return (
            <button
              key={planet.id}
              type="button"
              onClick={() => {
                sound.playSelect();
                setSelectedPlanetId(planet.id);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
                isSelected
                  ? 'bg-white/20 text-white border border-cyan-400/80 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: planet.color }}
              />
              <span className="hidden sm:inline">{planet.name}</span>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={nextPlanet}
        className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        title="Next body"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
