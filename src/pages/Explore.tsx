import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Info, RotateCcw, Search, Sparkles } from 'lucide-react';
import { SolarSystemCanvas } from '../scenes/SolarSystemCanvas';
import { SimulationControls } from '../components/SimulationControls';
import { PlanetNavigationDock } from '../components/PlanetNavigationDock';
import { PlanetInfoPanel } from '../components/PlanetInfoPanel';
import { usePlanetarium } from '../context/PlanetariumContext';
import { sound } from '../utils/audio';

export const Explore: React.FC = () => {
  const {
    selectedPlanetId,
    setSelectedPlanetId,
    simulationRunning,
    simulationSpeed,
    showOrbits,
    showLabels,
    showStars,
    setSearchOpen
  } = usePlanetarium();

  const [searchParams] = useSearchParams();

  // If a ?planet= url parameter was supplied, select it
  useEffect(() => {
    const pParam = searchParams.get('planet');
    if (pParam) {
      setSelectedPlanetId(pParam);
    }
  }, [searchParams, setSelectedPlanetId]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-[#05070f] select-none">
      {/* 3D WebGL Canvas Viewport filling 100% */}
      <div className="absolute inset-0 z-0">
        <SolarSystemCanvas
          selectedPlanetId={selectedPlanetId}
          onSelectPlanet={setSelectedPlanetId}
          simulationRunning={simulationRunning}
          simulationSpeed={simulationSpeed}
          showOrbits={showOrbits}
          showLabels={showLabels}
          showStars={showStars}
        />
      </div>

      {/* Floating HUD: Top Left Controls Bar */}
      <div className="absolute top-4 left-4 z-20 pointer-events-auto">
        <SimulationControls />
      </div>

      {/* Floating Top Right: Quick Planet Search & Reset button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSearchOpen(true);
          }}
          className="glass-panel px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 border border-white/15 shadow-xl transition-all cursor-pointer"
          title="Search all planets"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Search Planets</span>
        </button>

        {selectedPlanetId && (
          <button
            type="button"
            onClick={() => {
              sound.playSelect();
              setSelectedPlanetId(null);
            }}
            className="glass-panel px-3 py-2 rounded-xl text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5 border border-cyan-500/30 shadow-xl transition-all cursor-pointer"
            title="Return to global solar system view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </button>
        )}
      </div>

      {/* Floating Bottom Center: Planet Navigation Dock */}
      <div className="absolute bottom-4 inset-x-0 mx-auto z-20 flex justify-center px-4 pointer-events-auto">
        <PlanetNavigationDock />
      </div>

      {/* Selected Planet HUD Panel */}
      <PlanetInfoPanel />

      {/* Ambient subtle touch/mouse gesture guidance helper (fades out or stays quiet in corner) */}
      <div className="hidden lg:flex absolute bottom-4 left-4 z-10 glass-panel px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-slate-400 items-center gap-2 pointer-events-none">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Drag to orbit · Scroll / pinch to zoom · Click planet to inspect</span>
      </div>
    </div>
  );
};
