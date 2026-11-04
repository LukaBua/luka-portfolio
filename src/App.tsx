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
import { TelemetryDock } from './components/TelemetryDock';
import { TelemetryPlot } from './components/TelemetryPlot';

import fig1MonteCarlo from './assets/figures/fig1_monte_carlo_sweeps.png';
import fig2SefiRecovery from './assets/figures/fig2_sefi_recovery_trajectory.png';
import fig3ErrorDist from './assets/figures/fig3_error_distributions.png';

interface ProjectItem {
  id: string;
  sysTag: string;
  coordTag: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  highlights: string[];
  accent?: 'cyan' | 'amber';
}

interface BenchmarkFigure {
  id: string;
  sysTag: string;
  coordTag: string;
  captionHeader: string;
  subtitle: string;
  src: string;
  metrics: string[];
}

const BENCHMARK_FIGURES: BenchmarkFigure[] = [
  {
    id: 'fig-01',
    sysTag: '[TELEM.FIG.01 // MC.SWEEP]',
    coordTag: 'SCALE: 0x -> 1000x // N=1,400',
    captionHeader: 'FIG 01 // MONTE CARLO ATTITUDE DISPERSION (N=1400)',
    subtitle:
      'Settling time (s), mean pointing error (deg), and reaction wheel control effort (N·m·s) across logarithmic radiation intensity scales (0 to 10³).',
    src: fig1MonteCarlo,
    metrics: ['N=1,400 FLIGHTS', '35.07° BOUND @ 10³x', '-46.8% MEAN ERR'],
  },
  {
    id: 'fig-02',
    sysTag: '[TELEM.FIG.02 // SEFI.TRAJ]',
    coordTag: 'T=0..20s // RW.TORQUE',
    captionHeader: 'FIG 02 // PPO VS CLASSICAL PID RECOVERY UNDER 1000x SOLAR STORM',
    subtitle:
      '4-channel time-domain flight profile: attitude error (deg), body angular rate (deg/s), motor torque vs. 5.0 mN·m stall limit, and wheel momentum (mN·m·s).',
    src: fig2SefiRecovery,
    metrics: ['SEFI RECOVERY', '5.0 mN·m STALL CAP', '3.14 mN·m·s MOM.'],
  },
  {
    id: 'fig-03',
    sysTag: '[TELEM.FIG.03 // ACQ.DIST]',
    coordTag: 'LOG10.ERR // <1.0° LOCK',
    captionHeader: 'FIG 03 // POINTING ACQUISITION & ERROR DISTRIBUTION (0x–1000x)',
    subtitle:
      'Sub-degree (< 1.0°) science pointing acquisition success rate [%] and log-scale median final attitude error (deg) comparing Classical PID and Deep RL (PPO).',
    src: fig3ErrorDist,
    metrics: ['100% LOCK (0x–5x)', '0.11° MEDIAN ERR', 'DUAL-LAYER HANDOFF'],
  },
];

