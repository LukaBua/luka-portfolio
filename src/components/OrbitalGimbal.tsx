import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface OrbitalGimbalProps {
  compact?: boolean;
}

export const OrbitalGimbal: React.FC<OrbitalGimbalProps> = ({ compact = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [stormMode, setStormMode] = useState(false);
  const stormRef = useRef(false);
  const telemetryRef = useRef<HTMLDivElement | null>(null);
  const targetRotRef = useRef({ x: 0.25, y: -0.35 });
  const animIdRef = useRef(0);
  const lastHudUpdateRef = useRef(0);

  useEffect(() => {
    stormRef.current = stormMode;
  }, [stormMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 230;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 6.4);
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

    const slateMat = new THREE.MeshBasicMaterial({
      color: 0x1d6291,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    const steelMat = new THREE.MeshBasicMaterial({
      color: 0x88a2bd,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
    });

    const darkCoreMat = new THREE.MeshBasicMaterial({
      color: 0x090807,
      transparent: true,
      opacity: 0.9,
    });

    const sandMat = new THREE.MeshBasicMaterial({
      color: 0xc6b7a2,
      wireframe: true,
      transparent: true,
      opacity: 0.78,
    });

    const refRing = new THREE.Mesh(
      new THREE.RingGeometry(2.32, 2.35, 64),
      new THREE.MeshBasicMaterial({
        color: 0x718fa7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.32,
      })
    );
    rootGroup.add(refRing);

    const outerGimbal = new THREE.Group();
    outerGimbal.add(new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.045, 10, 56), slateMat));
    rootGroup.add(outerGimbal);

    const midGimbal = new THREE.Group();
    midGimbal.add(new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.04, 10, 48), steelMat));
    outerGimbal.add(midGimbal);

    const innerGimbal = new THREE.Group();
    innerGimbal.add(new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.038, 8, 40), sandMat));
    midGimbal.add(innerGimbal);

    const cubeSatGroup = new THREE.Group();
    const busGeo = new THREE.BoxGeometry(0.56, 0.78, 0.56);
    cubeSatGroup.add(new THREE.Mesh(busGeo, darkCoreMat));
    cubeSatGroup.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(busGeo),
        new THREE.LineBasicMaterial({ color: 0xe0ddd8, transparent: true, opacity: 0.92 })
      )
    );

    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.45, 0, 0),
      new THREE.Vector3(1.45, 0, 0),
      new THREE.Vector3(0, -1.45, 0),
      new THREE.Vector3(0, 1.45, 0),
      new THREE.Vector3(0, 0, -1.45),
      new THREE.Vector3(0, 0, 1.45),
    ]);
    cubeSatGroup.add(
      new THREE.LineSegments(
        axisGeo,
        new THREE.LineBasicMaterial({ color: 0x718fa7, transparent: true, opacity: 0.55 })
      )
    );
    innerGimbal.add(cubeSatGroup);

    const orbitCurve = new THREE.Mesh(
      new THREE.TorusGeometry(2.48, 0.009, 6, 72),
      new THREE.MeshBasicMaterial({ color: 0x88a2bd, transparent: true, opacity: 0.35 })
    );
    orbitCurve.rotation.x = Math.PI / 2.6;
    orbitCurve.rotation.y = Math.PI / 7;
    rootGroup.add(orbitCurve);

    const satNode = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.08, 0),
      new THREE.MeshBasicMaterial({ color: 0xc6b7a2, wireframe: true })
    );
    orbitCurve.add(satNode);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (nx >= -1.4 && nx <= 1.4 && ny >= -1.4 && ny <= 1.4) {
        targetRotRef.current = { x: ny * 0.45, y: nx * 0.55 };
      }
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 230;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const quat = new THREE.Quaternion();

    const animate = (time: number) => {
      const t = time * 0.001;
      const isStorm = stormRef.current;
      const speedMult = isStorm ? 3.2 : 1.0;

      rootGroup.rotation.x += (targetRotRef.current.x - rootGroup.rotation.x) * 0.06;
      rootGroup.rotation.y += (targetRotRef.current.y - rootGroup.rotation.y) * 0.06;

      outerGimbal.rotation.y = t * 0.45 * speedMult;
      outerGimbal.rotation.x = Math.sin(t * 0.35) * 0.35;

      midGimbal.rotation.x = t * 0.68 * speedMult;
      midGimbal.rotation.z = Math.cos(t * 0.5) * 0.4;

      innerGimbal.rotation.z = -t * 0.95 * speedMult;
      innerGimbal.rotation.y = Math.sin(t * 0.8) * 0.3;

      cubeSatGroup.rotation.x = Math.sin(t * 1.4) * (isStorm ? 0.45 : 0.08);
      cubeSatGroup.rotation.y = t * 0.3;

      const orbitAngle = t * 1.15;
      satNode.position.set(Math.cos(orbitAngle) * 2.48, Math.sin(orbitAngle) * 2.48, 0);

      if (time - lastHudUpdateRef.current > 120 && telemetryRef.current) {
        cubeSatGroup.getWorldQuaternion(quat);
        const errDeg = isStorm
          ? (18.4 + Math.abs(Math.sin(t * 2.3)) * 16.6).toFixed(2)
          : (0.12 + Math.abs(Math.sin(t * 0.9)) * 0.24).toFixed(2);
        telemetryRef.current.textContent = `Q:[${quat.w.toFixed(2)}, ${quat.x.toFixed(2)}, ${quat.y.toFixed(2)}, ${quat.z.toFixed(2)}] // ERR: ${errDeg}°`;
        lastHudUpdateRef.current = time;
      }

      renderer.render(scene, camera);
      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full bg-[#090807] border border-[#718fa7]/45 flex flex-col justify-between select-none overflow-hidden ${
        compact ? 'h-[195px]' : 'h-[260px]'
      }`}
    >
      <div className="relative z-10 flex items-center justify-between px-3 pt-2 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-[#b1bdca]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#88a2bd] animate-pulse" />
          <span>3U ADCS GIMBAL // 3-AXIS RW</span>
        </div>
        <button
          type="button"
          onClick={() => setStormMode((prev) => !prev)}
          className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
            stormMode
              ? 'border-[#c6b7a2] bg-[#493716]/75 text-[#e0ddd8]'
              : 'border-[#718fa7]/60 bg-[#1d6291]/30 text-[#b1bdca] hover:border-[#b1bdca]'
          }`}
        >
          {stormMode ? '1000x STORM [PPO]' : 'NOMINAL [PID + PPO]'}
        </button>
      </div>

      <div ref={mountRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 flex items-center justify-between gap-2 px-3 pb-2 pt-1.5 font-mono text-[9.5px] text-[#a0947e] border-t border-[#3e3b32]/80 bg-[#090807]/85">
        <div ref={telemetryRef} className="text-[#b1bdca]">
          Q:[0.98, 0.12, -0.08, 0.04] // ERR: 0.21°
        </div>
        <span className="text-[#88a2bd]">LEO 550km // RK4 Δt=0.05s</span>
      </div>
    </div>
  );
};
