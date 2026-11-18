import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { ORGANIZATION_INFO, SPONSORSHIP_OPTIONS } from '../data/organizationData';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SubmittedReceipt {
  referenceCode: string;
  name: string;
  email: string;
  phone: string;
  programTitle: string;
  commitmentType: string;
  message: string;
}

interface SupportAndContactProps {
  onInquiryLogged?: (inquiry: SubmittedReceipt & { submittedAt: string }) => void;
}

export function SupportAndContact({ onInquiryLogged }: SupportAndContactProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(SPONSORSHIP_OPTIONS[0].id);
  const [commitmentType, setCommitmentType] = useState<'full-term' | 'partial-support' | 'in-kind'>('full-term');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  const selectedProgram =
    SPONSORSHIP_OPTIONS.find((opt) => opt.id === selectedProgramId) ?? SPONSORSHIP_OPTIONS[0];

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name or organization name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = 'Please provide a valid email address so we can reply.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please share a brief note on how you would like to support or partner.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const code = `BEI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const nextReceipt: SubmittedReceipt = {
      referenceCode: code,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not provided',
      programTitle: selectedProgram.title,
      commitmentType:
        commitmentType === 'full-term'
          ? 'Full Term / Ongoing Sponsorship'
          : commitmentType === 'partial-support'
          ? 'Partial Sponsorship / Contribution'
          : 'In-Kind Scholastic, Food or Transport Support',
      message: message.trim(),
    };
    setReceipt(nextReceipt);
    onInquiryLogged?.({
      ...nextReceipt,
      submittedAt: new Date().toISOString(),
    });
  };

  const buildMailtoHref = (data: SubmittedReceipt) => {
    const subject = encodeURIComponent(`[${data.referenceCode}] ${data.programTitle} — ${data.name}`);
    const body = encodeURIComponent(
      `Hello Boresha Elimu Initiative CBO,\n\nReference: ${data.referenceCode}\nName / Organization: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProgram Focus: ${data.programTitle}\nSupport Type: ${data.commitmentType}\n\nMessage:\n${data.message}\n`
    );
    return `${ORGANIZATION_INFO.emailHref}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="support" className="py-16 lg:py-24 border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left 5 columns: Direct Contact & Malindi Office */}
          <div id="contact" className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-bold text-accent tracking-wide uppercase">
                Support &amp; Direct Contact
              </p>
              <h2
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Partner with Boresha Elimu in Malindi.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Whether you wish to sponsor a child fully, co-fund partial tuition, supply scholastic kits, support school feeding and household food relief, or assist household outreach, reach our team directly.
              </p>
            </div>

            <div className="bg-surface border border-rule rounded-lg p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-ink pb-3 border-b border-rule">
                Malindi Office &amp; Direct Lines
              </h3>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-accent mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-ink-subtle">Postal &amp; Local Address</p>
                  <p className="text-sm font-medium text-ink mt-0.5">
                    {ORGANIZATION_INFO.address}
                  </p>
                  <p className="text-xs text-ink-subtle mt-0.5">{ORGANIZATION_INFO.region}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-accent mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-ink-subtle">Official Email</p>
                  <a
                    href={ORGANIZATION_INFO.emailHref}
                    aria-label={`Email Boresha Elimu Initiative CBO at ${ORGANIZATION_INFO.email}`}
                    className="font-mono-data text-sm font-medium text-cobalt hover:text-accent hover:underline underline-offset-4 mt-0.5 inline-block"
                  >
                    {ORGANIZATION_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-accent mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-ink-subtle">Telephone / Direct Contact</p>
                  <a
                    href={ORGANIZATION_INFO.phoneHref}
                    aria-label={`Call Boresha Elimu Initiative CBO at ${ORGANIZATION_INFO.phone}`}
                    className="font-mono-data text-sm font-medium text-cobalt hover:text-accent hover:underline underline-offset-4 mt-0.5 inline-block"
                  >
                    {ORGANIZATION_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 columns: Interactive Sponsorship & Inquiry Form */}
          <div className="lg:col-span-7 bg-surface-raised border border-rule rounded-lg p-6 sm:p-8">
            {receipt ? (
              <div className="space-y-6" role="status" aria-live="polite">
                <div className="flex items-start gap-3 pb-4 border-b border-rule">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-mono-data text-xs font-semibold text-accent">
                      Inquiry Prepared · Ref {receipt.referenceCode}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-ink mt-1">
                      Thank you, {receipt.name}.
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-ink-muted">
                  Your sponsorship inquiry has been formatted below. Click the button to open your email client addressed directly to <span className="font-mono-data text-ink">{ORGANIZATION_INFO.email}</span>, or call us directly at <span className="font-mono-data text-ink">{ORGANIZATION_INFO.phone}</span>.
                </p>

                <dl className="bg-canvas border border-rule rounded-md p-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-subtle">Selected Program</dt>
                    <dd className="font-medium text-ink text-right">{receipt.programTitle}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-subtle">Support Structure</dt>
                    <dd className="font-medium text-ink text-right">{receipt.commitmentType}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-subtle">Reply Email</dt>
                    <dd className="font-mono-data text-ink text-right">{receipt.email}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={buildMailtoHref(receipt)}
                    aria-label={`Send prepared sponsorship inquiry ${receipt.referenceCode} via your email app`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-accent text-canvas rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Send via Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setReceipt(null);
                      setMessage('');
                    }}
                    aria-label="Reset form to prepare another sponsorship inquiry"
                    className="px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink border border-rule rounded-md hover:bg-surface transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Prepare Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="pb-4 border-b border-rule">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    Sponsorship &amp; Partnership Inquiry
                  </h3>
                  <p className="text-xs text-ink-subtle mt-1">
                    Select a program focus to connect directly with our Malindi coordination team
                  </p>
                </div>

                {/* Program Selector */}
                <fieldset className="space-y-2.5">
                  <legend className="text-xs font-bold text-ink">
                    1. Choose Program Area
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SPONSORSHIP_OPTIONS.map((option) => {
                      const isSelected = option.id === selectedProgramId;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedProgramId(option.id)}
                          aria-pressed={isSelected}
                          aria-label={`Select program focus: ${option.title} — ${option.scope}`}
                          className={`text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-accent bg-accent/5'
                              : 'border-rule bg-canvas/60 hover:border-ink/40'
                          }`}
                        >
                          <p className="text-sm font-bold text-ink">{option.title}</p>
                          <p className="text-xs text-ink-subtle mt-1 leading-snug">{option.scope}</p>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Support Structure */}
                <fieldset className="space-y-2">
                  <legend className="text-xs font-bold text-ink">
                    2. Sponsorship or Contribution Type
                  </legend>
                  <div className="inline-flex flex-wrap gap-1 p-1 bg-surface border border-rule rounded-lg">
                    {[
                      { id: 'full-term' as const, label: 'Full Sponsorship' },
                      { id: 'partial-support' as const, label: 'Partial Co-Funding' },
                      { id: 'in-kind' as const, label: 'Materials / Food / Support' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setCommitmentType(mode.id)}
                        aria-pressed={commitmentType === mode.id}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          commitmentType === mode.id
                            ? 'bg-accent text-canvas'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="donor-name" className="block text-xs font-semibold text-ink mb-1.5">
                      Your Name or Organization <span className="text-accent">*</span>
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amina Hassan / Coastal Partners"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full px-3.5 py-2.5 text-sm bg-canvas border border-rule rounded-md text-ink placeholder:text-ink-subtle/70 focus:border-accent focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-accent" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="donor-email" className="block text-xs font-semibold text-ink mb-1.5">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.org"
                      aria-invalid={Boolean(errors.email)}
                      className="w-full px-3.5 py-2.5 text-sm bg-canvas border border-rule rounded-md text-ink placeholder:text-ink-subtle/70 focus:border-accent focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-accent" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="donor-phone" className="block text-xs font-semibold text-ink mb-1.5">
                    Phone / WhatsApp Number (optional)
                  </label>
                  <input
                    id="donor-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 ..."
                    className="w-full px-3.5 py-2.5 text-sm bg-canvas border border-rule rounded-md text-ink placeholder:text-ink-subtle/70 focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="donor-message" className="block text-xs font-semibold text-ink mb-1.5">
                    How would you like to collaborate? <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="donor-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Share your interest in ${selectedProgram.title.toLowerCase()} or request our termly student needs list...`}
                    aria-invalid={Boolean(errors.message)}
                    className="w-full px-3.5 py-2.5 text-sm bg-canvas border border-rule rounded-md text-ink placeholder:text-ink-subtle/70 focus:border-accent focus:outline-none resize-y"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-accent" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-ink-subtle max-w-sm">
                    {selectedProgram.suggestion}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-accent text-canvas rounded-md hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Continue to Send Inquiry</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
