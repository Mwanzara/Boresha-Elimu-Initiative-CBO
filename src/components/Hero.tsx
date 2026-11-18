import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import {
  HEADLINE_KPIS,
  HERO_SLIDE_INTERVAL_MS,
  HERO_SLIDES,
  ORGANIZATION_INFO,
} from '../data/organizationData';
import { type PageId } from '../data/pages';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onNavigate?: (pageId: PageId) => void;
}

const SLIDE_TRANSITION_MS = 900;

export function Hero({ onNavigate }: HeroProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [exitingSlideIdx, setExitingSlideIdx] = useState<number | null>(null);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  const [slideCycleKey, setSlideCycleKey] = useState(0);
  const exitTimerRef = useRef<number | null>(null);

  const goToSlide = useCallback(
    (targetIdx: number) => {
      const normalized = (targetIdx + HERO_SLIDES.length) % HERO_SLIDES.length;
      if (normalized === activeSlideIdx) {
        setSlideCycleKey((k) => k + 1);
        return;
      }

      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }

      setExitingSlideIdx(activeSlideIdx);
      setActiveSlideIdx(normalized);
      setSlideCycleKey((k) => k + 1);

      exitTimerRef.current = window.setTimeout(() => {
        setExitingSlideIdx(null);
      }, SLIDE_TRANSITION_MS);
    },
    [activeSlideIdx],
  );

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSlideshowPaused) return;

    const timer = window.setTimeout(() => {
      goToSlide(activeSlideIdx + 1);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [activeSlideIdx, isSlideshowPaused, slideCycleKey, goToSlide]);

  const activeSlide = HERO_SLIDES[activeSlideIdx];
  const exitingSlide = exitingSlideIdx !== null ? HERO_SLIDES[exitingSlideIdx] : null;

  return (
    <section id="top" className="border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Enlarged Organization Title + Institutional Provenance */}
        <div className="pb-5 border-b border-rule flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-accent">
            {ORGANIZATION_INFO.name}
          </p>
          <p className="text-xs sm:text-sm font-medium text-ink-subtle tracking-wide">
            Cover Page
            <span aria-hidden="true" className="mx-2 text-gold-bright">·</span>
            Malindi, Coastal Region, Kenya
            <span aria-hidden="true" className="mx-2 text-gold-bright">·</span>
            Founded {ORGANIZATION_INFO.foundedYear}
          </p>
        </div>

        {/* Balanced 2-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 lg:pt-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-gold tracking-wide uppercase">
                Our Holistic Approach
              </p>
              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] font-bold leading-[1.06] tracking-tight text-ink"
                style={{ textWrap: 'balance' }}
              >
                A Nourished, Sheltered, and Educated Child Rises as the Pride of a Community.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-ink-muted max-w-xl">
                Founded in 2024 along Kenya’s coastal region, Boresha Elimu Initiative CBO supports vulnerable and less privileged children through full and partial sponsorships—combining school tuition, learning materials, daily feeding, and household assessments.
              </p>

              <blockquote className="py-3.5 border-y border-rule max-w-xl">
                <p className="font-display italic text-base sm:text-lg font-medium text-ink leading-snug">
                  “{ORGANIZATION_INFO.slogan}”
                </p>
                <footer className="mt-1.5 text-xs font-bold tracking-wide text-gold uppercase">
                  Project Slogan · {ORGANIZATION_INFO.sloganRef}
                </footer>
              </blockquote>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate?.('support')}
                aria-label="Sponsor a child's term — go to Support and Contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-accent text-canvas rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Sponsor a Child’s Term</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate?.('programs')}
                aria-label="Explore Boresha Elimu Initiative CBO programs"
                className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-cobalt hover:text-accent underline underline-offset-4 decoration-cobalt/40 hover:decoration-accent transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Our Programs</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <figure
              className="flex-1 flex flex-col"
              aria-roledescription="carousel"
              aria-label="Malindi field activities cover slideshow"
            >
              <div className="relative flex-1 min-h-[280px] lg:min-h-[380px] overflow-hidden rounded-lg border border-rule bg-surface">
                {exitingSlide && (
                  <div
                    key={`exit-${exitingSlide.id}-${slideCycleKey}`}
                    aria-hidden="true"
                    className="absolute inset-0 cover-slide-exit"
                  >
                    <ResilientImage
                      src={exitingSlide.src}
                      alt={exitingSlide.alt}
                      fallbackTitle={exitingSlide.label}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                <div
                  key={`active-${activeSlide.id}-${slideCycleKey}`}
                  className={`absolute inset-0 ${exitingSlide ? 'cover-slide-enter' : ''}`}
                >
                  <ResilientImage
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fallbackTitle={activeSlide.label}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Measured contrast scrim overlay with slide label & controls */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3 text-canvas">
                  <div className="min-w-0">
                    <p className="font-mono-data text-[11px] uppercase tracking-wider text-[#E6C767] tabular-nums">
                      {String(activeSlideIdx + 1).padStart(2, '0')} /{' '}
                      {String(HERO_SLIDES.length).padStart(2, '0')} · {activeSlide.label}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => goToSlide(activeSlideIdx - 1)}
                      aria-label="Previous cover photo"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-black/45 border border-canvas/25 text-canvas hover:bg-black/70 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSlideshowPaused((prev) => !prev);
                        setSlideCycleKey((k) => k + 1);
                      }}
                      aria-label={
                        isSlideshowPaused
                          ? 'Resume 1-minute cover photo slideshow'
                          : 'Pause 1-minute cover photo slideshow'
                      }
                      aria-pressed={isSlideshowPaused}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-black/45 border border-canvas/25 text-canvas hover:bg-black/70 transition-colors cursor-pointer"
                    >
                      {isSlideshowPaused ? (
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSlide(activeSlideIdx + 1)}
                      aria-label="Next cover photo"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-black/45 border border-canvas/25 text-canvas hover:bg-black/70 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* 1-minute compositor progress hairline */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-black/30 overflow-hidden"
                  aria-hidden="true"
                >
                  {!isSlideshowPaused && (
                    <div
                      key={`progress-${activeSlide.id}-${slideCycleKey}`}
                      style={{ animationDuration: `${HERO_SLIDE_INTERVAL_MS}ms` }}
                      className="h-full w-full bg-[#E6C767] periodic-progress-bar"
                    />
                  )}
                </div>
              </div>

              {/* Caption + segmented slide selector */}
              <div className="mt-2.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <figcaption className="text-xs text-ink-subtle italic leading-relaxed">
                  {activeSlide.caption}
                </figcaption>

                <div
                  className="flex items-center gap-1.5 shrink-0 pt-0.5"
                  role="group"
                  aria-label="Choose cover photograph"
                >
                  {HERO_SLIDES.map((slide, idx) => {
                    const isSelected = idx === activeSlideIdx;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        aria-label={`Show cover photo ${idx + 1} of ${HERO_SLIDES.length}: ${slide.label}`}
                        aria-pressed={isSelected}
                        className={`h-1.5 rounded-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'w-6 bg-accent'
                            : 'w-2.5 bg-rule hover:bg-ink-subtle'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </figure>
          </div>
        </div>

        {/* Full-width 4-column KPI strip below hero split */}
        <div
          className="mt-10 pt-8 border-t-2 border-accent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0"
          aria-label="Key two-year milestones"
        >
          {HEADLINE_KPIS.map((kpi, index) => (
            <div
              key={kpi.label}
              className={`flex flex-col justify-between ${
                index < HEADLINE_KPIS.length - 1 ? 'lg:pr-6 lg:border-r lg:border-rule' : ''
              } ${index > 0 ? 'lg:pl-6' : ''}`}
            >
              <div>
                <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink tabular-nums">
                  {kpi.value}
                </p>
                <p className="mt-1.5 text-sm font-bold text-accent">{kpi.label}</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-subtle">{kpi.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
