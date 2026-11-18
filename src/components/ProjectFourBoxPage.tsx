import React, { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Box, Eye, GitBranch, Maximize2 } from 'lucide-react';
import type { LightboxAsset, ProjectPageData } from '../types';
import { FolioShell } from './FolioShell';
import { OrbitalGimbal } from './OrbitalGimbal';
import { TelemetryPlot } from './TelemetryPlot';

interface ProjectFourBoxPageProps {
  project: ProjectPageData;
  enableInteractiveAdcs?: boolean;
  onInspectMedia: (asset: LightboxAsset) => void;
}

const BOX_STYLES = [
  {
    key: 'problem' as const,
    label: '01 // PROBLEM',
    headerBg: '#3e3b32',
    headerFg: '#e0ddd8',
    cardBg: '#e0ddd8',
    border: '#a0947e',
  },
  {
    key: 'approach' as const,
    label: '02 // APPROACH',
    headerBg: '#1d6291',
    headerFg: '#e0ddd8',
    cardBg: '#e0ddd8',
    border: '#718fa7',
  },
  {
    key: 'result' as const,
    label: '03 // RESULT',
    headerBg: '#718fa7',
    headerFg: '#090807',
    cardBg: '#e0ddd8',
    border: '#718fa7',
  },
  {
    key: 'learnt' as const,
    label: '04 // LEARNT',
    headerBg: '#6f6856',
    headerFg: '#e0ddd8',
    cardBg: '#e0ddd8',
    border: '#a0947e',
  },
];

