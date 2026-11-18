import React from 'react';
import { ArrowUpRight, Eye, GitBranch, Maximize2, Telescope } from 'lucide-react';
import shroudxFlickerScatter from '../assets/figures/shroudx_flicker_scatter.png';
import type { BenchmarkFigure, MetricBadge, TelemetryBullet } from '../types';
import { CadWireframeBox } from './CadWireframeBox';
import { HudFigureFrame, MetricBadgeStrip, TelemetryBulletList } from './TelemetryPrimitives';

const SHROUDX_REPO_URL = 'https://github.com/LukaBua/ShroudX';

const SHROUDX_METRIC_BADGES: MetricBadge[] = [
  { text: '[NASA SPACE APPS: 2026]', variant: 'cyan' },
  { text: '[6 DETECTORS // 0.75–5.00 µm]', variant: 'cyan' },
  { text: '[PLATE SCALE: 6.15"/PX]', variant: 'amber' },
  { text: '[DEMO CACHE: 18.10 MB / 227 FITS]', variant: 'cyan' },
  { text: '[GAIA DR3 + WLS PM / PARALLAX]', variant: 'amber' },
];

const SHROUDX_TELEMETRY_BULLETS: TelemetryBullet[] = [
  {
    label: 'IRSA Ingestion & Caching (data.py)',
    detail:
      'Queries NASA/IPAC IRSA SIA2 (DR1/QR3) and TAP, fetches PSF-stripped .fits.gz cutouts across <= 5 parallel workers, evaluates per-pixel spectral WCS-WAVE (key "W"), and crops 30–600" FOVs from an 18.10 MB 5-target demo cache (227 FITS cutouts + 379.63 kB Gaia DR3 tables).',
  },
  {
    label: 'Masking, ZODI & WCS Alignment (flags.py, processing.py)',
    detail:
      'Decodes 32-bit FLAGS via MP_* FITS headers (masking DETECTOR_DEFECTS while preserving SOURCE bit 21 and FULLSAMPLE bit 12), subtracts ZODI and 3-sigma sky background, splits > 30-day epochs within <= 0.10 µm windows, and reprojects onto a North-up East-left TAN grid for Blink, MAD-clipped Stack, and signed Difference PNG/GIF output.',
  },
  {
    label: 'WLS Astrometry & Spectral SED (motion.py, gaia.py, spectrum.py)',
    detail:
      'Runs shrinking-window centroiding with variance propagation and diagonal WLS proper-motion + barycentric parallax fitting with sqrt(reduced_chi2) inflation (matching eps Ind B Gaia DR3 4.6842 "/yr at 4.6075 ± 0.1540 "/yr, 0.76σ diff), plus 2016.0 -> epoch Gaia DR3 cross-matching and per-exposure aperture SEDs.',
  },
  {
    label: 'Mover Search & Flicker Study (movers.py, flicker.py)',
    detail:
      'Implements offline 5σ two-epoch candidate matching (<= 15.0 "/yr) with 100-trial toroidal random-shift false-mover estimation, alongside empirical aperture photometry across 5 isolated Gaia DR3 field stars (204 usable frames) quantifying 1.05% matched-wavelength stability (<= 0.5 d) vs 8.47% ± 1.84% multi-epoch scatter (w = 0.02 µm).',
  },
];

const SHROUDX_TECH_TAGS = [
  '[Python / FastAPI]',
  '[Astropy / Reproject / Astroquery]',
  '[React 19 / TypeScript / Vite]',
  '[NASA IRSA SIA2 & TAP]',
  '[ESA Gaia DR3]',
  '[Docker / Multi-Mode Cache]',
];

const SHROUDX_BENCHMARK_FIGURE: BenchmarkFigure = {
  id: 'fig-04-shroudx',
  sysTag: '[TELEM.FIG.04 // CHROMATIC.SCATTER]',
  coordTag: '204 FRAMES // 5 GAIA DR3 STARS',
  captionHeader: 'FIG 04 // STATIONARY-STAR CHROMATIC & TEMPORAL SCATTER (SPHEREx L2B-V27)',
  subtitle:
    'Empirical 2.0 px aperture photometry across 5 isolated Gaia DR3 field stars (204 usable frames across all 6 detectors): matched-wavelength pairs (|Δλ| <= 0.03 µm) hold 1.05% excess scatter within 0.5 day, while multi-month baselines exhibit 8.47% ± 1.84% excess scatter even at w = 0.02 µm.',
  src: shroudxFlickerScatter,
  metrics: ['[204 USABLE FRAMES]', '[1.05% <= 0.5d MATCHED]', '[8.47% ± 1.84% @ 0.02µm]'],
};

