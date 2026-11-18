import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Layers, Pause, Play } from 'lucide-react';
import { SITE_PAGES, type PageId } from '../data/pages';

interface PageControllerBarProps {
  currentPage: PageId;
  isAutoPlaying: boolean;
  isTemporarilyPaused: boolean;
  cycleKey: number;
  intervalMs: number;
  onSelectPage: (pageId: PageId) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onToggleAutoPlay: () => void;
}

export function PageControllerBar({
  currentPage,
  isAutoPlaying,
  isTemporarilyPaused,
  cycleKey,
  intervalMs,
  onSelectPage,
  onPrevPage,
  onNextPage,
  onToggleAutoPlay,
}: PageControllerBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const progressActive = isAutoPlaying && !isTemporarilyPaused;
  const activeIdx = SITE_PAGES.findIndex((p) => p.id === currentPage);
  const activePage = SITE_PAGES[activeIdx] ?? SITE_PAGES[0];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChoosePage = (pageId: PageId) => {
    setDropdownOpen(false);
    onSelectPage(pageId);
  };

  return (
    <div
      aria-label="Dashboard section selector and display controls"
      className="relative z-40 bg-surface border-b border-rule"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Standardized Dashboard Section Dropdown */}
        <div ref={dropdownRef} className="relative flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-controls="dashboard-section-listbox"
            aria-label={`Select dashboard section. Current section ${activeIdx + 1} of ${SITE_PAGES.length}: ${activePage.title}`}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold rounded-md border border-rule bg-surface-raised text-ink hover:border-accent transition-colors cursor-pointer max-w-full"
          >
            <Layers className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
            <span className="font-mono-data text-accent tabular-nums shrink-0">
              {String(activeIdx + 1).padStart(2, '0')} /{' '}
              {String(SITE_PAGES.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="text-rule shrink-0">
              |
            </span>
            <span className="truncate">{activePage.title}</span>
            <ChevronDown
              className={`w-4 h-4 text-ink-muted shrink-0 transition-transform duration-150 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {dropdownOpen && (
            <div
              id="dashboard-section-listbox"
              role="listbox"
              aria-label="Select dashboard section"
              className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-surface-raised border border-rule rounded-lg shadow-lg py-1.5 z-50 max-h-[70vh] overflow-y-auto"
            >
              {SITE_PAGES.map((page, idx) => {
                const isActive = page.id === currentPage;
                return (
                  <button
                    key={page.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleChoosePage(page.id)}
                    className={`w-full text-left px-4 py-2.5 flex items-baseline gap-3 transition-colors cursor-pointer ${
                      idx < SITE_PAGES.length - 1 ? 'border-b border-rule/50' : ''
                    } ${
                      isActive
                        ? 'bg-accent text-canvas'
                        : 'text-ink hover:bg-canvas'
                    }`}
                  >
                    <span
                      className={`font-mono-data text-xs font-bold tabular-nums shrink-0 ${
                        isActive ? 'text-[#E6C767]' : 'text-accent'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-snug">{page.shortLabel}</p>
                      <p
                        className={`text-xs truncate ${
                          isActive ? 'text-canvas/85' : 'text-ink-subtle'
                        }`}
                      >
                        {page.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Prev/Next & Auto-Display controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrevPage}
              aria-label="Previous section"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNextPage}
              aria-label="Next section"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleAutoPlay}
            aria-pressed={isAutoPlaying}
            aria-label={
              isAutoPlaying
                ? 'Pause automatic section rotation'
                : 'Resume automatic section rotation'
            }
            className={`inline-flex items-center gap-1.5 px-3 h-9 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isAutoPlaying
                ? 'bg-surface-raised text-accent border-accent/40 hover:border-accent'
                : 'bg-canvas text-ink-muted border-rule hover:text-ink hover:border-ink'
            }`}
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {!isAutoPlaying
                ? 'Auto-Display: Paused'
                : isTemporarilyPaused
                ? 'Auto-Display: Waiting'
                : 'Auto-Display: On'}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle compositor-only periodic progress hairline */}
      <div className="h-[2px] w-full bg-rule/50 overflow-hidden" aria-hidden="true">
        {progressActive && (
          <div
            key={`${currentPage}-${cycleKey}`}
            style={{ animationDuration: `${intervalMs}ms` }}
            className="h-full w-full bg-accent periodic-progress-bar"
          />
        )}
      </div>
    </div>
  );
}
