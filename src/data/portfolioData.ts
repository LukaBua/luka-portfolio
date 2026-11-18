import fig1MonteCarlo from '../assets/figures/fig1_monte_carlo_sweeps.png';
import fig2SefiRecovery from '../assets/figures/fig2_sefi_recovery_trajectory.png';
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
  originStory:
    "I have always enjoyed everything about hardware—from helping my neighbor fix a chicken coop door when I was 8 to watching Cowboy Bebop and admiring the flying vehicles in Emperors of the Galaxy. That fascination led me to aerospace engineering for its potential in humanity's future, even though the sector is not yet in first-phase development in my country.",
  currentRoleNote:
    'Studying Aerospace Engineering in a 100% English-medium curriculum at METU, serving as Cohort Representative (2024–25) and International Integration Lead (2025–26). Recently joined METUCube inside the Thermal Subsystem on a 3U CubeSat scheduled to complete within 6 months.',
  outsideProjectsNote:
    'Outside coursework, I founded a commercial robotics venture (Cyber Infinity) and pursue independent spacecraft ADCS research and NASA Space Apps astrometry software.',
  nextGoalNote:
    'Targeting 2027 European Aerospace Internships and Spacecraft Systems Engineering roles across ADCS, thermal control, GNC simulation, and flight-grade software.',
};

export const SKILLS_LIST: SkillEntry[] = [
  // Left Column: Coding (4) + CAD & Fab (3)
  {
    name: 'Python',
    icon: 'python',
    category: 'Coding',
    level: 'Advanced',
    evidence: '6-DoF Monte Carlo simulators, FastAPI astronomical APIs & image pipelines',
  },
  {
    name: 'C / C++',
    icon: 'cpp',
    category: 'Coding',
    level: 'Intermediate',
    evidence: 'Bare-metal ARM Cortex-M quantized inference & embedded motor firmware',
  },
  {
    name: 'TypeScript & React',
    icon: 'typescript',
    category: 'Coding',
    level: 'Intermediate',
    evidence: 'Scientific FITS web explorers & interactive telemetry interfaces',
  },
  {
    name: 'LaTeX',
    icon: 'latex',
    category: 'Coding',
    level: 'Intermediate',
    evidence: 'AIAA two-column technical manuscripts & structured engineering reports',
  },
  {
    name: 'SolidWorks',
    icon: 'solidworks',
    category: 'CAD & Fabrication',
    level: 'Intermediate',
    evidence: 'Full-chassis robotics assemblies & DFM tolerance checks',
  },
  {
    name: 'Fusion 360',
    icon: 'fusion',
    category: 'CAD & Fabrication',
    level: 'Intermediate',
    evidence: '3-axis CNC CAM toolpaths & mechanical enclosure modeling',
  },
  {
    name: 'CNC / Laser / PCB Fab',
    icon: 'cnc',
    category: 'CAD & Fabrication',
    level: 'Intermediate',
    evidence: 'Industrial CNC milling, laser structural cutting & motherboard printing',
  },

  // Right Column: Simulation & Analysis (4) + Soft Skills (2)
  {
    name: 'PyTorch & Deep RL (PPO)',
    icon: 'pytorch',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'Stateless control policies & post-training INT8 weight quantization',
  },
  {
    name: 'MATLAB',
    icon: 'matlab',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'Numerical ODE solvers, linear algebra & aerospace performance analysis',
  },
  {
    name: 'Astropy / IRSA / WCS',
    icon: 'astropy',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'FITS calibration, 32-bit flag decoding, TAN reprojection & Gaia cross-matching',
  },
  {
    name: 'Excel',
    icon: 'excel',
    category: 'Simulation & Analysis',
    level: 'Intermediate',
    evidence: 'Engineering trade matrices & CubeSat thermal subsystem budgeting',
  },
  {
    name: 'Venture & Team Leadership',
    icon: 'leadership',
    category: 'Soft Skills',
    level: 'Intermediate',
    evidence: 'Coordinating multi-disciplinary engineering teams & student cohorts',
  },
  {
    name: 'Mentoring & Judging',
    icon: 'mentoring',
    category: 'Soft Skills',
    level: 'Intermediate',
    evidence: 'Advising student builders on hardware scoping & technical evaluations',
  },
];

