import { useState } from 'react';
import { PHASE_ONE_PROGRAMS, type ProgramFilter } from '../data/organizationData';
import { ResilientImage } from './ResilientImage';

const FILTER_TABS: { id: ProgramFilter; label: string }[] = [
  { id: 'all', label: 'All Programs' },
  { id: 'education', label: 'Tuition & Materials' },
  { id: 'nutrition', label: 'Feeding & Food Aid' },
  { id: 'assessment', label: 'Household Assessment' },
];

interface PhaseOneProgramsProps {
  section?: 'programs' | 'urgency' | 'all';
  onNavigateSupport?: () => void;
}

export function PhaseOnePrograms({
  section = 'all',
  onNavigateSupport,
}: PhaseOneProgramsProps) {
  const [activeFilter, setActiveFilter] = useState<ProgramFilter>('all');

  const visiblePrograms =
    activeFilter === 'all'
      ? PHASE_ONE_PROGRAMS
      : PHASE_ONE_PROGRAMS.filter((p) => p.id === activeFilter);

  const showPrograms = section === 'all' || section === 'programs';
  const showUrgency = section === 'all' || section === 'urgency';

  return (
    <>
      {showPrograms && (
      <section id="programs" className="py-16 lg:py-24 border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-ink">
            <div className="max-w-2xl">
              <p className="text-xs font-bold text-accent tracking-wide uppercase">
                Our Programs · 2024–2026
              </p>
              <h2
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Five coordinated interventions keeping over 100 children in school.
              </h2>
            </div>

            {/* Functional segmented filter tabs */}
            <div
              role="group"
              aria-label="Filter our programs"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface border border-rule rounded-lg self-start lg:self-auto"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-accent text-canvas'
                        : 'text-ink-muted hover:text-ink hover:bg-canvas/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 space-y-12">
            {visiblePrograms.map((program, idx) => (
              <article
                key={program.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-rule last:border-b-0 last:pb-0 items-stretch"
              >
                {/* Alternate image side when showing all */}
                <div
                  className={`lg:col-span-5 flex flex-col gap-5 ${
                    idx % 2 === 1 && activeFilter === 'all' ? 'lg:order-2' : ''
                  }`}
                >
                  <figure className="flex flex-col">
                    <div
                      className={`relative w-full overflow-hidden rounded-lg border border-rule bg-surface ${
                        program.secondaryPhotoSlot ? 'aspect-[3/2]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={program.imageSrc}
                        alt={program.imageAlt}
                        fallbackTitle={program.title}
                        className={`w-full h-full object-cover ${
                          program.secondaryPhotoSlot ? 'object-top' : 'object-center'
                        }`}
                      />
                    </div>
                    <figcaption className="mt-2 text-xs text-ink-subtle italic leading-relaxed">
                      {program.figureLabel}
                    </figcaption>
                  </figure>

                  {program.secondaryPhotoSlot?.imageSrc && (
                    <figure className="flex flex-col">
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-rule bg-surface">
                        <ResilientImage
                          src={program.secondaryPhotoSlot.imageSrc}
                          alt={
                            program.secondaryPhotoSlot.imageAlt ||
                            program.secondaryPhotoSlot.title
                          }
                          fallbackTitle={program.secondaryPhotoSlot.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <figcaption className="mt-2 text-xs text-ink-subtle italic leading-relaxed">
                        {program.secondaryPhotoSlot.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>

                <div
                  className={`lg:col-span-7 flex flex-col justify-between gap-6 ${
                    idx % 2 === 1 && activeFilter === 'all' ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-4">
                    {/* Clean unboxed metadata */}
                    <p className="text-xs font-medium text-ink-subtle">
                      <span>{program.statusLabel}</span>
                      <span aria-hidden="true" className="mx-2 text-gold-bright">·</span>
                      <span>{program.scopeLabel}</span>
                    </p>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-snug">
                      {program.title}
                    </h3>

                    <p className="text-base leading-relaxed text-ink-muted max-w-2xl">
                      {program.summary}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-base font-bold text-ink tracking-wide mb-3">
                        Core Field Deliverables
                      </h4>
                      <ul className="space-y-3">
                        {program.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] sm:text-base text-ink-muted leading-relaxed"
                          >
                            <span className="font-mono-data text-sm text-accent mt-1 shrink-0">
                              —
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[15px] sm:text-base text-ink leading-relaxed max-w-lg">
                      <span className="font-bold text-accent">Observed Outcome: </span>
                      {program.outcomeNote}
                    </p>

                    <button
                      type="button"
                      onClick={onNavigateSupport}
                      aria-label={`Fund ${program.title} program`}
                      className="text-[15px] font-semibold text-cobalt hover:text-accent underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Fund this program
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {showUrgency && (
      <>
      {/* Urgency: Holistic Safe Shelter Mandate */}
      <section id="urgency" className="py-14 lg:py-18 bg-surface border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs font-bold text-gold tracking-wide uppercase">
                  Urgency · Shelter &amp; Child Dignity
                </p>
                <h2
                  className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  The urgency of safe shelter for steady learning.
                </h2>
              </div>

              <figure>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-rule bg-surface-raised">
                  <ResilientImage
                    src="/assets/aistudio/WhatsApp_Image_2026-04-16_at_1.36.55_PM_9f3eb050.jpeg"
                    alt="Children and families outside corrugated and makuti-thatched shelters in coastal Malindi, Kenya"
                    fallbackTitle="Malindi Community Housing Field Visit"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs text-ink-subtle italic leading-relaxed">
                  Fig. 5 — Field outreach in Malindi assessing vulnerable household shelter conditions alongside education and nutrition support.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7 space-y-4 lg:pt-6">
              <p className="text-base leading-relaxed text-ink-muted">
                Alongside our core education, nutrition, and household assessment programs, Boresha Elimu Initiative CBO was founded on a third essential pillar: proper housing for vulnerable children and their guardians.
              </p>
              <p className="text-base leading-relaxed text-ink-muted">
                Leaky roofs, unsafe structures, and overcrowded sleeping spaces directly undermine school attendance and evening study along the coastal region. As resources and partnerships grow across our programs, our community housing support targets emergency home repairs, dry sleeping quarters, and safe domestic environments for the highest-risk families in our 100+ child network.
              </p>

              <div className="pt-4 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="font-display text-lg font-bold text-ink">Better Education</p>
                  <p className="mt-1 text-xs text-ink-subtle leading-relaxed">
                    Tuition fees, learning materials &amp; transparent enrollment
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-ink">Good Nutrition</p>
                  <p className="mt-1 text-xs text-ink-subtle leading-relaxed">
                    School feeding &amp; budget-contingent household food support
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-ink">Proper Housing</p>
                  <p className="mt-1 text-xs text-ink-subtle leading-relaxed">
                    Safe, weather-resilient shelter advocacy &amp; family stability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiary Follow-Ups: Measuring Progress & Project Viability */}
      <section id="follow-ups" className="py-14 lg:py-18 border-b border-rule">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-bold text-accent tracking-wide uppercase">
                  Our Programs · Progress &amp; Project Viability
                </p>
                <h2
                  className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Beneficiary Follow-Ups
                </h2>
              </div>

              <p className="text-base leading-relaxed text-ink-muted">
                Support does not end at enrollment. Regular beneficiary follow-ups with learners, parents, guardians, and partner schools allow Boresha Elimu Initiative CBO to measure both individual child progress and the long-term viability of the project.
              </p>

              <p className="text-base leading-relaxed text-ink-muted">
                Through scheduled school check-ins, termly guardian gatherings, and home progress reviews, our team verifies that tuition, scholastic materials, and nutritional support are translating into consistent attendance, stronger academic performance, and lasting household stability.
              </p>

              <ul className="pt-2 space-y-2.5 border-t border-rule">
                <li className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                  <span className="font-mono-data text-xs text-accent mt-1 shrink-0">—</span>
                  <span>Termly academic and attendance tracking across all 100+ sponsored learners</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                  <span className="font-mono-data text-xs text-accent mt-1 shrink-0">—</span>
                  <span>Direct guardian and community feedback forums to evaluate household wellbeing</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                  <span className="font-mono-data text-xs text-accent mt-1 shrink-0">—</span>
                  <span>Continuous impact reviews guiding budget allocation and project viability</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <figure>
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-rule bg-surface">
                  <ResilientImage
                    src="/assets/aistudio/IMG_9636_ac80224b.JPG"
                    alt="Beneficiary learners, mothers, and guardians seated together during a Boresha Elimu Initiative CBO follow-up forum in Malindi beneath the organization banner"
                    fallbackTitle="Malindi Beneficiary Follow-Up Gathering"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <figcaption className="mt-2.5 text-xs text-ink-subtle italic leading-relaxed">
                  Fig. 6 — Beneficiary follow-up forum bringing together sponsored learners, parents, and guardians in Malindi to review progress and household support.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      </>
      )}
    </>
  );
}
