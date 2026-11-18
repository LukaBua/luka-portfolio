# LUKA.BUACHIDZE // 9-Page Aerospace Engineering Portfolio

> **Interactive 9-Page Web Portfolio & Exportable 16:9 PDF Dossier** for **Luka Buachidze** — B.Sc. Aerospace Engineering at **Middle East Technical University (METU)** (`2024–Present`), focused on spacecraft systems, attitude control (`ADCS`), thermal subsystems (`METUCube`), autonomous robotics, and astrometry pipelines.

---

## Structure (9 Synchronized Pages)

| Page | Section | Core Content & Evidence |
| :--- | :--- | :--- |
| **01 / 09** | **Cover** | Custom CAD rocket-launch technical drawing, name, METU Aerospace degree & dossier index |
| **02 / 09** | **About Me** | Portrait, Ankara/Tbilisi locations, METUCube 3U Thermal Subsystem role (6-month build), origin & EU internship goals |
| **03 / 09** | **Technical Skills** | Categorized tools (`Coding`, `CAD & Fab`, `Simulation & Analysis`, `Soft Skills`) with honest levels + 4 spoken languages with SVG flags |
| **04 / 09** | **Work Experience** | **Cyber Infinity** (`Founder & CEO`, `2023–2024`), **Bank of Georgia** (`Backend Intern`, `Jul–Aug 2025`), **GITA FabLab** (`Engineering Intern`, `Jun–Nov 2023`) |
| **05 / 09** | **Project 01 — CubeSat ADCS** | *Problem / Approach / Result / Learnt* + 1,400-run Monte Carlo figures (`35.07°` storm cap, `5.3 KB` INT8) & toggleable live 3D Gimbal/Telemetry on web |
| **06 / 09** | **Project 02 — ShroudX** | *Problem / Approach / Result / Learnt* + highlighted **Where I Lost Marks** box (`8.47%` flicker, `1 vCPU / 1 GB RAM` load, time limits) + real Barnard's Star Diff/Blink/Scatter outputs |
| **07 / 09** | **Project 03 — MIT ToT Robot** | *Problem / Approach / Result / Learnt* (`#1` overall / `1*` Best Prototype) + 3 real competition rover photos |
| **08 / 09** | **Continuous Learning** | **METUCube Thermal**, **MIT ToT Cohort (`2023`)**, **NASA Space Apps Kaspi Judge/Mentor (`2022`)**, **Citython Kutaisi Mentor (`2023`)**, & METU Core Coursework, labeled by format |
| **09 / 09** | **Closing & Contact** | Direct email, `github.com/LukaBua`, `linkedin.com/in/lukabuachidze`, copy email & one-click 9-page PDF export |

---

## Tech Stack & Exportable PDF

- **Framework:** React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Interactive Web Modules (hidden in print):** Three.js 3D CubeSat Gimbal (`OrbitalGimbal.tsx`), interactive SEFI vs. PID telemetry plot (`TelemetryPlot.tsx`), and full-res lightbox modal
- **PDF Export:** Dedicated `@page { size: 13.3333in 7.5in; margin: 0; }` 16:9 widescreen print stylesheet triggered via `[EXPORT 9-PAGE PDF]` (`window.print()`)

---

## Local Development

```bash
npm install
npm run dev      # Start dev server
npm run lint     # Run oxlint
npm run build    # Type-check + build production bundle into /dist
```

---

## Contact

- **Email:** [luka.buachidze@metu.edu.tr](mailto:luka.buachidze@metu.edu.tr)
- **GitHub:** [@LukaBua](https://github.com/LukaBua)
- **LinkedIn:** [linkedin.com/in/lukabuachidze](https://linkedin.com/in/lukabuachidze)
