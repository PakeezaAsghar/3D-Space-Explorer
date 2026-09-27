/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PlanetariumProvider } from './context/PlanetariumContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Planets } from './pages/Planets';
import { Compare } from './pages/Compare';
import { Learn } from './pages/Learn';
import { About } from './pages/About';

function AppLayout() {
  const location = useLocation();
  const isExplorePage = location.pathname === '/explore';

  return (
    <div className="min-h-screen flex flex-col transition-colors selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isExplorePage && <Footer />}
      <SearchModal />
    </div>
  );
}

export default function App() {
  return (
    <PlanetariumProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </PlanetariumProvider>
  );
}