export const SPOKEN_LANGUAGES: SpokenLanguageEntry[] = [
  { language: 'Georgian', flag: 'ge', level: 'Native', evidence: 'Primary mother tongue' },
  { language: 'English', flag: 'gb', level: 'Fluent (C1–C2)', evidence: '100% English degree · AA ENG 101/211' },
  { language: 'Russian', flag: 'ru', level: 'Fluent', evidence: 'Bilingual working fluency' },
  { language: 'Turkish', flag: 'tr', level: 'Conversational', evidence: 'Daily operations · TURK 105' },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'cyber-infinity',
    logo: 'cyber-infinity',
    role: 'Founder & CEO',
    company: 'Cyber Infinity',
    dates: '2023 – 2024',
    location: 'Tbilisi, Georgia',
    summary:
      'Founded a robotics venture developing AI-powered commercial promoter robots from blank-sheet CAD to active commercial operation.',
    bullets: [
      'Secured $2,000+ in non-dilutive grant funding and transitioned the physical robot into live customer environments.',
      'Owned 100% of the electro-mechanical lifecycle: chassis CAD, drivetrain tolerances, embedded control firmware, and indoor obstacle avoidance.',
    ],
    tools: ['SolidWorks', 'Embedded C/C++', 'Motor Control & Navigation'],
    growth: 'Grew from solo mechanical prototyping to leading grant acquisition, deployment logistics, and live commercial service.',
  },
  {
    id: 'bog',
    logo: 'bog',
    role: 'Digital Banking Backend Intern',
    company: 'Bank of Georgia',
    dates: 'Jul 2025 – Aug 2025',
    location: 'Tbilisi, Georgia',
    summary:
      'Built an automated ad-image cropping and rescaling prototype in Python that engineering translated into production within 1 month.',
    bullets: [
      'Completed the 1-month sprint from business-requirement specs and test-case design to a working Python media pipeline.',
      'Showcased the live demo to the team lead and backend engineers, who adopted and translated the prototype logic into production.',
    ],
    tools: ['Python', 'Automated Image Processing', 'Technical Specs & Test Suites'],
    growth: 'Progressed from translating business constraints into test specs to delivering a demo accepted by production engineers.',
  },
  {
    id: 'gita',
    logo: 'gita',
    role: 'Engineering Intern',
    company: "Georgia's Innovation & Technology Agency (GITA)",
    dates: 'Jun 2023 – Nov 2023',
    location: 'Georgia (FabLab)',
    summary:
      'Fabricated multidisciplinary robotics and medical device prototypes while advising undergraduate engineering teams.',
    bullets: [
      'Mentored and advised 25+ undergraduate students on rapid prototyping, 2D/3D CAD modeling, and design-for-manufacturing (DFM).',
      'Operated industrial 3-axis CNC mills, laser cutters, and PCB motherboard printers across 6 months of physical hardware builds.',
    ],
    tools: ['Fusion 360', 'SolidWorks', '3-Axis CNC / Laser / PCB Fab'],
    growth: 'Advanced from machine operator to guiding 25+ builders through mechanical tolerances and multi-platform fabrication.',
  },
];

