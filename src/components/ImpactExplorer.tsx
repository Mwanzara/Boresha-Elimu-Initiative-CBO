import { useState } from 'react';
import {
  COMMUNITY_PERSPECTIVES,
  ENROLLMENT_TIMELINE,
  OUTCOME_METRICS,
} from '../data/organizationData';

type ImpactView = 'enrollment' | 'outcomes' | 'sponsorship';

export function ImpactExplorer() {
  const [activeView, setActiveView] = useState<ImpactView>('enrollment');
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState<number>(ENROLLMENT_TIMELINE.length - 1);

  const selectedCohort = ENROLLMENT_TIMELINE[selectedPeriodIdx];
  const maxChildren = 140;

  return (
    <section id="impact" className="py-16 lg:py-24 border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-ink">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-accent tracking-wide uppercase">
              Two-Year Impact &amp; Field Outcomes
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Measurable growth in enrollment, daily attendance, and academic results.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Select impact data view"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface border border-rule rounded-lg self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setActiveView('enrollment')}
              aria-pressed={activeView === 'enrollment'}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'enrollment'
                  ? 'bg-accent text-canvas'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Enrollment Growth
            </button>
            <button
              type="button"
              onClick={() => setActiveView('sponsorship')}
              aria-pressed={activeView === 'sponsorship'}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'sponsorship'
                  ? 'bg-accent text-canvas'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Full vs. Partial Split
            </button>
            <button
              type="button"
              onClick={() => setActiveView('outcomes')}
              aria-pressed={activeView === 'outcomes'}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'outcomes'
                  ? 'bg-accent text-canvas'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Attendance &amp; Academics
            </button>
          </div>
        </div>

        {/* Interactive Visualization Stage */}
        <div className="mt-10 bg-surface-raised border border-rule rounded-lg p-6 sm:p-8">
          {activeView === 'enrollment' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      Cumulative Children Enrolled (2024–2026)
                    </h3>
                    <p className="text-xs text-ink-subtle mt-1">
                      Select any term column below to inspect full vs. partial cohort milestones
                    </p>
                  </div>
                  <p className="font-mono-data text-xs font-semibold text-accent">
                    125 children enrolled in Year 2
                  </p>
                </div>

                {/* Responsive Interactive Column Chart */}
                <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-64 pt-6 border-b border-ink">
                  {ENROLLMENT_TIMELINE.map((cohort, idx) => {
                    const isSelected = idx === selectedPeriodIdx;
                    const heightPct = Math.round((cohort.totalChildren / maxChildren) * 100);
                    return (
                      <button
                        key={cohort.period}
                        type="button"
                        onClick={() => setSelectedPeriodIdx(idx)}
                        aria-pressed={isSelected}
                        aria-label={`${cohort.period}: ${cohort.totalChildren} children enrolled (${cohort.fullSponsorship} full, ${cohort.partialSponsorship} partial sponsorship)`}
                        className="group flex flex-col items-center justify-end h-full focus-visible:outline-2 focus-visible:outline-cobalt rounded-xs cursor-pointer"
                      >
                        <span
                          className={`font-mono-data text-xs mb-1.5 transition-colors tabular-nums ${
                            isSelected ? 'text-accent font-bold' : 'text-ink-subtle'
                          }`}
                        >
                          {cohort.totalChildren}
                        </span>
                        <div className="w-full max-w-[64px] flex flex-col justify-end h-44 bg-surface/70 rounded-t-sm overflow-hidden">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full transition-colors flex flex-col justify-end ${
                              isSelected
                                ? 'bg-accent'
                                : 'bg-accent/45 group-hover:bg-accent/75'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-6 gap-2 sm:gap-4 pt-3">
                  {ENROLLMENT_TIMELINE.map((cohort, idx) => {
                    const isSelected = idx === selectedPeriodIdx;
                    return (
                      <button
                        key={cohort.period}
                        type="button"
                        onClick={() => setSelectedPeriodIdx(idx)}
                        aria-pressed={isSelected}
                        aria-label={`Inspect ${cohort.period} cohort details`}
                        className={`text-center text-[11px] sm:text-xs leading-tight cursor-pointer rounded-xs ${
                          isSelected ? 'text-ink font-bold' : 'text-ink-subtle'
                        }`}
                      >
                        {cohort.period}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Cohort Detail Inspector */}
              <div className="lg:col-span-4 bg-canvas border border-rule rounded-lg p-6 space-y-4">
                <p className="text-xs font-mono-data font-semibold text-gold uppercase tracking-wider">
                  {selectedCohort.period}
                </p>
                <p className="font-display text-4xl font-bold text-ink tabular-nums">
                  {selectedCohort.totalChildren} Children
                </p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {selectedCohort.milestone}
                </p>

                <dl className="pt-4 border-t border-rule space-y-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-ink-subtle">Full Sponsorship</dt>
                    <dd className="font-mono-data font-semibold text-accent tabular-nums">
                      {selectedCohort.fullSponsorship} learners
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-ink-subtle">Partial Sponsorship</dt>
                    <dd className="font-mono-data font-semibold text-cobalt tabular-nums">
                      {selectedCohort.partialSponsorship} learners
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeView === 'sponsorship' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    Full vs. Partial Sponsorship Distribution Across Cohorts
                  </h3>
                  <p className="text-xs text-ink-subtle mt-1">
                    Combining comprehensive support for acutely vulnerable children with co-funded partial sponsorships
                  </p>
                </div>
                <div className="flex items-center gap-5 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent inline-block" aria-hidden="true" />
                    Full Sponsorship
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 bg-cobalt inline-block" aria-hidden="true" />
                    Partial Sponsorship
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-ink bg-canvas text-xs text-ink-subtle">
                      <th className="py-3 px-4 font-semibold">Term / Period</th>
                      <th className="py-3 px-4 font-semibold text-right">Full</th>
                      <th className="py-3 px-4 font-semibold text-right">Partial</th>
                      <th className="py-3 px-4 font-semibold text-right">Total Enrolled</th>
                      <th className="py-3 px-4 font-semibold min-w-[180px]">Composition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {ENROLLMENT_TIMELINE.map((row) => {
                      const fullPct = Math.round((row.fullSponsorship / row.totalChildren) * 100);
                      const partialPct = 100 - fullPct;
                      return (
                        <tr key={row.period} className="hover:bg-canvas/70 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-ink">{row.period}</td>
                          <td className="py-3.5 px-4 text-right font-mono-data tabular-nums text-ink">
                            {row.fullSponsorship}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono-data tabular-nums text-ink">
                            {row.partialSponsorship}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono-data font-bold tabular-nums text-accent">
                            {row.totalChildren}
                          </td>
                          <td className="py-3.5 px-4">
                            <div
                              className="w-full h-3 flex rounded-xs overflow-hidden bg-surface"
                              role="img"
                              aria-label={`${fullPct}% full sponsorship, ${partialPct}% partial sponsorship`}
                            >
                              <div style={{ width: `${fullPct}%` }} className="bg-accent" />
                              <div style={{ width: `${partialPct}%` }} className="bg-cobalt" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'outcomes' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Observed Academic &amp; Attendance Shifts (2024–2026)
                </h3>
                <p className="text-xs text-ink-subtle mt-1">
                  Notable improvements reported across partner primary schools and Malindi interior cohorts
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-ink bg-canvas text-xs text-ink-subtle">
                      <th className="py-3 px-4 font-semibold">Outcome Area</th>
                      <th className="py-3 px-4 font-semibold">Before Intervention</th>
                      <th className="py-3 px-4 font-semibold">Current Standing</th>
                      <th className="py-3 px-4 font-semibold">Field Observation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {OUTCOME_METRICS.map((item) => (
                      <tr key={item.area} className="hover:bg-canvas/70 transition-colors">
                        <td className="py-4 px-4 font-semibold text-ink whitespace-nowrap">
                          {item.area}
                        </td>
                        <td className="py-4 px-4 text-ink-subtle">{item.baseline}</td>
                        <td className="py-4 px-4 font-semibold text-accent">{item.current}</td>
                        <td className="py-4 px-4 text-ink-muted max-w-md leading-relaxed">
                          {item.observation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Claim-to-Proof Adjacency: Community & School Voices */}
        <div className="mt-12">
          <div className="pb-4 border-b border-rule flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl font-bold text-ink">
              Beneficiary Testimonial
            </h3>
            <p className="text-xs text-ink-subtle">
              Malindi partner schools, guardians &amp; local leadership
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMMUNITY_PERSPECTIVES.map((item) => (
              <figure
                key={item.author}
                className="flex flex-col justify-between bg-surface/70 border border-rule rounded-lg p-6"
              >
                <blockquote className="text-sm leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-rule">
                  <p className="text-sm font-bold text-accent">{item.author}</p>
                  <p className="text-xs text-ink-subtle mt-0.5">
                    {item.role}
                    <span aria-hidden="true" className="mx-1.5 text-gold-bright">·</span>
                    {item.context}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
