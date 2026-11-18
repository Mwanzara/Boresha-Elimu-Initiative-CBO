import { useState } from 'react';
import {
  PDF_BENEFICIARY_DISTRIBUTION,
  PDF_POPULATION_PROGRESSION,
  type VillageNeedDistribution,
} from '../data/organizationData';

type DistributionTab = 'needs-chart' | 'progression';

interface BeneficiaryDistributionProps {
  onNavigateSupport?: () => void;
}

const AREA_TABLE_ORDER = ['Maweni', 'Takaye', 'Kwachocha', 'Ngala'];

const NEED_SERIES = [
  {
    key: 'educationalNeeds' as const,
    label: 'Educational needs',
    color: '#2B1EC4',
    dotClass: 'bg-cobalt',
    textClass: 'text-cobalt',
  },
  {
    key: 'nutritionalNeeds' as const,
    label: 'Nutritional needs',
    color: '#6A080D',
    dotClass: 'bg-accent',
    textClass: 'text-accent',
  },
  {
    key: 'shelterSupport' as const,
    label: 'Shelter Support',
    color: '#8F6B06',
    dotClass: 'bg-gold',
    textClass: 'text-gold',
  },
];

const PROGRESSION_SERIES = [
  {
    key: 'currentPopulation' as const,
    label: 'Current Population',
    color: '#2B1EC4',
    dotClass: 'bg-cobalt',
  },
  {
    key: 'projectedJune' as const,
    label: 'Projected Population for June',
    color: '#6A080D',
    dotClass: 'bg-accent',
  },
  {
    key: 'endOfYearProjection' as const,
    label: 'End of year projections',
    color: '#8F6B06',
    dotClass: 'bg-gold',
  },
];

