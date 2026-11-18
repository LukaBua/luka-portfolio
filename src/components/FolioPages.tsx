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
  PROFILE,
  SKILLS_LIST,
  SPOKEN_LANGUAGES,
} from '../data/portfolioData';
import type { SkillCategory, SkillLevel } from '../types';
import { CoverRocketCad } from './CoverRocketCad';
import { FolioShell } from './FolioShell';
import { CompanyMark, FlagIcon, ToolMark } from './PortfolioIcons';

const SKILL_CATEGORIES: SkillCategory[] = [
  'Coding',
  'CAD & Fabrication',
  'Simulation & Analysis',
  'Soft Skills',
];

const LEVEL_STYLES: Record<SkillLevel, string> = {
  Advanced: 'bg-[#1d6291] text-[#e0ddd8] border-[#1d6291]',
  Intermediate: 'bg-[#b1bdca]/55 text-[#090807] border-[#718fa7]',
  Beginner: 'bg-[#c6b7a2]/50 text-[#3e3b32] border-[#a0947e]',
};

/** Page 01 // Cover */
export const CoverPage: React.FC = () => (
  <FolioShell pageNumber="01" sectionLabel="COVER" variant="dark">
    <div className="relative flex-1 min-h-[540px] lg:min-h-0 flex flex-col justify-between p-7 sm:p-10 lg:p-12 overflow-hidden">
      <CoverRocketCad />

      {/* Left-side gradient scrim ensuring crisp legibility over CAD grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#090807] via-[#090807]/88 to-transparent"
      />

      {/* Top Cover Metadata Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d6291]/25 border border-[#88a2bd]/50 text-[#b1bdca] tracking-widest uppercase">
          <Rocket className="w-3.5 h-3.5 text-[#c6b7a2]" />
          <span>ENGINEERING PORTFOLIO // 2026</span>
        </div>
        <div className="px-2.5 py-1 border border-[#718fa7]/45 bg-[#090807]/75 text-[#e0ddd8]">
          PAGE 01 / 09
        </div>
      </div>

      {/* Center-Left Identity & Mission Statement */}
      <div className="relative z-10 max-w-xl space-y-5 my-auto py-8">
        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#c6b7a2]">
            {PROFILE.institution}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#e0ddd8] leading-[1.03]">
            {PROFILE.name}
          </h1>
          <p className="font-mono text-sm sm:text-base text-[#88a2bd] font-medium">
            {PROFILE.degree} · Portfolio
          </p>
        </div>

        <div className="h-[2px] w-24 bg-[#1d6291]" />

        <p className="text-sm sm:text-base text-[#b1bdca] leading-relaxed max-w-lg">
          A CV lists what I did—this 9-page engineering dossier shows{' '}
          <span className="text-[#e0ddd8] font-medium">how I reason under constraints</span>: from
          1,400-run CubeSat radiation-fault simulations and SPHEREx astrometry pipelines to
          autonomous robotics and 3U CubeSat thermal engineering.
        </p>

        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10.5px]">
          {[
            'CUBESAT ADCS (1,400 MC)',
            'SHROUDX // NASA SPACE APPS',
            'MIT TOT #1 PROTOTYPE',
            'METUCUBE 3U THERMAL',
          ].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-[#090807]/85 border border-[#718fa7]/45 text-[#e0ddd8]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Cover Index Bar */}
      <div className="relative z-10 pt-4 border-t border-[#718fa7]/30 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[#a0947e]">
        <div className="flex flex-wrap items-center gap-3">
          <span>01 COVER</span>
          <span>·</span>
          <span>02 ABOUT</span>
          <span>·</span>
          <span>03 SKILLS</span>
          <span>·</span>
          <span>04 EXPERIENCE</span>
          <span>·</span>
          <span>05–08 PROJECTS &amp; LEARNING</span>
          <span>·</span>
          <span>09 CONTACT</span>
        </div>
        <span className="text-[#c6b7a2]">{PROFILE.locations.toUpperCase()}</span>
      </div>
    </div>
  </FolioShell>
);

/** Page 02 // About Me */
export const AboutPage: React.FC = () => (
  <FolioShell
    pageNumber="02"
    sectionLabel="02 // ABOUT ME"
    title="Background, Origin & Aerospace Trajectory"
    subtitle={`${PROFILE.degree} · ${PROFILE.institution} (${PROFILE.studyPeriod})`}
  >
    <div className="flex-1 min-h-0 folio-grid-about gap-4 items-stretch">
      {/* Left: Portrait + Direct Contact Block */}
      <div className="flex flex-col justify-between gap-2.5 bg-[#090807] text-[#e0ddd8] border border-[#3e3b32] p-3.5 min-h-0">
        <div className="relative border border-[#718fa7]/45 overflow-hidden bg-[#3e3b32]/30 flex-1 min-h-[160px] max-h-[290px]">
          <img
            src={portraitImg}
            alt={PROFILE.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#090807]/85 border border-[#718fa7]/50 font-mono text-[9.5px] text-[#e0ddd8]">
            METU AEROSPACE // 2024–PRESENT
          </div>
        </div>

        <div className="space-y-1.5 font-mono text-[10px] pt-1 shrink-0">
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
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-2 text-[#b1bdca] hover:text-[#e0ddd8] transition-colors"
          >
            <span className="flex items-center gap-2 truncate">
              <ExternalLink className="w-3.5 h-3.5 text-[#88a2bd] shrink-0" />
              <span className="truncate">{PROFILE.linkedinHandle}</span>
            </span>
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </a>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-2 text-[#b1bdca] hover:text-[#e0ddd8] transition-colors"
          >
            <span className="flex items-center gap-2 truncate">
              <GitBranch className="w-3.5 h-3.5 text-[#c6b7a2] shrink-0" />
              <span className="truncate">{PROFILE.githubHandle}</span>
            </span>
            <ArrowUpRight className="w-3 h-3 shrink-0" />
          </a>
        </div>
      </div>

      {/* Right: 4 Scannable Profile Cards */}
      <div className="folio-grid-2 gap-3 min-h-0">
        <article className="border border-[#1d6291]/50 bg-[#b1bdca]/25 p-3.5 flex flex-col justify-between min-h-0">
          <div className="space-y-1.5">
            <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#1d6291]">
              01 // CURRENT STUDY &amp; CUBESAT ROLE
            </div>
            <h3 className="text-[13px] font-bold text-[#090807]">
              METU Aerospace + METUCube Thermal Subsystem
            </h3>
            <p className="text-[11px] leading-relaxed text-[#3e3b32]">
              Undergraduate in Aerospace Engineering at <strong>METU (ODTÜ)</strong> (100%
              English-medium; QS Europe #124, #1 in Turkey). Currently joining{' '}
              <strong>METUCube</strong> inside the <strong>Thermal Subsystem</strong>, building a{' '}
              <strong>3U CubeSat</strong> scheduled for completion within the next{' '}
              <strong>6 months</strong>.
            </p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#718fa7]/40 font-mono text-[9.5px] text-[#1d6291]">
            ACTIVE HARDWARE TIMELINE: 6 MONTHS // 3U CUBESAT
          </div>
        </article>

        <article className="border border-[#a0947e] bg-[#c6b7a2]/28 p-3.5 flex flex-col justify-between min-h-0">
          <div className="space-y-1.5">
            <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#493716]">
              02 // ORIGIN STORY
            </div>
            <h3 className="text-[13px] font-bold text-[#090807]">
              From Georgia FabLabs to Orbital Flight Systems
            </h3>
            <p className="text-[11px] leading-relaxed text-[#3e3b32]">{PROFILE.originStory}</p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#a0947e]/60 font-mono text-[9.5px] text-[#493716]">
            STARTED BUILDING AT AGE 16–17 // GITA &amp; MIT TOT
          </div>
        </article>

        <article className="border border-[#718fa7]/60 bg-[#e0ddd8] p-3.5 flex flex-col justify-between min-h-0">
          <div className="space-y-1.5">
            <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#3e3b32]">
              03 // OUTSIDE-UNIVERSITY PROJECTS
            </div>
            <h3 className="text-[13px] font-bold text-[#090807]">
              Independent Systems, Startup &amp; Space Hackathons
            </h3>
            <p className="text-[11px] leading-relaxed text-[#3e3b32]">
              {PROFILE.outsideProjectsNote}
            </p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#a0947e]/50 font-mono text-[9.5px] text-[#6f6856]">
            $2,000+ GRANT · 1,400 MC FLIGHTS · 5-PERSON LEAD
          </div>
        </article>

        <article className="border border-[#1d6291] bg-[#090807] text-[#e0ddd8] p-3.5 flex flex-col justify-between min-h-0">
          <div className="space-y-1.5">
            <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#88a2bd] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>04 // WHERE I WANT TO GO NEXT</span>
            </div>
            <h3 className="text-[13px] font-bold text-[#e0ddd8]">
              EU Aerospace Internships &amp; Spacecraft Systems
            </h3>
            <p className="text-[11px] leading-relaxed text-[#b1bdca]">
              Seeking hands-on <strong>European Aerospace Internships</strong> and{' '}
              <strong>Spacecraft Systems Engineering</strong> roles across ADCS, thermal
              subsystems, GNC simulation, and flight-grade software.
            </p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#718fa7]/35 font-mono text-[9.5px] text-[#c6b7a2]">
            COHORT REP (2024–25) · INTL COORDINATOR (2025–26)
          </div>
        </article>
      </div>
    </div>
  </FolioShell>
);

/** Page 03 // Technical Skills + Spoken Languages w/ Flags */
export const SkillsPage: React.FC = () => (
  <FolioShell
    pageNumber="03"
    sectionLabel="03 // TECHNICAL SKILLS"
    title="Evidence-Backed Tooling & Languages"
    subtitle="Conservative proficiency ratings backed by measurable deliverables — plus 4 working languages"
  >
    <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5">
      {/* 4 Skill Category Quadrants */}
      <div className="folio-grid-2 gap-2.5 flex-1 min-h-0">
        {SKILL_CATEGORIES.map((category) => {
          const items = SKILLS_LIST.filter((s) => s.category === category);
          return (
            <div
              key={category}
              className="border border-[#a0947e] bg-[#e0ddd8] flex flex-col overflow-hidden min-h-0"
            >
              <div className="px-3 py-1 bg-[#3e3b32] text-[#e0ddd8] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-between shrink-0">
                <span>{category}</span>
                <span className="text-[#b1bdca]">{items.length} TOOLS</span>
              </div>
              <div className="p-2 folio-grid-2 gap-1.5 flex-1 min-h-0">
                {items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-2 p-1.5 bg-[#c6b7a2]/22 border border-[#a0947e]/50 min-h-0"
                  >
                    <ToolMark id={skill.icon} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-[#090807] truncate">
                          {skill.name}
                        </span>
                        <span
                          className={`px-1.5 py-[1px] border font-mono text-[8.5px] font-semibold uppercase shrink-0 ${LEVEL_STYLES[skill.level]}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[9.5px] leading-[1.28] text-[#3e3b32] mt-0.5">
                        {skill.evidence}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Spoken Languages Strip with SVG Flags */}
      <div className="border border-[#1d6291]/50 bg-[#b1bdca]/28 px-3 py-2 shrink-0">
        <div className="flex items-center justify-between mb-1.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#1d6291]">
          <span>SPOKEN LANGUAGES // MULTICULTURAL ENGINEERING COMMUNICATION</span>
          <span>4 WORKING LANGUAGES</span>
        </div>
        <div className="folio-grid-4 gap-2">
          {SPOKEN_LANGUAGES.map((lang) => (
            <div
              key={lang.language}
              className="flex items-center gap-2 px-2 py-1 bg-[#e0ddd8] border border-[#a0947e]/70"
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
  </FolioShell>
);

/** Page 04 // Work Experience */
export const ExperiencePage: React.FC = () => (
  <FolioShell
    pageNumber="04"
    sectionLabel="04 // WORK EXPERIENCE"
    title="Venture Leadership, Banking Backend & FabLab Engineering"
    subtitle="Role scope, tools, quantified deliverables & progression inside each organization"
  >
    <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5">
      <div className="folio-grid-3 gap-3.5 flex-1 min-h-0">
        {EXPERIENCES.map((exp) => (
          <article
            key={exp.id}
            className="border border-[#a0947e] bg-[#e0ddd8] flex flex-col justify-between overflow-hidden min-h-0"
          >
            <div>
              <div className="p-3 bg-[#3e3b32] text-[#e0ddd8] flex items-start gap-2.5">
                <CompanyMark id={exp.logo} />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[9.5px] text-[#c6b7a2]">{exp.dates}</div>
                  <h3 className="text-[13px] font-bold leading-snug text-[#e0ddd8]">{exp.role}</h3>
                  <div className="text-[10.5px] text-[#b1bdca] font-medium leading-tight">
                    {exp.company} · {exp.location}
                  </div>
                </div>
              </div>

              <div className="px-3 py-2 bg-[#c6b7a2]/30 border-b border-[#a0947e]/60 text-[11px] font-medium text-[#090807] leading-snug">
                {exp.summary}
              </div>

              <ul className="p-3 space-y-2 text-[11px] text-[#3e3b32] leading-snug">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-1.5">
                    <span className="font-mono font-bold text-[#1d6291] mt-[1px]">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 pt-2 border-t border-[#a0947e]/55 bg-[#b1bdca]/18 space-y-1.5">
              <div className="flex flex-wrap gap-1 font-mono text-[9px]">
                {exp.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-1.5 py-0.5 bg-[#e0ddd8] border border-[#718fa7]/60 text-[#090807] font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="text-[10px] leading-snug text-[#3e3b32]">
                <strong className="font-mono text-[9px] uppercase text-[#1d6291] mr-1">
                  GROWTH:
                </strong>
                {exp.growth}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom University Organization Continuity Strip */}
      <div className="px-4 py-2 bg-[#090807] text-[#e0ddd8] border border-[#1d6291]/60 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] shrink-0">
        <span className="text-[#88a2bd] font-bold">
          ACTIVE UNIVERSITY SUBSYSTEM // METUCube (METU Aerospace)
        </span>
        <span className="text-[#c6b7a2]">
          Thermal Subsystem Contributor — 3U CubeSat Build (6-Month Completion Window)
        </span>
      </div>
    </div>
  </FolioShell>
);

/** Page 07 // Certifications, Programs & Continuous Learning */
export const LearningPage: React.FC = () => (
  <FolioShell
    pageNumber="07"
    sectionLabel="07 // CONTINUOUS LEARNING"
    title="Engineering Programs, Technical Judging & Subsystem Onboarding"
    subtitle="All formats explicitly verified (in-person cohorts, mentoring/judging, hardware team & university curriculum)"
  >
    <div className="flex-1 min-h-0 flex flex-col justify-between gap-2">
      {LEARNING_ENTRIES.map((item) => (
        <article
          key={item.id}
          className="border border-[#a0947e] bg-[#e0ddd8] folio-grid-learning overflow-hidden flex-1 min-h-0"
        >
          {/* Left Identity Column */}
          <div className="px-3 py-2 bg-[#3e3b32] text-[#e0ddd8] flex flex-col justify-between gap-1">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="px-1.5 py-[1px] bg-[#1d6291] text-[#e0ddd8] font-mono text-[8.5px] font-bold uppercase tracking-wider">
                {item.format}
              </span>
              <span className="font-mono text-[9.5px] text-[#c6b7a2]">{item.date}</span>
            </div>
            <h3 className="text-[11.5px] font-bold leading-tight text-[#e0ddd8]">{item.title}</h3>
            <div className="font-mono text-[9.5px] text-[#b1bdca] truncate">{item.provider}</div>
          </div>

          {/* Right 4-Column Evidence Grid */}
          <div className="px-3 py-2 folio-grid-4 gap-2 text-[10px] leading-[1.3] items-start">
            <div>
              <div className="font-mono text-[8.5px] font-bold uppercase text-[#1d6291] mb-0.5">
                KEY TASK
              </div>
              <p className="text-[#090807]">{item.keyTask}</p>
            </div>
            <div>
              <div className="font-mono text-[8.5px] font-bold uppercase text-[#493716] mb-0.5">
                CONSTRAINT
              </div>
              <p className="text-[#3e3b32]">{item.constraint}</p>
            </div>
            <div>
              <div className="font-mono text-[8.5px] font-bold uppercase text-[#6f6856] mb-0.5">
                TOOLS USED
              </div>
              <p className="text-[#3e3b32]">{item.tools}</p>
            </div>
            <div className="bg-[#b1bdca]/28 p-1.5 border border-[#718fa7]/45 h-full">
              <div className="font-mono text-[8.5px] font-bold uppercase text-[#090807] mb-0.5 flex items-center gap-1">
                <Award className="w-2.5 h-2.5 text-[#1d6291]" />
                <span>OUTPUT</span>
              </div>
              <p className="text-[#090807] font-medium">{item.output}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </FolioShell>
);

/** Page 09 // Closing & Contact */
export const ClosingPage: React.FC<{ onPrintPdf: () => void }> = ({ onPrintPdf }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FolioShell pageNumber="09" sectionLabel="09 // CLOSING & CONTACT" variant="dark">
      <div className="flex-1 min-h-0 flex flex-col justify-center py-2">
        <div className="folio-grid-closing gap-6 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d6291]/25 border border-[#88a2bd]/45 font-mono text-[10px] text-[#b1bdca] uppercase tracking-widest">
              <span>OPEN FOR 2027 EU INTERNSHIPS &amp; SPACECRAFT SYSTEMS ROLES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-[#e0ddd8] leading-[1.08]">
              Ready to contribute to flight hardware, thermal systems &amp; autonomous GNC.
            </h2>

            <p className="text-xs sm:text-sm text-[#b1bdca] leading-relaxed max-w-2xl">
              Thank you for reviewing my engineering portfolio. Every number across these 9 pages—from
              1,400 radiation-fault Monte Carlo trajectories and SPHEREx astrometry residuals to
              GITA FabLab prototyping and Bank of Georgia production delivery—is backed by working
              repositories, test hardware, or honest post-mortems.
            </p>

            {/* 4 Key Evidence Metrics */}
            <div className="folio-grid-4 gap-2.5 pt-1 font-mono">
              {[
                { k: 'ADCS VALIDATION', v: '1,400 Flights' },
                { k: 'SPACE APPS LEAD', v: '5 Engineers' },
                { k: 'MIT TOT COHORT', v: '#1 Rank (1*)' },
                { k: 'METUCUBE BUILD', v: '3U Thermal' },
              ].map((stat) => (
                <div
                  key={stat.k}
                  className="p-2.5 bg-[#090807]/85 border border-[#718fa7]/40"
                >
                  <div className="text-[9px] text-[#a0947e]">{stat.k}</div>
                  <div className="text-xs font-bold text-[#e0ddd8] mt-0.5">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Direct Contact Card */}
          <div className="bg-[#090807]/90 border border-[#718fa7]/55 p-5 space-y-3.5">
            <div className="border-b border-[#3e3b32] pb-2.5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#88a2bd] font-bold">DIRECT CONTACT CHANNELS</span>
              <span className="text-[#c6b7a2]">ANKARA / TBILISI</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center justify-between p-2.5 bg-[#1d6291]/20 border border-[#1d6291] text-[#e0ddd8] hover:bg-[#1d6291] transition-colors"
              >
                <span className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-[#c6b7a2] shrink-0" />
                  <span className="truncate">{PROFILE.email}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#3e3b32]/30 border border-[#718fa7]/40 text-[#e0ddd8] hover:border-[#88a2bd] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#88a2bd]" />
                  <span>{PROFILE.githubHandle}</span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#3e3b32]/30 border border-[#718fa7]/40 text-[#e0ddd8] hover:border-[#88a2bd] transition-colors"
              >
                <span className="flex items-center gap-2 truncate">
                  <ExternalLink className="w-4 h-4 text-[#c6b7a2] shrink-0" />
                  <span className="truncate">{PROFILE.linkedinHandle}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <div className="no-print folio-grid-2 gap-2 pt-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#718fa7]/50 bg-[#090807] text-[#b1bdca] hover:text-[#e0ddd8] hover:border-[#88a2bd] cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
              </button>

              <button
                type="button"
                onClick={onPrintPdf}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#c6b7a2] text-[#090807] font-bold hover:bg-[#e0ddd8] cursor-pointer transition-colors"
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
