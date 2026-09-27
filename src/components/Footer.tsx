import React from 'react';
import { Link } from 'react-router-dom';
import { QuasarLogo } from './QuasarLogo';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--footer-bg)] text-[var(--text-secondary)] text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link
              to="/"
              onClick={() => sound.playClick()}
              className="inline-flex items-center group focus:outline-none"
              aria-label="Quasar Home"
            >
              <QuasarLogo size="md" subtitle="3D Digital Planetarium" />
            </Link>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              An interactive 3D digital planetarium designed for students, educators, and space enthusiasts to inspect the planets of our solar system with real-time WebGL rendering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider block mb-2">
              Exploration
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/explore" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition-colors">
                  Digital Planetarium
                </Link>
              </li>
              <li>
                <Link to="/planets" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition-colors">
                  Planet Catalog
                </Link>
              </li>
              <li>
                <Link to="/compare" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition-colors">
                  Planet Comparator
                </Link>
              </li>
              <li>
                <Link to="/learn" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition-colors">
                  Educational Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Info */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider block mb-2">
              Project
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/about" onClick={() => sound.playClick()} className="hover:text-cyan-400 transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <div className="font-mono text-slate-400">
            &copy; 2026 QUASAR · Space Explorer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
