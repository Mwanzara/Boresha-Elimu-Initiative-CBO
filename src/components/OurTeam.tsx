import { UserRound, Users } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/organizationData';
import { ResilientImage } from './ResilientImage';

export function OurTeam() {
  const leadershipMembers = TEAM_MEMBERS.slice(0, 4);
  const implementationTeam = TEAM_MEMBERS[4];

  return (
    <section id="team" className="py-16 lg:py-24 border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="pb-8 border-b border-ink max-w-3xl space-y-3">
          <p className="text-xs font-bold text-accent tracking-wide uppercase">
            Our Team · Leadership &amp; Vision Implementors
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Dedicated leadership turning community vision into daily action.
          </h2>
          <p className="text-base leading-relaxed text-ink-muted">
            Boresha Elimu Initiative CBO is guided by accountable community leadership and a hands-on implementation team working directly with schools, families, and local authorities across Malindi.
          </p>
        </div>

        {/* Ordered Executive & Administrative Leadership (01 - 04) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipMembers.map((member) => (
            <article
              key={member.id}
              className="bg-surface-raised border border-rule rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface border-b border-rule">
                {member.imageSrc ? (
                  <ResilientImage
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    fallbackTitle={member.roleTitle}
                    className={`w-full h-full object-cover ${member.imagePositionClass ?? 'object-top'}`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-surface to-canvas">
                    <div className="w-20 h-20 rounded-full border border-gold-bright/60 bg-accent-hover text-[#E6C767] flex items-center justify-center shadow-xs">
                      <UserRound className="w-9 h-9" aria-hidden="true" />
                    </div>
                    <p className="mt-4 font-mono-data text-xs font-semibold text-gold tracking-wider uppercase tabular-nums">
                      Position {member.order}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-ink">
                      {member.roleTitle}
                    </p>
                    <p className="mt-1.5 text-xs text-ink-subtle max-w-[180px]">
                      Portrait awaiting upload
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col gap-2">
                <p className="text-xs font-medium text-ink-subtle tabular-nums">
                  <span className="font-mono-data font-bold text-accent">{member.order}</span>
                  <span aria-hidden="true" className="mx-1.5 text-gold-bright">·</span>
                  <span>{member.division}</span>
                </p>
                <h3 className="font-display text-xl font-bold text-ink leading-snug">
                  {member.roleTitle}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {member.mandate}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 05: Implementation Team Spotlight */}
        {implementationTeam && (
          <article className="mt-10 bg-surface-raised border border-rule rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-rule bg-surface">
                  {implementationTeam.imageSrc ? (
                    <ResilientImage
                      src={implementationTeam.imageSrc}
                      alt={implementationTeam.imageAlt}
                      fallbackTitle={implementationTeam.roleTitle}
                      className={`w-full h-full object-cover ${implementationTeam.imagePositionClass ?? 'object-top'}`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-surface to-canvas">
                      <div className="w-20 h-20 rounded-full border border-gold-bright/60 bg-accent-hover text-[#E6C767] flex items-center justify-center shadow-xs">
                        <Users className="w-9 h-9" aria-hidden="true" />
                      </div>
                      <p className="mt-4 font-mono-data text-xs font-semibold text-gold tracking-wider uppercase tabular-nums">
                        Position {implementationTeam.order}
                      </p>
                      <p className="mt-1 font-display text-xl font-bold text-ink">
                        {implementationTeam.roleTitle}
                      </p>
                      <p className="mt-1.5 text-xs text-ink-subtle max-w-xs">
                        Group photograph awaiting upload
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <p className="text-xs font-medium text-ink-subtle tabular-nums">
                  <span className="font-mono-data font-bold text-accent">
                    {implementationTeam.order}
                  </span>
                  <span aria-hidden="true" className="mx-1.5 text-gold-bright">·</span>
                  <span>{implementationTeam.division}</span>
                </p>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
                  {implementationTeam.roleTitle}
                </h3>

                <p className="text-base text-ink-muted leading-relaxed">
                  {implementationTeam.mandate}
                </p>

                <ul className="pt-3 border-t border-rule space-y-2.5">
                  <li className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                    <span className="font-mono-data text-xs text-accent mt-1 shrink-0">—</span>
                    <span>
                      Conducting joint household assessments with village representatives to verify family need
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                    <span className="font-mono-data text-xs text-accent mt-1 shrink-0">—</span>
                    <span>
                      Coordinating termly school fee disbursements, scholastic kits, and daily school meals
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                    <span className="font-mono-data text-xs text-accent mt-1 shrink-0">—</span>
                    <span>
                      Leading ongoing beneficiary follow-ups with learners, guardians, and partner schools
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
