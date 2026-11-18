import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  Heart,
  Mail,
  Phone,
  Smartphone,
  X,
} from 'lucide-react';
import { DONATION_PAYMENT_DETAILS } from '../data/organizationData';

interface DonateFloatingModalProps {
  onNavigateSupport: () => void;
}

type PaymentTab = 'bank' | 'mobile';

export function DonateFloatingModal({ onNavigateSupport }: DonateFloatingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PaymentTab>('bank');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus to modal close control for keyboard accessibility
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      triggerRef.current?.focus();
    }, 20);
  };

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedKey(null);
      }, 1800);
    } catch {
      // Fallback: ignore clipboard denial silently
    }
  };

  const handleOpenSupportForm = () => {
    setIsOpen(false);
    onNavigateSupport();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed Bottom-Right Floating Donate Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open donation and banking information"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[44px] rounded-md bg-accent-hover text-canvas border border-[#E6C767]/80 shadow-lg hover:bg-accent hover:border-[#E6C767] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C767]"
      >
        <Heart
          className="w-4 h-4 text-[#E6C767] fill-[#E6C767]/25 shrink-0"
          aria-hidden="true"
        />
        <span className="text-sm font-bold tracking-wide">Donate</span>
      </button>

      {/* Banking & Payment Details Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="donate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/70 backdrop-blur-[2px]"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-xl bg-canvas text-ink border border-rule rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Editorial Deep Burgundy Modal Header */}
            <div className="bg-accent-hover text-canvas px-6 py-5 border-b border-gold-bright/30 flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#E6C767] tracking-wide uppercase">
                  Direct Giving · Malindi, Kenya
                </p>
                <h2
                  id="donate-modal-title"
                  className="font-display text-2xl font-bold tracking-tight text-canvas leading-tight"
                >
                  Support Boresha Elimu Initiative CBO
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close donation details"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-canvas/25 text-canvas hover:bg-canvas/10 hover:border-[#E6C767] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C767]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Segmented Channel Switcher */}
              <div
                role="tablist"
                aria-label="Payment channel options"
                className="grid grid-cols-2 gap-1.5 p-1 bg-surface border border-rule rounded-lg"
              >
                <button
                  id="donate-tab-bank"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'bank'}
                  aria-controls="donate-panel-bank"
                  onClick={() => setActiveTab('bank')}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'bank'
                      ? 'bg-accent text-canvas shadow-xs'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Bank &amp; Wire Transfer</span>
                </button>

                <button
                  id="donate-tab-mobile"
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'mobile'}
                  aria-controls="donate-panel-mobile"
                  onClick={() => setActiveTab('mobile')}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'mobile'
                      ? 'bg-accent text-canvas shadow-xs'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>M-Pesa &amp; Direct Desk</span>
                </button>
              </div>

              {activeTab === 'bank' ? (
                <div
                  id="donate-panel-bank"
                  role="tabpanel"
                  aria-labelledby="donate-tab-bank"
                  className="space-y-4"
                >
                  <dl className="bg-surface-raised border border-rule rounded-lg divide-y divide-rule">
                    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-ink-subtle">Account Name</dt>
                        <dd className="text-sm font-bold text-ink mt-0.5 truncate">
                          {DONATION_PAYMENT_DETAILS.accountName}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('accountName', DONATION_PAYMENT_DETAILS.accountName)
                        }
                        aria-label={`Copy account name ${DONATION_PAYMENT_DETAILS.accountName}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'accountName' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-ink-subtle">Paybill Number</dt>
                        <dd className="font-mono-data text-base font-bold text-ink mt-0.5">
                          {DONATION_PAYMENT_DETAILS.paybillNumber}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('paybill', DONATION_PAYMENT_DETAILS.paybillNumber)
                        }
                        aria-label={`Copy Paybill number ${DONATION_PAYMENT_DETAILS.paybillNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'paybill' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-ink-subtle">Account Number</dt>
                        <dd className="font-mono-data text-base font-bold text-ink mt-0.5">
                          {DONATION_PAYMENT_DETAILS.accountNumber}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('accountNumber', DONATION_PAYMENT_DETAILS.accountNumber)
                        }
                        aria-label={`Copy account number ${DONATION_PAYMENT_DETAILS.accountNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'accountNumber' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-4 py-3.5">
                      <dt className="text-xs font-medium text-ink-subtle">
                        Registered Branch &amp; Accepted Currencies
                      </dt>
                      <dd className="text-sm font-medium text-ink mt-0.5">
                        {DONATION_PAYMENT_DETAILS.branchLocation} ·{' '}
                        <span className="font-mono-data text-xs text-ink-muted">
                          {DONATION_PAYMENT_DETAILS.supportedCurrencies}
                        </span>
                      </dd>
                    </div>

                    <div className="px-4 py-3.5 bg-surface/60">
                      <dt className="text-xs font-bold text-accent uppercase tracking-wide">
                        International Wire (SWIFT/BIC) &amp; Receipts
                      </dt>
                      <dd className="text-sm text-ink-muted leading-relaxed mt-1">
                        {DONATION_PAYMENT_DETAILS.bankVerificationNote}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div
                  id="donate-panel-mobile"
                  role="tabpanel"
                  aria-labelledby="donate-tab-mobile"
                  className="space-y-4"
                >
                  <dl className="bg-surface-raised border border-rule rounded-lg divide-y divide-rule">
                    <div className="px-4 py-3.5 flex items-center justify-between gap-4 bg-surface/40">
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-ink-subtle">
                          M-Pesa Paybill · Account {DONATION_PAYMENT_DETAILS.accountNumber}
                        </dt>
                        <dd className="font-mono-data text-base font-bold text-ink mt-0.5">
                          Paybill {DONATION_PAYMENT_DETAILS.paybillNumber} · Acc{' '}
                          {DONATION_PAYMENT_DETAILS.accountNumber}
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            'mpesaCombo',
                            `Paybill: ${DONATION_PAYMENT_DETAILS.paybillNumber}, Account: ${DONATION_PAYMENT_DETAILS.accountNumber}`
                          )
                        }
                        aria-label={`Copy M-Pesa Paybill ${DONATION_PAYMENT_DETAILS.paybillNumber} and Account ${DONATION_PAYMENT_DETAILS.accountNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'mpesaCombo' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-ink-subtle">
                          Official M-Pesa &amp; Treasury Phone
                        </dt>
                        <dd className="mt-0.5">
                          <a
                            href={DONATION_PAYMENT_DETAILS.treasuryPhoneHref}
                            aria-label={`Call Malindi treasury phone ${DONATION_PAYMENT_DETAILS.treasuryPhone}`}
                            className="font-mono-data text-sm font-bold text-cobalt hover:text-accent hover:underline underline-offset-4"
                          >
                            {DONATION_PAYMENT_DETAILS.treasuryPhone}
                          </a>
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('phone', DONATION_PAYMENT_DETAILS.treasuryPhone)
                        }
                        aria-label={`Copy treasury phone number ${DONATION_PAYMENT_DETAILS.treasuryPhone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-ink-subtle">
                          Treasury &amp; Official Receipt Email
                        </dt>
                        <dd className="mt-0.5 truncate">
                          <a
                            href={DONATION_PAYMENT_DETAILS.treasuryEmailHref}
                            aria-label={`Email Malindi treasury at ${DONATION_PAYMENT_DETAILS.treasuryEmail}`}
                            className="font-mono-data text-sm font-bold text-cobalt hover:text-accent hover:underline underline-offset-4"
                          >
                            {DONATION_PAYMENT_DETAILS.treasuryEmail}
                          </a>
                        </dd>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('email', DONATION_PAYMENT_DETAILS.treasuryEmail)
                        }
                        aria-label={`Copy treasury email address ${DONATION_PAYMENT_DETAILS.treasuryEmail}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-rule bg-canvas text-ink hover:border-accent hover:text-accent transition-colors shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="px-4 py-3.5">
                      <dt className="text-xs font-medium text-ink-subtle">
                        Malindi CBO Office Address
                      </dt>
                      <dd className="text-sm font-medium text-ink mt-0.5">
                        {DONATION_PAYMENT_DETAILS.postalAddress}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              {/* Program Funding Transparency */}
              <div className="pt-2 border-t border-rule space-y-2">
                <p className="text-xs font-bold text-ink-subtle uppercase tracking-wider">
                  Direct Program Allocation
                </p>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {DONATION_PAYMENT_DETAILS.allocationAreas.join(' · ')}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-surface border-t border-rule flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={DONATION_PAYMENT_DETAILS.treasuryEmailHref}
                  aria-label={`Request official bank sheet by email at ${DONATION_PAYMENT_DETAILS.treasuryEmail}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-md bg-accent text-canvas hover:bg-accent-hover transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Request Bank Sheet</span>
                </a>

                <a
                  href={DONATION_PAYMENT_DETAILS.treasuryPhoneHref}
                  aria-label={`Call Malindi treasury desk at ${DONATION_PAYMENT_DETAILS.treasuryPhone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-md border border-rule bg-surface-raised text-ink hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Call Treasury</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleOpenSupportForm}
                aria-label="Close modal and open the Sponsorship and Partnership Inquiry form"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-accent-hover hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                <span>Open Sponsorship Form</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
