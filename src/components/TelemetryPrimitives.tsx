import React from 'react';
import type { MetricBadge, TelemetryBullet } from '../types';

interface MetricBadgeStripProps {
  badges: MetricBadge[];
  compact?: boolean;
  className?: string;
}

/** Monospace glowing cyan/amber HUD telemetry badge strip. */
export const MetricBadgeStrip: React.FC<MetricBadgeStripProps> = ({
  badges,
  compact = false,
  className = '',
}) => (
  <div
    className={`flex flex-wrap items-center font-mono ${
      compact ? 'gap-2 text-[11px]' : 'gap-2.5 text-xs pt-1'
    } ${className}`}
  >
    {badges.map((badge) => {
      const isAmber = badge.variant === 'amber';
      return (
        <span
          key={badge.text}
          className={`${compact ? 'px-2.5 py-1' : 'px-3 py-1.5'} font-semibold tracking-wider transition-all ${
            isAmber
              ? 'bg-[#f59e0b]/12 border border-[#f59e0b]/60 text-[#f59e0b] shadow-[0_0_14px_rgba(245,158,11,0.22),inset_0_0_8px_rgba(245,158,11,0.08)]'
              : 'bg-[#00f0ff]/12 border border-[#00f0ff]/60 text-[#00f0ff] shadow-[0_0_14px_rgba(0,240,255,0.22),inset_0_0_8px_rgba(0,240,255,0.08)]'
          }`}
        >
          {badge.text}
        </span>
      );
    })}
  </div>
);

interface TelemetryBulletListProps {
  items: TelemetryBullet[];
  accent?: 'cyan' | 'amber';
  compact?: boolean;
}

/** Monospace-labeled quantitative engineering bullet list. */
export const TelemetryBulletList: React.FC<TelemetryBulletListProps> = ({
  items,
  accent = 'cyan',
  compact = false,
}) => (
  <ul className={compact ? 'space-y-2.5 text-xs sm:text-sm text-slate-300 pt-1' : 'space-y-3 text-sm text-slate-300'}>
    {items.map((item) => (
      <li
        key={item.label}
        className={`flex items-start gap-2.5 border border-slate-800/80 transition-colors ${
          compact
            ? 'p-2.5 bg-[#060709]/85'
            : 'p-3 bg-[#060709]/90 hover:border-cyan-500/40'
        }`}
      >
        <span
          className={`font-mono font-bold mt-0.5 ${
            accent === 'amber' ? 'text-[#f59e0b]' : 'text-[#00f0ff]'
          }`}
        >
          &gt;
        </span>
        <span>
          <strong
            className={`text-white font-mono uppercase tracking-wider mr-1.5 ${
              compact ? 'text-[11px]' : 'text-xs'
            }`}
          >
            {item.label}:
          </strong>
          <span className="text-slate-300">{item.detail}</span>
        </span>
      </li>
    ))}
  </ul>
);

interface HudFigureFrameProps {
  src: string;
  alt: string;
  darkFieldFilter: boolean;
  maxHeightClass?: string;
  onClick: () => void;
}

/** Technical figure viewport with CAD midpoint ticks and dark-field HUD inversion toggle. */
export const HudFigureFrame: React.FC<HudFigureFrameProps> = ({
  src,
  alt,
  darkFieldFilter,
  maxHeightClass = 'max-h-[340px]',
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`relative overflow-hidden border border-cyan-500/25 p-2 transition-all cursor-zoom-in ${
      darkFieldFilter ? 'bg-[#060709]' : 'bg-white'
    }`}
  >
    <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00f0ff]/70 z-10" />
    <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00f0ff]/70 z-10" />
    <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]/70 z-10" />
    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]/70 z-10" />

    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-auto object-contain ${maxHeightClass} mx-auto transition-all duration-300 ${
        darkFieldFilter ? 'hud-figure-darkfield' : ''
      }`}
    />
  </div>
);
