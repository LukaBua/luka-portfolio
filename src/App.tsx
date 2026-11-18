import { useCallback, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Cpu,
  Eye,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Layers,
  Mail,
  Maximize2,
  Orbit,
  Radio,
  ShieldAlert,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import { BoidCanvas } from './components/BoidCanvas';
import { CadWireframeBox } from './components/CadWireframeBox';
import { OrbitalGimbal } from './components/OrbitalGimbal';
import { ShroudXShowcase } from './components/ShroudXShowcase';
import { TelemetryDock } from './components/TelemetryDock';
import { TelemetryPlot } from './components/TelemetryPlot';
import {
  HudFigureFrame,
  MetricBadgeStrip,
  TelemetryBulletList,
} from './components/TelemetryPrimitives';
import type {
  BenchmarkFigure,
  CourseItem,
  MetricBadge,
  ProjectItem,
  SpokenLanguageItem,
  TelemetryBullet,
} from './types';

import fig1MonteCarlo from './assets/figures/fig1_monte_carlo_sweeps.png';
import fig2SefiRecovery from './assets/figures/fig2_sefi_recovery_trajectory.png';
import fig3ErrorDist from './assets/figures/fig3_error_distributions.png';

const ADCS_METRIC_BADGES: MetricBadge[] = [
  { text: '[SIM RUNS: N=1,400]', variant: 'cyan' },
  { text: '[MAX FLUX: 1000x SOLAR STORM]', variant: 'amber' },
  { text: '[ERROR BOUND: 35.07°]', variant: 'amber' },
  { text: '[MODEL FOOTPRINT: 5.3 KB]', variant: 'cyan' },
  { text: '[EFFORT REDUCTION: -30%]', variant: 'cyan' },
];

const ADCS_TELEMETRY_BULLETS: TelemetryBullet[] = [
  {
    label: 'Zero-State Fault Immunity',
    detail:
      'Eliminated integral windup during radiation-induced Single-Event Functional Interrupts (SEFIs) by mapping instantaneous quaternion and rate errors directly to reaction wheel torque commands via a stateless MLP policy.',
  },
  {
    label: 'Storm Envelope & Recovery',
    detail:
      'Prevented satellite tumbling across logarithmic proton flux sweeps (0x to 1000x), cutting attitude dispersion by 46.8% compared to classical PID when sensor bit-flips and torque impulses coincide.',
  },
  {
    label: 'Bare-Metal Flight Quantization',
    detail:
      'Compressed trained PyTorch policy weights using post-training INT8 quantization into a static C header with zero dynamic heap allocation for deterministic execution on ARM Cortex-M flight controllers.',
  },
  {
    label: 'Desaturation & Torque Economy',
    detail:
      'Avoided 5.0 mN·m reaction wheel stall saturation during high-rate detumbling while preserving wheel momentum margins (< 3.14 mN·m·s).',
  },
];

const RIGOROUS_COURSES: CourseItem[] = [
  {
    code: 'ES 361',
    title: 'Computing Methods in Engineering',
    domain: 'UPPER-DIV NUMERICAL ANALYSIS & SOLVERS',
    highlight: true,
  },
  {
    code: 'AEE 231',
    title: 'Thermodynamics',
    domain: 'AEROSPACE ENERGY CYCLES & ENTROPY',
    highlight: true,
  },
  {
    code: 'AEE 172',
    title: 'Introduction to Aircraft Performance',
    domain: 'FLIGHT ENVELOPES & PROPULSION MECHANICS',
    highlight: true,
  },
  {
    code: 'AEE 261',
    title: 'Statics',
    domain: '3D RIGID-BODY EQUILIBRIUM & LOADS',
  },
  {
    code: 'METE 230',
    title: 'Fundamentals of Materials Science & Eng.',
    domain: 'CRYSTALLOGRAPHY, ALLOYS & DEFORMATION',
  },
  {
    code: 'MATH 119 / 120',
    title: 'Single & Multivariable Calculus',
    domain: 'ANALYTIC GEOMETRY, PARTIAL DERIVATIVES & VECTOR CALC',
    highlight: true,
  },
  {
    code: 'PHYS 105 / 106',
    title: 'General Physics I & II',
    domain: 'NEWTONIAN MECHANICS & ELECTROMAGNETISM',
  },
  {
    code: 'CENG 240 / ME 105',
    title: 'Python for Engineers & CAD Graphics',
    domain: 'ALGORITHMIC COMPUTING & TECHNICAL DRAFTING',
  },
];

const SPOKEN_LANGUAGES: SpokenLanguageItem[] = [
  {
    language: 'Georgian',
    level: 'NATIVE',
    note: 'Primary Mother Tongue',
  },
  {
    language: 'English',
    level: 'FLUENT // C1–C2',
    note: 'Full Academic & Technical (AA in ENG 101 & ENG 211)',
  },
  {
    language: 'Russian',
    level: 'FLUENT // CONV.',
    note: 'Bilingual / Working Communication',
  },
  {
    language: 'Turkish',
    level: 'CONVERSATIONAL',
    note: 'Daily Operations (Ankara, TR // TURK 105)',
  },
];

const BENCHMARK_FIGURES: BenchmarkFigure[] = [
  {
    id: 'fig-01',
    sysTag: '[TELEM.FIG.01 // MC.SWEEP]',
    coordTag: 'SCALE: 0x -> 1000x // N=1,400',
    captionHeader: 'FIG 01 // MONTE CARLO ATTITUDE DISPERSION (N=1400)',
    subtitle:
      'Settling time (s), mean pointing error (deg), and reaction wheel control effort (N·m·s) across logarithmic radiation intensity scales (0 to 10³).',
    src: fig1MonteCarlo,
    metrics: ['[SIM RUNS: N=1,400]', '[ERROR BOUND: 35.07°]', '[-46.8% MEAN ERR]'],
  },
  {
    id: 'fig-02',
    sysTag: '[TELEM.FIG.02 // SEFI.TRAJ]',
    coordTag: 'T=0..20s // RW.TORQUE',
    captionHeader: 'FIG 02 // PPO VS CLASSICAL PID RECOVERY UNDER 1000x SOLAR STORM',
    subtitle:
      '4-channel time-domain flight profile: attitude error (deg), body angular rate (deg/s), motor torque vs. 5.0 mN·m stall limit, and wheel momentum (mN·m·s).',
    src: fig2SefiRecovery,
    metrics: ['[MAX FLUX: 1000x]', '[5.0 mN·m STALL CAP]', '[3.14 mN·m·s MOM.]'],
  },
  {
    id: 'fig-03',
    sysTag: '[TELEM.FIG.03 // ACQ.DIST]',
    coordTag: 'LOG10.ERR // <1.0° LOCK',
    captionHeader: 'FIG 03 // POINTING ACQUISITION & ERROR DISTRIBUTION (0x–1000x)',
    subtitle:
      'Sub-degree (< 1.0°) science pointing acquisition success rate [%] and log-scale median final attitude error (deg) comparing Classical PID and Deep RL (PPO).',
    src: fig3ErrorDist,
    metrics: ['[100% LOCK (0x–5x)]', '[0.11° MEDIAN ERR]', '[EFFORT: -30%]'],
  },
];

const SECONDARY_PROJECTS: ProjectItem[] = [
  {
    id: 'mit-tot-robot',
    sysTag: '[SYS.ROBO.03 // MIT.TOT]',
    coordTag: 'RANK: #1 // 2 MIT PHDs',
    title: 'Autonomous Obstacle-Avoiding & Object-Tracking Robot',
    subtitle: 'MIT Training of Trainers (ToT) Mechatronics & Embedded Vision Cohort',
    metricBadges: [
      { text: '[COHORT RANK: #1]', variant: 'cyan' },
      { text: '[MENTORS: 2 MIT PHDs]', variant: 'amber' },
      { text: '[YOUNGEST ADMITTED]', variant: 'cyan' },
    ],
    tags: ['[Optical Sensor Arrays]', '[Real-Time Tracking]', '[Closed-Loop Steering]', '[Embedded C++]'],
    telemetryBullets: [
      {
        label: 'Cohort Performance',
        detail:
          'Earned the #1 overall evaluation score across the competitive MIT ToT engineering cohort as the youngest participant selected.',
      },
      {
        label: 'Optical Feedback & Control',
        detail:
          'Engineered under direct mentorship from two MIT PhD researchers, calibrating multi-channel color recognition arrays and low-latency obstacle avoidance loops.',
      },
    ],
    accent: 'cyan',
  },
  {
    id: 'cyber-infinity',
    sysTag: '[SYS.NAV.04 // CYBER.INF]',
    coordTag: 'GRANT: $2,000+ // CEO',
    title: 'Autonomous Commercial Service Robot (Cyber Infinity)',
    subtitle: 'Venture-Backed Hardware Startup // Mechanical CAD to Motor-Drive Firmware',
    metricBadges: [
      { text: '[ROLE: CO-FOUNDER & CEO]', variant: 'amber' },
      { text: '[NON-DILUTIVE GRANT: $2,000+]', variant: 'cyan' },
      { text: '[STAGE: LIVE COMMERCIAL PILOT]', variant: 'amber' },
    ],
    tags: ['[SolidWorks Assemblies]', '[Custom Motor Firmware]', '[Indoor SLAM/Nav]', '[Hardware Venture]'],
    telemetryBullets: [
      {
        label: 'Electro-Mechanical Architecture',
        detail:
          'Designed full-chassis SolidWorks assemblies, drivetrain tolerances, and custom microcontroller motor-control firmware from a blank-sheet specification.',
      },
      {
        label: 'Commercial Field Deployment',
        detail:
          'Secured $2,000+ in competitive engineering grant funding and deployed the robot for autonomous indoor navigation in live commercial environments.',
      },
    ],
    accent: 'amber',
  },
  {
    id: 'gita-intern',
    sysTag: '[SYS.FAB.05 // GITA.LAB]',
    coordTag: 'MENTORED: 25+ // 3 CNC.FAB',
    title: 'Digital Fabrication & Hardware Prototyping (GITA)',
    subtitle: 'Georgia’s Innovation & Technology Agency // Industrial FabLab Engineering',
    metricBadges: [
      { text: '[ADVISED: 25+ ENGINEERS]', variant: 'cyan' },
      { text: '[MACHINING: CNC / LASER / PCB]', variant: 'amber' },
    ],
    tags: ['[3-Axis CNC CAM]', '[PCB Milling]', '[Laser Structural Fab]', '[DFM Reviews]'],
    telemetryBullets: [
      {
        label: 'Design-for-Manufacturing (DFM)',
        detail:
          'Guided 25+ undergraduate engineering teams through CAD tolerance analysis, structural material selection, and rapid hardware iteration.',
      },
      {
        label: 'Multi-Platform Machining',
        detail:
          'Generated CAM toolpaths and operated 3-axis industrial CNC mills, high-power laser cutters, and precision PCB circuit printers for robotics and biomedical hardware.',
      },
    ],
    accent: 'cyan',
  },
  {
    id: 'bank-of-georgia',
    sysTag: '[SYS.PROD.06 // BOG.AUTO]',
    coordTag: 'CYCLE: 30 DAYS // 100% PROD',
    title: 'Digital Banking Backend Automation (Bank of Georgia)',
    subtitle: 'Enterprise Software Engineering // High-Throughput Media Processing Service',
    metricBadges: [
      { text: '[DELIVERY: 30 DAYS]', variant: 'cyan' },
      { text: '[STATUS: 100% PRODUCTION]', variant: 'amber' },
    ],
    tags: ['[Backend Microservice]', '[Automated Image Pipeline]', '[Unit & Integration Tests]', '[Enterprise CI/CD]'],
    telemetryBullets: [
      {
        label: 'Production Pipeline',
        detail:
          'Architected and deployed an automated image transformation, smart cropping, and rescaling microservice into live banking infrastructure within a 30-day sprint.',
      },
      {
        label: 'Enterprise Verification',
        detail:
          'Implemented comprehensive unit and regression test suites satisfying strict financial-grade reliability and latency standards.',
      },
    ],
    accent: 'cyan',
  },
];

const HARDWARE_COMPUTE_GRID = [
  {
    sysTag: '[GRID.MOD.01 // AERO.CTRL]',
    coordTag: 'GNC // DYNAMICS',
    category: 'FLIGHT DYNAMICS & GNC',
    icon: Orbit,
    badges: [
      { name: '6-DoF Rigid-Body Dynamics', code: 'QUATERNION KINEMATICS' },
      { name: 'Spacecraft Attitude Control', code: '3-AXIS RW + MTQ' },
      { name: 'Classical & Hybrid Control', code: 'PID / GAIN SCHEDULING' },
      { name: 'Reinforcement Learning', code: 'PPO / POLICY GRADIENT' },
      { name: 'Numerical Integration', code: 'RK4 / ODE SOLVERS' },
      { name: 'Stochastic Verification', code: 'MONTE CARLO DISPERSION' },
      { name: 'Space Astrometry & WCS', code: 'SPHEREX / GAIA DR3 / WLS' },
    ],
  },
  {
    sysTag: '[GRID.MOD.02 // EMBED.HW]',
    coordTag: 'MCU // FAB',
    category: 'EMBEDDED & FABRICATION',
    icon: Cpu,
    badges: [
      { name: 'ARM Cortex-M / Bare-Metal', code: 'INT8 QUANTIZED INFERENCE' },
      { name: 'Closed-Loop Mechatronics', code: 'PWM / ENCODER FEEDBACK' },
      { name: 'Optical & Sensor Arrays', code: 'LOW-LATENCY FILTERING' },
      { name: 'PCB Prototyping', code: 'SCHEMATIC & MILLING' },
      { name: '3-Axis CNC Machining', code: 'CAM TOOLPATHING' },
      { name: 'Laser & Rapid Fab', code: 'STRUCTURAL ASSEMBLIES' },
    ],
  },
  {
    sysTag: '[GRID.MOD.03 // LANG.TOOLS]',
    coordTag: 'DEV // CAD',
    category: 'SOFTWARE & CAD WORKSTATION',
    icon: Terminal,
    badges: [
      { name: 'Python', code: 'PYTORCH / ASTROPY / FASTAPI' },
      { name: 'C / C++', code: 'EMBEDDED & FLIGHT SW' },
      { name: 'SolidWorks & Fusion 360', code: '3D CAD / CAM / DFM' },
      { name: 'TypeScript & React', code: 'REACT 19 / VITE / THREE.JS' },
      { name: 'Docker, Linux (Arch) & Git', code: 'CONTAINERS & DEVOPS' },
      { name: 'IRSA SIA2/TAP & FITS', code: 'ASTRODATA PIPELINES' },
      { name: 'Spoken Languages', code: 'KA / EN / RU / TR' },
    ],
  },
];

export function App() {
  const [inspectMode, setInspectMode] = useState(false);
  const [purgeSignal, setPurgeSignal] = useState(0);
  const [telemetry, setTelemetry] = useState({ fps: 60, agents: 44 });
  const [darkFieldFilter, setDarkFieldFilter] = useState(true);
  const [expandedFigure, setExpandedFigure] = useState<BenchmarkFigure | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleTelemetryUpdate = useCallback((fps: number, agents: number) => {
    setTelemetry((prev) =>
      prev.fps === fps && prev.agents === agents ? prev : { fps, agents }
    );
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('luka.buachidze@metu.edu.tr');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-white bg-tech-grid selection:bg-[#00f0ff]/30 selection:text-[#00f0ff]">
      {/* Autonomous Boid Flocking Simulation Canvas */}
      <BoidCanvas
        agentCount={44}
        inspectMode={inspectMode}
        purgeSignal={purgeSignal}
        onTelemetryUpdate={handleTelemetryUpdate}
      />

      {/* Ambient Top Cyan/Blue Horizon Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] bg-gradient-to-b from-[#00f0ff]/8 via-[#3b82f6]/5 to-transparent blur-3xl z-0"
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#060709]/88 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-mono text-xs sm:text-sm tracking-wider text-white hover:text-[#00f0ff] transition-colors"
          >
            <span className="inline-flex items-center justify-center w-2 h-2 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <span className="font-bold">LUKA.BUACHIDZE</span>
            <span className="text-slate-500 hidden md:inline">//</span>
            <span className="text-slate-300 hidden md:inline">
              METU AEROSPACE ENGINEERING
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {[
              { label: '[Hero]', href: '#systems' },
              { label: '[ADCS]', href: '#research' },
              { label: '[ShroudX]', href: '#shroudx' },
              { label: '[Systems]', href: '#engineering' },
              { label: '[Education]', href: '#education' },
              { label: '[Stack]', href: '#stack' },
              { label: '[Contact]', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-2.5 py-1.5 text-slate-400 hover:text-[#00f0ff] hover:bg-cyan-500/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 px-2.5 py-1 border border-cyan-500/30 bg-cyan-950/20 font-mono text-[11px] text-cyan-300">
            <Radio className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
            <span className="hidden sm:inline">ODTÜ / METU // ANKARA, TR</span>
            <span className="sm:hidden">METU // TR</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main
        id="top"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-28 space-y-20"
      >
        {/* A. Hero Section */}
        <section id="systems" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Mission Brief & Direct Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <CadWireframeBox
                sysTag="[SYS.CORE.00 // FLIGHT.DYN]"
                coordTag="LAT 39.89°N // LON 32.78°E"
                inspectMode={inspectMode}
                className="p-6 sm:p-9 h-full flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Kicker */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-400/40 font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
                    <Activity className="w-3.5 h-3.5" />
                    <span>FLIGHT DYNAMICS &amp; CONTROL SYSTEMS RESEARCH</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold tracking-tight text-white leading-[1.08]">
                    Autonomous Systems that hold up in{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-cyan-200 to-[#3b82f6]">
                      extreme environments.
                    </span>
                  </h1>

                  {/* Focus */}
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                    METU Aerospace Engineering undergraduate researcher specializing in
                    satellite{' '}
                    <span className="text-white font-medium">
                      ADCS (Attitude Determination &amp; Control Systems)
                    </span>
                    , 6-DoF numerical trajectory simulation, and radiation-tolerant neural
                    flight controllers.
                  </p>

                  {/* Direct Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5 font-mono text-xs sm:text-sm">
                    <a
                      href="#research"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#00f0ff] text-black font-semibold tracking-wider hover:bg-cyan-300 shadow-[0_0_24px_rgba(0,240,255,0.35)] transition-all"
                    >
                      <span>[Explore Flight Benchmarks]</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href="mailto:luka.buachidze@metu.edu.tr"
                      className="inline-flex items-center gap-2 px-4 py-3 border border-slate-700 bg-slate-900/70 text-slate-200 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
                    >
                      <Mail className="w-4 h-4 text-[#f59e0b]" />
                      <span>[Initialize Contact]</span>
                    </a>
                  </div>
                </div>

                {/* Key Telemetry Strip */}
                <div className="mt-8 pt-6 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      MONTE CARLO VALIDATION
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#00f0ff]">
                      1,400 FLIGHTS
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      1000x SOLAR STORM
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#f59e0b]">
                      35.07° BOUND
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      ARM CORTEX-M FOOTPRINT
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white">
                      5.3 KB INT8
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">
                      ACTUATOR EFFORT
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-emerald-400">
                      -30% TORQUE
                    </div>
                  </div>
                </div>
              </CadWireframeBox>
            </div>

            {/* Right Column: Interactive Three.js 3-Axis Reaction Wheel Gimbal */}
            <div className="lg:col-span-5">
              <CadWireframeBox
                sysTag="[6-DOF.SIM // ORBITAL.GIMBAL]"
                coordTag="THREE.WEBGL // 3-AXIS RW"
                inspectMode={inspectMode}
                className="h-full flex flex-col justify-between"
              >
                <OrbitalGimbal inspectMode={inspectMode} />
              </CadWireframeBox>
            </div>
          </div>
        </section>

        {/* B. Featured Research & Systems Engineering */}
        <section id="research" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SECTION 01 // FEATURED RESEARCH &amp; SYSTEMS ENGINEERING</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Radiation-Tolerant CubeSat ADCS, Space Astrometry &amp; Autonomous Systems
              </h2>
            </div>
            <div className="font-mono text-xs text-slate-400">
              TOGGLE <span className="text-[#00f0ff]">[INSPECT MODE]</span> IN DOCK FOR CAD
              WIREFRAMES
            </div>
          </div>

          {/* 1. Flagship Research Card: Radiation-Tolerant CubeSat ADCS (Flight Dynamics & Deep RL) */}
          <CadWireframeBox
            sysTag="[SYS.ADCS.01 // 6-DOF.SIM]"
            coordTag="MC: N=1,400 // CORTEX-M: 5.3KB"
            inspectMode={inspectMode}
            accent="cyan"
            className="p-6 sm:p-8 space-y-8"
          >
            {/* Card Header Telemetry Strip: High-Contrast HUD Metric Pills */}
            <div className="border-b border-slate-800/90 pb-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#00f0ff]/15 border border-[#00f0ff]/60 font-mono text-[11px] font-semibold text-[#00f0ff] uppercase shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                    FLAGSHIP RESEARCH // FLIGHT DYNAMICS &amp; DEEP RL
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/50 font-mono text-[11px] font-semibold text-[#f59e0b] uppercase shadow-[0_0_12px_rgba(245,158,11,0.18)]">
                    1000x SOLAR STORM SAFE-MODE
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  TELEMETRY VERIFIED // 6-DOF MONTE CARLO
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Radiation-Tolerant CubeSat ADCS (Flight Dynamics &amp; Deep RL)
                </h3>
                <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300/90">
                  Dual-Layer Hybrid Flight Controller: Classical PID + Memoryless Deep RL (PPO)
                </p>
              </div>

              {/* Prominent Monospace Telemetry Readout Pills with Faint Glowing Borders */}
              <MetricBadgeStrip badges={ADCS_METRIC_BADGES} />
            </div>

            {/* Top Overview & Architecture Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Hybrid spacecraft attitude control framework pairing{' '}
                  <span className="text-white font-medium">
                    classical PID for sub-degree (&lt;1.0°) quiet-sun science pointing
                  </span>{' '}
                  with{' '}
                  <span className="text-white font-medium">
                    stateless Proximal Policy Optimization (PPO)
                  </span>{' '}
                  for autonomous fault recovery when severe solar proton flux triggers
                  Single-Event Functional Interrupts (SEFIs).
                </p>

                <TelemetryBulletList items={ADCS_TELEMETRY_BULLETS} accent="cyan" />
              </div>

              {/* Right Column: 6-DoF Plant Parameters & Dual-Layer Switching */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#060709] border border-slate-800/90 p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
                    <span>6-DOF PLANT &amp; DISTURBANCE SPEC</span>
                  </span>
                  <span className="text-[#00f0ff]">[RK4 // Δt=0.05s]</span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 border border-[#00f0ff]/35 bg-[#090c12] shadow-[0_0_12px_rgba(0,240,255,0.08)]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      ORBITAL REGIME
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-[#00f0ff]">
                      550 km SSO LEO
                    </div>
                  </div>
                  <div className="p-3 border border-[#f59e0b]/40 bg-[#090c12] shadow-[0_0_12px_rgba(245,158,11,0.08)]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      ACTUATOR PLANT
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-[#f59e0b]">
                      3-Axis RW + MTQ
                    </div>
                  </div>
                  <div className="p-3 border border-[#00f0ff]/35 bg-[#090c12] shadow-[0_0_12px_rgba(0,240,255,0.08)]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      RW TORQUE / MOM. CAP
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-[#00f0ff]">
                      5.0 mN·m / 3.14 mN·m·s
                    </div>
                  </div>
                  <div className="p-3 border border-emerald-500/35 bg-[#090c12] shadow-[0_0_12px_rgba(16,185,129,0.08)]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      RADIATION FAULT MODEL
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-emerald-400">
                      SEFI + Bit-Flip Flux
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-800/80 font-mono text-xs">
                  <div className="text-[11px] text-slate-400 uppercase">
                    DUAL-LAYER HYBRID CONTROLLER ARCHITECTURE
                  </div>
                  <div className="p-2.5 bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[#00f0ff] font-semibold">
                        LAYER 1 // CLASSICAL PID
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Asymptotic steady-state error elimination (0.11° median lock)
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300">
                      FINE LOCK
                    </span>
                  </div>
                  <div className="p-2.5 bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[#f59e0b] font-semibold">
                        LAYER 2 // MEMORYLESS DEEP RL (PPO)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Stateless nonlinear rate damping &amp; SEFI upset recovery
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] bg-amber-500/20 text-amber-300">
                      SAFE-MODE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Native HUD Telemetry Oscilloscope Plot (<TelemetryPlot />) */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[#00f0ff] uppercase tracking-wider">
                  INTERACTIVE FLIGHT TELEMETRY OSCILLOSCOPE // STEP-RESPONSE &amp; RECOVERY
                </span>
                <span className="text-slate-500">
                  HOVER PLOT TO INSPECT TIME-DOMAIN COORDINATES
                </span>
              </div>
              <TelemetryPlot inspectMode={inspectMode} />
            </div>

            {/* Embedded Simulation & Benchmark Graph PNG Panels */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 pb-3">
                <div>
                  <div className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
                    SIMULATION BENCHMARK ARTIFACTS // MANUSCRIPT FIGURES (N=1,400)
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Empirical Monte Carlo dispersion, SEFI recovery trajectories, and pointing
                    acquisition distributions rendered from the 6-DoF Python simulation suite.
                  </p>
                </div>

                {/* Dark-Field HUD Blending Toggle */}
                <button
                  type="button"
                  onClick={() => setDarkFieldFilter((prev) => !prev)}
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

              {/* 2-Column Primary Benchmark Figures (FIG 01 & FIG 02) + Full-Width FIG 03 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {BENCHMARK_FIGURES.slice(0, 2).map((fig) => (
                  <CadWireframeBox
                    key={fig.id}
                    sysTag={fig.sysTag}
                    coordTag={fig.coordTag}
                    inspectMode={inspectMode}
                    accent="cyan"
                    className="p-4 sm:p-5 bg-[#060709] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Monospace Graph Caption Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-800/90 pb-2.5">
                        <div>
                          <div className="font-mono text-xs font-bold text-[#00f0ff] tracking-wide">
                            {fig.captionHeader}
                          </div>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            {fig.subtitle}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedFigure(fig)}
                          className="p-1.5 border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-colors cursor-pointer shrink-0"
                          title="Expand figure to full screen"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Technical Image Frame with CAD Midpoint Ticks & Dark-Field Blending */}
                      <HudFigureFrame
                        src={fig.src}
                        alt={fig.captionHeader}
                        darkFieldFilter={darkFieldFilter}
                        maxHeightClass="max-h-[340px]"
                        onClick={() => setExpandedFigure(fig)}
                      />
                    </div>

                    {/* Footer Metric Tags */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                      <div className="flex flex-wrap gap-1.5">
                        {fig.metrics.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 bg-cyan-950/30 border border-cyan-500/30 text-cyan-300"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      <span className="text-slate-500">CLICK TO EXPAND</span>
                    </div>
                  </CadWireframeBox>
                ))}
              </div>

              {/* FIG 03: Pointing Acquisition & Error Distribution */}
              {BENCHMARK_FIGURES.slice(2).map((fig) => (
                <CadWireframeBox
                  key={fig.id}
                  sysTag={fig.sysTag}
                  coordTag={fig.coordTag}
                  inspectMode={inspectMode}
                  accent="cyan"
                  className="p-4 sm:p-5 bg-[#060709]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-4 space-y-3">
                      <div className="font-mono text-xs font-bold text-[#00f0ff] tracking-wide">
                        {fig.captionHeader}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {fig.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] pt-1">
                        {fig.metrics.map((m) => (
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
                          onClick={() => setExpandedFigure(fig)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff] font-mono text-[11px] transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>[INSPECT FULL-RES DISTRIBUTION]</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-8">
                      <HudFigureFrame
                        src={fig.src}
                        alt={fig.captionHeader}
                        darkFieldFilter={darkFieldFilter}
                        maxHeightClass="max-h-[260px]"
                        onClick={() => setExpandedFigure(fig)}
                      />
                    </div>
                  </div>
                </CadWireframeBox>
              ))}
            </div>
          </CadWireframeBox>

          {/* 2. Featured Space Astrometry & Full-Stack Pipeline: ShroudX (NASA Space Apps 2026) */}
          <ShroudXShowcase
            inspectMode={inspectMode}
            darkFieldFilter={darkFieldFilter}
            onToggleDarkField={() => setDarkFieldFilter((prev) => !prev)}
            onExpandFigure={setExpandedFigure}
          />

          {/* 3–6. Secondary Systems & Engineering Experience Grid */}
          <div
            id="engineering"
            className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
          >
            {SECONDARY_PROJECTS.map((proj) => (
              <CadWireframeBox
                key={proj.id}
                sysTag={proj.sysTag}
                coordTag={proj.coordTag}
                inspectMode={inspectMode}
                accent={proj.accent}
                className="p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header: Title + High-Contrast Monospace Telemetry Readouts */}
                  <div className="border-b border-slate-800/90 pb-4 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        {proj.subtitle}
                      </p>
                    </div>

                    {/* Top Metric Badges (Faint Glowing Cyan / Amber Borders) */}
                    <MetricBadgeStrip badges={proj.metricBadges} compact />
                  </div>

                  {/* Quantitative Telemetry Bullets */}
                  <TelemetryBulletList
                    items={proj.telemetryBullets}
                    accent={proj.accent}
                    compact
                  />

                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] pt-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#060709] border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>STATUS: TELEMETRY VERIFIED // FIELD DEPLOYED</span>
                  <span className="text-cyan-400">{proj.sysTag}</span>
                </div>
              </CadWireframeBox>
            ))}
          </div>
        </section>

        {/* Academic & Leadership Section (Education, Rigorous Coursework & Languages) */}
        <section id="education" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>SECTION 02 // EDUCATION, RIGOROUS COURSEWORK &amp; LEADERSHIP</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Education, Core Engineering Coursework &amp; Cohort Leadership
              </h2>
            </div>
            <div className="font-mono text-xs text-slate-400">
              RANKING // [QS EUROPE: #124] // [NATIONAL RANK: #1 IN TURKEY]
            </div>
          </div>

          <CadWireframeBox
            sysTag="[EDU.METU.01 // B.SC.AERO]"
            coordTag="QS EUROPE: #124 // RANK: #1 TR"
            inspectMode={inspectMode}
            accent="cyan"
            className="p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Institution & Rigorous Technical Coursework Matrix */}
              <div className="lg:col-span-7 space-y-5">
                {/* Rankings HUD Badges in Education Card Header */}
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                  <span className="px-3 py-1.5 bg-[#00f0ff]/12 border border-[#00f0ff]/60 text-[#00f0ff] font-semibold tracking-wider shadow-[0_0_14px_rgba(0,240,255,0.22),inset_0_0_8px_rgba(0,240,255,0.08)]">
                    [QS EUROPE: #124]
                  </span>
                  <span className="px-3 py-1.5 bg-[#f59e0b]/12 border border-[#f59e0b]/60 text-[#f59e0b] font-semibold tracking-wider shadow-[0_0_14px_rgba(245,158,11,0.22),inset_0_0_8px_rgba(245,158,11,0.08)]">
                    [NATIONAL RANK: #1 IN TURKEY]
                  </span>
                  <span className="px-2.5 py-1 bg-cyan-950/30 border border-cyan-500/40 text-cyan-300 text-[11px]">
                    [100% ENGLISH-MEDIUM CURRICULUM]
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Middle East Technical University (ODTÜ), Department of Aerospace Engineering
                  </h3>
                  <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300">
                    B.Sc. in Aerospace Engineering — Ankara, Turkey (2024–Present)
                  </p>
                </div>

                {/* Rigorous Completed Coursework Grid */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-[11px]">
                    <span className="text-[#00f0ff] uppercase tracking-wider font-semibold">
                      SELECTED RIGOROUS ENGINEERING &amp; MATHEMATICS COURSEWORK
                    </span>
                    <span className="text-slate-400">[COMPLETED AT METU]</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {RIGOROUS_COURSES.map((course) => (
                      <div
                        key={course.code}
                        className={`p-3 bg-[#060709] border transition-colors ${
                          course.highlight
                            ? 'border-cyan-500/40 hover:border-[#00f0ff]'
                            : 'border-slate-800/90 hover:border-cyan-500/35'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono">
                          <span
                            className={`text-xs font-bold ${
                              course.highlight ? 'text-[#00f0ff]' : 'text-cyan-300'
                            }`}
                          >
                            [{course.code}]
                          </span>
                          <span className="text-[10px] text-slate-500 truncate">
                            {course.domain}
                          </span>
                        </div>
                        <div className="mt-1 text-xs sm:text-sm font-medium text-slate-200">
                          {course.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Leadership & Spoken Languages Readout */}
              <div className="lg:col-span-5 space-y-5 font-mono text-xs">
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>LEADERSHIP &amp; COHORT SCALE</span>
                    <span className="text-[#00f0ff]">2024–2026</span>
                  </div>

                  <div className="p-3.5 bg-[#060709] border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.08)]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#00f0ff] font-semibold">
                        &gt; COHORT REPRESENTATIVE
                      </span>
                      <span className="px-2 py-0.5 bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] text-[10px]">
                        [2024–2025]
                      </span>
                    </div>
                    <div className="mt-1.5 text-slate-300 text-xs font-sans leading-relaxed">
                      Elected Representative of the 1st-Year Aerospace Engineering Cohort, acting as the primary academic liaison between students and department faculty.
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#060709] border border-[#f59e0b]/40 shadow-[0_0_12px_rgba(245,158,11,0.08)]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#f59e0b] font-semibold">
                        &gt; LEAD COORDINATOR // INTL. INTEGRATION
                      </span>
                      <span className="px-2 py-0.5 bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-[10px]">
                        [2025–2026]
                      </span>
                    </div>
                    <div className="mt-1.5 text-slate-300 text-xs font-sans leading-relaxed">
                      Lead Coordinator directing onboarding logistics and cross-cultural integration for incoming international engineering students.
                    </div>
                  </div>
                </div>

                {/* Compact Spoken Languages Readout */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>SPOKEN LANGUAGES // MULTICULTURAL COMM.</span>
                    <span className="text-emerald-400">[4 LANGUAGES]</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SPOKEN_LANGUAGES.map((item) => (
                      <div
                        key={item.language}
                        className="p-2.5 bg-[#060709] border border-slate-800/90 hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-xs font-bold text-white">
                            {item.language}
                          </span>
                          <span className="px-1.5 py-0.5 bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-[#00f0ff]">
                            {item.level}
                          </span>
                        </div>
                        <div className="mt-1 text-[11px] text-slate-400 font-sans">
                          {item.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CadWireframeBox>
        </section>

        {/* C. Hardware, Controls & Compute Grid */}
        <section id="stack" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>SECTION 03 // HARDWARE, CONTROLS &amp; COMPUTE GRID</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Hardware, Controls &amp; Compute Grid
              </h2>
            </div>
            <div className="font-mono text-xs text-slate-400">
              SYS.DIAGNOSTIC // ALL SUBSYSTEMS NOMINAL
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {HARDWARE_COMPUTE_GRID.map((group) => {
              const IconComponent = group.icon;
              return (
                <CadWireframeBox
                  key={group.sysTag}
                  sysTag={group.sysTag}
                  coordTag={group.coordTag}
                  inspectMode={inspectMode}
                  className="p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2.5 font-mono">
                        <IconComponent className="w-4 h-4 text-[#00f0ff]" />
                        <h3 className="font-bold text-white text-sm tracking-wider">
                          {group.category}
                        </h3>
                      </div>
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                      {group.badges.map((badge) => (
                        <div
                          key={badge.name}
                          className="px-3 py-2 bg-[#060709] border border-slate-800/90 hover:border-cyan-500/40 flex items-center justify-between gap-2 transition-colors font-mono"
                        >
                          <span className="text-xs font-medium text-slate-200">
                            {badge.name}
                          </span>
                          <span className="text-[10px] text-cyan-400/80 shrink-0">
                            [{badge.code}]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/70 flex items-center justify-between font-mono text-[10px] text-slate-500">
                    <span>TELEMETRY: LOCK</span>
                    <span className="text-emerald-400">ONLINE</span>
                  </div>
                </CadWireframeBox>
              );
            })}
          </div>
        </section>

        {/* E. Footer */}
        <footer id="contact" className="scroll-mt-24 pt-4">
          <CadWireframeBox
            sysTag="[SYS.COMM.07 // TERMINAL.FOOTER]"
            coordTag="UPLINK // ANKARA, TR"
            inspectMode={inspectMode}
            accent="cyan"
            className="p-6 sm:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Minimal Terminal Line */}
              <div className="space-y-2">
                <div className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">
                  DIRECT INSTITUTIONAL UPLINK
                </div>
                <div className="p-3.5 bg-[#060709] border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 flex flex-wrap items-center gap-3">
                  <span>
                    &gt; luka.buachidze@metu.edu.tr // METU Aerospace Engineering // Ankara, TR
                  </span>
                  <span className="inline-block w-2 h-4 bg-[#00f0ff] animate-pulse" />
                </div>
              </div>

              {/* Actions & External Links (Email, GitHub, LinkedIn ONLY) */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2.5 bg-[#060709] border border-slate-700 hover:border-[#00f0ff] text-slate-300 hover:text-[#00f0ff] transition-colors cursor-pointer"
                >
                  {copiedEmail ? '[EMAIL COPIED]' : '[COPY EMAIL]'}
                </button>

                <a
                  href="mailto:luka.buachidze@metu.edu.tr"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#00f0ff]/15 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-semibold transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>[MAILTO]</span>
                </a>

                <a
                  href="https://github.com/LukaBua"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#060709] border border-slate-800 hover:border-[#00f0ff] text-slate-200 hover:text-[#00f0ff] transition-all"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>github.com/LukaBua</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://linkedin.com/in/lukabuachidze"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#060709] border border-slate-800 hover:border-[#00f0ff] text-slate-200 hover:text-[#00f0ff] transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>linkedin.com/in/lukabuachidze</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </CadWireframeBox>
        </footer>
      </main>

      {/* Lightbox Modal for Full-Resolution Figure Inspection */}
      {expandedFigure && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setExpandedFigure(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#060709] border border-[#00f0ff] p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3 mb-4 font-mono">
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#00f0ff]">
                  {expandedFigure.captionHeader}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {expandedFigure.subtitle}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDarkFieldFilter((p) => !p)}
                  className="px-2.5 py-1 border border-cyan-500/40 text-[11px] text-cyan-300 hover:border-[#00f0ff] cursor-pointer"
                >
                  {darkFieldFilter ? '[SWITCH TO RAW]' : '[SWITCH TO DARK-FIELD]'}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedFigure(null)}
                  className="p-1.5 border border-slate-700 text-slate-300 hover:border-[#00f0ff] hover:text-[#00f0ff] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className={`p-3 border border-slate-800 ${
                darkFieldFilter ? 'bg-[#060709]' : 'bg-white'
              }`}
            >
              <img
                src={expandedFigure.src}
                alt={expandedFigure.captionHeader}
                className={`w-full h-auto max-h-[75vh] object-contain mx-auto ${
                  darkFieldFilter ? 'hud-figure-darkfield' : ''
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* D. Bottom Fixed HUD Dock (<TelemetryDock />) */}
      <TelemetryDock
        fps={telemetry.fps}
        agentCount={telemetry.agents}
        inspectMode={inspectMode}
        onToggleInspect={() => setInspectMode((prev) => !prev)}
        onPurgeAgents={() => setPurgeSignal((prev) => prev + 1)}
      />
    </div>
  );
}

export default App;
