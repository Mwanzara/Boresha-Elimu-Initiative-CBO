import { ORGANIZATION_INFO } from '../data/organizationData';
import { type PageId } from '../data/pages';

interface FooterProps {
  onNavigate: (pageId: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleSelect = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-accent-hover text-canvas py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-canvas/20">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-canvas">
              {ORGANIZATION_INFO.name}
            </p>
            <p className="text-sm text-canvas/85 leading-relaxed max-w-sm">
              Founded in {ORGANIZATION_INFO.foundedYear} to support vulnerable and less privileged children in Malindi, coastal Kenya, with quality education, good nutrition, and proper housing.
            </p>
            <blockquote className="pt-2 border-t border-canvas/20 max-w-sm">
              <p className="font-display italic text-sm text-canvas/95 leading-snug">
                “{ORGANIZATION_INFO.slogan}”
              </p>
              <footer className="mt-1 text-xs font-semibold text-[#E6C767]">
                — {ORGANIZATION_INFO.sloganRef}
              </footer>
            </blockquote>
            <p className="text-xs text-[#E6C767]">
              {ORGANIZATION_INFO.recognition}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-bold text-[#E6C767] uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-canvas/85">
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('cover')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Cover Page
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('mission')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Who We Are
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('team')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('programs')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Our Programs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('urgency')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Urgency
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('distribution')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Beneficiary Distribution
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('impact')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Two-Year Impact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('gallery')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('support')}
                  className="hover:text-[#E6C767] hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Sponsor a Child
                </button>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-xs font-bold text-[#E6C767] uppercase tracking-wider">
              Malindi Contact
            </h3>
            <address className="not-italic text-sm text-canvas/85 space-y-1.5">
              <p>{ORGANIZATION_INFO.address}</p>
              <p>{ORGANIZATION_INFO.region}</p>
              <p className="pt-1">
                <a
                  href={ORGANIZATION_INFO.emailHref}
                  aria-label={`Email Boresha Elimu Initiative CBO at ${ORGANIZATION_INFO.email}`}
                  className="font-mono-data text-[#E6C767] hover:text-canvas hover:underline underline-offset-4"
                >
                  {ORGANIZATION_INFO.email}
                </a>
              </p>
              <p>
                <a
                  href={ORGANIZATION_INFO.phoneHref}
                  aria-label={`Call Boresha Elimu Initiative CBO at ${ORGANIZATION_INFO.phone}`}
                  className="font-mono-data text-[#E6C767] hover:text-canvas hover:underline underline-offset-4"
                >
                  {ORGANIZATION_INFO.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-canvas/75">
          <p>© {new Date().getFullYear()} {ORGANIZATION_INFO.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => handleSelect('cover')}
            aria-label="Scroll to top and return to Cover Page"
            className="font-semibold text-[#E6C767] hover:text-canvas underline underline-offset-4 cursor-pointer"
          >
            Back to Cover Page
          </button>
        </div>
      </div>
    </footer>
  );
}
