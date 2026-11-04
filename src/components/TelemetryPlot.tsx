import React, { useEffect, useRef, useState } from 'react';
import { Activity, Play, Pause, RotateCcw } from 'lucide-react';

export type TelemetryTabMode = 'storm' | 'science' | 'effort';

interface TelemetryPlotProps {
  inspectMode?: boolean;
}

interface CurveSet {
  id: TelemetryTabMode;
  label: string;
  shortCode: string;
  yAxisLabel: string;
  yMax: number;
  yUnit: string;
  thresholdValue: number;
  thresholdLabel: string;
  summaryMetrics: {
    label: string;
    pidVal: string;
    ppoVal: string;
    delta: string;
  }[];
  description: string;
  // Returns [target, pid, ppo] at time t in [0, 20]
  sampleAt: (t: number) => { target: number; pid: number; ppo: number };
}

const CURVE_MODES: Record<TelemetryTabMode, CurveSet> = {
  storm: {
    id: 'storm',
    label: '[Solar Storm Safe-Mode]',
    shortCode: 'MODE.01 // 1000x SOLAR STORM + SEFI',
    yAxisLabel: 'ATTITUDE ERROR [deg]',
    yMax: 45,
    yUnit: '°',
    thresholdValue: 35.07,
    thresholdLabel: 'PPO SAFE-MODE BOUND (35.07°)',
    summaryMetrics: [
      { label: 'PEAK EXCURSION', pidVal: '42.80°', ppoVal: '35.07°', delta: 'BOUNDED' },
      { label: 'MEAN STORM ERR', pidVal: '18.14° ± 15.8°', ppoVal: '9.64° ± 2.4°', delta: '-46.8% DISP' },
      { label: 'INTEGRATOR STATE', pidVal: 'SEU WINDUP', ppoVal: 'MEMORYLESS', delta: 'ZERO CORRUPTION' },
    ],
    description:
      'Step-disturbance & Single-Event Functional Interrupt (SEFI) injection at t = 6.5s under 1000x extreme solar proton flux. Classical PID suffers stateful integrator windup; memoryless PPO maintains a strict 35.07° safety envelope.',
    sampleAt: (t: number) => {
      const target = 1.0;
      // Initial detumble from 28 deg (0 -> 6.5s), then 1000x SEFI torque impulse at t = 6.5s
      const initialDecay = 26 * Math.exp(-0.65 * t);
      const sefiPulse = t >= 6.2 ? Math.exp(-0.28 * (t - 6.2)) : 0;

      // Classical PID: experiences integrator windup & large oscillations after SEFI bit-flip
      const pidStorm =
        t >= 6.2
          ? 24.5 * sefiPulse * (1 + 0.55 * Math.sin((t - 6.2) * 2.1)) +
            11.8 * (1 - Math.exp(-0.25 * (t - 6.2))) +
            3.2 * Math.sin(t * 3.4)
          : 2.2 * Math.sin(t * 2.6) * Math.exp(-0.2 * t);
      const pid = Math.max(0.4, Math.min(43.5, initialDecay + Math.abs(pidStorm)));

      // Memoryless PPO: bounded at 35.07 deg peak, rapidly damps rate back to ~9.6 deg mean
      const ppoBurst =
        t >= 6.2
          ? 25.4 * Math.exp(-0.48 * (t - 6.2)) * Math.sin(Math.min(Math.PI, (t - 6.2) * 1.35))
          : 0;
      const ppoBase =
        24 * Math.exp(-0.78 * t) +
        (t >= 6.2 ? 9.6 * (1 - Math.exp(-0.45 * (t - 6.2))) : 0.85) +
        0.95 * Math.sin(t * 1.9);
      const ppo = Math.max(0.35, Math.min(35.07, ppoBase + Math.max(0, ppoBurst)));

      return { target, pid, ppo };
    },
  },
  science: {
    id: 'science',
    label: '[Sub-Degree Science Pointing]',
    shortCode: 'MODE.02 // NOMINAL LEO FINE POINTING',
    yAxisLabel: 'ATTITUDE ERROR [deg]',
    yMax: 5.0,
    yUnit: '°',
    thresholdValue: 1.0,
    thresholdLabel: 'FINE SCIENCE LOCK (< 1.00°)',
    summaryMetrics: [
      { label: 'SETTLING TIME (ts)', pidVal: '3.42 s', ppoVal: '3.18 s', delta: 'NOMINAL LOCK' },
      { label: 'MEDIAN FINAL ERR', pidVal: '0.11°', ppoVal: '0.13°', delta: '< 1.0° SPEC' },
      { label: 'ACQUISITION RATE', pidVal: '100.0%', ppoVal: '100.0%', delta: 'N=1,400 MC' },
    ],
    description:
      'Fine science-pointing acquisition from a 4.5° maneuver handoff. Layer-1 Classical PID eliminates steady-state bias (< 0.11° median error), while Layer-2 PPO provides rapid initial rate damping.',
    sampleAt: (t: number) => {
      const target = 0.1;
      // Smooth underdamped settling from 4.6 deg to < 0.15 deg
      const pid =
        4.45 * Math.exp(-0.82 * t) * Math.abs(Math.cos(t * 1.45)) +
        0.11 +
        0.04 * Math.sin(t * 2.8) * Math.exp(-0.12 * t) +
        (t > 14.0 && t < 16.8 ? 0.68 * Math.sin(((t - 14.0) / 2.8) * Math.PI) : 0);

      const ppo =
        4.35 * Math.exp(-0.95 * t) * (0.75 + 0.25 * Math.cos(t * 1.1)) +
        0.18 +
        0.06 * Math.sin(t * 1.7) +
        (t > 14.0 && t < 16.8 ? 0.24 * Math.sin(((t - 14.0) / 2.8) * Math.PI) : 0);

      return {
        target,
        pid: Math.max(0.05, Math.min(4.9, pid)),
        ppo: Math.max(0.08, Math.min(4.9, ppo)),
      };
    },
  },
  effort: {
    id: 'effort',
    label: '[Actuator Effort]',
    shortCode: 'MODE.03 // REACTION WHEEL TORQUE & IMPULSE',
    yAxisLabel: 'ATTITUDE ERROR [deg] // TORQUE [mN·m]',
    yMax: 5.5,
    yUnit: ' mN·m',
    thresholdValue: 5.0,
    thresholdLabel: 'RW MOTOR STALL LIMIT (5.0 mN·m)',
    summaryMetrics: [
      { label: 'ACTUATOR ENERGY', pidVal: '100% BASE', ppoVal: '70.0% (-30%)', delta: '-30% SAVED' },
      { label: 'PEAK RW TORQUE', pidVal: '4.92 mN·m', ppoVal: '3.15 mN·m', delta: 'NO SATURATION' },
      { label: 'WHEEL MOMENTUM', pidVal: '0.84 mN·m·s', ppoVal: '0.62 mN·m·s', delta: '< 3.14 LIMIT' },
    ],
    description:
      'Reaction wheel control torque demand across disturbance rejection cycles. Hybrid PPO+PID scheduling reduces cumulative actuator effort by 30% and prevents 5.0 mN·m motor stall saturation.',
    sampleAt: (t: number) => {
      const target = 0.65;
      // PID exhibits higher derivative kick on sensor noise spikes
      const noiseSpike =
        Math.pow(Math.sin(t * 3.7), 6) * 1.85 +
        (t > 6.0 && t < 9.5 ? 2.15 * Math.exp(-0.6 * (t - 6.0)) : 0);
      const pid = Math.min(
        4.95,
        3.6 * Math.exp(-0.7 * t) + 0.55 + noiseSpike + 0.25 * Math.abs(Math.sin(t * 5.2))
      );

      // PPO smooths control effort (-30% overall integral)
      const ppoSpike =
        Math.pow(Math.sin(t * 3.7 + 0.4), 8) * 0.95 +
        (t > 6.0 && t < 9.5 ? 1.25 * Math.exp(-0.75 * (t - 6.0)) : 0);
      const ppo = Math.min(
        3.65,
        2.5 * Math.exp(-0.85 * t) + 0.38 + ppoSpike + 0.14 * Math.abs(Math.cos(t * 3.9))
      );

      return { target, pid, ppo };
    },
  },
};

