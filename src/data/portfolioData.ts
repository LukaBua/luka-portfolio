import fig1MonteCarlo from '../assets/figures/fig1_monte_carlo_sweeps.png';
import fig2SefiRecovery from '../assets/figures/fig2_sefi_recovery_trajectory.png';
import fig3ErrorDist from '../assets/figures/fig3_error_distributions.png';
import shroudxBarnardBlink from '../assets/figures/shroudx_barnard_blink.gif';
import shroudxBarnardDiff from '../assets/figures/shroudx_barnard_diff.png';
import shroudxFlickerScatter from '../assets/figures/shroudx_flicker_scatter.png';
import mitTotCameraFront from '../assets/projects/mit_tot_camera_front.jpg';
import mitTotDebugging from '../assets/projects/mit_tot_debugging.jpg';
import mitTotRoverTrack from '../assets/projects/mit_tot_rover_track.jpg';
import type {
  ExperienceEntry,
  LearningEntry,
  ProjectPageData,
  SkillEntry,
  SpokenLanguageEntry,
} from '../types';

export const PROFILE = {
  name: 'Luka Buachidze',
  degree: 'B.Sc. Aerospace Engineering',
  institution: 'Middle East Technical University (METU / ODTÜ)',
  studyPeriod: '2024 – Present · Ankara, Turkey',
  locations: 'Ankara, Turkey (Current) · Tbilisi, Georgia',
  email: 'luka.buachidze@metu.edu.tr',
  githubUrl: 'https://github.com/LukaBua',
  githubHandle: 'github.com/LukaBua',
  linkedinUrl: 'https://linkedin.com/in/lukabuachidze',
  linkedinHandle: 'linkedin.com/in/lukabuachidze',
  targetRoles: 'EU Aerospace Internships · Spacecraft Systems & ADCS / Thermal / Flight SW',
  originStory:
    'I got into engineering by building physical hardware early—prototyping robots and medical concepts at GITA FabLab and earning #1 in the MIT ToT robotics program—before moving into Aerospace Engineering at METU to tackle systems where physics, embedded code, and tight orbital margins meet.',
  currentRoleNote:
    'Starting inside the METUCube student organization in the Thermal Subsystem, contributing to a 3U CubeSat build scheduled for completion within the next 6 months.',
  outsideProjectsNote:
    'Outside university coursework: Cyber Infinity (commercial promoter robot startup), Radiation-Tolerant CubeSat ADCS research, and ShroudX (NASA Space Apps 2026).',
};

export const SKILLS_LIST: SkillEntry[] = [
  // Coding
  {
    name: 'Python',
    icon: 'python',
    category: 'Coding',
    level: 'Advanced',
    evidence: '1,400-run 6-DoF ADCS sim, ShroudX FastAPI/FITS pipeline & Bank of Georgia ad-image prototype',
  },
  {
    name: 'C / C++',
    icon: 'cpp',
    category: 'Coding',
    level: 'Intermediate',
    evidence: '5.3 KB INT8 ARM Cortex-M ADCS inference header & Cyber Infinity motor-drive firmware',
  },
  {
    name: 'TypeScript & React',
    icon: 'typescript',
    category: 'Coding',
    level: 'Intermediate',
    evidence: 'ShroudX interactive sky-motion explorer UI & this 9-page Three.js/Vite portfolio',
  },
  {
    name: 'LaTeX',
    icon: 'latex',
    category: 'Coding',
    level: 'Intermediate',
    evidence: 'AIAA 2-column ADCS manuscript & AE 305 technical engineering coursework reports',
  },
  // CAD & Fabrication
  {
    name: 'SolidWorks',
    icon: 'solidworks',
    category: 'CAD & Fabrication',
    level: 'Intermediate',
    evidence: 'Full-chassis Cyber Infinity promoter robot assemblies & DFM reviews for 25+ GITA teams',
  },
  {
    name: 'Fusion 360',
    icon: 'fusion',
    category: 'CAD & Fabrication',
    level: 'Intermediate',
    evidence: '3-axis CNC CAM toolpaths & rapid-prototyped mechanical enclosures at GITA FabLab',
  },
  {
    name: 'CNC / Laser / PCB Fab',
    icon: 'cnc',
    category: 'CAD & Fabrication',
    level: 'Intermediate',
    evidence: '6 months operating industrial CNC mills, laser cutters & PCB printers (Jun–Nov 2023)',
  },
  // Simulation & Analysis
  {
    name: 'PyTorch & Deep RL (PPO)',
    icon: 'pytorch',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'Stateless CubeSat storm controller: 35.07° max error at 1000x flux & -30% effort',
  },
  {
    name: 'MATLAB',
    icon: 'matlab',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'ES 361 numerical solvers, ODE integration & aerospace performance calculations',
  },
  {
    name: 'Astropy / IRSA / WCS',
    icon: 'astropy',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: '32-bit FITS masking, TAN reprojection & Gaia DR3 proper-motion fitting (0.76σ match)',
  },
  {
    name: 'Excel',
    icon: 'excel',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'Component mass/power trade matrices & METUCube 3U thermal subsystem budgeting',
  },
  // Soft Skills
  {
    name: 'Team & Startup Leadership',
    icon: 'leadership',
    category: 'Soft Skills',
    level: 'Intermediate',
    evidence: 'Founded Cyber Infinity ($2,000+ grant), led 5-person ShroudX team & METU Cohort Rep',
  },
  {
    name: 'Mentoring & Tech Judging',
    icon: 'mentoring',
    category: 'Soft Skills',
    level: 'Intermediate',
    evidence: 'Mentored 25+ undergrads at GITA; NASA Space Apps Kaspi Judge (2022) & Citython Mentor (2023)',
  },
];

