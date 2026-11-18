# LUKA.BUACHIDZE // Flight Dynamics & Control Systems Research Portfolio

> **Interactive Aerospace & Mechatronics Engineering Dossier** for **Luka Buachidze** — Undergraduate Researcher in Aerospace Engineering at **Middle East Technical University (METU)**, specializing in satellite Attitude Determination & Control Systems (ADCS), 6-DoF numerical trajectory simulation, and radiation-tolerant neural flight controllers.

---

## Overview

This repository houses a custom flight-telemetry HUD portfolio and interactive engineering showcase built with **React 19**, **TypeScript**, **Three.js**, and **Tailwind CSS v4**. Designed around an avionics / mission-control interface (`#060709` dark-field aesthetic), it presents empirical benchmarks, real-time interactive simulations, academic foundations, and hardware engineering systems.

### Key Interactive Subsystems

- **3D Orbital ADCS Gimbal (`OrbitalGimbal.tsx`)** — Interactive Three.js spacecraft attitude visualizer featuring real-time quaternion orientation readouts, reaction-wheel momentum vectors, and orbital reference frames.
- **Interactive SEFI Radiation Recovery Oscilloscope (`TelemetryPlot.tsx`)** — Multi-channel time-domain telemetry analyzer comparing **Stateless Deep RL (PPO)** against **Classical PID** under simulated solar-proton Single-Event Functional Interrupts (SEFIs) and reaction wheel saturation limits (`5.0 mN·m`).
- **Autonomous Swarm Kinematics Canvas (`BoidCanvas.tsx`)** — Real-time 2D spatial-hash flocking simulation running in the background with live FPS and agent-count telemetry, interactive cursor attractors, and dock controls.
- **CAD Wireframe Inspection Mode (`CadWireframeBox.tsx` & `TelemetryDock.tsx`)** — Global HUD diagnostic overlay toggling subsystem coordinate tags, wireframe boundaries, and dark-field / raw figure rendering modes.

---

## Featured Engineering & Research Highlights

1. **Radiation-Tolerant Neural Satellite Attitude Control (ADCS)**
   - **1,400-Run Monte Carlo Verification** across logarithmic solar storm proton flux sweeps (`0x` to `1000x`).
   - **Zero-State Fault Immunity:** Stateless MLP control policy eliminating integral windup during radiation-induced SEFIs and reducing attitude dispersion by **46.8%** vs. classical PID.
   - **Bare-Metal INT8 Quantization:** Compressed PyTorch policy into a **5.3 KB** static C header with zero dynamic heap allocation for deterministic execution on ARM Cortex-M flight controllers.
2. **ShroudX — NASA SPHEREx Sky-Motion & Astrometry Viewer (`NASA Space Apps 2026`)** — [github.com/LukaBua/ShroudX](https://github.com/LukaBua/ShroudX)
   - **Team Lead (5-Member Team):** Built a FastAPI + Astropy + React 19 infrared astrometry application querying NASA/IPAC IRSA (`SIA2` / `TAP`) cutouts across all 6 SPHEREx detectors (`0.75–5.00 µm`, `6.15"/px`).
   - **Calibration, Alignment & Astrometric Fitting:** Implemented 32-bit `FLAGS` decoding, `ZODI` subtraction, North-up East-left TAN reprojection for Blink/Stack/Difference products, `WLS` proper-motion + barycentric parallax fitting (validated on `eps Ind B` at `4.6075 ± 0.1540 "/yr`, `0.76σ` from Gaia DR3), and Gaia DR3 cross-matching (`18.10 MB` compressed demo cache).
   - **Empirical Chromatic-Scatter & Mover Verification:** Quantified stationary-star aperture scatter across `204` frames (`1.05%` matched-wavelength stability within `0.5 d` vs. `8.47% ± 1.84%` multi-epoch scatter at `0.02 µm`) and offline `5σ` blind mover search with `100`-trial toroidal false-mover estimation.
3. **MIT Training of Trainers (ToT) Autonomous Mechatronics Cohort** — Ranked **#1 overall** (youngest admitted participant) under mentorship from two MIT PhDs, engineering closed-loop optical tracking and obstacle-avoidance robotics.
4. **Cyber Infinity (Co-Founder & CEO)** — Venture-backed commercial autonomous service robot ($2,000+ non-dilutive grant), full-chassis SolidWorks CAD assemblies, custom motor-drive firmware, and indoor navigation.
5. **Digital Fabrication & Hardware Prototyping (GITA FabLab)** — Mentored 25+ engineering teams in Design-for-Manufacturing (DFM), 3-axis CNC CAM toolpaths, laser structural cutting, and precision PCB milling.
6. **Enterprise Backend Automation (Bank of Georgia)** — Delivered a high-throughput media processing microservice from specification to 100% production deployment in a 30-day cycle.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | React 19, TypeScript 5/7, Vite 8 |
| **3D & Canvas Simulation** | Three.js (`@types/three`), HTML5 2D Canvas API |
| **Styling & UI** | Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React Icons |
| **Typography** | `Inter` & `JetBrains Mono` |
| **Linting** | Oxlint |

---

## Project Structure

```text
luka-portfolio/
├── public/                        # Static assets & favicon
├── src/
│   ├── assets/
│   │   └── figures/               # High-resolution Monte Carlo, SEFI & ShroudX telemetry figures
│   ├── components/
│   │   ├── BoidCanvas.tsx         # Background autonomous swarm simulation
│   │   ├── CadWireframeBox.tsx    # Avionics CAD container with coordinate tags
│   │   ├── OrbitalGimbal.tsx      # Interactive Three.js 3D satellite attitude gimbal
│   │   ├── ShroudXShowcase.tsx    # NASA Space Apps 2026 ShroudX showcase & scatter figure
│   │   ├── TelemetryDock.tsx      # Bottom HUD control bar (FPS, Inspect Mode, Swarm Purge)
│   │   ├── TelemetryPlot.tsx      # Interactive SEFI vs. PID multi-channel oscilloscope
│   │   └── TelemetryPrimitives.tsx # Shared HUD metric badges, bullet lists, and figure frames
│   ├── App.tsx                    # Main engineering dossier layout & data definitions
│   ├── index.css                  # Tailwind v4 configuration & custom HUD utilities
│   ├── main.tsx                   # Application entry point
│   └── types.ts                   # Shared TypeScript interfaces
├── index.html
├── package.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** `>= 20.x`
- **npm** `>= 10.x`

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/LukaBua/luka-portfolio.git
cd luka-portfolio

# Install dependencies
npm install

# Start the Vite development server with HMR
npm run dev
```

### Build & Preview Production Bundle

```bash
# Type-check and build for production into /dist
npm run build

# Locally preview the production build
npm run preview

# Run linter
npm run lint
```

---

## Contact & Uplink

- **Author:** Luka Buachidze
- **Institution:** Middle East Technical University (METU) — B.S. Aerospace Engineering (Ankara, TR)
- **Email:** [luka.buachidze@metu.edu.tr](mailto:luka.buachidze@metu.edu.tr)
- **GitHub:** [@LukaBua](https://github.com/LukaBua)
- **LinkedIn:** [linkedin.com/in/lukabuachidze](https://linkedin.com/in/lukabuachidze)