export const TelemetryPlot: React.FC<TelemetryPlotProps> = ({ inspectMode = false }) => {
  const [activeTab, setActiveTab] = useState<TelemetryTabMode>('storm');
  const [isPlaying, setIsPlaying] = useState(true);
  const [scanTime, setScanTime] = useState(8.4); // 0 to 20s
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const lastTsRef = useRef<number>(0);

  const mode = CURVE_MODES[activeTab];

  // Sweep scanline animation
  useEffect(() => {
    if (!isPlaying) return;
    let animId = 0;
    lastTsRef.current = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTsRef.current) * 0.001;
      lastTsRef.current = now;
      setScanTime((prev) => {
        const next = prev + dt * 2.2;
        return next > 20 ? 0 : next;
      });
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // SVG viewport geometry
  const width = 800;
  const height = 300;
  const padLeft = 56;
  const padRight = 24;
  const padTop = 26;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const xForTime = (t: number) => padLeft + (t / 20) * plotW;
  const yForVal = (v: number) => {
    const clamped = Math.max(0, Math.min(mode.yMax, v));
    return padTop + plotH - (clamped / mode.yMax) * plotH;
  };

  // Precompute polyline points (N = 120 samples across t = [0..20])
  const sampleCount = 120;
  const pidPoints: string[] = [];
  const ppoPoints: string[] = [];
  const ppoAreaPoints: string[] = [];
  const targetPoints: string[] = [];

  for (let i = 0; i <= sampleCount; i++) {
    const t = (i / sampleCount) * 20;
    const { target, pid, ppo } = mode.sampleAt(t);
    const x = xForTime(t).toFixed(1);
    pidPoints.push(`${x},${yForVal(pid).toFixed(1)}`);
    ppoPoints.push(`${x},${yForVal(ppo).toFixed(1)}`);
    ppoAreaPoints.push(`${x},${yForVal(ppo).toFixed(1)}`);
    targetPoints.push(`${x},${yForVal(target).toFixed(1)}`);
  }

  const ppoPolygon = `${xForTime(0).toFixed(1)},${(padTop + plotH).toFixed(1)} ${ppoAreaPoints.join(' ')} ${xForTime(20).toFixed(1)},${(padTop + plotH).toFixed(1)}`;

  const activeTime = hoverTime !== null ? hoverTime : scanTime;
  const activeSample = mode.sampleAt(activeTime);
  const scanX = xForTime(activeTime);
  const thresholdY = yForVal(mode.thresholdValue);

  const handlePointerMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(padLeft, Math.min(padLeft + plotW, relX));
    const t = ((clampedX - padLeft) / plotW) * 20;
    setHoverTime(t);
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => +(f * mode.yMax).toFixed(1));
  const xTicks = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20];

  return (
    <div className="relative bg-[#060709] border border-cyan-500/30 p-4 sm:p-5 select-none">
      {/* CAD Midpoint Tick Marks on Frame */}
      <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[2px] bg-[#00f0ff]" />
      <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-[2px] bg-[#00f0ff]" />
      <span className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]" />
      <span className="pointer-events-none absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]" />

      {/* Header & Mode Toggle Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-800/90">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#00f0ff] uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>OSCILLOSCOPE TELEMETRY // {mode.shortCode}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">{mode.description}</p>
        </div>

        {/* Toggle Tabs: [Solar Storm Safe-Mode] | [Sub-Degree Science Pointing] | [Actuator Effort] */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          {(Object.keys(CURVE_MODES) as TelemetryTabMode[]).map((tabKey) => {
            const tab = CURVE_MODES[tabKey];
            const isSelected = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-2.5 py-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] font-semibold shadow-[0_0_14px_rgba(0,240,255,0.25)]'
                    : 'bg-[#090c14] border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Readout Strip */}
      <div className="mt-3 mb-2 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#04060a] border border-slate-800/80 font-mono text-[11px]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-slate-400">
            TIME [s]:{' '}
            <strong className="text-white tabular-nums">{activeTime.toFixed(2)}s</strong>
          </span>
          <span className="flex items-center gap-1.5 text-[#00f0ff]">
            <span className="inline-block w-2.5 h-0.5 bg-[#00f0ff]" />
            <span>
              DEEP RL (PPO):{' '}
              <strong className="tabular-nums">
                {activeSample.ppo.toFixed(2)}
                {mode.yUnit}
              </strong>
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-[#f59e0b]">
            <span className="inline-block w-2.5 h-0.5 bg-[#f59e0b]" />
            <span>
              CLASSICAL PID:{' '}
              <strong className="tabular-nums">
                {activeSample.pid.toFixed(2)}
                {mode.yUnit}
              </strong>
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1 px-2 py-0.5 border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff] text-[10px] cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? '[PAUSE SWEEP]' : '[RESUME SWEEP]'}</span>
          </button>
          <button
            type="button"
            onClick={() => setScanTime(0)}
            className="inline-flex items-center gap-1 px-2 py-0.5 border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff] text-[10px] cursor-pointer"
            title="Reset telemetry sweep to t=0.0s"
          >
            <RotateCcw className="w-3 h-3" />
            <span>[RESET]</span>
          </button>
        </div>
      </div>

      {/* Interactive SVG Oscilloscope Canvas with 50px Pitch Faint Cyan Grid (#00f0ff15) */}
      <div
        className="relative w-full overflow-hidden border border-slate-800/90 bg-[#060709]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00f0ff15 1px, transparent 1px), linear-gradient(to bottom, #00f0ff15 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      >
        {/* Coordinate Axis Tags in Corners */}
        <div className="pointer-events-none absolute top-2 left-14 z-10 font-mono text-[10px] text-cyan-400/80 uppercase tracking-wider bg-[#060709]/80 px-1.5 py-0.5 border border-cyan-500/20">
          Y-AXIS // {mode.yAxisLabel}
        </div>
        <div className="pointer-events-none absolute bottom-2 right-4 z-10 font-mono text-[10px] text-cyan-400/80 uppercase tracking-wider bg-[#060709]/80 px-1.5 py-0.5 border border-cyan-500/20">
          X-AXIS // TIME [s]
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[250px] sm:h-[300px] block cursor-crosshair"
          onMouseMove={handlePointerMove}
          onMouseLeave={() => setHoverTime(null)}
        >
          <defs>
            <linearGradient id="ppoFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="scanlineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
              <stop offset="85%" stopColor="#00f0ff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Horizontal Y-Axis Sub-Grid & Labels */}
          {yTicks.map((val) => {
            const y = yForVal(val);
            return (
              <g key={`y-${val}`}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + plotW}
                  y2={y}
                  stroke="#00f0ff"
                  strokeOpacity="0.09"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-500 font-mono text-[10px]"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Vertical X-Axis Sub-Grid & Labels */}
          {xTicks.map((tVal) => {
            const x = xForTime(tVal);
            return (
              <g key={`x-${tVal}`}>
                <line
                  x1={x}
                  y1={padTop}
                  x2={x}
                  y2={padTop + plotH}
                  stroke="#00f0ff"
                  strokeOpacity="0.09"
                  strokeDasharray="3 3"
                />
                <text
                  x={x}
                  y={padTop + plotH + 16}
                  textAnchor="middle"
                  className="fill-slate-500 font-mono text-[10px]"
                >
                  {tVal.toFixed(1)}s
                </text>
              </g>
            );
          })}

          {/* SEFI / Solar Storm Event Highlight Zone */}
          {activeTab === 'storm' && (
            <g>
              <rect
                x={xForTime(6.2)}
                y={padTop}
                width={xForTime(13.5) - xForTime(6.2)}
                height={plotH}
                fill="#f59e0b"
                fillOpacity="0.06"
              />
              <line
                x1={xForTime(6.2)}
                y1={padTop}
                x2={xForTime(6.2)}
                y2={padTop + plotH}
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="4 2"
                strokeOpacity="0.7"
              />
              <text
                x={xForTime(6.4)}
                y={padTop + 14}
                className="fill-amber-400 font-mono text-[9px]"
              >
                ⚡ SEFI UPSET + 1000x FLUX
              </text>
            </g>
          )}

          {/* Threshold / Envelope Reference Line */}
          <line
            x1={padLeft}
            y1={thresholdY}
            x2={padLeft + plotW}
            y2={thresholdY}
            stroke={activeTab === 'storm' ? '#f59e0b' : '#10b981'}
            strokeWidth="1.2"
            strokeDasharray="6 4"
            strokeOpacity="0.8"
          />
          <text
            x={padLeft + plotW - 6}
            y={thresholdY - 5}
            textAnchor="end"
            className={`font-mono text-[9px] ${
              activeTab === 'storm' ? 'fill-amber-400' : 'fill-emerald-400'
            }`}
          >
            {mode.thresholdLabel}
          </text>

          {/* PPO Shaded Area Under Curve */}
          <polygon points={ppoPolygon} fill="url(#ppoFillGrad)" />

          {/* Classical PID Trajectory (Amber Dashed/Solid) */}
          <polyline
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="6 3"
            points={pidPoints.join(' ')}
          />

          {/* Memoryless Deep RL (PPO) Trajectory (Glowing Cyan Solid) */}
          <polyline
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.4"
            points={ppoPoints.join(' ')}
          />

          {/* Live Sweeping Scanline Trail & Bar */}
          <rect
            x={Math.max(padLeft, scanX - 42)}
            y={padTop}
            width={Math.min(42, scanX - padLeft)}
            height={plotH}
            fill="url(#scanlineGrad)"
          />
          <line
            x1={scanX}
            y1={padTop}
            x2={scanX}
            y2={padTop + plotH}
            stroke="#00f0ff"
            strokeWidth="1.4"
            strokeOpacity="0.9"
          />

          {/* Active Sample Markers on Scanline */}
          <circle
            cx={scanX}
            cy={yForVal(activeSample.pid)}
            r="4"
            fill="#060709"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <circle
            cx={scanX}
            cy={yForVal(activeSample.ppo)}
            r="4.5"
            fill="#00f0ff"
            stroke="#ffffff"
            strokeWidth="1.5"
          />

          {/* Inspect Mode Extra Coordinate Overlay */}
          {inspectMode && (
            <g>
              <text
                x={scanX + 6}
                y={Math.max(padTop + 14, yForVal(activeSample.ppo) - 8)}
                className="fill-cyan-300 font-mono text-[9px]"
              >
                PPO[{activeTime.toFixed(1)}s]={activeSample.ppo.toFixed(2)}
              </text>
              <text
                x={scanX + 6}
                y={Math.min(padTop + plotH - 6, yForVal(activeSample.pid) + 12)}
                className="fill-amber-300 font-mono text-[9px]"
              >
                PID[{activeTime.toFixed(1)}s]={activeSample.pid.toFixed(2)}
              </text>
            </g>
          )}

          {/* Plot Frame Border */}
          <rect
            x={padLeft}
            y={padTop}
            width={plotW}
            height={plotH}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Bottom Benchmark Comparison Telemetry Cards */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        {mode.summaryMetrics.map((item) => (
          <div
            key={item.label}
            className="p-2.5 bg-[#04060a] border border-slate-800/90 flex items-center justify-between gap-2"
          >
            <div>
              <div className="text-[10px] text-slate-500 uppercase">{item.label}</div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px]">
                <span className="text-[#00f0ff] font-semibold">PPO: {item.ppoVal}</span>
                <span className="text-slate-600">vs</span>
                <span className="text-amber-400/90">PID: {item.pidVal}</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-300">
              {item.delta}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