export const SPOKEN_LANGUAGES: SpokenLanguageEntry[] = [
  { language: 'Georgian', flag: 'ge', level: 'Native', evidence: 'Primary mother tongue' },
  {
    language: 'English',
    flag: 'gb',
    level: 'Fluent (C1–C2)',
    evidence: '100% English METU degree · AA in ENG 101 & 211',
  },
  { language: 'Russian', flag: 'ru', level: 'Fluent', evidence: 'Bilingual working communication' },
  {
    language: 'Turkish',
    flag: 'tr',
    level: 'Conversational',
    evidence: 'Daily living in Ankara · TURK 105',
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'cyber-infinity',
    logo: 'cyber-infinity',
    role: 'Founder & CEO',
    company: 'Cyber Infinity',
    dates: '2023 – Present',
    location: 'Tbilisi, Georgia',
    summary:
      'Founded a robotics venture developing AI-powered commercial promoter robots from blank-sheet CAD to live deployment.',
    bullets: [
      '$2,000+ non-dilutive grant funding secured and transitioned the physical robot into active commercial operation.',
      '100% end-to-end hardware lifecycle ownership: chassis CAD, drivetrain tolerances, embedded firmware & obstacle avoidance.',
    ],
    tools: ['SolidWorks', 'Embedded C/C++', 'Navigation & Motor Control'],
    growth: 'Expanded from solo CAD/firmware prototyping into grant fundraising, real-world logistics & commercial deployment.',
  },
  {
    id: 'bog',
    logo: 'bog',
    role: 'Digital Banking Backend Intern',
    company: 'Bank of Georgia',
    dates: 'Jul 2025 – Aug 2025',
    location: 'Tbilisi, Georgia',
    summary:
      'Built an automated ad-image cropping and rescaling prototype in Python whose logic engineering adopted into production in 1 month.',
    bullets: [
      '1-month cycle from business spec translation and rigorous test-case design to working Python demo.',
      'Presented the prototype to the team lead and backend engineers, who translated the codebase directly into their production stack.',
    ],
    tools: ['Python', 'Automated Image Processing', 'Technical Specs & Test Cases'],
    growth: 'Progressed from translating business requirements into specs to delivering a demo accepted for production translation.',
  },
  {
    id: 'gita',
    logo: 'gita',
    role: 'Engineering Intern',
    company: "Georgia's Innovation & Technology Agency (GITA)",
    dates: 'Jun 2023 – Nov 2023',
    location: 'Georgia (FabLab)',
    summary:
      'Fabricated multidisciplinary robotics and medical hardware prototypes while mentoring undergraduate engineering teams.',
    bullets: [
      '25+ undergraduate students mentored on rapid prototyping, 2D/3D CAD modeling & DFM tolerances.',
      '6 months operating industrial CNC machines, laser cutters & PCB motherboard printers for functional prototypes.',
    ],
    tools: ['Fusion 360', 'SolidWorks', '3-Axis CNC / Laser / PCB Milling'],
    growth: 'Grew from machine fabrication operator into primary mechanical-design and DFM mentor for 25+ student builders.',
  },
];