const SECONDARY_PROJECTS: ProjectItem[] = [
  {
    id: 'mit-tot-robot',
    sysTag: '[SYS.ROBO.02 // MIT.TOT]',
    coordTag: 'EVAL: TOP IN COHORT // CV.OPT',
    title: 'Autonomous Obstacle-Avoiding & Object-Tracking Robot (MIT ToT Program)',
    subtitle: 'MIT PhD-Instructed Autonomous Robotics & Optical Sensing System',
    tags: ['[MIT ToT Program]', '[Optical Sensing]', '[Color Recognition]', '[Autonomous Nav]'],
    description:
      'Real-time optical sensing, color recognition arrays, and autonomous navigation machine developed under direct instruction from MIT PhD instructors. Top evaluation score in cohort.',
    highlights: [
      'Integrated calibrated optical sensing and real-time color recognition arrays for closed-loop target acquisition and tracking.',
      'Architected low-latency autonomous obstacle avoidance state machines operating without external localization infrastructure.',
      'Awarded top overall technical evaluation score in the cohort under direct review by MIT PhD instructors.',
    ],
    accent: 'cyan',
  },
  {
    id: 'cyber-infinity',
    sysTag: '[SYS.NAV.03 // CYBER.INF]',
    coordTag: 'GRANT: $2,000+ // CEO',
    title: 'Commercial Autonomous Service Robot (Cyber Infinity — Co-Founder & CEO)',
    subtitle: 'End-to-End Mechanical CAD, Embedded Control Loops & Commercial Deployment',
    tags: ['[Co-Founder & CEO]', '[SolidWorks]', '[Embedded Control]', '[Autonomous Robotics]'],
    description:
      'Complete end-to-end hardware-software lifecycle: SolidWorks mechanical design, embedded control loops, autonomous obstacle avoidance, $2,000+ grant funding, real commercial deployment.',
    highlights: [
      'Directed full hardware-software lifecycle from multi-assembly SolidWorks mechanical CAD to custom embedded motor control loops.',
      'Secured $2,000+ in competitive innovation grant funding and deployed autonomous obstacle-avoiding units in live commercial venues.',
    ],
    accent: 'amber',
  },
  {
    id: 'bank-of-georgia',
    sysTag: '[SYS.PROD.04 // BOG.AUTO]',
    coordTag: 'ENV: PRODUCTION // PIPELINE',
    title: 'Digital Banking Production Automation (Bank of Georgia)',
    subtitle: 'High-Reliability Backend Image Transformation & Optimization Infrastructure',
    tags: ['[Backend Automation]', '[Image Pipelines]', '[Production Infra]', '[CI/CD]'],
    description:
      'Backend automated image transformation and optimization pipelines pushed directly to production infrastructure.',
    highlights: [
      'Engineered deterministic image cropping, scaling, and optimization micro-pipelines integrated into production banking backends.',
      'Delivered automated media processing workflows meeting strict enterprise reliability and latency requirements.',
    ],
    accent: 'cyan',
  },
  {
    id: 'gita-intern',
    sysTag: '[SYS.FAB.05 // GITA.LAB]',
    coordTag: 'MENTORED: 25+ ENGS // CNC.PCB',
    title: 'Advanced Fabrication & Prototyping (GITA Intern)',
    subtitle: 'Industrial CNC Machining, Laser Cutting & Mechatronic PCB Prototyping',
    tags: ['[CNC Machining]', '[Laser Cutting]', '[PCB Prototyping]', '[Engineering Mentorship]'],
    description:
      'Industrial CNC machining, laser cutting, PCB prototyping for autonomous robotic and medical devices; mentored 25+ student engineers.',
    highlights: [
      'Executed precision CNC machining, structural laser cutting, and custom PCB prototyping for autonomous robotics and medical hardware.',
      'Mentored 25+ student engineers on CAD-to-CAM fabrication workflows, hardware debugging, and rapid prototyping.',
    ],
    accent: 'cyan',
  },
];