/** Consistent 4-box engineering case-study page with balanced 50/50 media & optional "Where I Lost Marks". */
export const ProjectFourBoxPage: React.FC<ProjectFourBoxPageProps> = ({
  project,
  enableInteractiveAdcs = false,
  onInspectMedia,
}) => {
  const [interactiveMode, setInteractiveMode] = useState(false);
  const twoMediaStack = project.media.length === 2;

  return (
    <FolioShell
      pageNumber={project.pageNumber}
      sectionLabel={project.sectionCode}
      title={project.title}
      subtitle={`${project.roleLabel} · ${project.date}`}
    >
      <div className="flex-1 min-h-0 flex flex-col gap-3">
        {/* Top Metrics Strip + Optional Repo / Interactive Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.metricsStrip.map((m) => (
              <div
                key={m.label}
                className="px-2.5 py-1 bg-[#c6b7a2]/40 border border-[#a0947e] flex items-center gap-1.5 font-mono text-[10px]"
              >
                <span className="text-[#6f6856]">{m.label}:</span>
                <span className="font-bold text-[#090807]">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#090807] text-[#e0ddd8] hover:bg-[#1d6291] font-mono text-[10px] transition-colors"
              >
                <GitBranch className="w-3 h-3" />
                <span>{project.repoLabel}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}

            {enableInteractiveAdcs && (
              <button
                type="button"
                onClick={() => setInteractiveMode((prev) => !prev)}
                className={`no-print inline-flex items-center gap-1.5 px-2.5 py-1 border font-mono text-[10px] font-semibold cursor-pointer transition-colors ${
                  interactiveMode
                    ? 'bg-[#1d6291] text-[#e0ddd8] border-[#090807]'
                    : 'bg-[#b1bdca]/50 text-[#090807] border-[#1d6291]/60 hover:bg-[#1d6291] hover:text-[#e0ddd8]'
                }`}
              >
                {interactiveMode ? <Eye className="w-3 h-3" /> : <Box className="w-3 h-3" />}
                <span>{interactiveMode ? 'VIEW STATIC FIGURES' : 'LIVE 3D GIMBAL & PLOT'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Balanced 6/6 Split: Left 4 Boxes (+ Lost Marks) | Right Evidence Media */}
        <div className="flex-1 min-h-0 folio-grid-project gap-3.5">
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-2.5 min-h-0">
            <div className="folio-grid-2 gap-2.5 flex-1 min-h-0">
              {BOX_STYLES.map((style) => {
                const box = project.boxes[style.key];
                return (
                  <article
                    key={style.key}
                    className="flex flex-col border overflow-hidden min-h-0"
                    style={{
                      backgroundColor: style.cardBg,
                      borderColor: style.border,
                    }}
                  >
                    <div
                      className="px-2.5 py-1 font-mono text-[9.5px] font-bold tracking-wider shrink-0"
                      style={{ backgroundColor: style.headerBg, color: style.headerFg }}
                    >
                      {style.label}
                    </div>
                    <div className="p-2.5 flex-1 flex flex-col justify-center space-y-1.5 text-[10.5px] leading-[1.35] text-[#090807]">
                      <div className="font-bold text-[#090807]">{box.headline}</div>
                      <ul className="space-y-1 text-[#3e3b32]">
                        {box.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-1.5">
                            <span className="font-mono font-bold text-[#1d6291] mt-[1px]">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>

            {project.lostMarks && (
              <div className="border-2 border-[#493716] bg-[#c6b7a2]/50 overflow-hidden shrink-0">
                <div className="px-2.5 py-1 bg-[#341f10] text-[#e0ddd8] font-mono text-[9.5px] font-bold tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-[#c6b7a2]" />
                  <span>{project.lostMarks.title}</span>
                </div>
                <div className="px-2.5 py-2 folio-grid-lostmarks gap-2 text-[10px] leading-[1.32] text-[#090807]">
                  {project.lostMarks.points.map((pt, idx) => (
                    <div key={pt} className="flex items-start gap-1">
                      <span className="font-mono font-bold text-[#493716] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="text-[#341f10] font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Verified Visuals OR Interactive 3D Gimbal/Plot */}
          <div className="flex flex-col gap-2 min-h-0">
            {enableInteractiveAdcs && interactiveMode ? (
              <div className="no-print flex-1 flex flex-col gap-2 min-h-0">
                <OrbitalGimbal compact />
                <TelemetryPlot />
              </div>
            ) : (
              <div
                className={`flex-1 min-h-0 gap-2.5 ${
                  twoMediaStack ? 'flex flex-col' : 'folio-grid-2'
                }`}
              >
                {project.media.map((item, idx) => {
                  const isLead = !twoMediaStack && idx === 0;
                  const isCover = item.fit === 'cover';
                  const isLight = item.surface === 'light';
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        onInspectMedia({
                          title: item.title,
                          caption: item.caption,
                          src: item.src,
                        })
                      }
                      className={`group text-left border border-[#a0947e] overflow-hidden flex flex-col cursor-zoom-in transition-colors hover:border-[#1d6291] min-h-0 ${
                        twoMediaStack ? 'flex-1' : isLead ? 'md:col-span-2 folio-span-2' : ''
                      } ${isLight ? 'bg-white' : 'bg-[#090807]'}`}
                    >
                      <div className="px-2.5 py-1 bg-[#3e3b32] border-b border-[#6f6856]/40 flex items-center justify-between gap-2 font-mono text-[9px] text-[#e0ddd8] shrink-0">
                        <span className="truncate font-semibold">{item.title}</span>
                        <span className="inline-flex items-center gap-1 text-[#b1bdca] shrink-0">
                          <span>{item.badge}</span>
                          <Maximize2 className="w-2.5 h-2.5 no-print opacity-75 group-hover:opacity-100" />
                        </span>
                      </div>
                      <div
                        className={`relative flex-1 min-h-0 flex items-center justify-center overflow-hidden ${
                          isLight ? 'bg-white p-1.5' : isCover ? 'bg-[#090807] p-0' : 'bg-[#090807] p-1'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className={`w-full h-full ${
                            isCover ? 'object-cover' : 'object-contain'
                          }`}
                        />
                      </div>
                      <div className="px-2.5 py-1 bg-[#e0ddd8] text-[#3e3b32] text-[9.5px] leading-tight border-t border-[#a0947e]/50 truncate shrink-0">
                        {item.caption}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </FolioShell>
  );
};