export function BeneficiaryDistribution({ onNavigateSupport }: BeneficiaryDistributionProps) {
  const [activeTab, setActiveTab] = useState<DistributionTab>('needs-chart');
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);

  const totalBaseline = PDF_BENEFICIARY_DISTRIBUTION.reduce(
    (sum, item) => sum + item.totalBeneficiaries,
    0,
  );
  const totalEducational = PDF_BENEFICIARY_DISTRIBUTION.reduce(
    (sum, item) => sum + item.educationalNeeds,
    0,
  );
  const totalNutritional = PDF_BENEFICIARY_DISTRIBUTION.reduce(
    (sum, item) => sum + item.nutritionalNeeds,
    0,
  );
  const totalShelter = PDF_BENEFICIARY_DISTRIBUTION.reduce(
    (sum, item) => sum + item.shelterSupport,
    0,
  );

  const areaRows: VillageNeedDistribution[] = AREA_TABLE_ORDER.map((name) =>
    PDF_BENEFICIARY_DISTRIBUTION.find((row) => row.village === name),
  ).filter((row): row is VillageNeedDistribution => Boolean(row));

  const activeVillageRecord =
    PDF_BENEFICIARY_DISTRIBUTION.find((item) => item.village === selectedVillage) ?? null;

  // Chart geometry for Clustered Column Chart (0..70 Y-axis)
  const chartW = 760;
  const chartH = 340;
  const padLeft = 74;
  const padRight = 28;
  const padTop = 28;
  const padBottom = 46;
  const plotW = chartW - padLeft - padRight;
  const plotH = chartH - padTop - padBottom;
  const maxY = 70;
  const yTicks = [0, 10, 20, 30, 40, 50, 60, 70];

  const yToPx = (val: number) => padTop + plotH - (val / maxY) * plotH;
  const groupCount = PDF_BENEFICIARY_DISTRIBUTION.length;
  const groupStep = plotW / groupCount;
  const barWidth = 30;
  const barGap = 8;
  const clusterWidth = barWidth * 3 + barGap * 2;

  // Dynamic least-squares linear trendline across Educational needs
  const eduVals = PDF_BENEFICIARY_DISTRIBUTION.map((d) => d.educationalNeeds);
  const meanX = (eduVals.length - 1) / 2;
  const meanY = eduVals.reduce((sum, v) => sum + v, 0) / eduVals.length;
  const num = eduVals.reduce((sum, v, idx) => sum + (idx - meanX) * (v - meanY), 0);
  const den = eduVals.reduce((sum, _, idx) => sum + (idx - meanX) ** 2, 0);
  const slope = den > 0 ? num / den : 0;
  const intercept = meanY - slope * meanX;
  const trendStartX = padLeft + groupStep * 0.5;
  const trendEndX = padLeft + groupStep * (groupCount - 0.5);
  const trendStartY = yToPx(intercept);
  const trendEndY = yToPx(intercept + slope * (groupCount - 1));

  // Chart geometry for Graphical Population Progression (0..240 Y-axis)
  const progW = 760;
  const progH = 370;
  const progPadLeft = 64;
  const progPadRight = 36;
  const progPadTop = 32;
  const progPadBottom = 48;
  const progPlotW = progW - progPadLeft - progPadRight;
  const progPlotH = progH - progPadTop - progPadBottom;
  const progMaxY = 240;
  const progYTicks = [0, 30, 60, 90, 120, 150, 180, 210, 240];

  const progYToPx = (val: number) => progPadTop + progPlotH - (val / progMaxY) * progPlotH;
  const progXAt = (idx: number) =>
    progPadLeft + ((idx + 0.5) / PDF_POPULATION_PROGRESSION.length) * progPlotW;

  const progressionTotals = {
    currentPopulation: PDF_POPULATION_PROGRESSION.reduce((s, r) => s + r.currentPopulation, 0),
    projectedJune: PDF_POPULATION_PROGRESSION.reduce((s, r) => s + r.projectedJune, 0),
    endOfYearProjection: PDF_POPULATION_PROGRESSION.reduce(
      (s, r) => s + r.endOfYearProjection,
      0,
    ),
  };

  return (
    <section id="distribution" className="py-16 lg:py-24 border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header + Chart View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-ink">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-accent tracking-wide uppercase">
              Beneficiary Distribution · Malindi Progress Report
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Beneficiary Distribution by Village &amp; Nature of Need
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
              Distribution of 125 beneficiary children across Maweni, Ngala, Takaye, and Kwachocha, scaled proportionally from the Malindi Progress Report ratios by nature of need.
            </p>
          </div>

          <div
            role="group"
            aria-label="Select beneficiary report view"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface border border-rule rounded-lg self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setActiveTab('needs-chart')}
              aria-pressed={activeTab === 'needs-chart'}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'needs-chart'
                  ? 'bg-accent text-canvas'
                  : 'text-ink-muted hover:text-ink hover:bg-canvas/70'
              }`}
            >
              Needs Distribution Chart
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('progression')}
              aria-pressed={activeTab === 'progression'}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'progression'
                  ? 'bg-accent text-canvas'
                  : 'text-ink-muted hover:text-ink hover:bg-canvas/70'
              }`}
            >
              Population Progression
            </button>
          </div>
        </div>

        {/* Report Summary Strip */}
        <div
          className="mt-8 pb-8 border-b border-rule grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0"
          aria-label="Progress report summary metrics"
        >
          <div className="lg:pr-6 lg:border-r lg:border-rule">
            <p className="font-display text-3xl sm:text-4xl font-bold text-ink tabular-nums">
              {totalBaseline}
            </p>
            <p className="mt-1 text-sm font-bold text-accent">Total Beneficiary Children</p>
            <p className="mt-1 text-xs text-ink-subtle">4 Malindi catchment areas using report ratios</p>
          </div>

          <div className="lg:px-6 lg:border-r lg:border-rule">
            <p className="font-display text-3xl sm:text-4xl font-bold text-cobalt tabular-nums">
              {totalEducational}
            </p>
            <p className="mt-1 text-sm font-bold text-ink">Educational Needs (100%)</p>
            <p className="mt-1 text-xs text-ink-subtle">Tuition, school kits &amp; attendance follow-up</p>
          </div>

          <div className="lg:px-6 lg:border-r lg:border-rule">
            <p className="font-display text-3xl sm:text-4xl font-bold text-accent tabular-nums">
              {totalNutritional}
            </p>
            <p className="mt-1 text-sm font-bold text-ink">Nutritional Needs (52%)</p>
            <p className="mt-1 text-xs text-ink-subtle">School meals &amp; household food baskets</p>
          </div>

          <div className="lg:pl-6">
            <p className="font-display text-3xl sm:text-4xl font-bold text-gold tabular-nums">
              {totalShelter}
            </p>
            <p className="mt-1 text-sm font-bold text-ink">Shelter Support (16%)</p>
            <p className="mt-1 text-xs text-ink-subtle">Critical housing &amp; safe shelter referrals</p>
          </div>
        </div>

        {activeTab === 'needs-chart' ? (
          <div className="mt-10 space-y-10">
            {/* Clustered Column Chart + Attached Data Table (PDF Page 4) */}
            <div className="bg-surface-raised border border-rule rounded-lg p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-rule">
                <div>
                  <p className="font-mono-data text-xs font-bold text-gold uppercase tracking-wider">
                    Malindi Progress Report · Chart &amp; Data Table
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink tracking-tight uppercase">
                    Beneficiary Distribution Chart
                  </h3>
                  <p className="mt-1 text-xs text-ink-subtle">
                    Select any village column to highlight its needs breakdown across both chart and table.
                  </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
                  {NEED_SERIES.map((series) => (
                    <span key={series.key} className="inline-flex items-center gap-2 font-medium">
                      <span
                        className={`w-3 h-3 rounded-xs inline-block ${series.dotClass}`}
                        aria-hidden="true"
                      />
                      {series.label}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span
                      className="w-5 border-t-2 border-dashed border-cobalt inline-block"
                      aria-hidden="true"
                    />
                    Linear (Educational needs)
                  </span>
                </div>
              </div>

              {/* SVG Clustered Column Chart */}
              <div className="mt-6 overflow-x-auto">
                <svg
                  viewBox={`0 0 ${chartW} ${chartH}`}
                  className="w-full min-w-[620px] h-auto select-none"
                  role="img"
                  aria-label="Beneficiary Distribution Chart comparing Educational needs, Nutritional needs, and Shelter Support across Maweni, Ngala, Takaye, and Kwachocha"
                >
                  {/* Horizontal grid lines + Y-axis labels */}
                  {yTicks.map((tick) => {
                    const y = yToPx(tick);
                    return (
                      <g key={tick}>
                        <line
                          x1={padLeft}
                          x2={chartW - padRight}
                          y1={y}
                          y2={y}
                          stroke={tick === 0 ? '#1B0B0C' : '#E2D4CE'}
                          strokeWidth={tick === 0 ? 1.25 : 1}
                        />
                        <text
                          x={padLeft - 12}
                          y={y + 4}
                          textAnchor="end"
                          className="fill-ink-subtle text-[11px] font-mono-data"
                        >
                          {tick}
                        </text>
                      </g>
                    );
                  })}

                  {/* Y-axis vertical label */}
                  <text
                    x={20}
                    y={padTop + plotH / 2}
                    textAnchor="middle"
                    transform={`rotate(-90 20 ${padTop + plotH / 2})`}
                    className="fill-ink-muted text-[11px] font-semibold"
                  >
                    Distribution according to nature of need
                  </text>

                  {/* Village Bar Clusters */}
                  {PDF_BENEFICIARY_DISTRIBUTION.map((row, groupIdx) => {
                    const groupLeft = padLeft + groupIdx * groupStep;
                    const groupCenter = groupLeft + groupStep / 2;
                    const clusterStart = groupCenter - clusterWidth / 2;
                    const isSelected = selectedVillage === row.village;
                    const isDimmed = selectedVillage !== null && !isSelected;

                    const values = [
                      { value: row.educationalNeeds, color: '#2B1EC4', label: 'Educational needs' },
                      { value: row.nutritionalNeeds, color: '#6A080D', label: 'Nutritional needs' },
                      { value: row.shelterSupport, color: '#8F6B06', label: 'Shelter Support' },
                    ];

                    return (
                      <g
                        key={row.village}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${row.village}: ${row.educationalNeeds} educational needs, ${row.nutritionalNeeds} nutritional needs, ${row.shelterSupport} shelter support. Select to highlight.`}
                        className="cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-cobalt"
                        onClick={() =>
                          setSelectedVillage((prev) => (prev === row.village ? null : row.village))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedVillage((prev) =>
                              prev === row.village ? null : row.village,
                            );
                          }
                        }}
                        opacity={isDimmed ? 0.35 : 1}
                      >
                        {/* Subtle highlight column behind hovered/selected village */}
                        <rect
                          x={groupLeft + 8}
                          y={padTop}
                          width={groupStep - 16}
                          height={plotH}
                          rx={4}
                          fill={isSelected ? '#F4ECE8' : 'transparent'}
                        />

                        {values.map((bar, barIdx) => {
                          const bx = clusterStart + barIdx * (barWidth + barGap);
                          const by = yToPx(bar.value);
                          const bh = Math.max(2, yToPx(0) - by);
                          return (
                            <g key={bar.label}>
                              <rect
                                x={bx}
                                y={by}
                                width={barWidth}
                                height={bh}
                                rx={2}
                                fill={bar.color}
                              >
                                <title>{`${row.village} — ${bar.label}: ${bar.value}`}</title>
                              </rect>
                              <text
                                x={bx + barWidth / 2}
                                y={by - 6}
                                textAnchor="middle"
                                className="fill-ink text-[11px] font-bold font-mono-data"
                              >
                                {bar.value}
                              </text>
                            </g>
                          );
                        })}

                        {/* X-axis Village Label */}
                        <text
                          x={groupCenter}
                          y={chartH - 18}
                          textAnchor="middle"
                          className={`text-[12px] font-bold ${
                            isSelected ? 'fill-accent' : 'fill-ink'
                          }`}
                        >
                          {row.village}
                        </text>
                      </g>
                    );
                  })}

                  {/* Dashed Linear Trendline across Educational needs */}
                  <line
                    x1={trendStartX}
                    y1={trendStartY}
                    x2={trendEndX}
                    y2={trendEndY}
                    stroke="#2B1EC4"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    pointerEvents="none"
                  />
                  <circle cx={trendStartX} cy={trendStartY} r={3} fill="#2B1EC4" />
                  <circle cx={trendEndX} cy={trendEndY} r={3} fill="#2B1EC4" />

                  {/* X-axis caption */}
                  <text
                    x={padLeft + plotW / 2}
                    y={chartH - 2}
                    textAnchor="middle"
                    className="fill-ink-subtle text-[11px] font-semibold"
                  >
                    Population Distribution Per Village
                  </text>
                </svg>
              </div>

              {/* Attached Tabulated Matrix Directly Beneath Chart */}
              <div className="mt-4 border border-rule rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface border-b border-rule text-xs font-bold text-ink">
                        <th scope="col" className="py-3 px-4">
                          Nature of Need
                        </th>
                        {PDF_BENEFICIARY_DISTRIBUTION.map((row) => {
                          const isSelected = selectedVillage === row.village;
                          return (
                            <th
                              key={row.village}
                              scope="col"
                              className={`py-3 px-4 text-center transition-colors ${
                                isSelected ? 'bg-accent text-canvas' : ''
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedVillage((prev) =>
                                    prev === row.village ? null : row.village,
                                  )
                                }
                                aria-pressed={isSelected}
                                aria-label={`Highlight ${row.village} village data (${row.totalBeneficiaries} beneficiaries)`}
                                className="font-bold cursor-pointer hover:underline underline-offset-4"
                              >
                                {row.village}
                              </button>
                            </th>
                          );
                        })}
                        <th scope="col" className="py-3 px-4 text-right font-bold">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule text-sm">
                      {NEED_SERIES.map((series) => {
                        const rowTotal = PDF_BENEFICIARY_DISTRIBUTION.reduce(
                          (sum, r) => sum + r[series.key],
                          0,
                        );
                        return (
                          <tr key={series.key} className="bg-surface-raised">
                            <th scope="row" className="py-3 px-4 font-semibold text-ink">
                              <span className="inline-flex items-center gap-2.5">
                                <span
                                  className={`w-3 h-3 rounded-xs shrink-0 ${series.dotClass}`}
                                  aria-hidden="true"
                                />
                                {series.label}
                              </span>
                            </th>
                            {PDF_BENEFICIARY_DISTRIBUTION.map((row) => {
                              const isSelected = selectedVillage === row.village;
                              return (
                                <td
                                  key={row.village}
                                  className={`py-3 px-4 text-center font-mono-data tabular-nums ${
                                    isSelected
                                      ? 'bg-surface font-bold text-accent'
                                      : 'text-ink-muted'
                                  }`}
                                >
                                  {row[series.key]}
                                </td>
                              );
                            })}
                            <td className="py-3 px-4 text-right font-mono-data font-bold text-ink tabular-nums">
                              {rowTotal}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {activeVillageRecord && (
                  <div className="px-4 py-3 bg-surface border-t border-rule flex flex-wrap items-center justify-between gap-3 text-xs">
                    <p className="text-ink-muted">
                      <span className="font-bold text-accent">{activeVillageRecord.village}:</span>{' '}
                      {activeVillageRecord.totalBeneficiaries} beneficiaries ·{' '}
                      {activeVillageRecord.keyNeedsIdentified}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedVillage(null)}
                      aria-label={`Clear ${activeVillageRecord.village} village highlight`}
                      className="font-semibold text-cobalt hover:text-accent underline underline-offset-4 cursor-pointer"
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Beneficiary Distribution by Area Table (PDF Pages 3-4) */}
            <div className="bg-surface-raised border border-rule rounded-lg p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-rule">
                <div>
                  <p className="font-mono-data text-xs font-bold text-gold uppercase tracking-wider">
                    Geographical Coverage · Malindi Sub-County
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
                    Beneficiary Distribution by Area
                  </h3>
                </div>
                <p className="text-xs text-ink-subtle">
                  Household placement verified by CBO field officers &amp; village elders
                </p>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-ink text-xs font-bold uppercase tracking-wider text-ink-subtle">
                      <th scope="col" className="py-3 pr-4">
                        Area
                      </th>
                      <th scope="col" className="py-3 px-4 text-right">
                        Number of Beneficiaries
                      </th>
                      <th scope="col" className="py-3 px-4 text-right">
                        Share
                      </th>
                      <th scope="col" className="py-3 pl-4">
                        Key Needs Identified
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule text-sm">
                    {areaRows.map((row) => {
                      const sharePct = Math.round((row.totalBeneficiaries / totalBaseline) * 100);
                      const isSelected = selectedVillage === row.village;
                      return (
                        <tr
                          key={row.village}
                          className={isSelected ? 'bg-surface' : 'hover:bg-surface/50'}
                        >
                          <th scope="row" className="py-3.5 pr-4 font-bold text-ink">
                            {row.village}
                          </th>
                          <td className="py-3.5 px-4 text-right font-mono-data font-bold text-accent tabular-nums">
                            {row.totalBeneficiaries}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono-data text-ink-subtle tabular-nums">
                            {sharePct}%
                          </td>
                          <td className="py-3.5 pl-4 text-ink-muted">{row.keyNeedsIdentified}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-ink bg-surface/60 text-sm font-bold text-ink">
                      <th scope="row" className="py-3.5 pr-4">
                        Total
                      </th>
                      <td className="py-3.5 px-4 text-right font-mono-data text-accent tabular-nums">
                        {totalBaseline}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono-data tabular-nums">100%</td>
                      <td className="py-3.5 pl-4 text-xs font-normal text-ink-subtle">
                        Proportional distribution across 125 enrolled beneficiary children in Malindi
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Graphical Population Progression & Table (PDF Page 5) */
          <div className="mt-10 bg-surface-raised border border-rule rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-rule">
              <div>
                <p className="font-mono-data text-xs font-bold text-gold uppercase tracking-wider">
                  Malindi Progress Report · Growth Projections
                </p>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
                  Graphical Population Progression
                </h3>
                <p className="mt-1 text-xs text-ink-subtle">
                  Number of beneficiaries reached across intervals, including expansion into Ganda.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
                {PROGRESSION_SERIES.map((series) => (
                  <span key={series.key} className="inline-flex items-center gap-2 font-medium">
                    <span
                      className={`w-3 h-3 rounded-xs inline-block ${series.dotClass}`}
                      aria-hidden="true"
                    />
                    {series.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <svg
                viewBox={`0 0 ${progW} ${progH}`}
                className="w-full min-w-[620px] h-auto select-none"
                role="img"
                aria-label="Graphical Population Progression comparing Current Population, Projected Population for June, and End of year projections across Maweni, Kwachocha, Ngala, Takaye, and Ganda"
              >
                {progYTicks.map((tick) => {
                  const y = progYToPx(tick);
                  return (
                    <g key={tick}>
                      <line
                        x1={progPadLeft}
                        x2={progW - progPadRight}
                        y1={y}
                        y2={y}
                        stroke={tick === 0 ? '#1B0B0C' : '#E2D4CE'}
                        strokeWidth={tick === 0 ? 1.25 : 1}
                      />
                      <text
                        x={progPadLeft - 10}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-ink-subtle text-[11px] font-mono-data"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                <text
                  x={18}
                  y={progPadTop + progPlotH / 2}
                  textAnchor="middle"
                  transform={`rotate(-90 18 ${progPadTop + progPlotH / 2})`}
                  className="fill-ink-muted text-[11px] font-semibold"
                >
                  Number of Beneficiaries
                </text>

                {PROGRESSION_SERIES.map((series) => {
                  const points = PDF_POPULATION_PROGRESSION.map((pt, idx) => ({
                    x: progXAt(idx),
                    y: progYToPx(pt[series.key]),
                    val: pt[series.key],
                    village: pt.village,
                  }));
                  const polylinePts = points.map((p) => `${p.x},${p.y}`).join(' ');

                  return (
                    <g key={series.key}>
                      <polyline
                        fill="none"
                        stroke={series.color}
                        strokeWidth={2.5}
                        points={polylinePts}
                      />
                      {points.map((p) => {
                        const labelX =
                          series.key === 'currentPopulation'
                            ? p.x + 10
                            : series.key === 'projectedJune'
                              ? p.x - 10
                              : p.x;
                        const labelY =
                          series.key === 'endOfYearProjection'
                            ? p.y - 11
                            : series.key === 'currentPopulation' && p.val === 0
                              ? p.y - 7
                              : p.y + 4;
                        const anchor =
                          series.key === 'currentPopulation'
                            ? 'start'
                            : series.key === 'projectedJune'
                              ? 'end'
                              : 'middle';

                        return (
                          <g key={`${series.key}-${p.village}`}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={4.5}
                              fill="#FFFFFF"
                              stroke={series.color}
                              strokeWidth={2.5}
                            >
                              <title>{`${p.village} — ${series.label}: ${p.val}`}</title>
                            </circle>
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor={anchor}
                              className="fill-ink text-[11px] font-bold font-mono-data"
                            >
                              {p.val}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}

                {PDF_POPULATION_PROGRESSION.map((pt, idx) => (
                  <text
                    key={pt.village}
                    x={progXAt(idx)}
                    y={progH - 16}
                    textAnchor="middle"
                    className="fill-ink text-[12px] font-bold"
                  >
                    {pt.village}
                  </text>
                ))}
              </svg>
            </div>

            {/* Tabulated Progression Matrix */}
            <div className="border border-rule rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-surface border-b border-rule text-xs font-bold text-ink">
                      <th scope="col" className="py-3 px-4">
                        Number of Beneficiaries Reached at Different Intervals
                      </th>
                      {PDF_POPULATION_PROGRESSION.map((pt) => (
                        <th key={pt.village} scope="col" className="py-3 px-4 text-center">
                          {pt.village}
                        </th>
                      ))}
                      <th scope="col" className="py-3 px-4 text-right">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule text-sm">
                    {PROGRESSION_SERIES.map((series) => (
                      <tr key={series.key} className="bg-surface-raised">
                        <th scope="row" className="py-3 px-4 font-semibold text-ink">
                          <span className="inline-flex items-center gap-2.5">
                            <span
                              className={`w-3 h-3 rounded-xs shrink-0 ${series.dotClass}`}
                              aria-hidden="true"
                            />
                            {series.label}
                          </span>
                        </th>
                        {PDF_POPULATION_PROGRESSION.map((pt) => (
                          <td
                            key={pt.village}
                            className="py-3 px-4 text-center font-mono-data text-ink-muted tabular-nums"
                          >
                            {pt[series.key]}
                          </td>
                        ))}
                        <td className="py-3 px-4 text-right font-mono-data font-bold text-ink tabular-nums">
                          {progressionTotals[series.key]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Fair Enrollment Verification Note */}
        <div className="mt-8 pt-6 border-t border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-ink-muted max-w-3xl leading-relaxed">
            <span className="font-bold text-accent">Transparent Placement: </span>
            All beneficiary distributions are audited through joint household assessments conducted by CBO field officers and community representatives, ensuring support reaches the most vulnerable families without favoritism.
          </p>
          {onNavigateSupport && (
            <button
              type="button"
              onClick={onNavigateSupport}
              aria-label="Partner with Boresha Elimu Initiative CBO on the Support page"
              className="text-sm font-semibold text-cobalt hover:text-accent underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Partner with us
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
