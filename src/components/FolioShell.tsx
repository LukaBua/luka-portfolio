import React from 'react';

interface FolioShellProps {
  pageNumber: string;
  sectionLabel: string;
  title?: string;
  subtitle?: string;
  variant?: 'cream' | 'dark';
  children: React.ReactNode;
}

/** Consistent 16:9 engineering dossier page frame with synchronized header and page counter. */
export const FolioShell: React.FC<FolioShellProps> = ({
  pageNumber,
  sectionLabel,
  title,
  subtitle,
  variant = 'cream',
  children,
}) => {
  const isDark = variant === 'dark';

  return (
    <section
      id={`page-${pageNumber}`}
      className={`folio-page scroll-mt-16 shadow-[0_24px_64px_rgba(0,0,0,0.45)] flex flex-col justify-between ${
        isDark
          ? 'bg-cover-blueprint text-[#e0ddd8] border border-[#718fa7]/35'
          : 'bg-cream-grid text-[#090807] border border-[#a0947e]/60'
      }`}
    >
      {/* Top Page Bar — identical position & typography across Pages 02–09 */}
      {pageNumber !== '01' && (
        <header
          className={`px-6 lg:px-8 pt-4 pb-2.5 border-b flex items-center justify-between gap-4 shrink-0 ${
            isDark ? 'border-[#718fa7]/30' : 'border-[#a0947e]/55'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-2 py-0.5 border shrink-0 ${
                isDark
                  ? 'border-[#88a2bd]/50 bg-[#1d6291]/30 text-[#b1bdca]'
                  : 'border-[#1d6291]/40 bg-[#1d6291] text-[#e0ddd8]'
              }`}
            >
              {sectionLabel}
            </span>
            {title && (
              <h2 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight truncate">
                {title}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] shrink-0">
            <span className={`hidden sm:inline ${isDark ? 'text-[#a0947e]' : 'text-[#6f6856]'}`}>
              LUKA BUACHIDZE // AEROSPACE PORTFOLIO
            </span>
            <span
              className={`font-bold px-2 py-0.5 border ${
                isDark
                  ? 'border-[#c6b7a2]/40 text-[#e0ddd8] bg-[#3e3b32]/60'
                  : 'border-[#3e3b32]/30 text-[#090807] bg-[#c6b7a2]/45'
              }`}
            >
              {pageNumber} / 09
            </span>
          </div>
        </header>
      )}

      {/* Optional compact subtitle strip */}
      {subtitle && pageNumber !== '01' && (
        <div
          className={`px-6 lg:px-8 py-1.5 border-b text-[11px] font-mono shrink-0 ${
            isDark
              ? 'border-[#3e3b32] text-[#b1bdca] bg-[#090807]/40'
              : 'border-[#a0947e]/35 text-[#3e3b32] bg-[#c6b7a2]/20'
          }`}
        >
          {subtitle}
        </div>
      )}

      {/* Main Page Canvas */}
      <div className={`flex-1 min-h-0 flex flex-col ${pageNumber === '01' ? '' : 'px-6 lg:px-8 py-4'}`}>
        {children}
      </div>

      {/* Bottom Rule — identical position across Pages 02–08 */}
      {pageNumber !== '01' && (
        <footer
          className={`px-6 lg:px-8 py-2 border-t flex items-center justify-between font-mono text-[9.5px] shrink-0 ${
            isDark
              ? 'border-[#718fa7]/25 text-[#88a2bd] bg-[#090807]/50'
              : 'border-[#a0947e]/45 text-[#6f6856] bg-[#c6b7a2]/20'
          }`}
        >
          <span>METU AEROSPACE ENGINEERING · ANKARA / TBILISI</span>
          <span>EVIDENCE-BACKED ENGINEERING DOSSIER · PAGE {pageNumber} OF 09</span>
        </footer>
      )}
    </section>
  );
};
