import React from 'react';
import type { CompanyLogoId, FlagCode, ToolIconId } from '../types';

/** Crisp vector national flags so language indicators export cleanly to PDF. */
export const FlagIcon: React.FC<{ code: FlagCode; className?: string }> = ({
  code,
  className = 'w-6 h-4',
}) => {
  switch (code) {
    case 'ge':
      return (
        <svg viewBox="0 0 30 20" className={`${className} border border-[#a0947e]/60 shrink-0`} aria-label="Georgian flag">
          <rect width="30" height="20" fill="#ffffff" />
          <rect x="12.5" y="0" width="5" height="20" fill="#c82829" />
          <rect x="0" y="7.5" width="30" height="5" fill="#c82829" />
          {[
            [6.2, 3.8],
            [23.8, 3.8],
            [6.2, 16.2],
            [23.8, 16.2],
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <rect x={cx - 0.8} y={cy - 2.1} width="1.6" height="4.2" fill="#c82829" />
              <rect x={cx - 2.1} y={cy - 0.8} width="4.2" height="1.6" fill="#c82829" />
            </g>
          ))}
        </svg>
      );
    case 'gb':
      return (
        <svg viewBox="0 0 30 20" className={`${className} border border-[#a0947e]/60 shrink-0`} aria-label="UK flag">
          <rect width="30" height="20" fill="#1d6291" />
          <path d="M0 0 L30 20 M30 0 L0 20" stroke="#ffffff" strokeWidth="3.6" />
          <path d="M0 0 L30 20 M30 0 L0 20" stroke="#c82829" strokeWidth="1.6" />
          <path d="M15 0 V20 M0 10 H30" stroke="#ffffff" strokeWidth="5.4" />
          <path d="M15 0 V20 M0 10 H30" stroke="#c82829" strokeWidth="3" />
        </svg>
      );
    case 'ru':
      return (
        <svg viewBox="0 0 30 20" className={`${className} border border-[#a0947e]/60 shrink-0`} aria-label="Russian flag">
          <rect width="30" height="6.67" y="0" fill="#ffffff" />
          <rect width="30" height="6.67" y="6.67" fill="#1d6291" />
          <rect width="30" height="6.67" y="13.33" fill="#c82829" />
        </svg>
      );
    case 'tr':
      return (
        <svg viewBox="0 0 30 20" className={`${className} border border-[#a0947e]/60 shrink-0`} aria-label="Turkish flag">
          <rect width="30" height="20" fill="#c82829" />
          <circle cx="11.2" cy="10" r="4.8" fill="#ffffff" />
          <circle cx="12.5" cy="10" r="3.8" fill="#c82829" />
          <polygon
            points="18.2,10 19.4,10.4 19.4,11.6 20.1,10.6 21.3,11 20.6,10 21.3,9 20.1,9.4 19.4,8.4 19.4,9.6"
            fill="#ffffff"
          />
        </svg>
      );
  }
};

const TOOL_GLYPH_META: Record<ToolIconId, { code: string; bg: string; fg: string }> = {
  python: { code: 'PY', bg: '#1d6291', fg: '#e0ddd8' },
  cpp: { code: 'C++', bg: '#3e3b32', fg: '#e0ddd8' },
  typescript: { code: 'TS', bg: '#718fa7', fg: '#090807' },
  latex: { code: 'TEX', bg: '#6f6856', fg: '#e0ddd8' },
  solidworks: { code: 'SW', bg: '#493716', fg: '#e0ddd8' },
  fusion: { code: 'F360', bg: '#341f10', fg: '#e0ddd8' },
  cnc: { code: 'CAM', bg: '#3e3b32', fg: '#c6b7a2' },
  pytorch: { code: 'RL', bg: '#1d6291', fg: '#e0ddd8' },
  matlab: { code: 'ML', bg: '#718fa7', fg: '#090807' },
  astropy: { code: 'WCS', bg: '#090807', fg: '#b1bdca' },
  excel: { code: 'XLS', bg: '#6f6856', fg: '#e0ddd8' },
  leadership: { code: 'LED', bg: '#1d6291', fg: '#e0ddd8' },
  mentoring: { code: 'MNT', bg: '#493716', fg: '#e0ddd8' },
};

/** Clean vector software/discipline mark styled inside the 12-color palette. */
export const ToolMark: React.FC<{ id: ToolIconId }> = ({ id }) => {
  const { code, bg, fg } = TOOL_GLYPH_META[id];
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 font-mono text-[10px] font-bold tracking-tight border border-[#090807]/15 shrink-0"
      style={{ backgroundColor: bg, color: fg }}
    >
      {code}
    </span>
  );
};

/** Monochrome geometric emblem for Page 4 organizations (no placeholder hotlinks). */
export const CompanyMark: React.FC<{ id: CompanyLogoId }> = ({ id }) => {
  if (id === 'cyber-infinity') {
    return (
      <div className="w-10 h-10 bg-[#090807] border border-[#1d6291]/60 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <path
            d="M8.5 16c0-2.5 2-4.5 4.5-4.5 3 0 4.5 4.5 6 4.5 2.5 0 4.5 2 4.5 4.5"
            stroke="#88a2bd"
            strokeWidth="0"
          />
          <path
            d="M6.5 16c0-2.8 2.2-5 4.8-5 2.7 0 4.7 3.4 4.7 5s2 5 4.7 5c2.6 0 4.8-2.2 4.8-5s-2.2-5-4.8-5c-2.7 0-4.7 3.4-4.7 5s-2 5-4.7 5c-2.6 0-4.8-2.2-4.8-5Z"
            stroke="#e0ddd8"
            strokeWidth="1.9"
          />
          <circle cx="11.3" cy="16" r="1.4" fill="#88a2bd" />
          <circle cx="20.7" cy="16" r="1.4" fill="#88a2bd" />
        </svg>
      </div>
    );
  }
  if (id === 'bog') {
    return (
      <div className="w-10 h-10 bg-[#341f10] border border-[#a0947e]/60 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <rect x="6" y="7" width="20" height="3" fill="#e0ddd8" />
          <rect x="8" y="12" width="3" height="10" fill="#c6b7a2" />
          <rect x="14.5" y="12" width="3" height="10" fill="#c6b7a2" />
          <rect x="21" y="12" width="3" height="10" fill="#c6b7a2" />
          <rect x="5" y="23" width="22" height="3" fill="#e0ddd8" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 bg-[#1d6291] border border-[#b1bdca]/60 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
        <circle cx="16" cy="16" r="8.5" stroke="#e0ddd8" strokeWidth="1.8" strokeDasharray="3 2" />
        <polygon points="16,9 22,20 10,20" stroke="#e0ddd8" strokeWidth="1.8" fill="none" />
        <circle cx="16" cy="16.5" r="1.7" fill="#c6b7a2" />
      </svg>
    </div>
  );
};
