import React from 'react';
import { Crosshair, Zap } from 'lucide-react';

interface TelemetryDockProps {
  fps: number;
  agentCount: number;
  inspectMode: boolean;
  onToggleInspect: () => void;
  onPurgeAgents: () => void;
}

export const TelemetryDock: React.FC<TelemetryDockProps> = ({
  fps,
  agentCount,
  inspectMode,
  onToggleInspect,
  onPurgeAgents,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw]">
      <div className="flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 rounded-full bg-[#060709]/92 backdrop-blur-xl border border-cyan-500/35 shadow-[0_0_30px_rgba(0,240,255,0.16)] font-mono text-[11px] sm:text-xs text-slate-200">
        {/* Status Indicator Dot */}
        <div className="flex items-center gap-1.5 pr-2 sm:pr-3 border-r border-slate-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-emerald-400 font-semibold tracking-wider">● SYS_ONLINE</span>
        </div>

        {/* Live Agent Counter */}
        <div className="hidden xs:flex sm:flex items-center gap-1 pr-2 sm:pr-3 border-r border-slate-800 text-slate-300">
          <span className="text-cyan-400 font-semibold">[{agentCount}]</span>
          <span className="text-slate-400">AGENTS</span>
        </div>

        {/* Live FPS Counter */}
        <div className="flex items-center gap-1 pr-2 sm:pr-3 border-r border-slate-800">
          <span
            className={`font-semibold tabular-nums ${
              fps >= 55 ? 'text-cyan-400' : 'text-amber-400'
            }`}
          >
            {fps}
          </span>
          <span className="text-slate-400">FPS</span>
        </div>

        {/* Inspect Mode Toggle */}
        <button
          type="button"
          onClick={onToggleInspect}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
            inspectMode
              ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.35)]'
              : 'border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300'
          }`}
          title="Force all CAD wireframe corner anchors and dimension lines active"
        >
          <Crosshair className="w-3 h-3" />
          <span>[Inspect Mode]</span>
        </button>

        {/* Purge Agents Button */}
        <button
          type="button"
          onClick={onPurgeAgents}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/25 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] text-[11px] uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
          title="Scatter autonomous boid agents with a repulsion shockwave"
        >
          <Zap className="w-3 h-3" />
          <span>[Purge]</span>
        </button>
      </div>
    </div>
  );
};
