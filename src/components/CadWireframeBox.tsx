import React, { useState } from 'react';

interface CadWireframeBoxProps {
  sysTag: string;
  coordTag?: string;
  inspectMode?: boolean;
  accent?: 'cyan' | 'amber';
  className?: string;
  children: React.ReactNode;
}

export const CadWireframeBox: React.FC<CadWireframeBoxProps> = ({
  sysTag,
  coordTag,
  inspectMode = false,
  accent = 'cyan',
  className = '',
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || inspectMode;

  const isAmber = accent === 'amber';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group transition-all duration-300 rounded-none bg-[#06080e]/80 backdrop-blur-md ${
        isActive
          ? isAmber
            ? 'border border-[#f59e0b]/80 shadow-[0_0_26px_-4px_rgba(245,158,11,0.28),inset_0_0_16px_rgba(245,158,11,0.06)]'
            : 'border border-[#00f0ff]/80 shadow-[0_0_26px_-4px_rgba(0,240,255,0.28),inset_0_0_16px_rgba(59,130,246,0.08)]'
          : 'border border-slate-800/80 hover:border-[#00f0ff]/70'
      } ${className}`}
    >
      {/* Subtle CAD cross-grid overlay when active */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top-Left Monospace System Metadata Pill */}
      <div
        className={`pointer-events-none absolute -top-2.5 left-3 z-20 flex items-center gap-1.5 px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
          isActive
            ? isAmber
              ? 'bg-[#090a0f] text-[#f59e0b] border border-[#f59e0b]/60 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
              : 'bg-[#090a0f] text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
            : 'bg-[#090a0f] text-slate-400 border border-slate-800'
        }`}
      >
        <span
          className={`inline-block w-1.5 h-1.5 ${
            isActive
              ? isAmber
                ? 'bg-[#f59e0b]'
                : 'bg-[#00f0ff]'
              : 'bg-slate-600'
          }`}
        />
        <span>{sysTag}</span>
      </div>

      {/* Optional Top-Right Coordinate / Dimension Readout */}
      {coordTag && (
        <div
          className={`pointer-events-none absolute -top-2.5 right-3 z-20 px-1.5 py-0.5 font-mono text-[10px] tracking-wider bg-[#090a0f] border transition-all duration-200 ${
            isActive
              ? 'opacity-100 text-blue-400 border-blue-500/50'
              : 'opacity-0 text-slate-500 border-slate-800'
          }`}
        >
          {coordTag}
        </div>
      )}

      {/* 4 Corner Resize / Anchor Squares (3x3 px / w-1.5 h-1.5) */}
      <span
        className={`pointer-events-none absolute -top-1 -left-1 w-1.5 h-1.5 z-20 transition-all duration-200 ${
          isActive
            ? isAmber
              ? 'bg-amber-400 scale-100 opacity-100 shadow-[0_0_6px_#f59e0b]'
              : 'bg-cyan-400 scale-100 opacity-100 shadow-[0_0_6px_#00f0ff]'
            : 'bg-slate-600 scale-75 opacity-40'
        }`}
      />
      <span
        className={`pointer-events-none absolute -top-1 -right-1 w-1.5 h-1.5 z-20 transition-all duration-200 ${
          isActive
            ? isAmber
              ? 'bg-amber-400 scale-100 opacity-100 shadow-[0_0_6px_#f59e0b]'
              : 'bg-cyan-400 scale-100 opacity-100 shadow-[0_0_6px_#00f0ff]'
            : 'bg-slate-600 scale-75 opacity-40'
        }`}
      />
      <span
        className={`pointer-events-none absolute -bottom-1 -left-1 w-1.5 h-1.5 z-20 transition-all duration-200 ${
          isActive
            ? isAmber
              ? 'bg-amber-400 scale-100 opacity-100 shadow-[0_0_6px_#f59e0b]'
              : 'bg-cyan-400 scale-100 opacity-100 shadow-[0_0_6px_#00f0ff]'
            : 'bg-slate-600 scale-75 opacity-40'
        }`}
      />
      <span
        className={`pointer-events-none absolute -bottom-1 -right-1 w-1.5 h-1.5 z-20 transition-all duration-200 ${
          isActive
            ? isAmber
              ? 'bg-amber-400 scale-100 opacity-100 shadow-[0_0_6px_#f59e0b]'
              : 'bg-cyan-400 scale-100 opacity-100 shadow-[0_0_6px_#00f0ff]'
            : 'bg-slate-600 scale-75 opacity-40'
        }`}
      />

      {/* Mid-point Tick Marks (Top, Bottom, Left, Right) */}
      <span
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[2px] z-20 transition-opacity duration-200 ${
          isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
        }`}
      />
      <span
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-2.5 z-20 transition-opacity duration-200 ${
          isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
        }`}
      />

      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-[2px] z-20 transition-opacity duration-200 ${
          isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
        }`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1px] h-2.5 z-20 transition-opacity duration-200 ${
          isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
        }`}
      />

      <span
        className={`pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-[1px] z-20 transition-opacity duration-200 ${
          isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
        }`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-[1px] z-20 transition-opacity duration-200 ${
          isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
