import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface OrbitalGimbalProps {
  inspectMode?: boolean;
}

export const OrbitalGimbal: React.FC<OrbitalGimbalProps> = ({ inspectMode = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [stormMode, setStormMode] = useState(false);
  const stormRef = useRef(false);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    stormRef.current = stormMode;
  }, [stormMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lightweight wireframe & dark-metallic materials
    const outerWireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });

    const cyanWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    const darkCoreMat = new THREE.MeshBasicMaterial({
      color: 0x0b1324,
      transparent: true,
      opacity: 0.85,
    });

    const amberWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
    });

    // 1. Static Outer Reference Horizon Ring (with degree ticks)
    const refGeo = new THREE.RingGeometry(2.32, 2.35, 64);
    const refRing = new THREE.Mesh(
      refGeo,
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.28,
      })
    );
    rootGroup.add(refRing);

    // 2. Outer Gimbal Ring — Roll Axis (TorusGeometry wireframe)
    const outerGimbal = new THREE.Group();
    const torusOuterGeo = new THREE.TorusGeometry(2.05, 0.045, 10, 56);
    const torusOuterMesh = new THREE.Mesh(torusOuterGeo, outerWireMat);
    outerGimbal.add(torusOuterMesh);
    rootGroup.add(outerGimbal);

    // 3. Middle Gimbal Ring — Pitch Axis (TorusGeometry glowing cyan wireframe)
    const midGimbal = new THREE.Group();
    const torusMidGeo = new THREE.TorusGeometry(1.58, 0.04, 10, 48);
    const torusMidMesh = new THREE.Mesh(torusMidGeo, cyanWireMat);
    midGimbal.add(torusMidMesh);
    outerGimbal.add(midGimbal);

    // 4. Inner Reaction Wheel Ring — Yaw Axis (TorusGeometry amber accent wireframe)
    const innerGimbal = new THREE.Group();
    const torusInnerGeo = new THREE.TorusGeometry(1.12, 0.038, 8, 40);
    const torusInnerMesh = new THREE.Mesh(torusInnerGeo, amberWireMat);
    innerGimbal.add(torusInnerMesh);
    midGimbal.add(innerGimbal);

    // 5. Central 3U CubeSat Attitude Bus + Principal Body Axes
    const cubeSatGroup = new THREE.Group();
    const busGeo = new THREE.BoxGeometry(0.56, 0.78, 0.56);
    const busSolid = new THREE.Mesh(busGeo, darkCoreMat);
    const busEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(busGeo),
      new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.95 })
    );
    cubeSatGroup.add(busSolid);
    cubeSatGroup.add(busEdges);

    // Principal axis vector lines (X, Y, Z)
    const axisPoints = [
      new THREE.Vector3(-1.45, 0, 0),
      new THREE.Vector3(1.45, 0, 0),
      new THREE.Vector3(0, -1.45, 0),
      new THREE.Vector3(0, 1.45, 0),
      new THREE.Vector3(0, 0, -1.45),
      new THREE.Vector3(0, 0, 1.45),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axisLines = new THREE.LineSegments(
      axisGeo,
      new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.45 })
    );
    cubeSatGroup.add(axisLines);
    innerGimbal.add(cubeSatGroup);

    // 6. Orbital Keplerian Trajectory Ellipses & Target Satellite Marker
    const orbitCurveGeo = new THREE.TorusGeometry(2.48, 0.008, 6, 72);
    const orbitCurve = new THREE.Mesh(
      orbitCurveGeo,
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 })
    );
    orbitCurve.rotation.x = Math.PI / 2.6;
    orbitCurve.rotation.y = Math.PI / 7;
    rootGroup.add(orbitCurve);

    const satNodeGeo = new THREE.OctahedronGeometry(0.08, 0);
    const satNode = new THREE.Mesh(
      satNodeGeo,
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true })
    );
    orbitCurve.add(satNode);

    // Interactive mouse parallax target
    let targetRotX = 0.25;
    let targetRotY = -0.35;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (nx >= -1.4 && nx <= 1.4 && ny >= -1.4 && ny <= 1.4) {
        targetRotY = nx * 0.55;
        targetRotX = ny * 0.45;
      }
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 440;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId = 0;
    let lastHudUpdate = 0;
    const quat = new THREE.Quaternion();

    const animate = (time: number) => {
      const t = time * 0.001;
      const isStorm = stormRef.current;
      const speedMult = isStorm ? 3.2 : 1.0;

      // Smooth root orientation tracking mouse
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.06;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;

      // Multi-axis gimbal smooth orbital mechanics rotation
      outerGimbal.rotation.y = t * 0.45 * speedMult;
      outerGimbal.rotation.x = Math.sin(t * 0.35) * 0.35;

      midGimbal.rotation.x = t * 0.68 * speedMult;
      midGimbal.rotation.z = Math.cos(t * 0.5) * 0.4;

      innerGimbal.rotation.z = -t * 0.95 * speedMult;
      innerGimbal.rotation.y = Math.sin(t * 0.8) * 0.3;

      // CubeSat reaction wheel fine stabilization
      cubeSatGroup.rotation.x = Math.sin(t * 1.4) * (isStorm ? 0.45 : 0.08);
      cubeSatGroup.rotation.y = t * 0.3;

      // Orbiting telemetry node along Keplerian ring
      const orbitAngle = t * 1.15;
      satNode.position.set(
        Math.cos(orbitAngle) * 2.48,
        Math.sin(orbitAngle) * 2.48,
        0
      );

      // Update live quaternion readout in DOM every ~120ms (zero React re-render overhead)
      if (time - lastHudUpdate > 120 && telemetryRef.current) {
        cubeSatGroup.getWorldQuaternion(quat);
        const errDeg = isStorm
          ? (18.4 + Math.abs(Math.sin(t * 2.3)) * 16.6).toFixed(2)
          : (0.12 + Math.abs(Math.sin(t * 0.9)) * 0.24).toFixed(2);
        telemetryRef.current.textContent = `Q:[${quat.w.toFixed(2)}, ${quat.x.toFixed(2)}, ${quat.y.toFixed(2)}, ${quat.z.toFixed(2)}] // ERR: ${errDeg}°`;
        lastHudUpdate = time;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[430px] flex flex-col justify-between select-none overflow-hidden">
      {/* Top HUD Overlay inside 3D Viewport */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 font-mono text-[11px]">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>ADCS.GIMBAL // 3-AXIS RW</span>
        </div>
        <button
          type="button"
          onClick={() => setStormMode((prev) => !prev)}
          className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
            stormMode
              ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
              : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:border-cyan-400'
          }`}
        >
          {stormMode ? '⚡ 1000x SOLAR STORM [PPO RECOVERY]' : 'MODE: NOMINAL [PID + PPO]'}
        </button>
      </div>

      {/* Three.js WebGL Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Reticle Crosshairs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
        <div className="w-64 h-64 rounded-full border border-dashed border-cyan-500/40" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* Bottom Attitude Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 pb-3 font-mono text-[10px] text-slate-400 border-t border-slate-800/80 bg-[#05070c]/70 backdrop-blur-sm pt-2">
        <div ref={telemetryRef} className="text-cyan-400">
          Q:[0.98, 0.12, -0.08, 0.04] // ERR: 0.21°
        </div>
        <div className="flex items-center gap-3">
          <span className={inspectMode ? 'text-amber-400' : 'text-slate-400'}>
            RK4 Δt=0.05s
          </span>
          <span className="text-blue-400">LEO 550KM // INC 97.6°</span>
        </div>
      </div>
    </div>
  );
};