export const PROJECT_ADCS: ProjectPageData = {
  pageNumber: '05',
  sectionCode: 'PROJECT 01 // SPACECRAFT GNC',
  title: 'Radiation-Tolerant CubeSat Attitude Control (ADCS)',
  date: 'Oct 2026',
  roleLabel: 'Lead Simulation & Flight-Control Author (4-Author Manuscript)',
  metricsStrip: [
    { label: 'MONTE CARLO', value: '1,400 Flights' },
    { label: '1000x STORM CAP', value: '35.07° Max' },
    { label: 'MEAN ERR DELTA', value: '-46.8% vs PID' },
    { label: 'EMBEDDED SIZE', value: '5.3 KB INT8' },
    { label: 'RW EFFORT', value: '-30% Torque' },
  ],
  boxes: {
    problem: {
      headline: 'SEFI reboots cause classical PID windup in LEO',
      points: [
        'COTS CubeSat MCUs in 550 km SSO suffer ionizing radiation SEFIs and watchdog resets that wipe volatile state.',
        'PID integral windup after reboots drives reaction wheels past their 5.0 mN·m stall cap (151.26° worst-case PID loss at 1000x flux).',
      ],
    },
    approach: {
      headline: 'Dual-layer PID + memoryless INT8 PPO architecture',
      points: [
        'Built a 6-DoF SO(3) simulator (RK4 Δt=0.05 s) with gravity-gradient, drag, magnetic, SRP torques & a 6-state MEKF.',
        'Trained a stateless PPO agent (no hidden memory to corrupt) paired with an autonomous FSM: PID for fine lock, PPO for storm recovery.',
      ],
    },
    result: {
      headline: '4.3x smaller storm excursion & Cortex-M feasibility',
      points: [
        'Across 1,400 Monte Carlo flights (0x–1000x flux), PPO capped worst-case storm error at 35.07° and cut mean error by 46.8%.',
        'INT8 quantization shrunk weights from 21.0 KB to 5.3 KB (0.41 ms on Cortex-M7, 4.1% of 100 Hz budget) with -30% actuator effort.',
      ],
    },
    learnt: {
      headline: 'Attitude control cannot be validated in isolation',
      points: [
        'A real CubeSat runs OS/RTOS, RF comms, data acquisition & payload tasks concurrently on shared silicon.',
        'An OS-level SEU indirectly stalls attitude computation—future work must co-simulate RTOS/comms/data faults alongside ADCS.',
      ],
    },
  },
  media: [
    {
      id: 'adcs-sefi',
      title: 'FIG 02 // 1000x Solar Storm SEFI Recovery Trajectory',
      caption: '4-channel attitude error, angular rate, RW torque vs 5.0 mN·m stall cap & momentum.',
      src: fig2SefiRecovery,
      badge: '35.07° CAP',
      surface: 'light',
    },
    {
      id: 'adcs-mc',
      title: 'FIG 01 // Monte Carlo Sweep',
      caption: 'Settling time, mean error & effort (N=1,400).',
      src: fig1MonteCarlo,
      badge: 'N=1,400',
      surface: 'light',
    },
    {
      id: 'adcs-dist',
      title: 'FIG 03 // Acquisition Breakdown',
      caption: '<1.0° lock rate & median error vs flux.',
      src: fig3ErrorDist,
      badge: '-30% EFFORT',
      surface: 'light',
    },
  ],
};