export const PROJECT_ADCS: ProjectPageData = {
  pageNumber: '05',
  sectionCode: 'PROJECT 01 // SPACECRAFT GNC',
  title: 'Radiation-Tolerant CubeSat Attitude Control (ADCS)',
  date: 'Oct 2026',
  roleLabel: 'Lead Simulation & Flight-Control Author (4-Author Research Paper)',
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
        'COTS CubeSat MCUs in 550 km SSO suffer radiation-induced SEFIs and watchdog resets that wipe volatile controller memory.',
        'PID integral windup post-reboot drives reaction wheels past their 5.0 mN·m stall cap (151.26° worst-case PID loss at 1000x flux).',
      ],
    },
    approach: {
      headline: 'Dual-layer PID + memoryless INT8 PPO architecture',
      points: [
        'Built a 6-DoF SO(3) simulator (RK4 Δt=0.05 s) with gravity-gradient, drag, magnetic, SRP torques & a 6-state MEKF.',
        'Trained a stateless PPO policy (zero hidden state to corrupt) paired via FSM: PID for fine pointing, PPO for storm safe-mode.',
      ],
    },
    result: {
      headline: '4.3x smaller storm excursion & Cortex-M feasibility',
      points: [
        'Across 1,400 flights (0x–1000x flux), PPO bounded storm error to 35.07°, cut mean error by 46.8%, and saved ~30% actuator effort.',
        'INT8 quantization shrunk weights from 21.0 KB to 5.3 KB (0.41 ms on Cortex-M7, 4.1% of 100 Hz budget); 0.201° nominal PID lock.',
      ],
    },
    learnt: {
      headline: 'Attitude control cannot be validated in isolation',
      points: [
        'A real spacecraft runs OS/RTOS, RF comms, data acquisition & payload tasks concurrently on shared silicon.',
        'An OS-level SEU indirectly stalls attitude execution—future work must co-simulate RTOS, comms & data faults with ADCS.',
      ],
    },
  },
  media: [
    {
      id: 'adcs-sefi',
      title: 'FIG 01 // 1000x Solar Storm SEFI Recovery Trajectory',
      caption: 'Attitude error, body angular rate, RW motor torque vs 5.0 mN·m limit & wheel momentum.',
      src: fig2SefiRecovery,
      badge: '35.07° CAP',
      surface: 'light',
      fit: 'contain',
    },
    {
      id: 'adcs-mc',
      title: 'FIG 02 // 1,400-Flight Monte Carlo Sweep (0x–1000x Flux)',
      caption: 'Settling time, mean pointing error & control effort across radiation intensity scales.',
      src: fig1MonteCarlo,
      badge: 'N=1,400 MC',
      surface: 'light',
      fit: 'contain',
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
    { label: 'COVERAGE', value: '0.75–5.00 µm (6 Det)' },
    { label: 'DEMO CACHE', value: '18.10 MB / 227 FITS' },
    { label: 'EPS IND B PM', value: '4.61 ± 0.15 "/yr (0.76σ)' },
    { label: 'ROUTES', value: '9 Endpoints + GIF' },
  ],
  boxes: {
    problem: {
      headline: 'Turn raw SPHEREx cutouts into honest motion tools',
      points: [
        'SPHEREx frames lack ZODI subtraction and set SOURCE bit 21 on good pixels—naive flags != 0 masking drops real stars.',
        'Needed a public web pipeline converting coordinates into wavelength-matched Blink, Stack & Difference maps.',
      ],
    },
    approach: {
      headline: '32-bit flag decoding, TAN alignment & Gaia DR3 fit',
      points: [
        'Built FastAPI + Astropy backend querying IRSA SIA2/TAP .fits.gz cutouts, subtracting ZODI + 3σ sky in <=0.10 µm windows.',
        'Reprojected onto North-up East-left TAN grids (6.15"/px) and ran WLS proper-motion/parallax fitting + Gaia DR3 cross-match.',
      ],
    },
    result: {
      headline: 'Working Stack/Diff pipeline & 0.76σ Gaia agreement',
      points: [
        'Validated eps Ind B proper motion at 4.6075 ± 0.1540 "/yr (0.76σ vs Gaia DR3 4.6842 "/yr) & 1.05% <=0.5d matched-λ stability.',
        'Delivered React 19 explorer, <10 MB animated GIF export & offline 100-trial toroidal blind mover search (movers.py).',
      ],
    },
    learnt: {
      headline: 'Compute & calibration limits shape scientific UX',
      points: [
        'Surfacing honest failures (R Draconis 0/8 saturated epochs; RW Aurigae 5.06σ DISAGREE) beats forced curve fitting.',
        'Learned to size backend compute and pre-warm heavy WCS reprojections before multi-judge live traffic.',
      ],
    },
  },
  lostMarks: {
    title: 'WHERE I LOST MARKS // HACKATHON POST-MORTEM',
    points: [
      'Time & unfinished scope: could not finish all planned modules before deadline (movers.py stayed offline, unwired from UI).',
      'Color flicker penalty: residual chromatic scatter (8.47% ± 1.84% at w = 0.02 µm across 204 frames) remained unresolved and hurt our win.',
      'Server bottleneck (1 vCPU / 1 GB RAM): live webpage slowed sharply when multiple judges computed FITS stacks simultaneously.',
    ],
  },
  media: [
    {
      id: 'shroudx-flicker',
      title: 'Stationary-Star Chromatic vs Temporal Scatter (204 Frames)',
      caption: '2.0 px aperture photometry on 5 isolated Gaia DR3 stars quantifying residual color flicker.',
      src: shroudxFlickerScatter,
      badge: 'FLICKER STUDY',
      surface: 'light',
      fit: 'contain',
    },
    {
      id: 'shroudx-diff',
      title: "Barnard's Star — Diff Mode",
      caption: 'Epoch B–A shift + hatched core (8.85±0.32 "/yr).',
      src: shroudxBarnardDiff,
      badge: 'DIFF PNG',
      surface: 'dark',
      fit: 'contain',
    },
    {
      id: 'shroudx-blink',
      title: "Barnard's Star — Blink GIF",
      caption: 'Detector 2 blink frames (2025–2026).',
      src: shroudxBarnardBlink,
      badge: 'BLINK GIF',
      surface: 'dark',
      fit: 'contain',
    },
  ],
  repoUrl: 'https://github.com/LukaBua/ShroudX',
  repoLabel: 'github.com/LukaBua/ShroudX',
};

