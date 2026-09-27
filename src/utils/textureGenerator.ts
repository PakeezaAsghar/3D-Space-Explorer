import * as THREE from 'three';

// Cache generated textures so they are only built once
const textureCache = new Map<string, THREE.CanvasTexture>();

function createNoise(ctx: CanvasRenderingContext2D, width: number, height: number, opacity: number = 0.05) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = (Math.random() - 0.5) * 255 * opacity;
    data[i] = Math.min(255, Math.max(0, data[i] + val));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + val));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + val));
  }
  ctx.putImageData(imgData, 0, 0);
}

export function generatePlanetTexture(id: string): THREE.CanvasTexture {
  if (textureCache.has(id)) {
    return textureCache.get(id)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  const w = canvas.width;
  const h = canvas.height;

  switch (id) {
    case 'sun': {
      // Photosphere with bright turbulent solar granules
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 2);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#fff1a8');
      grad.addColorStop(0.5, '#ffa200');
      grad.addColorStop(0.85, '#e04000');
      grad.addColorStop(1, '#941000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Solar flare spots and granulation
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 2 + Math.random() * 8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 255, 200, 0.4)' : 'rgba(180, 20, 0, 0.5)';
        ctx.fill();
      }
      createNoise(ctx, w, h, 0.15);
      break;
    }

    case 'mercury': {
      // Rocky, heavily cratered gray crust
      ctx.fillStyle = '#7a7a82';
      ctx.fillRect(0, 0, w, h);

      // Craters and maria
      for (let i = 0; i < 180; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 3 + Math.random() * 24;
        const cGrad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
        cGrad.addColorStop(0, 'rgba(40, 40, 45, 0.7)');
        cGrad.addColorStop(0.7, 'rgba(90, 90, 96, 0.5)');
        cGrad.addColorStop(0.9, 'rgba(170, 170, 180, 0.6)');
        cGrad.addColorStop(1, 'rgba(120, 120, 128, 0)');
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      createNoise(ctx, w, h, 0.2);
      break;
    }

    case 'venus': {
      // Thick pale-yellow / amber opaque sulfuric atmosphere with swirling bands
      ctx.fillStyle = '#e8cf99';
      ctx.fillRect(0, 0, w, h);

      // Atmospheric cloud bands
      for (let y = 0; y < h; y += 4) {
        const factor = Math.sin(y * 0.04) * 0.5 + 0.5;
        const col = Math.floor(190 + factor * 50);
        ctx.fillStyle = `rgba(${col + 20}, ${col - 10}, 110, 0.25)`;
        ctx.fillRect(0, y, w, 4);
      }

      // Swirling vortices
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 20 + Math.random() * 60;
        ctx.beginPath();
        ctx.ellipse(x, y, r * 1.8, r * 0.6, Math.PI / 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(210, 160, 80, 0.15)';
        ctx.fill();
      }
      createNoise(ctx, w, h, 0.1);
      break;
    }

    case 'earth': {
      // Deep blue ocean background
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, '#0c2e63');
      oceanGrad.addColorStop(0.5, '#12458a');
      oceanGrad.addColorStop(1, '#0c2e63');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Continents (Americas, Eurasia, Africa, Australia)
      ctx.fillStyle = '#2d6a36'; // deep forest green

      // North America
      ctx.beginPath();
      ctx.ellipse(w * 0.24, h * 0.35, 75, 55, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // South America
      ctx.beginPath();
      ctx.ellipse(w * 0.32, h * 0.65, 45, 70, 0.1, 0, Math.PI * 2);
      ctx.fill();
      // Eurasia
      ctx.beginPath();
      ctx.ellipse(w * 0.68, h * 0.32, 130, 65, -0.1, 0, Math.PI * 2);
      ctx.fill();
      // Africa
      ctx.beginPath();
      ctx.ellipse(w * 0.55, h * 0.55, 60, 80, 0, 0, Math.PI * 2);
      ctx.fill();
      // Australia
      ctx.beginPath();
      ctx.ellipse(w * 0.85, h * 0.72, 45, 35, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Desert arid tones (Sahara, Australia, Gobi)
      ctx.fillStyle = '#8f7743';
      ctx.beginPath();
      ctx.ellipse(w * 0.54, h * 0.44, 45, 25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.84, h * 0.72, 28, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Polar ice caps (North & South)
      ctx.fillStyle = '#eef6fc';
      ctx.fillRect(0, 0, w, h * 0.08);
      ctx.fillRect(0, h * 0.92, w, h * 0.08);

      createNoise(ctx, w, h, 0.08);
      break;
    }

    case 'earth-clouds': {
      // Transparent alpha canvas with procedural swirling white clouds
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';

      for (let i = 0; i < 90; i++) {
        const x = Math.random() * w;
        const y = h * 0.15 + Math.random() * (h * 0.7);
        const rx = 40 + Math.random() * 90;
        const ry = 8 + Math.random() * 22;
        const rot = (Math.random() - 0.5) * 0.4;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
        ctx.fill();
      }
      createNoise(ctx, w, h, 0.05);
      break;
    }

    case 'moon': {
      // Cratered lunar regolith
      ctx.fillStyle = '#9b9da3';
      ctx.fillRect(0, 0, w, h);

      // Dark basaltic maria
      ctx.fillStyle = '#5c5e63';
      ctx.beginPath();
      ctx.ellipse(w * 0.35, h * 0.4, 70, 50, 0, 0, Math.PI * 2);
      ctx.ellipse(w * 0.55, h * 0.35, 60, 45, 0.2, 0, Math.PI * 2);
      ctx.ellipse(w * 0.45, h * 0.55, 50, 40, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Impact craters with rims
      for (let i = 0; i < 140; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 2 + Math.random() * 16;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(60, 60, 65, 0.6)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(200, 205, 215, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      createNoise(ctx, w, h, 0.15);
      break;
    }

    case 'mars': {
      // Rusty red desert crust
      const marsGrad = ctx.createLinearGradient(0, 0, 0, h);
      marsGrad.addColorStop(0, '#bd4826');
      marsGrad.addColorStop(0.5, '#c75932');
      marsGrad.addColorStop(1, '#a83c1b');
      ctx.fillStyle = marsGrad;
      ctx.fillRect(0, 0, w, h);

      // Dark volcanic basalt regions (Syrtis Major, Acidalia Planitia)
      ctx.fillStyle = '#6e2b19';
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.48, 120, 45, 0.1, 0, Math.PI * 2);
      ctx.ellipse(w * 0.72, h * 0.55, 80, 50, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // Olympus Mons and Tharsis volcanoes (raised lighter caldera ring)
      ctx.fillStyle = '#8f3319';
      ctx.beginPath();
      ctx.arc(w * 0.25, h * 0.42, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#e6734e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Polar ice caps (frozen CO2 & water ice)
      ctx.fillStyle = '#f5e8e4';
      ctx.fillRect(0, 0, w, h * 0.06);
      ctx.fillRect(0, h * 0.94, w, h * 0.06);

      createNoise(ctx, w, h, 0.12);
      break;
    }

    case 'jupiter': {
      // Gas giant atmospheric belts and zones
      for (let y = 0; y < h; y++) {
        // Multi-frequency banded turbulence
        const freq1 = Math.sin(y * 0.07);
        const freq2 = Math.sin(y * 0.02 + 0.5);
        const intensity = freq1 * 0.4 + freq2 * 0.6;

        let r = 180 + intensity * 50;
        let g = 135 + intensity * 45;
        let b = 95 + intensity * 35;

        // Dark belts
        if (Math.abs(y - h * 0.38) < 25 || Math.abs(y - h * 0.62) < 25) {
          r -= 35;
          g -= 30;
          b -= 20;
        }

        ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        ctx.fillRect(0, y, w, 1);
      }

      // Great Red Spot anticyclonic storm (southern hemisphere)
      const grsX = w * 0.65;
      const grsY = h * 0.65;
      const grsW = 65;
      const grsH = 38;

      const spotGrad = ctx.createRadialGradient(grsX, grsY, 5, grsX, grsY, grsW);
      spotGrad.addColorStop(0, '#9e2d1c');
      spotGrad.addColorStop(0.6, '#b53f28');
      spotGrad.addColorStop(0.9, '#c46949');
      spotGrad.addColorStop(1, 'rgba(200, 140, 90, 0)');

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW, grsH, 0.05, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric eddies
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.fillStyle = 'rgba(255, 235, 210, 0.2)';
        ctx.fillRect(x, y, 20 + Math.random() * 40, 2 + Math.random() * 4);
      }

      createNoise(ctx, w, h, 0.08);
      break;
    }

    case 'saturn': {
      // Golden yellow / ochre banded atmosphere
      for (let y = 0; y < h; y++) {
        const factor = Math.sin(y * 0.05) * 0.3 + Math.cos(y * 0.015) * 0.7;
        const r = Math.floor(215 + factor * 25);
        const g = Math.floor(185 + factor * 25);
        const b = Math.floor(125 + factor * 20);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, y, w, 1);
      }

      // Hexagon polar region
      ctx.fillStyle = '#a68f56';
      ctx.fillRect(0, 0, w, h * 0.06);

      createNoise(ctx, w, h, 0.06);
      break;
    }

    case 'uranus': {
      // Pale cyan-green ice giant with subtle banded gradient
      const uranusGrad = ctx.createLinearGradient(0, 0, 0, h);
      uranusGrad.addColorStop(0, '#75c8d6');
      uranusGrad.addColorStop(0.5, '#99e1eb');
      uranusGrad.addColorStop(1, '#75c8d6');
      ctx.fillStyle = uranusGrad;
      ctx.fillRect(0, 0, w, h);

      for (let y = 0; y < h; y += 8) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(0, y, w, 4);
      }
      createNoise(ctx, w, h, 0.04);
      break;
    }

    case 'neptune': {
      // Deep azure / cobalt blue with high-speed white methane cirrus storms
      const nepGrad = ctx.createLinearGradient(0, 0, 0, h);
      nepGrad.addColorStop(0, '#1c3fa6');
      nepGrad.addColorStop(0.5, '#2855cf');
      nepGrad.addColorStop(1, '#1c3fa6');
      ctx.fillStyle = nepGrad;
      ctx.fillRect(0, 0, w, h);

      // Great Dark Spot
      ctx.fillStyle = 'rgba(15, 30, 85, 0.6)';
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.45, 50, 30, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // White high-altitude cirrus clouds ("Scooter")
      ctx.fillStyle = 'rgba(235, 245, 255, 0.7)';
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * w;
        const y = h * 0.3 + Math.random() * (h * 0.4);
        ctx.fillRect(x, y, 30 + Math.random() * 50, 2);
      }

      createNoise(ctx, w, h, 0.05);
      break;
    }

    default: {
      ctx.fillStyle = '#555555';
      ctx.fillRect(0, 0, w, h);
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set(id, texture);
  return texture;
}

/**
 * Generates concentric ring texture with transparency and Cassini division
 */
export function generateSaturnRingTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn-rings')) {
    return textureCache.get('saturn-rings')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  // Innermost C-Ring
  grad.addColorStop(0.0, 'rgba(150, 130, 90, 0.0)');
  grad.addColorStop(0.12, 'rgba(160, 140, 100, 0.4)');
  // B-Ring (bright and dense)
  grad.addColorStop(0.25, 'rgba(220, 200, 150, 0.9)');
  grad.addColorStop(0.55, 'rgba(240, 220, 170, 0.95)');
  // Cassini Division (dark gap)
  grad.addColorStop(0.57, 'rgba(20, 20, 20, 0.05)');
  grad.addColorStop(0.63, 'rgba(20, 20, 20, 0.05)');
  // A-Ring
  grad.addColorStop(0.66, 'rgba(210, 190, 140, 0.85)');
  grad.addColorStop(0.85, 'rgba(190, 170, 130, 0.75)');
  // Outer boundary
  grad.addColorStop(0.95, 'rgba(160, 140, 100, 0.2)');
  grad.addColorStop(1.0, 'rgba(120, 100, 70, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('saturn-rings', texture);
  return texture;
}