const HARDWARE_COMPUTE_GRID = [
  {
    sysTag: '[GRID.MOD.01 // AERO.CTRL]',
    coordTag: 'GNC // 6-DOF',
    category: 'AEROSPACE & CONTROL',
    icon: Orbit,
    badges: [
      { name: '6-DoF Simulation', code: 'RK4 // NUMERICAL' },
      { name: 'CubeSat ADCS', code: '3-AXIS RW + MTQ' },
      { name: 'PID Controllers', code: 'SUB-DEGREE LOCK' },
      { name: 'Deep RL (PPO)', code: 'MEMORYLESS SAFE-MODE' },
      { name: 'Monte Carlo Benchmarking', code: 'N=1,400 VALIDATED' },
      { name: 'Orbit Integration (RK4)', code: 'LEO DISTURBANCE SIM' },
    ],
  },
  {
    sysTag: '[GRID.MOD.02 // EMBED.HW]',
    coordTag: 'MCU // FAB',
    category: 'EMBEDDED & HARDWARE',
    icon: Cpu,
    badges: [
      { name: 'Embedded Systems', code: 'BARE-METAL // RTOS' },
      { name: 'ARM Cortex-M', code: '5.3 KB INT8 POLICY' },
      { name: 'PCB Design', code: 'SCHEMATIC & MILLING' },
      { name: 'CNC Machining', code: 'MULTI-AXIS CAM' },
      { name: 'Laser Cutting', code: 'STRUCTURAL FAB' },
      { name: 'Motor Controllers', code: 'CLOSED-LOOP ACTUATION' },
    ],
  },
  {
    sysTag: '[GRID.MOD.03 // LANG.TOOLS]',
    coordTag: 'DEV // CAD',
    category: 'LANGUAGES & TOOLS',
    icon: Terminal,
    badges: [
      { name: 'Python', code: 'RL / NUMPY / GYMNASIUM' },
      { name: 'C++', code: 'FLIGHT & EMBEDDED SW' },
      { name: 'Arduino', code: 'RAPID MECHATRONICS' },
      { name: 'React', code: 'HUD TELEMETRY / TS' },
      { name: 'Git', code: 'VERSION CONTROL' },
      { name: 'SolidWorks', code: '3D MECHANICAL CAD' },
      { name: 'Fusion 360', code: 'CAD / CAM TOOLPATHS' },
      { name: 'Arch Linux', code: 'PRIMARY WORKSTATION' },
      { name: 'VS Code', code: 'DEV ENVIRONMENT' },
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
              { label: '[ADCS Research]', href: '#research' },
              { label: '[Systems]', href: '#engineering' },
              { label: '[Education]', href: '#education' },
              { label: '[Compute Grid]', href: '#stack' },
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
                Radiation-Tolerant CubeSat Attitude Control &amp; Autonomous Systems
              </h2>
            </div>
            <div className="font-mono text-xs text-slate-400">
              TOGGLE <span className="text-[#00f0ff]">[INSPECT MODE]</span> IN DOCK FOR CAD
              WIREFRAMES
            </div>
          </div>

          {/* 1. Flagship Research Card: Radiation-Tolerant CubeSat Attitude Control (ADCS) */}
          <CadWireframeBox
            sysTag="[SYS.ADCS.01 // 6-DOF.SIM]"
            coordTag="MC: N=1,400 // CORTEX-M: 5.3KB"
            inspectMode={inspectMode}
            accent="cyan"
            className="p-6 sm:p-8 space-y-8"
          >
            {/* Top Overview & Architecture Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#00f0ff]/15 border border-[#00f0ff]/50 font-mono text-[11px] text-[#00f0ff] uppercase">
                    FLAGSHIP RESEARCH // SATELLITE ADCS
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/40 font-mono text-[11px] text-amber-300 uppercase">
                    1000x SOLAR STORM SAFE-MODE
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Radiation-Tolerant CubeSat Attitude Control (ADCS)
                  </h3>
                  <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300/90">
                    Dual-Layer Hybrid Controller: Classical PID + Memoryless Deep RL (PPO)
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {[
                    '[6-DoF Simulation]',
                    '[CubeSat ADCS]',
                    '[Deep RL / PPO]',
                    '[Classical PID]',
                    '[ARM Cortex-M // 5.3 KB]',
                    '[Monte Carlo N=1,400]',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#060709] border border-slate-700/80 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Dual-layer hybrid flight control architecture combining{' '}
                  <span className="text-white font-medium">
                    classical PID for sub-degree fine science pointing
                  </span>{' '}
                  and{' '}
                  <span className="text-white font-medium">
                    memoryless Deep Reinforcement Learning (PPO)
                  </span>{' '}
                  for autonomous extreme-radiation safe-mode recovery. Validated across a
                  1,400-flight Monte Carlo benchmark with Single-Event Functional Interrupts
                  (SEFIs), sensor bit-flips, and 1000x solar storm disturbance torques.
                </p>

                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-[#00f0ff] mt-0.5">&gt;</span>
                    <span>
                      <strong>1,400-Flight Monte Carlo Validation:</strong> Swept across 7
                      radiation intensity scales (0x nominal LEO up to 1000x extreme solar
                      proton events) using custom RK4 6-DoF rigid-body dynamics.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-[#00f0ff] mt-0.5">&gt;</span>
                    <span>
                      <strong>35.07° Bounded Error under 1000x Solar Storm:</strong> Memoryless
                      PPO eliminates stateful integral windup during radiation-induced register
                      upsets, cutting mean pointing dispersion by 46.8% compared to PID.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-mono text-[#00f0ff] mt-0.5">&gt;</span>
                    <span>
                      <strong>5.3 KB Quantized ARM Cortex-M Footprint &amp; -30% Effort:</strong>{' '}
                      Deployed ultra-compact neural policy weights suitable for radiation-hardened
                      microcontrollers while reducing reaction wheel actuator effort by 30%.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Column: Telemetry Readout & Dual-Layer Switching */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#060709] border border-slate-800/90 p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
                    <span>KEY FLIGHT BENCHMARK TELEMETRY</span>
                  </span>
                  <span className="text-slate-500">MC N=1,400</span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 border border-slate-800/90 bg-[#090c12]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      MONTE CARLO VALIDATION
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-bold text-[#00f0ff]">
                      1,400 Flights
                    </div>
                  </div>
                  <div className="p-3 border border-slate-800/90 bg-[#090c12]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      1000x SOLAR STORM
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-bold text-[#f59e0b]">
                      35.07° Bounded
                    </div>
                  </div>
                  <div className="p-3 border border-slate-800/90 bg-[#090c12]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      CORTEX-M FOOTPRINT
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-bold text-[#00f0ff]">
                      5.3 KB Quantized
                    </div>
                  </div>
                  <div className="p-3 border border-slate-800/90 bg-[#090c12]">
                    <div className="text-[10px] text-slate-400 uppercase">
                      ACTUATOR EFFORT
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-bold text-emerald-400">
                      -30% Reduction
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
                        Sub-Degree Fine Science Pointing (0.11° Median Error)
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
                        Autonomous Extreme-Radiation Safe-Mode Recovery
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
                      <div
                        onClick={() => setExpandedFigure(fig)}
                        className={`relative overflow-hidden border border-cyan-500/25 p-2 transition-all cursor-zoom-in ${
                          darkFieldFilter ? 'bg-[#060709]' : 'bg-white'
                        }`}
                      >
                        {/* CAD Midpoint Tick Marks on Image Frame */}
                        <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00f0ff]/70 z-10" />
                        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00f0ff]/70 z-10" />
                        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]/70 z-10" />
                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]/70 z-10" />

                        <img
                          src={fig.src}
                          alt={fig.captionHeader}
                          loading="lazy"
                          className={`w-full h-auto object-contain max-h-[340px] mx-auto transition-all duration-300 ${
                            darkFieldFilter ? 'hud-figure-darkfield' : ''
                          }`}
                        />
                      </div>
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
                      <div
                        onClick={() => setExpandedFigure(fig)}
                        className={`relative overflow-hidden border border-cyan-500/25 p-2 transition-all cursor-zoom-in ${
                          darkFieldFilter ? 'bg-[#060709]' : 'bg-white'
                        }`}
                      >
                        <span className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00f0ff]/70 z-10" />
                        <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00f0ff]/70 z-10" />
                        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]/70 z-10" />
                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#00f0ff]/70 z-10" />

                        <img
                          src={fig.src}
                          alt={fig.captionHeader}
                          loading="lazy"
                          className={`w-full h-auto object-contain max-h-[260px] mx-auto transition-all duration-300 ${
                            darkFieldFilter ? 'hud-figure-darkfield' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </CadWireframeBox>
              ))}
            </div>
          </CadWireframeBox>

          {/* 2–5. Secondary Systems & Engineering Experience Grid */}
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
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {proj.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#060709] border border-slate-800 text-cyan-300/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400 pt-1">
                    {proj.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-[#00f0ff]">&gt;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>STATUS: VERIFIED // FIELD DEPLOYED</span>
                  <span className="text-cyan-400">{proj.sysTag}</span>
                </div>
              </CadWireframeBox>
            ))}
          </div>
        </section>

        {/* Academic & Leadership Section (Strictly Scoped to METU / ODTÜ B.Sc. Aerospace Engineering) */}
        <section id="education" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>SECTION 02 // ACADEMIC TRAINING &amp; LEADERSHIP</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Education &amp; University Leadership
              </h2>
            </div>
            <div className="font-mono text-xs text-slate-400">
              INSTITUTION // MIDDLE EAST TECHNICAL UNIVERSITY (ODTÜ)
            </div>
          </div>

          <CadWireframeBox
            sysTag="[EDU.METU.01 // B.SC.AERO]"
            coordTag="ANKARA, TR // ODTÜ"
            inspectMode={inspectMode}
            accent="cyan"
            className="p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/40 font-mono text-[11px] text-[#00f0ff]">
                  <span>UNDERGRADUATE DEGREE // ACTIVE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  B.Sc. in Aerospace Engineering
                </h3>
                <p className="font-mono text-xs sm:text-sm text-cyan-300">
                  Middle East Technical University (ODTÜ) — Ankara, Turkey
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Focusing on spacecraft attitude dynamics, orbital mechanics, numerical
                  simulation, and autonomous flight control architectures.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 font-mono text-xs">
                <div className="p-3.5 bg-[#060709] border border-slate-800/90">
                  <div className="text-[#00f0ff] font-semibold">
                    &gt; 1ST-YEAR STUDENT REPRESENTATIVE
                  </div>
                  <div className="mt-1 text-slate-400 text-[11px] font-sans">
                    Elected cohort liaison coordinating academic feedback and departmental
                    student representation within METU Aerospace Engineering.
                  </div>
                </div>
                <div className="p-3.5 bg-[#060709] border border-slate-800/90">
                  <div className="text-[#f59e0b] font-semibold">
                    &gt; INTERNATIONAL STUDENT ORIENTATION ORGANIZER
                  </div>
                  <div className="mt-1 text-slate-400 text-[11px] font-sans">
                    Organized campus onboarding, technical briefings, and cross-cultural
                    integration programs for incoming international engineering students at ODTÜ.
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
            sysTag="[SYS.COMM.06 // TERMINAL.FOOTER]"
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
                  href="https://github.com/lukabuachidze"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#060709] border border-slate-800 hover:border-[#00f0ff] text-slate-200 hover:text-[#00f0ff] transition-all"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>GitHub</span>
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