export const PROJECT_MIT_TOT: ProjectPageData = {
  pageNumber: '07',
  sectionCode: 'PROJECT 03 // AUTONOMOUS ROBOTICS',
  title: 'Autonomous Obstacle-Avoiding & Tracking Robot (MIT ToT)',
  date: '2023',
  roleLabel: 'Sole Builder · Ranked #1 Overall (Youngest Participant)',
  metricsStrip: [
    { label: 'COHORT RANK', value: '#1 Overall' },
    { label: 'AWARD', value: 'Best Prototype (1*)' },
    { label: 'INSTRUCTION', value: '2 MIT PhD Mentors' },
    { label: 'AGE', value: 'Youngest Admitted' },
  ],
  boxes: {
    problem: {
      headline: 'Real-time vision tracking & collision avoidance on a floor track',
      points: [
        'MIT Training of Trainers (ToT) engineering challenge under strict cohort timing and compact onboard rover hardware.',
        'Needed simultaneous camera color-target tracking and obstacle avoidance without stalling under uneven arena lighting.',
      ],
    },
    approach: {
      headline: 'Calibrated sensitivity arrays + closed-loop steering',
      points: [
        'Integrated a servo-mounted front USB vision camera with obstacle sensors and onboard compute on a 4-wheel chassis.',
        'Calibrated color-recognition thresholds and sensor sensitivity arrays directly on the evaluation track to stabilize steering.',
      ],
    },
    result: {
      headline: '#1 evaluation score & Best Prototype on evaluation day',
      points: [
        'Completed the autonomous tracking and obstacle-avoidance evaluation cleanly with zero hardware or software faults.',
        'Achieved #1 overall (1* / Best Prototype) under two MIT PhD mentors as the youngest participant in the cohort.',
      ],
    },
    learnt: {
      headline: 'Field calibration against real terrain beats desk assumptions',
      points: [
        'Bench tuning breaks under floor glare and wheel slip—iterating directly against live track sensor readings locked reliability.',
        'Demonstrated how tightly mechanical packaging, sensor placement, and control software couple on physical robots.',
      ],
    },
  },
  media: [
    {
      id: 'mit-debug',
      title: 'Live Track Calibration & Debugging',
      caption: 'On-floor live tuning of tracking thresholds and steering gains directly on the competition track.',
      src: mitTotDebugging,
      badge: 'FIELD DEBUG',
      surface: 'dark',
      fit: 'cover',
    },
    {
      id: 'mit-cam',
      title: 'Optical Vision Camera',
      caption: 'Calibrated front vision lens on rover.',
      src: mitTotCameraFront,
      badge: 'VISION',
      surface: 'dark',
      fit: 'cover',
    },
    {
      id: 'mit-rover',
      title: 'Full Rover on Track',
      caption: 'Obstacle sensors, compute & servo mount.',
      src: mitTotRoverTrack,
      badge: '#1 PROTOTYPE',
      surface: 'dark',
      fit: 'cover',
    },
  ],
};

