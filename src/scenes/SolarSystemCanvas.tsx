import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLANETS_DATA, MAJOR_PLANETS_LIST, PlanetData } from '../data/planets';
import { generatePlanetTexture, generateSaturnRingTexture } from '../utils/textureGenerator';
import { sound } from '../utils/audio';

interface SolarSystemCanvasProps {
  selectedPlanetId: string | null;
  onSelectPlanet: (id: string | null) => void;
  simulationRunning?: boolean;
  simulationSpeed?: number;
  showOrbits?: boolean;
  showLabels?: boolean;
  showStars?: boolean;
  className?: string;
  isCompact?: boolean; // For hero or preview mode
}

interface PlanetMeshRef {
  id: string;
  mesh: THREE.Mesh;
  group: THREE.Group; // Group handles orbit position
  cloudMesh?: THREE.Mesh;
  ringMesh?: THREE.Mesh;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  rotationSpeed: number;
  visualRadius: number;
  parentBodyId?: string;
}

interface ScreenLabel {
  id: string;
  name: string;
  x: number;
  y: number;
  visible: boolean;
  color: string;
}

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  selectedPlanetId,
  onSelectPlanet,
  simulationRunning = true,
  simulationSpeed = 1,
  showOrbits = true,
  showLabels = true,
  showStars = true,
  className = '',
  isCompact = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenLabels, setScreenLabels] = useState<ScreenLabel[]>([]);
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [webglError, setWebglError] = useState<boolean>(false);

  // References to keep Three.js state across renders without re-initializing
  const stateRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    controls: OrbitControls | null;
    planets: Map<string, PlanetMeshRef>;
    orbitsGroup: THREE.Group | null;
    starsMesh: THREE.Points | null;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    animFrameId: number;
    camTargetPos: THREE.Vector3 | null;
    camLookAtTarget: THREE.Vector3 | null;
    isTransitioning: boolean;
    earthMeshRef: THREE.Mesh | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    planets: new Map(),
    orbitsGroup: null,
    starsMesh: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(-1000, -1000),
    animFrameId: 0,
    camTargetPos: null,
    camLookAtTarget: null,
    isTransitioning: false,
    earthMeshRef: null
  });

  // Keep latest props in ref for animation loop
  const propsRef = useRef({
    simulationRunning,
    simulationSpeed,
    showOrbits,
    showLabels,
    showStars,
    selectedPlanetId,
    onSelectPlanet
  });

  useEffect(() => {
    propsRef.current = {
      simulationRunning,
      simulationSpeed,
      showOrbits,
      showLabels,
      showStars,
      selectedPlanetId,
      onSelectPlanet
    };
  }, [simulationRunning, simulationSpeed, showOrbits, showLabels, showStars, selectedPlanetId, onSelectPlanet]);

  // Handle selectedPlanetId change to trigger camera fly-to
  useEffect(() => {
    const { camera, controls, planets } = stateRef.current;
    if (!camera || !controls) return;

    if (!selectedPlanetId) {
      // Zoom out to global solar system view
      const isMob = typeof window !== 'undefined' && (window.innerWidth < 640 || window.innerWidth / window.innerHeight < 1);
      stateRef.current.camTargetPos = new THREE.Vector3(
        0, 
        isMob ? 60 : (isCompact ? 50 : 75), 
        isMob ? 82 : (isCompact ? 70 : 100)
      );
      stateRef.current.camLookAtTarget = (isMob && isCompact) ? new THREE.Vector3(0, -6, 0) : new THREE.Vector3(0, 0, 0);
      stateRef.current.isTransitioning = true;
      sound.playFlyTo();
      return;
    }

    const targetPlanet = planets.get(selectedPlanetId);
    if (targetPlanet) {
      const worldPos = new THREE.Vector3();
      targetPlanet.mesh.getWorldPosition(worldPos);

      const r = targetPlanet.visualRadius;
      // Position camera at a dramatic angle relative to planet size
      const offsetDist = Math.max(r * 3.8, 3.5);
      stateRef.current.camTargetPos = new THREE.Vector3(
        worldPos.x + offsetDist * 0.8,
        worldPos.y + offsetDist * 0.45,
        worldPos.z + offsetDist * 0.8
      );
      stateRef.current.camLookAtTarget = worldPos.clone();
      stateRef.current.isTransitioning = true;
      sound.playFlyTo();
    }
  }, [selectedPlanetId, isCompact]);

  // Orbit lines visibility toggle
  useEffect(() => {
    if (stateRef.current.orbitsGroup) {
      stateRef.current.orbitsGroup.visible = showOrbits;
    }
  }, [showOrbits]);

  // Starfield visibility toggle
  useEffect(() => {
    if (stateRef.current.starsMesh) {
      stateRef.current.starsMesh.visible = showStars;
    }
  }, [showStars]);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglError(true);
        return;
      }
    } catch {
      setWebglError(true);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);
    stateRef.current.scene = scene;

    // Camera
    const isMobilePortrait = width < 640 || width / height < 1;
    const fov = isMobilePortrait ? 52 : 45;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 2000);
    const initialCamPos = new THREE.Vector3(
      0, 
      isMobilePortrait ? 60 : (isCompact ? 50 : 75), 
      isMobilePortrait ? 82 : (isCompact ? 70 : 100)
    );
    camera.position.copy(initialCamPos);
    const initialLookAt = (isMobilePortrait && isCompact) ? new THREE.Vector3(0, -6, 0) : new THREE.Vector3(0, 0, 0);
    camera.lookAt(initialLookAt);
    stateRef.current.camera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    stateRef.current.renderer = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 350;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't flip under
    if (isMobilePortrait && isCompact) {
      controls.target.copy(initialLookAt);
    }
    stateRef.current.controls = controls;

    // Lighting
    // 1. Ambient soft starlight fill
    const ambientLight = new THREE.AmbientLight(0x223355, 0.55);
    scene.add(ambientLight);

    // 2. Point light at the Sun position to illuminate planets realistically
    const sunLight = new THREE.PointLight(0xfff5e6, 3.5, 300, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 3. Subtle directional rim light
    const rimLight = new THREE.DirectionalLight(0x4466aa, 0.4);
    rimLight.position.set(50, 40, 50);
    scene.add(rimLight);

    // Starfield Points
    const starCount = isCompact ? 1500 : 3500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Spherical distribution around the solar system
      const r = 300 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[idx] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = r * Math.cos(phi);

      // Star color temperatures: white, cyan-blue, soft warm amber
      const type = Math.random();
      if (type > 0.7) {
        starColors[idx] = 0.8; starColors[idx + 1] = 0.9; starColors[idx + 2] = 1.0;
      } else if (type > 0.4) {
        starColors[idx] = 1.0; starColors[idx + 1] = 0.9; starColors[idx + 2] = 0.75;
      } else {
        starColors[idx] = 0.95; starColors[idx + 1] = 0.95; starColors[idx + 2] = 1.0;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starsMesh = new THREE.Points(starGeo, starMat);
    scene.add(starsMesh);
    stateRef.current.starsMesh = starsMesh;

    // Orbits Group
    const orbitsGroup = new THREE.Group();
    scene.add(orbitsGroup);
    stateRef.current.orbitsGroup = orbitsGroup;

    // Create Sun & Planets
    const planetsMap = new Map<string, PlanetMeshRef>();

    // 1. SUN
    const sunData = PLANETS_DATA.sun;
    const sunGeo = new THREE.SphereGeometry(sunData.visualRadius, 48, 48);
    const sunTexture = generatePlanetTexture('sun');
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
      color: 0xffe088
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData = { id: 'sun', name: sunData.name };

    // Sun atmospheric glow layer
    const glowGeo = new THREE.SphereGeometry(sunData.visualRadius * 1.15, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    sunMesh.add(glowMesh);

    const sunGroup = new THREE.Group();
    sunGroup.add(sunMesh);
    scene.add(sunGroup);

    planetsMap.set('sun', {
      id: 'sun',
      mesh: sunMesh,
      group: sunGroup,
      orbitRadius: 0,
      orbitAngle: 0,
      orbitSpeed: 0,
      rotationSpeed: sunData.rotationSpeed,
      visualRadius: sunData.visualRadius
    });

    // 2. PLANETS
    let earthMeshForMoon: THREE.Mesh | null = null;
    let earthGroupForMoon: THREE.Group | null = null;

    for (let index = 0; index < MAJOR_PLANETS_LIST.length; index++) {
      const planet = MAJOR_PLANETS_LIST[index];
      const pGroup = new THREE.Group();
      scene.add(pGroup);

      // Create orbit circle
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        planet.orbitRadius, planet.orbitRadius,
        0, 2 * Math.PI,
        false,
        0
      );
      const points = orbitCurve.getPoints(90);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x334466,
        transparent: true,
        opacity: 0.35
      });
      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      orbitsGroup.add(orbitLine);

      // Planet Sphere Geometry & Material
      const pGeo = new THREE.SphereGeometry(planet.visualRadius, 36, 36);
      const pTexture = generatePlanetTexture(planet.id);
      const pMat = new THREE.MeshStandardMaterial({
        map: pTexture,
        roughness: 0.75,
        metalness: 0.1
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.userData = { id: planet.id, name: planet.name };
      pMesh.rotation.z = (planet.tiltDeg * Math.PI) / 180;

      // Special feature: Earth Clouds
      let cloudMesh: THREE.Mesh | undefined;
      if (planet.id === 'earth') {
        const cloudGeo = new THREE.SphereGeometry(planet.visualRadius * 1.025, 36, 36);
        const cloudTexture = generatePlanetTexture('earth-clouds');
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTexture,
          transparent: true,
          opacity: 0.65,
          blending: THREE.NormalBlending
        });
        cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        pMesh.add(cloudMesh);
        earthMeshForMoon = pMesh;
        earthGroupForMoon = pGroup;
        stateRef.current.earthMeshRef = pMesh;
      }

      // Special feature: Saturn Rings
      let ringMesh: THREE.Mesh | undefined;
      if (planet.id === 'saturn') {
        const innerR = planet.visualRadius * 1.35;
        const outerR = planet.visualRadius * 2.55;
        const ringGeo = new THREE.RingGeometry(innerR, outerR, 64);

        // Orient ring horizontally on XY plane and tilt
        ringGeo.rotateX(-Math.PI / 2);

        // Map UV coordinates for concentric radial texture
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
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        pMesh.add(ringMesh);
      }

      // Initial angle dispersed so planets aren't all aligned on x-axis
      const initialAngle = (index * (Math.PI * 2 / 8)) + (Math.random() * 0.4);
      pMesh.position.set(
        Math.cos(initialAngle) * planet.orbitRadius,
        0,
        Math.sin(initialAngle) * planet.orbitRadius
      );
      pGroup.add(pMesh);

      planetsMap.set(planet.id, {
        id: planet.id,
        mesh: pMesh,
        group: pGroup,
        cloudMesh,
        ringMesh,
        orbitRadius: planet.orbitRadius,
        orbitAngle: initialAngle,
        orbitSpeed: planet.orbitSpeed,
        rotationSpeed: planet.rotationSpeed,
        visualRadius: planet.visualRadius
      });
    }

    // 3. MOON (orbits Earth)
    const moonData = PLANETS_DATA.moon;
    const moonGeo = new THREE.SphereGeometry(moonData.visualRadius, 24, 24);
    const moonTexture = generatePlanetTexture('moon');
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.9,
      metalness: 0.05
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.userData = { id: 'moon', name: moonData.name };

    // Group for Moon orbiting Earth
    const moonGroup = new THREE.Group();
    moonMesh.position.set(moonData.orbitRadius, 0, 0);
    moonGroup.add(moonMesh);

    // Orbit line for Moon around Earth
    const moonOrbitCurve = new THREE.EllipseCurve(
      0, 0,
      moonData.orbitRadius, moonData.orbitRadius,
      0, 2 * Math.PI,
      false,
      0
    );
    const moonPoints = moonOrbitCurve.getPoints(45);
    const moonOrbitGeo = new THREE.BufferGeometry().setFromPoints(
      moonPoints.map(p => new THREE.Vector3(p.x, 0, p.y))
    );
    const moonOrbitMat = new THREE.LineBasicMaterial({
      color: 0x556677,
      transparent: true,
      opacity: 0.4
    });
    const moonOrbitLine = new THREE.LineLoop(moonOrbitGeo, moonOrbitMat);
    moonGroup.add(moonOrbitLine);

    if (earthGroupForMoon) {
      earthGroupForMoon.add(moonGroup);
    } else {
      scene.add(moonGroup);
    }

    planetsMap.set('moon', {
      id: 'moon',
      mesh: moonMesh,
      group: moonGroup,
      orbitRadius: moonData.orbitRadius,
      orbitAngle: 0,
      orbitSpeed: moonData.orbitSpeed,
      rotationSpeed: moonData.rotationSpeed,
      visualRadius: moonData.visualRadius,
      parentBodyId: 'earth'
    });

    stateRef.current.planets = planetsMap;

    // Mouse Move & Click handlers for Raycasting
    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerLeave = () => {
      stateRef.current.mouse.x = -1000;
      stateRef.current.mouse.y = -1000;
      setHoveredPlanetId(null);
    };

    const onPointerDown = (e: MouseEvent) => {
      // Raycast click
      const rect = canvas.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      stateRef.current.raycaster.setFromCamera(clickMouse, camera);
      const meshes: THREE.Mesh[] = [];
      planetsMap.forEach(p => meshes.push(p.mesh));

      const intersects = stateRef.current.raycaster.intersectObjects(meshes, false);
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.id;
        if (hitId) {
          sound.playSelect();
          propsRef.current.onSelectPlanet(hitId);
        }
      }
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseleave', onPointerLeave);
    canvas.addEventListener('click', onPointerDown);

    // Touch support for mobile tap
    let touchStartTime = 0;
    const onTouchStart = () => {
      touchStartTime = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      // Only process tap if touch was short (< 250ms) to avoid hijacking orbit drag
      if (Date.now() - touchStartTime > 250) return;
      if (e.changedTouches.length === 0) return;

      const touch = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      const touchMouse = new THREE.Vector2(
        ((touch.clientX - rect.left) / rect.width) * 2 - 1,
        -((touch.clientY - rect.top) / rect.height) * 2 + 1
      );

      stateRef.current.raycaster.setFromCamera(touchMouse, camera);
      const meshes: THREE.Mesh[] = [];
      planetsMap.forEach(p => meshes.push(p.mesh));

      const intersects = stateRef.current.raycaster.intersectObjects(meshes, false);
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.id;
        if (hitId) {
          sound.playSelect();
          propsRef.current.onSelectPlanet(hitId);
        }
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      const isMob = newW < 640 || newW / newH < 1;
      camera.fov = isMob ? 52 : 45;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    let lastTime = performance.now();
    let labelUpdateThrottle = 0;

    const animate = (time: number) => {
      stateRef.current.animFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const { simulationRunning: isRunning, simulationSpeed: speed } = propsRef.current;

      // Rotate Sun slightly
      if (isRunning) {
        sunMesh.rotation.y += 0.001 * speed;
      }

      // Update planets orbit and spin
      planetsMap.forEach((p) => {
        if (p.id === 'sun') return;

        if (isRunning) {
          // Spin on axis
          p.mesh.rotation.y += p.rotationSpeed * speed;

          // Clouds spin independently
          if (p.cloudMesh) {
            p.cloudMesh.rotation.y += p.rotationSpeed * 0.7 * speed;
          }

          // Orbit around Sun (or Earth for Moon)
          if (p.id === 'moon') {
            p.orbitAngle += p.orbitSpeed * speed * 0.05;
            if (earthMeshForMoon) {
              // Position moon relative to earth's current position
              const earthPos = earthMeshForMoon.position;
              p.group.position.copy(earthPos);
              p.mesh.position.set(
                Math.cos(p.orbitAngle) * p.orbitRadius,
                0,
                Math.sin(p.orbitAngle) * p.orbitRadius
              );
            }
          } else {
            p.orbitAngle += p.orbitSpeed * speed * 0.05;
            p.mesh.position.set(
              Math.cos(p.orbitAngle) * p.orbitRadius,
              0,
              Math.sin(p.orbitAngle) * p.orbitRadius
            );
          }
        }
      });

      // Slowly rotate starfield for subtle cosmic parallax
      if (starsMesh) {
        starsMesh.rotation.y += 0.00008;
      }

      // Camera lerp transition
      if (stateRef.current.isTransitioning && stateRef.current.camTargetPos && stateRef.current.camLookAtTarget) {
        camera.position.lerp(stateRef.current.camTargetPos, 0.05);
        controls.target.lerp(stateRef.current.camLookAtTarget, 0.05);

        if (
          camera.position.distanceTo(stateRef.current.camTargetPos) < 0.2 &&
          controls.target.distanceTo(stateRef.current.camLookAtTarget) < 0.2
        ) {
          stateRef.current.isTransitioning = false;
        }
      } else if (propsRef.current.selectedPlanetId) {
        // If a planet is actively selected and orbiting, gently track it
        const selP = planetsMap.get(propsRef.current.selectedPlanetId);
        if (selP) {
          const worldPos = new THREE.Vector3();
          selP.mesh.getWorldPosition(worldPos);
          controls.target.lerp(worldPos, 0.05);
        }
      }

      controls.update();

      // Raycasting for hover state
      if (stateRef.current.mouse.x > -500) {
        stateRef.current.raycaster.setFromCamera(stateRef.current.mouse, camera);
        const meshes: THREE.Mesh[] = [];
        planetsMap.forEach(p => meshes.push(p.mesh));
        const intersects = stateRef.current.raycaster.intersectObjects(meshes, false);

        if (intersects.length > 0) {
          const hoveredId = intersects[0].object.userData.id;
          if (hoveredId !== hoveredPlanetId) {
            setHoveredPlanetId(hoveredId);
            canvas.style.cursor = 'pointer';
          }
        } else {
          if (hoveredPlanetId !== null) {
            setHoveredPlanetId(null);
            canvas.style.cursor = 'grab';
          }
        }
      }

      // Update 2D floating screen labels (throttled every 3 frames for 60fps smoothness)
      labelUpdateThrottle++;
      if (propsRef.current.showLabels && labelUpdateThrottle % 3 === 0) {
        const labels: ScreenLabel[] = [];
        const canvasRect = canvas.getBoundingClientRect();

        planetsMap.forEach(p => {
          const tempV = new THREE.Vector3();
          p.mesh.getWorldPosition(tempV);

          // Project to 2D screen coordinates
          tempV.project(camera);

          // Check if in front of camera
          const isBehind = tempV.z > 1;
          const x = (tempV.x * 0.5 + 0.5) * canvasRect.width;
          const y = (-(tempV.y * 0.5) + 0.5) * canvasRect.height;

          const isVisible = !isBehind && x >= 10 && x <= canvasRect.width - 10 && y >= 10 && y <= canvasRect.height - 10;
          const pData = PLANETS_DATA[p.id];

          labels.push({
            id: p.id,
            name: pData ? pData.name : p.id,
            x,
            y,
            visible: isVisible,
            color: pData ? pData.color : '#06b6d4'
          });
        });

        setScreenLabels(labels);
      }

      renderer.render(scene, camera);
    };

    stateRef.current.animFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(stateRef.current.animFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mouseleave', onPointerLeave);
      canvas.removeEventListener('click', onPointerDown);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);

      controls.dispose();
      renderer.dispose();

      // Dispose geometries and materials
      planetsMap.forEach(p => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach(m => m.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });
      starGeo.dispose();
      starMat.dispose();
    };
  }, [isCompact]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing outline-none" />

      {/* WebGL Fallback Alert if device unsupported */}
      {webglError && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-950/90 text-center z-50">
          <div className="max-w-md p-6 glass-panel rounded-xl border border-rose-500/30 text-rose-200">
            <h3 className="text-xl font-bold font-display mb-2">WebGL Acceleration Required</h3>
            <p className="text-sm text-slate-300">
              Your browser or device does not appear to support the WebGL features required for the interactive 3D planetarium experience. Please ensure hardware acceleration is enabled.
            </p>
          </div>
        </div>
      )}

      {/* Dynamic 3D Projected Screen Labels */}
      {showLabels && !webglError && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {screenLabels.map(label => {
            if (!label.visible) return null;
            const isSelected = selectedPlanetId === label.id;
            const isHovered = hoveredPlanetId === label.id;

            return (
              <div
                key={label.id}
                style={{
                  transform: `translate3d(${label.x}px, ${label.y}px, 0)`,
                  left: 0,
                  top: 0
                }}
                className={`absolute -translate-x-1/2 -translate-y-full mb-3 pointer-events-auto transition-opacity duration-200 ${
                  isSelected ? 'z-30 opacity-100' : isHovered ? 'z-20 opacity-100' : 'opacity-85'
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSelect();
                    onSelectPlanet(label.id);
                  }}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-medium transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                      : isHovered
                      ? 'bg-slate-900/90 text-white border border-slate-400/50 scale-105'
                      : 'bg-slate-950/70 text-slate-300 border border-white/10 hover:border-white/30'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: label.color }}
                  />
                  <span>{label.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
