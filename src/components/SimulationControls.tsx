import React, { useState } from 'react';
import { Play, Pause, FastForward, Sliders, Orbit, Tag, Sparkles, GraduationCap, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { usePlanetarium } from '../context/PlanetariumContext';
import { sound } from '../utils/audio';

export const SimulationControls: React.FC = () => {
  const {
    simulationRunning,
    toggleSimulation,
    simulationSpeed,
    setSimulationSpeed,
    showOrbits,
    setShowOrbits,
    showLabels,
    setShowLabels,
    showStars,
    setShowStars,
    scientificMode,
    setScientificMode,
    setSelectedPlanetId
  } = usePlanetarium();

  const [expanded, setExpanded] = useState(false);
  const speeds = [0.25, 0.5, 1, 2, 5, 10];

  return (
    <div className="glass-panel rounded-2xl border border-white/15 shadow-2xl p-2.5 sm:p-3 text-white transition-all max-w-sm">
      {/* Top summary row: Play/Pause, current speed, and expand toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={toggleSimulation}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              simulationRunning
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
            }`}
            title={simulationRunning ? 'Pause simulation' : 'Resume simulation'}
          >
            {simulationRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="font-mono text-xs">{simulationRunning ? 'RUN' : 'PAUSED'}</span>
          </button>

          {/* Quick Speed Cycle */}
          <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10">
            {speeds.slice(1, 5).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSimulationSpeed(s)}
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  simulationSpeed === s
                    ? 'bg-white/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Expand / Collapse settings */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setExpanded(!expanded);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Toggle advanced simulation controls"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Controls Drawer */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/10 space-y-3 animate-in fade-in duration-150">
          {/* Full Speed Selector */}
          <div>
            <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider block mb-1.5">
              Simulation Velocity
            </span>
            <div className="grid grid-cols-6 gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
              {speeds.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSimulationSpeed(s)}
                  className={`py-1 text-xs font-mono rounded text-center transition-all ${
                    simulationSpeed === s
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Display & Physics Toggles */}
          <div>
            <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider block mb-1.5">
              Visual Overlays
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {/* Orbits Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowOrbits(prev => !prev);
                }}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  showOrbits
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Orbit className="w-3.5 h-3.5" />
                  Orbits
                </span>
                <span className="text-[10px]">{showOrbits ? 'ON' : 'OFF'}</span>
              </button>

              {/* Labels Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowLabels(prev => !prev);
                }}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  showLabels
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Labels
                </span>
                <span className="text-[10px]">{showLabels ? 'ON' : 'OFF'}</span>
              </button>

              {/* Stars Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowStars(prev => !prev);
                }}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  showStars
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Starfield
                </span>
                <span className="text-[10px]">{showStars ? 'ON' : 'OFF'}</span>
              </button>

              {/* Scientific Mode Toggle */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setScientificMode(prev => !prev);
                }}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  scientificMode
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Sci Mode
                </span>
                <span className="text-[10px]">{scientificMode ? 'ACTIVE' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Reset Camera button */}
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              setSelectedPlanetId(null);
            }}
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-mono font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            Reset Camera to Solar System
          </button>
        </div>
      )}
    </div>
  );
};