export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    id: 'metucube-thermal',
    title: 'METUCube — 3U CubeSat Thermal Subsystem Onboarding',
    provider: 'METUCube Student Space Organization (METU)',
    date: 'Nov 2026 – May 2027 (6-Mo Build)',
    format: 'In-Person Hardware Team',
    keyTask: 'Thermal analysis & subsystem budgeting for a student-built 3U CubeSat.',
    constraint: '3U mass/surface-area envelope and orbital hot/cold survival bounds.',
    tools: 'Excel thermal budgets, MATLAB numerical checks, subsystem documentation',
    output: 'Active Thermal Subsystem contributor targeting 6-month hardware completion.',
  },
  {
    id: 'mit-tot-cert',
    title: 'MIT Training of Trainers (ToT) Mechatronics Cohort',
    provider: 'MIT PhD Instructional Program · Georgia',
    date: '2023',
    format: 'In-Person Cohort',
    keyTask: 'Intensive hands-on vision, sensor calibration, and autonomous control workshop.',
    constraint: 'Rapid build cycle under live track lighting and compact hardware budgets.',
    tools: 'Camera color recognition, sensitivity sensor arrays, closed-loop steering',
    output: 'Completed top evaluation (#1 / 1*) under direct review from two MIT PhDs.',
  },
  {
    id: 'space-apps-kaspi',
    title: 'NASA Space Apps Challenge — Local Judge & Mentor',
    provider: 'NASA Space Apps Local Event · Kaspi, Georgia',
    date: '2022',
    format: 'In-Person Judging & Mentoring',
    keyTask: 'Mentored competing student teams on scoping and scored prototypes on the judging panel.',
    constraint: '48-hour hackathon feasibility, scientific clarity, and team skill variance.',
    tools: 'Rapid prototyping guidance, structured technical judging rubrics',
    output: 'Guided local teams to working demos and delivered formal judging evaluations.',
  },
  {
    id: 'citython-kutaisi',
    title: 'Citython Kutaisi — Technical Mentor',
    provider: 'Citython Innovation Hackathon · Kutaisi, Georgia',
    date: '2023',
    format: 'In-Person Judging & Mentoring',
    keyTask: 'Advised teams on system architecture, realistic scoping, and live debugging.',
    constraint: 'Urban mobility problem constraints and strict delivery deadlines.',
    tools: 'Architecture review, software/hardware scoping & technical pitch feedback',
    output: 'Helped student teams trim bloated scope into shippable hackathon prototypes.',
  },
];

export const METU_COURSEWORK_SUMMARY =
  'METU B.Sc. Aerospace Engineering (2024–Present · In-Person · QS Europe #124 / #1 in Turkey): ES 361 Computing Methods, AEE 231 Thermodynamics, AEE 172 Aircraft Performance, AEE 261 Statics, METE 230 Materials, MATH 119/120, PHYS 105/106, CENG 240 / ME 105.';
