import React, { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Check,
  Compass,
  Copy,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Rocket,
} from 'lucide-react';
import portraitImg from '../assets/luka-buachidze.png';
import {
  EXPERIENCES,
  LEARNING_ENTRIES,
  METU_COURSEWORK_SUMMARY,
  PROFILE,
  SKILLS_LIST,
  SPOKEN_LANGUAGES,
} from '../data/portfolioData';
import type { SkillCategory, SkillLevel } from '../types';
import { CoverRocketCad } from './CoverRocketCad';
import { FolioShell } from './FolioShell';
import { CompanyMark, FlagIcon, ToolMark } from './PortfolioIcons';

const LEFT_CATEGORIES: SkillCategory[] = ['Coding', 'CAD & Fabrication'];
const RIGHT_CATEGORIES: SkillCategory[] = ['Simulation & Analysis', 'Soft Skills'];

const LEVEL_STYLES: Record<SkillLevel, string> = {
  Advanced: 'bg-[#1d6291] text-[#e0ddd8] border-[#1d6291]',
  Intermediate: 'bg-[#b1bdca]/55 text-[#090807] border-[#718fa7]',
  Beginner: 'bg-[#c6b7a2]/50 text-[#3e3b32] border-[#a0947e]',
};

/** Page 01 // Cover — clean dark CAD rocket launch cover with zero redundant pills */
export const CoverPage: React.FC = () => (
  <FolioShell pageNumber="01" sectionLabel="COVER" variant="dark">
    <div className="relative flex-1 min-h-[540px] lg:min-h-0 flex flex-col justify-between p-8 sm:p-11 lg:p-12 overflow-hidden">
      <CoverRocketCad />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#090807] via-[#090807]/90 to-transparent"
      />

      <div className="relative z-10 flex items-center justify-between gap-4 font-mono text-[11px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d6291]/25 border border-[#88a2bd]/50 text-[#b1bdca] tracking-widest uppercase">
          <Rocket className="w-3.5 h-3.5 text-[#c6b7a2]" />
          <span>ENGINEERING PORTFOLIO // 2026</span>
        </div>
        <div className="px-2.5 py-1 border border-[#718fa7]/45 bg-[#090807]/80 text-[#e0ddd8]">
          01 / 09
        </div>
      </div>

      <div className="relative z-10 max-w-xl space-y-5 my-auto py-8">
        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#c6b7a2]">
            {PROFILE.institution}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#e0ddd8] leading-[1.02]">
            {PROFILE.name}
          </h1>
          <p className="font-mono text-base sm:text-lg text-[#88a2bd] font-medium">
            {PROFILE.degree} · Portfolio
          </p>
        </div>

        <div className="h-[2px] w-24 bg-[#1d6291]" />

        <p className="text-sm sm:text-base text-[#b1bdca] leading-relaxed max-w-md">
          A CV lists what I did—this portfolio shows{' '}
          <span className="text-[#e0ddd8] font-medium">how I engineer under constraints</span>,
          backing every claim with test results, hardware builds, and honest post-mortems.
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-[#718fa7]/30 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[#a0947e]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span>01 COVER</span>
          <span>·</span>
          <span>02 ABOUT</span>
          <span>·</span>
          <span>03 SKILLS</span>
          <span>·</span>
          <span>04 EXPERIENCE</span>
          <span>·</span>
          <span>05–07 PROJECTS</span>
          <span>·</span>
          <span>08 LEARNING</span>
          <span>·</span>
          <span>09 CONTACT</span>
        </div>
        <span className="text-[#c6b7a2]">{PROFILE.locations.toUpperCase()}</span>
      </div>
    </div>
  </FolioShell>
);

/** Page 02 // About Me — calm 5/7 split focusing strictly on identity, origin & next target */
export const AboutPage: React.FC = () => (
  <FolioShell
    pageNumber="02"
    sectionLabel="02 // ABOUT ME"
    title="Background, Origin & Aerospace Direction"
    subtitle={`${PROFILE.degree} · ${PROFILE.institution} (${PROFILE.studyPeriod})`}
  >
    <div className="flex-1 min-h-0 folio-grid-about gap-5 items-stretch">
      {/* Left: Portrait + Direct Contact Info */}
      <div className="flex flex-col justify-between bg-[#090807] text-[#e0ddd8] border border-[#3e3b32] overflow-hidden min-h-0">
        <div className="relative flex-1 min-h-[200px] overflow-hidden bg-[#3e3b32]/25">
          <img
            src={portraitImg}
            alt={PROFILE.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 bg-[#090807]/85 border border-[#718fa7]/55 font-mono text-[9.5px] text-[#e0ddd8]">
            METU AEROSPACE // 2024–PRESENT
          </div>
        </div>

        <div className="p-4 space-y-2 font-mono text-[10.5px] border-t border-[#3e3b32] shrink-0">
          <div className="flex items-start gap-2 text-[#b1bdca]">
            <MapPin className="w-3.5 h-3.5 text-[#88a2bd] shrink-0 mt-0.5" />
            <span>{PROFILE.locations}</span>
          </div>
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-2 text-[#e0ddd8] hover:text-[#88a2bd] transition-colors truncate"
          >
            <Mail className="w-3.5 h-3.5 text-[#c6b7a2] shrink-0" />
            <span className="truncate">{PROFILE.email}</span>
          </a>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 border border-[#718fa7]/40 bg-[#3e3b32]/25 text-[#b1bdca] hover:text-[#e0ddd8]"
            >
              <span className="flex items-center gap-1.5 truncate">
                <ExternalLink className="w-3 h-3 text-[#88a2bd] shrink-0" />
                <span>LinkedIn</span>
              </span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 border border-[#718fa7]/40 bg-[#3e3b32]/25 text-[#b1bdca] hover:text-[#e0ddd8]"
            >
              <span className="flex items-center gap-1.5 truncate">
                <GitBranch className="w-3 h-3 text-[#c6b7a2] shrink-0" />
                <span>LukaBua</span>
              </span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Right: Clean Structured Editorial Stack (zero awkward empty halves) */}
      <div className="flex flex-col justify-between gap-3 min-h-0">
        <article className="border-l-4 border-[#1d6291] bg-[#b1bdca]/22 px-4 py-3 flex-1 flex flex-col justify-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1d6291]">
            CURRENT STUDY &amp; ACTIVE CUBESAT ROLE
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#090807]">{PROFILE.currentRoleNote}</p>
        </article>

        <article className="border-l-4 border-[#493716] bg-[#c6b7a2]/28 px-4 py-3 flex-1 flex flex-col justify-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#493716]">
            HOW I GOT INTO ENGINEERING
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#090807]">{PROFILE.originStory}</p>
        </article>

        <article className="border-l-4 border-[#6f6856] bg-[#e0ddd8] border border-[#a0947e]/60 px-4 py-3 flex-1 flex flex-col justify-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#3e3b32]">
            PERSONAL PROJECTS OUTSIDE UNIVERSITY
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#3e3b32]">{PROFILE.outsideProjectsNote}</p>
        </article>

        <article className="bg-[#090807] text-[#e0ddd8] border border-[#1d6291] px-4 py-3 flex-1 flex flex-col justify-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#88a2bd] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>WHERE I WANT TO GO NEXT</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#b1bdca]">{PROFILE.nextGoalNote}</p>
        </article>
      </div>
    </div>
  </FolioShell>
);

const SkillRowCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  const items = SKILLS_LIST.filter((s) => s.category === category);
  return (
    <div className="border border-[#a0947e] bg-[#e0ddd8] overflow-hidden">
      <div className="px-3 py-1.5 bg-[#3e3b32] text-[#e0ddd8] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-between">
        <span>{category}</span>
        <span className="text-[#c6b7a2]">{items.length} TOOLS</span>
      </div>
      <div className="divide-y divide-[#a0947e]/45">
        {items.map((skill) => (
          <div key={skill.name} className="px-3 py-2 flex items-center gap-2.5">
            <ToolMark id={skill.icon} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#090807]">{skill.name}</span>
                <span
                  className={`px-2 py-0.5 border font-mono text-[9px] font-semibold uppercase shrink-0 ${LEVEL_STYLES[skill.level]}`}
                >
                  {skill.level}
                </span>
              </div>
              <p className="text-[10.5px] text-[#3e3b32] leading-snug mt-0.5">{skill.evidence}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Page 03 // Technical Skills — balanced 2-column vertical lists + spoken languages (zero empty quadrant voids) */
export const SkillsPage: React.FC = () => (
  <FolioShell
    pageNumber="03"
    sectionLabel="03 // TECHNICAL SKILLS"
    title="Tools, Engineering Evidence & Spoken Languages"
    subtitle="Calibrated proficiency tiers backed by concrete deliverables (no inflated labels)"
  >
    <div className="flex-1 min-h-0 folio-grid-2 gap-4 items-stretch">
      {/* Left Column: Coding (4) + CAD & Fabrication (3) = 7 dense, balanced rows */}
      <div className="flex flex-col justify-between gap-3 min-h-0">
        {LEFT_CATEGORIES.map((cat) => (
          <SkillRowCard key={cat} category={cat} />
        ))}
      </div>

      {/* Right Column: Simulation & Analysis (4) + Soft Skills (2) + Spoken Languages (4 flags) */}
      <div className="flex flex-col justify-between gap-3 min-h-0">
        {RIGHT_CATEGORIES.map((cat) => (
          <SkillRowCard key={cat} category={cat} />
        ))}

        <div className="border border-[#1d6291]/60 bg-[#b1bdca]/25 overflow-hidden">
          <div className="px-3 py-1 bg-[#1d6291] text-[#e0ddd8] font-mono text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>SPOKEN LANGUAGES</span>
            <span>4 WORKING LANGUAGES</span>
          </div>
          <div className="p-2 folio-grid-2 gap-2">
            {SPOKEN_LANGUAGES.map((lang) => (
              <div
                key={lang.language}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-[#e0ddd8] border border-[#a0947e]/65"
              >
                <FlagIcon code={lang.flag} className="w-6 h-4" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-[#090807]">{lang.language}</span>
                    <span className="font-mono text-[9px] font-semibold text-[#1d6291]">
                      {lang.level}
                    </span>
                  </div>
                  <div className="text-[9.5px] text-[#6f6856] truncate">{lang.evidence}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </FolioShell>
);

/** Page 04 // Work Experience — 3 horizontal bands filling the page cleanly with zero tall blank columns */
export const ExperiencePage: React.FC = () => (
  <FolioShell
    pageNumber="04"
    sectionLabel="04 // WORK EXPERIENCE"
    title="Venture Leadership, Banking Backend & FabLab Engineering"
    subtitle="Role scope, quantified outcomes, tools used & progression within each role"
  >
    <div className="flex-1 min-h-0 flex flex-col justify-between gap-3.5">
      {EXPERIENCES.map((exp) => (
        <article
          key={exp.id}
          className="flex-1 min-h-0 border border-[#a0947e] bg-[#e0ddd8] folio-grid-exp-row overflow-hidden"
        >
          {/* Left Identity Block */}
          <div className="p-4 bg-[#3e3b32] text-[#e0ddd8] flex flex-col justify-between gap-2">
            <div className="flex items-start gap-3">
              <CompanyMark id={exp.logo} />
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] text-[#c6b7a2]">{exp.dates}</div>
                <h3 className="text-sm font-bold leading-snug text-[#e0ddd8]">{exp.role}</h3>
                <div className="text-[11px] text-[#b1bdca] font-medium leading-tight mt-0.5">
                  {exp.company}
                </div>
              </div>
            </div>
            <div className="font-mono text-[9.5px] text-[#a0947e] border-t border-[#6f6856]/40 pt-1.5">
              LOCATION: {exp.location.toUpperCase()}
            </div>
          </div>

          {/* Middle Summary & Number-Led Bullets */}
          <div className="p-4 flex flex-col justify-center gap-2 border-b md:border-b-0 md:border-r border-[#a0947e]/55">
            <p className="text-xs font-semibold text-[#090807] leading-snug">{exp.summary}</p>
            <ul className="space-y-1.5 text-[11px] text-[#3e3b32] leading-snug">
              {exp.bullets.map((b) => (
                <li key={b} className="flex items-start gap-1.5">
                  <span className="font-mono font-bold text-[#1d6291] mt-[1px]">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Tools & Growth Panel */}
          <div className="p-4 bg-[#b1bdca]/22 flex flex-col justify-between gap-2">
            <div>
              <div className="font-mono text-[9.5px] font-bold uppercase text-[#1d6291] mb-1.5">
                SYSTEMS &amp; TOOLS
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[9.5px]">
                {exp.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 bg-[#e0ddd8] border border-[#718fa7]/60 text-[#090807] font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-[#718fa7]/35 text-[10.5px] leading-snug text-[#3e3b32]">
              <strong className="font-mono text-[9px] uppercase text-[#493716] block mb-0.5">
                GROWTH IN ROLE
              </strong>
              {exp.growth}
            </div>
          </div>
        </article>
      ))}
    </div>
  </FolioShell>
);

/** Page 08 // Continuous Learning & Foundations — calm 2x2 grid + bottom METU coursework strip */
export const LearningPage: React.FC = () => (
  <FolioShell
    pageNumber="08"
    sectionLabel="08 // CONTINUOUS LEARNING"
    title="Technical Programs, Judging & Subsystem Onboarding"
    subtitle="All entries explicitly labeled by in-person format, task, engineering constraint, tools & outcome"
  >
    <div className="flex-1 min-h-0 flex flex-col justify-between gap-3">
      <div className="folio-grid-2 gap-3.5 flex-1 min-h-0">
        {LEARNING_ENTRIES.map((item) => (
          <article
            key={item.id}
            className="border border-[#a0947e] bg-[#e0ddd8] flex flex-col justify-between overflow-hidden min-h-0"
          >
            <div className="px-4 py-2.5 bg-[#3e3b32] text-[#e0ddd8] flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold leading-snug text-[#e0ddd8]">
                  {item.title}
                </h3>
                <div className="font-mono text-[10px] text-[#b1bdca] mt-0.5">{item.provider}</div>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block px-2 py-0.5 bg-[#1d6291] text-[#e0ddd8] font-mono text-[8.5px] font-bold uppercase">
                  {item.format}
                </span>
                <div className="font-mono text-[9.5px] text-[#c6b7a2] mt-1">{item.date}</div>
              </div>
            </div>

            <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10.5px] leading-snug flex-1">
              <div>
                <div className="font-mono text-[9px] font-bold uppercase text-[#1d6291]">
                  KEY TASK
                </div>
                <p className="text-[#090807] mt-0.5">{item.keyTask}</p>
              </div>
              <div>
                <div className="font-mono text-[9px] font-bold uppercase text-[#493716]">
                  CONSTRAINT
                </div>
                <p className="text-[#3e3b32] mt-0.5">{item.constraint}</p>
              </div>
              <div>
                <div className="font-mono text-[9px] font-bold uppercase text-[#6f6856]">
                  TOOLS USED
                </div>
                <p className="text-[#3e3b32] mt-0.5">{item.tools}</p>
              </div>
              <div className="bg-[#b1bdca]/28 p-2 border border-[#718fa7]/50">
                <div className="font-mono text-[9px] font-bold uppercase text-[#090807] flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#1d6291]" />
                  <span>OUTPUT</span>
                </div>
                <p className="text-[#090807] font-medium mt-0.5">{item.output}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="px-4 py-2.5 bg-[#090807] text-[#e0ddd8] border border-[#1d6291]/60 font-mono text-[10px] leading-snug shrink-0">
        <span className="text-[#88a2bd] font-bold mr-2">UNIVERSITY FOUNDATION //</span>
        <span className="text-[#c6b7a2]">{METU_COURSEWORK_SUMMARY}</span>
      </div>
    </div>
  </FolioShell>
);

/** Page 09 // Closing & Contact — clean, calm, non-repetitive closing spread */
export const ClosingPage: React.FC<{ onPrintPdf: () => void }> = ({ onPrintPdf }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FolioShell pageNumber="09" sectionLabel="09 // CLOSING & CONTACT" variant="dark">
      <div className="flex-1 min-h-0 flex flex-col justify-center py-4">
        <div className="folio-grid-closing gap-8 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d6291]/25 border border-[#88a2bd]/45 font-mono text-[10.5px] text-[#b1bdca] uppercase tracking-widest">
              <span>2027 EU INTERNSHIPS &amp; SPACECRAFT SYSTEMS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#e0ddd8] leading-[1.08]">
              Ready to contribute to flight hardware, thermal control &amp; autonomous GNC.
            </h2>

            <p className="text-sm sm:text-base text-[#b1bdca] leading-relaxed max-w-xl">
              Thank you for reviewing this 9-page engineering dossier. I bring hands-on mechanical
              fabrication, numerical spacecraft simulation, and production software delivery—with
              full clarity on where designs succeeded and where constraints exposed limits.
            </p>

            <div className="folio-grid-3 gap-3 pt-1 font-mono text-[10.5px]">
              <div className="p-3 border border-[#718fa7]/40 bg-[#090807]/85">
                <div className="text-[#88a2bd] font-bold">01. HARDWARE</div>
                <div className="text-[#e0ddd8] mt-1">CAD, CNC/PCB Fab &amp; 3U CubeSat Thermal</div>
              </div>
              <div className="p-3 border border-[#718fa7]/40 bg-[#090807]/85">
                <div className="text-[#88a2bd] font-bold">02. SIMULATION</div>
                <div className="text-[#e0ddd8] mt-1">6-DoF Attitude Dynamics &amp; Astrometry</div>
              </div>
              <div className="p-3 border border-[#718fa7]/40 bg-[#090807]/85">
                <div className="text-[#88a2bd] font-bold">03. DELIVERY</div>
                <div className="text-[#e0ddd8] mt-1">Python Backends &amp; Embedded C/C++</div>
              </div>
            </div>
          </div>

          <div className="bg-[#090807]/90 border border-[#718fa7]/55 p-6 space-y-4">
            <div className="border-b border-[#3e3b32] pb-3 flex items-center justify-between font-mono text-xs">
              <span className="text-[#88a2bd] font-bold">CONTACT DETAILS</span>
              <span className="text-[#c6b7a2]">ANKARA / TBILISI</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center justify-between p-3 bg-[#1d6291]/20 border border-[#1d6291] text-[#e0ddd8] hover:bg-[#1d6291] transition-colors"
              >
                <span className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-[#c6b7a2] shrink-0" />
                  <span className="truncate">{PROFILE.email}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#3e3b32]/30 border border-[#718fa7]/40 text-[#e0ddd8] hover:border-[#88a2bd] transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <GitBranch className="w-4 h-4 text-[#88a2bd]" />
                  <span>{PROFILE.githubHandle}</span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#3e3b32]/30 border border-[#718fa7]/40 text-[#e0ddd8] hover:border-[#88a2bd] transition-colors"
              >
                <span className="flex items-center gap-2.5 truncate">
                  <ExternalLink className="w-4 h-4 text-[#c6b7a2] shrink-0" />
                  <span className="truncate">{PROFILE.linkedinHandle}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <div className="no-print folio-grid-2 gap-2.5 pt-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-[#718fa7]/50 bg-[#090807] text-[#b1bdca] hover:text-[#e0ddd8] hover:border-[#88a2bd] cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
              </button>

              <button
                type="button"
                onClick={onPrintPdf}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#c6b7a2] text-[#090807] font-bold hover:bg-[#e0ddd8] cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FolioShell>
  );
};
