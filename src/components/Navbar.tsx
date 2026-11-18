import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, Menu, X } from 'lucide-react';
import { type PageId } from '../data/pages';

interface DropdownGroup {
  id: 'organization' | 'work';
  label: string;
  items: {
    label: string;
    description: string;
    pageId: PageId;
  }[];
}

const DROPDOWN_GROUPS: DropdownGroup[] = [
  {
    id: 'organization',
    label: 'Organization',
    items: [
      {
        label: 'Who We Are',
        description: 'Founding charter, community recognition & Malindi roots',
        pageId: 'mission',
      },
      {
        label: 'Our Team',
        description: 'Organizational leadership & vision implementors',
        pageId: 'team',
      },
    ],
  },
  {
    id: 'work',
    label: 'Programs & Impact',
    items: [
      {
        label: 'Our Programs',
        description: 'Tuition, scholastic materials, feeding & assessments',
        pageId: 'programs',
      },
      {
        label: 'Urgency',
        description: 'Safe shelter mandate & beneficiary follow-ups',
        pageId: 'urgency',
      },
      {
        label: 'Beneficiary Distribution',
        description: 'Malindi village coverage & progression data',
        pageId: 'distribution',
      },
      {
        label: 'Impact',
        description: 'Two-year enrollment growth & community testimonials',
        pageId: 'impact',
      },
    ],
  },
];

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (pageId: PageId) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownGroup['id'] | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (pageId: PageId) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    onNavigate(pageId);
  };

  return (
    <header className="sticky top-0 z-50 bg-accent-hover text-canvas border-t-[3px] border-gold-bright border-b border-gold-bright/25 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark returning to Cover Page */}
        <button
          type="button"
          onClick={() => handleSelect('cover')}
          aria-label="Boresha Elimu Initiative CBO — Return to Cover Page"
          className="font-display text-2xl sm:text-[1.75rem] font-bold tracking-tight text-canvas whitespace-nowrap shrink-0 hover:text-[#E6C767] transition-colors cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6C767] rounded-xs"
        >
          Boresha Elimu
        </button>

        {/* Zone 2: Standardized 4-item navigation with dropdown menus */}
        <nav
          ref={navRef}
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          <button
            type="button"
            onClick={() => handleSelect('cover')}
            aria-label="Overview — Cover Page"
            aria-current={currentPage === 'cover' ? 'page' : undefined}
            className={`text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-8 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6C767] rounded-xs ${
              currentPage === 'cover'
                ? 'text-[#E6C767] underline decoration-[#E6C767]'
                : 'text-canvas/85 hover:text-[#E6C767] hover:underline decoration-[#E6C767]/70'
            }`}
          >
            Overview
          </button>

          {DROPDOWN_GROUPS.map((group) => {
            const isGroupActive = group.items.some((item) => item.pageId === currentPage);
            const isOpen = openDropdown === group.id;

            return (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === group.id ? null : group.id))
                  }
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={`nav-menu-${group.id}`}
                  aria-label={`${group.label} navigation menu`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-8 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6C767] rounded-xs ${
                    isGroupActive || isOpen
                      ? 'text-[#E6C767] underline decoration-[#E6C767]'
                      : 'text-canvas/85 hover:text-[#E6C767] hover:underline decoration-[#E6C767]/70'
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`nav-menu-${group.id}`}
                    role="menu"
                    aria-label={`${group.label} menu`}
                    className="absolute left-0 top-full mt-3 w-80 bg-surface-raised text-ink border border-rule rounded-lg shadow-lg py-2 z-50"
                  >
                    {group.items.map((item, idx) => {
                      const isActive = currentPage === item.pageId;
                      return (
                        <button
                          key={item.pageId}
                          type="button"
                          role="menuitem"
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => handleSelect(item.pageId)}
                          className={`w-full text-left px-4 py-3 transition-colors cursor-pointer block ${
                            idx < group.items.length - 1 ? 'border-b border-rule/60' : ''
                          } ${
                            isActive
                              ? 'bg-surface text-accent'
                              : 'hover:bg-canvas text-ink'
                          }`}
                        >
                          <p className="text-sm font-bold leading-snug">{item.label}</p>
                          <p className="mt-0.5 text-xs text-ink-subtle leading-relaxed">
                            {item.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => handleSelect('gallery')}
            aria-label="Gallery — Field Activities Album and Project Video"
            aria-current={currentPage === 'gallery' ? 'page' : undefined}
            className={`text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-8 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6C767] rounded-xs ${
              currentPage === 'gallery'
                ? 'text-[#E6C767] underline decoration-[#E6C767]'
                : 'text-canvas/85 hover:text-[#E6C767] hover:underline decoration-[#E6C767]/70'
            }`}
          >
            Gallery
          </button>
        </nav>

        {/* Zone 3: High-contrast champagne-gold donor CTA + mobile drawer button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('support')}
            aria-label="Support a Child — Sponsorship and Contact"
            aria-current={currentPage === 'support' ? 'page' : undefined}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#E6C767] text-ink rounded-md hover:bg-canvas transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas"
          >
            <Heart className="w-4 h-4 text-accent fill-accent/20 shrink-0" aria-hidden="true" />
            <span>Support a Child</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-canvas/25 text-canvas hover:bg-canvas/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C767]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile grouped navigation drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-canvas/15 bg-accent-hover px-6 py-4 max-h-[75vh] overflow-y-auto"
        >
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleSelect('cover')}
              aria-current={currentPage === 'cover' ? 'page' : undefined}
              className={`w-full text-left py-2 text-base font-semibold border-b border-canvas/15 cursor-pointer ${
                currentPage === 'cover'
                  ? 'text-[#E6C767]'
                  : 'text-canvas/90 hover:text-[#E6C767]'
              }`}
            >
              Cover Page · Overview
            </button>

            {DROPDOWN_GROUPS.map((group) => (
              <div key={group.id} className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#E6C767]/90 pb-1">
                  {group.label}
                </p>
                <ul className="space-y-1 pl-3">
                  {group.items.map((item) => (
                    <li key={item.pageId}>
                      <button
                        type="button"
                        onClick={() => handleSelect(item.pageId)}
                        aria-current={currentPage === item.pageId ? 'page' : undefined}
                        className={`w-full text-left py-2 text-sm font-medium cursor-pointer ${
                          currentPage === item.pageId
                            ? 'text-[#E6C767] font-semibold'
                            : 'text-canvas/85 hover:text-[#E6C767]'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleSelect('gallery')}
              aria-current={currentPage === 'gallery' ? 'page' : undefined}
              className={`w-full text-left py-2 text-base font-semibold border-t border-canvas/15 cursor-pointer ${
                currentPage === 'gallery'
                  ? 'text-[#E6C767]'
                  : 'text-canvas/90 hover:text-[#E6C767]'
              }`}
            >
              Gallery · Field Activities Album
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
