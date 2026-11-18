import React from 'react';

/**
 * Full-bleed technical CAD blueprint drawing of a launch vehicle ascending off the pad,
 * rendered strictly with Luka's 12-swatch palette (#090807, #1d6291, #718fa7, #88a2bd, #b1bdca, #c6b7a2, #e0ddd8).
 */
export const CoverRocketCad: React.FC = () => {
  return (
    <svg
      viewBox="0 0 1280 720"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="plumeGlow" cx="50%" cy="15%" r="65%">
          <stop offset="0%" stopColor="#c6b7a2" stopOpacity="0.42" />
          <stop offset="40%" stopColor="#1d6291" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#090807" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orbitalHalo" cx="72%" cy="38%" r="48%">
          <stop offset="0%" stopColor="#1d6291" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#718fa7" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#090807" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vehicleBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d6291" stopOpacity="0.32" />
          <stop offset="50%" stopColor="#88a2bd" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#090807" stopOpacity="0.55" />
        </linearGradient>
        <pattern id="cadMinorGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#718fa7" strokeWidth="0.5" strokeOpacity="0.13" />
        </pattern>
        <pattern id="cadMajorGrid" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="url(#cadMinorGrid)" />
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#88a2bd" strokeWidth="0.9" strokeOpacity="0.2" />
        </pattern>
      </defs>

      {/* Base blueprint grid & atmospheric glow */}
      <rect width="1280" height="720" fill="#090807" />
      <rect width="1280" height="720" fill="url(#cadMajorGrid)" />
      <rect width="1280" height="720" fill="url(#orbitalHalo)" />

      {/* Outer engineering drawing border & tick ruler */}
      <rect
        x="24"
        y="24"
        width="1232"
        height="672"
        fill="none"
        stroke="#718fa7"
        strokeWidth="1"
        strokeOpacity="0.32"
      />
      <rect
        x="30"
        y="30"
        width="1220"
        height="660"
        fill="none"
        stroke="#a0947e"
        strokeWidth="0.6"
        strokeOpacity="0.24"
      />

      {/* Orbital reference arcs behind launch trajectory */}
      <circle
        cx="930"
        cy="390"
        r="285"
        fill="none"
        stroke="#718fa7"
        strokeWidth="1"
        strokeDasharray="6 6"
        strokeOpacity="0.3"
      />
      <circle
        cx="930"
        cy="390"
        r="210"
        fill="none"
        stroke="#88a2bd"
        strokeWidth="0.8"
        strokeOpacity="0.24"
      />
      <path
        d="M 650 650 Q 820 430 980 70"
        fill="none"
        stroke="#c6b7a2"
        strokeWidth="1.2"
        strokeDasharray="7 5"
        strokeOpacity="0.45"
      />

      {/* Launch pad & umbilical lattice tower (bottom-right) */}
      <g transform="translate(860, 445)" stroke="#718fa7" strokeOpacity="0.48" fill="none">
        {/* Flame trench & concrete pad */}
        <path d="M -180 215 H 270" stroke="#a0947e" strokeWidth="1.4" strokeOpacity="0.55" />
        <path d="M -95 215 L -65 182 H 15 L 40 215" stroke="#88a2bd" strokeWidth="1.2" />
        <line x1="-130" y1="227" x2="230" y2="227" stroke="#718fa7" strokeWidth="0.7" strokeDasharray="4 4" />

        {/* Umbilical truss tower */}
        <rect x="92" y="-120" width="54" height="302" strokeWidth="1.2" stroke="#88a2bd" />
        <line x1="119" y1="-120" x2="119" y2="182" strokeWidth="0.7" strokeDasharray="3 4" />
        {[-120, -60, 0, 60, 120].map((y) => (
          <g key={y}>
            <line x1="92" y1={y} x2="146" y2={y + 60} strokeWidth="0.85" />
            <line x1="146" y1={y} x2="92" y2={y + 60} strokeWidth="0.85" />
            <line x1="92" y1={y} x2="146" y2={y} strokeWidth="1" />
          </g>
        ))}

        {/* Retracted umbilical swing arms */}
        <path d="M 92 -55 L 36 -74 L 36 -64 L 92 -42" stroke="#c6b7a2" strokeWidth="1.1" />
        <path d="M 92 38 L 42 22 L 42 32 L 92 50" stroke="#c6b7a2" strokeWidth="1.1" />
        <line x1="146" y1="-120" x2="178" y2="-120" stroke="#b1bdca" strokeWidth="0.9" />
        <text x="184" y="-116" fill="#88a2bd" stroke="none" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.75">
          GANTRY // EL +48.5m
        </text>
      </g>

      {/* Main CAD Launch Vehicle tilted along pitch-over climb (+17 deg) */}
      <g transform="translate(888, 345) rotate(17)">
        {/* Exhaust plume glow & CAD shock diamonds */}
        <ellipse cx="0" cy="240" rx="58" ry="125" fill="url(#plumeGlow)" />
        <path
          d="M -18 160 L -36 310 M 18 160 L 36 310 M -8 160 L -16 325 M 8 160 L 16 325"
          stroke="#c6b7a2"
          strokeWidth="0.9"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />
        {/* Shock diamonds */}
        {[192, 232, 272].map((y, idx) => {
          const w = 14 - idx * 3;
          return (
            <polygon
              key={y}
              points={`0,${y - 12} ${w},${y} 0,${y + 12} ${-w},${y}`}
              fill="none"
              stroke="#e0ddd8"
              strokeWidth="0.9"
              strokeOpacity={0.55 - idx * 0.14}
            />
          );
        })}

        {/* Vehicle Axial Centerline */}
        <line
          x1="0"
          y1="-252"
          x2="0"
          y2="295"
          stroke="#b1bdca"
          strokeWidth="0.9"
          strokeDasharray="10 4 2 4"
          strokeOpacity="0.65"
        />

        {/* Stage 1 + Stage 2 + Ogive Payload Fairing Silhouette */}
        <path
          d="M 0 -226 C 14 -202 25 -172 26 -140 L 26 -58 L 28 -48 L 28 118 L 37 136 L 37 146 L -37 146 L -37 136 L -28 118 L -28 -48 L -26 -58 L -26 -140 C -25 -172 -14 -202 0 -226 Z"
          fill="url(#vehicleBody)"
          stroke="#e0ddd8"
          strokeWidth="1.8"
        />

        {/* Payload Fairing internal 3U CubeSat cutaway */}
        <rect
          x="-11"
          y="-168"
          width="22"
          height="46"
          fill="none"
          stroke="#c6b7a2"
          strokeWidth="1.1"
          strokeDasharray="3 2"
        />
        <line x1="-11" y1="-152" x2="11" y2="-152" stroke="#c6b7a2" strokeWidth="0.8" />
        <line x1="-11" y1="-137" x2="11" y2="-137" stroke="#c6b7a2" strokeWidth="0.8" />

        {/* Stage separation & internal LOX/Fuel bulkhead CAD arcs */}
        <line x1="-26" y1="-110" x2="26" y2="-110" stroke="#88a2bd" strokeWidth="1.2" />
        <line x1="-26" y1="-58" x2="26" y2="-58" stroke="#e0ddd8" strokeWidth="1.4" />
        <path d="M -26 -98 Q 0 -114 26 -98" fill="none" stroke="#718fa7" strokeWidth="0.9" strokeDasharray="3 2" />
        <path d="M -28 -36 Q 0 -52 28 -36" fill="none" stroke="#718fa7" strokeWidth="0.9" strokeDasharray="3 2" />
        <path d="M -28 32 Q 0 18 28 32" fill="none" stroke="#718fa7" strokeWidth="0.9" strokeDasharray="3 2" />
        <path d="M -28 106 Q 0 120 28 106" fill="none" stroke="#718fa7" strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Interstage truss lattice */}
        <path
          d="M -26 -58 L -8 -44 L 8 -58 L 26 -44 M -26 -44 L -8 -58 L 8 -44 L 26 -58"
          fill="none"
          stroke="#b1bdca"
          strokeWidth="0.85"
          strokeOpacity="0.8"
        />

        {/* Aerodynamic Stabilizer Fins / RCS Fairings */}
        <polygon points="-28,98 -44,136 -28,136" fill="#1d6291" fillOpacity="0.35" stroke="#e0ddd8" strokeWidth="1.2" />
        <polygon points="28,98 44,136 28,136" fill="#1d6291" fillOpacity="0.35" stroke="#e0ddd8" strokeWidth="1.2" />

        {/* Main Gimbaled Bell Nozzle + Vernier Nozzles */}
        <path
          d="M -14 146 L -22 172 L 22 172 L 14 146 Z"
          fill="#3e3b32"
          fillOpacity="0.8"
          stroke="#e0ddd8"
          strokeWidth="1.5"
        />
        <line x1="-18" y1="159" x2="18" y2="159" stroke="#a0947e" strokeWidth="0.8" />
        <path d="M -27 146 L -31 161 L -21 161 L -19 146" fill="none" stroke="#b1bdca" strokeWidth="1" />
        <path d="M 27 146 L 31 161 L 21 161 L 19 146" fill="none" stroke="#b1bdca" strokeWidth="1" />

        {/* CG & CP engineering markers */}
        <g transform="translate(0, 12)">
          <circle cx="0" cy="0" r="6" fill="none" stroke="#c6b7a2" strokeWidth="1.1" />
          <path d="M 0 -6 A 6 6 0 0 1 6 0 L 0 0 Z" fill="#c6b7a2" />
          <path d="M 0 6 A 6 6 0 0 1 -6 0 L 0 0 Z" fill="#c6b7a2" />
        </g>

        {/* CAD Station Dimension Ticks (Left side of rocket) */}
        <g stroke="#88a2bd" strokeWidth="0.8" opacity="0.75">
          <line x1="-68" y1="-226" x2="-68" y2="172" />
          <line x1="-74" y1="-226" x2="-12" y2="-226" strokeDasharray="2 3" />
          <line x1="-74" y1="-110" x2="-30" y2="-110" strokeDasharray="2 3" />
          <line x1="-74" y1="-58" x2="-30" y2="-58" strokeDasharray="2 3" />
          <line x1="-74" y1="12" x2="-10" y2="12" strokeDasharray="2 3" />
          <line x1="-74" y1="172" x2="-26" y2="172" strokeDasharray="2 3" />
        </g>

        {/* CAD Callout Labels (Horizontal in rotated frame -> technical feel) */}
        <g fill="#b1bdca" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
          <line x1="20" y1="-195" x2="72" y2="-195" stroke="#88a2bd" strokeWidth="0.8" />
          <text x="77" y="-192">OGIVE FAIRING // 3U PAYLOAD</text>

          <line x1="28" y1="-52" x2="78" y2="-52" stroke="#88a2bd" strokeWidth="0.8" />
          <text x="83" y="-49">INTERSTAGE TRUSS // STA-168</text>

          <line x1="10" y1="12" x2="78" y2="12" stroke="#c6b7a2" strokeWidth="0.8" />
          <text x="83" y="15" fill="#c6b7a2">CG / PROPELLANT BULKHEAD</text>

          <line x1="22" y1="164" x2="78" y2="164" stroke="#88a2bd" strokeWidth="0.8" />
          <text x="83" y="167">GIMBAL NOZZLE // TVC ±6°</text>
        </g>
      </g>

      {/* Top-right CAD Drawing Title Block */}
      <g transform="translate(970, 48)" fontFamily="JetBrains Mono, monospace">
        <rect
          x="0"
          y="0"
          width="258"
          height="64"
          fill="#090807"
          fillOpacity="0.8"
          stroke="#718fa7"
          strokeWidth="0.9"
          strokeOpacity="0.45"
        />
        <line x1="0" y1="22" x2="258" y2="22" stroke="#718fa7" strokeWidth="0.7" strokeOpacity="0.35" />
        <line x1="145" y1="22" x2="145" y2="64" stroke="#718fa7" strokeWidth="0.7" strokeOpacity="0.35" />
        <text x="10" y="14" fill="#88a2bd" fontSize="8.5" letterSpacing="1.2">
          DWG NO: LB-AERO-2026-01
        </text>
        <text x="10" y="39" fill="#e0ddd8" fontSize="9">
          ASCENT CAD // REV 09
        </text>
        <text x="10" y="54" fill="#a0947e" fontSize="8.5">
          PROJ: ORBITAL 3U LV
        </text>
        <text x="155" y="39" fill="#c6b7a2" fontSize="8.5">
          PITCH: +17.0°
        </text>
        <text x="155" y="54" fill="#718fa7" fontSize="8.5">
          SCALE: 1:100
        </text>
      </g>
    </svg>
  );
};
