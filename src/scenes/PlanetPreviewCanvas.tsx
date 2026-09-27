import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLANETS_DATA, PlanetData } from '../data/planets';
import { generatePlanetTexture, generateSaturnRingTexture } from '../utils/textureGenerator';

interface PlanetPreviewCanvasProps {
  planetId: string;
  className?: string;
  autoRotate?: boolean;
}

export const PlanetPreviewCanvas: React.FC<PlanetPreviewCanvasProps> = ({
  planetId,
  className = '',
  autoRotate = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep view stable inside cards
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.4;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x88bbff, 0.6);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const data: PlanetData = PLANETS_DATA[planetId] || PLANETS_DATA.earth;

    // Planet Mesh
    const sphereRadius = 1.1;
    const geo = new THREE.SphereGeometry(sphereRadius, 40, 40);
    const texture = generatePlanetTexture(planetId);

    let mat: THREE.Material;
    if (planetId === 'sun') {
      mat = new THREE.MeshBasicMaterial({
        map: texture,
        color: 0xffe28a
      });
    } else {
      mat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.7,
        metalness: 0.1
      });
    }

    const planetMesh = new THREE.Mesh(geo, mat);
    planetMesh.rotation.z = (data.tiltDeg * Math.PI) / 180;
    scene.add(planetMesh);

    // Earth Clouds
    let cloudMesh: THREE.Mesh | null = null;
    if (planetId === 'earth') {
      const cloudGeo = new THREE.SphereGeometry(sphereRadius * 1.03, 36, 36);
      const cloudTexture = generatePlanetTexture('earth-clouds');
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.65
      });
      cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      planetMesh.add(cloudMesh);
    }

    // Saturn Rings
    if (planetId === 'saturn') {
      const innerR = sphereRadius * 1.35;
      const outerR = sphereRadius * 2.5;
      const ringGeo = new THREE.RingGeometry(innerR, outerR, 64);
      ringGeo.rotateX(-Math.PI / 2);

      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const dist = Math.sqrt(x * x + z * z);
        const u = (dist - innerR) / (outerR - innerR);
        uvs.setXY(i, u, 0.5);
      }

      const ringTexture = generateSaturnRingTexture();
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        roughness: 0.5
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      planetMesh.add(ringMesh);
    }

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (cloudMesh) {
        cloudMesh.rotation.y += 0.002;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, [planetId, autoRotate]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing outline-none" />
    </div>
  );
};
