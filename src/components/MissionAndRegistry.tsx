import { ResilientImage } from './ResilientImage';

export function MissionAndRegistry() {
  return (
    <section id="mission" className="py-16 lg:py-24 border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left 7 columns: Founding narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-base sm:text-lg font-bold text-accent tracking-wide">
                Who We Are
              </p>
              <h2
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Born in Malindi. Trusted by the Community.{' '}
                <span className="text-accent">Accountable for Every Child.</span>
              </h2>
            </div>

            <div className="space-y-4 text-base leading-[1.7] text-ink-muted max-w-2xl">
              <p className="first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]">
                Boresha Elimu Initiative CBO was established in 2024 in Malindi along Kenya’s coastal region with a clear grassroots mandate: ensuring vulnerable and less privileged children are never excluded from school due to poverty, hunger, or unsafe living conditions.
              </p>
              <p>
                Recognized and formally registered with both community elders and the local government, the organization operates regardless of race, religion, or culture—serving vulnerable children equitably across Malindi’s diverse communities and bridging household hardship with classroom persistence. Within our first two years, we have enrolled over 100 children—providing full sponsorships for orphans and acutely vulnerable households, and partial sponsorships that partner alongside families able to contribute modestly.
              </p>
              <p>
                Our approach treats child welfare as interconnected. A child thrives academically only when school fees and learning materials are covered, daily nutrition is assured, long interior commutes are made safe, and home shelter provides dignity and rest.
              </p>
            </div>

            {/* Quiet pull quote with top/bottom hairline rules */}
            <blockquote className="py-5 my-2 border-y border-rule">
              <p className="font-display italic text-xl sm:text-2xl text-ink leading-snug">
                “Every child in Malindi deserves an uninterrupted seat in class, a nourishing meal each day, and a safe home to return to.”
              </p>
              <footer className="mt-2 text-xs text-ink-subtle">
                Founding Charter · Boresha Elimu Initiative CBO, Est. 2024
              </footer>
            </blockquote>
          </div>

          {/* Right 5 columns: Who We Are featured photos */}
          <div className="lg:col-span-5 space-y-6">
            <figure>
              <div className="overflow-hidden rounded-lg bg-accent-hover p-2.5 border border-gold-bright/60 shadow-sm">
                <div className="overflow-hidden rounded-md bg-surface">
                  <ResilientImage
                    src="/assets/aistudio/IMG_9580_095b4949.JPG"
                    alt="Young girl enrolled through Boresha Elimu Initiative CBO in Malindi, Kenya, representing inclusive support regardless of race, religion, or culture"
                    fallbackTitle="Boresha Elimu Initiative CBO Beneficiary"
                    className="w-full h-auto block object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-2.5 text-xs text-ink-subtle italic leading-relaxed">
                Boresha Elimu Initiative CBO — Serving children across Malindi regardless of race, religion, or culture.
              </figcaption>
            </figure>

            <figure>
              <div className="overflow-hidden rounded-lg border border-rule bg-surface">
                <ResilientImage
                  src="/assets/aistudio/IMG_9893_f86b7070.JPG"
                  alt="Boresha Elimu Initiative CBO representative standing with two sponsored schoolgirls from different backgrounds in front of the organization banner in Malindi"
                  fallbackTitle="Boresha Elimu Initiative CBO Leadership & Learners"
                  className="w-full h-auto block object-cover object-top"
                />
              </div>
              <figcaption className="mt-2.5 text-xs text-ink-subtle italic leading-relaxed">
                Standing together with learners across communities—uniting education, empowerment, and inclusive care in Malindi.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
