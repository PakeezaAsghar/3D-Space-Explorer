# 3D Space Explorer: An Interactive Digital Planetarium

A real-time 3D interactive digital planetarium web application engineered with **Three.js**, **WebGL**, **React 19**, and **TypeScript**. Explore the Sun, all 8 planets, Earth's Moon, orbital physics, comparative telemetry, and astronomical science.

---

## 🌟 Key Features

### 1. Interactive 3D Solar System
- **Real 3D Spheres & Geometries**: Built using `THREE.SphereGeometry`, `THREE.RingGeometry`, and physically-based materials.
- **Planetary Bodies**:
  - **Sun**: Central yellow dwarf (G2V) with emissive photosphere, procedural granulation, and point lighting illuminating orbiting bodies.
  - **Mercury**: Rocky, cratered gray surface with distinct mare basins.
  - **Venus**: Opaque sulfur-yellow atmosphere with retrograde rotation.
  - **Earth**: Oceans, green/brown continental landmasses, polar ice caps, plus an independent rotating cloud layer.
  - **Moon**: Cratered lunar regolith orbiting Earth with tidal locking.
  - **Mars**: Iron oxide rust terrain, Olympus Mons volcano, and polar caps.
  - **Jupiter**: Gas giant belts, zones, and Great Red Spot anticyclone.
  - **Saturn**: Banded golden atmosphere with a 3D ring system featuring Cassini divisions and radial transparency.
  - **Uranus**: Tilted pale cyan ice giant with a 97.8° axial tilt.
  - **Neptune**: Deep azure blue ice giant with supersonic methane cirrus clouds.

### 2. Orbital Physics & Simulation
- **Variable Simulation Speeds**: `0.25x`, `0.5x`, `1x`, `2x`, `5x`, `10x`, plus Play / Pause.
- **Accurate Keplerian Motion**: Relative orbital velocities respect distance from the Sun.
- **Axial Tilts**: Precise planetary obliquity angles (e.g. Earth 23.4°, Uranus 97.8°).
- **Toggles**: Toggle orbital paths, 3D tracking labels, and starfield.

### 3. Camera Choreography & Navigation
- **OrbitControls**: Rotate, pan, and zoom with damping.
- **Cinematic Fly-To**: Smooth camera interpolation (lerp) toward any selected planet.
- **Return to Orbit**: Seamless camera return to the global solar system overview.
- **Raycasting**: Hover highlights and touch-friendly pointer raycasting.

### 4. Planet Comparison Tool
- Select any two celestial bodies side-by-side.
- Interactive 3D preview viewports.
- Comparative telemetry: Diameter, Mass, Gravity, Distance, Day/Year Length, Temperature, Moons.
- Proportional comparative visual bars.

### 5. Educational Learn Curriculum
- Core astrophysics: Kepler's laws, thermonuclear fusion, terrestrial vs. Jovian dynamics, axial tilts, and planetary seasons.
- Interactive Cosmic Facts deck with audio chime.

### 6. Procedural Audio Synthesizer
- Built using the native **Web Audio API** (no external MP3 dependencies).
- Ambient binaural space drone (55Hz/110Hz sub-oscillator with LFO filter sweep).
- Interactive tactile UI sound effects for clicks, fly-to swoops, and chimes.
- Strictly honors browser autoplay policies (starts only upon user toggle).

### 7. Responsive & Accessible Design
- Fully responsive across mobile (360px+), tablet, and desktop (1440px+).
- Touch gestures: One-finger rotate, pinch zoom, tap selection.
- Dark space theme and scientific light theme persisted in `localStorage`.
- WCAG AA compliant typography and contrast.

---

## 🛠️ Technology Stack

- **Frontend Library**: React 19
- **Build Tool**: Vite 8
- **3D Graphics**: Three.js (WebGL renderer, OrbitControls, BufferGeometry, Shaders)
- **Styling**: Tailwind CSS v4, custom glassmorphism utilities
- **Icons**: Lucide React
- **Audio**: Web Audio API (procedural synthesis)
- **Routing**: React Router DOM

---

## 📁 Architecture Overview

```
src/
├── assets/images/       # Photorealistic space assets
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # 3-zone header with theme, audio, search triggers
│   ├── Footer.tsx       # Educational disclaimer and navigation
│   ├── SearchModal.tsx  # Keyboard-navigable planet search (Ctrl+K)
│   ├── SimulationControls.tsx # Play/pause, speed selector, visual toggles
│   ├── PlanetNavigationDock.tsx # Bottom celestial body selector dock
│   └── PlanetInfoPanel.tsx # Selected body telemetry HUD
├── context/
│   └── PlanetariumContext.tsx # Central state management & local storage
├── data/
│   └── planets.ts       # Structured astronomical dataset & cosmic facts
├── pages/
│   ├── Home.tsx         # Landing page with live 3D hero
│   ├── Explore.tsx      # Fullscreen digital planetarium cockpit
│   ├── Planets.tsx      # Comprehensive celestial catalog
│   ├── Compare.tsx      # Dual-body comparative laboratory
│   ├── Learn.tsx        # Educational curriculum & cosmic facts
│   └── About.tsx        # Project mission, scale disclosures, tech stack
├── scenes/
│   ├── SolarSystemCanvas.tsx # Primary Three.js 3D solar system scene
│   └── PlanetPreviewCanvas.tsx # Isolated 3D planet inspection canvas
├── utils/
│   ├── audio.ts         # Procedural Web Audio API sound engine
│   └── textureGenerator.ts # Procedural 2K canvas planetary texture synthesizer
├── App.tsx              # Root router and layout
└── main.tsx             # React entry point
```

---

## 🚀 How to Install and Run

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Build
```bash
npm run build
```

---

## 🎮 Controls & Interactions

- **Left Mouse Click / Tap**: Select a planet or celestial body.
- **Left Mouse Drag / 1-Finger Touch**: Rotate camera around focus.
- **Right Mouse Drag / 2-Finger Touch**: Pan camera.
- **Scroll Wheel / Pinch**: Zoom in and out.
- **Search**: Press `Cmd + K` or `Ctrl + K` to open the search palette.
- **Overview**: Click the "Overview" button or "Return to Orbit" to zoom back out.

---

## 📐 Scientific Scale Note

In the physical universe, interplanetary distances and planetary diameters differ by multiple orders of magnitude (e.g. the Sun is over 100 times wider than Earth, and Neptune is 4.5 billion km away). If rendered in strict 1:1 physical scale, planets would appear as invisible sub-pixel dots.

The interactive solar-system scene uses visual scaling optimized for exploration rather than exact astronomical scale, while all written telemetry (mass, diameter, gravity, distance) presents exact scientific data.

---

## 🔬 Credits & Data Citations

- Planetary telemetry and orbital data curated from **NASA Jet Propulsion Laboratory (JPL)** and the **European Space Agency (ESA)**.
- Developed for university portfolio presentation (September 2026).
