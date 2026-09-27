import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, RotateCcw, Eye, Scale, Globe, Thermometer, Orbit, Clock, ShieldAlert } from 'lucide-react';
import { PLANETS_DATA, PLANETS_LIST, PlanetData } from '../data/planets';
import { PlanetPreviewCanvas } from '../scenes/PlanetPreviewCanvas';
import { usePlanetarium } from '../context/PlanetariumContext';
import { sound } from '../utils/audio';

export const Compare: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSelectedPlanetId } = usePlanetarium();

  const [planet1Id, setPlanet1Id] = useState<string>(() => searchParams.get('p1') || 'earth');
  const [planet2Id, setPlanet2Id] = useState<string>(() => searchParams.get('p2') || 'mars');

  useEffect(() => {
    const p1 = searchParams.get('p1');
    const p2 = searchParams.get('p2');
    if (p1 && PLANETS_DATA[p1]) setPlanet1Id(p1);
    if (p2 && PLANETS_DATA[p2]) setPlanet2Id(p2);
  }, [searchParams]);

  const p1: PlanetData = PLANETS_DATA[planet1Id] || PLANETS_DATA.earth;
  const p2: PlanetData = PLANETS_DATA[planet2Id] || PLANETS_DATA.mars;

  const handleSwap = () => {
    sound.playClick();
    const temp = planet1Id;
    setPlanet1Id(planet2Id);
    setPlanet2Id(temp);
    setSearchParams({ p1: planet2Id, p2: temp });
  };

  const handleReset = () => {
    sound.playClick();
    setPlanet1Id('earth');
    setPlanet2Id('mars');
    setSearchParams({ p1: 'earth', p2: 'mars' });
  };

  const handleInspect = (id: string) => {
    sound.playSelect();
    setSelectedPlanetId(id);
    navigate(`/explore?planet=${id}`);
  };

  // Comparative calculations
  const maxDiameter = Math.max(p1.diameterKm, p2.diameterKm);
  const p1DiameterPct = (p1.diameterKm / maxDiameter) * 100;
  const p2DiameterPct = (p2.diameterKm / maxDiameter) * 100;

  const maxGravity = Math.max(p1.gravityVal, p2.gravityVal);
  const p1GravityPct = (p1.gravityVal / maxGravity) * 100;
  const p2GravityPct = (p2.gravityVal / maxGravity) * 100;

  return (
    <div className="min-h-screen theme-page py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-2">
          Planetary Laboratory
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
          Compare Celestial Bodies
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Select two worlds to analyze relative physical dimensions, gravitational forces, orbital cycles, and atmospheric environments.
        </p>

        {/* Global Controls: Swap & Reset */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
            <span>Swap Bodies</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Comparison</span>
          </button>
        </div>
      </div>

      {/* Selectors and 3D Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Planet 1 Card */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <label htmlFor="select-planet-1" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Celestial Body #1
              </label>
              <select
                id="select-planet-1"
                aria-label="Select first celestial body to compare"
                value={planet1Id}
                onChange={e => {
                  sound.playClick();
                  setPlanet1Id(e.target.value);
                  setSearchParams({ p1: e.target.value, p2: planet2Id });
                }}
                className="bg-[var(--select-bg)] border border-[var(--border-strong)] text-[var(--select-text)] rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-400"
              >
                {PLANETS_LIST.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                ))}
              </select>
            </div>

            {/* 3D Model Display */}
            <div className="h-56 w-full rounded-xl space-viewport border border-white/5 overflow-hidden mb-4 relative">
              <PlanetPreviewCanvas planetId={p1.id} className="w-full h-full" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p1.color }} />
                <span className="text-lg font-bold font-display text-white">{p1.name}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic mb-3">
              &ldquo;{p1.tagline}&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {p1.description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">{p1.type}</span>
            <button
              type="button"
              onClick={() => handleInspect(p1.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect {p1.name}</span>
            </button>
          </div>
        </div>

        {/* Planet 2 Card */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <label htmlFor="select-planet-2" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Celestial Body #2
              </label>
              <select
                id="select-planet-2"
                aria-label="Select second celestial body to compare"
                value={planet2Id}
                onChange={e => {
                  sound.playClick();
                  setPlanet2Id(e.target.value);
                  setSearchParams({ p1: planet1Id, p2: e.target.value });
                }}
                className="bg-[var(--select-bg)] border border-[var(--border-strong)] text-[var(--select-text)] rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-cyan-400"
              >
                {PLANETS_LIST.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                ))}
              </select>
            </div>

            {/* 3D Model Display */}
            <div className="h-56 w-full rounded-xl space-viewport border border-white/5 overflow-hidden mb-4 relative">
              <PlanetPreviewCanvas planetId={p2.id} className="w-full h-full" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p2.color }} />
                <span className="text-lg font-bold font-display text-white">{p2.name}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic mb-3">
              &ldquo;{p2.tagline}&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {p2.description}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">{p2.type}</span>
            <button
              type="button"
              onClick={() => handleInspect(p2.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect {p2.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Relative Metrics Table & Proportional Bars */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold font-display text-white mb-1">
            Comparative Telemetry Metrics
          </h2>
          <p className="text-xs text-slate-400">
            Proportional data visualizers comparing physical dimensions and orbital periods.
          </p>
        </div>

        {/* 1. Diameter Comparison Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Physical Diameter (km)</span>
            <div className="flex gap-4">
              <span className="text-cyan-400 font-semibold">{p1.name}: {p1.diameter}</span>
              <span className="text-indigo-400 font-semibold">{p2.name}: {p2.diameter}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${p1DiameterPct}%` }}
              />
            </div>
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${p2DiameterPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2. Surface Gravity Comparison Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Surface Gravity (m/s²)</span>
            <div className="flex gap-4">
              <span className="text-cyan-400 font-semibold">{p1.name}: {p1.gravity}</span>
              <span className="text-indigo-400 font-semibold">{p2.name}: {p2.gravity}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${p1GravityPct}%` }}
              />
            </div>
            <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${p2GravityPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Comprehensive Metrics Grid Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3">Metric</th>
                <th className="py-2.5 px-3 text-cyan-300 font-bold">{p1.name}</th>
                <th className="py-2.5 px-3 text-indigo-300 font-bold">{p2.name}</th>
                <th className="py-2.5 px-3 text-slate-500 hidden sm:table-cell">Difference Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3 px-3 text-slate-400">Distance from Sun</td>
                <td className="py-3 px-3 font-semibold text-white">{p1.distanceFromSun}</td>
                <td className="py-3 px-3 font-semibold text-white">{p2.distanceFromSun}</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">
                  {p1.distanceFromSunKm > 0 && p2.distanceFromSunKm > 0
                    ? `${(Math.max(p1.distanceFromSunKm, p2.distanceFromSunKm) / Math.min(p1.distanceFromSunKm, p2.distanceFromSunKm)).toFixed(2)}x`
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-400">Mass (kg)</td>
                <td className="py-3 px-3">{p1.mass}</td>
                <td className="py-3 px-3">{p2.mass}</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">-</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-400">Day Length (Axial)</td>
                <td className="py-3 px-3">{p1.dayLength}</td>
                <td className="py-3 px-3">{p2.dayLength}</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">-</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-400">Orbital Year</td>
                <td className="py-3 px-3">{p1.yearLength}</td>
                <td className="py-3 px-3">{p2.yearLength}</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">
                  {p1.yearLengthDays > 0 && p2.yearLengthDays > 0
                    ? `${(Math.max(p1.yearLengthDays, p2.yearLengthDays) / Math.min(p1.yearLengthDays, p2.yearLengthDays)).toFixed(1)}x`
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-400">Average Temperature</td>
                <td className="py-3 px-3">{p1.temperature}</td>
                <td className="py-3 px-3">{p2.temperature}</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">Δ {Math.abs(p1.avgTempC - p2.avgTempC)}°C</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-400">Confirmed Moons</td>
                <td className="py-3 px-3 font-bold text-white">{p1.moons}</td>
                <td className="py-3 px-3 font-bold text-white">{p2.moons}</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">Δ {Math.abs(p1.moons - p2.moons)} moons</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-slate-400">Axial Tilt</td>
                <td className="py-3 px-3">{p1.tiltDeg}°</td>
                <td className="py-3 px-3">{p2.tiltDeg}°</td>
                <td className="py-3 px-3 text-slate-500 hidden sm:table-cell">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scientific Scale Disclaimer */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-cyan-300">Astronomical Scale Note:</strong> True planetary sizes and interplanetary distances vary by orders of magnitude (for example, the Sun is over 100 times wider than Earth, and Jupiter is over 700 million km away). The interactive solar-system scene uses visual scaling optimized for exploration rather than exact astronomical scale.
          </p>
        </div>
      </div>
    </div>
  );
};
