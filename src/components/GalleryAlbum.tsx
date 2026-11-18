import { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Film, FolderClosed, Maximize2, X } from 'lucide-react';
import {
  GALLERY_ALBUM_META,
  GALLERY_ALBUM_PHOTOS,
  GALLERY_FEATURE_VIDEO,
  type GalleryCategory,
} from '../data/organizationData';
import { ResilientImage } from './ResilientImage';

const CATEGORY_TABS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Photos' },
  { id: 'community', label: 'Community & Forums' },
  { id: 'feeding', label: 'Feeding & Food Aid' },
  { id: 'learners', label: 'Learners & Portraits' },
];

const CATEGORY_LABELS: Record<Exclude<GalleryCategory, 'all'>, string> = {
  community: 'Community & Forums',
  feeding: 'Feeding & Food Aid',
  learners: 'Learners & Portraits',
};

export function GalleryAlbum() {
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const visiblePhotos =
    activeCategory === 'all'
      ? GALLERY_ALBUM_PHOTOS
      : GALLERY_ALBUM_PHOTOS.filter((photo) => photo.category === activeCategory);

  const activeLightboxPhoto =
    lightboxIndex !== null && visiblePhotos[lightboxIndex]
      ? visiblePhotos[lightboxIndex]
      : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length,
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visiblePhotos.length]);

  const handleOpenAlbum = () => {
    setActiveCategory('all');
    setIsAlbumOpen(true);
  };

  const handleCloseAlbum = () => {
    setLightboxIndex(null);
    setIsAlbumOpen(false);
  };

  return (
    <section
      id="gallery"
      data-album-open={isAlbumOpen || isVideoPlaying ? 'true' : undefined}
      className="py-16 lg:py-24 border-b border-rule"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header & Narrative */}
        <div className="pb-8 border-b border-ink max-w-3xl space-y-3">
          <p className="text-xs font-bold text-accent tracking-wide uppercase">
            Gallery · Activity Collection
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Boresha CBO Field Activities
          </h2>
          <p className="text-base leading-relaxed text-ink-muted">
            Boresha CBO field activities. Open the album below to look inside and browse the photographs.
          </p>
        </div>

        {!isAlbumOpen ? (
          /* Closed Album Cover View */
          <div className="mt-10 bg-surface-raised border border-rule rounded-lg p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Album Cover Image Spread */}
              <div className="lg:col-span-7">
                <button
                  type="button"
                  onClick={handleOpenAlbum}
                  className="group block w-full text-left focus:outline-none cursor-pointer"
                  aria-label={`Open ${GALLERY_ALBUM_META.title} containing ${GALLERY_ALBUM_PHOTOS.length} photographs`}
                >
                  <div className="overflow-hidden rounded-lg bg-accent-hover p-2.5 sm:p-3 border border-gold-bright/50 shadow-sm">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-surface">
                      <ResilientImage
                        src={GALLERY_ALBUM_META.coverSrc}
                        alt={GALLERY_ALBUM_META.coverAlt}
                        fallbackTitle={GALLERY_ALBUM_META.title}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-200"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-canvas">
                        <p className="font-mono-data text-xs tracking-wider uppercase text-[#E6C767]">
                          Photo Album · {GALLERY_ALBUM_PHOTOS.length} Photographs
                        </p>
                        <p className="mt-1 font-display text-xl sm:text-2xl font-bold leading-snug">
                          {GALLERY_ALBUM_META.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Album Cover Narrative & Open Trigger */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-ink-subtle">
                    <span>Malindi Field Archive</span>
                    <span aria-hidden="true" className="mx-2 text-gold-bright">·</span>
                    <span className="tabular-nums">{GALLERY_ALBUM_PHOTOS.length} Photos Inside</span>
                    <span aria-hidden="true" className="mx-2 text-gold-bright">·</span>
                    <span>2024–2026</span>
                  </p>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
                    Boresha CBO Field Activities
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-ink-muted">
                    Boresha CBO field activities. Open the album below whenever you want to view all {GALLERY_ALBUM_PHOTOS.length} photographs inside.
                  </p>

                  {/* Compact 3-photo preview strip */}
                  <div className="pt-2 space-y-2">
                    <div className="grid grid-cols-3 gap-2.5">
                      {GALLERY_ALBUM_META.previewThumbs.map((thumbSrc, idx) => (
                        <div
                          key={thumbSrc}
                          className="aspect-[4/3] overflow-hidden rounded-md border border-rule bg-surface"
                        >
                          <ResilientImage
                            src={thumbSrc}
                            alt={`Preview ${idx + 1} from ${GALLERY_ALBUM_META.title}`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-ink-subtle tabular-nums">
                      Includes school feeding, household food support, guardian forums &amp; {GALLERY_ALBUM_PHOTOS.length - 3} more inside
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOpenAlbum}
                    aria-label={`Open ${GALLERY_ALBUM_META.title} album containing ${GALLERY_ALBUM_PHOTOS.length} photographs`}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold bg-accent text-canvas rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                    <span>Open Album ({GALLERY_ALBUM_PHOTOS.length} Photos)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Expanded Album Contents View */
          <div className="mt-10 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-rule">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleCloseAlbum}
                  aria-label="Close photo album and return to cover view"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md border border-rule bg-surface-raised text-ink hover:border-accent hover:text-accent transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FolderClosed className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Close Album</span>
                </button>
                <p className="text-xs font-medium text-ink-subtle tabular-nums">
                  <span>{GALLERY_ALBUM_META.title}</span>
                  <span aria-hidden="true" className="mx-2 text-gold-bright">·</span>
                  <span>
                    Showing {visiblePhotos.length} of {GALLERY_ALBUM_PHOTOS.length} photos
                  </span>
                </p>
              </div>

              {/* Category filter tabs */}
              <div
                role="group"
                aria-label="Filter album photographs"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface border border-rule rounded-lg self-start lg:self-auto"
              >
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategory === tab.id;
                  const count =
                    tab.id === 'all'
                      ? GALLERY_ALBUM_PHOTOS.length
                      : GALLERY_ALBUM_PHOTOS.filter((p) => p.category === tab.id).length;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(tab.id);
                        setLightboxIndex(null);
                      }}
                      aria-pressed={isActive}
                      aria-label={`Filter gallery by ${tab.label} (${count} photographs)`}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                        isActive
                          ? 'bg-accent text-canvas'
                          : 'text-ink-muted hover:text-ink hover:bg-canvas/70'
                      }`}
                    >
                      {tab.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Album Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePhotos.map((photo, idx) => (
                <figure
                  key={photo.id}
                  className="bg-surface-raised border border-rule rounded-lg overflow-hidden flex flex-col hover:border-accent transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`View larger photo: ${photo.title}`}
                    className="group relative aspect-[4/3] w-full overflow-hidden bg-surface cursor-pointer focus:outline-none"
                  >
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      fallbackTitle={photo.title}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-200"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2.5 right-2.5 inline-flex items-center justify-center w-8 h-8 rounded-md bg-ink/75 text-canvas opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </button>

                  <figcaption className="p-4 flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <p className="text-xs text-ink-subtle tabular-nums">
                        <span>{String(idx + 1).padStart(2, '0')} / {String(visiblePhotos.length).padStart(2, '0')}</span>
                        <span aria-hidden="true" className="mx-1.5 text-gold-bright">·</span>
                        <span>{CATEGORY_LABELS[photo.category]}</span>
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold text-ink leading-snug">
                        {photo.title}
                      </h3>
                      <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Final Gallery Item: Short Documentary Video Breakdown */}
        <article
          aria-labelledby="gallery-video-title"
          className="mt-10 bg-surface-raised border border-rule rounded-lg p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div
                className={`overflow-hidden rounded-lg border border-rule ${
                  hasStartedVideo ? 'bg-ink' : 'bg-white'
                }`}
              >
                {videoError ? (
                  <div className="aspect-video w-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-surface text-ink">
                    <Film className="w-8 h-8 text-accent" aria-hidden="true" />
                    <p className="font-display text-lg font-bold">
                      Video stream interrupted
                    </p>
                    <p className="text-xs text-ink-muted max-w-sm">
                      Please retry loading the video or open the MP4 file directly in your browser.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setVideoError(false)}
                        className="px-4 py-2 text-xs font-semibold rounded-md bg-accent text-canvas hover:bg-accent-hover transition-colors cursor-pointer"
                      >
                        Retry Video
                      </button>
                      <a
                        href={GALLERY_FEATURE_VIDEO.src}
                        download="Boresha-Elimu-Initiative-CBO-Project.mp4"
                        aria-label="Download MP4 video file"
                        className="px-4 py-2 text-xs font-semibold rounded-md border border-rule bg-surface-raised text-ink hover:border-accent hover:text-accent transition-colors"
                      >
                        Download MP4
                      </a>
                    </div>
                  </div>
                ) : (
                  <video
                    src={GALLERY_FEATURE_VIDEO.src}
                    poster={GALLERY_FEATURE_VIDEO.poster}
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => {
                      setIsVideoPlaying(true);
                      setHasStartedVideo(true);
                    }}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                    onError={() => setVideoError(true)}
                    aria-label={GALLERY_FEATURE_VIDEO.title}
                    className={`w-full aspect-video object-contain block ${
                      hasStartedVideo ? 'bg-ink' : 'bg-white'
                    }`}
                  >
                    Your browser does not support embedded video playback.
                  </video>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <p className="inline-flex items-center gap-2 text-xs font-medium text-ink-subtle tabular-nums">
                <Film className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                <span className="font-mono-data font-bold text-accent">
                  Final Item · {String(GALLERY_ALBUM_PHOTOS.length + 1).padStart(2, '0')} /{' '}
                  {String(GALLERY_ALBUM_PHOTOS.length + 1).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="text-gold-bright">·</span>
                <span>Field Video ({GALLERY_FEATURE_VIDEO.duration})</span>
              </p>

              <h3
                id="gallery-video-title"
                className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {GALLERY_FEATURE_VIDEO.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-ink-muted">
                {GALLERY_FEATURE_VIDEO.summary}
              </p>

              <ul className="pt-3 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GALLERY_FEATURE_VIDEO.chapters.map((chapter) => (
                  <li
                    key={chapter}
                    className="font-mono-data text-xs font-medium text-ink bg-surface border border-rule rounded-md px-3 py-2"
                  >
                    {chapter}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>

      {/* Fullscreen Lightbox Viewer */}
      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxPhoto.title}
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="max-w-[1200px] w-full mx-auto flex items-center justify-between gap-4 text-canvas"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono-data text-xs text-[#E6C767] tabular-nums">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(visiblePhotos.length).padStart(2, '0')}
              <span aria-hidden="true" className="mx-2">·</span>
              {CATEGORY_LABELS[activeLightboxPhoto.category]}
            </p>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo viewer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md border border-canvas/25 text-canvas hover:bg-canvas/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          {/* Lightbox Main Image & Arrows */}
          <div
            className="flex-1 min-h-0 max-w-[1200px] w-full mx-auto flex items-center justify-center gap-3 sm:gap-6 my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length,
                )
              }
              aria-label="Previous photo"
              className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-canvas/25 bg-ink/60 text-canvas hover:bg-canvas/15 transition-colors shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex-1 min-w-0 h-full flex items-center justify-center">
              <ResilientImage
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                fallbackTitle={activeLightboxPhoto.title}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)
              }
              aria-label="Next photo"
              className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-canvas/25 bg-ink/60 text-canvas hover:bg-canvas/15 transition-colors shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Lightbox Caption Footer */}
          <div
            className="max-w-2xl w-full mx-auto text-center text-canvas space-y-1 pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-lg font-bold">{activeLightboxPhoto.title}</p>
            <p className="text-xs sm:text-sm text-canvas/80 leading-relaxed">
              {activeLightboxPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
