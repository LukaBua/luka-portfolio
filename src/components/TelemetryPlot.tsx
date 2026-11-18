import React, { useEffect, useRef, useState } from 'react';
import { Activity, Pause, Play, RotateCcw } from 'lucide-react';

export type TelemetryTabMode = 'storm' | 'science' | 'effort';

interface CurveSet {
  id: TelemetryTabMode;
  label: string;
  shortCode: string;
  yAxisLabel: string;
  yMax: number;
  yUnit: string;
  thresholdValue: number;
  thresholdLabel: string;
  sampleAt: (t: number) => { target: number; pid: number; ppo: number };
}

const CURVE_MODES: Record<TelemetryTabMode, CurveSet> = {
  storm: {
    id: 'storm',
    label: '1000x Storm',
    shortCode: '1000x SOLAR STORM + SEFI',
    yAxisLabel: 'ATTITUDE ERR [deg]',
    yMax: 45,
    yUnit: '°',
    thresholdValue: 35.07,
    thresholdLabel: 'PPO SAFE-MODE BOUND (35.07°)',
    sampleAt: (t: number) => {
      const target = 1.0;
      const initialDecay = 26 * Math.exp(-0.65 * t);
      const sefiPulse = t >= 6.2 ? Math.exp(-0.28 * (t - 6.2)) : 0;
      const pidStorm =
        t >= 6.2
          ? 24.5 * sefiPulse * (1 + 0.55 * Math.sin((t - 6.2) * 2.1)) +
            11.8 * (1 - Math.exp(-0.25 * (t - 6.2))) +
            3.2 * Math.sin(t * 3.4)
          : 2.2 * Math.sin(t * 2.6) * Math.exp(-0.2 * t);
      const pid = Math.max(0.4, Math.min(43.5, initialDecay + Math.abs(pidStorm)));

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
    label: 'Science Lock',
    shortCode: 'NOMINAL LEO FINE POINTING',
    yAxisLabel: 'ATTITUDE ERR [deg]',
    yMax: 5.0,
    yUnit: '°',
    thresholdValue: 1.0,
    thresholdLabel: 'FINE POINTING (< 1.00°)',
    sampleAt: (t: number) => {
      const target = 0.1;
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
    label: 'RW Torque',
    shortCode: 'REACTION WHEEL TORQUE',
    yAxisLabel: 'TORQUE [mN·m]',
    yMax: 5.5,
    yUnit: ' mN·m',
    thresholdValue: 5.0,
    thresholdLabel: 'STALL LIMIT (5.0 mN·m)',
    sampleAt: (t: number) => {
      const target = 0.65;
      const noiseSpike =
        Math.pow(Math.sin(t * 3.7), 6) * 1.85 +
        (t > 6.0 && t < 9.5 ? 2.15 * Math.exp(-0.6 * (t - 6.0)) : 0);
      const pid = Math.min(
        4.95,
        3.6 * Math.exp(-0.7 * t) + 0.55 + noiseSpike + 0.25 * Math.abs(Math.sin(t * 5.2))
      );

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

/** Compact interactive web telemetry plot styled in Luka's 12-swatch palette. */
export const TelemetryPlot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TelemetryTabMode>('storm');
  const [isPlaying, setIsPlaying] = useState(true);
  const [scanTime, setScanTime] = useState(8.4);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const lastTsRef = useRef<number>(0);
  const animIdRef = useRef<number>(0);

  const mode = CURVE_MODES[activeTab];

  useEffect(() => {
    if (!isPlaying) return;
    lastTsRef.current = performance.now();

    const step = (now: number) => {
      const dt = (now - lastTsRef.current) * 0.001;
      lastTsRef.current = now;
      setScanTime((prev) => {
        const next = prev + dt * 2.2;
        return next > 20 ? 0 : next;
      });
      animIdRef.current = requestAnimationFrame(step);
    };

    animIdRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animIdRef.current);
  }, [isPlaying]);

  const width = 620;
  const height = 210;
  const padLeft = 42;
  const padRight = 14;
  const padTop = 18;
  const padBottom = 26;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const xForTime = (t: number) => padLeft + (t / 20) * plotW;
  const yForVal = (v: number) => {
    const clamped = Math.max(0, Math.min(mode.yMax, v));
    return padTop + plotH - (clamped / mode.yMax) * plotH;
  };

  const sampleCount = 100;
  const pidPoints: string[] = [];
  const ppoPoints: string[] = [];
  const ppoAreaPoints: string[] = [];

  for (let i = 0; i <= sampleCount; i++) {
    const t = (i / sampleCount) * 20;
    const { pid, ppo } = mode.sampleAt(t);
    const x = xForTime(t).toFixed(1);
    pidPoints.push(`${x},${yForVal(pid).toFixed(1)}`);
    ppoPoints.push(`${x},${yForVal(ppo).toFixed(1)}`);
    ppoAreaPoints.push(`${x},${yForVal(ppo).toFixed(1)}`);
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
    setHoverTime(((clampedX - padLeft) / plotW) * 20);
  };

  const yTicks = [0, 0.5, 1].map((f) => +(f * mode.yMax).toFixed(1));
  const xTicks = [0, 5, 10, 15, 20];

  return (
    <div className="bg-[#090807] border border-[#718fa7]/45 p-3 select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#3e3b32]">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#b1bdca]">
          <Activity className="w-3 h-3 text-[#88a2bd]" />
          <span>{mode.shortCode}</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[9.5px]">
          {(Object.keys(CURVE_MODES) as TelemetryTabMode[]).map((tabKey) => {
            const tab = CURVE_MODES[tabKey];
            const isSelected = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#1d6291] border-[#88a2bd] text-[#e0ddd8] font-semibold'
                    : 'bg-[#090807] border-[#3e3b32] text-[#a0947e] hover:text-[#e0ddd8]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 py-1.5 font-mono text-[10px]">
        <div className="flex items-center gap-3">
          <span className="text-[#a0947e]">
            t=<strong className="text-[#e0ddd8]">{activeTime.toFixed(1)}s</strong>
          </span>
          <span className="text-[#88a2bd]">
            PPO: <strong>{activeSample.ppo.toFixed(2)}{mode.yUnit}</strong>
          </span>
          <span className="text-[#c6b7a2]">
            PID: <strong>{activeSample.pid.toFixed(2)}{mode.yUnit}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-[#3e3b32] text-[#b1bdca] hover:border-[#88a2bd] text-[9px] cursor-pointer"
          >
            {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            type="button"
            onClick={() => setScanTime(0)}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-[#3e3b32] text-[#b1bdca] hover:border-[#88a2bd] text-[9px] cursor-pointer"
            aria-label="Reset telemetry sweep"
          >
            <RotateCcw className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[175px] block cursor-crosshair bg-[#090807]"
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setHoverTime(null)}
      >
        <defs>
          <linearGradient id="ppoPalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d6291" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1d6291" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {yTicks.map((val) => {
          const y = yForVal(val);
          return (
            <g key={`y-${val}`}>
              <line x1={padLeft} y1={y} x2={padLeft + plotW} y2={y} stroke="#718fa7" strokeOpacity="0.2" strokeDasharray="3 3" />
              <text x={padLeft - 6} y={y + 3} textAnchor="end" className="fill-[#a0947e] font-mono text-[9px]">
                {val}
              </text>
            </g>
          );
        })}

        {xTicks.map((tVal) => {
          const x = xForTime(tVal);
          return (
            <g key={`x-${tVal}`}>
              <line x1={x} y1={padTop} x2={x} y2={padTop + plotH} stroke="#718fa7" strokeOpacity="0.16" strokeDasharray="3 3" />
              <text x={x} y={padTop + plotH + 14} textAnchor="middle" className="fill-[#a0947e] font-mono text-[9px]">
                {tVal}s
              </text>
            </g>
          );
        })}

        <line
          x1={padLeft}
          y1={thresholdY}
          x2={padLeft + plotW}
          y2={thresholdY}
          stroke="#c6b7a2"
          strokeWidth="1"
          strokeDasharray="5 3"
          strokeOpacity="0.7"
        />
        <text x={padLeft + plotW - 4} y={thresholdY - 4} textAnchor="end" className="fill-[#c6b7a2] font-mono text-[8.5px]">
          {mode.thresholdLabel}
        </text>

        <polygon points={ppoPolygon} fill="url(#ppoPalGrad)" />
        <polyline fill="none" stroke="#c6b7a2" strokeWidth="1.8" strokeDasharray="5 3" points={pidPoints.join(' ')} />
        <polyline fill="none" stroke="#88a2bd" strokeWidth="2.2" points={ppoPoints.join(' ')} />

        <line x1={scanX} y1={padTop} x2={scanX} y2={padTop + plotH} stroke="#e0ddd8" strokeWidth="1" strokeOpacity="0.65" />
        <circle cx={scanX} cy={yForVal(activeSample.pid)} r="3.5" fill="#090807" stroke="#c6b7a2" strokeWidth="1.8" />
        <circle cx={scanX} cy={yForVal(activeSample.ppo)} r="4" fill="#88a2bd" stroke="#e0ddd8" strokeWidth="1.3" />
        <rect x={padLeft} y={padTop} width={plotW} height={plotH} fill="none" stroke="#3e3b32" strokeWidth="1" />
      </svg>
    </div>
  );
};
