import { useCallback, useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { PageControllerBar } from './components/PageControllerBar';
import { Hero } from './components/Hero';
import { MissionAndRegistry } from './components/MissionAndRegistry';
import { OurTeam } from './components/OurTeam';
import { PhaseOnePrograms } from './components/PhaseOnePrograms';
import { BeneficiaryDistribution } from './components/BeneficiaryDistribution';
import { ImpactExplorer } from './components/ImpactExplorer';
import { GalleryAlbum } from './components/GalleryAlbum';
import { SupportAndContact } from './components/SupportAndContact';
import { Footer } from './components/Footer';
import { DonateFloatingModal } from './components/DonateFloatingModal';
import {
  AUTO_ADVANCE_INTERVAL_MS,
  SITE_PAGES,
  type PageId,
} from './data/pages';

const TRANSITION_DURATION_MS = 460;

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('cover');
  const [exitingPage, setExitingPage] = useState<PageId | null>(null);
  const [transitionDir, setTransitionDir] = useState<'next' | 'prev'>('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isEditingField, setIsEditingField] = useState<boolean>(false);
  const [cycleKey, setCycleKey] = useState<number>(0);

  const exitTimerRef = useRef<number | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  const navigateToPage = useCallback(
    (targetPage: PageId, explicitDirection?: 'next' | 'prev') => {
      if (targetPage === currentPage) {
        setCycleKey((k) => k + 1);
        return;
      }

      const currentIdx = SITE_PAGES.findIndex((p) => p.id === currentPage);
      const targetIdx = SITE_PAGES.findIndex((p) => p.id === targetPage);
      const dir =
        explicitDirection ??
        (targetIdx >= currentIdx ? 'next' : 'prev');

      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }

      setTransitionDir(dir);
      setExitingPage(currentPage);
      setCurrentPage(targetPage);
      setCycleKey((k) => k + 1);

      exitTimerRef.current = window.setTimeout(() => {
        setExitingPage(null);
      }, TRANSITION_DURATION_MS);
    },
    [currentPage]
  );

  const goToNextPage = useCallback(() => {
    const idx = SITE_PAGES.findIndex((p) => p.id === currentPage);
    const nextIdx = (idx + 1) % SITE_PAGES.length;
    navigateToPage(SITE_PAGES[nextIdx].id, 'next');
  }, [currentPage, navigateToPage]);

  const goToPrevPage = useCallback(() => {
    const idx = SITE_PAGES.findIndex((p) => p.id === currentPage);
    const prevIdx = (idx - 1 + SITE_PAGES.length) % SITE_PAGES.length;
    navigateToPage(SITE_PAGES[prevIdx].id, 'prev');
  }, [currentPage, navigateToPage]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  // Periodic automatic transitions across display pages
  useEffect(() => {
    if (!isAutoPlaying || isEditingField) return;

    const timer = window.setTimeout(() => {
      goToNextPage();
    }, AUTO_ADVANCE_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [isAutoPlaying, isEditingField, currentPage, cycleKey, goToNextPage]);

  // Pause periodic transitions politely while typing in inputs/textareas/selects or viewing a modal
  useEffect(() => {
    const updatePauseState = () => {
      const active = document.activeElement;
      const isFormControl =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        active instanceof HTMLSelectElement;
      const hasModalOpen = document.querySelector('[role="dialog"]') !== null;
      const hasAlbumOpen = document.querySelector('[data-album-open="true"]') !== null;
      setIsEditingField(isFormControl || hasModalOpen || hasAlbumOpen);
    };

    document.addEventListener('focusin', updatePauseState);
    document.addEventListener('focusout', updatePauseState);
    const observer = new MutationObserver(updatePauseState);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-album-open'],
    });

    return () => {
      document.removeEventListener('focusin', updatePauseState);
      document.removeEventListener('focusout', updatePauseState);
      observer.disconnect();
    };
  }, []);

  const renderPageContent = (pageId: PageId) => {
    switch (pageId) {
      case 'cover':
        return <Hero onNavigate={(id) => navigateToPage(id)} />;
      case 'mission':
        return <MissionAndRegistry />;
      case 'team':
        return <OurTeam />;
      case 'programs':
        return (
          <PhaseOnePrograms
            section="programs"
            onNavigateSupport={() => navigateToPage('support')}
          />
        );
      case 'urgency':
        return (
          <PhaseOnePrograms
            section="urgency"
            onNavigateSupport={() => navigateToPage('support')}
          />
        );
      case 'distribution':
        return (
          <BeneficiaryDistribution
            onNavigateSupport={() => navigateToPage('support')}
          />
        );
      case 'impact':
        return <ImpactExplorer />;
      case 'gallery':
        return <GalleryAlbum />;
      case 'support':
        return <SupportAndContact />;
    }
  };

  const enterAnimClass =
    transitionDir === 'next' ? 'page-enter-next' : 'page-enter-prev';
  const exitAnimClass =
    transitionDir === 'next' ? 'page-exit-next' : 'page-exit-prev';

  const activePageMeta =
    SITE_PAGES.find((page) => page.id === currentPage) ?? SITE_PAGES[0];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:bg-accent-hover focus:text-[#E6C767] focus:border focus:border-[#E6C767] focus:rounded-md focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Skip to content
      </a>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {`Viewing ${activePageMeta.title}`}
      </div>

      <Navbar
        currentPage={currentPage}
        onNavigate={(pageId) => navigateToPage(pageId)}
      />

      <PageControllerBar
        currentPage={currentPage}
        isAutoPlaying={isAutoPlaying}
        isTemporarilyPaused={isEditingField}
        cycleKey={cycleKey}
        intervalMs={AUTO_ADVANCE_INTERVAL_MS}
        onSelectPage={(pageId) => navigateToPage(pageId)}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
        onToggleAutoPlay={() => {
          setIsAutoPlaying((prev) => !prev);
          setCycleKey((k) => k + 1);
        }}
      />

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        aria-label="Main content"
        className="flex-1 grid grid-cols-1 overflow-x-clip focus:outline-none"
      >
        {exitingPage && exitingPage !== currentPage && (
          <div
            key={`exit-${exitingPage}`}
            aria-hidden="true"
            className={`col-start-1 row-start-1 ${exitAnimClass}`}
          >
            {renderPageContent(exitingPage)}
          </div>
        )}

        <div
          key={`active-${currentPage}`}
          className={`col-start-1 row-start-1 ${
            exitingPage ? enterAnimClass : ''
          }`}
        >
          {renderPageContent(currentPage)}
        </div>
      </main>

      <Footer onNavigate={(pageId) => navigateToPage(pageId)} />

      <DonateFloatingModal onNavigateSupport={() => navigateToPage('support')} />
    </div>
  );
}

export default App;
