import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Globe, 
  Cpu, 
  Volume2, 
  Play, 
  Activity, 
  Info, 
  RefreshCw,
  Orbit,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audio';
import astronautEarthImg from '../assets/images/astronaut_earth_1790504379476.jpg';

type PlaygroundTab = 'textures' | 'acoustics' | 'lerp';
type TexturePreset = 'gas-giant' | 'terrestrial' | 'solar-plasma' | 'ice-world';

interface ScalePlanet {
  name: string;
  distanceAU: number;
  realDistanceKm: string;
  lightTime: string;
  diameterKm: string;
  color: string;
}

const SCALE_PLANETS: ScalePlanet[] = [
  { name: 'Mercury', distanceAU: 0.39, realDistanceKm: '57.9 Million km', lightTime: '3.2 minutes', diameterKm: '4,879 km', color: '#a3a3a3' },
  { name: 'Venus', distanceAU: 0.72, realDistanceKm: '108.2 Million km', lightTime: '6.0 minutes', diameterKm: '12,104 km', color: '#eab308' },
  { name: 'Earth', distanceAU: 1.00, realDistanceKm: '149.6 Million km', lightTime: '8.3 minutes', diameterKm: '12,742 km', color: '#38bdf8' },
  { name: 'Mars', distanceAU: 1.52, realDistanceKm: '227.9 Million km', lightTime: '12.6 minutes', diameterKm: '6,779 km', color: '#f97316' },
  { name: 'Jupiter', distanceAU: 5.20, realDistanceKm: '778.6 Million km', lightTime: '43.2 minutes', diameterKm: '139,820 km', color: '#fb923c' },
  { name: 'Saturn', distanceAU: 9.58, realDistanceKm: '1.43 Billion km', lightTime: '1.3 hours', diameterKm: '116,460 km', color: '#fde047' },
  { name: 'Uranus', distanceAU: 19.22, realDistanceKm: '2.87 Billion km', lightTime: '2.7 hours', diameterKm: '50,724 km', color: '#22d3ee' },
  { name: 'Neptune', distanceAU: 30.05, realDistanceKm: '4.50 Billion km', lightTime: '4.1 hours', diameterKm: '49,244 km', color: '#60a5fa' }
];

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('textures');
  const [texturePreset, setTexturePreset] = useState<TexturePreset>('gas-giant');
  const [noiseScale, setNoiseScale] = useState<number>(30);
  const [textureSeed, setTextureSeed] = useState<number>(1);
  const [selectedScaleIndex, setSelectedScaleIndex] = useState<number>(2); // Earth
  const [scaleMode, setScaleMode] = useState<'logarithmic' | 'true'>('logarithmic');
  
  // Audio playground state
  const [activeTone, setActiveTone] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentOscRef = useRef<OscillatorNode | null>(null);

  // Canvas ref for procedural texture preview
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lerp simulation state
  const [lerpSpeed, setLerpSpeed] = useState<number>(0.05);
  const [simCameraPos, setSimCameraPos] = useState<number>(10);
  const [simTargetPos, setSimTargetPos] = useState<number>(80);

  // Procedural texture canvas renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Procedural surface synthesis using trigonometric functions & noise approximations
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const nx = (x / width) * (noiseScale / 5) + textureSeed * 0.5;
        const ny = (y / height) * (noiseScale / 5) + textureSeed * 0.5;

        let r = 0, g = 0, b = 0;

        if (texturePreset === 'gas-giant') {
          // Horizontal zonal flow with turbulence
          const bands = Math.sin(ny * 8 + Math.cos(nx * 4) * 1.5);
          const swirl = Math.sin(nx * 6 + ny * 6);
          const v = (bands + swirl + 2) / 4;
          r = Math.floor(180 + v * 70);
          g = Math.floor(110 + v * 90);
          b = Math.floor(70 + v * 60);
        } else if (texturePreset === 'solar-plasma') {
          // Turbulent solar convection cells
          const cell1 = Math.sin(nx * 12) * Math.cos(ny * 12);
          const cell2 = Math.sin(nx * 24 + cell1 * 4) * Math.cos(ny * 24);
          const v = Math.abs(cell1 * 0.6 + cell2 * 0.4);
          r = Math.floor(220 + v * 35);
          g = Math.floor(80 + v * 140);
          b = Math.floor(10 + v * 40);
        } else if (texturePreset === 'terrestrial') {
          // Continental landmasses and blue oceanic basins
          const elevation = (Math.sin(nx * 3) + Math.cos(ny * 3) + Math.sin(nx * 7 + ny * 5) * 0.5 + 2.5) / 5;
          if (elevation < 0.48) {
            // Ocean
            r = Math.floor(15 + elevation * 40);
            g = Math.floor(45 + elevation * 90);
            b = Math.floor(140 + elevation * 110);
          } else if (elevation < 0.52) {
            // Coastline
            r = 194; g = 178; b = 128;
          } else {
            // Continental crust
            r = Math.floor(40 + elevation * 100);
            g = Math.floor(90 + elevation * 110);
            b = Math.floor(40 + elevation * 50);
          }
        } else {
          // Ice world: fracture ridges and crystalline cyan sheets
          const ridge = Math.abs(Math.sin(nx * 10 + Math.cos(ny * 8) * 3));
          const v = (ridge + Math.sin(ny * 5) + 2) / 4;
          r = Math.floor(140 + v * 100);
          g = Math.floor(210 + v * 45);
          b = Math.floor(235 + v * 20);
        }

        data[index] = Math.min(255, Math.max(0, r));
        data[index + 1] = Math.min(255, Math.max(0, g));
        data[index + 2] = Math.min(255, Math.max(0, b));
        data[index + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [texturePreset, noiseScale, textureSeed]);

  // Animated Lerp visual demonstration
  useEffect(() => {
    let animId: number;
    const updateLerp = () => {
      setSimCameraPos(prev => {
        const diff = simTargetPos - prev;
        if (Math.abs(diff) < 0.1) return simTargetPos;
        return prev + diff * lerpSpeed;
      });
      animId = requestAnimationFrame(updateLerp);
    };
    animId = requestAnimationFrame(updateLerp);
    return () => cancelAnimationFrame(animId);
  }, [simTargetPos, lerpSpeed]);

  // Audio tone synthesizer function
  const playHarmonicFrequency = (name: string, freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous
      if (currentOscRef.current) {
        currentOscRef.current.stop();
        currentOscRef.current.disconnect();
        currentOscRef.current = null;
      }

      if (activeTone === name) {
        setActiveTone(null);
        return;
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      currentOscRef.current = osc;
      setActiveTone(name);

      setTimeout(() => {
        if (activeTone === name) setActiveTone(null);
      }, 1800);
    } catch {
      // Audio blocked or unsupported
    }
  };

  const planetaryResonances = [
    { name: 'Sun', freq: 126.22, note: 'B2 (-32 cents)', desc: 'Fundamental solar rotational period translated into audible acoustic octaves' },
    { name: 'Earth (Year)', freq: 136.10, note: 'C#3 (-13 cents)', desc: 'The "Om" frequency representing Earth’s 365.25-day heliocentric orbit' },
    { name: 'Mars', freq: 144.72, note: 'D3 (+2 cents)', desc: 'Acoustic translation of Mars’ 686.98-day orbital revolution' },
    { name: 'Jupiter', freq: 183.58, note: 'F#3 (+38 cents)', desc: 'Harmonic resonance derived from Jupiter’s 11.86-year orbital period' },
    { name: 'Saturn', freq: 147.85, note: 'D3 (+39 cents)', desc: 'The golden ring tone derived from Saturn’s 29.46-year solar voyage' }
  ];

  const currentPlanet = SCALE_PLANETS[selectedScaleIndex];

  return (
    <div className="min-h-screen theme-page pb-16 space-y-12">
      {/* Seamless Top Hero Section - Integral part of the page, not a boxed card */}
      <section className="relative w-full overflow-hidden bg-slate-950 border-b border-white/10">
        {/* Background Image: Astronaut looking out at Planet Earth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={astronautEarthImg}
            alt="Astronaut in modern spacesuit gazing toward planet Earth in deep space"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right opacity-90 sm:opacity-95"
          />
          {/* Subtle multi-layer gradients for seamless blending into the page */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 via-55% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Content Container aligned with site width */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-16 sm:pb-20">
          <div className="max-w-3xl space-y-6">
            {/* Tagline */}
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
              ABOUT US
            </span>

            {/* Main Cinematic Heading */}
            <h1 
              className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight hero-title-white !text-white uppercase leading-tight"
              style={{ color: '#ffffff' }}
            >
              THE UNIVERSE IS BETTER <br className="hidden sm:inline" />
              WHEN YOU CAN <span className="text-cyan-400">EXPLORE IT.</span>
            </h1>

            {/* Paragraph description */}
            <p 
              className="text-sm sm:text-base hero-subtitle-white !text-slate-200 leading-relaxed font-sans max-w-2xl"
              style={{ color: 'rgba(255, 255, 255, 0.92)' }}
            >
              Space Explorer is an interactive digital planetarium that brings the solar system to your screen. Explore real 3D planets, learn fascinating facts, and discover the wonders of our cosmic neighborhood.
            </p>

            {/* 3 Feature Cards matching the reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {/* Card 1 */}
              <div className="p-4 rounded-2xl border border-cyan-500/25 bg-slate-950/75 backdrop-blur-md flex items-center gap-3.5 hover:border-cyan-400/50 transition-colors shadow-lg">
                <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                  <Orbit className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold !text-white" style={{ color: '#ffffff' }}>3D Exploration</h3>
                  <p className="text-[11px] !text-slate-300 leading-snug" style={{ color: '#cbd5e1' }}>Interactive 3D models with real physics</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl border border-cyan-500/25 bg-slate-950/75 backdrop-blur-md flex items-center gap-3.5 hover:border-cyan-400/50 transition-colors shadow-lg">
                <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold !text-white" style={{ color: '#ffffff' }}>Educational</h3>
                  <p className="text-[11px] !text-slate-300 leading-snug" style={{ color: '#cbd5e1' }}>Accurate, engaging scientific information.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl border border-cyan-500/25 bg-slate-950/75 backdrop-blur-md flex items-center gap-3.5 hover:border-cyan-400/50 transition-colors shadow-lg">
                <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold !text-white" style={{ color: '#ffffff' }}>Built with Modern Tech</h3>
                  <p className="text-[11px] !text-slate-300 leading-snug" style={{ color: '#cbd5e1' }}>Fast, responsive and beautifully designed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections (Labs & Scale calibration) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Interactive Architecture Playground */}
        <div className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 bg-slate-950/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Interactive Engine Architecture Lab</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Interact with the live subsystems that power Quasar under the hood.
            </p>
          </div>

          {/* Playground Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('textures');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'textures'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Surface Synthesis
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('acoustics');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'acoustics'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cosmic Acoustics
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('lerp');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'lerp'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Camera Lerp
            </button>
          </div>
        </div>

        {/* Tab 1: Procedural Surface Synthesis Live Canvas */}
        {activeTab === 'textures' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Live Canvas Shader Preview (180x120px)
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTextureSeed(prev => prev + 1);
                  }}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-cyan-300 bg-white/10 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-cyan-400" />
                  <span>Randomize Seed #{textureSeed}</span>
                </button>
              </div>

              {/* Live Canvas Output */}
              <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-black shadow-inner flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={180}
                  height={120}
                  className="w-full h-full object-cover rendering-pixelated"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-cyan-300 backdrop-blur-sm">
                  Active Surface: {texturePreset}
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than loading hundreds of megabytes of static images over slow networks, our engine synthesizes planetary surfaces using mathematical noise equations directly in memory.
              </p>
            </div>

            {/* Interactive Shader Controls */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <h3 className="text-sm font-bold font-display text-white">
                Surface Algorithm Controls
              </h3>

              {/* Preset Selector */}
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">
                  Planet Composition Preset:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['gas-giant', 'solar-plasma', 'terrestrial', 'ice-world'] as TexturePreset[]).map(preset => (
                    <button
                      key={preset}
                      onClick={() => {
                        sound.playClick();
                        setTexturePreset(preset);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-mono capitalize transition-all cursor-pointer border text-left ${
                        texturePreset === preset
                          ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 shadow-sm'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {preset.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Turbulence / Frequency Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Harmonic Turbulence Scale:</span>
                  <span className="text-cyan-400 font-bold">{noiseScale}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={noiseScale}
                  onChange={e => setNoiseScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Broad Formations</span>
                  <span>Micro-Cratering</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cosmic Acoustics & Web Audio API */}
        {activeTab === 'acoustics' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                The vacuum of space carries no direct acoustic vibrations, but every rotating celestial body exhibits characteristic orbital periods. Hans Cousto’s <em>Law of the Cosmic Octave</em> transposes these orbital cycles into audible sound waves. Click any body to synthesize its tone:
              </p>
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                <Volume2 className="w-4 h-4" />
                <span>Web Audio API Sine Engine</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {planetaryResonances.map(body => {
                const isPlaying = activeTone === body.name;
                return (
                  <button
                    key={body.name}
                    onClick={() => playHarmonicFrequency(body.name, body.freq)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isPlaying
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/20'
                        : 'border-white/10 bg-white/5 hover:border-cyan-500/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold font-display text-white">
                        {body.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                        {body.freq} Hz
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                      {body.desc}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
                      <span>Note: {body.note}</span>
                      <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isPlaying ? 'Synthesizing...' : 'Play Frequency'}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Camera Lerp Choreography */}
        {activeTab === 'lerp' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-display text-white">
                Spherical Linear Interpolation (Lerp)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When focusing on distant planets across millions of kilometers, abrupt camera cuts disorient the observer. Our camera controller uses exponential decay damping:
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-cyan-300">
                camera.position.lerp(targetVector, alphaFactor);
              </div>
              <p className="text-xs text-slate-400">
                Current Camera Value: <strong className="text-white font-mono">{simCameraPos.toFixed(1)}%</strong> | Target Destination: <strong className="text-cyan-400 font-mono">{simTargetPos}%</strong>
              </p>
            </div>

            {/* Interactive Visual Lerp Track */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-5">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-3">
                  Click destination to test fly-to transition:
                </span>
                <div className="flex items-center gap-2">
                  {[15, 45, 80].map(pos => (
                    <button
                      key={pos}
                      onClick={() => {
                        sound.playClick();
                        setSimTargetPos(pos);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        simTargetPos === pos
                          ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Target {pos}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Track visualizer */}
              <div className="relative h-8 bg-black/60 rounded-xl border border-white/15 overflow-hidden flex items-center px-2">
                {/* Target flag */}
                <div
                  className="absolute top-1 bottom-1 w-1 bg-cyan-400 rounded transition-all"
                  style={{ left: `${simTargetPos}%` }}
                />
                {/* Camera indicator */}
                <div
                  className="absolute top-1.5 bottom-1.5 w-5 h-5 -translate-x-1/2 rounded-full bg-amber-400 shadow-md flex items-center justify-center text-[9px] font-bold text-slate-950 transition-all pointer-events-none"
                  style={{ left: `${simCameraPos}%` }}
                >
                  CAM
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Damping Factor (Alpha):</span>
                  <span className="text-cyan-400 font-bold">{lerpSpeed}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={lerpSpeed}
                  onChange={e => setLerpSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>Cinematic & Slow</span>
                  <span>Instant & Snappy</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Scale Comparison Lab */}
      <div className="glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 bg-slate-950/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>Interactive Astronomical Scale Calibration</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Understand why digital planetariums must balance mathematical fidelity with perceptual visibility.
            </p>
          </div>

          {/* Scale mode toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setScaleMode('logarithmic');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                scaleMode === 'logarithmic'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Planetarium Log Scale
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setScaleMode('true');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                scaleMode === 'true'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              True NASA JPL Scale
            </button>
          </div>
        </div>

        {/* Planet Distance Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {SCALE_PLANETS.map((planet, idx) => (
            <button
              key={planet.name}
              onClick={() => {
                sound.playClick();
                setSelectedScaleIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                selectedScaleIndex === idx
                  ? 'border-amber-400 bg-amber-950/40 text-amber-300 font-bold shadow-sm'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: planet.color }}
              />
              <span>{planet.name}</span>
            </button>
          ))}
        </div>

        {/* Live Planetary Distance Telemetry Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
          <div>
            <span className="text-[11px] font-mono text-slate-500 block">Distance from Sun (AU)</span>
            <span className="text-base font-bold font-mono text-white">{currentPlanet.distanceAU} AU</span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 block">Metric Distance (km)</span>
            <span className="text-base font-bold font-mono text-cyan-300">{currentPlanet.realDistanceKm}</span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 block">Photon Travel Time</span>
            <span className="text-base font-bold font-mono text-amber-300">{currentPlanet.lightTime}</span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-500 block">Physical Diameter</span>
            <span className="text-base font-bold font-mono text-emerald-300">{currentPlanet.diameterKm}</span>
          </div>
        </div>

        {/* Informational callout regarding scale discrepancy */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block mb-1">
              {scaleMode === 'logarithmic' ? 'Active: Visual Logarithmic Projection' : 'Notice on True Astronomical Scale:'}
            </strong>
            <p className="text-slate-400 leading-relaxed">
              {scaleMode === 'logarithmic'
                ? 'In Quasar’s default interactive view, orbital radii expand logarithmically so all 8 worlds can be inspected simultaneously on screen. Without this calibration, Mercury would be invisible next to the Sun, while Neptune would be over 3,000 screen-widths away!'
                : 'At 100% true physical scale, over 99.99999999% of the solar system is pure vacuum. If Earth were the size of a marble (1 cm), the Sun would be 109 meters away, and Neptune would be over 3.3 kilometers away in total darkness.'}
            </p>
          </div>
        </div>
      </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            to="/explore"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>LAUNCH DIGITAL PLANETARIUM</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
