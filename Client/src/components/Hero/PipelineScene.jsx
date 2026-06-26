import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Detect if WebGL is supported by the browser
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export default function PipelineScene() {
  const containerRef = useRef(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer: alpha: true for transparent canvas (shows Arctic Powder background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    // Mouse positioning for interactive parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handleMouseMove);

    // 1. Group to contain all floating objects
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);

    // 2. Color definitions matching locked palette
    const colorOceanic = new THREE.Color(0x172b36); // Oceanic Noir
    const colorForsythia = new THREE.Color(0xffc801); // Forsythia
    const colorSaffron = new THREE.Color(0xff9932); // Deep Saffron
    const colorMint = new THREE.Color(0xd9e8e2); // Mystic Mint

    // Helper to create wireframe geometry + line segments for clean technical wireframes
    const createWireframeMesh = (geometry, color, opacity = 0.25) => {
      // Wireframe material
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: opacity,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geometry, wireframeMat);

      // Add small glowing vertices (points)
      const pointsMat = new THREE.PointsMaterial({
        color: color,
        size: 0.1,
        transparent: true,
        opacity: opacity * 2,
        sizeAttenuation: true
      });
      const points = new THREE.Points(geometry, pointsMat);
      mesh.add(points);

      return mesh;
    };

    // 3. Define individual floating objects with positions and rotation factors
    const items = [];

    // Item 1: Large Central Torus Knot (placed on the right side)
    const torusKnotGeom = new THREE.TorusKnotGeometry(1.6, 0.4, 64, 8, 2, 3);
    const mainTorus = createWireframeMesh(torusKnotGeom, colorOceanic, 0.2);
    // Position primarily on the right for desktop, centered on mobile
    mainTorus.position.set(4, 0, 0);
    floatGroup.add(mainTorus);
    items.push({
      mesh: mainTorus,
      basePos: new THREE.Vector3(4, 0, 0),
      rotSpeed: new THREE.Vector3(0.002, 0.003, 0.001),
      bobSpeed: 0.001,
      bobHeight: 0.5,
      phase: 0
    });

    // Item 2: Floating Icosahedron A (Mystic Mint, top right)
    const icosaGeom = new THREE.IcosahedronGeometry(1.0, 0);
    const icoA = createWireframeMesh(icosaGeom, colorMint, 0.4);
    icoA.position.set(2, 3.5, -2);
    floatGroup.add(icoA);
    items.push({
      mesh: icoA,
      basePos: new THREE.Vector3(2, 3.5, -2),
      rotSpeed: new THREE.Vector3(-0.004, 0.002, 0.003),
      bobSpeed: 0.0015,
      bobHeight: 0.3,
      phase: Math.PI / 4
    });

    // Item 3: Floating Icosahedron B (Oceanic Noir, bottom left)
    const icoB = createWireframeMesh(icosaGeom, colorOceanic, 0.15);
    icoB.position.set(-5, -2.5, -1);
    floatGroup.add(icoB);
    items.push({
      mesh: icoB,
      basePos: new THREE.Vector3(-5, -2.5, -1),
      rotSpeed: new THREE.Vector3(0.003, -0.003, 0.002),
      bobSpeed: 0.0009,
      bobHeight: 0.4,
      phase: Math.PI / 2
    });

    // Item 4: Glowing Forsythia Tetrahedron (active data node, middle left)
    const tetraGeom = new THREE.TetrahedronGeometry(0.7, 0);
    const tetra = createWireframeMesh(tetraGeom, colorForsythia, 0.65);
    tetra.position.set(-3.5, 1.8, 1);
    floatGroup.add(tetra);
    items.push({
      mesh: tetra,
      basePos: new THREE.Vector3(-3.5, 1.8, 1),
      rotSpeed: new THREE.Vector3(0.006, 0.008, 0.004),
      bobSpeed: 0.002,
      bobHeight: 0.25,
      phase: Math.PI * 0.75
    });

    // Item 5: Deep Saffron Octahedron (validation node, bottom right)
    const octaGeom = new THREE.OctahedronGeometry(0.8, 0);
    const octa = createWireframeMesh(octaGeom, colorSaffron, 0.55);
    octa.position.set(5.5, -3, 2);
    floatGroup.add(octa);
    items.push({
      mesh: octa,
      basePos: new THREE.Vector3(5.5, -3, 2),
      rotSpeed: new THREE.Vector3(-0.005, -0.004, 0.006),
      bobSpeed: 0.0018,
      bobHeight: 0.35,
      phase: Math.PI
    });

    // Item 6: Thin Ring / Conduit (Forsythia, wrapping large torus)
    const ringGeom = new THREE.TorusGeometry(2.8, 0.04, 8, 32);
    const orbitRing = createWireframeMesh(ringGeom, colorForsythia, 0.3);
    orbitRing.position.set(4, 0, 0);
    orbitRing.rotation.x = Math.PI / 3;
    floatGroup.add(orbitRing);
    items.push({
      mesh: orbitRing,
      basePos: new THREE.Vector3(4, 0, 0),
      rotSpeed: new THREE.Vector3(0.001, -0.002, 0.005),
      bobSpeed: 0.001,
      bobHeight: 0.5,
      phase: 0
    });

    // 4. Subtle Background Grid dots
    const gridCount = 200;
    const gridGeometry = new THREE.BufferGeometry();
    const gridPositions = new Float32Array(gridCount * 3);

    for (let i = 0; i < gridCount; i++) {
      gridPositions[i * 3] = (Math.random() - 0.5) * 35;
      gridPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      gridPositions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 8;
    }

    gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
    const gridMaterial = new THREE.PointsMaterial({
      color: 0x172b36,
      size: 0.04,
      transparent: true,
      opacity: 0.12,
      sizeAttenuation: true
    });
    const gridNodes = new THREE.Points(gridGeometry, gridMaterial);
    scene.add(gridNodes);

    // 5. Lighting: Soft ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Media query to check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Animation variables
    let animationFrameId = null;
    let isVisible = true;
    let time = 0;

    // IntersectionObserver to pause loop when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Render loop
    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      if (isVisible) {
        time += 1;

        // Smooth mouse position lerping for parallax camera tilt
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Apply mouse position to camera tilt
        camera.position.x = mouse.x * 2.5;
        camera.position.y = mouse.y * 2.5;
        camera.lookAt(0, 0, 0);

        // Slow background grid drift
        gridNodes.rotation.y = time * 0.00015;
        gridNodes.rotation.x = time * 0.0001;

        // Update items (bobbing & rotation)
        items.forEach((item) => {
          // Self rotation
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;

          // Bobbing along Y axis
          const yOffset = Math.sin(time * item.bobSpeed + item.phase) * item.bobHeight;
          item.mesh.position.y = item.basePos.y + yOffset;
        });

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    // Adjust layouts on resize to keep objects visually framed
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Adjust positions based on screen width (desktop vs mobile layout)
      const isMobile = w < 768;
      items.forEach((item) => {
        if (item.mesh === mainTorus || item.mesh === orbitRing) {
          // Shift central knot to the center on mobile, right on desktop
          item.basePos.x = isMobile ? 0 : 4;
          item.basePos.y = isMobile ? 0.5 : 0;
        } else if (item.mesh === icoA) {
          item.basePos.x = isMobile ? 1.5 : 2;
        } else if (item.mesh === icoB) {
          item.basePos.x = isMobile ? -1.5 : -5;
        } else if (item.mesh === tetra) {
          item.basePos.x = isMobile ? -2.2 : -3.5;
        } else if (item.mesh === octa) {
          item.basePos.x = isMobile ? 2.2 : 5.5;
        }
      });

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Initial position framing call
    handleResize();

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Dispose geometries & materials
      torusKnotGeom.dispose();
      icosaGeom.dispose();
      tetraGeom.dispose();
      octaGeom.dispose();
      ringGeom.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();

      items.forEach((item) => {
        item.mesh.geometry.dispose();
        item.mesh.material.dispose();
        // Dispose inner point elements
        item.mesh.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    const PipelineFallback = React.lazy(() => import('./PipelineFallback'));
    return (
      <React.Suspense fallback={<div className="pipeline-fallback">Loading fallback...</div>}>
        <PipelineFallback />
      </React.Suspense>
    );
  }

  return (
    <div className="pipeline-canvas-wrap" ref={containerRef} aria-label="Interactive 3D floating wireframe nodes background" />
  );
}
