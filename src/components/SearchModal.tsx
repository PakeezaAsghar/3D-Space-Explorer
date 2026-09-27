import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { usePlanetarium } from '../context/PlanetariumContext';
import { PLANETS_LIST, PlanetData } from '../data/planets';
import { sound } from '../utils/audio';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setSelectedPlanetId } = usePlanetarium();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [searchOpen]);

  const filteredPlanets = PLANETS_LIST.filter(planet => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      planet.name.toLowerCase().includes(q) ||
      planet.type.toLowerCase().includes(q) ||
      planet.description.toLowerCase().includes(q)
    );
  });

  const handleSelect = (planet: PlanetData) => {
    sound.playSelect();
    setSelectedPlanetId(planet.id);
    setSearchOpen(false);
    navigate('/explore');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredPlanets.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredPlanets.length) % Math.max(1, filteredPlanets.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredPlanets[selectedIndex]) {
        handleSelect(filteredPlanets[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  if (!searchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Planet search dialog"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-xl glass-panel rounded-2xl border border-white/15 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search planets, moons, or star (e.g. Mars, Gas Giant, Ring)..."
            className="w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="px-2 py-1 text-xs font-mono text-slate-400 border border-white/10 rounded hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredPlanets.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No celestial bodies found matching &ldquo;<span className="text-white">{query}</span>&rdquo;
            </div>
          ) : (
            filteredPlanets.map((planet, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={planet.id}
                  onClick={() => handleSelect(planet)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/20 border border-cyan-500/40 text-white'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/20 shadow-inner"
                      style={{ backgroundColor: planet.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm font-display text-white">{planet.name}</span>
                        <span className="text-xs text-slate-400">· {planet.type}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{planet.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="hidden sm:block text-xs font-mono text-slate-400 tabular-nums">
                      {planet.diameter}
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/20 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with ↑↓, Select with Enter</span>
          <span>{filteredPlanets.length} results</span>
        </div>
      </div>
    </div>
  );
};
