import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { usePlanetarium } from '../context/PlanetariumContext';
import { SpaceExplorerLogo } from './QuasarLogo';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    setSearchOpen
  } = usePlanetarium();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/planets', label: 'Planets' },
    { to: '/compare', label: 'Compare' },
    { to: '/learn', label: 'Learn' },
    { to: '/about', label: 'About' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#05070f]/95 shadow-2xl shadow-black/60 border-b border-white/15 backdrop-blur-xl'
          : 'bg-[#05070f]/90 border-b border-white/10 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Space Explorer Logo */}
        <Link
          to="/"
          className="flex items-center group focus:outline-none"
          aria-label="Space Explorer Home"
        >
          <SpaceExplorerLogo size="md" />
        </Link>

        {/* Zone 2: Clean text navigation links with active indicator */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`transition-colors py-2 relative text-sm ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Zone 3: Utility actions: Search, Theme, Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen(true);
            }}
            className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Search planets (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'light'}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Moon className="w-3.5 h-3.5 fill-slate-200 text-slate-200" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </NavLink>
            );
          })}

          {/* Mobile Drawer Theme Toggle Item */}
          <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Interface Theme</span>
            <button
              type="button"
              onClick={() => {
                toggleTheme();
              }}
              aria-pressed={theme === 'light'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-cyan-400/50 cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