export const PROJECT_SHROUDX: ProjectPageData = {
  pageNumber: '06',
  sectionCode: 'PROJECT 02 // ASTROMETRY PIPELINE',
  title: 'ShroudX — NASA SPHEREx Sky-Motion Viewer',
  date: 'Nov 2026',
  roleLabel: 'Team Lead (5-Member METU AEE/CENG NASA Space Apps Team)',
  metricsStrip: [
    { label: 'SPECTRAL BAND', value: '0.75–5.00 µm (6 Det)' },
    { label: 'DEMO CACHE', value: '18.10 MB / 227 FITS' },
    { label: 'EPS IND B PM', value: '4.61 ± 0.15 "/yr (0.76σ)' },
    { label: 'FASTAPI ROUTES', value: '9 Endpoints + GIF' },
  ],
  boxes: {
    problem: {
      headline: 'Turn raw SPHEREx cutouts into honest motion tools',
      points: [
        'SPHEREx images lack ZODI subtraction and set SOURCE bit 21 on good pixels—naive flags != 0 masking drops real stars.',
        'Needed an online tool converting RA/Dec or names into wavelength-matched Blink, Stack & Difference maps across revisits.',
      ],
    },
    approach: {
      headline: '32-bit flag decoding, TAN alignment & Gaia DR3 WLS fit',
      points: [
        'Built FastAPI + Astropy backend fetching IRSA SIA2/TAP .fits.gz cutouts, subtracting ZODI + 3σ sky & grouping <=0.10 µm windows.',
        'Reprojected frames onto North-up East-left TAN grids (6.15"/px) and ran WLS proper-motion/parallax fitting + Gaia DR3 cross-match.',
      ],
    },
    result: {
      headline: 'Working Stack/Diff pipeline & 0.76σ Gaia agreement',
      points: [
        'Validated eps Ind B proper motion at 4.6075 ± 0.1540 "/yr (0.76σ vs Gaia DR3 4.6842 "/yr) & 1.05% <=0.5d matched-λ stability.',
        'Shipped React 19 explorer, <10 MB animated GIF export & 100-trial toroidal blind mover search (movers.py).',
      ],
    },
    learnt: {
      headline: 'Compute & calibration limits shape scientific UX',
      points: [
        'Exposing explicit warnings (R Draconis 0/8 saturated epochs; RW Aurigae 5.06σ DISAGREE) preserved scientific integrity over forced fits.',
        'Learned to size server compute and pre-warm heavy WCS reprojections before live multi-user judging.',
      ],
    },
  },
  lostMarks: {
    title: 'WHERE I LOST MARKS // HACKATHON POST-MORTEM',
    points: [
      'Time & unfinished scope: couldn’t finish everything before deadline (movers.py stayed offline, not wired into UI).',
      'Color flicker penalty: residual chromatic scatter (8.47% ± 1.84% at w = 0.02 µm across 204 frames) remained unresolved and hurt our win.',
      'Server bottleneck (1 vCPU / 1 GB RAM): live website slowed sharply when multiple judges computed FITS stacks concurrently.',
    ],
  },
  media: [
    {
      id: 'shroudx-flicker',
      title: 'Stationary-Star Chromatic vs Temporal Scatter (204 Frames)',
      caption: '2.0 px aperture photometry across 5 isolated Gaia DR3 stars quantifying residual color flicker.',
      src: shroudxFlickerScatter,
      badge: 'FLICKER STUDY',
      surface: 'light',
    },
    {
      id: 'shroudx-diff',
      title: "Barnard's Star — Diff Mode",
      caption: 'Epoch B–A offset + hatched core (8.85±0.32 "/yr).',
      src: shroudxBarnardDiff,
      badge: 'DIFF PNG',
      surface: 'dark',
    },
    {
      id: 'shroudx-blink',
      title: "Barnard's Star — Blink GIF",
      caption: 'Animated Detector 2 sequence (2025–2026).',
      src: shroudxBarnardBlink,
      badge: 'BLINK GIF',
      surface: 'dark',
    },
  ],
  repoUrl: 'https://github.com/LukaBua/ShroudX',
  repoLabel: 'github.com/LukaBua/ShroudX',
};

export const PROJECT_MIT_TOT: ProjectPageData = {
  pageNumber: '08',
  sectionCode: 'PROJECT 03 // AUTONOMOUS ROBOTICS',
  title: 'Autonomous Obstacle-Avoiding & Tracking Robot (MIT ToT)',
  date: '2023',
  roleLabel: 'Sole Builder · Ranked #1 Overall (Youngest Participant)',
  metricsStrip: [
    { label: 'COHORT RANK', value: '#1 Overall' },
    { label: 'AWARD', value: 'Best Prototype (1*)' },
    { label: 'INSTRUCTION', value: '2 MIT PhD Mentors' },
    { label: 'PARTICIPANT', value: 'Youngest Admitted' },
  ],
  boxes: {
    problem: {
      headline: 'Real-time vision tracking & collision avoidance on a floor track',
      points: [
        'MIT Training of Trainers (ToT) engineering challenge under strict cohort schedule and compact onboard rover hardware.',
        'Needed simultaneous camera color-target tracking and obstacle detection without stalling on variable floor lighting.',
      ],
    },
    approach: {
      headline: 'Calibrated sensitivity arrays + closed-loop steering',
      points: [
        'Integrated a servo-mounted USB vision camera with front-mounted obstacle sensors and onboard compute.',
        'Tuned color-recognition thresholds and sensor sensitivity arrays directly on the evaluation carpet to stabilize steering loops.',
      ],
    },
    result: {
      headline: '#1 evaluation score & Best Prototype on evaluation day',
      points: [
        'Executed the autonomous tracking and obstacle-avoidance evaluation cleanly with zero critical hardware/software faults.',
        'Earned the top #1 cohort score (1* / best prototype) under two MIT PhD mentors as the youngest participant.',
      ],
    },
    learnt: {
      headline: 'Physical testing in the real environment beats bench tuning',
      points: [
        'Bench calibration fails under real glare and wheel slip—debugging directly on the carpet track locked in deterministic runs.',
        'Proved how tightly mechanical packaging, sensor placement, and control software interact in physical autonomous vehicles.',
      ],
    },
  },
  media: [
    {
      id: 'mit-debug',
      title: 'Live Track Calibration & Debugging',
      caption: 'On-floor live tuning of tracking thresholds and steering gains directly against the competition track.',
      src: mitTotDebugging,
      badge: 'FIELD DEBUG',
      surface: 'dark',
    },
    {
      id: 'mit-cam',
      title: 'Optical Vision Camera',
      caption: 'Calibrated front camera module on rover.',
      src: mitTotCameraFront,
      badge: 'VISION',
      surface: 'dark',
    },
    {
      id: 'mit-rover',
      title: 'Full Rover on Track',
      caption: 'Obstacle sensors, compute & servo mount.',
      src: mitTotRoverTrack,
      badge: '#1 PROTOTYPE',
      surface: 'dark',
    },
  ],
};

