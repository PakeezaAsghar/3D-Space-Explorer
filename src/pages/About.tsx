import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Code, Orbit, Globe, Sparkles, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const About: React.FC = () => {
  const techStack = [
    { name: 'Three.js / WebGL', role: 'Real-time 3D planetary rendering, geometries, and lighting' },
    { name: 'React 19 & TypeScript', role: 'Component lifecycle, typed data structures, and state management' },
    { name: 'Procedural Texture Synthesizer', role: 'In-memory canvas shaders for realistic 2K planetary surfaces' },
    { name: 'Web Audio API', role: 'Synthesizer generating ambient space resonance and haptic audio cues' },
    { name: 'OrbitControls & Raycasting', role: 'Camera choreography, fly-to lerp transitions, and touch interactions' },
    { name: 'Tailwind CSS v4', role: 'Glassmorphism interface design and responsive viewport layouts' }
  ];

  return (
    <div className="min-h-screen theme-page py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title & Mission Statement */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-2">
          Project Overview & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white mb-6 uppercase text-balance">
          The Universe is Better When You Can Explore It
        </h1>
        <p className="text-base text-slate-300 leading-relaxed font-sans text-balance">
          Space Explorer is an interactive digital planetarium engineered to bridge the gap between static textbook diagrams and dynamic cosmic mechanics.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="space-y-12">
        <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Orbit className="w-5 h-5 text-cyan-400" />
            <span>Why Build an Interactive Planetarium?</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Astronomy is inherently three-dimensional and time-dependent. Traditional two-dimensional depictions fail to convey how axial obliquity creates seasons, how orbital speed varies proportionally to solar distance, or how razor-thin Saturn’s rings appear from different vantage points. By placing real-time WebGL controls in the hands of learners, users develop an intuitive grasp of celestial mechanics.
          </p>
        </div>

        {/* 3D WebGL Implementation Architecture */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>3D Engine Architecture & Realism</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
              <span className="text-cyan-300 font-bold block">Physical Geometries & Rings</span>
              <p className="text-slate-400 font-sans text-xs">
                Utilizes Three.js SphereGeometry and RingGeometry with custom UV mapping for Saturn’s concentric Cassini divisions and Earth’s dual-layer atmosphere.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
              <span className="text-cyan-300 font-bold block">Fly-To Camera Choreography</span>
              <p className="text-slate-400 font-sans text-xs">
                Spherical linear interpolation (lerp) smoothly transitions the camera view and focus target toward any selected body without abrupt cuts.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
              <span className="text-cyan-300 font-bold block">Procedural Surface Synthesis</span>
              <p className="text-slate-400 font-sans text-xs">
                Generates high-fidelity 2K diffuse and cloud alpha maps directly via canvas noise and trigonometric equations, eliminating fragile external image links.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
              <span className="text-cyan-300 font-bold block">Raycasting & Screen Projections</span>
              <p className="text-slate-400 font-sans text-xs">
                Real-time raycaster enables hover feedback and touch detection across desktop and mobile, with 2D label coordinates projected from 3D space.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <span>Core Technology Stack</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold text-white block">{tech.name}</span>
                  <span className="text-[11px] text-slate-400">{tech.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Scale Disclosure & Astronomical Data Sources */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <span>Astronomical Data & Scale Calibration</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All planetary statistics—including diameters, orbital periods, surface gravities, and atmospheric compositions—are sourced from published telemetry by the <strong>NASA Jet Propulsion Laboratory (JPL) Solar System Dynamics Group</strong> and the <strong>European Space Agency (ESA)</strong>.
          </p>
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-xs text-slate-400">
            <strong className="text-cyan-300">Scale Clarification:</strong> In true astronomical scale, the distance between planets is immense compared to their physical diameters (for instance, the Sun is 150 million km from Earth, and Neptune is 4.5 billion km away). To make all bodies visible and interactive simultaneously, planetary radii and orbital distances use an optimized logarithmic visual scale.
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-6">
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