interface ShroudXShowcaseProps {
  inspectMode: boolean;
  darkFieldFilter: boolean;
  onToggleDarkField: () => void;
  onExpandFigure: (fig: BenchmarkFigure) => void;
}

/** Featured NASA Space Apps 2026 ShroudX engineering card and empirical artifact. */
export const ShroudXShowcase: React.FC<ShroudXShowcaseProps> = ({
  inspectMode,
  darkFieldFilter,
  onToggleDarkField,
  onExpandFigure,
}) => {
  return (
    <div id="shroudx" className="scroll-mt-24">
      <CadWireframeBox
        sysTag="[SYS.ASTRO.02 // SHROUDX]"
        coordTag="SPHEREx: 6 DET // 0.75–5.00 µm"
        inspectMode={inspectMode}
        accent="cyan"
        className="p-6 sm:p-8 space-y-8"
      >
        {/* Header Telemetry Strip */}
        <div className="border-b border-slate-800/90 pb-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#00f0ff]/15 border border-[#00f0ff]/60 font-mono text-[11px] font-semibold text-[#00f0ff] uppercase shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                NASA SPACE APPS 2026 // TEAM LEAD (5-MEMBER TEAM)
              </span>
              <span className="px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/50 font-mono text-[11px] font-semibold text-[#f59e0b] uppercase shadow-[0_0_12px_rgba(245,158,11,0.18)]">
                INFRARED ASTROMETRY &amp; FULL-STACK PIPELINE
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span className="text-slate-400">
                DATA VERIFIED // IRSA L2B-V27 + GAIA DR3
              </span>
              <a
                href={SHROUDX_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#060709] border border-cyan-500/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-semibold transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>[GITHUB // LUKABUA/SHROUDX]</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              ShroudX — SPHEREx Sky-Motion &amp; Astrometry Viewer
            </h3>
            <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300/90">
              IRSA SIA2/TAP Cutout Ingestion, Multi-Epoch Blink/Stack/Diff &amp; Gaia DR3 Proper-Motion Pipeline
            </p>
          </div>

          <MetricBadgeStrip badges={SHROUDX_METRIC_BADGES} />
        </div>

        {/* Overview & Pipeline Telemetry Spec */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Full-stack scientific web tool and astrometry pipeline built as Team Lead for the{' '}
              <span className="text-white font-medium">
                NASA Space Apps 2026 &ldquo;Planet X and SPHEREx&rdquo;
              </span>{' '}
              challenge. Converts target names or ICRS coordinates into wavelength-matched{' '}
              <span className="text-white font-medium">SPHEREx</span> blink sequences,
              inverse-variance weighted stacks, signed epoch difference maps, Gaia DR3 overlays,
              and proper-motion &amp; parallax fits.
            </p>

            <TelemetryBulletList items={SHROUDX_TELEMETRY_BULLETS} accent="cyan" />

            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] pt-1">
              {SHROUDX_TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#060709] border border-slate-800 text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Instrument Spec & Runtime Endpoints */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#060709] border border-slate-800/90 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <Telescope className="w-4 h-4 text-[#f59e0b]" />
                <span>SPHEREx PIPELINE &amp; TELEMETRY SPEC</span>
              </span>
              <span className="text-[#00f0ff]">[6.15&quot;/PX // L2B-V27]</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 border border-[#00f0ff]/35 bg-[#090c12] shadow-[0_0_12px_rgba(0,240,255,0.08)]">
                <div className="text-[10px] text-slate-400 uppercase">SPECTRAL COVERAGE</div>
                <div className="mt-1 text-sm sm:text-base font-bold text-[#00f0ff]">
                  0.75–5.00 µm (D1–D6)
                </div>
              </div>
              <div className="p-3 border border-[#f59e0b]/40 bg-[#090c12] shadow-[0_0_12px_rgba(245,158,11,0.08)]">
                <div className="text-[10px] text-slate-400 uppercase">CALIBRATION &amp; WCS</div>
                <div className="mt-1 text-sm sm:text-base font-bold text-[#f59e0b]">
                  ZODI + 32-bit FLAGS
                </div>
              </div>
              <div className="p-3 border border-emerald-500/35 bg-[#090c12] shadow-[0_0_12px_rgba(16,185,129,0.08)]">
                <div className="text-[10px] text-slate-400 uppercase">EPS IND B FIT</div>
                <div className="mt-1 text-sm sm:text-base font-bold text-emerald-400">
                  4.61 ± 0.15 &quot;/yr (0.76σ)
                </div>
              </div>
              <div className="p-3 border border-[#00f0ff]/35 bg-[#090c12] shadow-[0_0_12px_rgba(0,240,255,0.08)]">
                <div className="text-[10px] text-slate-400 uppercase">RUNTIME STACK</div>
                <div className="mt-1 text-sm sm:text-base font-bold text-[#00f0ff]">
                  FastAPI + React 19
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-800/80 font-mono text-xs">
              <div className="text-[11px] text-slate-400 uppercase">
                MULTI-MODE API &amp; VERIFICATION ARCHITECTURE
              </div>
              <div className="p-2.5 bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[#00f0ff] font-semibold">
                    SERVICE // 9 FASTAPI ROUTES + REACT SPA
                  </div>
                  <div className="text-[11px] text-slate-400">
                    /api/resolve, /meta, /image.png, /blink.gif, /catalog, /motion, /tracking, /spectrum
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 shrink-0">
                  AUTO/CACHE
                </span>
              </div>
              <div className="p-2.5 bg-amber-950/20 border border-amber-500/30 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[#f59e0b] font-semibold">
                    BENCHMARKS // 5 TARGETS + 5 FIELD STARS
                  </div>
                  <div className="text-[11px] text-slate-400">
                    WISE 0855, Barnard&apos;s Star, eps Ind B, RW Aurigae, R Draconis + flicker/movers
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 shrink-0">
                  VERIFIED
                </span>
              </div>
            </div>

            <a
              href={SHROUDX_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center justify-between px-3.5 py-2.5 border border-slate-700 bg-[#090c12] hover:border-[#00f0ff] text-slate-200 hover:text-[#00f0ff] font-mono text-xs transition-all"
            >
              <span className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>[INSPECT SOURCE // github.com/LukaBua/ShroudX]</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Empirical Chromatic & Temporal Scatter Artifact */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 pb-3">
            <div>
              <div className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
                EMPIRICAL INSTRUMENT VERIFICATION // CHROMATIC FLICKER STUDY (N=204 FRAMES)
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Measured excess fractional scatter on isolated Gaia DR3 stationary stars across
                SPHEREx detectors D1–D6 (experiments/flicker.py).
              </p>
            </div>

            <button
              type="button"
              onClick={onToggleDarkField}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyan-500/40 bg-[#060709] hover:border-[#00f0ff] font-mono text-[11px] text-cyan-300 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>
                {darkFieldFilter
                  ? '[OPTICS: DARK-FIELD HUD BLEND]'
                  : '[OPTICS: RAW MANUSCRIPT PLOT]'}
              </span>
            </button>
          </div>

          <CadWireframeBox
            sysTag={SHROUDX_BENCHMARK_FIGURE.sysTag}
            coordTag={SHROUDX_BENCHMARK_FIGURE.coordTag}
            inspectMode={inspectMode}
            accent="cyan"
            className="p-4 sm:p-5 bg-[#060709]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 space-y-3">
                <div className="font-mono text-xs font-bold text-[#00f0ff] tracking-wide">
                  {SHROUDX_BENCHMARK_FIGURE.captionHeader}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {SHROUDX_BENCHMARK_FIGURE.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
                  {SHROUDX_BENCHMARK_FIGURE.metrics.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 bg-cyan-950/30 border border-cyan-500/30 text-cyan-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onExpandFigure(SHROUDX_BENCHMARK_FIGURE)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff] font-mono text-[11px] transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>[INSPECT FULL-RES SCATTER PLOT]</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8">
                <HudFigureFrame
                  src={SHROUDX_BENCHMARK_FIGURE.src}
                  alt={SHROUDX_BENCHMARK_FIGURE.captionHeader}
                  darkFieldFilter={darkFieldFilter}
                  maxHeightClass="max-h-[300px]"
                  onClick={() => onExpandFigure(SHROUDX_BENCHMARK_FIGURE)}
                />
              </div>
            </div>
          </CadWireframeBox>
        </div>
      </CadWireframeBox>
    </div>
  );
};