export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    id: 'mit-tot-cert',
    title: 'MIT Training of Trainers (ToT) Mechatronics & Vision Program',
    provider: 'MIT PhD Instructional Cohort · Georgia',
    date: '2023',
    format: 'In-Person Cohort',
    keyTask: 'Design, build & tune an autonomous obstacle-avoiding and camera color-tracking rover.',
    constraint: 'Real-time embedded response under arena lighting variation and strict build schedule.',
    tools: 'Camera color recognition, sensitivity sensor arrays, closed-loop steering control',
    output: 'Ranked #1 overall (youngest participant) & awarded Best Prototype.',
  },
  {
    id: 'metucube-thermal',
    title: 'METUCube — 3U CubeSat Thermal Subsystem Onboarding',
    provider: 'METUCube Student Space Organization (METU)',
    date: 'Nov 2026 – May 2027 (6-Mo Build)',
    format: 'In-Person Hardware Team',
    keyTask: 'Contribute to thermal modeling & subsystem budgeting for a student-built 3U CubeSat.',
    constraint: '3U mass/volume/surface-area envelope and orbital hot/cold survival temperature bounds.',
    tools: 'Excel thermal budgets, MATLAB numerical checks, subsystem interface documentation',
    output: 'Active Thermal Subsystem member on a 6-month 3U CubeSat completion track.',
  },
  {
    id: 'space-apps-kaspi',
    title: 'NASA International Space Apps Challenge — Local Judge & Mentor',
    provider: 'NASA Space Apps Local Event · Kaspi, Georgia',
    date: '2022',
    format: 'In-Person Judging & Mentoring',
    keyTask: 'Mentored competing teams on technical feasibility and scored prototypes on the judging panel.',
    constraint: '48-hour build window, scientific accuracy, and team skill-level constraints.',
    tools: 'Rapid prototyping guidance, structured technical judging rubrics',
    output: 'Guided local teams to testable demos and delivered scored technical evaluations.',
  },
  {
    id: 'citython-kutaisi',
    title: 'Citython Kutaisi — Technical Mentor',
    provider: 'Citython Innovation Hackathon · Kutaisi, Georgia',
    date: '2023',
    format: 'In-Person Judging & Mentoring',
    keyTask: 'Advised teams on engineering architecture, scoping, and live prototype debugging.',
    constraint: 'Urban mobility problem specifications and strict hackathon delivery deadlines.',
    tools: 'System architecture review, software/hardware scoping & pitch feedback',
    output: 'Helped student teams narrow MVP scope and ship working demonstrations on time.',
  },
  {
    id: 'metu-aero-core',
    title: 'B.Sc. Aerospace Engineering Core & Self-Directed GNC Research',
    provider: 'Middle East Technical University (ODTÜ) · Ankara, TR',
    date: '2024 – Present',
    format: 'In-Person University & Research',
    keyTask: 'Core engineering coursework (ES 361, AEE 231, AEE 172, AEE 261, METE 230, MATH 119/120, PHYS 105/106, CENG 240/ME 105).',
    constraint: '100% English-medium aerospace curriculum (QS Europe #124; #1 in Turkey) & mathematical rigor.',
    tools: 'Python, MATLAB, LaTeX (AIAA format), CAD graphics, numerical solvers',
    output: 'Applied directly to 1,400-run CubeSat ADCS research, ShroudX & METUCube.',
  },
];
