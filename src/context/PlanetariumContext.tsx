import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PLANETS_LIST, MAJOR_PLANETS_LIST, PlanetData } from '../data/planets';
import { sound } from '../utils/audio';

export interface PlanetariumContextType {
  selectedPlanetId: string | null;
  setSelectedPlanetId: (id: string | null) => void;
  simulationRunning: boolean;
  setSimulationRunning: (running: boolean) => void;
  toggleSimulation: () => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  showOrbits: boolean;
  setShowOrbits: (val: boolean | ((prev: boolean) => boolean)) => void;
  showLabels: boolean;
  setShowLabels: (val: boolean | ((prev: boolean) => boolean)) => void;
  showStars: boolean;
  setShowStars: (val: boolean | ((prev: boolean) => boolean)) => void;
  scientificMode: boolean;
  setScientificMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  toggleSound: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  nextPlanet: () => void;
  prevPlanet: () => void;
}

const PlanetariumContext = createContext<PlanetariumContextType | null>(null);

export const PlanetariumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlanetId, setSelectedPlanetIdState] = useState<string | null>(null);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeedState] = useState<number>(() => {
    const saved = localStorage.getItem('space_sim_speed');
    return saved ? parseFloat(saved) : 1;
  });
  const [showOrbits, setShowOrbits] = useState<boolean>(() => {
    const saved = localStorage.getItem('space_show_orbits');
    return saved !== null ? saved === 'true' : true;
  });
  const [showLabels, setShowLabels] = useState<boolean>(() => {
    const saved = localStorage.getItem('space_show_labels');
    return saved !== null ? saved === 'true' : true;
  });
  const [showStars, setShowStars] = useState<boolean>(() => {
    const saved = localStorage.getItem('space_show_stars');
    return saved !== null ? saved === 'true' : true;
  });
  const [scientificMode, setScientificMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('space_scientific_mode');
    return saved === 'true';
  });
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    return !sound.getIsMuted();
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme') || localStorage.getItem('space_theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Sync theme with HTML data-theme and class
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
    localStorage.setItem('space_theme', theme);
  }, [theme]);

  // Persist preference states
  const setSelectedPlanetId = useCallback((id: string | null) => {
    setSelectedPlanetIdState(id);
  }, []);

  const setSimulationSpeed = useCallback((speed: number) => {
    setSimulationSpeedState(speed);
    localStorage.setItem('space_sim_speed', speed.toString());
    sound.playClick();
  }, []);

  const toggleSimulation = useCallback(() => {
    setSimulationRunning(prev => {
      sound.playClick();
      return !prev;
    });
  }, []);

  const toggleSound = useCallback(() => {
    const newMuted = sound.toggleMute();
    setSoundEnabledState(!newMuted);
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    sound.setMuted(!enabled);
    setSoundEnabledState(enabled);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      sound.playClick();
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, []);

  // Sync preference storage
  useEffect(() => {
    localStorage.setItem('space_show_orbits', showOrbits.toString());
  }, [showOrbits]);

  useEffect(() => {
    localStorage.setItem('space_show_labels', showLabels.toString());
  }, [showLabels]);

  useEffect(() => {
    localStorage.setItem('space_show_stars', showStars.toString());
  }, [showStars]);

  useEffect(() => {
    localStorage.setItem('space_scientific_mode', scientificMode.toString());
  }, [scientificMode]);

  // Planet previous / next navigation cycle
  const navSequence = PLANETS_LIST.map(p => p.id);

  const nextPlanet = useCallback(() => {
    sound.playSelect();
    if (!selectedPlanetId) {
      setSelectedPlanetId(navSequence[0]);
      return;
    }
    const idx = navSequence.indexOf(selectedPlanetId);
    const nextIdx = (idx + 1) % navSequence.length;
    setSelectedPlanetId(navSequence[nextIdx]);
  }, [selectedPlanetId, navSequence, setSelectedPlanetId]);

  const prevPlanet = useCallback(() => {
    sound.playSelect();
    if (!selectedPlanetId) {
      setSelectedPlanetId(navSequence[navSequence.length - 1]);
      return;
    }
    const idx = navSequence.indexOf(selectedPlanetId);
    const prevIdx = (idx - 1 + navSequence.length) % navSequence.length;
    setSelectedPlanetId(navSequence[prevIdx]);
  }, [selectedPlanetId, navSequence, setSelectedPlanetId]);

  // Global keyboard shortcut for search Cmd/Ctrl + K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PlanetariumContext.Provider
      value={{
        selectedPlanetId,
        setSelectedPlanetId,
        simulationRunning,
        setSimulationRunning,
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
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        theme,
        toggleTheme,
        searchOpen,
        setSearchOpen,
        nextPlanet,
        prevPlanet
      }}
    >
      {children}
    </PlanetariumContext.Provider>
  );
};

export const usePlanetarium = (): PlanetariumContextType => {
  const ctx = useContext(PlanetariumContext);
  if (!ctx) {
    throw new Error('usePlanetarium must be used within a PlanetariumProvider');
  }
  return ctx;
};
