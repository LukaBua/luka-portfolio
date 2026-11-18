import { useState } from 'react';
import { Download, X } from 'lucide-react';
import {
  AboutPage,
  ClosingPage,
  CoverPage,
  ExperiencePage,
  LearningPage,
  SkillsPage,
} from './components/FolioPages';
import { ProjectFourBoxPage } from './components/ProjectFourBoxPage';
import {
  PROJECT_ADCS,
  PROJECT_MIT_TOT,
  PROJECT_SHROUDX,
} from './data/portfolioData';
import type { LightboxAsset } from './types';

const PAGE_NAV = [
  { num: '01', label: 'Cover' },
  { num: '02', label: 'About' },
  { num: '03', label: 'Skills' },
  { num: '04', label: 'Experience' },
  { num: '05', label: 'ADCS' },
  { num: '06', label: 'ShroudX' },
  { num: '07', label: 'Learning' },
  { num: '08', label: 'MIT ToT' },
  { num: '09', label: 'Contact' },
];

export function App() {
  const [lightboxAsset, setLightboxAsset] = useState<LightboxAsset | null>(null);

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#141210] text-[#090807]">
      {/* Sticky Web Toolbar (hidden during PDF export via .no-print) */}
      <nav
        aria-label="Portfolio page navigation"
        className="no-print sticky top-0 z-40 bg-[#090807]/95 backdrop-blur-md border-b border-[#3e3b32]"
      >
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">
          <a
            href="#page-01"
            className="font-mono text-xs font-bold tracking-wider text-[#e0ddd8] hover:text-[#88a2bd] shrink-0"
          >
            LUKA.BUACHIDZE <span className="text-[#718fa7] hidden sm:inline">// 01–09</span>
          </a>

          <div className="flex items-center gap-1 overflow-x-auto py-1 font-mono text-[10.5px]">
            {PAGE_NAV.map((item) => (
              <a
                key={item.num}
                href={`#page-${item.num}`}
                className="px-2 py-1 text-[#b1bdca] hover:text-[#e0ddd8] hover:bg-[#1d6291]/35 border border-transparent hover:border-[#718fa7]/50 whitespace-nowrap transition-colors"
              >
                <span className="text-[#c6b7a2] mr-1">{item.num}</span>
                <span className="hidden md:inline">{item.label}</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePrintPdf}
            title="Opens print dialog — choose 'Save as PDF' with Background graphics enabled (16:9 Landscape)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1d6291] hover:bg-[#718fa7] text-[#e0ddd8] hover:text-[#090807] font-mono text-[10.5px] font-bold tracking-wider transition-colors cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPORT 9-PAGE PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </nav>

      {/* 9-Page Engineering Dossier Stack */}
      <main className="print-stack max-w-[1328px] mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        <CoverPage />
        <AboutPage />
        <SkillsPage />
        <ExperiencePage />
        <ProjectFourBoxPage
          project={PROJECT_ADCS}
          enableInteractiveAdcs
          onInspectMedia={setLightboxAsset}
        />
        <ProjectFourBoxPage
          project={PROJECT_SHROUDX}
          onInspectMedia={setLightboxAsset}
        />
        <LearningPage />
        <ProjectFourBoxPage
          project={PROJECT_MIT_TOT}
          onInspectMedia={setLightboxAsset}
        />
        <ClosingPage onPrintPdf={handlePrintPdf} />
      </main>

      {/* Lightbox Modal for Inspecting Plots & Hardware Photos */}
      {lightboxAsset && (
        <div
          className="no-print fixed inset-0 z-50 bg-[#090807]/88 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxAsset(null)}
        >
          <div
            className="max-w-5xl w-full bg-[#e0ddd8] border-2 border-[#1d6291] shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-[#090807] text-[#e0ddd8] flex items-center justify-between gap-4 border-b border-[#3e3b32]">
              <div className="min-w-0">
                <div className="font-mono text-xs sm:text-sm font-bold text-[#88a2bd] truncate">
                  {lightboxAsset.title}
                </div>
                <div className="text-[11px] text-[#c6b7a2] mt-0.5">{lightboxAsset.caption}</div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxAsset(null)}
                className="p-1.5 border border-[#718fa7]/50 text-[#e0ddd8] hover:bg-[#1d6291] cursor-pointer shrink-0"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-[#090807] flex items-center justify-center">
              <img
                src={lightboxAsset.src}
                alt={lightboxAsset.title}
                className="w-full h-auto max-h-[78vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
